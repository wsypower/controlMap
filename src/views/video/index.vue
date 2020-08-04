<template>
  <div class="page">
      <!-- 地图控件注入地址 -->
      <LayoutMap ref="olMap"></LayoutMap>
      <video-list></video-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex';
  import LayoutMap from '@/views/map/olMap.vue';
  // import { MapManager,getPointByPeopleList,filterMapId,filterVideoPoint } from '@/utils/util.map.manage';
  // import {getAllVideo,getAllPeople,getEmergencyFeatures} from '@/api/map/service'
  // import { peopleStyle,videoStyle,areaStyle } from '@/utils/util.map.style'
  // import {getVideoById} from '@/api/map/map'
  import VideoList from './list.vue'
export default {
  name: 'videopage',
  components:{
    LayoutMap,
    VideoList
  }
}
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100%;
    background-color: #f4f4f5;
    padding-top: 60px;
    position: relative;
}
</style>