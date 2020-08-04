<template>
    <div class="view-panel">
        <div class="view-content-header" flex="cross:center">
            <span class="title">视频列表</span>
        </div>
        <div class="search-panel">
            <a-input-search placeholder="输入关键词搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
        </div>
        <div class="result_body">
            <div class="result_body-main">
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
                <span v-if="title&&title.indexOf(searchValue) > -1">
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
        </div>
        <div class="player-panel active">
            <my-video-player :videoSrc.sync="videoSrc" :multiple="true"></my-video-player>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import { mapState,mapActions } from 'vuex'
import MyVideoPlayer from "./MyVideoPlayer.vue";
export default {
  name: 'videolist',
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
      videoInfoData:{
        addressName: '视频列表',
        videoList: []
      },
    }
  },
  computed:{
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
  mounted() {
    this.showLoading = true;
    this.getAllCameraTreeData().then(res=>{
      console.log('getAllCameraTreeData',res.data);
      this.sourceData = res.data;
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
          item.title = item.name;
          item.key = item.id;
          item.dept = deptName;
          if(item.online){
            item.slots = {icon: 'camera'};
          }
          else{
            item.slots = {icon: 'camera_offline'};
          }

          item.class = 'itemClass';
          let temp = {
            title: item.name,
            key: item.id
          }
          this.allCameraData.push(temp);
          // 通过经纬度生成点位加到地图上
          // if(item.x && item.x.length>0 && item.y && item.y.length>0){
          //   const feature=_this.mapManager.xyToFeature(item.x,item.y);
          //   console.log(item.online);
          //   // feature.set('icon','carmera_online');
          //   if(item.online){
          //     feature.set('icon',item.type);
          //   } else{
          //     feature.set('icon',item.type+'_lx');
          //   }
          //   feature.set('props',item);
          //   feature.set('type','VideoDistribute');
          //   _this.videoFeatures.push(feature);
          // }
        }
        else{
          item.title = item.name;
          item.key = 'dept_' + item.id;
          item.slots = {icon: 'dept'};
          this.changeTreeData(item.children, item.name);
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
        let videoUrl = needData.videoUrl;
        // this.selectLayer && this.selectLayer.getSource().clear();
        // if(!needData.x||!needData.y){
        //   this.$message.warning('当前视频无点位信息！！！');
        // }else{
        //   this.mapManager.locateTo([parseFloat(needData.x),parseFloat(needData.y)]);
        //   const feature = pointToFeature(needData,'big_video');
        //   if(this.selectLayer) {
        //     this.selectLayer.getSource().addFeatures([feature]);
        //   }else{
        //     this.selectLayer = this.mapManager.addVectorLayerByFeatures([feature],videoPointStyle(),4);
        //     this.selectLayer.set('featureType','videoDistribute');
        //   }
        // }
        this.playVideo(videoUrl);
      }
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
        height: calc(100% - 130px);
        padding: 0px 20px 20px 20px;
        .result_body-main{
            position: relative;
            background-color: #f5f5f5;
            height: 100%;
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