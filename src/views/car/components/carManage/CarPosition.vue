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
          <img slot="car" src="~@img/avatar-car.png" />
          <img slot="car-outline" src="~@img/avatar-car-outline.png" />
          <template slot="title" slot-scope="{ title }">
            <span v-if="title.indexOf(searchValue) > -1">
              {{ title.substr(0, title.indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>
              {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
            </span>
            <span v-else>{{ title }}</span>
          </template>
        </a-tree>
      </cg-container>
      <div v-if="(!showLoading && treeData.length == 0) || !showTree" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div hidden>
      <car-info ref="carInfo" :info="carInfoData" @closeTip="closeTip" @getCarId="getCarId"></car-info>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState, mapActions } from 'vuex'
import util from '@/utils/util';
import CarInfo from './CarInfo.vue';
import { carPointStyle } from '@/utils/util.map.style'
export default {
  name: '',
  components: {
    CarInfo
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
      isLoadData: false
    }
  },
  computed: {
    ...mapState('map', ['mapManager']),
    //获得展示的数据与属性
    treeData: function() {
      let data = JSON.parse(JSON.stringify(this.sourceData));
      this.carFeatures = [];
      this.allCarData = [];
      this.changeTreeData(data, '');
      this.isLoadData = !this.isLoadData;
      return data
    }
  },
  watch: {
    isLoadData: function() {
      if (this.carFeatures.length > 0) {
        // this.carLayer = this.mapManager.addVectorLayerByFeatures(this.carFeatures,carPointStyle(),3);
        //加载聚类车辆图层
        if (this.carLayer) {
          this.carLayer.getSource().getSource().clear();
          this.carLayer.getSource().getSource().addFeatures(this.carFeatures);
        } else {
          this.carLayer = this.mapManager.addClusterLayerByFeatures(this.carFeatures);
          this.carLayer.set('featureType', 'CarPosition');
        }
        const extent = this.carLayer.getSource().getSource().getExtent();
        this.mapManager.getMap().getView().fit(extent);
      }
    }
  },
  mounted() {
    const userId = util.cookies.get('userId');
    this.showLoading = true;
    this.getAllCarTreeData({ userId: userId }).then(res => {
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
      _this.getAllCarTreeData({ userId: userId }).then(res => {
        _this.sourceData = res;
      });
    }, 600000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    ...mapActions('car/manage', ['getAllCarTreeData']),
    //给后端的数据增加一些前端展示与判断需要的属性
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
            pointImg = 'car-online';
          } else {
            item.slots = { icon: 'car-outline' };
            pointImg = 'car-offline';
          }
          item.class = 'itemClass';

          let temp = {
            title: item.name,
            key: item.id
          }
          this.allCarData.push(temp);
          // 通过经纬度生成点位加到地图上
          if (item.x && item.x.length > 0 && item.y && item.y.length > 0) {
            if (parseFloat(item.x) == 0 || parseFloat(item.y) == 0) {
              return true;
            }
            const feature = _this.mapManager.xyToFeature(item.x, item.y);
            feature.set('icon', pointImg);
            feature.set('props', item);
            feature.set('type', 'CarPosition');
            _this.carFeatures.push(feature);
          }
        } else {
          item.key = 'dept_' + item.id;
          item.slots = { icon: 'dept' }
          this.changeTreeData(item.children, item.name)
        }
      })
    },
    //输入框中数据改变时触发
    onChange() {
      this.onSearch(this.searchValue);
    },
    //查询触发
    onSearch(val) {
      this.expandedKeys = [];
      this.searchValue = val;
      this.allCarData.forEach(item => {
        if (item.title.indexOf(val) >= 0) {
          this.expandedKeys.push(item.key);
        }
      });
      this.autoExpandParent = true;
      if (this.expandedKeys.length === 0) {
        this.showTree = false;
      } else {
        this.showTree = true;
      }
    },
    //展开触发
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    //点击树中某个节点（某个人员）时触发
    onSelect(selectedKeys, e) {
      console.log(selectedKeys, e);
      if (selectedKeys[0].indexOf('dept_') < 0) {
        let needData = e.selectedNodes[0].data.props;
        let temp = {};
        temp.id = needData.id;
        temp.name = needData.carNumber;
        temp.code = needData.carNumber;
        temp.flag = needData.carNumber;
        temp.phone = needData.phone;
        temp.dept = needData.dept;
        temp.gpsTime = needData.gpsTime;
        temp.x = needData.x;
        temp.y = needData.y;
        this.carInfoData = temp;
        if (this.carInfoData.x && this.carInfoData.y) {
          const coordinate = [parseFloat(this.carInfoData.x), parseFloat(this.carInfoData.y)];
          this.carOverlay.setPosition(coordinate);
          this.mapManager.locateTo(coordinate);
        } else {
          this.carOverlay.setPosition(undefined);
          this.$message.warning('当前车辆无点位信息！！！');
        }
      }
    },
    //地图上人员点击事件处理器
    carMapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
      if (feature && feature.get('features')) {
        const clickFeature = feature.get('features')[0];
        const coordinates = clickFeature.getGeometry().getCoordinates();
        if (clickFeature && clickFeature.get('type') == 'CarPosition') {
          this.carInfoData = clickFeature.get('props');
          this.carOverlay.setPosition(coordinates);
        }
      }
    },
    //人员轨迹触发
    getCarId(data) {
      this.$emit('getCarId', data);
    },
    closeTip() {
      this.carOverlay.setPosition(undefined);
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
        border-radius: 12px;
        margin-right: 8px;
        margin-bottom: 5px;
      }
    }

    .nodata-panel,
    .spin-panel {
      width: 100%;
      height: 100%;
    }

    ::v-deep.ant-tree.ant-tree-show-line li:not(:last-child):before {
      border-left: 1px dashed rgba(0, 164, 254, 0.8);
    }

    ::v-deep.ant-tree.ant-tree-show-line li span.ant-tree-switcher {
      background-color: #f5f5f5;
      color: rgba(43, 144, 243, 0.8);
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