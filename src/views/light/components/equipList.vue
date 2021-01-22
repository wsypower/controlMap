<template>
  <div class="video-manage" flex="dir:top">
    <div class="yuan_dialog_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && treeData.length > 0">
        <a-tree class="tree-panel" v-model="checkedKeys" checkable show-icon :expanded-keys="expandedKeys" :auto-expand-parent="autoExpandParent" :selected-keys="selectedKeys" :tree-data="treeData" @expand="onExpand" @select="onSelect" @check="onCheck">
          <img slot="dept" src="~@img/avatar_dept.png" />
          <img slot="ludeng-online" src="@img/ludeng-online.png" />
          <img slot="ludeng-offline" src="@img/ludeng-offline.png" />
          <img slot="dengxiang-online" src="@img/dengxiang-online.png" />
          <img slot="dengxiang-offline" src="@img/dengxiang-offline.png" />
        </a-tree>
      </cg-container>
      <div v-if="!showLoading && treeData.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { lightLogin, lightParameters, lightNewParameters } from '@/api/light/manage'
import { lightStyle2 } from '@/utils/util.map.style'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import util from '@/utils/util';
import * as coordtransform from 'coordtransform'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      treeData: [],
      lightLayer: null,
      lightSelect: null,
      lightFeatures: [],
      timer: null,
      isInit: true,
      newLightDataList: [],
      lightDataList: [],
      deptNewDataList: [],
      showLoading: false,
      lightToken: null,
      clickFeature: null
    }
  },
  watch: {
    // checkedKeys(val) {
    //   console.log('onCheck', val)
    // }
  },
  computed: {
    ...mapState('map', ['mapManager'])
  },
  mounted() {
    this.map = this.mapManager.getMap();
    this.map.on('click', this.lightClickHandler);
    this.map.getView().on('change:resolution', this.zoomChangeHandler);
    this.setClickHandler(this.lightClickHandler);
    // const _this = this;
    // this.timer = setInterval(() => {
    //   _this.loadLightData();
    // }, 2 * 60 * 1000);
    this.loadLightData();
    // this.loadLightToken();
  },
  methods: {
    ...mapMutations('map', ['pushPageLayers', 'setClickHandler', 'setOverlay']),
    ...mapActions('car/manage', ['getAllCarTreeData']),
    zoomChangeHandler(evt) {
      if (this.lightLayer) {
        const source = this.lightLayer.getSource();
        if (evt.target.getZoom() == 20) {
          source.setDistance(0);
        } else {
          source.setDistance(40);
        }
      }
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onSelect(selectedKeys, e) {
      if (this.clickFeature) {
        this.clickFeature.get('props').scale = 1;
        this.clickFeature = null;
      }
      // console.log(selectedKeys, e);
      if (selectedKeys[0].indexOf('dept_') < 0) {
        let needData = e.selectedNodes[0].data.props;
        if (needData.kh && needData.kh.length > 0) {
          const feature = this.lightLayer.getSource().getSource().getFeatureById(needData.kh);
          feature.get('props').scale = 1.2;
          this.clickFeature = feature;
          this.mapManager.locateTo2(feature.getGeometry().getCoordinates());
          // this.map.getView().setZoom(18);
        } else {
          // this.carOverlay.setPosition(undefined);
          this.$message.warning('当前路灯无点位信息！！！');
        }
        this.selectedKeys = selectedKeys;
        this.$parent.$refs.itemDetail.showDetail(needData);
      }
    },
    onCheck(checkedKeys, evt) {
      this.checkedKeys = checkedKeys;
      const checkedNodes = evt.checkedNodes;
      this.lightFeatures = [];
      for (let i = checkedNodes.length - 1; i >= 0; i--) {
        const node = checkedNodes[i];
        const props = node.data.props;
        if (node.data.key.indexOf('dept') != -1) {
          continue;
        }
        if (props.x && props.x > 0 && props.y && props.y > 0) {
          const feature = this.mapManager.xyToFeature(props.x, props.y);
          // feature.set('icon', 'light-normal');
          this.changeLightIcon(props, feature);
          feature.set('props', props);
          feature.set('type', 'LightPosition');
          feature.setId(props.kh);
          this.lightFeatures.push(feature);
        }
      }
      this.lightLayer.getSource().getSource().clear();
      this.lightLayer.getSource().getSource().addFeatures(this.lightFeatures);
    },
    lightClickHandler({ pixel, coordinate }) {
      if (this.clickFeature) {
        this.clickFeature.get('props').scale = 1;
        this.clickFeature = null;
      }
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
      if (feature && feature.get('features')) {
        // if (feature) {
        this.clickFeature = feature.get('features')[0];
        this.clickFeature.get('props').scale = 1.2;
        // const clickFeature = feature.get('features')[0];
        // const coordinates = clickFeature.getGeometry().getCoordinates();
        if (this.clickFeature && this.clickFeature.get('type') == 'LightPosition') {
          // this.mapManager.locateTo(this.clickFeature.getGeometry().getCoordinates());
          this.$parent.$refs.itemDetail.showDetail(this.clickFeature.get('props'));
        }
      }
    },
    loadLightToken() {
      const userId = util.cookies.get('userId');
      lightLogin({
        userId: userId,
        username: 'lds-zspt-yh01',
        password: 'yhlds123'
      }).then(res => {
        // console.log(res);
        const date = new Date();
        // date.setHours(date.getHours() + 1);
        date.setMinutes(date.getMinutes() + 110);
        this.lightToken = res.token;
        Cookies.set('lightToken', this.lightToken, { expires: date });
        this.loadLightData();
      });
    },
    loadLightData() {
      this.lightToken = Cookies.get('lightToken');
      if (!this.lightToken || this.lightToken.length == 0) {
        this.loadLightToken();
        return;
      }
      this.showLoading = true;
      const userId = util.cookies.get('userId');
      let lightJson;
      if (this.isInit) {
        lightParameters({
          userId: userId,
          token: this.lightToken
        }).then(res => {
          lightJson = res;
          this.treeData = [{
            title: `全部 [${lightJson.node_counts}]`,
            key: 'dept_all',
            slots: { icon: 'dept' }
          }];
          this.lightFeatures = [];
          this.changeTreeData(lightJson);
          const lightRes = this.mapManager.addClusterLayerByFeatures3(this.lightFeatures);
          this.lightLayer = lightRes[0];
          this.lightSelect = lightRes[1];
          this.lightLayer.set('featureType', 'LightPosition');
          const extent = this.lightLayer.getSource().getSource().getExtent();
          this.mapManager.getMap().getView().fit(extent);
          this.isInit = false;
          this.showLoading = false;
        });
      } else {
        lightNewParameters({
          userId: userId,
          token: this.lightToken
        }).then(res => {
          lightJson = res;
          this.changeOldData(lightJson);
          let idArr = this.compareDataToIdArr();
          this.lightDataList = [];
          this.changeTreeDataMore(this.treeData, idArr);
          this.showLoading = false;
        });
      }
    },
    changeTreeData(lightJson) {
      const _this = this;
      const nodes = [];
      lightJson.road.forEach(item => {
        item.scopedSlots = { title: 'title' };
        item.slots = { icon: 'dept' };
        item.key = 'dept_' + item.id;
        _this.checkedKeys.push(item.key);
        const lightArray = [];
        lightJson.node.forEach(light => {
          // if (!light.rft) {
          //   return true;
          // }
          if (light.pid == item.id) {
            light.title = light.name;
            light.key = light.kh;
            light.dept = item.name;
            // light.slots = { icon: 'ludeng' };
            if (light.rft == 1) {
              light.online = true;
            } else {
              light.online = false;
            }
            this.changeTreeIcon(light);
            _this.lightDataList.push(light);
            if (light.jdu && light.jdu > 0 && light.wdu && light.wdu > 0) {
              const gcj02 = coordtransform.bd09togcj02(light.jdu, light.wdu);
              const wgs84 = coordtransform.gcj02towgs84(gcj02[0], gcj02[1]);
              light.x = wgs84[0];
              light.y = wgs84[1];
              const feature = _this.mapManager.xyToFeature(wgs84[0], wgs84[1]);
              this.changeLightIcon(light, feature);
              light.scale = 1;
              feature.set('props', light);
              feature.set('type', 'LightPosition');
              feature.setId(light.kh);
              _this.lightFeatures.push(feature);
            }
            lightArray.push(light);
          }
        });
        item.title = `${item.name} [${lightArray.length}]`;
        item.children = lightArray;
        nodes.push(item);
      });
      this.treeData[0].children = nodes;
    },
    changeLightIcon(light, feature) {
      if (light.tp == 'zd') {
        if (light.online) {
          feature.set('icon', 'control-online');
        } else {
          feature.set('icon', 'control-offline');
        }
      } else {
        if (light.online) {
          feature.set('icon', 'light-online');
        } else {
          feature.set('icon', 'light-offline');
        }
      }
    },
    changeTreeIcon(item) {
      if (item.tp == 'zd') {
        if (item.online) {
          item.slots = { icon: 'dengxiang-online' };
        } else {
          item.slots = { icon: 'dengxiang-offline' };
        }
      } else {
        if (item.online) {
          item.slots = { icon: 'ludeng-online' };
        } else {
          item.slots = { icon: 'ludeng-offline' };
        }
      }
    },
    changeOldData(lightJson) {
      const _this = this;
      this.newLightDataList = [];
      lightJson.node.forEach(light => {
        if (light.rft == 1) {
          light.online = true;
        } else {
          light.online = false;
        }
        _this.newLightDataList.push(light);
      });
    },
    compareDataToIdArr() {
      let idArr = [];
      this.lightDataList.forEach(item => {
        let oneItem = this.newLightDataList.find(it => it.kh === item.kh && it.online !== item.online);
        if (oneItem) {
          idArr.push(oneItem.kh);
          const feature = this.lightLayer.getSource().getSource().getFeatureById(oneItem.kh);
          if (feature) {
            this.changeLightIcon(oneItem, feature);
          }
        }
      });
      return idArr
    },
    changeTreeDataMore(arr, idArr) {
      const _this = this;
      arr.forEach(item => {
        if (!item.children) {
          if (idArr.indexOf(item.kh) >= 0) {
            item.online = !item.online;
            _this.changeTreeIcon(item);
          }
          _this.lightDataList.push(item);
        } else {
          // let pItem = _this.deptNewDataList.find(it => it.split('@')[0] === item.key);
          // if (pItem) {
          //   item.title = pItem.split('@')[1];
          // }
          _this.changeTreeDataMore(item.children, idArr);
        }
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
}
</script>
<style lang="scss" scoped>
.video-manage {
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