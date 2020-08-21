<template>
    <a-modal :title="title" v-model="teamInfoVisible" width="1000px"
             :maskClosable="false"
             @cancel="handleCancelForTeamInfo"
             class="team-review-dialog"
             :bodyStyle="{padding:'0px 5px',borderRadius:'7px',overFlow: 'hidden'}"
             wrapClassName="teamwrap">
        <div style="min-height:200px;" class="team_dialog_body" flex="dir:left">
            <div class="team_dialog_body-main" id="printTest">
                <a-table :columns="columns" :dataSource="teamInfo" :pagination="false" bordered>
                    <template slot="loadPosition" slot-scope="text, record, index">
                        <div key="loadPosition">
                            <span >{{record.addressName}}</span>
                        </div>
                    </template>
                    <template slot="leaderId" slot-scope="text, record, index">
                        <div key="leaderId">
                            <span>{{record.leaderName}}</span>
                        </div>
                    </template>
                    <span slot="personList" slot-scope="text, record, index">
                        <span>{{ record.personNameStr }}</span>
                    </span>
                </a-table>
                <div class="team_review_map"></div>
            </div>
        </div>
        <template slot="footer">
            <a-button type="primary" v-print="printObj">打印</a-button>
            <a-button @click="">下载</a-button>
        </template>
    </a-modal>
</template>
<script type="text/ecmascript-6">
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
      width: '100px'
    },
    {
      title: '执勤人',
      dataIndex: 'personList',
      key: 'personList',
      scopedSlots: { customRender: 'personList' }
    }];
 export default {
    name: 'teamReviewDialog',
    props:{
     visible:{
       type:Boolean,
       default: false
     },
     title:{
       type:String,
       default: ''
     },
      teamId:{
       type:String,
        default: ''
     },
      peopleList:{
       type:Array,
        default(){
         return []
        }
      }
   },
   data(){
      return {
        teamInfoVisible: false,
        teamInfo: [],
        columns: groupColumns,
        printObj: {
          id: "printTest",
          popTitle: '中队信息'
        }
      }
   },
   watch:{
     teamInfoVisible:function(val){
       if(val){
         this.init();
       }
       else{
         this.$emit('update:visible', false);
       }
     },
     visible:function(val){
       if(val){
         this.teamInfoVisible = true;
       }
     }
   },
   mounted() {
   },
   methods:{
      init(){
        let teamPersonList = this.$store.getters['event/dunDianQuanDaoData/dunDianQuanDaoInfo'].teamPersonList;
        this.teamInfo = teamPersonList.find(item => item.teamId===this.teamId).teamPersonData;
        console.log('teamInfo', this.teamInfo);
        this.teamInfo.map(item => {
          let personTemp = this.peopleList.find(person => person.id === item.leaderId);
          item.leaderName = personTemp.name;
          item.addressName = item.address.reduce((acc,ad) => {
            acc =  acc + '--' + ad.name
            return acc
          },'').substring(2);
          let ids = [...item.personList];
          let nameList = [];
          ids.forEach(id => {
            let name = '';
            let pTemp = this.peopleList.find(p=> p.id === id);
            if(pTemp){
              name = pTemp.name;
            }
            else{
              name='未知'
            }
            nameList.push(name);
          })
          item.personNameStr = nameList.join(',');
        })
        this.printObj.popTitle = this.title;

      },
     printTeamInfo(){
       this.$print(this.$refs.print);
     },
     handleCancelForTeamInfo(){
        this.teamInfoVisible = false;
     }
   }
 }
</script>
<style lang="scss" scoped>
    .team-review-dialog{
        background-color: #fff;
        .team_dialog_body {
            width: 100%;
            padding: 20px;
            background-color: #fff;
            flex-wrap: wrap;
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
            .team_dialog_body-main{
                width: 100%;
                .team_review_map{
                    margin-top: 20px;
                    width: 100%;
                    height: 200px;
                    border: 1px solid #eeeeee;
                }
            }
        }
    }
</style>