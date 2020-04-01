<template>
  <div class="video-manage" flex="dir:top">
    <div class="search-panel">
      <my-address @getAddressData="getAddressData"></my-address>
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
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState,mapActions } from 'vuex'
import util from '@/utils/util';
import {mixins} from '@/mixins/index'
import MyVideoPlayer from "./MyVideoPlayer.vue";
import {videoPointStyle} from '@/utils/util.map.style'
const userId = util.cookies.get('userId');
export default {
  name: 'VideoDistribute',
  mixins: [mixins],
  components:{
    MyVideoPlayer
  },
  data(){
    return {
      //摄像头唯一标识
      videoId: '',
      //摄像头名称
      videoName: '',
      //视频流URL
      videoSrc: '',

      //地图相关
      videoFeatures: [],
      //地图相关
      videoLayer: null,
      isLoadData: false,
      clusterLayer:null
    }
  },
  computed:{
    ...mapState('map', ['mapManager']),
    //获得展示的数据与属性
    treeData:function(){
      let data = JSON.parse(JSON.stringify(this.sourceData));
      this.videoFeatures=[];
      this.changeTreeData(data,'');
      this.isLoadData=!this.isLoadData;
      return data;
    }
  },
  watch:{
    isLoadData:function() {
      if(this.videoFeatures.length>0){
        if(this.videoLayer){
            this.videoLayer.getSource().clear();
            this.videoLayer.getSource().addFeatures(this.carFeatures);
        }else{
            this.videoLayer = this.mapManager.addClusterLayerByFeatures(this.videoFeatures);
            this.videoLayer.set('featureType','videoDistribute');
        }
        const extent=this.videoLayer.getSource().getSource().getExtent();
        this.mapManager.getMap().getView().fit(extent);
      }
    }
  },
  mounted(){
    this.showLoading = true;
    this.map = this.mapManager.getMap();
    this.map.on('click', this.videoMapClickHandler);
    //入参：地址、监测点名称
    this.getAllCameraTreeData({userId:userId}).then(res=>{
      console.log('getAllCameraTreeData',res);
      this.sourceData = res.data.treeData;
      this.totalSize = res.data.total;
      this.showLoading = false;
    });
  },
  methods:{
    ...mapActions('drainoffwater/manage', ['getAllCameraTreeData']),
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
          item.title = item.name;
          item.key = item.id;
          item.dept = deptName;
          item.slots = {icon: 'camera'};
          item.class = 'itemClass';
          // this.resultCount++;
          // 通过经纬度生成点位加到地图上
          if(item.x && item.x.length>0 && item.y && item.y.length>0){
            const feature=_this.mapManager.xyToFeature(item.x,item.y);
            feature.set('icon','carmera_online');
            feature.set('props',item);
            feature.set('type','VideoDistribute');
            _this.videoFeatures.push(feature);
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
      //入参：城市范围、监测点名称，用户ID
      console.log('area: ',this.selectedCity,'watchPointName: ' + this.watchPointName, 'userId: ' + userId);
      this.showLoading = true;
      this.getAllCameraTreeData({userId:userId}).then(res=>{
        console.log('getAllCameraTreeData',res);
        this.sourceData = res.data.treeData;
        this.totalSize = res.data.total;
        this.showLoading = false;
      });
    },

    //点击树中某个节点（某个人员）时触发
    onSelect(selectedKeys, e){
      console.log(selectedKeys, e);
      if(selectedKeys.length>0){
        if(selectedKeys[0].indexOf('dept_')<0){
          let needData = e.selectedNodes[0].data.props;
          this.videoId = needData.id;
          this.videoName = needData.name;
          this.videoSrc = needData.videoUrl;
        }
      }
    },
    videoMapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
      if(feature.get('features')) {
        const clickFeature = feature.get('features')[0];
        // const coordinates=clickFeature.getGeometry().getCoordinates();
        if (clickFeature && clickFeature.get('type') == 'VideoDistribute') {
          const videoInfoData = clickFeature.get('props');
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
  padding: 20px;
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
