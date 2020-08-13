<template>
    <div class="group-team-panel">
        <div class="group-team-panel-header">{{title}}小组：</div>
        <div class="group-team-panel-method">
            <div class="" flex="dir:left cross:center">
                <label>{{title}}定位方式：</label>
                <a-radio-group name="radioGroup" v-model="groupData.leaderPosition">
                    <a-radio :value="1">单兵设备</a-radio>
                    <a-radio :value="2">手机</a-radio>
                </a-radio-group>
            </div>
        </div>
        <a-table :columns="columns" :dataSource="groupTeam" :pagination="false" bordered>
            <template slot="leader" slot-scope="text, record, index">
                <div key="leader">
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
                          v-for="person in record.teamList"
                          color="blue"
                          :key="person.id"
                          closable
                          @close="($event) => closeTag(person, index,$event)"
                  >{{ person.name }}</a-tag
                  >
                  <a-button type="primary" size="small" @click="openTeamDialog(index)">中队选择</a-button>
                </span>
            <span v-if="groupData.groupName!=='zongzhihui'" slot="action" slot-scope="text, record, index">
                  <a-popconfirm
                          v-if="groupTeam.length > 1"
                          theme="filled"
                          title="确定删除这个组吗？"
                          @confirm="() => deleteGroup(index)"
                  >
                    <a-icon type="minus-circle" class="icon_delete" />
                  </a-popconfirm>
                  <a-icon
                          v-if="index === groupTeam.length - 1"
                          theme="filled"
                          type="plus-circle"
                          class="icon_add"
                          @click="addGroup(record, index)"
                  />
                </span>
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
    const groupColumns = [{
      title: '总指挥',
      dataIndex: 'leader',
      key: 'leader',
      scopedSlots: { customRender: 'leader' },
      width: '280px'
      }, {
      title: '管辖中队',
      dataIndex: 'teamList',
      key: 'teamList',
      scopedSlots: { customRender: 'team' }
      }, {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
      width: '100px'
      }];
   export default {
     name: 'groupTeam',
     components:{
       ChooseTeamDialog
     },
     props:{
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
             groupName: 'zongzhihui',
             leaderPosition: 1,
             groupTeam:[{
                 key: 'jhhjsddsdds',
                 leader: '',
                 teamList: [],
                 teamKeyList: []
             }]
           }
         }
       }
     },
     data(){
       return {
         positionMethod: '1',
         columns: groupColumns,
         groupTeam: [],

         chooseTeamDialogVisible: false,
         rowIndex: 0,
         defaultCheckedTeamIds: [],
       }
     },
     computed:{
       title: function(){
         return this.groupData.groupName==='zongzhihui'?'总指挥':'副指挥'
       },
     },
     mounted() {
       this.columns[0].title = this.title;
       this.groupTeam = JSON.parse(JSON.stringify(this.groupData.groupTeam));
     },
     methods:{
       filterOption(input, option) {
         return (
           option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
         );
       },
       addGroup(item, index){
         console.log('addGroup',item, index)
         let additem = {
           key: index.toString(),
           leader: '',
           teamList: [],
           teamKeyList: []
         }
         this.groupTeam.push(additem);
       },
       deleteGroup(index){
         this.groupTeam.splice(index,1);
       },
       openTeamDialog(index){
         this.rowIndex = index;
         this.defaultCheckedTeamIds = this.groupTeam[index].teamList.reduce((acc,item) => {
           acc.push(item.id);
           return acc
         },[]);
         this.chooseTeamDialogVisible = true;
       },
       chooseTeam(data){
         this.groupTeam[this.rowIndex].teamList = [];
         data.forEach((item)=>{
           this.groupTeam[this.rowIndex].teamList.push(item);
         });
       },
       closeTag (person,index,e) {
         console.log(person,index);
         let i = this.groupTeam[index].teamList.indexOf(person);
         this.groupTeam[index].teamList.splice(i,1);
       }
     }
   }
</script>
<style lang="scss" scoped>
.group-team-panel{
    width: 100%;
    padding-bottom: 10px;
    .group-team-panel-header{
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        line-height: 30px;
        color: #4d4d4d;
        font-weight: 600;
    }
    .group-team-panel-method{
        margin-bottom: 10px;
        >div{
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