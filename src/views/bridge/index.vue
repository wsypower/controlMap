<template>
  <div class="video-manage" flex="dir:top">
    <div class="left-message-title">
      桥梁管控
    </div>
    <div class="search-panel">
      <my-address @getAddressData="getAddressData"></my-address>
      <div flex="fir:left cross:center" style="margin:10px 0px;">
        <label>桥梁名称：</label>
        <a-input placeholder="输入桥梁名称" v-model="bridgeName" style="flex:1" />
      </div>
      <a-button type="primary" style="width: 100%;margin-bottom:5px;" @click="onSearch">查询</a-button>
      <div>共计{{ resultCount }}个查询结果</div>
    </div>
    <div class="yuan_dialog_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && treeData.length > 0">
        <a-tree class="tree-panel" showIcon showLine :treeData="treeData" @select="onSelect">
          <img slot="dept" src="~@img/bridge.png" />
          <img slot="camera" src="~@img/globel-eye.png" />
        </a-tree>
      </cg-container>
      <div v-if="!showLoading && treeData.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div class="player-panel active">
      <my-video-player :videoSrc.sync="videoSrc" :multiple="true"></my-video-player>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState,mapActions } from 'vuex'
import util from '@/utils/util';
import MyVideoPlayer from "./MyVideoPlayer.vue";
import {videoPointStyle} from '@/utils/util.map.style'
const userId = util.cookies.get('userId');
export default {
  name: 'BridgeVideo',
  components:{
    MyVideoPlayer
  },
  data(){
    return {
      //选择的城市---数组形式
      selectedCity: [],
      //桥梁名称
      bridgeName: '',
      //展示数据的过渡效果
      showLoading: false,
      //后台传过来的数据
      sourceData: [],
      //查询结果个数
      resultCount: 0,
      //视频流URL
      videoSrc: '',
      //地图相关
      bridgeFeatures: [],
      bridgeLayer: null,
      isLoadData: false,
      clusterLayer:null
    }
  },
  computed:{
    ...mapState('map', ['mapManager']),
    //获得展示的数据与属性
    treeData:function(){
      let data = JSON.parse(JSON.stringify(this.sourceData));
      this.bridgeFeatures=[];
      this.resultCount = 0;
      this.changeTreeData(data,'');
      this.isLoadData=!this.isLoadData;
      return data;
    }
  },
  watch:{
    isLoadData:function() {
      if(this.bridgeFeatures.length>0){
        if(this.bridgeLayer){
          this.bridgeLayer.getSource().clear();
          this.bridgeLayer.getSource().addFeatures(this.carFeatures);
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
    this.showLoading = true;
    this.map = this.mapManager.getMap();
    this.map.on('click', this.videoMapClickHandler);
    //入参：地址、桥梁名称
    this.getAllCameraTreeDataForBridge({userId:userId}).then(res=>{
      console.log('getAllCameraTreeDataForBridge',res);
      this.sourceData = res.data;
      this.showLoading = false;
    });
  },
  methods:{
    ...mapActions('bridge/manage', ['getAllCameraTreeDataForBridge','getCameraUrl']),
    getAddressData(val){
      console.log('selected city data',val);
      this.selectedCity = val;
    },
    //给后端的数据增加一些前端展示与判断需要的属性
    changeTreeData(arr,deptName){
      const _this = this;
      arr.forEach(item=>{
        item.scopedSlots = { title: 'title' };
        if(item.isLeaf){
          item.title = item.mpname;
          item.key = item.mpid;
          item.dept = deptName;
          item.slots = {icon: 'camera'};
          item.class = 'itemClass';
          this.resultCount++;
          // 通过经纬度生成点位加到地图上
          if(item.x && item.x.length>0 && item.y && item.y.length>0){
            const feature=_this.mapManager.xyToFeature(item.x,item.y);
            feature.set('icon','carmera_online');
            feature.set('props',item);
            feature.set('type','light');
            _this.bridgeFeatures.push(feature);
          }
        }
        else{
          item.title = item.name;
          item.key = 'dept_' + item.id;
          item.slots = {icon: 'dept'};
          this.changeTreeData(item.children, item.mpname);
        }
      })
    },
    onSearch(){
      //入参：城市范围、桥梁名称，用户ID
      this.getAllCameraTreeDataForBridge({userId:userId}).then(res=>{
        console.log('getAllCameraTreeDataForBridge',res);
        this.sourceData = res.data;
        this.showLoading = false;
      });
    },

    //点击树中某个节点（某个人员）时触发
    onSelect(selectedKeys, e){
      console.log(selectedKeys, e);
      if(selectedKeys[0].indexOf('dept_')<0){
        let needData = e.selectedNodes[0].data.props;
        let mpid = needData.mpid;
        this.playVideo(mpid);
      }
    },
    videoMapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
      if(feature.get('features')) {
        const clickFeature = feature.get('features')[0];
        // const coordinates=clickFeature.getGeometry().getCoordinates();
        if (clickFeature && clickFeature.get('type') == 'VideoDistribute') {
          const videoInfoData = clickFeature.get('props');
          this.playVideo(videoInfoData.mpid);
        }
      }
    },
    playVideo(mpid){
      //打开摄像头播放
      this.getCameraUrl({userId: userId, mpId: mpid}).then(res => {
        this.videoSrc = res.data;
      });
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
  .player-panel {
    display: none;
    &.active {
      display: block;
    }
  }
}
</style>
