<template>
  <div class="page">
    <div class="page-header">
      车辆管控
    </div>
    <car-manage></car-manage>
    <!--<content-tabs :tabData="tabData"></content-tabs>-->
  </div>
</template>
<script>
import StatisticalAnalysis from './components/StatisticalAnalysis.vue'
import CarManage from './components/CarManage.vue'
export default {
  name: 'car',
  components: { CarManage },
  data() {
    return {
      //tab标签
      tabData: [
        {
          name: '统计分析',
          component: StatisticalAnalysis,
          hasScroll: true
        },
        {
          name: '车辆管控',
          component: CarManage,
          hasScroll: false
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  .page-header{
    height: 50px;
    width: 100%;
    padding-left: 20px;
    line-height: 50px;
    background-color: #f5f7f8;
    color: #2b90f3;
    font-size: 18px;
    text-align: left;
  }
}
</style>
