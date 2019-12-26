<template>
  <div class="page">
    <div class="page-header">
      视频管控
    </div>
    <video-distribute></video-distribute>
    <!--<content-tabs :tabData="tabData" @changeTab="changeTab"></content-tabs>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AlarmSearch from './components/AlarmSearch.vue'
import AlarmStatistics from './components/AlarmStatistics.vue'
import VideoDistribute from './components/VideoDistribute.vue'
export default {
  name: 'alarmVideo',
  components:{
    VideoDistribute
  },
  data() {
    return {
      //tab标签
      tabData: [
        // {
        //   name: '告警统计',
        //   component: AlarmStatistics,
        //   hasScroll: true
        // },
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
  },
    computed:{
        ...mapState('map', ['mapManager'])
    },
    mounted(){
        this.map = this.mapManager.getMap();
    },
    methods:{
      changeTab(val){
          const layers=this.map.getLayers().array_;
          //切换时清除地图上的一些操作
          layers.forEach(l=>{
              if(l.get('featureType')){
                  if (val == '0') { //告警统计
                      this.map.getOverlayById('alarmOverlay').setPosition(undefined);
                      if (l.get('featureType') == 'alarmSearch'||l.get('featureType') == 'videoDistribute') {
                          l.setVisible(false);
                      }
                  } else if (val == '1') { //告警查询
                      if (l.get('featureType') == 'alarmSearch') {
                          l.setVisible(true);
                          this.map.getView().fit(l.getSource().getExtent());
                      }else{
                          l.setVisible(false);
                      }
                  }else if (val == '2'){ //监控分布
                      this.map.getOverlayById('alarmOverlay').setPosition(undefined);
                      if (l.get('featureType') == 'videoDistribute') {
                          l.setVisible(true);
                          this.map.getView().fit(l.getSource().getExtent());
                      }else{
                          l.setVisible(false);
                      }
                  }
              }
          });
      }
    }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  .page-header{
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
