<template>
    <div class="group-people-panel">
        <div class="group-people-panel-header">蹲点劝导组：</div>
        <div class="group-people-panel-method" flex="dir:left cross:center">
            <div class="" flex="dir:left cross:center">
                <label>负责人定位方式：</label>
                <a-radio-group name="radioGroup" v-model="groupData.leaderPosition">
                    <a-radio :value="1">单兵设备</a-radio>
                    <a-radio :value="2">手机</a-radio>
                </a-radio-group>
            </div>
            <div class="" flex="dir:left cross:center">
                <label>执勤人定位方式：</label>
                <a-radio-group name="radioGroup" v-model="groupData.leaderPosition">
                    <a-radio :value="1">单兵设备</a-radio>
                    <a-radio :value="2">手机</a-radio>
                </a-radio-group>
            </div>
        </div>
        <a-table :columns="columns" :dataSource="groupPerson" :pagination="false" bordered>
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
        <choose-people-dialog
                :visible.sync="choosePeopleDialogVisible"
                :defaultCheckedIds="defaultCheckedPeopleIds"
                @choosePeople="choosePeople"
        ></choose-people-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import ChoosePeopleDialog from './ChoosePeopleDialog'
    const groupColumns = [{
      title: '负责人',
      dataIndex: 'leaderId',
      key: 'leaderId',
      scopedSlots: { customRender: 'leaderId' },
      width: '280px'
      }, {
      title: '执勤人',
      dataIndex: 'personList',
      key: 'personList',
      scopedSlots: { customRender: 'personList' }
      }, {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
      width: '100px'
      }];
   export default {
     name: 'groupPeople',
     components:{
       ChoosePeopleDialog
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
             groupName: 'jidongxuncha',
             leaderPosition: 1,
             personPosition: 1,
             groupPerson:[{
                 key: 'jhhjsddsdds',
                 leaderId: '',
                 personList: [],
                 personKeyList: []
             }]
           }
         }
       }
     },
     data(){
       return {
         positionMethod: '1',
         columns: groupColumns,
         groupPerson: [],

         choosePeopleDialogVisible: false,
         rowIndex: 0,
         defaultCheckedPeopleIds: [],
       }
     },
     computed:{
       title: function(){
         return this.groupData.groupName==='jidongxuncha'?'机动巡查应急组':'后勤保障组'
       },
     },
     mounted() {
       this.groupPerson = JSON.parse(JSON.stringify(this.groupData.groupPerson));
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
           leaderId: '',
           personList: [],
           personKeyList: []
         }
         this.groupPerson.push(additem);
       },
       deleteGroup(index){
         this.groupPerson.splice(index,1);
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
       closeTag (person,index,e) {
         console.log(person,index);
         let i = this.groupPerson[index].personList.indexOf(person);
         this.groupPerson[index].personList.splice(i,1);
       }
     }
   }
</script>
<style lang="scss" scoped>
.group-people-panel{
    width: 100%;
    padding-bottom: 10px;
    .group-people-panel-header{
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        line-height: 30px;
        color: #4d4d4d;
        font-weight: 600;
    }
    .group-people-panel-method{
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