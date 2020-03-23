<template>
  <div class="statistical" flex="dir:top">
    <status-analysis></status-analysis>
    <gas-trend></gas-trend>
  </div>
</template>
<script type="text/ecmascript-6">
import StatusAnalysis from './components/StatusAnalysis.vue'
import GasTrend from './components/GasTrend.vue'
export default{
    name:'statistical',
    components:{ GasTrend, StatusAnalysis },
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
  padding: 20px;
}
</style>
