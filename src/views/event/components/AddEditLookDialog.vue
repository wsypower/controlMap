<template>
  <a-modal
    :title="dialogTitle"
    v-model="addEditLookDialogVisible"
    wrapClassName="addmodelwrap"
    class="add-edit-dialog"
    width="100%"
    style="paddingBottom: 0px;margin: 0px;height: 100%;top:0px"
    :bodyStyle="{ height: 'calc(100% - 108px)', padding: '10px 20px 10px 20px' }"
    :mask="false"
    :maskClosable="false"
    :destroyOnClose="true"
    @cancel="handleCancel"
  >
    <div class="event_dialog_body">
      <my-scroll>
        <log v-if="userType !== 'qxsl' || (baseInfo.processId !== '1' && optType !== 'add')" :eventId="eventId"></log>
        <div
          v-if="userType !== 'qxsl' || (baseInfo.processId !== '1' && optType !== 'add')"
          class="subtitle-panel"
          flex="dir:left cross:center main:justify"
        >
          <span>处置事件</span>
          <!--          <a-button type="primary" size="small">事件简报下载</a-button>-->
        </div>
        <div v-if="userType === 'qxsl' && (baseInfo.processId === '1' || optType === 'add')" class="template-panel">
          <label> <a-icon type="snippets" theme="twoTone" style="marginRight:5px" />选择模板创建： </label>
          <a-select v-model="templateId" placeholder="请选择模板" style="width: 180px;" @change="handleUserTemplate">
            <a-select-option v-for="(item, index) in templateList" :value="item.id" :key="index">{{
              item.name
            }}</a-select-option>
          </a-select>
        </div>
        <div v-else class="template-panel">
          <label> <a-icon type="snippets" theme="twoTone" style="marginRight:5px" />选择模板创建： </label>
          <span>{{ baseInfo.templateName === '' ? '未使用模版' : baseInfo.templateName }}</span>
        </div>
        <div class="event_dialog_body_content">
          <div v-show="dataLoading" class="loading" flex="main:center cross:center">
            <a-spin tip="数据加载中..."></a-spin>
          </div>
          <a-collapse v-model="activeKey">
            <a-collapse-panel key="1">
              <template slot="header">
                <div class="collapse__header"><a-icon type="reconciliation" theme="twoTone" />基本信息</div>
              </template>
              <base-info :optType="optType" :baseData="baseInfo" @getResult="getBaseInfoResultData"></base-info>
            </a-collapse-panel>
            <a-collapse-panel key="2">
              <template slot="header">
                <div class="collapse__header"><a-icon type="save" theme="twoTone" />人员安排</div>
              </template>
              <group-team
                :optType="optType"
                :peopleList="peopleList"
                :groupData="zongZhiHuiData"
                @getResult="getZongZhiHuiResultData"
              ></group-team>
              <group-team
                :optType="optType"
                :peopleList="peopleList"
                :groupData="fuZhiHuiData"
                @getResult="getFuZhiHuiResultData"
              ></group-team>
              <!-- group-people-two 临时给综合协调组以及纪检督查组使用 -->
              <group-people-two
                :optType="optType"
                :groupData="zongHeXieTiaoData"
                @getResult="getZongHeXieTiaoResultData"
              ></group-people-two>
              <group-people-two
                :optType="optType"
                :groupData="jiJianDuChaData"
                @getResult="getJiJianDuChaResultData"
              ></group-people-two>
              <!-- 当中心为发起流程时，使用team-people-for-add，其余情况使用team-people -->
              <team-people-for-add
                v-if="userType === 'qxsl' && (optType === 'add' || (optType === 'edit' && baseInfo.processId === '1'))"
                :groupData="dunDianQuanDaoData"
                @getResult="geTunDianQuanDaoResultData"
              ></team-people-for-add>
              <team-people
                v-else
                :eventId="eventId"
                :optType="optType"
                :peopleList="peopleListForTeam"
                @setSubmitBtnShow="setSubmitBtnShow"
                @reviewTeam="reviewTeam"
              ></team-people>
              <group-people
                :optType="optType"
                :peopleList="peopleList"
                :groupData="jiDongXunChaData"
                @getResult="getJiDongXunChaResultData"
              ></group-people>
              <group-people
                :optType="optType"
                :peopleList="peopleList"
                :groupData="houQinBaoZhangData"
                @getResult="getHouQinBaoZhangResultData"
              ></group-people>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </my-scroll>
    </div>
    <template slot="footer">
      <!-- 预览只有查看或者角色是局领导的时候才有，其余情况都是保存及预览 -->
      <a-button
        v-if="userType === 'jld' || optType === 'look'"
        type="primary"
        :loading="reviewLoading"
        @click="reviewEvent"
        >预览</a-button
      >
      <a-button v-else type="primary" :loading="reviewLoading" @click="reviewEvent">保存及预览</a-button>

      <!-- 信息指挥中心新增或者处置时会有这个按钮 -->
      <a-button
        v-if="userType === 'qxsl' && (optType === 'add' || optType === 'edit')"
        type="primary"
        :loading="saveLoading"
        @click="saveDraft"
        >保存草稿</a-button
      >
      <!-- 发起流程：指挥中心新增或者处置时状态为未发起流程时才有 -->
      <a-button
        v-if="userType === 'qxsl' && optType !== 'look' && (optType === 'add' || baseInfo.processId === '1')"
        type="primary"
        :loading="submitLoading"
        @click="submitData"
        >发起流程</a-button
      >
      <!-- 信息指挥中心视角：中队全部确认之后才显示提交审核按钮-->
      <a-button
        v-if="userType === 'qxsl' && optType === 'edit' && showSubmit"
        type="primary"
        :loading="checkLoading"
        @click="submitCheck('qxsl')"
        >提交审核</a-button
      >
      <!-- 中队视角：提交审核直接有 -->
      <a-button
        v-if="userType === 'zybm' && optType === 'edit'"
        type="primary"
        :loading="checkLoading"
        @click="submitCheck('zybm')"
        >提交审核</a-button
      >
      <!-- 领导视角 -->
      <a-button v-if="userType === 'jld' && optType === 'edit'" type="primary" :loading="passLoading" @click="passEvent"
        >确认</a-button
      >
      <!-- 领导视角 -->
      <a-button
        v-if="userType === 'jld' && optType === 'edit'"
        type="primary"
        :loading="backLoading"
        @click="openBackDialog"
        >驳回</a-button
      >
    </template>
    <!-- 驳回时，弹出框输入驳回理由 -->
    <a-modal
      title="驳回理由"
      :visible="backVisible"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      @ok="backEvent"
      @cancel="
        () => {
          this.backVisible = false
          this.backReason = ''
        }
      "
    >
      <a-textarea v-model="backReason" placeholder="请输入驳回理由" allow-clear />
    </a-modal>
    <!-- 当图形保存错误时，弹出提示 -->
    <a-modal
            v-model="modalMapVisible"
            title="警告"
            centered
            @ok="() => (modalMapVisible = false)"
            width="200"
            :footer="null"
    >
      <p style="font-size: 18px">图形保存错误，请重新保存！！！</p>
    </a-modal>
  </a-modal>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import util from '@/utils/util'
import Log from './components/Log'
import BaseInfo  from './components/BaseInfo'
import GroupTeam from './components/GroupTeam'
import TeamPeople from './components/TeamPeople'
import TeamPeopleForAdd from './components/TeamPeopleForAdd'
import GroupPeople from './components/GroupPeople'
import GroupPeopleTwo from './components/GroupPeopleTwo'
import {postEmergencyFeatures,getEmergencyFeatures} from '@/api/map/service'

  export default {
    name: 'addEditDialog',
    components:{
      Log,
      BaseInfo,
      GroupTeam,
      TeamPeople,
      TeamPeopleForAdd,
      GroupPeople,
      GroupPeopleTwo
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
        //模版list
        templateList: [],
        //使用的模版ID
        templateId: '',
        //当模版更改提示出来后，用户选择选择了取消，则需要还原之前的模版ID
        oldTemplateId: '',
        //是否使用了模版
        isUseTemplate: false,
        //加载数据过渡效果
        dataLoading: false,
        activeKey: '1',
        peopleList: [],
        //对于中队来说，人员是该中队以及机动中队与科室
        peopleListForTeam: [],
        //基本信息
        baseInfo:{
          id: '',
          name: '',
          typeId: '',
          typeName: '',
          templateId: '',
          templateName: '',
          processId: '1',
          processName: '',
          startDayTime: '',
          endDayTime: '',
          description: '',
          jobGoal: '',
          jobAssignment: '',
          jobContent: '',
          jobRequirements: '',
          dayRange: []
        },
        //总指挥数据
        zongZhiHuiData:{
          groupName: 'zongzhihui',
          leaderPosition: '1',
          groupTeam:[{
            key: '@@@',
            leaderId: '',
            teamList: [],
            teamObjList: []
          }]
        },
        //副指挥数据
        fuZhiHuiData:{
          groupName: 'fuzhihui',
          leaderPosition: '1',
          groupTeam:[{
            key: '@@@',
            leaderId: '',
            teamList: [],
            teamObjList: []
          }]
        },
        //蹲点巡导组数据
        dunDianQuanDaoData:{
          groupName: 'dundianquandao',
          leaderPosition: '1',
          personPosition: '1',
          teamPersonList: []
        },
        //激动巡查组数据
        jiDongXunChaData:{
          groupName: 'jidongxuncha',
          leaderPosition: '1',
          personPosition: '1',
          groupPerson:[{
            key: '@@@',
            leaderId: '',
            personList: []
          }]
        },
        //后勤保障组数据
        houQinBaoZhangData:{
          groupName: 'houqinbaozhang',
          leaderPosition: '1',
          personPosition: '1',
          groupPerson:[{
            key: '@@@',
            leaderId: '',
            personList: []
          }]
        },
        //综合协调组
        zongHeXieTiaoData:{
          groupName: 'zonghexietiao',
          description: ''
        },
        //纪检督查组
        jiJianDuChaData:{
          groupName: 'jijianducha',
          description: ''
        },
        //各个按钮的点击效果
        reviewLoading:false,
        saveLoading: false,
        submitLoading: false,
        checkLoading: false,
        passLoading: false,
        backLoading: false,

        //审核驳回弹窗
        backVisible: false,
        confirmLoading: false,
        //驳回理由
        backReason: '',

        //在信息指挥中心处置下提交审核按钮是否显示（显示）
        showSubmit: false,
        // 图形保存提示
        modalMapVisible:false,
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
      ...mapActions('event/event', ['getTemplateEventDataList','getMessageByEventId','addNewEvent','updateEvent','addTeamPersonForNewEvent','submitEventToCheck','checkEvent','submitEvent','submitTeamPersonToCheck']),
      ...mapActions('event/common', ['getPeopleDataList']),
      init(){
        this.getTemplateEventDataList().then((res)=>{
          this.templateList = res;
        });
        this.getPeopleDataList({id:''}).then(res => {
          this.peopleList = res;
          //中队填写：人员信息通过peopleListForTeam输入
          this.peopleListForTeam = res;
        });

        if(this.optType!=='add'){
          this.templateId = this.baseInfo.templateId;
          this.oldTemplateId = this.baseInfo.templateId;
          this.getEventInfoById(this.eventId);
        }
      },
      handleUserTemplate(val){
        let _this = this;
        this.$confirm({
          title: '确定要改变模版吗?',
          content: '模版改变后，之前的数据将会清除，不可还原',
          onOk() {
            _this.oldTemplateId = val;
            _this.isUseTemplate = true;
            _this.getEventInfoById(val);
          },
          onCancel() {
            _this.templateId = _this.oldTemplateId;
          },
        });

      },
      //选择模版
      getEventInfoById(id){
        this.dataLoading = true;
        this.getMessageByEventId({id:id}).then(res => {
          this.baseInfo = res.baseInfo;
          this.baseInfo.id = this.eventId;
          //在baseInfo组建中会对dayRange进行复制，这边只是为了让baseInfo对象有dayRange属性
          this.baseInfo.dayRange = [];
          //设置templateId
          if(this.templateId!==''){
            //新建时选择了模版
            this.baseInfo.templateId = this.templateId;
          }
          else{
            //编辑时，设置已选的模版
            this.templateId = this.baseInfo.templateId;
            this.oldTemplateId = this.baseInfo.templateId;
          }
          //把中队的键值对存储在teamObjList中用于中间数据改变使用，teamList用于保存使用
          res.groupData.zongZhiHuiData.groupTeam.forEach(groupItem => {
            groupItem.teamObjList = [...groupItem.teamList];
            groupItem.teamList = groupItem.teamObjList.reduce((acc,item) => {
              acc.push(item.id);
              return acc
            },[]);
          });
          Object.keys(res.groupData.zongZhiHuiData).forEach(key =>{
            this.zongZhiHuiData[key] = res.groupData.zongZhiHuiData[key]
          })
          //把中队的键值对存储在teamObjList中用于中间数据改变使用，teamList用于保存使用
          res.groupData.fuZhiHuiData.groupTeam.forEach(groupItem => {
            groupItem.teamObjList = [...groupItem.teamList];
            groupItem.teamList = groupItem.teamObjList.reduce((acc,item) => {
              acc.push(item.id);
              return acc
            },[]);
          });
          Object.keys(res.groupData.fuZhiHuiData).forEach(key =>{
            this.fuZhiHuiData[key] = res.groupData.fuZhiHuiData[key]
          });
          this.dunDianQuanDaoData = res.groupData.dunDianQuanDaoData;

          if(this.isUseTemplate){
            //使用了模版需要把审核流程定为'未发起流程'；
            this.baseInfo.processId = '1';
            this.baseInfo.processName = '未发起流程';
            //使用了模版之后，中队填写的信息在创建的时候中心是看不到的
            this.dunDianQuanDaoData.teamPersonList.forEach(teamPerson => {
              teamPerson.checkStatusId = '1';
              teamPerson.checkStatusName = '';
              teamPerson.teamPersonData = [];
            })
          }
          //保存保障视图初始数据
          let baoZhangData = {}
          this.dunDianQuanDaoData.teamPersonList.forEach(teamPerson => {
            teamPerson.teamPersonData.forEach(loadItem => {
              loadItem.positionId = loadItem.address.length>0?loadItem.address[2].id:'';
              //初始进入处置页，默认全部是数据库查保障视图数据
              if(loadItem.positionId.length>0){
                baoZhangData[loadItem.key + '_'+loadItem.positionId] = {
                  keyPositionId: loadItem.key + '_'+loadItem.positionId,
                  positionId: loadItem.positionId,
                  mapId: loadItem.mapId,
                  mapType: loadItem.mapType,
                  drawFeature: null
                };
              }
            })
          })
          //把数据保存到vuex中
          console.log('vuex baoZhangData',baoZhangData);
          this.$store.commit('event/baoZhangData/updateBaoZhangData',baoZhangData);

          this.$store.commit('event/dunDianQuanDaoData/updateDunDianQuanDaoInfo',this.dunDianQuanDaoData);
          //如果进来的数据所有的中队已经全部确认了，那么提交审核按钮会出现
          let num = this.dunDianQuanDaoData.teamPersonList.reduce((acc,teamPerson) => {
            if(teamPerson.checkStatusId==='3'){
              acc = acc + 1;
            }
            return acc
          }, 0)
          if(this.dunDianQuanDaoData.teamPersonList.length>0&&this.dunDianQuanDaoData.teamPersonList.length===num){
            this.showSubmit = true;
          }
          this.jiDongXunChaData = res.groupData.jiDongXunChaData;
          this.houQinBaoZhangData = res.groupData.houQinBaoZhangData;

          this.zongHeXieTiaoData = res.groupData.zongHeXieTiaoData;
          this.jiJianDuChaData = res.groupData.jiJianDuChaData;

          //如果是中队，则选择的人员范围为这个中队内的人员
          if(this.userType==='zybm'){
            this.getPeopleDataList({id:this.dunDianQuanDaoData.teamPersonList[0].teamId}).then(res => {
              this.peopleListForTeam = res;
            });
          }
          this.dataLoading = false;
        });
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
        else{
          this.baseInfo['startDayTime'] = '';
          this.baseInfo['endDayTime'] = '';
        }
      },
      //获取总指挥信息
      getZongZhiHuiResultData(data){
        this.zongZhiHuiData = JSON.parse(JSON.stringify(data));
      },
      //获取副指挥信息
      getFuZhiHuiResultData(data){
        this.fuZhiHuiData = JSON.parse(JSON.stringify(data));
      },
      //获取蹲点劝导组信息(这个只在发起流程之前使用)
      geTunDianQuanDaoResultData(data) {
        this.dunDianQuanDaoData = JSON.parse(JSON.stringify(data));
      },
      //获取机动巡查应急组数据
      getJiDongXunChaResultData(data){
        this.jiDongXunChaData = JSON.parse(JSON.stringify(data));
      },
      //获取后勤保障组数据
      getHouQinBaoZhangResultData(data){
        this.houQinBaoZhangData = JSON.parse(JSON.stringify(data));
      },

      //获取综合协调组数据
      getZongHeXieTiaoResultData(data){
        this.zongHeXieTiaoData = JSON.parse(JSON.stringify(data));
      },

      //获取纪检督查组数据
      getJiJianDuChaResultData(data){
        this.jiJianDuChaData = JSON.parse(JSON.stringify(data));
      },

      //在保存数据之前对数据进行处理
      changeEventDataForSave(){
        this.zongZhiHuiData.groupTeam.map(item => {
          item.key = item.key.indexOf('@@@')===0?'':item.key;
          item.teamList = [];
          if(item.teamObjList.length>0){
            item.teamList = item.teamObjList.reduce((acc, t) => {
              acc.push(t.id);
              return acc
            },[])
          }
          if(item.leaderId===''&&item.teamList.length===0){
            item.key = 'delete_'
          }
        })
        //主动去除空白行
        for(let i=this.zongZhiHuiData.groupTeam.length-1;i>=0;i--){
            if(this.zongZhiHuiData.groupTeam[i].key==='delete_'){
              this.zongZhiHuiData.groupTeam.splice(i,1)
            }
        }

        this.fuZhiHuiData.groupTeam.map(item => {
          item.key = item.key.indexOf('@@@')===0?'':item.key;
          item.teamList = [];
          if(item.teamObjList.length>0){
            item.teamList = item.teamObjList.reduce((acc, t) => {
              acc.push(t.id);
              return acc
            },[])
          }
          if(item.leaderId===''&&item.teamList.length===0){
            item.key = 'delete_'
          }
        })
        //主动去除空白行
        for(let i=this.fuZhiHuiData.groupTeam.length-1;i>=0;i--){
          if(this.fuZhiHuiData.groupTeam[i].key==='delete_'){
            this.fuZhiHuiData.groupTeam.splice(i,1)
          }
        }
        //如果dunDianQuanDaoData中不存在teamList（说明人员安排没有点开过），则需要加入
        if(!this.dunDianQuanDaoData.teamList){
          let dunDianQuanDaoTemp = this.$store.getters['event/dunDianQuanDaoData/dunDianQuanDaoInfo'];
          if(dunDianQuanDaoTemp.teamPersonList){
            let teamList = dunDianQuanDaoTemp.teamPersonList.reduce((acc,item) => {
              acc.push(item.teamId);
              return acc
            },[]);
            let needData = {
              groupName: 'dundianquandao',
              leaderPosition: dunDianQuanDaoTemp.leaderPosition,
              personPosition: dunDianQuanDaoTemp.personPosition,
              teamPersonList: dunDianQuanDaoTemp.teamPersonList,
              teamList: teamList
            }
            this.dunDianQuanDaoData = needData;
          }
        }
        this.jiDongXunChaData.groupPerson.map(item => {
          item.key = item.key.indexOf('@@@')===0?'':item.key;
          let temp = [...item.personList];
          if(temp[0]&&temp[0].id){
            if(temp.length>0){
              item.personList = [];
              item.personList = temp.reduce((acc, t) => {
                acc.push(t.id);
                return acc
              },[])
            }
          }
          if(item.leaderId===''&&item.personList.length===0){
            item.key = 'delete_'
          }
        })
        //主动去除空白行
        for(let i=this.jiDongXunChaData.groupPerson.length-1;i>=0;i--){
          if(this.jiDongXunChaData.groupPerson[i].key==='delete_'){
            this.jiDongXunChaData.groupPerson.splice(i,1)
          }
        }

        this.houQinBaoZhangData.groupPerson.map(item => {
          item.key = item.key.indexOf('@@@')===0?'':item.key;
          let temp = [...item.personList];
          if(temp[0]&&temp[0].id) {
            if (temp.length > 0) {
              item.personList = [];
              item.personList = temp.reduce((acc, t) => {
                acc.push(t.id);
                return acc
              }, [])
            }
          }
          if(item.leaderId===''&&item.personList.length===0){
            item.key = 'delete_'
          }
        })
        //主动去除空白行
        for(let i=this.houQinBaoZhangData.groupPerson.length-1;i>=0;i--){
          if(this.houQinBaoZhangData.groupPerson[i].key==='delete_'){
            this.houQinBaoZhangData.groupPerson.splice(i,1)
          }
        }

        console.log('baseInfo', this.baseInfo);
        console.log('zongZhiHuiData', this.zongZhiHuiData);
        console.log('fuZhiHuiData', this.fuZhiHuiData);
        console.log('dunDianQuanDaoData', this.dunDianQuanDaoData);
        console.log('jiDongXunChaData', this.jiDongXunChaData);
        console.log('houQinBaoZhangData', this.houQinBaoZhangData);
        this.baseInfo.startDayTime = this.baseInfo.startDayTime.toString();
        this.baseInfo.endDayTime = this.baseInfo.endDayTime.toString();
      },

      //信息智慧中心--保存草稿
      saveDraft(e){
        this.saveLoading = true;
        this.changeEventDataForSave();
        if(this.optType==='add'){
          this.baseInfo.id = '';
        }
        let params = {
          baseInfo: JSON.stringify(this.baseInfo),
          groupData: JSON.stringify({
            zongZhiHuiData: this.zongZhiHuiData,
            fuZhiHuiData: this.fuZhiHuiData,
            dunDianQuanDaoData: this.dunDianQuanDaoData,
            jiDongXunChaData: this.jiDongXunChaData,
            houQinBaoZhangData: this.houQinBaoZhangData,
            zongHeXieTiaoData: this.zongHeXieTiaoData,
            jiJianDuChaData: this.jiJianDuChaData
          })
        }
        if(this.optType!=='add'){
          this.updateEvent(params).then((res)=>{
            // console.log('updateEvent',res);
            this.saveLoading = false;
            if(res.eventId){
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
            }
            else{
              this.$message.error(res.msg);
            }

          });
        }
        else{
          this.addNewEvent(params).then((res)=>{
            // console.log('addNewEvent',res);
            this.saveLoading = false;
            if(res.eventId) {
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
            }
            else{
              this.$message.error(res.msg);
            }
          });
        }
      },

      //信息指挥中心--发起流程
      submitData(e){
        this.submitLoading = true;
        this.changeEventDataForSave();
        if(!this.checkParams()){
          this.submitLoading = false;
          return
        }
        let params = {
          baseInfo: JSON.stringify(this.baseInfo),
          groupData: JSON.stringify({
            zongZhiHuiData: this.zongZhiHuiData,
            fuZhiHuiData: this.fuZhiHuiData,
            dunDianQuanDaoData: this.dunDianQuanDaoData,
            jiDongXunChaData: this.jiDongXunChaData,
            houQinBaoZhangData: this.houQinBaoZhangData,
            zongHeXieTiaoData: this.zongHeXieTiaoData,
            jiJianDuChaData: this.jiJianDuChaData
          })
        }
        // console.log('发起流程',params);
        if(this.baseInfo.id!==''){
          this.updateEvent(params).then((res)=>{
            // console.log('updateEvent eventId',res.eventId);
            if(res.eventId) {
              this.submitEvent({ id: res.eventId }).then(res => {
                this.submitLoading = false;
                this.reset();
                this.$emit('refreshList');
                this.addEditLookDialogVisible = false;
              });
            }
            else{
              this.$message.error(res.msg);
            }
          });
        }
        else{
          this.addNewEvent(params).then((res)=>{
            // console.log('addNewEvent eventId',res.eventId);
            this.submitEvent({id: res.eventId}).then(res => {
              this.submitLoading = false;
              this.reset();
              this.$emit('refreshList');
              this.addEditLookDialogVisible = false;
            });
          });
        }

      },
      //中队--保存数据之后各个情况处理
      addTeamPerson(isNeedSubmit,isReview,teamInfo){

        this.dunDianQuanDaoData = this.$store.getters['event/dunDianQuanDaoData/dunDianQuanDaoInfo'];
        console.log('zybm dunDianQuanDaoData', this.dunDianQuanDaoData);
        let teamPersonData  = this.dunDianQuanDaoData.teamPersonList[0].teamPersonData.reduce((acc, teamPerson) => {
          if(!teamPerson.addressIds){
            teamPerson.addressIds = [teamPerson.address[0].id,teamPerson.address[1].id,teamPerson.address[2].id]
          }
          let data = {
            key: teamPerson.key.indexOf('@@@')===0?'':teamPerson.key,
            address: teamPerson.addressIds,
            leaderId: teamPerson.leaderId,
            personList: [],
            positionId: teamPerson.addressIds[2],
            zhiyuan: teamPerson.zhiyuan,
            mapId:teamPerson.mapId,
            mapType: teamPerson.mapType,
            remark: teamPerson.remark
          }
          data.personList = teamPerson.personList.reduce((ids, personId) => {
            ids.push(personId);
            return ids
          },[])
          //出现空白行，主动去除
          if(!(data.positionId===''&&data.leaderId===''&&data.personList.length===0&&data.zhiyuan.trim()==='')){
            acc.push(data);
          }
          return acc
        },[]);

        let isOk = true;
        if(teamPersonData.length===0){
          isOk = false;
        }
        else{
          teamPersonData.forEach(teamPerson => {
            if(!teamPerson.positionId){
              isOk = false;
            }
          });
        }
        if(!isOk){
          this.$message.error('道路不可为空，至少输入一条道路');
          this.reviewLoading = false;
          this.checkLoading = false;
          return;
        }

        if(!this.saveDataToGis()){
          this.reviewLoading = false;
          return;
        };

        let params = {
          eventId: this.eventId,
          teamId: this.dunDianQuanDaoData.teamPersonList[0].teamId,
          teamPersonData: JSON.stringify(teamPersonData),
        }
        console.log('addTeamPersonForNewEvent',params);
        this.addTeamPersonForNewEvent(params).then(res => {
          // console.log('addTeamPersonForNewEvent',res);
          if(res.code&&res.code==='1'){
            this.$message.error(res.msg);
          }
          else{
            if(isNeedSubmit){
              let params = {
                eventId: this.eventId,
                teamId: this.dunDianQuanDaoData.teamPersonList[0].teamId,
              }
              this.submitTeamPersonToCheck(params).then(res => {
                this.checkLoading = false;
                this.reset();
                this.$emit('refreshList');
                this.addEditLookDialogVisible = false;
              })
            }
            if(isReview){
              let userId = util.cookies.get('userId');
              if(teamInfo){
                window.open(URL_CONFIG.eventInfoURL+'teamInfo/'+ userId + '_' + this.eventId + '_' + teamInfo.teamId, teamInfo.teamName + '信息表','width=1000,height=800');
              }
              else{
                this.reviewLoading = false;
                window.open(URL_CONFIG.eventInfoURL + 'eventInfo/' + userId + '_' + this.eventId, '事件详情', 'width=1000,height=800');
              }
            }
          }
        });
      },
      //中队：提交审核
      submitCheckByTeam(){
        this.checkLoading = true;
        this.addTeamPerson(true,false);
      },
      //中心：提交审核
      submitCheckByCenter(){
        this.checkLoading = true;
        this.changeEventDataForSave();
        if(!this.checkParams()){
          this.checkLoading = false;
          return
        }
        let params = {
          baseInfo: JSON.stringify(this.baseInfo),
          groupData: JSON.stringify({
            zongZhiHuiData: this.zongZhiHuiData,
            fuZhiHuiData: this.fuZhiHuiData,
            dunDianQuanDaoData: this.dunDianQuanDaoData,
            jiDongXunChaData: this.jiDongXunChaData,
            houQinBaoZhangData: this.houQinBaoZhangData,
            zongHeXieTiaoData: this.zongHeXieTiaoData,
            jiJianDuChaData: this.jiJianDuChaData
          })
        }
        this.updateEvent(params).then((res)=>{
          // console.log('updateEvent eventId',res.eventId);
          this.submitEventToCheck({id: res.eventId}).then(res => {
            this.checkLoading = false;
            this.reset();
            this.$emit('refreshList');
            this.addEditLookDialogVisible = false;
          });
        });
      },
      //提交审核入口
      submitCheck(type){
        if(type==='zybm'){
          this.submitCheckByTeam();
        }
        if(type==='qxsl'){
          this.submitCheckByCenter();
        }
      },
      //打开提交审核按钮
      setSubmitBtnShow(data){
        // console.log('666 setSubmitBtnShow');
        let length = this.dunDianQuanDaoData.teamPersonList.length;
        if(data===length){
          this.showSubmit = true;
        }
        else{
          this.showSubmit = false;
        }
      },
      //保存gis数据输入数据库
      saveDataToGis(){
        const data = this.$store.getters['event/baoZhangData/baoZhangData'];

        //测试用的，忽略下面两行代码
        // console.log('saveDataToGis baoZhangData',data);
        // return false;

        // 删除已经存在数据库中的数据
        let searchPoint={
          id:'(',
          count:0,
          feature:[]
        }
        let searchLine={
          id:'(',
          count:0,
          feature:[]
        }
        let searchPolygon = {
          id:'(',
          count:0,
          feature:[]
        }
        Object.keys(data).forEach(key => {
          if(data[key].mapId.length>0){
            if(data[key].mapType=='Point'){
              if(data[key].drawFeature){
                  searchPoint.id += "'" + data[key].mapId + "',";
                  searchPoint.count+=1;
                  searchPoint.feature.push(data[key].drawFeature['Point'].add);
              }
            }else if(data[key].mapType=='LineString'){
              if(data[key].drawFeature) {
                searchLine.id += "'" + data[key].mapId + "',";
                searchLine.count+=1;
                searchLine.feature.push(data[key].drawFeature['LineString'].add);
              }
          }else {
              if(data[key].drawFeature) {
                searchPolygon.id += "'" + data[key].mapId + "',";
                searchPolygon.count+=1;
                searchPolygon.feature.push(data[key].drawFeature['Polygon'].add);
              }
            }
          }
        })
        if(searchPoint.count>0){
          searchPoint.id =  searchPoint.id.substring(0,searchPoint.id.length-1);
          searchPoint.id+=')';
          getEmergencyFeatures(searchPoint.id, 'Point').then(data => {
            console.log('==查询点数据==', data);
            if(data.length>0){
              postEmergencyFeatures('Point', {
                delete:data
              }).then(res => {
                console.log('==点数据==', res);
              });
            }
          })
        }
        if(searchLine.count>0){
          searchLine.id =  searchLine.id.substring(0,searchPoint.id.length-1);
          searchLine.id+=')';
          getEmergencyFeatures(searchLine.id, 'LineString').then(data => {
            console.log('==查询线数据==', data);
            if(data.length>0){
              postEmergencyFeatures('LineString', {
                delete:data
              }).then(res => {
                console.log('==线数据==', res);
              });
            }
          })
        }
        if(searchPolygon.count>0){
          searchPolygon.id =  searchPolygon.id.substring(0,searchPoint.id.length-1);
          searchPolygon.id+=')';
          getEmergencyFeatures(searchPolygon.id, 'Polygon').then(data => {
            console.log('==查询面数据==', data);
            if(data.length>0){
              postEmergencyFeatures('Polygon', {
                delete:data
              }).then(res => {
                console.log('==面数据==', res);
              });
            }
          })
        }
        if(searchPoint.feature.length>0){
          postEmergencyFeatures('Point', {
            add:searchPoint.feature
          }).then(res => {
            console.log('==点数据==', res);
            var xmlDoc = (new DOMParser()).parseFromString(res,'text/xml');
            var insertNum = xmlDoc.getElementsByTagName('wfs:totalInserted')[0].textContent;
            if(insertNum==searchPoint.feature.length){
              console.log('===保存成功====');
            }else{
              this.modalMapVisible=true;
              return false;
            }
          });
        }
        if(searchLine.feature.length>0){
          postEmergencyFeatures('LineString', {
            add:searchLine.feature
          }).then(res => {
            console.log('==线数据==', res);
            var xmlDoc = (new DOMParser()).parseFromString(res,'text/xml');
            var insertNum = xmlDoc.getElementsByTagName('wfs:totalInserted')[0].textContent;
            if(insertNum==searchLine.feature.length){
              console.log('===保存成功====');
            }else{
              this.modalMapVisible=true;
              return false;
            }
          });
        }
        if(searchPolygon.feature.length>0){
          postEmergencyFeatures('Polygon', {
            add:searchPolygon.feature
          }).then(res => {
            console.log('==面数据==', res);
            var xmlDoc = (new DOMParser()).parseFromString(res,'text/xml');
            var insertNum = xmlDoc.getElementsByTagName('wfs:totalInserted')[0].textContent;
            if(insertNum==searchPolygon.feature.length){
              console.log('===保存成功====');
            }else{
              this.modalMapVisible=true;
              return false;
            }
          });
        }
        //清理drawFeature数据，使得数据从gis库里面去取
        this.$store.commit('event/baoZhangData/clearSelfData');
        return true
      },
      //整个事件预览
      reviewEvent(){
        let userId = util.cookies.get('userId');
        if(this.optType==='look'){
          window.open(URL_CONFIG.eventInfoURL + 'eventInfo/' + userId + '_' + this.eventId, '事件详情', 'width=1000,height=800');
        }
        else {
          //先调用保存草稿方法
          if(this.userType==='qxsl') {
            this.reviewLoading = true;
            this.changeEventDataForSave();
            let params = {
              baseInfo: JSON.stringify(this.baseInfo),
              groupData: JSON.stringify({
                zongZhiHuiData: this.zongZhiHuiData,
                fuZhiHuiData: this.fuZhiHuiData,
                dunDianQuanDaoData: this.dunDianQuanDaoData,
                jiDongXunChaData: this.jiDongXunChaData,
                houQinBaoZhangData: this.houQinBaoZhangData,
                zongHeXieTiaoData: this.zongHeXieTiaoData,
                jiJianDuChaData: this.jiJianDuChaData
              })
            }
            if (this.baseInfo.id !== '') {
              this.updateEvent(params).then((res) => {
                // console.log('updateEvent', res);
                this.reviewLoading = false;
                window.open(URL_CONFIG.eventInfoURL + 'eventInfo/' + userId + '_' + this.baseInfo.id, '事件详情', 'width=1000,height=800');
              });
            } else {
              this.addNewEvent(params).then((res) => {
                // console.log('addNewEvent', res);
                this.reviewLoading = false;
                this.baseInfo.id = res.eventId;
                this.optType = 'edit';
                window.open(URL_CONFIG.eventInfoURL + 'eventInfo/' + userId + '_' + res.eventId, '事件详情', 'width=1000,height=800');
              });
            }
          }
          else if(this.userType==='zybm'){
            this.reviewLoading = true;
            this.addTeamPerson(false, true);
          }
          else {
            window.open(URL_CONFIG.eventInfoURL + 'eventInfo/' + userId + '_' + this.eventId, '事件详情', 'width=1000,height=800');
          }
        }
      },
      //单独中队的预览
      reviewTeam(data){
        if(this.optType === 'look'||this.userType === 'qxsl'||this.userType === 'jld'){
            let userId = util.cookies.get('userId');
            window.open(URL_CONFIG.eventInfoURL+'teamInfo/'+ userId + '_' + this.eventId + '_' + data.teamId, data.teamName + '信息表','width=1000,height=800');
        }
        else{
          this.addTeamPerson(false, true,data);
        }
      },
      /************************************校验 start********************************************/
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
        if(!this.dunDianQuanDaoData.teamList||this.dunDianQuanDaoData.teamList.length===0){
          this.$notification['error']({
            message: '蹲点劝导组必须选择中队',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        if(!this.checkObj(this.zongZhiHuiData)){
          this.$notification['error']({
            message: '总指挥小组各个字段必填',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        if(!this.checkObj(this.fuZhiHuiData)){
          this.$notification['error']({
            message: '副指挥小组各个字段必填',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        //
        if(!this.checkGroupObj(this.jiDongXunChaData)){
          this.$notification['error']({
            message: '机动巡查小组各个字段必填',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        if(!this.checkGroupObj(this.houQinBaoZhangData)){
          this.$notification['error']({
            message: '后勤保障小组各个字段必填',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }

        if(this.zongHeXieTiaoData.description==='') {
          this.$notification['error']({
            message: '综合协调组字段必填',
            description: '请检查',
            style: {
              width: '350px',
              marginLeft: `50px`,
              fontSize: '14px'
            }
          });
          return false
        }
        if(this.jiJianDuChaData.description===''){
          this.$notification['error']({
            message: '纪检督查组字段必填',
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

      checkObj(obj){
        if(!obj.groupTeam||obj.groupTeam.length===0){
          return false
        }
        else{
          let flag = true;
          for(let i=0; i<obj.groupTeam.length;i++){
            if(obj.groupTeam[i].leaderId===''){
                flag = false;
                break;
            }
            if(obj.groupTeam[i].teamList.length===0){
              flag = false;
              break;
            }
          }
          return flag
        }
      },
      checkGroupObj(obj){
        if(!obj.groupPerson||obj.groupPerson.length===0){
          return false
        }
        else{
          let flag = true;
          for(let i=0; i<obj.groupPerson.length;i++){
            if(obj.groupPerson[i].leaderId===''){
              flag = false;
              break;
            }
            if(obj.groupPerson[i].personList.length===0){
              flag = false;
              break;
            }
          }
          return flag
        }
      },
      /************************************校验 end********************************************/
      //领导通过中心提交
      passEvent(){
        let params =  {
          eventId: this.eventId,
          teamId: '',
          operate: '1',
          backReason: ''
        }
        this.passLoading = true;
        this.checkEvent(params).then(res => {
          this.reset();
          this.passLoading = false;
          this.$emit('refreshList');
          this.addEditLookDialogVisible = false;
        });
      },
      //打开驳回窗口
      openBackDialog(){
        this.backVisible = true;
      },
      //领导驳回中心提交
      backEvent(){
        this.confirmLoading = true;
        let params =  {
          eventId: this.eventId,
          teamId: '',
          operate: '2',
          backReason: this.backReason
        }
        this.checkEvent(params).then(res => {
          this.backReason = '';
          this.confirmLoading = false;
          this.backVisible = false;
          this.reset();
          this.$emit('refreshList');
          this.addEditLookDialogVisible = false;
        });
      },
      //选择关闭按钮
      handleCancel(){
        this.reset();
        this.$emit('refreshList');
        this.addEditLookDialogVisible = false;
      },
      reset(){
        this.templateList = [];
        this.peopleList = [];
        this.peopleListForTeam = [];
        this.activeKey = '1';
        this.templateId = '';
        this.oldTemplateId = '';
        this.showSubmit = false;
        this.baseInfo = Object.assign({},this.$options.data()['baseInfo']);
        this.zongZhiHuiData = Object.assign({},this.$options.data()['zongZhiHuiData']);
        this.fuZhiHuiData = Object.assign({},this.$options.data()['fuZhiHuiData']);
        this.dunDianQuanDaoData = Object.assign({},this.$options.data()['dunDianQuanDaoData']);
        this.jiDongXunChaData = Object.assign({},this.$options.data()['jiDongXunChaData']);
        this.houQinBaoZhangData = Object.assign({},this.$options.data()['houQinBaoZhangData']);
      },
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
  .event_dialog_body {
    width: 100%;
    height: 100%;
  }
  .subtitle-panel {
    font-size: 14px;
    height: 40px;
    margin-bottom: 10px;
    color: #028efc;
    border-botton: 1px solid #d9d9d9;
  }
  .template-panel {
    margin-bottom: 10px;
    font-size: 14px;
    padding: 8px 0 8px 40px;
    background-color: #fafafa;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    color: #028efc;
    font-size: 16px;
  }
  .turnDown {
    background-color: #fde2e2;
    color: #f76b6b;
  }
  .event_dialog_body_content {
    height: calc(100% - 60px);
    position: relative;
    .loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      background-color: rgba(255, 255, 255, 0.8);
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
    .ant-modal-footer {
      text-align: center;
    }
  }
  .ant-collapse-header {
    .anticon {
      color: #00a4fe;
    }
  }
}
</style>
