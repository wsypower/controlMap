<template>
  <div class="statistical" flex="dir:top">
    <status-analysis></status-analysis>
  </div>
</template>
<script type="text/ecmascript-6">
import StatusAnalysis from './components/StatusAnalysis.vue'
export default{
    name:'statistical',
    components:{
      StatusAnalysis
    },
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
  padding-bottom: 20px;
}
</style>
