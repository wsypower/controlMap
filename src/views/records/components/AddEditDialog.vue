<template>
    <a-modal :title="dialogTitle" v-model="addEditDialogVisible" class="add-edit-dialog" width="80%">
        <div class="yuan_dialog_body">
            <cg-container scroll>
                <a-form :form="form">
                    <a-collapse v-model="activeKey">
                        <a-collapse-panel header="基本信息" key="1">
                            <a-row>
                                <a-col :span="8">
                                    <a-form-item label="预案名称：" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                        <a-input v-decorator="['name',{rules: [{ required: true, message: 'Please input your note!' }]}]"
                                                 placeholder="请输入预案名称"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="8">
                                    <a-form-item label="预案类型：" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                        <a-select v-decorator="['typeId',{rules: [{ required: true, message: '请选择预案类型！' }]}]"
                                                  placeholder="请选择预案类型">
                                            <a-select-option value="levelOne">一级预案</a-select-option>
                                            <a-select-option value="levelTwo">二级预案</a-select-option>
                                            <a-select-option value="levelThree">三级预案</a-select-option>
                                            <a-select-option value="baozhang">保障预案</a-select-option>
                                            <a-select-option value="other">其他预案</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="8">
                                    <a-form-item label="保障时间：" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                        <a-range-picker v-decorator="['dayRange', {rules: [{ type: 'array', required: true, message: 'Please select time!' }]}]" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-form-item label="预案描述：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                                    <a-textarea v-model="yuAnForm.description" placeholder="示例：为切实做好6月9日张学友演唱会的保障工作，确保以一流的市容环境向观看演唱会的全国各地歌迷展示金华的整体形象，根据上级的工作部署，特制定如下保障方案。" :autosize="{ minRows: 2, maxRows: 2 }" />
                                </a-form-item>
                            </a-row>
                            <a-row>
                                <a-form-item label="工作目标：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                                    <a-textarea v-model="yuAnForm.jobGoal" placeholder="示例：紧紧围绕建设“美丽金华”的总体目标，积极做好演唱会期间各项城市管理保障工作，确保整个城市容貌整洁、道路畅通、环境优美。" :autosize="{ minRows: 2, maxRows: 2 }" />
                                </a-form-item>
                            </a-row>
                            <a-row>
                                <a-form-item label="组织领导及任务分工：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                                    <a-textarea v-model="yuAnForm.jobAssignment" placeholder="示例：为加强演唱会期间保障工作的组织领导与协调，切实应对保障工作中所出现的各类问题，及时有效处置保障工作中出现的突发事件，决定成立保障工作领导小组，分局党委书记、局长陈威虎任总指挥，分局副局长余文斌任副总指挥，各中队长、科长为领导小组成员。领导小组下设专项工作组，由我分局165名人员组成，确保保障期间各项工作的顺利实施。" :autosize="{ minRows: 2, maxRows: 2 }" />
                                </a-form-item>
                            </a-row>
                            <a-row>
                                <a-form-item label="工作内容：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                                    <a-textarea v-model="yuAnForm.jobContent" placeholder="示例：落实蹲点劝导与机动巡查相结合的方式开展保障工作，重点做好占道经营、流动摊贩、人行道机动车与非机动车乱停放的管理，无流动无照经营、散发小广告、乱张贴等违法行为。同时配合相关部门维护现场秩序，确保人员财产安全。" :autosize="{ minRows: 2, maxRows: 2 }" />
                                </a-form-item>
                            </a-row>
                            <a-row>
                                <a-form-item label="工作要求：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                                    <a-textarea v-model="yuAnForm.jobRequirements" placeholder="示例：（一）统一思想、加强领导。此次保障工作时间紧，任务重，各单位要进一步提高认识，强化组织领导，认真做好前期组织动员工作，明确任务，落实责任，集中力量做好保障工作，确保保障工作不出现纰漏。
  （二）密切配合，听从指挥。各单位保障期间要密切配合，听从指挥，严格执行领导小组下达的各项任务指令，确保保障工作落实到位。
  （三）文明劝导，严格执法。要树立以人为本的理念，开展文明劝导，注意方式方法。对一些屡教不改的行为，要从严处罚,严肃处理。
  （四）严格督查、责任追究。参加人员要统一着装（要求着短袖制服、作训帽、黑皮鞋），按时到岗，服从指挥，工作中要自觉维护队伍形象。政工科、业务督查科要加强对人员到岗、执勤工作和队容风纪等情况进行督查和通报。" :autosize="{ minRows: 2, maxRows: 2 }" />
                                </a-form-item>
                            </a-row>
                        </a-collapse-panel>
                        <a-collapse-panel header="人员安排" key="2">
                            <a-table :columns="columns" :dataSource="yuAnForm.groupData" :pagination="false">
                                <template slot="groupName" slot-scope="text, record, index">
                                    <div key="groupName">
                                        <a-input :value="text" @change="e => changeGroupName(e.target.value, record.key, 'groupName')"/>
                                    </div>
                                </template>
                                <span slot="person" slot-scope="text, record, index">
                                    <a-tag v-for="person in record.personList" color="blue" :key="person" closable :afterClose="() => closeTag(person,index)">{{person}}</a-tag>
                                    <a-button type="primary" size="small" @click="openPeopleDialog(index)">人员选择</a-button>
                                  </span>
                                <span slot="action" slot-scope="text, record, index">
                                      <a-popconfirm v-if="yuAnForm.groupData.length>1" title="Sure to delete?" @confirm="() => deleteGroup(index)">
                                         <a-icon type="minus-circle" class="icon_delete"/>
                                      </a-popconfirm>
                                    <a-icon v-if="index === yuAnForm.groupData.length-1" type="plus-circle" class="icon_add" @click="addGroup(record,index)"/>
                                  </span>
                            </a-table>
                        </a-collapse-panel>
                        <a-collapse-panel header="保障视图" key="3">
                            <a-button type="primary" @click="openBaoZhangMapDialog">保障视图</a-button>
                        </a-collapse-panel>
                    </a-collapse>
                </a-form>
            </cg-container>
        </div>
        <template slot="footer">
            <a-button type="primary" :loading="saveLoading" @click="saveDraft" >保存草稿</a-button>
            <a-button type="primary" :loading="loading" @click="openChooseReviewPersonDialog">提交审核</a-button>
            <a-button type="primary" :loading="lastLoading" @click="completeCheck">结束审核</a-button>
        </template>
        <choose-people-dialog :visible.sync="choosePeopleDialogVisible" @choosePeople="choosePeople"></choose-people-dialog>
        <bao-zhang-map-dialog :visible.sync="mapDialogVisible" ></bao-zhang-map-dialog>
        <choose-review-person-dialog :visible.sync="chooseReViewPersonDialogVisible" @choosePerson="choosePerson"></choose-review-person-dialog>
    </a-modal>
</template>
<script type="text/ecmascript-6">
  import ChoosePeopleDialog from './ChoosePeopleDialog'
  import ChooseReviewPersonDialog from './ChooseReviewPersonDialog'
  import BaoZhangMapDialog from './BaoZhangMapDialog'
  const groupColumns = [{
    title: '组名称',
    dataIndex: 'groupName',
    key: 'groupName',
    scopedSlots: { customRender: 'groupName' },
    width: '280px'
  }, {
    title: '人员',
    dataIndex: 'personList',
    key: 'personList',
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
        yuAnForm:{
          type: Object,
          default(){
            return {
              name: '',
              typeId: '',
              startDay: '',
              endDay: '',
              description: '',
              jobGoal: '',
              jobAssignment: '',
              jobContent: '',
              jobRequirements: '',
              groupData: [{
                key: 'azxcvbnm',
                groupName: '',
                personList: []
              }]
            }
          }
        }
      },
      data(){
        return{
          addEditDialogVisible: false,
          activeKey: '1',
          form: null,

          columns: groupColumns,
          rowIndex: null,

          saveLoading: false,
          loading: false,
          lastLoading: false,

          choosePeopleDialogVisible: false,
          mapDialogVisible: false,
          chooseReViewPersonDialogVisible: false,
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
        init(){

        },
        addGroup(item, index){
          console.log('addGroup',item, index)
          let additem = {
            key: index.toString(),
            groupName: '',
            personList: []
          }
          this.yuAnForm.groupData.push(additem);
        },
        deleteGroup(index){
          console.log('deleteGroup',index)
          this.yuAnForm.groupData.splice(index,1);
        },
        changeGroupName(val,key,colName){
          //console.log('changeGroupName',val,key,colName);
          const newData = [...this.yuAnForm.groupData];
          const target = newData.filter(item => key === item.key)[0];
          if (target) {
            target[colName] = val;
            this.yuAnForm.groupData = newData;
          }
        },
        closeTag (person,index) {
          const persons = this.yuAnForm.groupData[index].personList.filter(item => item !== person);
          console.log(persons);
          this.yuAnForm.groupData[index].personList = persons;
        },
        saveDraft(e){
          e.preventDefault();
          //调取接口保存的预案状态为未提交
          this.form.validateFields((err, values) => {
            if (!err) {
              console.log('form: value', values);
              this.yuAnForm.name = values.name;
              this.yuAnForm.typeId = values.typeId;
              this.yuAnForm.startDay = values.dayRange[0]._d.getTime();
              this.yuAnForm.endDay = values.dayRange[1]._d.getTime();
            }
          });
          this.saveLoading = true;
          console.log('saveDraft',this.yuAnForm);
          setTimeout(()=>{
            this.saveLoading = false;
          },3000)
        },

        completeCheck(){
          //调取接口改变预案的状态（已同意->未开始）
          this.addYuAnDialogVisible = false;
        },
        openPeopleDialog(index){
          this.rowIndex = index;
          this.choosePeopleDialogVisible = true;
        },
        choosePeople(data){
          console.log('choosePeople',data);
          //this.yuAnForm.groupData[this.rowIndex].personList = data.name;
          // this.choosePeopleDialogVisible = false;
        },
        //开启保障视图弹窗
        openBaoZhangMapDialog(){
          this.mapDialogVisible = true;
        },
        /*************************选择审核人员弹窗 start*******************************/
        openChooseReviewPersonDialog(){
          this.chooseReViewPersonDialogVisible = true;
        },
        choosePerson(data){
          console.log('choosePerson',data);
          this.loading = true;
          console.log('yuAnForm',this.yuAnForm);
          setTimeout(()=>{
            this.loading = false;
            this.addYuAnDialogVisible = false;
          },3000)
        },
        /*************************选择审核人员弹窗 end*******************************/
      }
    }
</script>
<style lang="scss" scoped>
    .add-edit-dialog{
        width: 80%;
        min-width: 1080px;
        .yuan_dialog_body{
            height: 500px;
            position:relative;
            .icon_delete, .icon_add{
                font-size: 18px;
                cursor: pointer;
                &:hover{
                    color:#00a4fe;
                }
            }
            .icon_add{
                margin-left: 10px;
            }

        }
    }
</style>
