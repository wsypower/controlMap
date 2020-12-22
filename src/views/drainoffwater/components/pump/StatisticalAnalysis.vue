<template>
  <div class="statistical" flex="dir:top">
    <status-analysis></status-analysis>
    <yewei-trend></yewei-trend>
  </div>
</template>
<script type="text/ecmascript-6">
import StatusAnalysis from './components/StatusAnalysis.vue'
import YeweiTrend from './components/YeweiTrend.vue'
export default{
    name:'statistical',
    components:{ YeweiTrend, StatusAnalysis },
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
