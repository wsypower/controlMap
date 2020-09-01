<template>
    <div class="group-people-panel">
        <div class="group-people-panel-header"><i style="color:#d60000;">*</i>{{title}}：</div>
        <div class="group-people-panel-method" flex="dir:left cross:center">
            <div class="" flex="dir:left cross:center">
                <label>负责人定位方式：</label>
                <a-radio-group v-if="nowOptType" name="radioGroup" v-model="groupResultData.leaderPosition">
                    <a-radio value="1">单兵设备</a-radio>
                    <a-radio value="2">手机</a-radio>
                </a-radio-group>
                <span v-else>{{leaderPositionName}}</span>
            </div>
            <div class="" flex="dir:left cross:center">
                <label>执勤人定位方式：</label>
                <a-radio-group v-if="nowOptType" name="radioGroup" v-model="groupResultData.personPosition">
                    <a-radio value="1">单兵设备</a-radio>
                    <a-radio value="2">手机</a-radio>
                </a-radio-group>
                <span  v-else>{{personPositionName}}</span>
            </div>
        </div>
        <a-table v-if="nowOptType" :columns="columns" :dataSource="groupPerson" :pagination="false" bordered>
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
        <a-table v-else :columns="columns" :dataSource="groupPerson" :pagination="false" bordered>
            <template slot="leaderId" slot-scope="text, record, index">
                <div key="leaderId">{{record.leaderName}}</div>
            </template>
            <span slot="personList" slot-scope="text, record, index">
                <a-tag
                        v-for="person in record.personList"
                        color="blue"
                        :key="person.id"
                >{{ person.name }}</a-tag>
            </span>
            <span slot="action" slot-scope="text, record, index">
            </span>
        </a-table>
        <choose-people-dialog
                :visible.sync="choosePeopleDialogVisible"
                :defaultCheckedPeopleIds="defaultCheckedPeopleIds"
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
       optType:{
         type: String,
         default: ''
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
             groupName: 'jidongxuncha',
             leaderPosition: 1,
             personPosition: 1,
             groupPerson:[{
                 key: '@@@',
                 leaderId: '',
                 personList: []
             }]
           }
         }
       }
     },
     data(){
       return {
         positionMethod: '1',
         columns: groupColumns,
         groupResultData:{},
         groupPerson: [],

         choosePeopleDialogVisible: false,
         range: '',
         rowIndex: 0,
         defaultCheckedPeopleIds: [],
       }
     },
     computed:{
       title: function(){
         return this.groupData.groupName==='jidongxuncha'?'机动巡查应急组':'后勤保障组'
       },
       userType: function(){
         return this.$store.getters['cgadmin/user/type'];
       },
       nowOptType:function(){
         return this.userType==='qxsl'&&this.optType!=='look'
       },
       leaderPositionName:function(){
         return this.groupData.leaderPosition==='1' ? '单兵设备' : '手机'
       },
       personPositionName:function(){
         return this.groupData.personPosition==='1' ? '单兵设备' : '手机'
       }
     },
     mounted() {
       console.log('peoplelist', this.peopleList);
       this.groupResultData = JSON.parse(JSON.stringify(this.groupData));
       this.groupPerson = this.groupResultData.groupPerson;
       //数据转换，通过ID得到人员的名字
        this.groupPerson.map(item => {
          if(item.leaderId!=='') {
            let personTemp = this.peopleList.find(person => person.id === item.leaderId);
            item.leaderName = personTemp.name;
          }
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

       console.log('333333',this.groupPerson);
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
       //下拉选择
       filterOption(input, option) {
         return (
           option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
         );
       },
       //增加一行
       addGroup(item, index){
         let additem = {
           key: '@@@' + index.toString(),
           leaderId: '',
           personList: []
         }
         this.groupPerson.push(additem);
       },
       //删除一行
       deleteGroup(index){
         this.groupPerson.splice(index,1);
       },
       //打开选择人员弹窗
       openPeopleDialog(index){
         this.rowIndex = index;
         //已经选择的人员
         this.defaultCheckedPeopleIds = this.groupPerson[index].personList.reduce((acc,item) => {
           acc.push(item.id);
           return acc
         },[]);
         this.choosePeopleDialogVisible = true;
       },
       //重新设置选中的人员
       choosePeople(data){
         this.groupPerson[this.rowIndex].personList = [];
         data.forEach((item)=>{
           let name, personTemp = this.peopleList.find(person => person.id === item);
           if(personTemp){
             name = personTemp.name;
           }
           else{
             name = "未知";
           }
           this.groupPerson[this.rowIndex].personList.push({ id: item, name: name });
         });
       },
       //删除已选的人员
       closeTag (person,index,e) {
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