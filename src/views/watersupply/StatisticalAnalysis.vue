<template>
  <div class="statistical" flex="dir:top">
    <status-analysis></status-analysis>
    <water-quality-trend></water-quality-trend>
  </div>
</template>
<script type="text/ecmascript-6">
import StatusAnalysis from './components/StatusAnalysis.vue'
import WaterQualityTrend from './components/WaterQualityTrend.vue'
export default{
    name:'statistical',
    components:{ WaterQualityTrend, StatusAnalysis },
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
