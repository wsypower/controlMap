<template>
    <div class="statistical" flex="dir:top">
        <people-analysis></people-analysis>
        <status-analysis></status-analysis>
        <overstep-analysis></overstep-analysis>
        <top-three></top-three>
    </div>
</template>
<script type="text/ecmascript-6">
    import PeopleAnalysis from './statisticalAnalysis/PeopleAnalysis.vue'
    import StatusAnalysis from './statisticalAnalysis/StatusAnalysis.vue'
    import OverstepAnalysis from './statisticalAnalysis/OverstepAnalysis.vue'
    import TopThree from './statisticalAnalysis/TopThree.vue'
    export default{
        name:'statistical',
        components:{PeopleAnalysis,StatusAnalysis,OverstepAnalysis,TopThree},
    }
</script>
<style lang="scss" scoped>
    .statistical{
        width: 100%;
        padding: 0px 20px 20px 20px;
    }
</style>
