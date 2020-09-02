<template>
  <div class="page">
      <!-- 地图控件注入地址 -->
      <LayoutMap ref="olMap"></LayoutMap>
      <!--<video-list></video-list>-->
      <div class="view-panel">
          <div class="view-content-header" flex="cross:center">
              <span class="title">视频监控列表</span>
          </div>
          <div class="search-panel">
              <a-input-search placeholder="输入关键词搜索" v-model="searchContent" @search="onSearch"></a-input-search>
          </div>
          <div class="result_body">
              <div class="result_body-main">
                  <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
                      <a-spin tip="数据加载中..."></a-spin>
                  </div>
                  <my-scroll>
                      <ul>
                          <li v-show="camera.mpname.indexOf(searchContent)>=0"
                              v-for="camera in allCameraDataList"
                              :key="camera.mpid"
                              flex="dir:left cross:center"
                              :class="{active:activeId===camera.mpid}"
                              @click="selectCamera(camera)">
                              <img v-if="camera.status==='1'" src="~@img/globel-eye.png" />
                              <img v-else src="~@img/globel-eye_offline.png" />
                              <span :title="camera.mpname">{{camera.mpname}}</span>
                          </li>
                      </ul>
                  </my-scroll>
                  <div
                          v-if="!showLoading && allCameraDataList.length == 0"
                          class="nodata-panel"
                          flex="main:center cross:center"
                  >
                      <img src="~@img/zanwudata.png" />
                  </div>
              </div>
          </div>
          <div hidden>
              <video-info ref="videoInfo" :info="videoInfoData" @closeTip="closeTip" @openVideoPlayer="openVideoPlayer"></video-info>
          </div>
          <div class="player-panel active">
              <my-video-player :videoSrc.sync="videoSrc" :multiple="true"></my-video-player>
          </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex';
  import LayoutMap from '@/views/map/olMap.vue';
  import VideoInfo from './VideoInfo'
  import MyVideoPlayer from "./MyVideoPlayer.vue";
  import { MapManager } from '@/utils/util.map.manage'
  import { videoPointStyle } from '@/utils/util.map.style'
  import Feature from 'ol/Feature';
  import {Point} from 'ol/geom.js';
  let map;
  let mapManager;
export default {
  name: 'videopage',
  components:{
    LayoutMap,
    VideoInfo,
    MyVideoPlayer
  },
  data(){
    return {
      searchContent:'',
      //展示数据的过渡效果
      showLoading: false,
      //后台传过来的数据
      allCameraDataList: [],
      //激活的mpid
      activeId: '',
      //多个摄像头展示数据
      videoInfoData:{
        addressName: '视频列表',
        videoList: []
      },
      //视频流URL
      videoSrc: '',
      videoFeatures:[],
      videoLayer:null,
      selectLayer:null,
      selectOverlay:null
    }
  },
  computed:{},
  mounted() {
    this.$nextTick().then(() => {
      map = this.$refs.olMap.getMap();
      mapManager = new MapManager(map);
      // map.on('click', this.videoMapClickHandler);
      this.selectOverlay = mapManager.addOverlay({
        id:'selectVideoOverlay',
        offset:[0,-20],
        positioning: 'bottom-center',
        element: this.$refs.videoInfo.$el
      });
      this.getAllCameraData();
    });
  },
  methods:{
    ...mapActions('video/manage', ['getAllCameraDataList','getCameraUrl']),
    getAllCameraData(){
      this.showLoading = true;
      this.getAllCameraDataList().then(res=>{
        console.log('getAllCameraDataList',res.data);
        this.allCameraDataList = res.data;
        // this.sourceData = res.data;
        this.showLoading = false;
        // 通过经纬度生成点位加到地图上
        this.allCameraDataList.forEach(Camera => {
          if(Camera.latitude && Camera.latitude.length>0 && Camera.longitude && Camera.longitude.length>0){
            const feature=mapManager.xyToFeature(Camera.longitude,Camera.latitude);
            // feature.set('icon','carmera_online');
            if(Camera.status==='1'){
              feature.set('icon','carmera_online');
            } else{
              feature.set('icon','carmera_online');
            }
            feature.set('props',Camera);
            feature.set('type','VideoDistribute');
            this.videoFeatures.push(feature);
          }
        })
        if(this.videoFeatures.length>0){
          if(this.videoLayer){
            this.videoLayer.getSource().getSource().clear();
            this.videoLayer.getSource().getSource().addFeatures(this.videoFeatures);
          }else{
            const data=mapManager.addClusterLayerByFeatures(this.videoFeatures);
            this.videoLayer = data[0];
            const selectCluster = data[1];
            const _this=this;
            selectCluster.getFeatures().on(['add'], function(e) {
              _this.selectLayer.getSource().clear();
            const c = e.element.get('features');
            if (!c) {
              return;
            }
            if(c.length <6){
              _this.videoInfoData.videoList=[];
              for(let i=0;i<c.length;i++){
                const props=c[i].get('props');
                _this.videoInfoData.videoList.push({
                  label:props.mpname,
                  value:props.mpid
                })
              }
              const coor = e.element.get('geometry').getCoordinates();
              _this.selectOverlay.setPosition(coor);
            }
              // if (c.length == 1) {
              // } else
            });
            this.videoLayer.set('featureType','videoDistribute');
            const extent = this.videoLayer.getSource().getSource().getExtent();
            mapManager.getMap().getView().fit(extent);
          }
        }
      });
    },
    onSearch(){

    },
    closeTip(){
      this.selectOverlay.setPosition(undefined);
      this.videoInfoData.videoList=[];
    },
    //点击树中某个节点（某个人员）时触发
    onSelect(selectedKeys, e){
      if(selectedKeys[0].indexOf('dept_')<0){
        let needData = e.selectedNodes[0].data.props;
        let mpid = needData.mpid;

        this.playVideo(mpid);
      }
    },
    selectCamera(camera){
      this.activeId = camera.mpid;
      this.selectLayer && this.selectLayer.getSource().clear();
      if(!camera.longitude||!camera.latitude){
        this.$message.warning('当前视频无点位信息！！！');
      }else{
        mapManager.locateTo([parseFloat(camera.longitude),parseFloat(camera.latitude)]);
        const feature = new Feature({
          geometry: new Point([parseFloat(camera.longitude), parseFloat(camera.latitude)])
        });
        feature.set('type','select');
        if(this.selectLayer) {
          this.selectLayer.getSource().addFeatures([feature]);
        }else{
          this.selectLayer = mapManager.addVectorLayerByFeatures([feature],videoPointStyle(),100);
          // this.selectLayer.set('featureType','videoDistribute');
        }
      }
      this.getCameraUrl({mpid: camera.mpid}).then(res => {
        console.log('getCameraUrl',res.data);
        const data=res.data;
        let url = data.mediaURL;
        this.playVideo(url);
      })
    },
    openVideoPlayer(videoList){
      console.log('openVideoPlayer',videoList);
    },
    // 地图点击事件
    videoMapClickHandler({ pixel, coordinate }) {
      const feature = map.forEachFeatureAtPixel(pixel, feature => feature);
      if(feature.get('features')) {
        const clickFeature = feature.get('features')[0];
        // const coordinates=clickFeature.getGeometry().getCoordinates();
        if (clickFeature && clickFeature.get('type') == 'VideoDistribute') {
          const videoInfoData = clickFeature.get('props');
          // this.playVideo(videoInfoData.mpid);
          this.selectCamera(videoInfoData);
        }
      }
    },
    playVideo(videoUrl){
      this.videoSrc = videoUrl;
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100%;
    background-color: #f4f4f5;
    padding-top: 60px;
    position: relative;
    .view-panel {
        position: absolute;
        top: 60px;
        left: 0px;
        width: 358px;
        height: calc(100% - 60px);
        box-shadow: 1px 5px 11px 0px #8183854a;
        overflow: hidden;
        background-color: #fff;
        .view-content-header {
            height: 60px;
            font-size: 16px;
            line-height: 40px;
            background-color: #f5f7f8;
            color: #666666;
            padding-left: 12px;
            .title {
                font-weight: 600;
                font-size: 20px;
                color: #00a4fe;
            }
        }
        .search-panel {
            padding: 20px;
        }
        .result_body {
            height: calc(100% - 150px);
            padding: 0px 20px 20px 20px;
            width: 100%;
            .result_body-main{
                position: relative;
                background-color: #f5f5f5;
                height: 100%;
                width: 100%;
                ul{
                    padding: 10px 16px;
                    list-style: none;
                    width: 318px;
                    li{
                        width: 286px;
                        height: 30px;
                        line-height: 30px;
                        color: rgb(0, 102, 232);
                        cursor: pointer;
                        &.active{
                            background-color: rgba(0, 164, 254, 0.24);
                        }
                        img{
                            width: 20px;
                            margin-right: 10px;
                        }
                        span{
                            width: 250px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }
                }
                .tree-panel {
                    width: 100%;
                    height: 100%;
                    padding: 16px;
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
    }
}
</style>