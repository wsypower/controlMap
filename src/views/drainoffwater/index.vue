<template>
  <div class="page">
    <content-tabs :tabData="tabData"></content-tabs>
  </div>
</template>
<script>
import VideoDistribute from './components/video/VideoDistribute.vue'
import Rainfall from './components/rainfall/index.vue'
import WaterLevel from './components/waterlevel/index.vue'
import Manhole from './components/manhole/index.vue'
  export default {
    name: 'drainoffwater',
    data() {
      return {
        //tab标签
        tabData: [
          {
            name: '视频监控',
            component: VideoDistribute,
            hasScroll: false
          },
          {
            name: '雨量监测',
            component: Rainfall,
            hasScroll: false
          },
          {
            name: '水位监测',
            component: WaterLevel,
            hasScroll: false
          },
          {
            name: '井盖监测',
            component: Manhole,
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
