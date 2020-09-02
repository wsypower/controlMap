<template>
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
</template>
<script type="text/ecmascript-6">
import { mapState,mapActions } from 'vuex'
import VideoInfo from './VideoInfo'
import MyVideoPlayer from "./MyVideoPlayer.vue";
export default {
  name: 'videolist',
  components:{
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
      videoFeatures:[]
    }
  },
  computed:{},
  mounted() {
    this.showLoading = true;
    this.getAllCameraDataList().then(res=>{
      console.log('getAllCameraDataList',res.data);
      this.allCameraDataList = res.data;
      // this.sourceData = res.data;
      this.showLoading = false;
      // 通过经纬度生成点位加到地图上
      this.allCameraDataList.forEach(Camera => {
        if(Camera.latitude && Camera.latitude.length>0 && Camera.longitude && Camera.longitude.length>0){
          const feature=this.mapManager.xyToFeature(Camera.latitude,Camera.longitude);
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
    });
  },
  methods:{
    ...mapActions('video/manage', ['getAllCameraDataList','getCameraUrl']),
    onSearch(){

    },
    closeTip(){
      this.selectOverlay.setPosition(undefined);
      this.videoInfoData.videoList=[];
    },
    selectCamera(camera){
      this.activeId = camera.mpid;
      this.getCameraUrl({mpid: camera.mpid}).then(res => {
        console.log('getCameraUrl',res.data);
        let url = res.data.mediaURL;
        this.playVideo(url);
      })
    },
    openVideoPlayer(videoList){
      console.log('openVideoPlayer',videoList);
    },
    playVideo(videoUrl){
      this.videoSrc = videoUrl;
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>