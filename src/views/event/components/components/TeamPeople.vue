<template>
    <div class="team-people-panel">
        <div class="team-people-panel-header" flex="cross:center main:justify">
            <span>蹲点劝导组：</span>
            <div v-if="nowOptType==='add'" class="team-people-panel-header-right">
                <a-tag
                        v-for="person in teamList"
                        color="blue"
                        :key="person.id"
                        closable
                        @close="($event) => closeTeamTag(person, index,$event)"
                >{{ person.name }}</a-tag>
                <a-button type="primary" size="small" @click="openTeamDialog">中队选择</a-button>
            </div>
        </div>
        <div class="team-people-panel-method" flex="dir:left cross:center">
            <div class="" flex="dir:left cross:center">
                <label>负责人定位方式：</label>
                <a-radio-group v-if="nowOptType!=='look'" name="radioGroup" v-model="groupData.leaderPosition">
                    <a-radio :value="1">单兵设备</a-radio>
                    <a-radio :value="2">手机</a-radio>
                </a-radio-group>
                <span v-else>{{leaderPositionName}}</span>
            </div>
            <div class="" flex="dir:left cross:center">
                <label>执勤人定位方式：</label>
                <a-radio-group v-if="nowOptType!=='look'" name="radioGroup" v-model="groupData.personPosition">
                    <a-radio :value="1">单兵设备</a-radio>
                    <a-radio :value="2">手机</a-radio>
                </a-radio-group>
                <span v-else>{{personPositionName}}</span>
            </div>
        </div>
        <a-table v-if="nowOptType==='add'" :columns="columns" :dataSource="[]" :pagination="false" bordered>
            <template slot="loadPosition" slot-scope="text, record, index">
                <div key="loadPosition"></div>
            </template>
            <span slot="leaderId" slot-scope="text, record, index"></span>
            <span slot="personList" slot-scope="text, record, index"></span>
            <span slot="action" slot-scope="text, record, index"></span>
        </a-table>
        <div v-else>
            <div class="team-people-panel-item" v-for="(team, teamIndex) in teamPersonList" :key="team.teamId">
                <div class="team-item-header" flex="dir:left cross:center main:justify">
                    <span class="team-item-header-left">{{team.teamName}}</span>
                    <div class="team-item-header-right" flex="dir:left cross:center">
                        <div>
                            <span v-if="btnOptType==='look'||team.checkStatusId===1"
                                  class="team-item_status"
                                  :class="{red:team.checkStatusId===4, blue:team.checkStatusId===1, yellow:team.checkStatusId===2,green:team.checkStatusId===3}">
                                {{team.checkStatusName}}
                            </span>
                            <span v-if="btnOptType==='edit'&&team.checkStatusId!==1" class="btn btn_review" @click="lookTeamPeopleSet(team)">预览</span>
                            <span v-if="btnOptType==='edit'&&(team.checkStatusId===2||team.checkStatusId===4)" class="btn btn_pass" @click="passTeamPeopleSet(teamIndex,team.teamId)">确认</span>
                            <span v-if="btnOptType==='edit'&&team.checkStatusId===3" class="btn btn_pass_text">已确认</span>
                            <span v-if="btnOptType==='edit'&&(team.checkStatusId===2||team.checkStatusId===3)" class="btn btn_back" @click="openBackModal(teamIndex)">驳回</span>
                            <span v-if="btnOptType==='edit'&&team.checkStatusId===4" class="btn btn_back_text">已驳回</span>
                        </div>
                        <a-icon class="btn_hide" :class="{open: teamIndex>0}" type="up" />
                    </div>
                </div>
                <a-table v-if="nowOptType==='look'||team.checkStatusId===3" :columns="columns" :dataSource="team.teamPersonData" :pagination="false" bordered>
                    <template slot="loadPosition" slot-scope="text, record, index">
                        <div key="loadPosition">
                            <span>{{record.addressName}}</span>
                        </div>
                    </template>
<!--                    <template slot="position" slot-scope="text, record, index">-->
<!--                        <div key="position">-->
<!--                            <span>{{record.position}}</span>-->
<!--                        </div>-->
<!--                    </template>-->
                    <template slot="leaderId" slot-scope="text, record, index">
                        <div key="leaderId">
                            <span>{{record.leaderName}}</span>
                        </div>
                    </template>
                    <span slot="personList" slot-scope="text, record, index">
                        <a-tag v-for="person in record.personList"
                                color="blue"
                                :key="person.id"
                        >{{ person.name }}</a-tag>
                    </span>
                    <span slot="action" slot-scope="text, record, index"></span>
                </a-table>
                <a-table v-else :columns="columns" :dataSource="team.teamPersonData" :pagination="false" bordered>
                    <template slot="loadPosition" slot-scope="text, record, index">
                        <div key="loadPosition">
<!--                            <a-input :value="text" @change="e => changeInputText(teamIndex, e.target.value, record.key, 'loadName')" />-->
                            <a-cascader :options="options" change-on-select v-model="record.addressIds" @change="(value, selectedOptions)=>{changeAddress(teamIndex,value,record.key)}" style="width: 100%"/>
                        </div>
                    </template>
<!--                    <template slot="position" slot-scope="text, record, index">-->
<!--                        <div key="position">-->
<!--                            <a-input :value="text" @change="e => changeInputText(teamIndex, e.target.value, record.key, 'position')" />-->
<!--                        </div>-->
<!--                    </template>-->
                    <template slot="leaderId" slot-scope="text, record, index">
                        <div key="leaderId">
                            <a-select
                                    show-search
                                    v-model="record.leaderId"
                                    placeholder="请选择"
                                    option-filter-prop="children"
                                    style="width: 200px"
                                    :filter-option="filterOption"
                            >
                                <a-select-option :value="people.id" v-for="people in peopleList" :key="people.id">
                                    {{people.name}}
                                </a-select-option>
                            </a-select>
                        </div>
                    </template>
                    <span slot="personList" slot-scope="text, record, index">
                        <a-tag v-for="person in record.personList"
                               color="blue"
                               :key="person.id"
                               closable
                               @close="($event) => closeTag(person, index,$event)"
                        >{{ person.name }}</a-tag>
                          <a-button type="primary" size="small" @click="openPeopleDialog(teamIndex,index)">人员选择</a-button>
                        </span>
                    <span slot="action" slot-scope="text, record, index">
                  <a-popconfirm
                          v-if="team.teamPersonData.length > 1"
                          theme="filled"
                          title="确定删除这个组吗？"
                          @confirm="() => deleteGroup(teamIndex,index)"
                  >
                    <a-icon type="minus-circle" class="icon_delete" />
                  </a-popconfirm>
                  <a-icon
                          v-if="index === team.teamPersonData.length - 1"
                          theme="filled"
                          type="plus-circle"
                          class="icon_add"
                          @click="addGroup(record, index,teamIndex)"
                  />
                </span>
                </a-table>
            </div>
        </div>
        <choose-team-dialog
            :visible.sync="chooseTeamDialogVisible"
            :defaultCheckedIds="defaultCheckedTeamIds"
            @chooseTeam="chooseTeam"
        ></choose-team-dialog>
        <choose-people-dialog
            :visible.sync="choosePeopleDialogVisible"
            :defaultCheckedPeopleIds="defaultCheckedPeopleIds"
            @choosePeople="choosePeople"
        ></choose-people-dialog>
        <team-review-dialog
            :visible.sync="teamInfoDialogVisible"
            :title="teamInfoTitle"
            :teamInfo="teamInfo">
        </team-review-dialog>
        <a-modal title="驳回理由"
                :visible="backVisible"
                :confirm-loading="confirmLoading"
                @ok="backTeamPeopleSet"
                @cancel="()=>{this.backVisible=false;this.backReason='';}"
        >
            <a-textarea v-model="backReason" placeholder="请输入驳回理由" allow-clear/>
        </a-modal>
    </div>
</template>

<script type="text/ecmascript-6">
  import ChooseTeamDialog from './ChooseTeamDialog'
  import ChoosePeopleDialog from './ChoosePeopleDialog'
  import TeamReviewDialog from './TeamReviewDialog'
  import { mapActions } from 'vuex'
  const groupColumns = [
    {
      title: '道路--道路分段--具体路段',
      dataIndex: 'loadPosition',
      key: 'loadPosition',
      scopedSlots: { customRender: 'loadPosition' },
      width: '360px'
    },
    {
      title: '负责人',
      dataIndex: 'leaderId',
      key: 'leaderId',
      scopedSlots: { customRender: 'leaderId' },
      width: '140px'
    },
    {
      title: '执勤人',
      dataIndex: 'personList',
      key: 'personList',
      scopedSlots: { customRender: 'personList' }
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
      width: '100px'
    }];
   export default {
     name: 'teamPeople',
     components:{
       ChooseTeamDialog,
       ChoosePeopleDialog,
       TeamReviewDialog
     },
     props:{
       eventId:{
         type: String,
         default: ''
       },
       optType:{
         type: String,
         default: 'add'
       },
       peopleList:{
         type: Array,
         default(){
           return []
         }
       },
       groupData:{
         type: Object,
         default(){
           return{
             groupName: 'dundianquandao',
             leaderPosition: 1,
             personPosition: 1,
             teamPersonList:[]
           }
         }
       }
     },
     data(){
       return {
         columns: groupColumns,
         groupResultData:{},
         teamPersonList: [],
         teamIndex: 0,
         teamList: [],

         chooseTeamDialogVisible: false,
         defaultCheckedTeamIds: [],

         choosePeopleDialogVisible: false,
         rowIndex: 0,
         defaultCheckedPeopleIds: [],

         backVisible: false,
         confirmLoading: false,
         backReason: '',

         teamInfoDialogVisible: false,
         teamInfo: [],
         teamInfoTitle: '',

         options: [
           {
             value: 'zhejiang',
             label: 'Zhejiang',
             children: [
               {
                 value: 'hangzhou',
                 label: 'Hangzhou',
                 children: [
                   {
                     value: 'xihu',
                     label: 'West Lake',
                   },
                 ],
               },
             ],
           },
           {
             value: 'jiangsu',
             label: 'Jiangsu',
             children: [
               {
                 value: 'nanjing',
                 label: 'Nanjing',
                 children: [
                   {
                     value: 'zhonghuamen',
                     label: 'Zhong Hua Men',
                   },
                 ],
               },
             ],
           },
         ],

       }
     },
     computed:{
       userType:function(){
         return this.$store.getters['cgadmin/user/type']
       },
       nowOptType:function(){
         let type = '';
         if(this.userType === 'cjy' && this.optType === 'add'){
           type = 'add';
         }
         else if(this.userType === 'zybm' && this.optType === 'edit'){
           type = 'edit';
         }
         else{
           type = 'look';
         }
         return type
       },
       btnOptType: function(){
         let type = '';
         if(this.userType === 'cjy' && this.optType === 'edit'){
           type = 'edit';
         }
         else{
           type = 'look';
         }
         return type
       },
       leaderPositionName:function(){
         return this.groupData.leaderPosition===1 ? '单兵设备' : '手机'
       },
       personPositionName:function(){
        return this.groupData.personPosition===1 ? '单兵设备' : '手机'
       }
     },
     mounted() {
       this.groupResultData = JSON.parse(JSON.stringify(this.groupData));
       this.teamPersonList = this.groupResultData.teamPersonList;
       this.teamPersonList.map(teamItem => {
         teamItem.teamPersonData.map(item => {
           let personTemp = this.peopleList.find(person => person.id === item.leaderId);
           item.leaderName = personTemp.name;
           item.addressName = item.address.reduce((acc,ad) => {
             acc =  acc + '--' + ad.name
             return acc
           },'').substring(2);
           item.addressIds = item.address.reduce((acc,ad) => {
             acc.push(ad.id);
             return acc
           },[]);
           let ids = [...item.personList];
           item.personList = [];
           ids.map(id => {
             let pTemp = this.peopleList.find(p=> p.id === id);
             if(pTemp){
               item.personList.push(pTemp);
             }
             else{
               item.personList.push({id:id,name: '未知'});
             }
           })
         });
       });
       console.log('this.teamPersonList', this.teamPersonList);
     },
     watch:{
       groupResultData:{
         handler: function(value){
           this.$emit('getResult', value);
         },
         deep: true
       }
     },
     methods:{
       ...mapActions('event/event', ['checkEvent']),
       openTeamDialog(){
         this.defaultCheckedTeamIds = this.teamList.reduce((acc,item) => {
           acc.push(item.id);
           return acc
         },[]);
         this.chooseTeamDialogVisible = true;
       },
       chooseTeam(data){
         this.teamList = [];
         data.forEach((item)=>{
           this.teamList.push(item);
         });
       },
       closeTeamTag (person,index,e) {
         console.log(person,index);
         let i = this.groupTeam[index].teamList.indexOf(person);
         this.teamList.splice(i,1);
       },
       changeInputText(teamIndex, val,key,colName){
         //console.log('changeGroupName',val,key,colName);
         let arr = this.teamPersonList[teamIndex].teamPersonData;
         const newData = [...arr];
         const target = newData.filter(item => key === item.key)[0];
         if (target) {
           target[colName] = val;
           this.teamPersonList[teamIndex].teamPersonData = newData;
         }
       },
       changeAddress(teamIndex, value, key){
         console.log(teamIndex, value, key);
         // this.teamPersonList[teamIndex].teamPersonData[0].addressIds = value;
         let arr = this.teamPersonList[teamIndex].teamPersonData;
         const newData = [...arr];
         const target = newData.filter(item => key === item.key)[0];
         if (target) {
           target['addressIds'] = value;
           this.teamPersonList[teamIndex].teamPersonData = newData;
         }
       },
       filterOption(input, option) {
         return (
           option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
         );
       },
       addGroup(item, index,teamIndex){
         console.log('addGroup',item, index, teamIndex)
         let additem = {
           key: index.toString(),
           loadName: '',
           position: '',
           leaderId: '',
           personList: [],
           personKeyList: []
         }
         this.teamPersonList[teamIndex].teamPersonData.push(additem);
       },
       deleteGroup(index,teamIndex){
         this.teamPersonList[teamIndex].teamPersonData.splice(index,1);
       },
       openPeopleDialog(teamIndex,index){
         this.rowIndex = index;
         this.teamIndex = teamIndex;
         this.defaultCheckedPeopleIds = this.teamPersonList[teamIndex].teamPersonData[index].personList.reduce((acc,item) => {
           acc.push(item.id);
           return acc
         },[]);
         this.choosePeopleDialogVisible = true;
       },
       choosePeople(data){
         this.teamPersonList[this.teamIndex].teamPersonData[this.rowIndex].personList = [];
         data.forEach((item)=>{
           let name, personTemp = this.peopleList.find(person => person.id === item);
           if(personTemp){
             name = personTemp.name;
           }
           else{
             name = "未知";
           }
           this.teamPersonList[this.teamIndex].teamPersonData[this.rowIndex].personList.push({ id: item, name: name });
         });
       },
       closeTag (person,index,e) {
         console.log(person,index);
         let i = this.teamPersonList[this.teamIndex].teamPersonData[index].personList.indexOf(person);
         this.teamPersonList[this.teamIndex].teamPersonData[index].personList.splice(i,1);
       },
       lookTeamPeopleSet(team){
         console.log('进入预览');
         this.teamInfoTitle = team.teamName + '信息表';
         this.teamInfo = team.teamPersonData;
         this.teamInfoDialogVisible = true;
       },
       passTeamPeopleSet(teamIndex, teamId){
        console.log('eventId teamId operate backReason');
        let params = {
          eventId: this.eventId,
          teamId: teamId,
          operate: 'yes',
          backReason: ''
        }
        this.checkEvent(params).then( res => {
          this.teamPersonList[teamIndex].checkStatusId = 3;
        })
       },
       openBackModal(teamIndex){
         this.teamIndex = teamIndex;
         this.backVisible = true;
       },
       backTeamPeopleSet(){
         let teamId = this.teamPersonList[this.teamIndex].teamId;
         let params =  {
           eventId: this.eventId,
           teamId: teamId,
           operate: 'no',
           backReason: this.backReason
         }
         this.confirmLoading = true;
         this.checkEvent(params).then( res => {
           this.confirmLoading = false;
           this.backReason = '';
           this.backVisible = false;
           this.teamPersonList[this.teamIndex].checkStatusId = 4;
         })
       }
     }
   }
</script>
<style lang="scss" scoped>
.team-people-panel{
    width: 100%;
    padding-bottom: 10px;
    .team-people-panel-header{
        span{
            font-family: PingFang-SC-Bold;
            font-size: 14px;
            line-height: 30px;
            color: #4d4d4d;
            font-weight: 600;
        }
        .team-people-panel-header-right{

        }
    }
    .team-people-panel-method{
        margin-bottom: 10px;
        >div{
            &:last-child{
                margin-left: 60px;
            }
            label{
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 20px;
                letter-spacing: 0px;
                color: #666666;
            }
        }
    }
    .team-people-panel-item{
        margin-top: 10px;
        &:first-child{
            margin-top: 0px;
        }
        .team-item-header{
            .team-item-header-left{
                height: 40px;
                font-family: PingFang-SC-Bold;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 40px;
                letter-spacing: 0px;
                color: #00a4fe;
            }
            .team-item-header-right{
                .team-item_status{
                    color: #00a4fe;
                    &.red{
                        color: #d30616;
                    }
                    &.green{
                        color: #22ac38;
                    }
                    &.yellow{
                        color: #e7d10e;
                    }
                }
                .btn{
                    display:inline-block;
                    margin-left: 5px;
                    width: 50px;
                    height: 26px;
                    border-radius: 4px;
                    font-family: PingFang-SC-Medium;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 26px;
                    letter-spacing: 0px;
                    color: #ffffff;
                    text-align: center;
                    &.btn_review{
                        background-color: #22ac38;
                        cursor: pointer;
                    }
                    &.btn_pass{
                        background-color: #00a4fe;
                        cursor: pointer;
                    }
                    &.btn_back{
                        background-color: #d30616;
                        cursor: pointer;
                    }
                    &.btn_pass_text{
                        background-color: #bfbfbf;
                    }
                    &.btn_back_text{
                        background-color: #bfbfbf;
                    }
                }


                .btn_hide{
                    margin-left: 10px;
                    cursor: pointer;
                    &.open{
                        transform:rotate(180deg);
                        -ms-transform:rotate(180deg); 	/* IE 9 */
                        -moz-transform:rotate(180deg); 	/* Firefox */
                        -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
                        -o-transform:rotate(180deg); 	/* Opera */
                    }
                }
            }
        }
    }
    /deep/.ant-table-thead > tr > th{
        padding: 10px 16px;
    }
    /deep/.ant-table-tbody > tr > td{
        padding: 10px 16px;
    }
    .icon_delete,
    .icon_add {
        font-size: 18px;
        cursor: pointer;
        color: #00a4fe;
    }
    .icon_add {
        margin-left: 10px;
    }
}
</style>