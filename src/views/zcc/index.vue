<template>
  <div class="page">
    <content-tabs :tabData="tabData"></content-tabs>
  </div>
</template>
<script>
import StatisticalAnalysis from './components/StatisticalAnalysis.vue'
import CartManage from './components/CartManage.vue'
export default {
  name: 'cart',
  data() {
    return {
      tabData: [
        {
          name: '早餐摊点',
          component: CartManage,
          hasScroll: false
        // },
        // {
        //   name: '统计分析',
        //   component: StatisticalAnalysis,
        //   hasScroll: true
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
