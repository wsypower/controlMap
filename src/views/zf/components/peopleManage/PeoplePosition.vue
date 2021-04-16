<template>
  <div class="people-manage" flex="dir:top">
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
          <img slot="male" src="~@img/avatar-male.png" />
          <img slot="male-outline" src="~@img/avatar-male-outline.png" />
          <img slot="female" src="~@img/avatar-female.png" />
          <img slot="female-outline" src="~@img/avatar-female-outline.png" />
          <template slot="title" slot-scope="{ title }">
            <span v-if="title&&title.indexOf(searchValue) > -1">
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
      <people-info ref="peopleInfo" :info="peopleInfoData" @closeTip="closeTip" @getUserId="getUserId"></people-info>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions, mapState } from 'vuex'
import PeopleInfo from './PeopleInfo.vue';
import { PeoplePointStyle } from '@/utils/util.map.style'
import util from '@/utils/util'
import { getAllPeopleTreeData } from '@/api/zf/common'
export default {
  name: '',
  components: {
    PeopleInfo
  },
  data() {
    return {
      //展开的节点key
      expandedKeys: [],
      //是否自动展开父节点
      autoExpandParent: true,
      //查询输入
      searchValue: '',
      //获取数据时的动效
      showLoading: false,
      //获取人员的原始数据
      sourceData: [],
      //收入所有人员的名称与ID，给查询使用
      allPeopleData: [],
      //获取某个人员的详细数据，用于弹窗显示
      peopleInfoData: {},
      //当查询时没哟数据时，需要展示无数据图片
      showTree: true,
      //人员数据需要定时刷新
      timer: null,
      //地图相关
      peopleFeatures: [],
      //地图相关
      peopleLayer: null,
      //触发地图刷新
      isLoadData: false
      // checkedKeys: [],
      // isInit: true
    }
  },
  computed: {
    ...mapState('map', ['mapManager', 'querySelectData']),
    //获得展示的数据与属性
    treeData: function() {
      let data = JSON.parse(JSON.stringify(this.sourceData));
      this.peopleFeatures = [];
      this.allPeopleData = [];
      //添加展示属性
      this.changeTreeData(data);
      this.isLoadData = !this.isLoadData;
      return data;
    }
  },
  watch: {
    //加载完数据后渲染地图
    isLoadData: function() {
      if (this.peopleFeatures.length > 0) {
        if (this.peopleLayer) {
          this.peopleLayer.getSource().getSource().clear();
          this.peopleLayer.getSource().getSource().addFeatures(this.peopleFeatures);
        } else {
          this.peopleLayer = this.mapManager.addClusterLayerByFeatures(this.peopleFeatures);
          this.peopleLayer.set('featureType', 'ZfPosition');
          const view = this.mapManager.getMap().getView();
          view.setCenter([120.30322, 32.860927]);
          view.setZoom(13);
          // const extent = this.peopleLayer.getSource().getSource().getExtent();
          // this.mapManager.getMap().getView().fit(extent);
        }
      }
    },
    querySelectData(feature) {
      if (feature) {
        this.popupDetail(feature);
      }
    }
  },
  mounted() {
    // const userId = util.cookies.get('userId');
    const userId = '144ee790f77111e76a80d6a84ab7b640';
    this.showLoading = true;
    // getAllPeopleTreeData({ userId: userId }).then(res => {
    getAllPeopleTreeData().then(res => {
      this.filterDept(res);
      this.sourceData = res;
      this.showLoading = false;
    });
    this.map = this.mapManager.getMap();
    this.map.on('click', this.peopleMapClickHandler);
    this.peopleOverlay = this.mapManager.addOverlay({
      id: 'zfPositionOverlay',
      offset: [0, -35],
      positioning: 'bottom-center',
      element: this.$refs.peopleInfo.$el
    });
    let _this = this;
    _this.timer = setInterval(function() {
      // if (_this.isInit) {
      //   _this.isInit = false;
      // }
      // getAllPeopleTreeData({ userId: userId }).then(res => {
      getAllPeopleTreeData().then(res => {
        _this.filterDept(res);
        _this.sourceData = res;
      }); //600000
    }, 600000);
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    // ...mapActions('section/common', ['getAllPeopleTreeData']),
    //给后端的数据增加一些前端展示与判断需要的属性
    changeTreeData(arr, deptName) {
      const _this = this;
      arr.forEach(item => {
        item.title = item.name;
        item.scopedSlots = { title: 'title' };
        let pointImg;
        if (item.isLeaf) {
          // if (item.id == '1aa534401d6c11ebf36073a324212540') {
          //   return true;
          // }
          item.key = item.id;
          item.dept = deptName;
          if (item.sex === '1') {
            if (item.online) {
              item.slots = { icon: 'female' };
              pointImg = 'female_online';
            } else {
              item.slots = { icon: 'female-outline' }
              pointImg = 'female_offline';
            }
          } else {
            if (item.online) {
              item.slots = { icon: 'male' }
              pointImg = 'male_online';
            } else {
              item.slots = { icon: 'male-outline' }
              pointImg = 'male_offline';
            }
          }
          item.class = 'itemClass';
          let temp = {
            title: item.name,
            key: item.id
          }
          this.allPeopleData.push(temp);
          // 通过经纬度生成点位加到地图上
          // if (!_this.isInit) {
          //   if (!_this.checkedKeys.includes(item.key)) {
          //     return true;
          //   }
          // }
          if (item.x && item.x.length > 0 && item.y && item.y.length > 0) {
            const feature = _this.mapManager.xyToFeature(item.x, item.y);
            feature.set('icon', pointImg);
            feature.set('props', item);
            feature.set('type', 'zfPosition');
            _this.peopleFeatures.push(feature);
          }
        } else {
          item.key = 'dept_' + item.id;
          item.slots = { icon: 'dept' };
          // if (_this.isInit) {
          //   _this.checkedKeys.push(item.key);
          // }
          this.changeTreeData(item.children, item.name);
        }
      })
    },
    filterDept(res) {
      if (res && res.length > 0) {
        const depts = res[0].children;
        for (let i = depts.length - 1; i >= 0; i--) {
          let dept = depts[i];
          if (dept.name.indexOf('中队') == -1) {
            const deptIndex = depts.indexOf(dept);
            if (deptIndex != -1) {
              depts.splice(deptIndex, 1);
            }
          }
        }
      }
    },
    onChange() {
      this.onSearch(this.searchValue);
      //this.searchValue
    },
    //查询后直接筛选数据，不走后端接口调用
    onSearch(val) {
      // this.showLoading = true;
      // this.getAllPeopleTreeData({searchContent: val}).then(res=>{
      //   this.sourceData = res.data;
      //   this.showLoading = false;
      // });
      this.expandedKeys = [];
      this.searchValue = val;
      this.allPeopleData.forEach(item => {
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
    //展开时触发
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
        temp.name = needData.name;
        temp.sex = needData.sex;
        temp.online = needData.online;
        temp.phone = needData.phone;
        temp.dept = needData.dept;
        temp.x = needData.x;
        temp.y = needData.y;
        this.peopleInfoData = temp;
        if (this.peopleInfoData.x && this.peopleInfoData.y) {
          const coordinate = [parseFloat(this.peopleInfoData.x), parseFloat(this.peopleInfoData.y)];
          this.peopleOverlay.setPosition(coordinate);
          this.mapManager.locateTo(coordinate);
        } else {
          this.peopleOverlay.setPosition(undefined);
          this.$message.warning('当前人员无点位信息！！！');
        }
      }
    },
    onCheck(checkedKeys, evt) {
      this.checkedKeys = checkedKeys;
      const checkedNodes = evt.checkedNodes;
      this.peopleFeatures = [];
      for (let i = checkedNodes.length - 1; i >= 0; i--) {
        const node = checkedNodes[i];
        const props = node.data.props;
        if (node.data.key.indexOf('dept') != -1) {
          continue;
        }
        if (props.x && props.x > 0 && props.y && props.y > 0) {
          const feature = this.mapManager.xyToFeature(props.x, props.y);
          let pointImg;
          if (props.sex === '1') {
            if (props.online) {
              pointImg = 'female_online';
            } else {
              pointImg = 'female_offline';
            }
          } else {
            if (props.online) {
              pointImg = 'male_online';
            } else {
              pointImg = 'male_offline';
            }
          }
          feature.set('icon', pointImg);
          feature.set('props', props);
          feature.set('type', 'zfPosition');
          this.peopleFeatures.push(feature);
        }
      }
      this.peopleLayer.getSource().getSource().clear();
      this.peopleLayer.getSource().getSource().addFeatures(this.peopleFeatures);
    },
    peopleMapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
      if (feature && feature.get('features')) {
        const clickFeature = feature.get('features')[0];
        this.popupDetail(clickFeature);
        // const coordinates = clickFeature.getGeometry().getCoordinates();
        // if (clickFeature && clickFeature.get('type') == 'zfPosition') {
        //   this.peopleInfoData = clickFeature.get('props');
        //   this.peopleOverlay.setPosition(coordinates);
        // }
      }
    },
    popupDetail(feature) {
      const coordinates = feature.getGeometry().getCoordinates();
      if (feature && feature.get('type') == 'zfPosition') {
        this.peopleInfoData = feature.get('props');
        this.peopleOverlay.setPosition(coordinates);
      }
    },
    getUserId(data) {
      this.$emit('getUserId', data);
    },
    closeTip() {
      this.peopleOverlay.setPosition(undefined);
    }
  }
}
</script>
<style lang="scss" scoped>
.people-manage {
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
        height: 20px;
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