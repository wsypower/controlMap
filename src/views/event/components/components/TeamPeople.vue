<template>
    <div class="team-people-panel">
        <div class="team-people-panel-header" flex="cross:center main:justify">
            <span>蹲点劝导组：</span>
        </div>
        <div class="team-people-panel-method" flex="dir:left cross:center">
            <div class="" flex="dir:left cross:center">
                <label>负责人定位方式：</label>
                <a-radio-group v-if="userType==='qxsl'&&optType!=='look'" name="radioGroup" v-model="groupResultData.leaderPosition">
                    <a-radio value="1">单兵设备</a-radio>
                    <a-radio value="2">手机</a-radio>
                </a-radio-group>
                <span v-else>{{leaderPositionName}}</span>
            </div>
            <div class="" flex="dir:left cross:center">
                <label>执勤人定位方式：</label>
                <a-radio-group v-if="userType==='qxsl'&&optType!=='look'" name="radioGroup" v-model="groupResultData.personPosition">
                    <a-radio value="1">单兵设备</a-radio>
                    <a-radio value="2">手机</a-radio>
                </a-radio-group>
                <span v-else>{{personPositionName}}</span>
            </div>
        </div>
        <div class="team-people-panel-item" v-for="(team, teamIndex) in teamPersonList" :key="team.teamId">
            <div class="team-item-header" flex="dir:left cross:center main:justify">
                <span class="team-item-header-left">{{team.teamName}}</span>
                <div class="team-item-header-right" flex="dir:left cross:center">
                    <div>
                        <span v-if="team.checkStatusId==='1'||btnOptType==='look'"
                              class="team-item_status"
                              :class="{red:team.checkStatusId==='4', blue:team.checkStatusId==='1', yellow:team.checkStatusId==='2',green:team.checkStatusId==='3'}">
                            {{team.checkStatusName}}
                        </span>
                        <span class="btn btn_review" @click="lookTeamPeopleSet(team)">预览</span>
                        <span v-if="btnOptType==='edit'&&(team.checkStatusId==='2'||team.checkStatusId==='4')" class="btn btn_pass" @click="passTeamPeopleSet(teamIndex,team.teamId)">确认</span>
                        <span v-if="btnOptType==='edit'&&team.checkStatusId==='3'" class="btn btn_pass_text">已确认</span>
                        <span v-if="btnOptType==='edit'&&(team.checkStatusId==='2'||team.checkStatusId==='3')" class="btn btn_back" @click="openBackModal(teamIndex)">驳回</span>
                        <span v-if="btnOptType==='edit'&&team.checkStatusId==='4'" class="btn btn_back_text">已驳回</span>
                    </div>
                    <a-icon class="btn_hide" :class="{open: teamIndex>0}" type="up" />
                </div>
            </div>
            <a-table v-if="nowOptType==='look'||userType==='qxsl'" :columns="columns" :dataSource="team.teamPersonData" :pagination="false" bordered>
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
                        <a-cascader :options="address" placeholder="请选择" v-model="record.addressIds" @change="(value, selectedOptions)=>{changeAddress(teamIndex,value,selectedOptions,record.key)}" style="width: 100%"/>
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
                    <a-tag v-for="person in record.personObjList"
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
                          @confirm="() => deleteGroup(index,teamIndex)"
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
        <choose-people-dialog
            :rangeId="rangeId"
            :visible.sync="choosePeopleDialogVisible"
            :defaultCheckedPeopleIds="defaultCheckedPeopleIds"
            @choosePeople="choosePeople"
        ></choose-people-dialog>
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
  import ChoosePeopleDialog from './ChoosePeopleDialog'
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
       ChoosePeopleDialog,
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
       // groupData:{
       //   type: Object,
       //   default(){
       //     return{
       //       groupName: 'dundianquandao',
       //       leaderPosition: 1,
       //       personPosition: 1,
       //       teamPersonList:[]
       //     }
       //   }
       // },
       // reviewData:{
       //   type: Object,
       //   default() {
       //     return {}
       //   }
       // }
     },
     data(){
       return {
         columns: groupColumns,
         groupResultData:{},
         teamPersonList: [],
         teamIndex: 0,

         choosePeopleDialogVisible: false,
         rangeId: '',
         rowIndex: 0,
         defaultCheckedPeopleIds: [],

         backVisible: false,
         confirmLoading: false,
         backReason: '',

         teamInfoDialogVisible: false,
         teamId: '',
         teamInfoTitle: '',

         address: []
       }
     },
     computed:{
       userType:function(){
         return this.$store.getters['cgadmin/user/type']
       },
       nowOptType:function(){
         let type = '';
         if(this.userType === 'qxsl' && (this.optType === 'add'||this.optType === 'edit')){
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
         if(this.optType==='look'||(this.userType==='jld'||this.userType==='zybm')){
           type = 'look';
         }
         else{
           type = 'edit';
         }
         return type
       },
       leaderPositionName:function(){
         return this.groupResultData.leaderPosition==='1' ? '单兵设备' : '手机'
       },
       personPositionName:function(){
        return this.groupResultData.personPosition==='1' ? '单兵设备' : '手机'
       }
     },
     mounted() {
       this.groupResultData = this.$store.getters['event/dunDianQuanDaoData/dunDianQuanDaoInfo'];
       if(this.userType === 'qxsl'||this.userType === 'jld'||(this.userType === 'zybm'&&this.optType==='look')){
         this.teamPersonList = JSON.parse(JSON.stringify(this.groupResultData.teamPersonList));
         this.teamPersonList.map(teamItem => {
           teamItem.teamPersonData.map(item => {
             let personTemp = this.peopleList.find(person => person.id === item.leaderId);
             item.leaderName = personTemp.name;
             item.addressName = item.address.reduce((acc,ad) => {
               acc =  acc + '--' + ad.name
               return acc
             },'').substring(2);
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
         let num = this.teamPersonList.reduce((total,item) => {
           if(item.checkStatusId === '3'){
             total = total +1;
           }
           return total
         },0);
         this.$emit('setSubmitBtnShow',num);
       }
       else{
         //当编辑时会改变groupResultData值，从而改变store里面的数据
         this.teamPersonList = this.groupResultData.teamPersonList;
         this.teamPersonList.map(teamItem => {
           teamItem.teamPersonData.map(item => {
             item.addressIds = item.address.reduce((acc,ad) => {
               acc.push(ad.id);
               return acc
             },[]);
             item.positionId = item.addressIds[2];
             let ids = [...item.personList];
             item.personObjList = [];
             ids.map(id => {
               let pTemp = this.peopleList.find(p=> p.id === id);
               if(pTemp){
                 item.personObjList.push(pTemp);
               }
               else{
                 item.personObjList.push({id:id,name: '未知'});
               }
             })
           });
         });
         //当是中队时，编辑时如果没有数据，则增加一条新数据
         if(this.userType==='zybm'){
           this.teamPersonList.map(teamItem => {
             if(teamItem.teamPersonData.length===0){
               let additem = {
                 key: '@@@',
                 addressIds: [],
                 leaderId: '',
                 personList: [],
                 personObjList: [],
                 positionId: '',
                 mapId: '',
                 mapType: '',
                 remark: '',
               }
               teamItem.teamPersonData.push(additem);
             }
           });
           //获取所有道路数据
           this.getLoadTreeData().then( res => {
             this.address = res;
           });
         }
       }
       console.log('this.teamPersonList', this.teamPersonList);
     },
     watch:{
       groupResultData:{
         handler: function(value){
           console.log('88888888',value);
           let changeValue = JSON.parse(JSON.stringify(value));
           if(this.userType === 'zybm'&&this.optType==='edit'){
             // 人员修改时，需要带上视图数据保存到store中
             let dunDianQuanDaoInfo = this.$store.getters['event/dunDianQuanDaoData/dunDianQuanDaoInfo'];
             let sourceData = dunDianQuanDaoInfo.teamPersonList[0].teamPersonData;
             let resultTeamPersonData = changeValue.teamPersonList[0].teamPersonData.map(teamPerson => {
               let needData = sourceData.find(source=>source.positionId===teamPerson.positionId);
               if(needData){
                 teamPerson.mapId = needData.mapId;
                 teamPerson.mapType = needData.mapType;
                 teamPerson.remark = needData.remark;
               }
               return teamPerson
             });
             changeValue.teamPersonList[0].teamPersonData = resultTeamPersonData;
           }

           this.$store.commit('event/dunDianQuanDaoData/updateDunDianQuanDaoInfo',changeValue);

         },
         deep: true
       }
     },
     methods:{
       ...mapActions('event/event', ['checkEvent']),
       ...mapActions('event/common', ['getLoadTreeData']),
       // changeInputText(teamIndex, val,key,colName){
       //   let arr = this.teamPersonList[teamIndex].teamPersonData;
       //   const newData = [...arr];
       //   const target = newData.filter(item => key === item.key)[0];
       //   if (target) {
       //     target[colName] = val;
       //     this.teamPersonList[teamIndex].teamPersonData = newData;
       //   }
       // },
       //选择道路
       changeAddress(teamIndex, value, selectedOptions, key){
         console.log(teamIndex, value, selectedOptions, key);
         let arr = this.teamPersonList[teamIndex].teamPersonData;
         const newData = [...arr];
         const target = newData.filter(item => key === item.key)[0];
         if (target) {
           target['addressIds'] = value;
           let address = [{id: selectedOptions[0].value, name: selectedOptions[0].label},
             {id: selectedOptions[1].value, name: selectedOptions[1].label},
             {id: selectedOptions[2].value, name: selectedOptions[2].label}];
           target['address'] = address;
           target['positionId'] = selectedOptions[2].value;
           this.teamPersonList[teamIndex].teamPersonData = newData;
         }
       },
       //选择过滤责任人
       filterOption(input, option) {
         return (
           option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
         );
       },
       //新增一行
       addGroup(item, index,teamIndex){
         console.log('addGroup',item, index, teamIndex)
         let additem = {
           key: '@@@' + index.toString(),
           addressIds: [],
           leaderId: '',
           personList: [],
           personObjList: [],
           positionId: '',
           mapId: '',
           mapType: '',
           remark: '',
         }
         this.teamPersonList[teamIndex].teamPersonData.push(additem);
       },
       //删除一行
       deleteGroup(index,teamIndex){
         this.teamPersonList[teamIndex].teamPersonData.splice(index,1);
       },
       //打开选择人员窗口
       openPeopleDialog(teamIndex,index){
         this.rowIndex = index;
         this.teamIndex = teamIndex;
         this.defaultCheckedPeopleIds = this.teamPersonList[teamIndex].teamPersonData[index].personObjList.reduce((acc,item) => {
           acc.push(item.id);
           return acc
         },[]);
         this.teamPersonList[teamIndex].teamPersonData[index].personList = this.defaultCheckedPeopleIds;
         if(this.userType === 'zybm'){
           this.rangeId = this.teamPersonList[teamIndex].teamId;
         }
         this.choosePeopleDialogVisible = true;
       },
       //重新设置执勤人
       choosePeople(data){
         this.teamPersonList[this.teamIndex].teamPersonData[this.rowIndex].personList = data;
         this.teamPersonList[this.teamIndex].teamPersonData[this.rowIndex].personObjList = [];
         data.forEach((item)=>{
           let name, personTemp = this.peopleList.find(person => person.id === item);
           if(personTemp){
             name = personTemp.name;
           }
           else{
             name = "未知";
           }
           this.teamPersonList[this.teamIndex].teamPersonData[this.rowIndex].personObjList.push({ id: item, name: name });
         });
       },
       //删除执勤人
       closeTag (person,index,e) {
         console.log(person,index);
         let i = this.teamPersonList[this.teamIndex].teamPersonData[index].personObjList.indexOf(person);
         this.teamPersonList[this.teamIndex].teamPersonData[index].personObjList.splice(i,1);
         this.teamPersonList[this.teamIndex].teamPersonData[index].personList.splice(i,1);
       },
       //进入中队预览
       lookTeamPeopleSet(team){
         console.log('进入中队预览');
         this.teamId= team.teamId;
         let data ={
           teamId: team.teamId,
           teamName: team.teamName
         }
         this.$emit('reviewTeam',data)
         //先保存
       },
       //中心确认中队通过
       passTeamPeopleSet(teamIndex, teamId){
        console.log('eventId teamId operate backReason');
        let params = {
          eventId: this.eventId,
          teamId: teamId,
          operate: '3',
          backReason: ''
        }
        this.checkEvent(params).then( res => {
          this.teamPersonList[teamIndex].checkStatusId = '3';
          let num = this.teamPersonList.reduce((total,item) => {
            if(item.checkStatusId === '3'){
              total = total +1;
            }
            return total
          },0);
          this.$emit('setSubmitBtnShow',num)
        })
       },
       openBackModal(teamIndex){
         this.teamIndex = teamIndex;
         this.backVisible = true;
       },
       //中心确认中队驳回
       backTeamPeopleSet(){
         let teamId = this.teamPersonList[this.teamIndex].teamId;
         let params =  {
           eventId: this.eventId,
           teamId: teamId,
           operate: '4',
           backReason: this.backReason
         }
         this.confirmLoading = true;
         this.checkEvent(params).then( res => {
           this.confirmLoading = false;
           this.backReason = '';
           this.backVisible = false;
           this.teamPersonList[this.teamIndex].checkStatusId = '4';
           let num = this.teamPersonList.reduce((total,item) => {
             if(item.checkStatusId === '3'){
               total = total +1;
             }
             return total
           },0);
           this.$emit('setSubmitBtnShow',num)
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