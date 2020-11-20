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
        <a-tree class="tree-panel" showIcon showLine :treeData="treeData" :expandedKeys="expandedKeys" :autoExpandParent="autoExpandParent" @select="onSelect" @expand="onExpand">
          <img slot="dept" src="~@img/avatar_dept.png" />
          <img slot="camera" src="~@img/globel-eye.png" />
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
      <div v-if="(!showLoading && treeData.length == 0) || !showTree" class="nodata-panel" flex="main:center cross:center">
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
import { mapState, mapActions } from 'vuex'
import util from '@/utils/util';
import MyVideoPlayer from "./MyVideoPlayer.vue";
import { videoPointStyle } from '@/utils/util.map.style'
import axios from 'axios'
const userId = util.cookies.get('userId');
export default {
  name: 'VideoDistribute',
  components: {
    MyVideoPlayer
  },
  data() {
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
      playerMethod: 'browser', //browser：flash播放  tool：C端播放
      //视频流URL
      videoSrc: '',
      //地图相关
      videoFeatures: [],
      //地图相关
      videoLayer: null,
      isLoadData: false,
      clusterLayer: null
    }
  },
  computed: {
    ...mapState('map', ['mapManager']),
    //获得展示的数据与属性
    treeData: function() {
      let data = JSON.parse(JSON.stringify(this.sourceData));
      this.videoFeatures = [];
      this.allCameraData = [];
      this.changeTreeData(data, '');
      this.isLoadData = !this.isLoadData;
      return data;
    }
  },
  watch: {
    isLoadData: function() {
      if (this.videoFeatures.length > 0) {
        if (this.videoLayer) {
          this.videoLayer.getSource().clear();
          this.videoLayer.getSource().addFeatures(this.carFeatures);
        } else {
          this.videoLayer = this.mapManager.addClusterLayerByFeatures(this.videoFeatures);
          this.videoLayer.set('featureType', 'videoDistribute');
        }
        const extent = this.videoLayer.getSource().getSource().getExtent();
        this.mapManager.getMap().getView().fit(extent);
      }
    }
  },
  mounted() {
    this.showLoading = true;
    this.map = this.mapManager.getMap();
    this.map.on('click', this.videoMapClickHandler);
    this.getAllCameraTreeData({ userId: userId }).then(res => {
      console.log('getAllCameraTreeData', res);
      this.sourceData = res.data[0].children;
      this.showLoading = false;
    });
  },
  methods: {
    ...mapActions('video/manage', ['getAllCameraTreeData', 'getCameraUrl']),
    //给后端的数据增加一些前端展示与判断需要的属性
    changeTreeData(arr, deptName) {
      const _this = this;
      arr.forEach(item => {
        item.scopedSlots = { title: 'title' };
        if (item.isLeaf) {
          item.title = item.mpname;
          item.key = item.mpid;
          item.dept = deptName;
          item.slots = { icon: 'camera' };
          item.class = 'itemClass';
          let temp = {
            title: item.mpname,
            key: item.mpid
          }
          this.allCameraData.push(temp);
          // 通过经纬度生成点位加到地图上
          if (item.x && item.x.length > 0 && item.x != 'null' && item.y && item.y.length > 0 && item.y != 'null') {
            if (parseFloat(item.x) < 120 || parseFloat(item.y) < 28) {
              console.log(item.puid);
            }
            const feature = _this.mapManager.xyToFeature(item.x, item.y);
            feature.set('icon', 'carmera_online');
            feature.set('props', item);
            feature.set('type', 'VideoDistribute');
            _this.videoFeatures.push(feature);
          }
        } else {
          item.title = item.name;
          item.key = 'dept_' + item.id;
          item.slots = { icon: 'dept' };
          this.changeTreeData(item.children, item.mpname);
        }
      })
    },
    onSearch(val) {
      this.expandedKeys = [];
      this.searchValue = val;
      this.allCameraData.forEach(item => {
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
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    //点击树中某个节点（某个人员）时触发
    onSelect(selectedKeys, e) {
      console.log(selectedKeys, e);
      if (selectedKeys[0].indexOf('dept_') < 0) {
        let needData = e.selectedNodes[0].data.props;
        let mpid = needData.mpid;
        this.playVideo(needData.ip);
      }
    },
    videoMapClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
      if (feature && feature.get('features')) {
        const clickFeature = feature.get('features')[0];
        // const coordinates=clickFeature.getGeometry().getCoordinates();
        if (clickFeature && clickFeature.get('type') == 'VideoDistribute') {
          const videoInfoData = clickFeature.get('props');
          this.playVideo(videoInfoData.ip);
        }
      }
    },
    playVideo(mpid) {
      if (this.playerMethod === 'browser') {
        this.videoSrc = mpid;
        // this.videoSrc = 'rtmp://58.200.131.2:1935/livetv/hunantv';
        //打开摄像头播放
        // this.getCameraUrl({ userId: userId, mpId: mpid }).then(res => {
          // this.videoSrc = res.mediaURL;
        // });
      } else {
        //打开C端工具播放
        axios.get('http://61.153.37.214:81/api/sp/getSecretApi').then(resultConfig => {
          if (resultConfig) {
            var PalyType = "PlayReal";
            var SvrPort = "443";
            var httpsflag = "1";
            var data = resultConfig.data;
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
  height: 100%;
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