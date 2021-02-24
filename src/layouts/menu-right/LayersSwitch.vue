<template>
  <div class="ctrl-panel">
    <div class="ctrl-panel-b">
      <ul style="padding-left: 10px">
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
      <record-info ref="recordInfo" :code="code" @closeTip="closeTip('record')"></record-info>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import selectedImg from '@/assets/mapImage/selected.png';
import unselectedImg from '@/assets/mapImage/unselected.png';
import { getTypePoint } from '@/api/map/service';
import { gridStyle } from '@/utils/util.map.style';
import { listToFeatures } from '@/utils/util.map.manage';
import RecordInfo from '@/views/records/components/RecordInfo.vue';
import util from '@/utils/util'
export default {
  name: "LayersSwitch",
  props: {
    show: {
      type: Boolean
    },
  },
  components: {
    RecordInfo
  },
  data() {
    return {
      gridLayer: ['区辖区', '街道', '社区', '责任网格', '单元网格'],
      allLayers: [{
        name: '区辖区',
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
        name: '责任网格',
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
    this.getAllLayers();
  },
  methods: {
    ...mapActions('section/common', ['getAllPeopleDataList']),
    ...mapActions('video/manage', ['getAllCameraDataList']),
    ...mapActions('car/manage', ['getAllCarDataList']),
    ...mapActions('records/manage', ['getAllRecordsDataList']),
    getAllLayers() {
      const _this = this;
      const userId = util.cookies.get('userId');
      this.allLayers.forEach(layer => {
        if (this.gridLayer.includes(layer.name)) {
          if (layer.lyr) return true;
          getTypePoint(layer.name).then(data => {
            console.log(`${layer.name}====`, data.length);
            layer.lyr = _this.mapManager.addVectorLayerByFeatures(data, gridStyle(layer.color), 33);
            layer.lyr.setVisible(false);
          });
        } else {
          if (layer.name == '人员') {
            if (layer.lyr && !this.selectLayer.includes(layer.name)) return true;
            _this.getAllPeopleDataList({ userId: userId }).then(res => {
              const features = listToFeatures(res, '人员');
              console.log('人员数据=====', features.length);
              this.refreshLayerData(layer, features);
            });
          } else if (layer.name == '车辆') {
            if (layer.lyr && !this.selectLayer.includes(layer.name)) return true;
            _this.getAllCarDataList({ userId: userId }).then(res => {
              const features = listToFeatures(res, '车辆');
              console.log('车辆数据=====', features.length);
              this.refreshLayerData(layer, features);
            });
          } else if (layer.name == '视频') {
            if (layer.lyr) return true;
            _this.getAllCameraDataList({ userId: userId }).then(res => {
              const features = listToFeatures(res.data, '视频');
              console.log('视频数据=====', features.length);
              layer.lyr = this.mapManager.addClusterLayerByFeatures(features);
              layer.lyr.setVisible(false);
            });
          } else if (layer.name == '案卷') {
            if (layer.lyr && !this.selectLayer.includes(layer.name)) return true;
            _this.getAllRecordsDataList({
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
      if (type == 'record') {
        this.recordOverlay.setPosition(undefined);
      }
    },
    mapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
      if (feature && feature.get('features')) {
        const clickFeature = feature.get('features')[0];
        const coordinates = clickFeature.getGeometry().getCoordinates();
        if (clickFeature && clickFeature.get('type') == 'eventPosition') {
          this.code = clickFeature.get('props').taskcode;
          this.recordOverlay.setPosition(coordinates);
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