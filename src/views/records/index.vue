<template>
  <div class="page">
    <!-- <div class="page-title">
      案卷管控
    </div>
    <records-manage></records-manage> -->
    <content-tabs :tabData="tabData" @changeTab="changeTab"></content-tabs>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import recordsManage from './components/RecordsManage.vue'
import StatisticalAnalysis from './components/StatisticalAnalysis.vue'
export default {
  name: 'records',
  // components:{
  //   recordsManage
  // },
  data() {
    return {
      tabData: [{
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
  computed: {
    ...mapState('map', ['mapManager'])
  },
  mounted() {
    this.map = this.mapManager.getMap();
  },
  methods: {
    ...mapMutations('map', ['setShowHeatmapAnalysis']),
    changeTab(val) {
      const layers = this.map.getLayers().getArray();
      layers.forEach(l => {
        if (l.get('featureType')) {
          if (val == '1') {
            this.map.getOverlayById('eventPositionOverlay').setPosition(undefined);
            if (l.get('featureType') == 'eventPosition') {
              l.setVisible(false);
            } else if (l.get('featureType') == 'eventRepeatPosition') {
              l.getSource().clear();
              l.setVisible(false);
            }
            this.setShowHeatmapAnalysis(true);
          } else if (val == '0') {
            if (l.get('featureType') == 'eventPosition') {
              l.setVisible(true);
              this.map.getView().fit(l.getSource().getExtent());
            } else if (l.get('featureType') == 'eventRepeatPosition') {
              l.setVisible(true);
            } else {
              l.setVisible(false);
            }
            this.setShowHeatmapAnalysis(false);
          }
        }
      });
    }
  },
  destroyed() {
    this.setShowHeatmapAnalysis(false);
  }
}
</script>
<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;

  .page-title {
    height: 50px;
    width: 100%;
    padding-left: 20px;
    line-height: 50px;
    background-color: #f5f7f8;
    color: #2b90f3;
    font-size: 18px;
    text-align: left;
  }
}
</style>