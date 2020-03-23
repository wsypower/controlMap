<template>
  <div class="page">
    <content-tabs :tabData="tabData"></content-tabs>
  </div>
</template>
<script>
import Manage from './Manage.vue'
import StatisticalAnalysis from './StatisticalAnalysis.vue'
export default {
  name: 'waterSupply',
  data() {
    return {
      //tab标签
      tabData: [
        {
          name: '水质监测',
          component: Manage,
          hasScroll: false
        },
        {
          name: '统计分析',
          component: StatisticalAnalysis,
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
}
</style>
