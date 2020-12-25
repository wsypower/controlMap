<template>
  <div class="video-manage" flex="dir:top">
    <div class="search-panel">
      <div flex="fir:left cross:center" style="margin-bottom: 10px">
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
        <div class="result_item"
             :class="{active: activeIndex===index}"
             flex="cross:center"
             v-for="(item, index) in treeData"
             :key="index"
             @click="onSelect(item,index)">
          <img v-if="item.online==='1'" src="~@img/avatar-equipment.png"/>
          <img v-else-if="item.online==='2'" src="~@img/avatar-equipment-outline.png"/>
          <img v-else src="~@img/avatar-equipment-warn.png"/>
          <span class="title">{{item.name}}</span>
        </div>
        <!--<a-tree class="tree-panel" showIcon showLine :treeData="treeData" @select="onSelect">-->
          <!--<img slot="dept" src="~@img/avatar-jiance.png" />-->
          <!--<img slot="equipment" src="~@img/avatar-equipment.png" />-->
          <!--<img slot="equipment-outline" src="~@img/avatar-equipment-outline.png" />-->
        <!--</a-tree>-->
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
      activeIndex: null,
      //地图相关
      gasFeatures: [],
      gasLayer: null,
      isLoadData: false,
      clusterLayer:null,
      gasOverlay: null
    }
  },
  computed:{
    ...mapState('map', ['mapManager']),
    //获得展示的数据与属性
    treeData:function(){
      let data = JSON.parse(JSON.stringify(this.sourceData));
      this.gasFeatures=[];
      this.isLoadData=!this.isLoadData;
      return data;
    }
  },
  watch:{
    isLoadData:function() {
      if(this.gasFeatures.length>0){
        if(this.gasLayer){
            this.gasLayer.getSource().clear();
            this.gasLayer.getSource().addFeatures(this.carFeatures);
        }else{
            this.gasLayer = this.mapManager.addClusterLayerByFeatures(this.gasFeatures);
            this.gasLayer.set('featureType','gas');
        }
        const extent=this.gasLayer.getSource().getSource().getExtent();
        this.mapManager.getMap().getView().fit(extent);
      }
    }
  },
  mounted(){
    this.map = this.mapManager.getMap();
    this.map.on('click', this.videoMapClickHandler);
    // 地图弹框初始化
    this.gasOverlay = this.mapManager.addOverlay({
        id:'gasOverlay',
        offset:[0,-20],
        positioning: 'bottom-center',
        element: this.$refs.detailInfo.$el
    });
    this.getAllGasMac();
  },
  methods:{
    ...mapActions('gas/manage', ['getAllGasMacTreeData','getOneGasMacData','getGasTrendDataForOneMac']),
    // 获取所有燃气监测设备
    getAllGasMac(){
      //入参：监测点名称，用户ID
      let params = {
        userId:userId,
        watchPointName: this.watchPointName
      }
      this.showLoading = true;
      this.getAllGasMacTreeData(params).then(res=>{
        console.log('getAllGasMacTreeData',res);
        this.sourceData = res.treeData;
        this.totalSize = res.total;
        this.showLoading = false;
        this.sourceData.forEach(item => {
          let img;
          if(item.online==='1'){
            img = 'gas-online';
          }else if(item.online==='2'){
            img = 'gas-offline';
          }else{
            img = 'gas-lost';
          }
          // 通过经纬度生成点位加到地图上
          if(item.x && item.x.length>0 && item.y && item.y.length>0){
            const feature = this.mapManager.xyToFeature(item.x,item.y);
            feature.set('icon',img);
            feature.set('props',item);
            feature.set('type','gas');
            this.gasFeatures.push(feature);
          }
        })
        if(this.gasFeatures.length>0){
          if(this.gasLayer){
            this.gasLayer.getSource().getSource().clear();
            this.gasLayer.getSource().getSource().addFeatures(this.gasFeatures);
          }else{
            this.gasLayer = this.mapManager.addClusterLayerByFeatures(this.gasFeatures);
            this.gasLayer.set('featureType','gas');
          }
          const extent=this.gasLayer.getSource().getSource().getExtent();
          this.mapManager.getMap().getView().fit(extent);
        }
      });
    },

    onSearch(){
      this.getAllGasMac();
    },

    //点击某个设备时触发
    onSelect(item,index){
      this.activeIndex = index;
      this.showInfo(item);
      this.mapManager.locateTo([parseFloat(item.x),parseFloat(item.y)]);
    },
    // 地图上弹框显示事件
    showInfo(info){
      //地图上的点位放大居中
      // 获取详情数据
      this.detailInfoData.detailMessage.name = info.name;
      this.detailInfoData.detailMessage.value = info.value;
      this.detailInfoData.detailMessage.unit = info.unit;
      this.detailInfoData.detailMessage.flagName = '甲烷浓度';
      this.detailInfoData.type = 'gas';
      console.log('macId: ' + info.id);
      this.getOneGasMacData({userId:userId, macId: info.id}).then(res=>{
          this.detailInfoData.detailMessage.methane = res.methane;
          this.detailInfoData.detailMessage.temperature = res.temperature;
      });
      this.getGasTrendDataForOneMac({userId:userId, macId: info.id}).then(res=>{
          let chartData = res.reduce((acc,item) => {
              acc[0].push(item.dayTime);
              acc[1].push(item.value);
              return acc
          },[[],[]]);
          this.detailInfoData.chartData = chartData;
      });
      //地图上的点位放大居中显示
      if(!info.x||!info.y){
          this.$message.warning('当前设备无点位信息！！！');
      }else{
          this.gasOverlay.setPosition([parseFloat(info.x),parseFloat(info.y)]);
      }
    },
    videoMapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
      if(feature.get('features')) {
        const clickFeature = feature.get('features')[0];
        if (clickFeature && clickFeature.get('type') == 'gas') {
            this.showInfo(clickFeature.get('props'));
            this.gasOverlay.setPosition(coordinate);
        }
      }
    },
    closeTip(){
      this.gasOverlay.setPosition(undefined);
    }
  }
}
</script>
<style lang="scss" scoped>
.video-manage {
  height: 100%;
  width: 100%;
  padding: 20px;
  .search-panel {
    padding-bottom: 0px;
  }
  .yuan_dialog_body {
    background-color: #f5f5f5;
    height: calc(100% - 50px);
    position: relative;
    ::v-deep.cg-container-full-bs__body-wrapper-inner{
      padding: 10px;
    }
    .result_item{
      width: 100%;
      height: 30px;
      padding: 5px;
      cursor: pointer;
      img{
        width: 18px;
        height: 18px;
      }
      .title{
        margin-left: 10px;
        font-size: 14px;
      }
      &.active,&:hover{
        background-color: rgba(162, 214, 248, 0.4);
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
