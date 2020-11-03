<template>
  <div class="statistical" flex="dir:top">
    <records-big-type-analysis></records-big-type-analysis>
    <records-statistical></records-statistical>
    <records-source-analysis></records-source-analysis>
    <high-incidence-top5></high-incidence-top5>
    <records-day-analysis></records-day-analysis>
  </div>
</template>
<script type="text/ecmascript-6">
import RecordsBigTypeAnalysis from './statisticalAnalysis/RecordsBigTypeAnalysis.vue'
import RecordsStatistical from './statisticalAnalysis/RecordsStatistical.vue'
import RecordsSourceAnalysis from './statisticalAnalysis/RecordsSourceAnalysis.vue'
import HighIncidenceTop5 from './statisticalAnalysis/HighIncidenceTOP5.vue'
import RecordsDayAnalysis from './statisticalAnalysis/RecordsDayAnalysis.vue'
export default{
    name:'statistical',
    components:{RecordsBigTypeAnalysis,RecordsStatistical,RecordsSourceAnalysis,HighIncidenceTop5,RecordsDayAnalysis},
    data(){
      return {
      }
    },
    mounted() {
    }
}
</script>
<style lang="scss" scoped>
.statistical {
  width: 100%;
  padding: 0px 20px 20px 20px;
}
</style>
