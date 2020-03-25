<template>
  <div class="video-manage" flex="dir:top">
    <div class="search-panel">
      <a-input-search placeholder="输入关键词搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
    </div>
    <div class="yuan_dialog_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && treeData.length > 0 && showTree">
        <a-tree
          class="tree-panel"
          showIcon
          showLine
          :treeData="treeData"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          @select="onSelect"
          @expand="onExpand"
        >
          <img slot="dept" src="~@img/avatar_dept.png" />
          <img slot="camera" src="~@img/globel-eye.png" />
          <img slot="camera_offline" src="~@img/globel-eye_offline.png" />
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
      <div
        v-if="(!showLoading && treeData.length == 0) || !showTree"
        class="nodata-panel"
        flex="main:center cross:center"
      >
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div class="player-panel active" v-if="playerMethod === 'browser'">
      <my-video-player :videoSrc.sync="videoSrc" :multiple="true"></my-video-player>
    </div>
    <iframe width="0" height="0" id="url" v-else></iframe>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState,mapActions } from 'vuex'
import util from '@/utils/util';
import MyVideoPlayer from "./MyVideoPlayer.vue";
import {videoPointStyle} from '@/utils/util.map.style'
import { pointToFeature  } from "@/utils/util.map.manage";
import axios from 'axios'
const userId = util.cookies.get('userId');
export default {
  name: 'VideoDistribute',
  components:{
    MyVideoPlayer
  },
  data(){
    return {
      //展开节点key
      expandedKeys: [],
      //是否展开父节点
      autoExpandParent: true,
      //查询输入值
      searchValue: '',
      //展示数据的过渡效果
      showLoading: false,
      //后台传过来的数据
      sourceData: [],
      allCameraData: [],
      //查询没有数据时展示
      showTree: true,
      //摄像头播放效果
      playerMethod: 'tool', //browser：flash播放  tool：C端播放
      //视频流URL
      videoSrc: '',
      //地图相关
      videoFeatures: [],
      //地图相关
      videoLayer: null,
      isLoadData: false,
      clusterLayer:null,
      selectLayer:null
    }
  },
  computed:{
    ...mapState('map', ['mapManager']),
    ...mapState('cgadmin/menu', ['activeModule']),
    //获得展示的数据与属性
    treeData:function(){
      let data = JSON.parse(JSON.stringify(this.sourceData));
      this.videoFeatures=[];
      this.allCameraData = [];
      this.changeTreeData(data,'');
      this.isLoadData=!this.isLoadData;
      return data;
    }
  },
  watch:{
    isLoadData:function() {
      if(this.videoFeatures.length>0){
        const data=this.mapManager.addClusterLayerByFeatures(this.videoFeatures);
        this.videoLayer = data[0];
        const selectCluster = data[1];
        selectCluster.getFeatures().on(['add'], function(e) {
            console.log('e==',e);
              const c = e.element.get('features');
              if (!c) {
                  return;
              }
              if (c.length == 1) {
                  const feature = c[0];
                  // _this.showCameraPopup(feature);
                  console.log('selectCluster',feature);
              } else {
                  console.log('selectCluster','多个要素');
              }
          });
        this.videoLayer.set('featureType','videoDistribute');
        const extent=this.videoLayer.getSource().getSource().getExtent();
        this.mapManager.getMap().getView().fit(extent);
      }
    }
  },
  mounted(){
    this.showLoading = true;
    this.map = this.mapManager.getMap();
    this.map.on('click', this.videoMapClickHandler);
    let acModule = '';
    if(this.activeModule === 'jm'){
      acModule = '';
    }
    else{
      acModule = this.activeModule ;
    }
    this.getAllCameraTreeData({userId:userId, moduleType: acModule}).then(res=>{
      console.log('getAllCameraTreeData',res);
      this.sourceData = res;
      this.showLoading = false;
    });
  },
  methods:{
    ...mapActions('video/manage', ['getAllCameraTreeData','getCameraUrl']),
    //给后端的数据增加一些前端展示与判断需要的属性
    changeTreeData(arr,deptName){
      const _this = this;
      arr.forEach(item=>{
        item.scopedSlots = { title: 'title' };
        if(item.isLeaf){
          item.title = item.mpname;
          item.key = item.mpid;
          item.dept = deptName;
          if(item.online){
            item.slots = {icon: 'camera'};
          }
          else{
            item.slots = {icon: 'camera_offline'};
          }

          item.class = 'itemClass';
          let temp = {
            title: item.mpname,
            key: item.mpid
          }
          this.allCameraData.push(temp);
          // 通过经纬度生成点位加到地图上
          if(item.x && item.x.length>0 && item.y && item.y.length>0){
            const feature=_this.mapManager.xyToFeature(item.x,item.y);
            console.log(item.online);
            // feature.set('icon','carmera_online');
            if(item.online){
                feature.set('icon',item.type);
            } else{
                feature.set('icon',item.type+'_lx');
            }
            feature.set('props',item);
            feature.set('type','VideoDistribute');
            _this.videoFeatures.push(feature);
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
    onSearch(val){
      this.expandedKeys = [];
      this.searchValue = val;
      this.allCameraData.forEach(item => {
        if(item.title.indexOf(val)>=0){
          this.expandedKeys.push(item.key);
        }
      });
      this.autoExpandParent = true;
      if(this.expandedKeys.length === 0){
        this.showTree = false;
      }
      else{
        this.showTree = true;
      }
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    //点击树中某个节点（某个人员）时触发
    onSelect(selectedKeys, e){
      if(selectedKeys[0].indexOf('dept_')<0){
        let needData = e.selectedNodes[0].data.props;
        let mpid = needData.mpid;
        this.selectLayer && this.selectLayer.getSource().clear();
        if(!needData.x||!needData.y){
            this.$message.warning('当前视频无点位信息！！！');
        }else{
            this.mapManager.locateTo([parseFloat(needData.x),parseFloat(needData.y)]);
            const feature = pointToFeature(needData,'big_video');
            if(this.selectLayer) {
                this.selectLayer.getSource().addFeatures([feature]);
            }else{
                this.selectLayer = this.mapManager.addVectorLayerByFeatures([feature],videoPointStyle(),4);
                this.selectLayer.set('featureType','videoDistribute');
            }
        }
        this.playVideo(mpid);
      }
    },
      videoMapClickHandler({ pixel, coordinate }) {
          const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
          if(feature && feature.get('features')){
              const clickFeature=feature.get('features')[0];
              // const coordinates=clickFeature.getGeometry().getCoordinates();
              if(clickFeature&& clickFeature.get('type')=='VideoDistribute'){
                  const videoInfoData=clickFeature.get('props');
                  this.playVideo(videoInfoData.mpid);
              }
          }
      },
    playVideo(mpid){
      if (this.playerMethod === 'browser') {
        //打开摄像头播放
        this.getCameraUrl({userId: userId, mpId: mpid}).then(res => {
          this.videoSrc = res.mediaURL;
        });
      } else {
        //打开C端工具播放
        axios.get('http://61.153.37.214:81/api/sp/getSecretApi').then(resultConfig => {
          if (resultConfig) {
            var PalyType = "PlayReal";
            var SvrPort = "443";
            var httpsflag = "1";
            var data = resultConfig.data.data;
            var SvrIp = data.SvrIp;
            var appkey = data.appkey;
            var appSecret = data.appSecret;
            var time = data.time;
            var timeSecret = data.timeSecret;
            var CamList = mpid;
            //主要是添加了'hikvideoclient://' 和 'VersionTag:artemis'2段字符串
            var param = 'hikvideoclient://ReqType:' + PalyType + ';' + 'VersionTag:artemis' + ';' + 'SvrIp:' + SvrIp + ';' + 'SvrPort:' + SvrPort + ';' + 'Appkey:' + appkey + ';' + 'AppSecret:' + appSecret + ';' + 'time:' + time + ';' + 'timesecret:' + timeSecret + ';' + 'httpsflag:' + httpsflag + ';' + 'CamList:' + CamList + ';';
            document.getElementById("url").src = param;
          }
        }).catch(err => {
          console.log("错误信息---------->" + err);
        });
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.video-manage {
  height: calc(100% - 50px);
  width: 100%;
  padding: 20px;
  .search-panel {
    padding-bottom: 20px;
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
