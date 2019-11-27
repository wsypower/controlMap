<template>
  <div class="page">
    <content-tabs :tabData="tabData"></content-tabs>
  </div>
</template>
<script>
import StatisticalAnalysis from './components/StatisticalAnalysis.vue'
import PeopleManage from './components/PeopleManage.vue'
export default {
  name: 'people',
  components: {
    PeopleManage,
    StatisticalAnalysis
  },
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
          name: '人员管控',
          component: PeopleManage,
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
