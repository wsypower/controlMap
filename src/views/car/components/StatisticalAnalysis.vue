<template>
  <div class="statistical" flex="dir:top">
    <type-show></type-show>
    <group-analysis></group-analysis>
    <work-analysis></work-analysis>
    <break-type-analysis></break-type-analysis>
  </div>
</template>
<script type="text/ecmascript-6">
import TypeShow from './statisticalAnalysis/TypeShow.vue'
import GroupAnalysis from './statisticalAnalysis/GroupAnalysis.vue'
import WorkAnalysis from './statisticalAnalysis/WorkAnalysis.vue'
import BreakTypeAnalysis from './statisticalAnalysis/BreakTypeAnalysis.vue'
export default{
    name:'statistical',
    components:{TypeShow,GroupAnalysis,WorkAnalysis,BreakTypeAnalysis},
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
