<template>
  <div class="page">
    <content-tabs :tabData="tabData"></content-tabs>
  </div>
</template>

<script>
import AlarmSearch from './components/AlarmSearch.vue'
import AlarmStatistics from './components/AlarmStatistics.vue'
import VideoDistribute from './components/VideoDistribute.vue'
export default {
  name: 'alarmVideo',
  data() {
    return {
      //tab标签
      tabData: [
        {
          name: '告警统计',
          component: AlarmStatistics,
          hasScroll: true
        },
        {
          name: '告警查询',
          component: AlarmSearch,
          hasScroll: false
        },
        {
          name: '监控分布',
          component: VideoDistribute,
          hasScroll: false
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
}
</style>
