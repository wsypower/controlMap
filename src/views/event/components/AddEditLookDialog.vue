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
              <group-team :optType="optType" :peopleList="peopleList" :groupData="zongZhiHuiData"></group-team>
              <group-team :optType="optType" :peopleList="peopleList" :groupData="fuZhiHuiData"></group-team>
              <team-people :peopleList="peopleList" :groupData="dunDianQuanDaoData"></team-people>
              <group-people :peopleList="peopleList" :groupData="jiDongXunChaData"></group-people>
              <group-people :peopleList="peopleList" :groupData="houQinBaoZhangData"></group-people>
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
      <a-button type="primary" :loading="saveLoading" @click="">预览</a-button>
      <!-- 信息指挥中心视角 保存只有在新建的时候才有 -->
      <a-button v-if="userType==='cjy'&&optType==='add'" type="primary" :loading="saveLoading" @click="saveDraft">保存草稿</a-button>
      <a-button v-if="userType==='cjy'&&optType==='edit'" type="primary" :loading="saveLoading" @click="saveDraft">保存</a-button>
      <!-- 发起流程只有在新建的时候才有 -->
      <a-button v-if="userType==='cjy'&&optType==='add'" type="primary" :loading="loading" @click="">发起流程</a-button>
      <!-- 中队视角：提交审核直接有  信息指挥中心视角：中队全部确认之后才显示提交审核按钮-->
      <a-button v-if="userType!=='jld'&&optType==='edit'" type="primary" :loading="loading" @click="">提交审核</a-button>
      <!-- 领导视角 -->
      <a-button v-if="userType==='jld'" type="primary" :loading="loading" @click="">确认</a-button>
      <!-- 领导视角 -->
      <a-button v-if="userType==='jld'" type="primary" :loading="loading" @click="">驳回</a-button>
    </template>
    <bao-zhang-map-dialog
      :visible.sync="mapDialogVisible"
      :sourcePeopleList="sourcePeopleList"
      :baoZhangData="baoZhangData"
      @saveDrawData="saveDraw"
    ></bao-zhang-map-dialog>
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
import GroupPeople from './components/GroupPeople'
import ChoosePeopleDialog from './ChoosePeopleDialog'
import BaoZhangMapDialog from './BaoZhangMapDialog'
import {postEmergencyFeatures} from '@/api/map/service'

  export default {
    name: 'addEditDialog',
    components:{
      Log,
      BaseInfo,
      GroupTeam,
      TeamPeople,
      GroupPeople,
      ChoosePeopleDialog,
      BaoZhangMapDialog
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
            leader: '',
            teamList: [],
            teamKeyList: []
          }]
        },
        fuZhiHuiData:{
          groupName: 'fuzhihui',
          leaderPosition: 1,
          groupTeam:[{
            key: 'jhhjsddsdds',
            leader: '',
            teamList: [],
            teamKeyList: []
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
            personList: [],
            personKeyList: []
          }]
        },
        houQinBaoZhangData:{
          groupName: 'houqinbaozhang',
          leaderPosition: 1,
          personPosition: 1,
          groupPerson:[{
            key: 'jhhjsddsdds',
            leaderId: '',
            personList: [],
            personKeyList: []
          }]
        },
        // groupDataStr: '',
        // baoZhangDataStr: '',
        // reviewUserId: '',
        baoZhangData: [],

        saveLoading: false,
        loading: false,
        lastLoading: false,

        mapDialogVisible: false,
        sourcePeopleList: [],
        drawFeatures: [],
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
      ...mapActions('event/event', ['getTemplateEventDataList','getMessageByEventId']),
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
        this.sourcePeopleList = this.getSourcePeolpleList();
        console.log('打开保障视图需要的数据',this.sourcePeopleList,this.baoZhangData);
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
      },
      saveData(type){
        if(type=='save'){
          this.saveLoading = false;
        }
        else{
          this.loading = false;
        }
        if(this.operateType=='add'){
          this.submitForm.id = '';
          this.submitForm.isTemplate = '0';
        }
        let groupDataTemp = JSON.parse(JSON.stringify(this.groupData));
        groupDataTemp.forEach(item =>{
          delete item.key;
          delete item.checkedPeopleList;
          item.personList = item.peopleKeyList.reduce((r,item)=>{
            r.push(item)
            return r
          },[])
          delete item.peopleKeyList;
        })
        let groupDataStr = JSON.stringify(groupDataTemp);
        this.submitForm.groupDataStr = groupDataStr;

        let baoZhangDataStr = JSON.stringify(this.baoZhangData);
        this.submitForm.baoZhangDataStr = baoZhangDataStr;

        console.log('save/submit',this.submitForm);
        if(this.drawFeatures){
          postEmergencyFeatures('Point', this.drawFeatures['Point']).then(res => {
            console.log('==点数据==', res);
          });
          postEmergencyFeatures('LineString', this.drawFeatures['LineString']).then(res => {
            console.log('==线数据==', res);
          });
          postEmergencyFeatures('Polygon', this.drawFeatures['Polygon']).then(res => {
            console.log('==线数据==', res);
          });
        }

        this.addNewEmergencyevent(this.submitForm).then((res)=>{
          console.log('addNewEmergencyevent',res);
          if(type=='save'){
            this.saveLoading = false;
            this.$notification['success']({
              message: '保存成功',
              description: '状态为待提交',
              style: {
                width: '200px',
                marginLeft: `200px`,
                fontSize: '14px'
              },
            });
          }
          else{
            this.loading = false;
            this.$notification['success']({
              message: '提交成功',
              description: '状态为待审核',
              style: {
                width: '200px',
                marginLeft: `200px`,
                fontSize: '14px'
              },
            });
          }
          this.reset();
          this.$emit('refreshList');
          this.addEditLookDialogVisible = false;
        });
      },
      //保存草稿
      saveDraft(e){
        e.preventDefault();
        //调取接口保存的预案状态为未提交
        // this.submitForm.statusId = '01';
        // this.saveLoading = true;
        this.$refs.baseinfo.getResultData();
        // if(data){
        //   console.log('121',data);
        // }
        // else{
        //   this.saveLoading = false;
        // }
        // this.$refs.zongzhihui.getGroupTeamData();
        console.log('baseInfo', this.baseInfo);
        // this.form.validateFields((err, values) => {
        //   if (!err) {
        //     console.log('form: value', values);
        //     this.submitForm.name = values.name;
        //     this.submitForm.typeId = values.typeId;
        //     this.submitForm.startDayTime = values.dayRange[0]._d.getTime();
        //     this.submitForm.endDayTime = values.dayRange[1]._d.getTime();
        //     this.saveData('save');
        //   }
        //   else{
        //     this.saveLoading = false;
        //   }
        // });
      },


      checkParams(){
        if(new Date().getTime()>this.submitForm.startDayTime){
          this.$notification['error']({
            message: '保障时间必须是当前时间之后',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        if(this.groupData.length===0){
          this.$notification['error']({
            message: '请填写分组数据',
            description: '请检查',
            style: {
              width: '300px',
              marginLeft: `100px`,
              fontSize: '14px'
            }
          });
          return false
        }
        if(this.baoZhangData.length===0){
          this.$notification['error']({
            message: '请设置保障视图及点位',
            description: '请检查',
            style: {
              width: '300px',
              marginLeft: `100px`,
              fontSize: '14px'
            }
          });
          return false
        }
        return true
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
