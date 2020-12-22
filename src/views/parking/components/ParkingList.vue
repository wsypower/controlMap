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
        <a-tree ref="parkingTree" class="tree-panel" :expanded-keys="expandedKeys" :auto-expand-parent="autoExpandParent" :tree-data="treeData" @select="onSelect" @expand="onExpand">
          <template slot="title" slot-scope="{ title }">
            <span v-if="title.indexOf(searchValue) > -1">
              {{ title.substr(0, title.indexOf(searchValue)) }}<span style="color: #f50">{{ searchValue }}</span>{{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
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
      <parking-info ref="parkingInfo" :parkingData="parkingData" @closeTip="closeParkingTip"></parking-info>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import GeoJSON from 'ol/format/GeoJSON'
import util from '@/utils/util'
import { queryParklot, queryCurrentBerthCount } from '@/api/parking/manage'
import ParkingInfo from '@/views/parking/components/ParkingInfo'
import { parkingStyle } from '@/utils/util.map.style'
import * as coordtransform from 'coordtransform'
export default {
  components: {
    ParkingInfo
  },
  data() {
    return {
      expandedKeys: [],
      autoExpandParent: true,
      allLayerNodes: [],
      treeData: [],
      showLoading: false,
      parkingData: {},
      parkingOverlay: null,
      searchValue: '',
      showTree: true,
      parkingFeatures: [],
      parkingLayer: null
    }
  },
  watch: {},
  computed: {
    ...mapState('map', ['mapManager'])
  },
  mounted() {
    this.map = this.mapManager.getMap();
    this.map.on('click', this.mapClickHandler);
    this.parkingOverlay = this.mapManager.addOverlay({
      id: 'parkingOverlay',
      offset: [0, -20],
      positioning: 'bottom-center',
      element: this.$refs.parkingInfo.$el
    });
    this.loadParkingData();
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
    onSelect(selectedKeys, e) {
      // if (this.clickFeature) {
      //   this.clickFeature.get('props').scale = 1;
      //   this.clickFeature = null;
      // }
      // console.log(selectedKeys, e);
      if (selectedKeys[0].indexOf('dept') < 0) {
        let props = e.selectedNodes[0].data.props;
        if (props.id && props.id.length > 0) {
          const feature = this.parkingLayer.getSource().getFeatureById(props.id);
          // feature.get('props').scale = 1.2;
          // this.clickFeature = feature;
          const coordinates = feature.getGeometry().getCoordinates();
          this.mapManager.locateTo(coordinates);
          this.parkingData = feature.getProperties();
          this.parkingOverlay.setPosition(coordinates);
          // this.map.getView().setZoom(18);
        } else {
          // this.carOverlay.setPosition(undefined);
          this.$message.warning('当前停车场无点位信息！！！');
        }
        this.selectedKeys = selectedKeys;
        // this.$parent.$refs.itemDetail.showDetail(needData);
      }
    },
    loadParkingData() {
      this.showLoading = true;
      this.parkingFeatures = [];
      queryParklot().then(res => {
        // res = res.replace(/;/g, ',');
        // console.log(res)
        this.treeData = [{
          title: '东台市停车中心',
          key: 'dept',
          children: res
        }];
        this.changeTreeData(this.treeData);
        this.expandedKeys.push('dept');
        this.parkingLayer = this.mapManager.addVectorLayerByFeatures(this.parkingFeatures, parkingStyle(), 3);
        this.map.getView().fit(this.parkingLayer.getSource().getExtent());
        this.showLoading = false;
      });
    },
    changeTreeData(arr, item) {
      arr.forEach(item => {
        if (!item.children || item.children.length == 0) {
          item.key = item.id;
          item.title = item.name;
          item.scopedSlots = { title: 'title' };
          item.longitude = parseFloat(item.longitude);
          item.latitude = parseFloat(item.latitude);
          this.allLayerNodes.push(item);
          if (item.longitude > 0 && item.latitude > 0) {
            const gcj02 = coordtransform.bd09togcj02(item.longitude, item.latitude);
            const wgs84 = coordtransform.gcj02towgs84(gcj02[0], gcj02[1]);
            item.longitude = wgs84[0];
            item.latitude = wgs84[1];
            const feature = new Feature({
              geometry: new Point([item.longitude, item.latitude])
            });
            feature.setId(item.id);
            feature.setProperties(item);
            feature.set('type', 'parkingPosition');
            this.parkingFeatures.push(feature);
          }
        } else {
          this.changeTreeData(item.children, item);
        }
      });
    },
    mapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature)
      if (feature && feature.get('type') == 'parkingPosition') {
        this.parkingData = feature.getProperties();
        const coordinates = feature.getGeometry().getFirstCoordinate();
        this.parkingOverlay.setPosition(coordinates);
      }
    },
    closeParkingTip() {
      this.parkingOverlay.setPosition(null);
    }
  },
  beforeDestroy() {
    this.map.un('click', this.mapClickHandler);
    this.map.removeOverlay(this.parkingOverlay);
    this.map.removeLayer(this.parkingLayer);
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