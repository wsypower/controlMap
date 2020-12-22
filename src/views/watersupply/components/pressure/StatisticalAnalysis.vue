<template>
  <div class="statistical" flex="dir:top">
    <status-analysis></status-analysis>
    <pressure-trend></pressure-trend>
  </div>
</template>
<script type="text/ecmascript-6">
import StatusAnalysis from './components/StatusAnalysis.vue'
import PressureTrend from './components/PressureTrend.vue'
export default{
    name:'statistical',
    components:{ PressureTrend, StatusAnalysis },
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
}
</style>
