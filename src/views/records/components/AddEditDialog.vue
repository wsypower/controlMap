<template>
  <a-modal :title="dialogTitle"
           v-model="addEditDialogVisible"
           wrapClassName="addmodelwrap"
           class="add-edit-dialog"
           width="100%"
           style="paddingBottom: 0px;margin: 0px;height: 100%;top:0px"
           :bodyStyle="{height:'calc(100% - 108px)',padding:'10px 20px 0px 20px'}"
           :mask="false"
           :maskClosable="false"
           :destroyOnClose="true"
           @cancel="handleCancel">
    <div v-if="operateType == 'add'" class="template-panel">
      <label>
        <a-icon type="snippets" theme="twoTone" style="marginRight:5px" />选择模板创建：
      </label>
      <a-select v-model="templateId" placeholder="请选择模板" style="width: 180px;" @change="handleUserTemplate">
        <a-select-option v-for="(item, index) in templateList" :value="item.id" :key="index">{{item.name }}</a-select-option>
      </a-select>
    </div>
    <div v-if="submitForm.statusId == '04'" class="template-panel turnDown">
      <span>
        <a-icon type="close-circle" theme="twoTone" twoToneColor="#F76B6B" style="marginRight:5px"  />驳回原因：
      </span>
      <span style="color:#F76B6B">{{submitForm.backReason}}</span>
    </div>
    <div class="yuan_dialog_body">
      <div v-show="dataLoading" class="loading" flex="main:center cross:center">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll>
        <a-form :form="form" layout="horizontal">
          <a-collapse v-model="activeKey">
            <a-collapse-panel key="1">
              <template slot="header">
                <div class="collapse__header">
                  <a-icon type="reconciliation" theme="twoTone" />基本信息
                </div>
              </template>
              <a-row>
                  <a-form-item label="预案名称：" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
                    <a-input
                      v-decorator="['name', { rules: [{ required: true, message: '请输入预案名!' }] }]"
                      placeholder="请输入预案名称"
                    />
                  </a-form-item>
              </a-row>
              <a-row>
                  <a-form-item label="预案类型：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                    <a-select
                      v-decorator="['typeId', { rules: [{ required: true, message: '请选择预案类型！' }] }]"
                      placeholder="请选择预案类型"
                      style="width: 140px;"
                    >
                      <a-select-option v-for="(item, index) in yuAnTypeList" :value="item.id" :key="index">{{
                        item.name
                      }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-row>
                <a-row>
                  <a-form-item label="保障时间：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                    <a-range-picker
                      show-time
                      v-decorator="[
                        'dayRange',
                        { rules: [{ type: 'array', required: true, message: '请选择保障时间！' }] }
                      ]"
                      format="YYYY-MM-DD HH:mm:ss"
                    />
                  </a-form-item>
                </a-row>
              <a-row>
                <a-form-item label="预案描述：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                  <a-textarea
                    v-model="submitForm.description"
                    placeholder="示例：为切实做好6月9日张学友演唱会的保障工作，确保以一流的市容环境向观看演唱会的全国各地歌迷展示金华的整体形象，根据上级的工作部署，特制定如下保障方案。"
                    :autosize="{ minRows: 2, maxRows: 2 }"
                  />
                </a-form-item>
              </a-row>
              <a-row>
                <a-form-item label="工作目标：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                  <a-textarea
                    v-model="submitForm.jobGoal"
                    placeholder="示例：紧紧围绕建设“美丽金华”的总体目标，积极做好演唱会期间各项城市管理保障工作，确保整个城市容貌整洁、道路畅通、环境优美。"
                    :autosize="{ minRows: 2, maxRows: 2 }"
                  />
                </a-form-item>
              </a-row>
              <a-row>
                <a-form-item label="组织领导及任务分工：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                  <a-textarea
                    v-model="submitForm.jobAssignment"
                    placeholder="示例：为加强演唱会期间保障工作的组织领导与协调，切实应对保障工作中所出现的各类问题，及时有效处置保障工作中出现的突发事件，决定成立保障工作领导小组，分局党委书记、局长陈威虎任总指挥，分局副局长余文斌任副总指挥，各中队长、科长为领导小组成员。领导小组下设专项工作组，由我分局165名人员组成，确保保障期间各项工作的顺利实施。"
                    :autosize="{ minRows: 2, maxRows: 2 }"
                  />
                </a-form-item>
              </a-row>
              <a-row>
                <a-form-item label="工作内容：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                  <a-textarea
                    v-model="submitForm.jobContent"
                    placeholder="示例：落实蹲点劝导与机动巡查相结合的方式开展保障工作，重点做好占道经营、流动摊贩、人行道机动车与非机动车乱停放的管理，无流动无照经营、散发小广告、乱张贴等违法行为。同时配合相关部门维护现场秩序，确保人员财产安全。"
                    :autosize="{ minRows: 2, maxRows: 2 }"
                  />
                </a-form-item>
              </a-row>
              <a-row>
                <a-form-item label="工作要求：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                  <a-textarea
                    v-model="submitForm.jobRequirements"
                    placeholder="示例：（一）统一思想、加强领导。此次保障工作时间紧，任务重，各单位要进一步提高认识，强化组织领导，认真做好前期组织动员工作，明确任务，落实责任，集中力量做好保障工作，确保保障工作不出现纰漏。
  （二）密切配合，听从指挥。各单位保障期间要密切配合，听从指挥，严格执行领导小组下达的各项任务指令，确保保障工作落实到位。
  （三）文明劝导，严格执法。要树立以人为本的理念，开展文明劝导，注意方式方法。对一些屡教不改的行为，要从严处罚,严肃处理。
  （四）严格督查、责任追究。参加人员要统一着装（要求着短袖制服、作训帽、黑皮鞋），按时到岗，服从指挥，工作中要自觉维护队伍形象。政工科、业务督查科要加强对人员到岗、执勤工作和队容风纪等情况进行督查和通报。"
                    :autosize="{ minRows: 2, maxRows: 2 }"
                  />
                </a-form-item>
              </a-row>
            </a-collapse-panel>
            <a-collapse-panel key="2">
              <template slot="header">
                <div class="collapse__header">
                  <a-icon type="save" theme="twoTone" />人员安排
                </div>
              </template>
              <a-table :columns="columns" :dataSource="groupData" :pagination="false" bordered>
                <template slot="groupName" slot-scope="text, record, index">
                  <div key="groupName">
                    <a-input :value="text" @change="e => changeGroupName(e.target.value, record.key, 'groupName')" />
                  </div>
                </template>
                <span slot="person" slot-scope="text, record, index">
                  <a-tag
                    v-for="person in record.checkedPeopleList"
                    color="blue"
                    :key="person.id"
                    closable
                    @close="($event) => closeTag(person.id, index,$event)"
                    >{{ person.name }}</a-tag
                  >
                  <a-button type="primary" size="small" @click="openPeopleDialog(index)">人员选择</a-button>
                </span>
                <span slot="action" slot-scope="text, record, index">
                  <a-popconfirm
                    v-if="groupData.length > 1"
                    title="确定删除这个组吗？"
                    @confirm="() => deleteGroup(index)"
                  >
                    <a-icon type="minus-circle" class="icon_delete" />
                  </a-popconfirm>
                  <a-icon
                    v-if="index === groupData.length - 1"
                    type="plus-circle"
                    class="icon_add"
                    @click="addGroup(record, index)"
                  />
                </span>
              </a-table>
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
        </a-form>
      </cg-container>
    </div>
    <template slot="footer">
      <a-button type="primary" :loading="saveLoading" @click="saveDraft">保存草稿</a-button>
      <a-button type="primary" :loading="loading" @click="openChooseReviewPersonDialog">提交审核</a-button>
      <a-button v-if="submitForm.statusId=='03'" type="primary" :loading="lastLoading" @click="completeCheck">结束审核</a-button>
    </template>
    <choose-people-dialog
      :visible.sync="choosePeopleDialogVisible"
      :disablePeopleKey="disablePeopleKey"
      @choosePeople="choosePeople"
    ></choose-people-dialog><bao-zhang-map-dialog
      :visible.sync="mapDialogVisible"
      :sourcePeopleList="sourcePeopleList"
      :baoZhangData="baoZhangData"
      @saveDrawData="saveDraw"
    ></bao-zhang-map-dialog>
    <choose-review-person-dialog
      :visible.sync="chooseReViewPersonDialogVisible"
      @choosePerson="choosePerson"
    ></choose-review-person-dialog>
  </a-modal>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import moment from 'moment';
import util from '@/utils/util'
import ChoosePeopleDialog from './ChoosePeopleDialog'
import ChooseReviewPersonDialog from './ChooseReviewPersonDialog'
import BaoZhangMapDialog from './BaoZhangMapDialog'
import {postEmergencyFeatures} from '@/api/map/service'
const groupColumns = [{
  title: '组名称',
  dataIndex: 'groupName',
  key: 'groupName',
  scopedSlots: { customRender: 'groupName' },
  width: '280px'
}, {
  title: '人员',
  dataIndex: 'checkedPeopleList',
  key: 'checkedPeopleList',
  scopedSlots: { customRender: 'person' }
}, {
  title: '操作',
  key: 'action',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' },
  width: '100px'
}];
  export default {
    name: 'addEditDialog',
    components:{
      ChoosePeopleDialog,
      ChooseReviewPersonDialog,
      BaoZhangMapDialog
    },
    props:{
      visible:{
        type: Boolean,
        default: false
      },
      dialogTitle:{
        type: String,
        default: '新增预案'
      },
      yuAnId:{
        type: String,
        default: ''
      }
    },
    data(){
      return{
        addEditDialogVisible: false,
        templateList: [],
        templateId: '',
        dataLoading: false,
        activeKey: '1',
        form: null,
        yuAnTypeList: [],
        columns: groupColumns,
        rowIndex: null,
        submitForm:{
          name: '',
          typeId: '',
          statusId: '01',
          startDayTime: '',
          endDayTime: '',
          description: '',
          jobGoal: '',
          jobAssignment: '',
          jobContent: '',
          jobRequirements: '',
          groupDataStr: '',
          baoZhangDataStr: '',
          reviewUserId: '',
          isTemplate: '0'
        },
        groupData: [{
          key: 'jhhjsddsdds',
          groupName: '',
          checkedPeopleList: [],
          peopleKeyList: []
        }],
        baoZhangData: [],

        saveLoading: false,
        loading: false,
        lastLoading: false,

        choosePeopleDialogVisible: false,
        checkedPeopleKey: [],
        disablePeopleKey: [],

        mapDialogVisible: false,
        sourcePeopleList: [],
        drawFeatures: [],
        chooseReViewPersonDialogVisible: false,
      }
    },
    computed:{
      operateType(){
        return this.yuAnId==''?'add':'edit';
      }
    },
    created(){
      this.form = this.$form.createForm(this);
    },
    mounted(){},
    watch:{
      addEditDialogVisible:function(val){
        if(val){
          this.init();
        }
        else{
          this.$emit('update:visible', false);
        }
      },
      visible:function(val){
        if(val){
          this.addEditDialogVisible = true;
        }
      }
    },
    methods:{
      ...mapActions('emergency/emergency', ['addNewEmergencyYuAn','getEmergencyYuAnById','setEmergencyYuAnToFinishReview','getTemplateYuAnDataList']),
      ...mapActions('emergency/common', ['getYuAnTypeDataList']),
      init(){
        this.getYuAnTypeDataList().then((r)=>{
          this.yuAnTypeList = r;
          if(this.operateType=='edit'){
            this.getYuAnInfoById(this.yuAnId);
          }
          else{
            this.getTemplateYuAnDataList().then((res)=>{
              this.templateList = res;
            });
          }
        });
      },
      handleUserTemplate(val){
        console.log('handleUserTemplate',val);
        this.getYuAnInfoById(val);
      },
      getYuAnInfoById(id){
        this.dataLoading = true;
        this.groupData = [];
        this.baoZhangData = [];
        this.getEmergencyYuAnById({id:id}).then((result)=>{
          console.log('getEmergencyYuAnById',result);
          this.groupData = result.groupData.reduce((res,item)=>{
            let temp={
              key: item.id,
              groupName: item.groupName,
              checkedPeopleList: item.personList,
              peopleKeyList: []
            }
            temp.peopleKeyList = item.personList.reduce((r,i)=>{
              r.push(i.id)
              this.disablePeopleKey.push(i.id);
              return r
            },[])
            res.push(temp)
            return res
          },[])
          this.sourcePeopleList = this.getSourcePeolpleList();
          this.baoZhangData = result.baoZhangData.reduce((res,item)=>{
            let temp = {
              id: item.id,
              mapId: item.mapId,
              name: item.name,
              mapType: item.mapType,
              personList: [],
              remark: item.remark
            }
            temp.personList = item.peopleList.reduce((r,i)=>{
              r.push(i.id)
              return r
            },[]);
            res.push(temp)
            return res
          },[]);
          delete result.groupData
          delete result.baoZhangData
          this.submitForm = Object.assign(this.$options.data()['submitForm'],result)
          console.log('edit init:submitForm groupData baoZhangData',this.submitForm,this.groupData,this.baoZhangData);
          // let startTime = util.formatDate(this.submitForm.startDayTime);


          let startTime  = moment(this.submitForm.startDayTime).format('YYYY-MM-DD HH:mm:ss');
          let endTime  = moment(this.submitForm.endDayTime).format('YYYY-MM-DD HH:mm:ss');
          console.log('startTime endTime',startTime,endTime);
          this.form.setFieldsValue({
            typeId: this.submitForm.typeId,
            name: this.submitForm.name,
            dayRange: [moment(startTime,'YYYY-MM-DD HH:mm:ss'),moment(endTime,'YYYY-MM-DD HH:mm:ss')]
          });
          this.dataLoading = false;
        });
      },
      reset(){
        this.drawFeatures=null;
        this.activeKey = '1';
        this.form.setFieldsValue({
          typeId: '',
          name: '',
          dayRange: undefined
        });
        this.submitForm = Object.assign({},this.$options.data()['submitForm']);
        this.disablePeopleKey = [];
        this.groupData = [{
          key: 'jhhjsddsdds',
          groupName: '',
          checkedPeopleList: [],
          peopleKeyList: []
        }];
        this.baoZhangData = [];
      },
      addGroup(item, index){
        console.log('addGroup',item, index)
        let additem = {
          key: index.toString(),
          groupName: '',
          checkedPeopleList: [],
          peopleKeyList: []
        }
        this.groupData.push(additem);
      },
      changeGroupName(val,key,colName){
        //console.log('changeGroupName',val,key,colName);
        const newData = [...this.groupData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[colName] = val;
          this.groupData = newData;
        }
      },
      closeTag (person,index,e) {
        console.log(person,index);
        let arr = this.getPeolpleListInBaoZhangData();
        let flag = arr.some((item)=>{
          return item === person
        });
        if(flag){
          e.preventDefault();
          this.$notification['warning']({
            message: '不可删除此成员',
            description: '该成员在保障点位中存在，请先从保障点位中删除',
            style:{
              width: '400px',
              marginLeft: `0px`,
              fontSize: '14px'
            }
          });
          return
        }
        const personIds = this.groupData[index].peopleKeyList.filter(item => item !== person);
        const persons = this.groupData[index].checkedPeopleList.filter(item => item.id !== person);
        let i = this.disablePeopleKey.indexOf(person);
        this.disablePeopleKey.splice(i,1);
        console.log(persons);
        this.groupData[index].peopleKeyList = personIds;
        this.groupData[index].checkedPeopleList = persons;
      },
      openPeopleDialog(index){
        this.rowIndex = index;
        this.choosePeopleDialogVisible = true;
      },
      choosePeople(data){
        console.log('choosePeople',data);
        data.forEach((item)=>{
          this.disablePeopleKey.push(item.id);
          this.groupData[this.rowIndex].checkedPeopleList.push(item);
          this.groupData[this.rowIndex].peopleKeyList.push(item.id);
        })
        console.log('choosePeople groupData',this.groupData);
      },
      deleteGroup(index){
        //console.log('deleteGroup',index)

        let list = this.groupData[index].peopleKeyList;
        let arr = this.getPeolpleListInBaoZhangData();
        for(let i=0;i<list.length;i++){
          let flag = arr.some((item)=>{
            return item === list[i]
          });
          if(flag){
            this.$notification['warning']({
              message: '不可删除此组',
              description: '该组成员在保障点位中存在，请先从保障点位中删除人员',
              style:{
                width: '400px',
                marginLeft: `0px`,
                fontSize: '14px'
              }
            });
            return
          }
        }

        list.forEach((key)=>{
          let i = this.disablePeopleKey.indexOf(key);
          this.disablePeopleKey.splice(i,1);
        })

        this.groupData.splice(index,1);
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

        this.addNewEmergencyYuAn(this.submitForm).then((res)=>{
          console.log('addNewEmergencyYuAn',res);
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
          this.addEditDialogVisible = false;
        });
      },
      //保存草稿
      saveDraft(e){
        e.preventDefault();
        //调取接口保存的预案状态为未提交
        this.submitForm.statusId = '01';
        this.saveLoading = true;
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('form: value', values);
            this.submitForm.name = values.name;
            this.submitForm.typeId = values.typeId;
            this.submitForm.startDayTime = values.dayRange[0]._d.getTime();
            this.submitForm.endDayTime = values.dayRange[1]._d.getTime();
            this.saveData('save');
          }
          else{
            this.saveLoading = false;
          }
        });
      },
      /*************************选择审核人员弹窗 start*******************************/
      openChooseReviewPersonDialog(){
        this.loading = true;
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('form: value', values);
            this.submitForm.name = values.name;
            this.submitForm.typeId = values.typeId;
            this.submitForm.startDayTime = values.dayRange[0]._d.getTime();
            this.submitForm.endDayTime = values.dayRange[1]._d.getTime();
            if(!this.checkParams()){
              this.loading = false;
              return
            }
            this.loading = false;
            this.chooseReViewPersonDialogVisible = true;
          }
          else {
            this.loading = false;
          }
        });
      },

      choosePerson(data){
        console.log('审核人员选择输出',data);
        this.submitForm.reviewUserId = data;
        this.submitForm.statusId = '02';
        this.saveData('submit');
      },
      /*************************选择审核人员弹窗 end*******************************/

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
      //点击结束审核按钮触发
      completeCheck(){
        //调取接口改变预案的状态（已同意->未开始）
        this.setEmergencyYuAnToFinishReview({id:this.submitForm.id}).then((res)=>{
          console.log('completeCheck',res);
          this.$emit('refreshList');
          this.reset();
          this.addEditDialogVisible = false;
        });
      },

      handleCancel(){
        this.reset();
        this.addEditDialogVisible = false;
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
  .yuan_dialog_body {
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
