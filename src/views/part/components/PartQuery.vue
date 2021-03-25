<template>
  <div class="part-manage" flex="dir:top">
    <div class="search-panel">
      <div flex="main:center cross:center">
        <label style="width: 50px;">大类：</label>
        <a-select v-model="selectMainType" showSearch placeholder="请选择" style="width: 246px;" @change="changeMainTypeList">
          <a-select-option v-for="(item, index) in mainTypeList" :value="item.id" :key="index">{{ item.title }}</a-select-option>
        </a-select>
      </div>
      <div flex="main:center cross:center" style="margin:10px 0px;">
        <label style="width: 50px;">小类：</label>
        <a-select v-model="selectSubType" showSearch placeholder="请选择" style="width: 246px;" @change="changeSubTypeList">
          <a-select-option v-for="(item, index) in subTypeList" :value="item.id" :key="index">{{ item.title }}</a-select-option>
        </a-select>
      </div>
      <a-button type="primary" style="width: 100%" @click="activeDraw">框选查询</a-button>
    </div>
    <div class="yuan_dialog_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && dataList.length > 0">
        <div v-for="(itemData, index) in dataList" :key="index" class="item" flex @click="clickDataItem(itemData, index)" :class="{ active: activeIndex === index }">
          <div class="item-left" flex="main:center cross:center">
            <pin :isActive="activeIndex === index"></pin>
          </div>
          <div class="item-right" flex="cross:center">
            <div class="description-panel">
              <div flex>
                <span>名称：</span><span>{{ itemData.name }}</span>
              </div>
              <div flex>
                <span>编码：</span><span>{{ itemData.code }}</span>
              </div>
            </div>
          </div>
        </div>
      </cg-container>
      <div v-if="!showLoading && dataList.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div v-if="!showLoading && dataList.length > 0" class="pagination-panel">
      <a-pagination size="small" :showLessItems="true" :total="totalSize" :showTotal="total => `共 ${total} 条`" :pageSize="queryParam.pageSize" :current="queryParam.curPage" @change="changePagination" />
    </div>
    <div hidden>
      <part-info ref="partInfo" :partData="partData" @closeTip="closePartTip"></part-info>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Draw, { createBox } from 'ol/interaction/Draw'
import { Vector as VectorSource, ImageWMS } from 'ol/source'
import { Vector as VectorLayer, Image as ImageLayer, Group as LayerGroup } from 'ol/layer'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import GeoJSON from 'ol/format/GeoJSON'
import WKT from 'ol/format/WKT'
import util from '@/utils/util'
import { getDescribeLayer, getPartFeatureInfo, getEventTypeTreeData, getPartQueryData } from '@/api/map/map'
import PartInfo from '@/views/part/components/PartInfo'
import Pin from '../../emergency/components/Position'
export default {
  components: {
    Pin,
    PartInfo
  },
  data() {
    return {
      partLayerGroup: null,
      showLoading: false,
      showLayers: [],
      layerTable: {},
      partData: {},
      partOverlay: null,
      allLayerNames: [],
      geoJson: new GeoJSON({
        geometryName: 'the_geom'
      }),
      wkt: new WKT(),
      mainTypeList: [],
      subTypeList: [],
      selectMainType: '',
      selectSubType: '',
      dataList: [],
      drawTool: null,
      drawSource: new VectorSource(),
      drawLayer: null,
      activeIndex: null,
      resultSource: new VectorSource(),
      resultLayer: null,
      totalSize: 0,
      queryParam: {
        type: '',
        extent: [],
        pageSize: 50,
        curPage: 1,
        startIndex: 0
      }
    }
  },
  watch: {},
  computed: {
    ...mapState('map', ['mapManager'])
  },
  mounted() {
    this.map = this.mapManager.getMap();
    this.partLayerGroup = new LayerGroup({
      title: '部件图层',
      layers: []
    });
    this.map.addLayer(this.partLayerGroup);
    this.drawLayer = new VectorLayer({
      source: this.drawSource
    });
    this.map.addLayer(this.drawLayer);
    this.resultLayer = new VectorLayer({
      source: this.resultSource
    });
    this.map.addLayer(this.resultLayer);
    this.map.on('click', this.mapClickHandler);
    this.partOverlay = this.mapManager.addOverlay({
      id: 'partOverlay',
      offset: [0, -20],
      positioning: 'bottom-center',
      element: this.$refs.partInfo.$el
    });
    this.loadPartTypeData();
  },
  methods: {
    activeDraw() {
      this.drawSource.clear();
      this.drawTool = new Draw({
        source: this.drawSource,
        type: 'Circle',
        geometryFunction: createBox()
      });
      this.drawTool.on('drawend', this.drawEndHandler);
      this.map.addInteraction(this.drawTool);
    },
    drawEndHandler(evt) {
      this.map.removeInteraction(this.drawTool);
      const feature = evt.feature;
      // const extent = feature.getGeometry().getExtent();
      const geomWkt = this.wkt.writeFeature(feature);
      this.subTypeList.forEach(subType => {
        if (subType.id == this.selectSubType) {
          this.queryParam.type = subType.title.replace(/[\、|\ |\（|\）]/g, '');
          // this.queryParam.extent = extent;
          this.queryParam.geometry = geomWkt;
          this.queryParam.startIndex = 0;
          this.queryParam.curPage = 1;
          this.getPartDataList();
        }
      });
    },
    clickDataItem(item, index) {
      this.activeIndex = index;
      const feature = item.feature;
      const coords = feature.getGeometry().getCoordinates();
      this.partData = feature.getProperties();
      this.partOverlay.setPosition(coords);
      this.mapManager.locateTo(coords);
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
    loadPartTypeData() {
      getDescribeLayer('dongtaibujian').then(data => {
        const partLayers = [];
        data.layerDescriptions.forEach(layer => {
          const name = layer.layerName.indexOf(':') != -1 ? layer.layerName.split(':')[1] : layer.layerName;
          this.allLayerNames.push(name);
        });
        const userId = util.cookies.get('userId');
        getEventTypeTreeData({ userId: userId }).then(res => {
          this.mainTypeList = res;
          this.selectMainType = this.mainTypeList[0].id;
          this.changeMainTypeList();
        });
      });
    },
    changeMainTypeList() {
      this.mainTypeList.forEach(mainType => {
        if (mainType.id == this.selectMainType) {
          this.subTypeList = [];
          mainType.children.forEach(type => {
            const typeName = type.title.replace(/[\、|\ |\（|\）]/g, '');
            if (this.allLayerNames.indexOf(typeName) > -1) {
              this.subTypeList.push(type);
            }
          });
          this.selectSubType = this.subTypeList[0].id;
          this.changeSubTypeList();
        }
      });
    },
    changeSubTypeList() {
      this.drawSource.clear();
      this.clearResult();
      this.subTypeList.forEach(subType => {
        if (subType.id == this.selectSubType) {
          this.partLayerGroup.getLayers().clear();
          const layerName = subType.title.replace(/[\、|\ |\（|\）]/g, '');
          this.showLayer(layerName);
        }
      });
    },
    getPartDataList() {
      this.showLoading = true;
      this.clearResult();
      getPartQueryData(this.queryParam).then(res => {
        this.totalSize = res.totalFeatures;
        const features = this.geoJson.readFeatures(res);
        this.resultSource.addFeatures(features);
        features.forEach(feature => {
          const props = feature.getProperties();
          this.dataList.push({
            name: props.OBJNAME,
            code: props.OBJCODE,
            feature: feature
          })
        });
        this.showLoading = false;
      });
    },
    changePagination(pageNo, pageSize) {
      this.queryParam.startIndex = (pageNo - 1) * pageSize;
      this.queryParam.curPage = pageNo;
      this.getPartDataList();
    },
    mapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => {
        if (feature) {
          const coordinates = feature.getGeometry().getFirstCoordinate();
          this.partData = feature.getProperties();
          this.partOverlay.setPosition(coordinates);
        }
        return feature;
      }, {
        layerFilter: layer => {
          if (layer == this.resultLayer) {
            return true;
          } else {
            return false;
          }
        }
      });
      if (!feature) {
        this.partOverlay.setPosition(null);
      }
    },
    closePartTip() {
      this.partOverlay.setPosition(null);
    },
    clearResult() {
      this.closePartTip();
      this.dataList = [];
      this.resultSource.clear();
    },
    changeStatus(current) {
      if (current) {
        this.map.on('click', this.mapClickHandler);
        this.map.addOverlay(this.partOverlay);
        this.map.addLayer(this.partLayerGroup);
        this.map.addLayer(this.drawLayer);
        this.map.addLayer(this.resultLayer);
      } else {
        if (this.drawTool) {
          this.map.removeInteraction(this.drawTool);
        }
        this.map.un('click', this.mapClickHandler);
        this.partOverlay.setPosition(null);
        this.map.removeOverlay(this.partOverlay);
        this.map.removeLayer(this.drawLayer);
        this.map.removeLayer(this.resultLayer);
        this.map.removeLayer(this.partLayerGroup);
      }
    }
  },
  beforeDestroy() {
    this.changeStatus(false);
  }
}
</script>
<style lang="scss" scoped>
.part-manage {
  height: 100%;
  width: 100%;
  padding: 20px;

  .yuan_dialog_body {
    background-color: #f5f5f5;
    height: calc(100% - 170px);
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

    .item {
      padding: 10px 20px 10px 20px;

      &:hover,
      &.active {
        background-color: #e9f6ff;
      }

      .item-left {
        width: 25px;
        height: 25px;

        .icon_pin {
          display: inline-block;
          width: 25px;
          height: 25px;
          line-height: 20px;
          text-align: center;
          font-family: PingFang-SC-Heavy;
          font-size: 16px;
          color: #ffffff;
        }
      }

      .item-right {
        width: 100%;
        padding-left: 5px;

        .description-panel {
          flex: 1;
          padding-right: 10px;

          >div {
            font-family: PingFang-SC-Medium;
            font-size: 13px;
            line-height: 20px;
            color: #333333;
            overflow: hidden;

            &:first-child {
              font-family: PingFang-SC-Heavy;
              font-size: 14px;
              line-height: 24px;
              color: #333333;
              margin-bottom: 10px;
              font-weight: 600;
            }

            span:first-child {
              color: #999999;
            }

            span:last-child {
              flex: 1;
              width: 157px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }

            span.repeat {
              border-radius: 10px;
              background-color: rgba(240, 113, 113, 0.2);
              color: #f07171;
              padding: 2px 8px;
            }
          }
        }

        .photo {
          width: 100px;
          height: 70px;
          overflow: hidden;

          img {
            width: 100%;
          }
        }
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

  .pagination-panel {
    text-align: right;
    padding: 10px 10px 10px 0px;
  }
}
</style>