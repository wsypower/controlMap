<template>
  <div class="page">
    <content-tabs :tabData="tabData"></content-tabs>
  </div>
</template>
<script>
import StatisticalAnalysis from './components/StatisticalAnalysis.vue'
import CarManage from './components/CarManage.vue'
export default {
  name: 'car',
  data() {
    return {
      //tab标签
      tabData: [
        {
          name: '车辆管控',
          component: CarManage,
          hasScroll: false
        },
        {
          name: '统计分析',
          component: StatisticalAnalysis,
          hasScroll: true
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
}
</style>
