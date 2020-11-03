<template>
  <div class="statistical" flex="dir:top">
    <alarm-type-analysis></alarm-type-analysis>
    <high-incidence-road-analysis></high-incidence-road-analysis>
    <high-incidence-time-analysis></high-incidence-time-analysis>
  </div>
</template>
<script type="text/ecmascript-6">
import AlarmTypeAnalysis from './alarmStatistics/AlarmTypeAnalysis.vue'
import HighIncidenceRoadAnalysis from './alarmStatistics/HighIncidenceRoadAnalysis.vue'
import HighIncidenceTimeAnalysis from './alarmStatistics/HighIncidenceTimeAnalysis.vue'
export default{
  name:'statistical',
  components:{AlarmTypeAnalysis,HighIncidenceRoadAnalysis,HighIncidenceTimeAnalysis,},
}
</script>
<style lang="scss" scoped>
.statistical {
  width: 100%;
  padding: 0px 20px 20px 20px;
}
</style>
