<template>
  <div class="page">
    <content-tabs :tabData="tabData" @changeTab="changeTab"></content-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState('map', ['mapManager'])
  },
  mounted() {
    this.map = this.mapManager.getMap()
  },
  methods: {
    changeTab(val) {
      console.log(val)
      const layers = this.map.getLayers().array_
      const overlays = this.map.getOverlays().array_
      console.log('弹框', overlays)
      //切换时清除地图上的一些操作
      layers.forEach(l => {
        if (l.get('featureType')) {
          // 视频监控
          if (val == '0') {
            if (l.get('featureType') == 'videoDistribute') {
              l.setVisible(true)
              this.map.getView().fit(l.getSource().getExtent())
            } else {
              l.setVisible(false)
            }
          } else if (val == '1') {
            // 雨量监测
            if (l.get('featureType') == 'rainWatch') {
              l.setVisible(true)
              this.map.getView().fit(l.getSource().getExtent())
            } else {
              l.setVisible(false)
            }
          } else if (val == '2') {
            //水位监测
            // this.map.getOverlayById('alarmOverlay').setPosition(undefined)
            if (l.get('featureType') == 'waterLevel') {
              l.setVisible(true)
              this.map.getView().fit(l.getSource().getExtent())
            } else {
              l.setVisible(false)
            }
          } else {
            //井盖监测
            // this.map.getOverlayById('alarmOverlay').setPosition(undefined)
            if (l.get('featureType') == 'manhole') {
              l.setVisible(true)
              this.map.getView().fit(l.getSource().getExtent())
            } else {
              l.setVisible(false)
            }
          }
        }
      })
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
