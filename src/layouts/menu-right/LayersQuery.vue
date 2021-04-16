<template>
  <div class="ctrl-panel" flex="dir:top">
    <div class="panel-title">框选查询</div>
    <div class="draw-tool" flex="dir:left cross:center">
      <a-button @click="activeDraw('rectangle')" class="draw-rectangle"></a-button>
      <a-button @click="activeDraw('circle')" class="draw-circle"></a-button>
      <a-button @click="activeDraw('polygon')" class="draw-polygon"></a-button>
      <a-button @click="activeDraw('surface')" class="draw-surface"></a-button>
      <!-- <a-button @click="clear()" icon="rest" class="clear"></a-button> -->
    </div>
    <div class="result-panel">
      <cg-container scroll v-if="treeData[0].children.length > 0">
        <a-tree class="tree-panel" showIcon showLine default-expand-all :treeData="treeData" @select="onSelect">
          <a-icon slot="data-result" type="database" />
          <img slot="dept" src="~@img/avatar_dept.png" />
          <img slot="male" src="~@img/avatar-male.png" />
          <img slot="male-outline" src="~@img/avatar-male-outline.png" />
          <img slot="female" src="~@img/avatar-female.png" />
          <img slot="female-outline" src="~@img/avatar-female-outline.png" />
          <img slot="car-dept" src="~@img/avatar-car.png" />
          <img slot="car" src="~@img/avatar-car.png" />
          <img slot="car-outline" src="~@img/avatar-car-outline.png" />
          <img slot="event" src="@/assets/mapImage/event.png" />
          <img slot="camera" src="~@img/globel-eye.png" />
          <template slot="title" slot-scope="{ title }">
            <span>{{ title }}</span>
          </template>
        </a-tree>
      </cg-container>
      <div v-if="treeData[0].children.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Draw, { createBox } from 'ol/interaction/Draw'
import Polygon from 'ol/geom/Polygon'
import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import util from '@/utils/util'
export default {
  props: {},
  components: {},
  data() {
    return {
      map: null,
      drawTool: null,
      drawSource: new VectorSource(),
      drawLayer: null,
      treeData: [{
        title: '查询结果',
        slots: { icon: 'data-result' },
        children: []
      }]
    }
  },
  computed: {
    ...mapState('map', ['mapManager']),
  },
  watch: {
    // mapManager(val) {
    //   if (this.mapManager && !this.map) {
    //     this.map = this.mapManager.getMap();
    //     this.drawLayer = new VectorLayer({
    //       source: this.drawSource,
    //       zIndex: 3
    //     });
    //     this.map.addLayer(this.drawLayer);
    //   }
    // }
  },
  mounted() {
    this.map = this.mapManager.getMap();
    this.drawLayer = new VectorLayer({
      source: this.drawSource,
      zIndex: 3
    });
    this.map.addLayer(this.drawLayer);
  },
  methods: {
    ...mapMutations('map', [
      'setQuerySelectData'
    ]),
    activeDraw(type) {
      this.drawSource.clear();
      if (type == 'circle') {
        this.drawTool = new Draw({
          source: this.drawSource,
          type: 'Circle'
        });
      } else if (type == 'rectangle') {
        this.drawTool = new Draw({
          source: this.drawSource,
          type: 'Circle',
          geometryFunction: createBox()
        });
      } else if (type == 'polygon') {
        this.drawTool = new Draw({
          source: this.drawSource,
          type: 'Polygon'
        });
      } else if (type == 'surface') {
        this.drawTool = new Draw({
          source: this.drawSource,
          type: 'Polygon',
          freehand: true
        });
      }
      this.drawTool.on('drawend', this.drawEndHandler);
      this.map.addInteraction(this.drawTool);
    },
    drawEndHandler(evt) {
      this.map.removeInteraction(this.drawTool);
      this.treeData[0].children = [];
      const feature = evt.feature;
      const geom = feature.getGeometry();
      const layers = this.map.getLayers().getArray();
      // const containTypes = [];
      layers.forEach(layer => {
        if (!layer.getVisible()) return true;
        const featureType = layer.get('featureType');
        if (featureType == 'eventPosition' || featureType == 'eventSimple') {
          // if (containTypes.indexOf('event') > -1) return true;
          const features = featureType == 'eventPosition' ? layer.getSource().getSource().getFeatures() : layer.getSource().getFeatures();
          const resArray = [];
          features.forEach(feature => {
            if (geom.intersectsCoordinate(feature.getGeometry().getCoordinates())) {
              const props = feature.get('props');
              resArray.push({
                title: props.taskcode,
                feature: feature,
                slots: { icon: 'event' }
              });
            }
          });
          if (resArray.length > 0) {
            this.treeData[0].children.push({
              title: '案件',
              slots: { icon: 'event' },
              children: resArray
            });
            // containTypes.push('event');
          }
        } else if (featureType == 'PeoplePosition' || featureType == 'peopleSimple') {
          const features = featureType == 'PeoplePosition' ? layer.getSource().getSource().getFeatures() : layer.getSource().getFeatures();
          const resArray = [];
          features.forEach(feature => {
            if (geom.intersectsCoordinate(feature.getGeometry().getCoordinates())) {
              const props = feature.get('props');
              resArray.push({
                title: props.name,
                feature: feature,
                slots: props.slots
              });
            }
          });
          if (resArray.length > 0) {
            this.treeData[0].children.push({
              title: '人员',
              slots: { icon: 'dept' },
              children: resArray
            });
          }
        } else if (featureType == 'CarPosition' || featureType == 'carSimple') {
          const features = featureType == 'CarPosition' ? layer.getSource().getSource().getFeatures() : layer.getSource().getFeatures();
          const resArray = [];
          features.forEach(feature => {
            if (geom.intersectsCoordinate(feature.getGeometry().getCoordinates())) {
              const props = feature.get('props');
              resArray.push({
                title: props.name,
                feature: feature,
                slots: props.slots
              });
            }
          });
          if (resArray.length > 0) {
            this.treeData[0].children.push({
              title: '车辆',
              slots: { icon: 'car-dept' },
              children: resArray
            });
          }
        } else if (featureType == 'ZfPosition' || featureType == 'zfSimple') {
          const features = featureType == 'ZfPosition' ? layer.getSource().getSource().getFeatures() : layer.getSource().getFeatures();
          const resArray = [];
          features.forEach(feature => {
            if (geom.intersectsCoordinate(feature.getGeometry().getCoordinates())) {
              const props = feature.get('props');
              resArray.push({
                title: props.name,
                feature: feature,
                slots: props.slots
              });
            }
          });
          if (resArray.length > 0) {
            this.treeData[0].children.push({
              title: '执法',
              slots: { icon: 'dept' },
              children: resArray
            });
          }
        } else if (featureType == 'videoDistribute' || featureType == 'videoSimple') {
          const features = layer.getSource().getFeatures();
          const resArray = [];
          features.forEach(feature => {
            if (geom.intersectsCoordinate(feature.getGeometry().getCoordinates())) {
              const props = feature.get('props');
              resArray.push({
                title: props.cname,
                feature: feature,
                slots: { icon: 'camera' }
              });
            }
          });
          if (resArray.length > 0) {
            this.treeData[0].children.push({
              title: '视频',
              slots: { icon: 'dept' },
              children: resArray
            });
          }
        }
      });
    },
    onSelect(selectedKeys, e) {
      if (selectedKeys.length > 0) {
        const selectedData = e.selectedNodes[0].data.props;
        const feature = selectedData.feature;
        if (feature) {
          this.mapManager.locateTo(feature.getGeometry().getCoordinates());
          const type = feature.get('type');
          if (type == 'eventPosition' || type == 'eventSimple' || type == 'peoplePosition' || type == 'peopleSimple' || type == 'CarPosition' || type == 'carSimple' || type == 'zfPosition' || type == 'zfSimple' || type == 'VideoDistribute' || type == 'videoSimple') {
            this.setQuerySelectData(feature);
          }
        }
      } else {
        this.setQuerySelectData(null);
      }
    },
    clear() {
      this.treeData[0].children = [];
      this.map.removeInteraction(this.drawTool);
      this.drawSource.clear();
    }
  },
  destroyed() {
    this.map.removeInteraction(this.drawTool);
    this.map.removeLayer(this.drawLayer);
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
  height: 400px;

  .panel-title {
    padding-bottom: 5px;
  }

  .draw-tool {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;

    &>:nth-child(n+2) {
      margin-left: 30px;
    }

    .draw-rectangle {
      background: #63caf2 url(../../assets/mapImage/space-3.png) no-repeat center center;
    }

    .draw-circle {
      background: #b09af5 url(../../assets/mapImage/space-5.png) no-repeat center center;
    }

    .draw-polygon {
      background: #638bf2 url(../../assets/mapImage/space-1.png) no-repeat center center;
    }

    .draw-surface {
      background: #fa836f url(../../assets/mapImage/space-2.png) no-repeat center center;
    }

    .clear {
      background: #b09af5;
      color: #fff;
    }
  }

  .nodata-panel {
    width: 100%;
    height: 100%;
  }

  .result-panel {
    position: relative;
    height: 100%;

    .tree-panel {
      padding: 0;
      height: 100%;
      width: 100%;

      img {
        width: 20px;
        display: inline-block;
        border-radius: 12px;
        margin-right: 8px;
      }
    }

    ::v-deep.ant-tree.ant-tree-show-line li:not(:last-child):before {
      border-left: 1px dashed rgba(0, 164, 254, 0.8);
    }

    ::v-deep.ant-tree.ant-tree-show-line li span.ant-tree-switcher {
      background-color: #f5f5f5;
      color: rgba(43, 144, 243, 0.8);
    }

    ::v-deep.ant-tree li .ant-tree-node-content-wrapper {
      padding: 0;
    }

    ::v-deep.itemClass {
      &::before {
        opacity: 0;
      }

      span.ant-tree-switcher {
        opacity: 0;
      }
    }
  }
}
</style>