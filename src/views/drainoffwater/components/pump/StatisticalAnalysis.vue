<template>
  <div class="statistical" flex="dir:top">
    <status-analysis></status-analysis>
    <rain-trend></rain-trend>
  </div>
</template>
<script type="text/ecmascript-6">
import StatusAnalysis from './components/StatusAnalysis.vue'
import RainTrend from './components/RainTrend.vue'
export default{
    name:'statistical',
    components:{ RainTrend, StatusAnalysis },
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
