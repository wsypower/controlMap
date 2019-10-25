<template>
  <div class="page">
    <!--<content-tabs :tabData="tabData"></content-tabs>-->
    <vTab tabWidth="119px" :tabs="tabData" class=""></vTab>
  </div>
</template>

<script>
import AlarmSearch from '@/views/video/components/AlarmSearch.vue'
import AlarmStatistics from '@/views/video/components/AlarmStatistics.vue'
import VideoDistribute from '@/views/video/components/VideoDistribute.vue'
import vTab from '@/components/vTab.vue'

export default {
  name: 'page5',
  components:{
    vTab
  },
  data() {
    return {
      //tab标签
      tabData: [
        {
          name: '告警统计',
          component: AlarmStatistics,
          data:{}
        },
        {
          name: '告警查询',
          component: AlarmSearch,
          data:{}
        },
        {
          name: '监控分布',
          component: VideoDistribute,
          data:{}
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 1600px;
}
</style>
