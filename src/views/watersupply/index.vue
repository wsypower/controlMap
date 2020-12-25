<template>
  <div class="page">
    <content-tabs :tabData="tabData" @changeTab="changeTab"></content-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import waterQuality from './components/waterquality/index.vue';
import pressure from './components/pressure/index.vue'
import flow from './components/flow/index.vue'
export default {
  name: 'waterSupply',
  data() {
    return {
      //tab标签
      tabData: [
        {
          name: '水质监测',
          component: waterQuality,
          hasScroll: false
        },
        {
          name: '压力监测',
          component: pressure,
          hasScroll: false
        },
        {
          name: '流量监测',
          component: flow,
          hasScroll: false
        }
      ]
    }
  },
  computed: {
    ...mapState('map', ['mapManager'])
  },
  mounted() {
    this.map = this.mapManager.getMap();
  },
  methods: {
    changeTab(val) {
      console.log(val)
      const layers = this.map.getLayers().array_
      const overlays = this.map.getOverlays().array_
      overlays.forEach(o => {
        o.setPosition(undefined);
      })
      console.log('弹框', overlays)
      //切换时清除地图上的一些操作
      layers.forEach(l => {
        if (l.get('featureType')) {
          // 视频监控
          if (val == '0') {
            if (l.get('featureType') == 'waterquality') {
              l.setVisible(true)
              this.map.getView().fit(l.getSource().getExtent())
            } else {
              l.setVisible(false)
            }
          } else if (val == '1') {
            // 雨量监测
            if (l.get('featureType') == 'pressure') {
              l.setVisible(true)
              this.map.getView().fit(l.getSource().getExtent())
            } else {
              l.setVisible(false)
            }
          } else if (val == '2') {
            //水位监测
            // this.map.getOverlayById('alarmOverlay').setPosition(undefined)
            if (l.get('featureType') == 'flow') {
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
