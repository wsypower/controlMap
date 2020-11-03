<template>
  <div class="page">
    <content-tabs :tabData="tabData"></content-tabs>
  </div>
</template>
<script>
import StatisticalAnalysis from './components/StatisticalAnalysis.vue'
import recordsManage from './components/RecordsManage.vue'
export default {
  name: 'records',
  data() {
    return {
      //tab标签
      tabData: [
        {
          name: '案卷管控',
          component: recordsManage,
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
