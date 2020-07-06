<template>
  <div class="video-manage" flex="dir:top">
    <div class="left-message-title">
      工地车视频
    </div>
    <div class="search-panel">
      <my-address @getAddressData="getAddressData"></my-address>
      <div flex="fir:left cross:center" style="margin:10px 0px;">
        <label>车辆名称：</label>
        <a-input placeholder="输入工地名称" v-model="carName" style="flex:1" />
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
          <img slot="dept" src="~@img/avatar-car.png" />
          <img slot="camera" src="~@img/globel-eye.png" />
        </a-tree>
      </cg-container>
      <div v-if="!showLoading && treeData.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div class="player-panel active">
      <my-video-player :videoSrc.sync="videoSrc" :videoName.sync="videoName" :videoId.sync="videoId" :multiple="true"></my-video-player>
    </div>
    <div class="car-panel" :class="{none: !isShow}">
      <div class="panel-header">
        车辆信息
      </div>
      <div class="panel-main">
        <div class="car-message">
          <div class="header"><span>车辆信息</span></div>
          <div class="message-item"><span>车牌号：</span><span>xxxxxxxxxx</span></div>
          <div class="message-item"><span>运输公司：</span><span>xxxxxxxxxx</span></div>
          <div class="message-item"><span>手机号：</span><span>xxxxxxxxxx</span></div>
          <div class="message-item"><span>SIM卡：</span><span>xxxxxxxxxx</span></div>
          <div class="message-item"><span>顶灯号：</span><span>xxxxxxxxxx</span></div>
          <div class="message-item"><span>审核情况：</span><span>xxxxxxxxxx</span></div>
          <div class="message-item"><span>锁定状态：</span><span>xxxxxxxxxx</span></div>
        </div>
        <div class="video-message">
          <div class="header"><span>车载视频</span></div>
          <div class="video-play-item" v-for="item in videoArr" :key="item.id">
            <div class="video-header">{{item.name}}</div>
            <video-player :videoUrl="item.srcUrl" style="height:calc(100% - 20px)"></video-player>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState,mapActions } from 'vuex'
import util from '@/utils/util';
import {mixins} from '@/mixins/index'
import MyVideoPlayer from "./MyVideoPlayer.vue";
import {videoPointStyle} from '@/utils/util.map.style'
import {pointToFeature} from '@/utils/util.map.manage'
const userId = util.cookies.get('userId');
export default {
  name: 'site',
  mixins: [mixins],
  components:{
    MyVideoPlayer
  },
  data(){
    return {
      //车辆名称
      carName: '',
      //摄像头唯一标识
      videoId: '',
      //摄像头名称
      videoName: '',
      //视频流URL
      videoSrc: '',

      //右侧数据
      isShow: false,

      videoArr: [{
        id: '001',
        name: '车前端',
        srcUrl: ''
      },
        {
          id: '002',
          name: '车后端',
          srcUrl: ''
        }],

      //地图相关
      bridgeFeatures: [],
      bridgeLayer: null,
      isLoadData: false,
      clusterLayer:null,
      selectLayer: null,

    }
  },
  computed:{
    ...mapState('map', ['mapManager']),
    //获得展示的数据与属性
    treeData:function(){
      let data = JSON.parse(JSON.stringify(this.sourceData));
      this.bridgeFeatures=[];
      this.changeTreeData(data,'');
      this.isLoadData=!this.isLoadData;
      return data;
    }
  },
  watch:{
    isLoadData:function() {
      if(this.bridgeFeatures.length>0){
        if(this.bridgeLayer){
          this.bridgeLayer.getSource().getSource().clear();
          this.bridgeLayer.getSource().getSource().addFeatures(this.bridgeFeatures);
        } else {
          this.bridgeLayer = this.mapManager.addClusterLayerByFeatures(this.bridgeFeatures);
          this.bridgeLayer.set('featureType','bridge');
        }
        const extent=this.bridgeLayer.getSource().getSource().getExtent();
        this.mapManager.getMap().getView().fit(extent);
      }
    }
  },
  mounted(){
    this.map = this.mapManager.getMap();
    this.map.on('click', this.videoMapClickHandler);
    this.getAllCameraForBridge();
  },
  methods:{
    ...mapActions('site/manage', ['getAllCameraTreeDataForConstructionSite']),
    getAddressData(val){
      console.log('selected city data',val);
      this.selectedCity = val;
    },
    // 获取所有桥梁监控
    getAllCameraForBridge(){
      this.showLoading = true;
      //入参：城市范围、桥梁名称，用户ID
      let params = {
        userId: userId,
        area: this.selectedCity,
        siteName: this.siteName
      }
      this.getAllCameraTreeDataForConstructionSite(params).then(res=>{
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
          item.slots = {icon: 'camera'};
          item.class = 'itemClass';

          // 通过经纬度生成点位加到地图上
          if(item.x && item.x.length>0 && item.y && item.y.length>0){
            const feature=_this.mapManager.xyToFeature(item.x,item.y);
            feature.set('icon','bridge');
            feature.set('props',item);
            feature.set('type','bridge');
            _this.bridgeFeatures.push(feature);
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
      this.getAllCameraForBridge();
    },

    //点击树中某个节点时触发
    onSelect(selectedKeys, e){
      console.log(selectedKeys, e);
      if(selectedKeys.length>0){
        if(selectedKeys[0].indexOf('dept_')<0){
          let needData = e.selectedNodes[0].data.props;
          this.showVideo(needData);
          this.mapManager.locateTo([parseFloat(needData.x),parseFloat(needData.y)]);
        }
        else{
          this.isShow = true;
        }
      }
    },
    // 展示视频播放
    showVideo(info){
        this.videoId = info.id;
        this.videoName = info.name;
        this.videoSrc = info.videoUrl;
        this.selectLayer && this.selectLayer.getSource().clear();
        if(!info.x||!info.y){
            this.$message.warning('当前视频无点位信息！！！');
        }else{
            const feature = pointToFeature(info,'big_video');
            if(this.selectLayer) {
                this.selectLayer.getSource().addFeatures([feature]);
            }else{
                this.selectLayer = this.mapManager.addVectorLayerByFeatures([feature],videoPointStyle(),4);
                this.selectLayer.set('featureType','bridge');
            }
            // this.mapManager.locateTo([parseFloat(info.x),parseFloat(info.y)]);
        }
    },
    videoMapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
      if(feature.get('features')) {
        const clickFeature = feature.get('features')[0];
        // const coordinates=clickFeature.getGeometry().getCoordinates();
        if (clickFeature && clickFeature.get('type') == 'bridge') {
          const videoInfoData = clickFeature.get('props');
          this.videoInfo = videoInfoData;
          this.showVideo(videoInfoData);
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.video-manage {
  height: 100%;
  width: 100%;
  .left-message-title {
    height: 50px;
    width: 100%;
    padding-left: 20px;
    line-height: 50px;
    background-color: #f5f7f8;
    color: #2b90f3;
    font-size: 18px;
    text-align: left;
  }
  .search-panel {
    padding: 20px 20px 0px 20px;
  }
  .yuan_dialog_body {
    background-color: #f5f5f5;
    height: calc(100% - 50px);
    margin: 0px 20px 20px 20px;
    position: relative;
    .tree-panel {
      width: 100%;
      height: 100%;
      padding: 10px;
      img {
        width: 20px;
        height: 20px;
        display: inline-block;
        /*border-radius: 12px;*/
        margin-right: 8px;
        margin-top: -3px;
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
  .car-panel{
    width: 252px;
    position: fixed;
    top: 10px;
    right: 10px;
    border: 1px solid #eeeeee;
    .panel-header{
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      background-color: #0090fe;
      font-size: 16px;
      color: #ffffff;
    }
    .panel-main{
      background-color: #ffffff;
      padding: 6px 10px 10px 10px;
      .header{
        span{
          color: #00a4fe;
          font-size: 14px;
          border-bottom: 1px solid #00a4fe;
        }
      }
      .message-item{
        padding-left: 8px;
        span{
          font-size: 12px;
        }
      }
      .video-message{
        margin-top: 10px;
        .video-play-item {
          width: 230px;
          height: 150px;
          //border: 2px solid rgba(43, 144, 243, 0.8);
          margin-top: 10px;
          position: relative;
          background-color: #fff;
          .video-header {
            width: 100%;
            height: 20px;
            line-height: 20px;
            color: #888;
            font-size: 12px;
          }
        }
      }
    }
    &.none{
      display:none;
    }
  }
}
</style>
