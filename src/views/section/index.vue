<template>
  <div class="page">
    <content-tabs :tabData="tabData"></content-tabs>
    <!--<people-info ref="peopleInfo" style="position:fixed; top: 100px;right:100px;display:none" :info="peopleInfoData" @closeTip="closeTip"></people-info>-->
  </div>
</template>
<script>
  import StatisticalAnalysis from './components/StatisticalAnalysis.vue';
  import PeopleManage from './components/PeopleManage.vue';
  import PeopleInfo from './components/peopleManage/PeopleInfo.vue';
export default {
  name: 'people',
  components:{PeopleManage, StatisticalAnalysis,PeopleInfo},
  data(){
    return {
      tabData:[{
        name:'统计分析',
        component:StatisticalAnalysis
      }, {
        name:'人员管控',
        component:PeopleManage
      }],
      peopleInfoData:{
          id: 'sdjfjdgfjsdgfjsd',
          sex: 'female',
          name: '沈芳',
          tel: '13525165428',
          dept: '信息采集中心',
          online: true,
          todayData: {
              num1: 14,
              num2: 10,
              num3: 9,
              num4: 0
          },
          historyData: {
              num1: 159,
              num2: 137,
              num3: 162,
              num4: 24
          }
      }
    }
  },
    mounted(){
      // setTimeout(()=>{
      //     this.$refs.peopleInfo.$el.style.display = 'block';
      // },2000)

    },
    methods:{
        closeTip(){
            console.log('closeTip');
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
}
</style>
