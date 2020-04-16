<template>
  <div class="statistical" flex="dir:top">
    <status-analysis></status-analysis>
    <power-consumption-trend></power-consumption-trend>
  </div>
</template>
<script type="text/ecmascript-6">
import StatusAnalysis from './components/StatusAnalysis.vue'
import PowerConsumptionTrend from './components/PowerConsumptionTrend.vue'
export default{
    name:'statistical',
    components:{ PowerConsumptionTrend, StatusAnalysis },
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
