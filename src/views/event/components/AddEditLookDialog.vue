<template>
  <a-modal :title="dialogTitle"
           v-model="addEditLookDialogVisible"
           wrapClassName="addmodelwrap"
           class="add-edit-dialog"
           width="100%"
           style="paddingBottom: 0px;margin: 0px;height: 100%;top:0px"
           :bodyStyle="{height:'calc(100% - 108px)',padding:'10px 20px 0px 20px'}"
           :mask="false"
           :maskClosable="false"
           :destroyOnClose="true"
           @cancel="handleCancel">
    <div class="event_dialog_body">
      <my-scroll>
        <log v-if="optType!=='add'" :eventId="eventId"></log>
        <div v-if="optType!=='add'" class="subtitle-panel" flex="dir:left cross:center main:justify">
          <span>处置事件</span>
          <a-button type="primary" size="small">事件简报下载</a-button>
        </div>
        <div v-if="optType==='add'" class="template-panel">
          <label>
            <a-icon type="snippets" theme="twoTone" style="marginRight:5px" />选择模板创建：
          </label>
          <a-select v-model="templateId" placeholder="请选择模板" style="width: 180px;" @change="handleUserTemplate">
            <a-select-option v-for="(item, index) in templateList" :value="item.id" :key="index">{{item.name }}</a-select-option>
          </a-select>
        </div>
        <div v-else class="template-panel">
          <label>
            <a-icon type="snippets" theme="twoTone" style="marginRight:5px" />选择模板创建：
          </label>
          <span>{{baseInfo.templateName===''?'未使用模版':baseInfo.templateName}}</span>
        </div>
        <div class="event_dialog_body_content">
          <div v-show="dataLoading" class="loading" flex="main:center cross:center">
            <a-spin tip="数据加载中..."></a-spin>
          </div>
          <a-collapse v-model="activeKey">
            <a-collapse-panel key="1">
              <template slot="header">
                <div class="collapse__header">
                  <a-icon type="reconciliation" theme="twoTone" />基本信息
                </div>
              </template>
              <base-info :optType="optType" :baseData="baseInfo" @getResult="getBaseInfoResultData"></base-info>
            </a-collapse-panel>
            <a-collapse-panel key="2">
              <template slot="header">
                <div class="collapse__header">
                  <a-icon type="save" theme="twoTone" />人员安排
                </div>
              </template>
              <group-team :optType="optType" :peopleList="peopleList" :groupData="zongZhiHuiData" @getResult="getZongZhiHuiResultData"></group-team>
              <group-team :optType="optType" :peopleList="peopleList" :groupData="fuZhiHuiData" @getResult="getFuZhiHuiResultData"></group-team>
              <team-people v-if="baseInfo.processName" :eventId="eventId" :optType="optType" :peopleList="peopleList" :groupData="dunDianQuanDaoData" @getResult="geTunDianQuanDaoResultData"></team-people>
              <team-people-for-add v-else :groupData="dunDianQuanDaoData" @getResult="geTunDianQuanDaoResultData"></team-people-for-add>
              <group-people :optType="optType" :peopleList="peopleList" :groupData="jiDongXunChaData" @getResult="getJiDongXunChaResultData"></group-people>
              <group-people :optType="optType" :peopleList="peopleList" :groupData="houQinBaoZhangData" @getResult="getHouQinBaoZhangResultData"></group-people>
            </a-collapse-panel>
            <a-collapse-panel key="3">
              <template slot="header">
                <div class="collapse__header">
                  <a-icon type="profile" theme="twoTone" />保障视图
                </div>
              </template>
              <a-button type="primary" @click="openBaoZhangMapDialog">保障视图</a-button>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </my-scroll>
    </div>
    <template slot="footer">
      <a-button v-if="optType!=='add'" type="primary" :loading="reviewLoading" @click="reviewEvent">预览</a-button>
      <!-- 信息指挥中心视角 保存只有在新建的时候才有 -->
      <a-button v-if="userType==='qxsl'&&(optType==='add'||optType==='edit')" type="primary" :loading="saveLoading" @click="saveDraft">保存草稿</a-button>
      <!-- 发起流程只有在新建的时候才有 -->
      <a-button v-if="userType==='qxsl'&&optType==='add'" type="primary" :loading="submitLoading" @click="submitData">发起流程</a-button>
      <!-- 中队视角：提交审核直接有  信息指挥中心视角：中队全部确认之后才显示提交审核按钮-->
      <a-button v-if="userType==='qxsl'&&optType==='edit'&&baseInfo.processId===3" type="primary" :loading="checkLoading" @click="submitCheck('qxsl')">提交审核</a-button>
      <a-button v-if="userType==='zybm'&&optType==='edit'" type="primary" :loading="checkLoading" @click="submitCheck('zybm')">提交审核</a-button>
      <!-- 领导视角 -->
      <a-button v-if="userType==='jld'&&optType==='edit'" type="primary" :loading="passLoading" @click="passEvent">确认</a-button>
      <!-- 领导视角 -->
      <a-button v-if="userType==='jld'&&optType==='edit'" type="primary" :loading="backLoading" @click="openBackDialog">驳回</a-button>
    </template>
    <bao-zhang-map-dialog
      :visible.sync="mapDialogVisible"
      :baoZhangData="baoZhangData"
      :optType="optType"
      @saveDrawData="saveDraw"
    ></bao-zhang-map-dialog>
    <a-modal title="驳回理由"
             :visible="backVisible"
             :confirm-loading="confirmLoading"
             @ok="backEvent"
             @cancel="()=>{this.backVisible=false;this.backReason='';}"
    >
      <a-textarea v-model="backReason" placeholder="请输入驳回理由" allow-clear/>
    </a-modal>
    <review-event-dialog :visible="reviewDialogVisible" :eventId="eventId"></review-event-dialog>
  </a-modal>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import moment from 'moment';
import util from '@/utils/util'
import Log from './components/Log'
import BaseInfo  from './components/BaseInfo'
import GroupTeam from './components/GroupTeam'
import TeamPeople from './components/TeamPeople'
import TeamPeopleForAdd from './components/TeamPeopleForAdd'
import GroupPeople from './components/GroupPeople'
import ChoosePeopleDialog from './ChoosePeopleDialog'
import BaoZhangMapDialog from './components/BaoZhangMapDialog'
import ReviewEventDialog from './ReviewEventDialog'
import {postEmergencyFeatures} from '@/api/map/service'

  export default {
    name: 'addEditDialog',
    components:{
      Log,
      BaseInfo,
      GroupTeam,
      TeamPeople,
      TeamPeopleForAdd,
      GroupPeople,
      ChoosePeopleDialog,
      BaoZhangMapDialog,
      ReviewEventDialog
    },
    props:{
      visible:{
        type: Boolean,
        default: false
      },
      dialogTitle:{
        type: String,
        default: '新增事件'
      },
      eventId:{
        type: String,
        default: ''
      },
      //add/edit/look
      optType:{
        type: String,
        default: 'add'
      },
    },
    data(){
      return{
        addEditLookDialogVisible: false,
        templateList: [],
        templateId: '',
        dataLoading: false,
        activeKey: '1',
        peopleList: [],
        baseInfo:{
          id: '',
          name: '',
          typeId: '',
          typeName: '',
          templateId: '',
          templateName: '',
          processId: '',
          processName: '',
          startDayTime: '',
          endDayTime: '',
          description: '',
          jobGoal: '',
          jobAssignment: '',
          jobContent: '',
          jobRequirements: ''
        },
        zongZhiHuiData:{
          groupName: 'zongzhihui',
          leaderPosition: 1,
          groupTeam:[{
            key: 'jhhjsddsdds',
            leaderId: '',
            teamList: []
          }]
        },
        fuZhiHuiData:{
          groupName: 'fuzhihui',
          leaderPosition: 1,
          groupTeam:[{
            key: 'jhhjsddsdds',
            leaderId: '',
            teamList: []
          }]
        },
        dunDianQuanDaoData:{
          groupName: 'dundianquandao',
          leaderPosition: 1,
          personPosition: 1,
          teamPersonList: []
        },
        jiDongXunChaData:{
          groupName: 'jidongxuncha',
          leaderPosition: 1,
          personPosition: 1,
          groupPerson:[{
            key: 'jhhjsddsdds',
            leaderId: '',
            personList: []
          }]
        },
        houQinBaoZhangData:{
          groupName: 'houqinbaozhang',
          leaderPosition: 1,
          personPosition: 1,
          groupPerson:[{
            key: 'jhhjsddsdds',
            leaderId: '',
            personList: []
          }]
        },
        // groupDataStr: '',
        // baoZhangDataStr: '',
        // reviewUserId: '',
        baoZhangData: [],

        reviewLoading:false,
        saveLoading: false,
        submitLoading: false,
        checkLoading: false,
        passLoading: false,
        backLoading: false,

        mapDialogVisible: false,
        sourcePeopleList: [],
        drawFeatures: [],

        backVisible: false,
        confirmLoading: false,
        backReason: '',

        reviewDialogVisible: false,
      }
    },
    computed:{
      userType:function(){
        return this.$store.getters['cgadmin/user/type']
      }
    },
    created(){},
    mounted(){},
    watch:{
      addEditLookDialogVisible:function(val){
        if(val){
          this.init();
        }
        else{
          this.$emit('update:visible', false);
        }
      },
      visible:function(val){
        if(val){
          this.addEditLookDialogVisible = true;
        }
      }
    },
    methods:{
      ...mapActions('event/event', ['getTemplateEventDataList','getMessageByEventId','addNewEvent','addTeamPersonForNewEvent','submitEventToCheck','checkEvent']),
      ...mapActions('event/common', ['getPeopleDataList']),
      init(){
        this.getTemplateEventDataList().then((res)=>{
          this.templateList = res.data;
        });
        this.getPeopleDataList().then(res => {
          this.peopleList = res.data;
        });
        if(this.optType!=='add'){
          this.templateId = this.baseInfo.templateId;
          this.getEventInfoById(this.eventId);
        }
      },
      handleUserTemplate(val){
        console.log('handleUserTemplate',val);
        let _this = this;
        this.$confirm({
          title: '确定要改变模版吗?',
          content: '模版改变后，之前的数据将会清除，不可还原',
          onOk() {
            _this.getEventInfoById(val);
          },
          onCancel() {},
        });

      },
      //选择模版
      getEventInfoById(id){
        this.dataLoading = true;
        this.getMessageByEventId().then(res => {
          this.baseInfo = res.data.baseInfo;
          this.zongZhiHuiData = res.data.groupData.zongZhiHuiData;
          this.fuZhiHuiData = res.data.groupData.fuZhiHuiData;
          this.dunDianQuanDaoData = res.data.groupData.dunDianQuanDaoData;
          this.jiDongXunChaData = res.data.groupData.jiDongXunChaData;
          this.houQinBaoZhangData = res.data.groupData.houQinBaoZhangData;
          console.log(this.jiDongXunChaData, this.houQinBaoZhangData);
          this.dataLoading = false;
        });
      },


      reset(){
        this.drawFeatures=null;
        this.activeKey = '1';
        this.baseInfo = Object.assign({},this.$options.data()['baseInfo']);
        this.zongZhiHuiData = Object.assign({},this.$options.data()['zongZhiHuiData']);
        this.fuZhiHuiData = Object.assign({},this.$options.data()['fuZhiHuiData']);
        this.dunDianQuanDaoData = Object.assign({},this.$options.data()['dunDianQuanDaoData']);
        this.jiDongXunChaData = Object.assign({},this.$options.data()['jiDongXunChaData']);
        this.houQinBaoZhangData = Object.assign({},this.$options.data()['houQinBaoZhangData']);
      },

      //开启保障视图弹窗
      openBaoZhangMapDialog(){
        let baoZhangArr = [];
        this.baoZhangData = JSON.parse(JSON.stringify(this.dunDianQuanDaoData.teamPersonList));
        this.baoZhangData.forEach(baoZhangItem => {
          let a = baoZhangItem.teamPersonData.reduce((acc, item) => {
            // this.peopleList
            let personTemp = this.peopleList.find(person => person.id === item.leaderId);
            let perName = item.personList.reduce((arr, id) => {
              let person = this.peopleList.find(p => p.id === id);
              arr.push(person.name);
              return arr
            },[]);
            let temp = {
              load: item.addressName,
              leadName: personTemp.name,
              personNameStr: perName.join(','),
              remark: ''
            }
            acc.push(temp);
            return acc
          },[]);
          baoZhangArr = baoZhangArr.concat(a);
        });

        console.log('打开保障视图需要的数据',baoZhangArr);
        this.mapDialogVisible = true;
      },
      //获取保障视图重组后数据
      getSourcePeolpleList(){
          let pList = this.groupData;
          let resList = [];
          pList.forEach((item)=>{
            let checkedPeopleList = item.checkedPeopleList;
            checkedPeopleList.map((i)=>{
              let temp = {
                id: i.id,
                name: i.name+ '(' + item.groupName + ')'
              }
              resList.push(temp);
            });
          })
          return resList
      },

      //获取保障视图重组后数据
      getPeolpleListInBaoZhangData(){
        let pList = this.baoZhangData;
        let resList = [];
        pList.forEach((item)=>{
          let checkedPeopleList = item.personList;
          checkedPeopleList.map((i)=>{
            resList.push(i);
          });
        })
        return resList
      },
      //保存地图数据
      saveDraw(data){
        console.log("==保存===",data);
        this.drawFeatures = data.drawFeatures;
        this.baoZhangData = data.allBaoZhangData;
      },

      //获取事件基本信息
      getBaseInfoResultData(data){
        Object.keys(this.baseInfo).forEach(key => {
          this.baseInfo[key] = data[key];
        });
        if(data.dayRange&&data.dayRange.length>0){
          this.baseInfo['startDayTime'] = data.dayRange[0]._d.getTime();
          this.baseInfo['endDayTime'] = data.dayRange[1]._d.getTime();
        }
      },
      //获取总指挥信息
      getZongZhiHuiResultData(data){
        this.zongZhiHuiData = JSON.parse(JSON.stringify(data));
        this.zongZhiHuiData.groupTeam.map(item => {
          item.key = item.key.indexOf('@@@')===0?'':item.key;
          let temp = [...item.teamList];
          if(temp.length>0){
            item.teamList = [];
            item.teamList = temp.reduce((acc, t) => {
              acc.push(t.id);
              return acc
            },[])
          }
        })
      },
      //获取副指挥信息
      getFuZhiHuiResultData(data){
        this.fuZhiHuiData = JSON.parse(JSON.stringify(data));
        this.fuZhiHuiData.groupTeam.map(item => {
          item.key = item.key.indexOf('@@@')===0?'':item.key;
          let temp = [...item.teamList];
          if(temp.length>0){
            item.teamList = [];
            item.teamList = temp.reduce((acc, t) => {
              acc.push(t.id);
              return acc
            },[])
          }
        })
      },
      //获取蹲点劝导组信息
      geTunDianQuanDaoResultData(data) {
        console.log('获取蹲点劝导组信息', data);
        // if(data)
        this.dunDianQuanDaoData = JSON.parse(JSON.stringify(data));
      },
      //获取机动巡查应急组数据
      getJiDongXunChaResultData(data){
        this.jiDongXunChaData = JSON.parse(JSON.stringify(data));
        this.jiDongXunChaData.groupPerson.map(item => {
          item.key = item.key.indexOf('@@@')===0?'':item.key;
          let temp = [...item.personList];
          if(temp.length>0){
            item.personList = [];
            item.personList = temp.reduce((acc, t) => {
              acc.push(t.id);
              return acc
            },[])
          }
        })
      },
      //获取后勤保障组数据
      getHouQinBaoZhangResultData(data){
        this.houQinBaoZhangData = JSON.parse(JSON.stringify(data));
        this.houQinBaoZhangData.groupPerson.map(item => {
          item.key = item.key.indexOf('@@@')===0?'':item.key;
          let temp = [...item.personList];
          if(temp.length>0){
            item.personList = [];
            item.personList = temp.reduce((acc, t) => {
              acc.push(t.id);
              return acc
            },[])
          }
        })
      },

      //信息智慧中心保存草稿/保存
      saveDraft(e){
        e.preventDefault();
        this.saveLoading = true;
        console.log('baseInfo', this.baseInfo);
        console.log('zongZhiHuiData', this.zongZhiHuiData);
        console.log('fuZhiHuiData', this.fuZhiHuiData);
        console.log('dunDianQuanDaoData', this.dunDianQuanDaoData);
        console.log('jiDongXunChaData', this.jiDongXunChaData);
        console.log('houQinBaoZhangData', this.houQinBaoZhangData);

        let params = {
          baseInfo: this.baseInfo,
          groupData: {
            zongZhiHuiData: this.zongZhiHuiData,
            fuZhiHuiData: this.fuZhiHuiData,
            dunDianQuanDaoData: this.dunDianQuanDaoData,
            jiDongXunChaData: this.jiDongXunChaData,
            houQinBaoZhangData: this.houQinBaoZhangData
          }
        }
        this.addNewEvent(params).then((res)=>{
          console.log('addNewEvent',res);
          this.saveLoading = false;
          this.$notification['success']({
            message: '保存成功',
            description: '后续请发起流程',
            style: {
              width: '200px',
              marginLeft: `200px`,
              fontSize: '14px'
            },
          });
          this.reset();
          this.$emit('refreshList');
          this.addEditLookDialogVisible = false;
        });
      },

      //发起流程
      submitData(e){
        e.preventDefault();
        if(!this.checkParams()){
          return
        }
        this.submitLoading = true;
        console.log('baseInfo', this.baseInfo);
        console.log('zongZhiHuiData', this.zongZhiHuiData);
        console.log('fuZhiHuiData', this.fuZhiHuiData);
        console.log('dunDianQuanDaoData', this.dunDianQuanDaoData);
        console.log('jiDongXunChaData', this.jiDongXunChaData);
        console.log('houQinBaoZhangData', this.houQinBaoZhangData);

        let params = {
          baseInfo: this.baseInfo,
          groupData: {
            zongZhiHuiData: this.zongZhiHuiData,
            fuZhiHuiData: this.fuZhiHuiData,
            dunDianQuanDaoData: this.dunDianQuanDaoData,
            jiDongXunChaData: this.jiDongXunChaData,
            houQinBaoZhangData: this.houQinBaoZhangData
          }
        }
        this.addNewEvent(params).then((res)=>{
          console.log('addNewEvent',res);
          this.submitLoading = false;
          this.$notification['success']({
            message: '保存成功',
            description: '',
            style: {
              width: '200px',
              marginLeft: `200px`,
              fontSize: '14px'
            },
          });
          this.reset();
          this.$emit('refreshList');
          this.addEditLookDialogVisible = false;
        });
      },
      //中队：提交审核
      //中心：提交审核
      submitCheck(type){
        if(type==='zybm'){
          console.log('zybm dunDianQuanDaoData', this.dunDianQuanDaoData);
          let teamPersonData  = this.dunDianQuanDaoData.teamPersonList[0].teamPersonData.reduce( (acc, teamPerson) => {
            let data = {
              key: teamPerson.key.indexOf('@@@')===0?'':teamPerson.key,
              address: teamPerson.addressIds,
              leaderId: teamPerson.leaderId,
              personList: []
            }
            data.personList = teamPerson.personList.reduce((ids, person) => {
              ids.push(person.id);
              return ids
            },[])
            acc.push(data);
            return acc
          },[]);
          let params = {
            eventId: this.eventId,
            teamId: this.dunDianQuanDaoData.teamPersonList[0].teamId,
            teamPersonData: teamPersonData
          }
          console.log('addTeamPersonForNewEvent',params);
          this.addTeamPersonForNewEvent().then(res => {

          });
        }
        if(type==='qxsl'){
          this.submitEventToCheck().then(res => {

          });
        }
      },

      //保存输入数据库
      saveData(){
        let params = {
          baseInfo: this.baseInfo,
          groupData: {
            zongZhiHuiData: this.zongZhiHuiData,
            fuZhiHuiData: this.fuZhiHuiData,
            dunDianQuanDaoData: this.dunDianQuanDaoData,
            jiDongXunChaData: this.jiDongXunChaData,
            houQinBaoZhangData: this.houQinBaoZhangData
          }
        }
        // if(this.operateType=='add'){
        //   this.submitForm.id = '';
        //   this.submitForm.isTemplate = '0';
        // }
        // let groupDataTemp = JSON.parse(JSON.stringify(this.groupData));
        // groupDataTemp.forEach(item =>{
        //   delete item.key;
        //   delete item.checkedPeopleList;
        //   item.personList = item.peopleKeyList.reduce((r,item)=>{
        //     r.push(item)
        //     return r
        //   },[])
        //   delete item.peopleKeyList;
        // })
        // let groupDataStr = JSON.stringify(groupDataTemp);
        // this.submitForm.groupDataStr = groupDataStr;
        //
        // let baoZhangDataStr = JSON.stringify(this.baoZhangData);
        // this.submitForm.baoZhangDataStr = baoZhangDataStr;
        //
        // console.log('save/submit',this.submitForm);
        // if(this.drawFeatures){
        //   postEmergencyFeatures('Point', this.drawFeatures['Point']).then(res => {
        //     console.log('==点数据==', res);
        //   });
        //   postEmergencyFeatures('LineString', this.drawFeatures['LineString']).then(res => {
        //     console.log('==线数据==', res);
        //   });
        //   postEmergencyFeatures('Polygon', this.drawFeatures['Polygon']).then(res => {
        //     console.log('==线数据==', res);
        //   });
        // }


      },

      checkParams(){
        if(this.baseInfo.name===''){
          this.$notification['error']({
            message: '事件名称必填',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        if(this.baseInfo.typeId===''){
          this.$notification['error']({
            message: '事件类型必选',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        if(this.baseInfo.startDayTime===''||this.baseInfo.endDayTime===''){
          this.$notification['error']({
            message: '保障时间必填',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        if(this.baseInfo.description===''){
          this.$notification['error']({
            message: '事件描述必填',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        if(this.baseInfo.jobGoal===''){
          this.$notification['error']({
            message: '工作目标必填',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        if(this.baseInfo.jobAssignment===''){
          this.$notification['error']({
            message: '组织领导及任务分工必填',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        if(this.baseInfo.jobContent===''){
          this.$notification['error']({
            message: '工作内容必填',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        if(this.baseInfo.jobRequirements===''){
          this.$notification['error']({
            message: '工作要求必填',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        return true
      },
      passEvent(){
        let params =  {
          eventId: this.eventId,
          teamId: '',
          operate: 'yes',
          backReason: ''
        }
        this.checkEvent(params).then(res => {
          this.reset();
          this.addEditLookDialogVisible = false;
        });
      },
      //打开驳回窗口
      openBackDialog(){
        this.backVisible = true;
      },
      backEvent(){
        this.confirmLoading = true;
        let params =  {
          eventId: this.eventId,
          teamId: '',
          operate: 'no',
          backReason: this.backReason
        }
        this.checkEvent(params).then(res => {
          this.backReason = '';
          this.confirmLoading = false;
          this.backVisible = false;
          this.reset();
          this.addEditLookDialogVisible = false;
        });
      },
      reviewEvent(){
        //URL_CONFIG.eventInfoURL
        // this.eventId = '1234567890';
        this.reviewDialogVisible = true;
      },
      handleCancel(){
        this.reset();
        this.addEditLookDialogVisible = false;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .collapse__header {
    color: #028efc;
    font-size: 16px;
    .anticon {
      margin-right: 5px;
    }
  }
.add-edit-dialog {
  width: 100%;
  height: 100%;
  .event_dialog_body{
    width: 100%;
    height: 100%;
  }
  .subtitle-panel{
    font-size: 14px;
    height: 40px;
    margin-bottom: 10px;
    color: #028efc;
    border-botton: 1px solid #d9d9d9;
  }
  .template-panel{
    margin-bottom: 10px;
    font-size: 14px;
    padding: 8px 0 8px 40px;
    background-color: #fafafa;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    color: #028efc;
    font-size: 16px;
  }
  .turnDown{
    background-color: #FDE2E2;
    color: #F76B6B;
  }
  .event_dialog_body_content {
    height: calc(100% - 60px);
    position: relative;
    .loading{
      position: absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      z-index: 10;
      background-color: rgba(255,255,255,0.8);
    }
    .icon_delete,
    .icon_add {
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: #00a4fe;
      }
    }
    .icon_add {
      margin-left: 10px;
    }
  }
}
</style>
<style lang="scss">
  .addmodelwrap {
    top: 69px;
    height: calc(100% - 78px);
    width: calc(100% - 80px);
    left: 70px;
    .ant-modal-content {
      height: 100%;
    }
    .ant-collapse-header {
      .anticon {
        color: #00a4fe;
      }
    }
  }
</style>
