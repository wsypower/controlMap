<template>
  <div class="ctrl-panel">
    <div class="ctrl-panel-b">
      <ul>
        <li class="ctrl-panel-item" v-for="(layer,index) in allLayers" :key="index">
          <p class="ctrl-panel-item-checkbox" @click="toggleService(layer)">
            <img :src="getSelectState(layer.name)">
          </p>
          <div class="ctrl-panel-item-middle">
            <p class="ctrl-panel-item-icon df aic">
              <img :src="layer.icon" style="width: 15px;height: 15px">
            </p>
            <p>{{layer.name}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div hidden>
      <record-info ref="recordInfo" :code="code" @closeTip="closeTip('event')"></record-info>
      <people-info ref="peopleInfo" :info="peopleInfoData" @closeTip="closeTip('people')"></people-info>
      <car-info ref="carInfo" :info="carInfoData" @closeTip="closeTip('car')"></car-info>
    </div>
    <my-video-player :videoSrc.sync="videoSrc" :multiple="true"></my-video-player>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import selectedImg from '@/assets/mapImage/selected.png'
import unselectedImg from '@/assets/mapImage/unselected.png'
import { getTypePoint } from '@/api/map/service'
import { gridStyle } from '@/utils/util.map.style'
import { listToFeatures } from '@/utils/util.map.manage'
import RecordInfo from '@/views/records/components/RecordInfo.vue'
import PeopleInfo from './components/PeopleInfo.vue'
import CarInfo from './components/CarInfo.vue'
import MyVideoPlayer from '@/views/video/components/MyVideoPlayer'
import util from '@/utils/util'
export default {
  name: 'LayersSwitch',
  props: {
    show: {
      type: Boolean
    },
  },
  components: {
    RecordInfo,
    PeopleInfo,
    CarInfo,
    MyVideoPlayer
  },
  data() {
    return {
      gridLayer: ['区辖区', '街道', '社区', '责任网格', '单元网格'],
      allLayers: [{
        name: '区辖区',
        color: '#800000',
        text: 'distname',
        icon: require('@/assets/mapImage/qx.png'),
        lyr: null
      }, {
        name: '街道',
        color: '#400000',
        text: 'streetname',
        icon: require('@/assets/mapImage/jd.png'),
        lyr: null
      }, {
        name: '社区',
        color: '#808080',
        text: 'comname',
        icon: require('@/assets/mapImage/sq.png'),
        lyr: null
      }, {
        name: '责任网格',
        color: '#0000FF',
        text: 'drcode',
        icon: require('@/assets/mapImage/jdwg.png'),
        lyr: null
      }, {
        name: '单元网格',
        color: '#FF0000',
        text: 'bgid',
        icon: require('@/assets/mapImage/dywg.png'),
        lyr: null
      }, {
        name: '人员',
        icon: require('@/assets/mapImage/ry.png'),
        lyr: null
      }, {
        name: '车辆',
        icon: require('@/assets/mapImage/cl.png'),
        lyr: null
      }, {
        name: '案卷',
        icon: require('@/assets/mapImage/aj.png'),
        lyr: null
      }, {
        name: '视频',
        icon: require('@/assets/mapImage/sp.png'),
        lyr: null
      }],
      selectLayer: [],
      code: '',
      peopleInfoData: {},
      carInfoData: {},
      videoSrc: '',
      refreshTimer: null
    }
  },
  watch: {
    selectLayer: function(val) {
      if (this.selectLayer.includes('人员') || this.selectLayer.includes('车辆') || this.selectLayer.includes('案卷')) {
        this.getAllLayers();
        if (!this.refreshTimer) {
          this.refreshTimer = setInterval(() => {
            this.getAllLayers();
          }, 10 * 60 * 1000);
        }
      } else {
        clearInterval(this.refreshTimer);
        this.refreshTimer = null;
      }
    }
  },
  computed: {
    ...mapState('map', ['mapManager']),
    getSelectState: function(layer) {
      return function(layer) {
        return this.selectLayer.includes(layer) ? selectedImg : unselectedImg
      }
    }
  },
  mounted() {
    this.map = this.mapManager.getMap();
    this.map.on('click', this.mapClickHandler);
    this.recordOverlay = this.mapManager.addOverlay({
      id: 'recordOverlay',
      offset: [0, -20],
      positioning: 'bottom-center',
      element: this.$refs.recordInfo.$el
    });
    this.peopleOverlay = this.mapManager.addOverlay({
      id: 'peopleOverlay',
      offset: [0, -20],
      positioning: 'bottom-center',
      element: this.$refs.peopleInfo.$el
    });
    this.carOverlay = this.mapManager.addOverlay({
      id: 'carOverlay',
      offset: [0, -20],
      positioning: 'bottom-center',
      element: this.$refs.carInfo.$el
    });
    this.getAllLayers();
  },
  methods: {
    ...mapActions('section/common', ['getAllPeopleDataList']),
    ...mapActions('video/manage', ['getAllCameraDataList']),
    ...mapActions('car/manage', ['getAllCarDataList']),
    ...mapActions('records/manage', ['getAllRecordsDataList']),
    getAllLayers() {
      const userId = util.cookies.get('userId');
      this.allLayers.forEach(layer => {
        if (this.gridLayer.includes(layer.name)) {
          if (layer.lyr) return true;
          getTypePoint(layer.name).then(data => {
            console.log(`${layer.name}====`, data.length);
            layer.lyr = this.mapManager.addVectorLayerByFeatures(data, gridStyle(layer), 33);
            layer.lyr.setVisible(false);
          });
        } else {
          if (layer.name == '人员') {
            if (layer.lyr && !this.selectLayer.includes(layer.name)) return true;
            this.getAllPeopleDataList({ userId: userId }).then(res => {
              const features = listToFeatures(res, '人员');
              console.log('人员数据=====', features.length);
              this.refreshLayerData(layer, features);
            });
          } else if (layer.name == '车辆') {
            if (layer.lyr && !this.selectLayer.includes(layer.name)) return true;
            this.getAllCarDataList({ userId: userId }).then(res => {
              const features = listToFeatures(res, '车辆');
              console.log('车辆数据=====', features.length);
              this.refreshLayerData(layer, features);
            });
          } else if (layer.name == '视频') {
            if (layer.lyr) return true;
            this.getAllCameraDataList({ userId: userId }).then(res => {
              const features = listToFeatures(res.data, '视频');
              console.log('视频数据=====', features.length);
              layer.lyr = this.mapManager.addClusterLayerByFeatures(features);
              layer.lyr.setVisible(false);
            });
          } else if (layer.name == '案卷') {
            if (layer.lyr && !this.selectLayer.includes(layer.name)) return true;
            this.getAllRecordsDataList({
              userId: userId,
              type: 0,
              timetype: 0,
              curpage: 1,
              pagesize: 10000
            }).then(res => {
              console.log('案件数据=====', res.data.length);
              const features = listToFeatures(res.data, '案卷');
              this.refreshLayerData(layer, features);
            });
          }
        }
      });
    },
    refreshLayerData(layer, features) {
      if (layer.lyr) {
        const source = layer.lyr.getSource().getSource();
        source.clear();
        source.addFeatures(features);
      } else {
        layer.lyr = this.mapManager.addClusterLayerByFeatures(features);
        layer.lyr.setVisible(false);
      }
    },
    toggleService(layer) {
      if (layer.name === '全部图层') {
        if (this.selectLayer.includes(layer.name)) {
          for (let i = 1; i < this.allLayers.length; i++) {
            this.allLayers[i].lyr.setVisible(false)
          }
          this.selectLayer = [];
        } else {
          for (let i = 1; i < this.allLayers.length; i++) {
            this.allLayers[i].lyr.setVisible(true);
          }
          this.selectLayer = [...selectLayer];
        }
      } else {
        const index = this.selectLayer.indexOf(layer.name);
        if (index !== -1) {
          this.selectLayer.splice(index, 1)
        } else {
          this.selectLayer.push(layer.name)
        }
        if (!this.selectLayer.includes(layer.name)) {
          layer.lyr.setVisible(false)
        } else {
          layer.lyr.setVisible(true)
        }
      }
    },
    closeTip(type) {
      if (type == 'event') {
        this.recordOverlay.setPosition(null);
      } else if (type == 'people') {
        this.peopleOverlay.setPosition(null);
      } else if (type == 'car') {
        this.carOverlay.setPosition(null);
      }
    },
    mapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
      if (feature && feature.get('features')) {
        const clickFeature = feature.get('features')[0];
        const coordinates = clickFeature.getGeometry().getCoordinates();
        if (clickFeature) {
          if (clickFeature.get('type') == 'event') {
            this.code = clickFeature.get('props').taskcode;
            this.recordOverlay.setPosition(coordinates);
          } else if (clickFeature.get('type') == 'people') {
            this.peopleInfoData = clickFeature.get('props');
            this.peopleOverlay.setPosition(coordinates);
          } else if (clickFeature.get('type') == 'car') {
            this.carInfoData = clickFeature.get('props');
            this.carOverlay.setPosition(coordinates);
          } else if (clickFeature.get('type') == 'video') {
            // this.videoSrc = 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8';
          }
        }
      }
    },
  },
  destroyed() {
    this.allLayers.forEach(layer => {
      if (layer.lyr) {
        this.mapManager.removeLayer(layer.lyr);
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.ctrl-panel {
  position: absolute;
  right: 50px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 1);
  border: solid 1px rgba(221, 221, 221, 1);
  border-radius: 4px;
  z-index: 99;
  box-sizing: border-box;
  font-size: 13px;

  ul {
    padding-left: 10px;
    margin-bottom: 0px;
  }

  .ctrl-panel-item {
    display: -webkit-box;
    align-items: center;
    margin-bottom: 12px;
    height: 18px;

    &:last-child {
      margin-bottom: 0;
    }

    .ctrl-panel-item-checkbox {
      margin-right: 12px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .ctrl-panel-item-middle {
      display: flex;
      width: 90px;
      flex: none;

      .ctrl-panel-item-icon {
        margin-right: 5px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>