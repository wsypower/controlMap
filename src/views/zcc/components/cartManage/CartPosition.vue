<template>
  <div class="car-manage" flex="dir:top">
    <div class="search-panel">
      <a-input-search placeholder="输入关键词搜索" v-model="searchValue" @search="onSearch" @change="onChange" enterButton="搜 索"></a-input-search>
    </div>
    <div class="yuan_dialog_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && treeData.length > 0 && showTree">
        <a-tree class="tree-panel" showIcon showLine :treeData="treeData" :expandedKeys="expandedKeys" :autoExpandParent="autoExpandParent" @select="onSelect" @expand="onExpand">
          <img slot="dept" src="~@img/avatar_dept.png" />
          <img slot="car" src="~@img/zcc.png" />
          <img slot="car-outline" src="~@img/zcc-outline.png" />
          <template slot="title" slot-scope="{ title }">
            <!-- <span v-if="title.indexOf(searchValue) > -1">{{ title.substr(0, title.indexOf(searchValue)) }}<span style="color: #f50">{{ searchValue }}</span>{{ title.substr(title.indexOf(searchValue) + searchValue.length) }}</span>
            <span v-else>{{ title }}</span> -->
            <span>{{ title }}</span>
          </template>
        </a-tree>
      </cg-container>
      <div v-if="(!showLoading && treeData.length == 0) || !showTree" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div hidden>
      <cart-info ref="carInfo" :info="carInfoData" @closeTip="closeTip" @getCarId="getCarId"></cart-info>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import * as turf from '@turf/turf'
import GeoJSON from 'ol/format/GeoJSON'
import { mapState, mapActions } from 'vuex'
import util from '@/utils/util'
import CartInfo from './CartInfo.vue'
import { carPointStyle, gridStyle } from '@/utils/util.map.style'
import { getAllCarTreeData, getAllCarDataList } from '@/api/cart/manage'
export default {
  name: '',
  components: {
    CartInfo
  },
  data() {
    return {
      //展开的节点keys
      expandedKeys: [],
      //是否自动展开父节点
      autoExpandParent: true,
      //查询内容
      searchValue: '',
      //查询数据的果冻效果
      showLoading: false,
      //后端返回数据
      sourceData: [],
      //收入所有车辆name与id，给自动查询使用
      allCarData: [],
      //车辆数据的展示
      carInfoData: {},
      //自动查询是否没有数据，没有数据则显示没有数据的结果
      showTree: true,
      //车辆数据需要定时处理，目前定位10min一次
      timer: null,
      //地图相关
      carFeatures: [],
      //地图相关
      carLayer: null,
      //地图更新需要
      isLoadData: false,
      regionLayer: null,
      treeData: []
    }
  },
  computed: {
    ...mapState('map', ['mapManager']),
    // treeData: function() {
    //   let data = JSON.parse(JSON.stringify(this.sourceData));
    //   this.carFeatures = [];
    //   this.allCarData = [];
    //   this.changeTreeData(data, '');
    //   this.isLoadData = !this.isLoadData;
    //   return data
    // }
  },
  watch: {
    isLoadData: function() {
      if (this.carFeatures.length > 0) {
        if (this.carLayer) {
          this.carLayer.getSource().getSource().clear();
          this.carLayer.getSource().getSource().addFeatures(this.carFeatures);
        } else {
          this.carLayer = this.mapManager.addClusterLayerByFeatures(this.carFeatures);
          this.carLayer.set('featureType', 'CarPosition');
          const extent = this.carLayer.getSource().getSource().getExtent();
          this.mapManager.getMap().getView().fit(extent);
        }
      }
    },
    sourceData: function() {
      let data = JSON.parse(JSON.stringify(this.sourceData));
      if (this.searchValue.length > 0) {
        this.expandedKeys = [];
      }
      this.carFeatures = [];
      this.allCarData = [];
      this.changeTreeData(data);
      this.getCartPosition();
      this.treeData = data;
    }
  },
  mounted() {
    const userId = util.cookies.get('userId');
    this.showLoading = true;
    getAllCarTreeData({ userId: userId, searchParam: this.searchValue }).then(res => {
      this.sourceData = res;
      this.showLoading = false;
    });
    this.map = this.mapManager.getMap();
    this.map.on('click', this.carMapClickHandler);
    this.carOverlay = this.mapManager.addOverlay({
      id: 'carPositionOverlay',
      offset: [0, -20],
      positioning: 'bottom-center',
      element: this.$refs.carInfo.$el
    });
    let _this = this;
    this.timer = setInterval(function() {
      getAllCarTreeData({ userId: userId, searchParam: _this.searchValue }).then(res => {
        _this.sourceData = res;
      });
    }, 10 * 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    changeTreeData(arr, deptName) {
      const _this = this;
      arr.forEach(item => {
        item.title = item.name;
        item.scopedSlots = { title: 'title' };
        let pointImg;
        if (item.isLeaf) {
          item.key = item.id;
          item.dept = deptName;
          if (item.online) {
            item.slots = { icon: 'car' };
            pointImg = 'zcc-online';
          } else {
            item.slots = { icon: 'car-outline' };
            pointImg = 'zcc-offline';
          }
          item.class = 'itemClass';

          let temp = {
            title: item.name,
            key: item.id
          }
          if (this.searchValue.length > 0) {
            this.expandedKeys.push(item.id);
          }
          this.allCarData.push(temp);
          if (item.x && item.x.length > 0 && item.y && item.y.length > 0) {
            const x = parseFloat(item.x);
            const y = parseFloat(item.y);
            if (!isNaN(x) && x > 0) {
              item.x = x;
            } else {
              item.x = null;
            }
            if (!isNaN(y) && y > 0) {
              item.y = y;
            } else {
              item.y = null;
            }
            //   if (item.x && item.y) {
            //     const feature = _this.mapManager.xyToFeature(item.x, item.y);
            //     feature.set('icon', pointImg);
            //     feature.set('props', item);
            //     feature.set('type', 'CarPosition');
            //     _this.carFeatures.push(feature);
            //   }
          }
        } else {
          item.key = 'dept_' + item.id;
          item.slots = { icon: 'dept' }
          this.changeTreeData(item.children, item.name)
        }
      })
    },
    getCartPosition() {
      const userId = util.cookies.get('userId');
      getAllCarDataList({ userId: userId }).then(res => {
        let pointImg = null;
        res.forEach(item => {
          if (item.online) {
            pointImg = 'zcc-online';
          } else {
            pointImg = 'zcc-offline';
          }
          if (item.x && item.x.length > 0 && item.y && item.y.length > 0) {
            const x = parseFloat(item.x);
            const y = parseFloat(item.y);
            if (!isNaN(x) && x > 0) {
              item.x = x;
            } else {
              item.x = null;
            }
            if (!isNaN(y) && y > 0) {
              item.y = y;
            } else {
              item.y = null;
            }
            if (item.x && item.y) {
              const feature = this.mapManager.xyToFeature(item.x, item.y);
              feature.set('icon', pointImg);
              feature.set('props', item);
              feature.set('type', 'CarPosition');
              this.carFeatures.push(feature);
            }
          }
        });
        this.isLoadData = !this.isLoadData;
      });
    },
    onChange() {
      // this.onSearch(this.searchValue);
    },
    //查询触发
    onSearch(val) {
      this.expandedKeys = [];
      this.searchValue = val;
      // this.allCarData.forEach(item => {
      //   if (item.title.indexOf(val) >= 0) {
      //     this.expandedKeys.push(item.key);
      //   }
      // });
      this.autoExpandParent = true;
      // if (this.expandedKeys.length === 0) {
      //   this.showTree = false;
      // } else {
      //   this.showTree = true;
      // }
      const userId = util.cookies.get('userId');
      this.showLoading = true;
      getAllCarTreeData({ userId: userId, searchParam: this.searchValue }).then(res => {
        this.sourceData = res;
        this.showLoading = false;
      });
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onSelect(selectedKeys, e) {
      // console.log(selectedKeys, e);
      if (selectedKeys.length > 0 && selectedKeys[0].indexOf('dept_') < 0) {
        if (this.regionLayer) {
          this.regionLayer.getSource().clear();
        }
        let needData = e.selectedNodes[0].data.props;
        // let temp = {};
        // temp.id = needData.id;
        // temp.name = needData.carNumber;
        // temp.code = needData.carNumber;
        // temp.flag = needData.carNumber;
        // temp.phone = needData.phone;
        // temp.dept = needData.dept;
        // temp.gpsTime = needData.gpsTime;
        // temp.x = needData.x;
        // temp.y = needData.y;
        this.carInfoData = needData;
        if (this.carInfoData.x && this.carInfoData.y) {
          const coordinate = [parseFloat(this.carInfoData.x), parseFloat(this.carInfoData.y)];
          this.carOverlay.setPosition(coordinate);
          this.mapManager.locateTo(coordinate);
          this.getCarRegion(this.carInfoData);
        } else {
          this.carOverlay.setPosition(undefined);
          this.$message.warning('当前摊点无点位信息！！！');
        }
      }
    },
    carMapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
      if (feature && feature.get('features')) {
        const clickFeature = feature.get('features')[0];
        const coordinates = clickFeature.getGeometry().getCoordinates();
        if (clickFeature && clickFeature.get('type') == 'CarPosition') {
          this.carInfoData = clickFeature.get('props');
          this.carOverlay.setPosition(coordinates);
          this.getCarRegion(this.carInfoData);
        }
      }
    },
    getCarId(data) {
      this.$emit('getCarId', data);
    },
    closeTip() {
      this.carOverlay.setPosition(undefined);
      if (this.regionLayer) {
        this.regionLayer.getSource().clear();
      }
    },
    getCarRegion(data) {
      if (data.localx && data.localx.length > 0 && data.localy && data.localy.length > 0) {
        const coordinates = [parseFloat(data.localx), parseFloat(data.localy)];
        const point = turf.point(coordinates);
        const buffered = turf.buffer(point, 0.5, { units: 'kilometers' });
        const geoJson = new GeoJSON();
        const feature = geoJson.readFeature(buffered);
        if (this.regionLayer) {
          this.regionLayer.getSource().clear();
          this.regionLayer.getSource().addFeature(feature);
        } else {
          this.regionLayer = this.mapManager.addVectorLayerByFeatures([feature], gridStyle('red'), 2);
          this.regionLayer.set('featureType', 'CarRegion');
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.car-manage {
  height: 100%;
  width: 100%;

  .search-panel {
    padding: 20px 0px;
  }

  .yuan_dialog_body {
    background-color: #f5f5f5;
    height: calc(100% - 70px);
    position: relative;

    .tree-panel {
      width: 100%;
      height: 100%;
      padding: 10px;

      img {
        width: 20px;
        /*height: 14px;*/
        display: inline-block;
        border-radius: 2px;
        margin-right: 8px;
        margin-bottom: 5px;
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
      }
    }
  }
}
</style>