<template>
  <div class="statistical" flex="dir:top">
    <status-analysis></status-analysis>
    <flow-trend></flow-trend>
  </div>
</template>
<script type="text/ecmascript-6">
import StatusAnalysis from './components/StatusAnalysis.vue'
import FlowTrend from './components/FlowTrend.vue'
export default{
    name:'statistical',
    components:{ FlowTrend, StatusAnalysis },
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
