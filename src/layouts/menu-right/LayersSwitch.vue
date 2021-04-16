<template>
  <div class="ctrl-panel">
    <div class="ctrl-panel-b">
      <ul style="padding-left: 10px;">
        <!-- <ul style="padding-left: 10px;height: 300px;overflow-y: auto;"> -->
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
      <record-info ref="recordInfo" :code="code" @closeTip="closeTip"></record-info>
      <car-info ref="carInfo" :info="carInfoData" @closeTip="closeCarTip"></car-info>
      <people-info ref="peopleInfo" :info="peopleInfoData" @closeTip="closePeopleTip"></people-info>
      <zf-info ref="zfInfo" :info="zfInfoData" @closeTip="closeZfTip"></zf-info>
    </div>
    <my-video-player :videoSrc.sync="videoSrc" :multiple="true"></my-video-player>
    <!-- <div hidden>
      <part-info ref="partInfo" :partData="partData" @closeTip="closePartTip"></part-info>
    </div> -->
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import ImageLayer from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'
import LayerGroup from 'ol/layer/Group'
import selectedImg from '@/assets/mapImage/selected.png'
import unselectedImg from '@/assets/mapImage/unselected.png'
import { getTypePoint } from '@/api/map/service'
import { getDescribeLayer, getPartFeatureInfo } from '@/api/map/map'
import { gridStyle } from '@/utils/util.map.style'
import { listToFeatures } from '@/utils/util.map.manage'
import RecordInfo from '@/views/records/components/RecordInfo'
import CarInfo from './components/CarInfo'
import PeopleInfo from './components/PeopleInfo'
import ZfInfo from './components/ZfInfo'
import MyVideoPlayer from '@/views/video/components/MyVideoPlayer'
import { getAllPeopleDataList as getAllZfDataList } from '@/api/zf/common'
// import PartInfo from '@/views/part/components/PartInfo'
import util from '@/utils/util'
// let selectLayer = ['区', '街道', '社区', '监督网格', '单元网格', '人员', '车辆', '视频', '案卷'];
// let gridLayer = ['区', '街道', '社区', '监督网格', '单元网格'];
export default {
  name: "LayersSwitch",
  props: {
    show: {
      type: Boolean
    },
  },
  components: {
    RecordInfo,
    // PartInfo
    CarInfo,
    PeopleInfo,
    ZfInfo,
    MyVideoPlayer
  },
  data() {
    return {
      gridLayer: ['区', '街道', '社区', '监督网格', '单元网格'],
      allLayers: [{
        name: '区',
        color: '#800000',
        icon: require('@/assets/mapImage/qx.png'),
        lyr: null
      }, {
        name: '街道',
        color: '#400000',
        icon: require('@/assets/mapImage/jd.png'),
        lyr: null
      }, {
        name: '社区',
        color: '#808080',
        icon: require('@/assets/mapImage/sq.png'),
        lyr: null
      }, {
        name: '监督网格',
        color: '#0000FF',
        icon: require('@/assets/mapImage/jdwg.png'),
        lyr: null
      }, {
        name: '单元网格',
        color: '#FF0000',
        icon: require('@/assets/mapImage/dywg.png'),
        lyr: null
      }, {
        name: '人员',
        icon: require('@/assets/mapImage/ry.png'),
        lyr: null
      }, {
        name: '执法人员',
        icon: require('@/assets/mapImage/ry.png'),
        lyr: null
      }, {
        name: '车辆',
        icon: require('@/assets/mapImage/cl.png'),
        lyr: null
      }, {
        name: '视频',
        icon: require('@/assets/mapImage/sp.png'),
        lyr: null
      }, {
        name: '案卷',
        icon: require('@/assets/mapImage/aj.png'),
        lyr: null
      }, ],
      selectLayer: [],
      code: '',
      partSelectLayer: [],
      partData: {},
      carInfoData: {},
      peopleInfoData: {},
      zfInfoData: {},
      refreshTimer: null,
      videoSrc: ''
    }
  },
  watch: {
    querySelectData(feature) {
      this.popupDetail(feature);
    },
    // mapManager(val) {
    //   if (this.mapManager && !this.map) {
    //     this.getAllLayers();
    //   }
    // }
  },
  computed: {
    ...mapState('map', ['mapManager', 'querySelectData']),
    getSelectState: function(layer) {
      return function(layer) {
        return this.selectLayer.includes(layer) ? selectedImg : unselectedImg
      }
    }
  },
  mounted() {
    this.getAllLayers();
  },
  methods: {
    ...mapActions('section/common', ['getAllPeopleDataList']),
    ...mapActions('video/manage', ['getAllCameraDataList', 'getCameraUrl']),
    ...mapActions('car/manage', ['getAllCarDataList']),
    ...mapActions('records/manage', ['getAllRecordsDataList']),
    getAllLayers() {
      const _this = this;
      const userId = util.cookies.get('userId');
      this.allLayers.forEach(layer => {
        if (this.gridLayer.includes(layer.name)) {
          getTypePoint(layer.name).then(data => {
            console.log('区县数据====', data.length);
            layer.lyr = _this.mapManager.addVectorLayerByFeatures(data, gridStyle(layer.color), 33);
            layer.lyr.setVisible(false);
          });
        } else {
          //获取人员数据
          if (layer.name == '人员') {
            _this.getAllPeopleDataList({ userId: userId }).then(res => {
              const features = listToFeatures(res, '人员');
              console.log('所有人员数据=====', features.length);
              // layer.lyr = _this.mapManager.addClusterLayerByFeatures(features);
              layer.lyr = _this.mapManager.addVectorLayerByFeatures(features, null, 33);
              layer.lyr.set('featureType', 'peopleSimple');
              layer.lyr.setVisible(false);
            });
          } else if (layer.name == '执法人员') {
            getAllZfDataList().then(res => {
              for (let i = res.length - 1; i >= 0; i--) {
                let item = res[i];
                if (item.dept.indexOf('中队') == -1) {
                  const deptIndex = res.indexOf(item);
                  if (deptIndex != -1) {
                    res.splice(deptIndex, 1);
                  }
                }
              }
              const features = listToFeatures(res, '执法人员');
              console.log('所有执法人员数据=====', features.length);
              // layer.lyr = _this.mapManager.addClusterLayerByFeatures(features);
              layer.lyr = _this.mapManager.addVectorLayerByFeatures(features, null, 33);
              layer.lyr.set('featureType', 'zfSimple');
              layer.lyr.setVisible(false);
            });
          } else if (layer.name == '车辆') {
            _this.getAllCarDataList({ userId: userId }).then(res => {
              const features = listToFeatures(res, '车辆');
              console.log('所有车辆数据=====', features.length);
              // layer.lyr = _this.mapManager.addClusterLayerByFeatures(features);
              layer.lyr = _this.mapManager.addVectorLayerByFeatures(features, null, 33);
              layer.lyr.set('featureType', 'carSimple');
              layer.lyr.setVisible(false);
            });
          } else if (layer.name == '视频') {
            _this.getAllCameraDataList({ userId: userId }).then(res => {
              const features = listToFeatures(res, '视频');
              console.log('所有视频数据=====', features.length);
              // layer.lyr = _this.mapManager.addClusterLayerByFeatures(features);
              layer.lyr = _this.mapManager.addVectorLayerByFeatures(features, null, 33);
              layer.lyr.set('featureType', 'videoSimple');
              layer.lyr.setVisible(false);
            });
          } else if (layer.name == '案卷') {
            _this.getAllRecordsDataList({
              userId: userId,
              type: 0,
              timetype: 0,
              curpage: 1,
              pagesize: 10000
            }).then(res => {
              console.log('所有案件数据=====', res.length);
              const features = listToFeatures(res.data, '案卷');
              // layer.lyr = _this.mapManager.addClusterLayerByFeatures(features);
              layer.lyr = _this.mapManager.addVectorLayerByFeatures(features, null, 33);
              layer.lyr.set('featureType', 'eventSimple');
              layer.lyr.setVisible(false);
            });
          }
        }
      });
      // this.getPartLayers();
      this.map = this.mapManager.getMap();
      this.map.on('click', this.mapClickHandler);
      this.detailOverlay = this.mapManager.addOverlay({
        id: 'detailOverlay',
        offset: [0, -35],
        positioning: 'bottom-center',
        element: this.$refs.recordInfo.$el
      });
      this.carOverlay = this.mapManager.addOverlay({
        id: 'carDetailOverlay',
        offset: [0, -35],
        positioning: 'bottom-center',
        element: this.$refs.carInfo.$el
      });
      this.peopleOverlay = this.mapManager.addOverlay({
        id: 'peopleDetailOverlay',
        offset: [0, -35],
        positioning: 'bottom-center',
        element: this.$refs.peopleInfo.$el
      });
      this.zfOverlay = this.mapManager.addOverlay({
        id: 'zfDetailOverlay',
        offset: [0, -35],
        positioning: 'bottom-center',
        element: this.$refs.zfInfo.$el
      });
      // this.partOverlay = this.mapManager.addOverlay({
      //   id: 'partOverlay',
      //   offset: [0, -20],
      //   positioning: 'bottom-center',
      //   element: this.$refs.partInfo.$el
      // });
      this.refreshTimer = setInterval(() => {
        this.selectLayer.forEach(selected => {
          this.allLayers.forEach(lyr => {
            if (lyr.name == selected && !this.gridLayer.includes(lyr.name)) {
              this.getControlData(lyr);
            }
          });
        });
      }, 10 * 60 * 1000);
    },
    getExistLayer(item, features, featureType, layerName) {
      let lyr = null;
      const layers = this.map.getLayers().getArray();
      layers.forEach(layer => {
        if (layer.get('featureType') == featureType) {
          lyr = layer;
          this.selectLayer.push(layerName);
          return false;
        };
      });
      if (lyr) {
        lyr.getSource().clear();
        lyr.getSource().addFeatures(features);
        item.lyr = lyr;
      } else {
        item.lyr = this.mapManager.addVectorLayerByFeatures(features);
        item.lyr.set('featureType', featureType);
        item.lyr.setVisible(false);
      }
    },
    getControlData(layer) {
      const refreshData = (layer, features) => {
        if (layer.lyr) {
          layer.lyr.getSource().clear();
          layer.lyr.getSource().addFeatures(features);
        } else {
          // layer.lyr = this.mapManager.addClusterLayerByFeatures(features);
          layer.lyr = this.mapManager.addVectorLayerByFeatures(features);
        }
        layer.lyr.setVisible(true);
      };
      const userId = util.cookies.get('userId');
      if (layer.name == '人员') {
        this.getAllPeopleDataList({ userId: userId }).then(res => {
          const features = listToFeatures(res, '人员');
          console.log('所有人员数据=====', features.length);
          refreshData(layer, features);
        });
      } else if (layer.name == '执法人员') {
        getAllZfDataList().then(res => {
          for (let i = res.length - 1; i >= 0; i--) {
            let item = res[i];
            if (item.dept.indexOf('中队') == -1) {
              const deptIndex = res.indexOf(item);
              if (deptIndex != -1) {
                res.splice(deptIndex, 1);
              }
            }
          }
          const features = listToFeatures(res, '执法人员');
          console.log('所有执法人员数据=====', features.length);
          refreshData(layer, features);
        });
      } else if (layer.name == '车辆') {
        this.getAllCarDataList({ userId: userId }).then(res => {
          const features = listToFeatures(res, '车辆');
          console.log('所有车辆数据=====', features.length);
          refreshData(layer, features);
        });
      } else if (layer.name == '视频') {
        // this.getAllCameraDataList({ userId: userId }).then(res => {
        //   const features = listToFeatures(res.data, '视频');
        //   console.log('所有视频数据=====', features.length);
        //   refreshData(layer, features);
        // });
      } else if (layer.name == '案卷') {
        this.getAllRecordsDataList({
          userId: userId,
          type: 0,
          timetype: 0,
          curpage: 1,
          pagesize: 10000
        }).then(res => {
          console.log('所有案件数据=====', res.length);
          const features = listToFeatures(res.data, '案卷');
          refreshData(layer, features);
        });
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
          layer.lyr.setVisible(false);
          // const index = this.partSelectLayer.indexOf(`${GIS_CONFIG.featurePrefix}:${layer.name}`);
          // if (index !== -1) {
          //   this.partSelectLayer.splice(index, 1)
          // }
        } else {
          this.getControlData(layer);
          layer.lyr.setVisible(true);
          // this.partSelectLayer.push(`${GIS_CONFIG.featurePrefix}:${layer.name}`);
        }
      }
    },
    closeTip() {
      this.detailOverlay.setPosition(undefined);
    },
    closeCarTip() {
      this.carOverlay.setPosition(undefined);
    },
    closePeopleTip() {
      this.peopleOverlay.setPosition(undefined);
    },
    closeZfTip() {
      this.zfOverlay.setPosition(undefined);
    },
    mapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
      // if (feature && feature.get('features')) {
      if (feature && !feature.get('features')) {
        // const clickFeature = feature.get('features')[0];
        this.popupDetail(feature);
        this.map.render();
      }
      // if (this.partSelectLayer.length > 0) {
      //   getPartFeatureInfo({
      //     layers: this.partSelectLayer.toString(),
      //     bbox: this.map.getView().calculateExtent(this.map.getSize()).toString(),
      //     x: pixel[0],
      //     y: pixel[1],
      //     width: this.map.getSize()[0],
      //     height: this.map.getSize()[1]
      //   }).then(data => {
      //     if (data.features.length > 0) {
      //       const clickFeature = data.features[0];
      //       this.partData = clickFeature.properties;
      //       this.partOverlay.setPosition(clickFeature.geometry.coordinates);
      //     }
      //   });
      // }
    },
    popupDetail(feature) {
      const coords = feature.getGeometry().getCoordinates();
      if (feature && feature.get('type') == 'eventSimple') {
        this.code = feature.get('props').taskcode;
        this.detailOverlay.setPosition(coords);
      } else if (feature && feature.get('type') == 'carSimple') {
        this.carInfoData = feature.get('props');
        this.carOverlay.setPosition(coords);
      } else if (feature && feature.get('type') == 'peopleSimple') {
        this.peopleInfoData = feature.get('props');
        this.peopleOverlay.setPosition(coords);
      } else if (feature && feature.get('type') == 'zfSimple') {
        this.zfInfoData = feature.get('props');
        this.zfOverlay.setPosition(coords);
      } else if (feature && feature.get('type') == 'videoSimple') {
        const videoData = feature.get('props');
        this.videoSrc = videoData.cid;
        // const userId = util.cookies.get('userId');
        // this.getCameraUrl({ userId: userId, code: videoData.cid, transmode: 0 }).then(res => {
        //   this.videoSrc = res.url;
        // });
      }
    },
    getPartLayers() {
      getDescribeLayer('dongtaibujian').then(data => {
        const partLayers = [];
        data.layerDescriptions.forEach(layer => {
          const name = layer.layerName.indexOf(':') != -1 ? layer.layerName.split(':')[1] : layer.layerName;
          const wmsLayer = new ImageLayer({
            title: name,
            layerType: 'part',
            visible: false,
            source: new ImageWMS({
              url: GIS_CONFIG.baseURL + GIS_CONFIG.featurePrefix + '/ows',
              params: {
                'LAYERS': layer.layerName,
                'VERSION': '1.1.0'
              },
              serverType: 'geoserver'
            })
          });
          this.allLayers.push({
            name: name,
            icon: require('@/assets/mapImage/layer.png'),
            lyr: wmsLayer
          });
          partLayers.push(wmsLayer);
        });
        let partLayerGroup = new LayerGroup({
          title: '部件图层',
          layers: partLayers
        });
        this.map.addLayer(partLayerGroup);
      });
    },
    closePartTip() {
      this.partOverlay.setPosition(undefined);
    },
  },
  destroyed() {
    this.allLayers.forEach(layer => {
      if (layer.lyr) {
        this.mapManager.removeLayer(layer.lyr);
      }
    });
    clearInterval(this.refreshTimer);
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
  z-index: 99;
  box-sizing: border-box;
  font-size: 13px;

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