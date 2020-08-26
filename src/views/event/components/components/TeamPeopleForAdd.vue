<template>
    <div class="team-people-panel">
        <div class="team-people-panel-header" flex="dir:left cross:center">
            <span>蹲点劝导组：</span>
        </div>
        <div class="team-people-panel-team" flex="dir:left">
            <a-button type="primary" size="small" @click="openTeamDialog">中队选择</a-button>
            <a-tag v-for="person in groupResultData.teamPersonList"
                   color="blue"
                   :key="person.teamId"
                   closable
                   @close="($event) => closeTeamTag(person, $event)"
            >{{ person.teamName }}</a-tag>
        </div>
        <div class="team-people-panel-method" flex="dir:left cross:center">
            <div class="" flex="dir:left cross:center">
                <label>负责人定位方式：</label>
                <a-radio-group name="radioGroup" v-model="groupResultData.leaderPosition">
                    <a-radio value="1">单兵设备</a-radio>
                    <a-radio value="2">手机</a-radio>
                </a-radio-group>
            </div>
            <div class="" flex="dir:left cross:center">
                <label>执勤人定位方式：</label>
                <a-radio-group name="radioGroup" v-model="groupResultData.personPosition">
                    <a-radio value="1">单兵设备</a-radio>
                    <a-radio value="2">手机</a-radio>
                </a-radio-group>
            </div>
        </div>
        <a-table :columns="columns" :dataSource="[]" :pagination="false" bordered>
            <template slot="loadPosition" slot-scope="text, record, index">
                <div key="loadPosition"></div>
            </template>
            <span slot="leaderId" slot-scope="text, record, index"></span>
            <span slot="personList" slot-scope="text, record, index"></span>
            <span slot="action" slot-scope="text, record, index"></span>
        </a-table>
        <choose-team-dialog
            :visible.sync="chooseTeamDialogVisible"
            :defaultCheckedIds="defaultCheckedTeamIds"
            @chooseTeam="chooseTeam"
        ></choose-team-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  import ChooseTeamDialog from './ChooseTeamDialog'
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
     name: 'teamPeopleForAdd',
     components:{
       ChooseTeamDialog
     },
     props:{
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

         chooseTeamDialogVisible: false,
         defaultCheckedTeamIds: []
       }
     },
     mounted() {
       this.groupResultData = JSON.parse(JSON.stringify(this.groupData));
     },
     watch:{
       groupResultData:{
         handler: function(value){
           console.log('team people for add 555555');
           let data = {
             groupName: 'dundianquandao',
             leaderPosition: value.leaderPosition,
             personPosition: value.personPosition,
             teamList: []
           }
           data.teamList = value.teamPersonList.reduce((acc,team) => {
                acc.push(team.teamId);
                return acc
           },[]);
           this.$emit('getResult', data);
         },
         deep: true
       }
     },
     methods:{
       openTeamDialog(){
         this.defaultCheckedTeamIds = this.groupResultData.teamPersonList.reduce((acc,item) => {
           acc.push(item.teamId);
           return acc
         },[]);
         this.chooseTeamDialogVisible = true;
       },
       chooseTeam(data){
         this.groupResultData.teamPersonList = [];
         data.forEach((item)=>{
           let temp ={
             teamId: item.id,
             teamName: item.name
           }
           this.groupResultData.teamPersonList.push(temp);
         });
       },
       closeTeamTag (person,e) {
         console.log(person);
         let i = this.groupResultData.teamPersonList.findIndex(teamPerson => teamPerson.teamId===person.teamId);
         this.groupResultData.teamPersonList.splice(i,1);
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
    }
    .team-people-panel-team{
        flex-wrap: wrap;
        button {
            margin-right: 10px;
            margin-bottom: 10px;
        }
        /deep/.ant-tag{
            margin-bottom: 0px;
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