<template>
  <div class="video-manage" flex="dir:top">
    <div class="search-panel">
      <!--<my-address @getAddressData="getAddressData"></my-address>-->
      <div flex="fir:left cross:center" style="margin-top:10px">
        <label>监测场景：</label>
        <a-select v-model="watchPlaceId" style="flex:1">
          <a-select-option value="">全部</a-select-option>
          <a-select-option v-for="(item, index) in watchPlaceList" :value="item.id" :key="index">{{
            item.name
          }}</a-select-option>
        </a-select>
      </div>
      <div flex="fir:left cross:center" style="margin:10px 0px;">
        <label>监测点名称：</label>
        <a-input placeholder="输入监测点名称" v-model="watchPointName" style="flex:1" />
      </div>
      <a-button type="primary" style="width: 100%;margin-bottom:5px;" @click="onSearch">查询</a-button>
      <div>共计{{ totalSize }}个查询结果</div>
    </div>
    <div class="yuan_dialog_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && treeData.length > 0">
        <a-tree class="tree-panel" showIcon showLine :treeData="treeData" @select="onSelect">
          <img slot="dept" src="~@img/avatar-jiance.png" />
          <img slot="equipment" src="~@img/avatar-equipment.png" />
          <img slot="equipment-outline" src="~@img/avatar-equipment-outline.png" />
          <img slot="equipment-warn" src="~@img/avatar-equipment-warn.png" />
        </a-tree>
      </cg-container>
      <div v-if="!showLoading && treeData.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div hidden>
      <detail-info ref="detailInfo" :info="detailInfoData" @closeTip="closeTip"></detail-info>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState,mapActions } from 'vuex'
import util from '@/utils/util';
import {mixins} from '@/mixins/index'
import {videoPointStyle} from '@/utils/util.map.style'
import DetailInfo from './components/DetailInfo.vue'
const userId = util.cookies.get('userId');
export default {
  name: 'manage',
  mixins: [mixins],
  components:{
    DetailInfo
  },
  data(){
    return {
      //监测场景list
      watchPlaceList: [],
      //监测场景key
      watchPlaceId: '',
      //地图相关
      levelFeatures: [],
      levelLayer: null,
      isLoadData: false,
      clusterLayer:null,
      levelOverlay: null
    }
  },
  computed:{
    ...mapState('map', ['mapManager']),
    //获得展示的数据与属性
    treeData:function(){
      let data = JSON.parse(JSON.stringify(this.sourceData));
      this.levelFeatures=[];
      this.changeTreeData(data,'');
      this.isLoadData=!this.isLoadData;
      return data;
    }
  },
  watch:{
    isLoadData:function() {
      if(this.levelFeatures.length>0){
        if(this.levelLayer){
            this.levelLayer.getSource().getSource().clear();
            this.levelLayer.getSource().getSource().addFeatures(this.levelFeatures);
        }else{
            this.levelLayer = this.mapManager.addClusterLayerByFeatures(this.levelFeatures);
            this.levelLayer.set('featureType','waterLevel');
        }
        const extent=this.levelLayer.getSource().getSource().getExtent();
        this.mapManager.getMap().getView().fit(extent);
      }
    }
  },
  mounted(){
    this.getAllWatchPlaceData({userId: userId}).then(res => {
      this.watchPlaceList = res;
    });
    this.map = this.mapManager.getMap();
    this.map.on('click', this.videoMapClickHandler);
    // 地图弹框初始化
    this.levelOverlay = this.mapManager.addOverlay({
        id:'waterLevelOverlay',
        offset:[0,-20],
        positioning: 'bottom-center',
        element: this.$refs.detailInfo.$el
    });
    this.getAllWaterLevelMac();
  },
  methods:{
    ...mapActions('drainoffwater/manage', ['getAllWatchPlaceData', 'getAllWaterLevelMacTreeData','getOneWaterLevelMacData','getWaterLevelTrendDataForOneMac']),
    // getAddressData(val){
    //   console.log('selected city data',val);
    //   this.selectedCity = val;
    // },
    // 获取水位监测设备
    getAllWaterLevelMac(){
      this.showLoading = true;
      //入参：城市范围(area)、监测场景(watchPlaceId)、监测点名称(watchPointName)，用户ID(userId)
      console.log('area: ',this.selectedCity,'watchPlaceId:' + this.watchPlaceId,'watchPointName: ' + this.watchPointName, 'userId: ' + userId);
      let params = {
        userId: userId,
        // area: this.selectedCity,
        watchPlaceId: this.watchPlaceId,
        watchPointName: this.watchPointName
      }
      this.getAllWaterLevelMacTreeData(params).then(res=>{
        console.log('getAllWaterLevelMacTreeData',res);
        this.sourceData = res.treeData;
        this.totalSize = res.total;
        this.showLoading = false;
      });
    },
    //给后端的数据增加一些前端展示与判断需要的属性
    changeTreeData(arr,deptName){
      const _this = this;
      arr.forEach(item=>{
        item.scopedSlots = { title: 'title' };
        if(item.isLeaf){
          item.title = item.name;
          item.key = item.id;
          item.dept = deptName;
          if(item.online==='1'){
            item.slots = {icon: 'equipment'};
          }
          else if(item.online==='2'){
            item.slots = {icon: 'equipment-outline'};
          }
          else{
            item.slots = {icon: 'equipment-warn'};
          }
          item.class = 'itemClass';
          let img;
          switch (item.online) {
            case '1':
              img = 'waterlevel-online';
              break;
            case '2':
              img = 'waterlevel-offline';
              break;
            case '3':
              img = 'waterlevel-lost';
              break;
            default:
              img = 'waterlevel-online';
              break;
          }
          // 通过经纬度生成点位加到地图上
          if(item.x && item.x.length>0 && item.y && item.y.length>0){
            const feature=_this.mapManager.xyToFeature(item.x,item.y);
            feature.set('icon',img);
            feature.set('props',item);
            feature.set('type','waterLevel');
            _this.levelFeatures.push(feature);
          }
        }
        else{
          item.title = item.name;
          item.key = 'dept_' + item.id;
          item.slots = {icon: 'dept'};
          this.changeTreeData(item.children, item.name);
        }
      })
    },
    onSearch(){
      this.getAllWaterLevelMac();
    },

    //点击树中某个节点（某个人员）时触发
    onSelect(selectedKeys, e){
      console.log(selectedKeys, e);
      if(selectedKeys.length>0){
        if(selectedKeys[0].indexOf('dept_')<0){
          let needData = e.selectedNodes[0].data.props;
          this.showInfo(needData);
          this.mapManager.locateTo([parseFloat(needData.x),parseFloat(needData.y)]);
        }
      }
    },
    // 地图上弹框显示事件
    showInfo(info){
      //地图上的点位放大居中显示
      // 获取详情数据
      this.detailInfoData.detailMessage.name = info.dept + '-' +info.name;
      this.detailInfoData.detailMessage.unit = info.unit;
      this.detailInfoData.detailMessage.flagName = '水位';
      this.detailInfoData.type = 'water';
      console.log('macId: ' + info.id, 'userId: ' + userId);
      this.getOneWaterLevelMacData({userId: userId,macId: info.id}).then(res=>{
        this.detailInfoData.detailMessage.value = res.waterLevel;
      });
      this.getWaterLevelTrendDataForOneMac({userId: userId,macId: info.id}).then(res=>{
          let needData = res.reduce((acc,item) => {
              acc[0].push(item.dayTime);
              acc[1].push(item.value);
              return acc
          },[[],[]]);
          this.detailInfoData.chartData = needData;
      });
      if(!info.x||!info.y){
          this.$message.warning('当前视频无点位信息！！！');
      }else{
          this.levelOverlay.setPosition([parseFloat(info.x),parseFloat(info.y)]);
      }
    },
    videoMapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
      if(feature.get('features')) {
          const clickFeature = feature.get('features')[0];
          // const coordinates=clickFeature.getGeometry().getCoordinates();
          if (clickFeature && clickFeature.get('type') == 'waterLevel') {
              this.showInfo(clickFeature.get('props'));
              this.levelOverlay.setPosition(coordinate);
          }
      }
    },
    closeTip(){
        this.levelOverlay.setPosition( undefined );
    }
  }
}
</script>
<style lang="scss" scoped>
.video-manage {
  height: 100%;
  width: 100%;
  padding-top: 20px;
  .search-panel {
    padding-bottom: 0px;
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
        display: none;
      }
    }
  }
  .player-panel {
    display: none;
    &.active {
      display: block;
    }
  }
}
</style>
