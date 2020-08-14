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
                        @close="($event) => closeTag(person, index,$event)"
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
            <template slot="leaderId" slot-scope="text, record, index">
                <div key="leaderId">
                     <a-select
                        show-search
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
            <span slot="team" slot-scope="text, record, index">
                  <a-tag
                      v-for="person in record.personList"
                      color="blue"
                      :key="person.id"
                      closable
                      @close="($event) => closeTag(person, index,$event)"
                  >{{ person.name }}</a-tag>
                  <a-button type="primary" size="small" @click="openPeopleDialog(index)">人员选择</a-button>
                </span>
            <span slot="action" slot-scope="text, record, index">
                  <a-popconfirm
                          v-if="groupPerson.length > 1"
                          theme="filled"
                          title="确定删除这个组吗？"
                          @confirm="() => deleteGroup(index)"
                  >
                    <a-icon type="minus-circle" class="icon_delete" />
                  </a-popconfirm>
                  <a-icon
                          v-if="index === groupPerson.length - 1"
                          theme="filled"
                          type="plus-circle"
                          class="icon_add"
                          @click="addGroup(record, index)"
                  />
                </span>
        </a-table>
        <div v-else>
            <div class="team-people-panel-item" v-for="(team, teamIndex) in teamPersonList" :key="team.teamId">
                <div class="team-item-header" flex="dir:left cross:center main:justify">
                    <span class="team-item-header-left">{{team.teamName}}</span>
                    <div class="team-item-header-right">
                        <span v-if="nowOptType==='look'" class="team-item_status"></span>
                        <span v-if="nowOptType==='edit'" class="btn_review" @click="">预览</span>
                        <span v-if="nowOptType==='edit'" class="btn_pass" @click="">确认</span>
                        <span v-if="nowOptType==='edit'" class="btn_back" @click="">驳回</span>
                        <a-icon type="up" />
                    </div>
                </div>
                <a-table :columns="columns" :dataSource="team.teamPersonData" :pagination="false" bordered>
                    <template slot="loadName" slot-scope="text, record, index">
                        <div key="loadName">
                            <span v-if="nowOptType==='look'">{{record.loadName}}</span>
                            <a-input v-else :value="text" @change="e => changeInputText(teamIndex, e.target.value, record.key, 'loadName')" />
                        </div>
                    </template>
                    <template slot="position" slot-scope="text, record, index">
                        <div key="position">
                            <span v-if="nowOptType==='look'">{{record.position}}</span>
                            <a-input v-else :value="text" @change="e => changeInputText(teamIndex, e.target.value, record.key, 'loadName')" />
                        </div>
                    </template>
                    <template slot="leaderId" slot-scope="text, record, index">
                        <div key="leaderId">
                            <span v-if="nowOptType==='look'">{{groupTeam.leaderName}}</span>
                            <a-select
                                    v-else
                                    show-search
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
                    <span slot="team" slot-scope="text, record, index">
                        <a-tag v-if="nowOptType==='look'"
                                v-for="person in record.personList"
                                color="blue"
                                :key="person.id"
                        >{{ person.name }}</a-tag>
                        <a-tag v-if="nowOptType!=='look'"
                               v-for="person in record.personList"
                                  color="blue"
                                  :key="person.id"
                                  closable
                                  @close="($event) => closeTag(person, index,$event)"
                          >{{ person.name }}</a-tag>
                          <a-button v-if="nowOptType!=='look'" type="primary" size="small" @click="openPeopleDialog(index)">人员选择</a-button>
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


<!--        <choose-people-dialog-->
<!--                :visible.sync="choosePeopleDialogVisible"-->
<!--                :defaultCheckedIds="defaultCheckedPeopleIds"-->
<!--                @choosePeople="choosePeople"-->
<!--        ></choose-people-dialog>-->
        <choose-team-dialog
            :visible.sync="chooseTeamDialogVisible"
            :defaultCheckedIds="defaultCheckedTeamIds"
            @chooseTeam="chooseTeam"
        ></choose-team-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  import ChooseTeamDialog from './ChooseTeamDialog'
  import ChoosePeopleDialog from './ChoosePeopleDialog'
  const groupColumns = [
    {
      title: '道路',
      dataIndex: 'loadName',
      key: 'loadName',
      scopedSlots: { customRender: 'loadName' },
      width: '280px'
    },
    {
      title: '具体路段',
      dataIndex: 'position',
      key: 'position',
      scopedSlots: { customRender: 'position' },
      width: '280px'
    },
    {
      title: '负责人',
      dataIndex: 'leaderId',
      key: 'leaderId',
      scopedSlots: { customRender: 'leaderId' },
      width: '180px'
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
       ChoosePeopleDialog
     },
     props:{
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
         teamPersonList: [],
         teamList: [],

         chooseTeamDialogVisible: false,
         defaultCheckedTeamIds: [],

         choosePeopleDialogVisible: false,
         rowIndex: 0,
         defaultCheckedPeopleIds: [],
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
         else if(this.optType === 'look'){
           type = 'look';
         }
         else{
           type = 'edit';
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
       this.teamPersonList = JSON.parse(JSON.stringify(this.groupData.teamPersonList));
     },
     methods:{
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
       closeTag (person,index,e) {
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

       openPeopleDialog(index){
         this.rowIndex = index;
         this.defaultCheckedPeopleIds = this.groupPerson[index].personList.reduce((acc,item) => {
           acc.push(item.id);
           return acc
         },[]);
         this.choosePeopleDialogVisible = true;
       },
       choosePeople(data){
         this.groupPerson[this.rowIndex].personList = [];
         data.forEach((item)=>{
           this.groupPerson[this.rowIndex].personList.push(item);
         });
       },
       // closeTag (person,index,e) {
       //   console.log(person,index);
       //   let i = this.groupPerson[index].personList.indexOf(person);
       //   this.groupPerson[index].personList.splice(i,1);
       // }
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