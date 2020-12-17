<template>
  <div class="part-manage" flex="dir:top">
    <div class="search-panel">
      <a-input-search placeholder="输入关键词搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
    </div>
    <div class="yuan_dialog_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && treeData.length > 0 && showTree">
        <a-tree ref="partTree" class="tree-panel" v-model="checkedKeys" checkable :expanded-keys="expandedKeys" :auto-expand-parent="autoExpandParent" :tree-data="treeData" @expand="onExpand" @check="onCheck">
          <template slot="title" slot-scope="{ title }">
            <span v-if="title.indexOf(searchValue) > -1">
              {{ title.substr(0, title.indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>{{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
            </span>
            <span v-else>{{ title }}</span>
          </template>
          <!-- <img slot="dept" src="~@img/avatar_dept.png" />
          <img slot="ludeng-online" src="@img/ludeng-online.png" />
          <img slot="ludeng-offline" src="@img/ludeng-offline.png" />
          <img slot="dengxiang-online" src="@img/dengxiang-online.png" />
          <img slot="dengxiang-offline" src="@img/dengxiang-offline.png" /> -->
        </a-tree>
      </cg-container>
      <div v-if="(!showLoading && treeData.length == 0) || !showTree" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div hidden>
      <part-info ref="partInfo" :partData="partData" @closeTip="closePartTip"></part-info>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import ImageLayer from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'
import LayerGroup from 'ol/layer/Group'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import GeoJSON from 'ol/format/GeoJSON'
import util from '@/utils/util'
import { getDescribeLayer, getPartFeatureInfo, getEventTypeTreeData } from '@/api/map/map'
import PartInfo from '@/views/part/components/PartInfo'
export default {
  components: {
    PartInfo
  },
  data() {
    return {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      treeData: [],
      partLayerGroup: null,
      showLoading: false,
      showLayers: [],
      layerTable: {},
      partData: {},
      partOverlay: null,
      allLayerNames: [],
      allLayerNodes: [],
      searchValue: '',
      showTree: true,
      geoJson: new GeoJSON({
        geometryName: 'the_geom'
      })
    }
  },
  watch: {},
  computed: {
    ...mapState('map', ['mapManager'])
  },
  mounted() {
    this.map = this.mapManager.getMap();
    this.map.on('click', this.mapClickHandler);
    this.partOverlay = this.mapManager.addOverlay({
      id: 'partOverlay',
      offset: [0, -20],
      positioning: 'bottom-center',
      element: this.$refs.partInfo.$el
    });
    this.loadPartData();
  },
  methods: {
    onSearch(val) {
      this.expandedKeys = [];
      this.searchValue = val;
      this.allLayerNodes.forEach(node => {
        if (node.title.indexOf(val) != -1) {
          this.expandedKeys.push(node.key);
        }
      });
      this.autoExpandParent = true;
      if (this.expandedKeys.length === 0) {
        this.showTree = false;
      } else {
        this.showTree = true;
      }
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys, evt) {
      const checked = evt.checked;
      const props = evt.node.dataRef;
      if (checked) {
        if (props.children && props.children.length > 0) {
          props.children.forEach(layer => {
            if (layer.children && layer.children.length > 0) {
              return true;
            } else {
              this.showLayer(layer.name);
            }
          });
        } else {
          this.showLayer(props.name);
        }
      } else {
        if (props.children && props.children.length > 0) {
          props.children.forEach(layer => {
            if (layer.children && layer.children.length > 0) {
              return true;
            } else {
              this.hideLayer(layer.name);
            }
          });
        } else {
          this.hideLayer(props.name);
        }
      }
    },
    showLayer(name) {
      const layer = this.layerTable[name];
      const layerName = `${GIS_CONFIG.featurePrefix}:${name}`;
      if (layer) {
        layer.setVisible(true);
      } else {
        const wmsLayer = new ImageLayer({
          layerType: 'part',
          visible: true,
          source: new ImageWMS({
            url: `${GIS_CONFIG.baseURL}${GIS_CONFIG.featurePrefix}/ows`,
            params: {
              'LAYERS': layerName,
              'VERSION': '1.1.0'
            },
            serverType: 'geoserver'
          })
        });
        this.layerTable[name] = wmsLayer;
        this.partLayerGroup.getLayers().push(wmsLayer);
      }
      this.showLayers.push(layerName);
    },
    hideLayer(name) {
      const layer = this.layerTable[name];
      const layerName = `${GIS_CONFIG.featurePrefix}:${name}`;
      if (layer) {
        layer.setVisible(false);
      }
      const layerIndex = this.showLayers.indexOf(layerName);
      if (layerIndex != -1) {
        this.showLayers.splice(layerIndex, 1);
      }
    },
    loadPartData() {
      this.showLoading = true;
      this.getPartLayers();
    },
    getPartLayers() {
      getDescribeLayer('dongtaibujian').then(data => {
        const partLayers = [];
        data.layerDescriptions.forEach(layer => {
          const name = layer.layerName.indexOf(':') != -1 ? layer.layerName.split(':')[1] : layer.layerName;
          this.allLayerNames.push(name);
        });
        const userId = util.cookies.get('userId');
        getEventTypeTreeData({ userId: userId }).then(res => {
          this.changeTreeData(res);
          this.treeData = res;
          this.partLayerGroup = new LayerGroup({
            title: '部件图层',
            layers: []
          });
          this.map.addLayer(this.partLayerGroup);
          this.showLoading = false;
        });
      });
    },
    changeTreeData(arr, item) {
      const typeArray = [];
      arr.forEach(item => {
        if (!item.children || item.children.length == 0) {
          item.scopedSlots = { title: 'title' };
          const tempName = item.title.replace(/[\、|\ |\（|\）]/g, '');
          item.name = tempName;
          if (this.allLayerNames.indexOf(tempName) != -1) {
            typeArray.push(item);
            item.key = item.id;
            this.allLayerNodes.push(item);
          }
        } else {
          this.changeTreeData(item.children, item);
        }
      });
      if (item) {
        item.children = typeArray;
      }
    },
    mapClickHandler({ pixel, coordinate }) {
      if (this.showLayers.length > 0) {
        getPartFeatureInfo({
          layers: this.showLayers.toString(),
          bbox: this.map.getView().calculateExtent(this.map.getSize()).toString(),
          x: pixel[0],
          y: pixel[1],
          width: this.map.getSize()[0],
          height: this.map.getSize()[1]
        }).then(data => {
          if (data.features.length > 0) {
            const clickFeature = this.geoJson.readFeature(data.features[0]);
            this.partData = clickFeature.getProperties();
            const coordinates = clickFeature.getGeometry().getFirstCoordinate();
            this.partOverlay.setPosition(coordinates);
          }
        });
      }
    },
    closePartTip() {
      this.partOverlay.setPosition(null);
    }
  },
  beforeDestroy() {
    this.map.un('click', this.mapClickHandler);
    this.map.removeOverlay(this.partOverlay);
    this.map.removeLayer(this.partLayerGroup);
  }
}
</script>
<style lang="scss" scoped>
.part-manage {
  height: 100%;
  width: 100%;
  padding: 20px;
}

.yuan_dialog_body {
  background-color: #f5f5f5;
  height: calc(100% - 50px);
  position: relative;

  .tree-panel {
    width: 100%;
    height: 100%;
    padding: 10px;

    img {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-radius: 12px;
      margin-right: 8px;
    }
  }

  .nodata-panel,
  .spin-panel {
    width: 100%;
    height: 100%;
  }

  /deep/.ant-tree.ant-tree-show-line li:not(:last-child):before {
    border-left: 1px dashed rgba(0, 164, 254, 0.8);
  }

  /deep/.ant-tree.ant-tree-show-line li span.ant-tree-switcher {
    background-color: #f5f5f5;
    color: rgba(43, 144, 243, 0.8);
  }

  /deep/.itemClass {
    &::before {
      opacity: 0;
    }

    span.ant-tree-switcher {
      opacity: 0;
      display: none;
    }
  }
}
</style>