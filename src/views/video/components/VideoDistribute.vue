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
      <my-video-player :videoSrc.sync="videoSrc"></my-video-player>
    </div>
    <iframe width="0" height="0" id="url" v-else></iframe>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import MyVideoPlayer from "./MyVideoPlayer.vue";
import axios from 'axios'
export default {
  name: 'VideoDistribute',
  components:{
    MyVideoPlayer
  },
  data(){
    return {
      expandedKeys: [],
      autoExpandParent: true,
      searchValue: '',
      showLoading: false,
      sourceData: [],
      allCameraData: [],
      showTree: true,
      playerMethod: 'tool', //browser：flash播放  tool：C端播放
      videoSrc: '',
    }
  },
  computed:{
    //获得展示的数据与属性
    treeData:function(){
      let data = JSON.parse(JSON.stringify(this.sourceData));
      if(data.length > 0){
        this.changeTreeData(data,'');
      }
      return data;
    }
  },
  mounted(){
    this.showLoading = true;
    this.getAllCameraTreeData().then(res=>{
      this.showLoading = false;
      this.sourceData = res.data;
    });
  },
  methods:{
    ...mapActions('video/manage', ['getAllCameraTreeData']),
    //给后端的数据增加一些前端展示与判断需要的属性
    changeTreeData(arr,deptName){
      arr.forEach(item=>{
        item.title = item.mpname;
        item.scopedSlots = { title: 'title' };
        if(item.isLeaf){
          item.key = item.mpid;
          item.dept = deptName;
          item.slots = {icon: 'camera'};
          item.class = 'itemClass';
          let temp = {
            title: item.mpname,
            key: item.mpid
          }
          this.allCameraData.push(temp);
        }
        else{
          item.key = 'dept_' + item.mpid;
          item.slots = {icon: 'dept'};
          this.changeTreeData(item.children, item.mpname);
        }
      })
    },
    onSearch(val){
      this.expandedKeys = [];
      this.searchValue = val;
      this.allPeopleData.forEach(item => {
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
      console.log(selectedKeys, e);
      if(selectedKeys[0].indexOf('dept_')<0){
        let needData = e.selectedNodes[0].data.props;
        if(this.playerMethod === 'browser'){
          //打开摄像头播放
          this.videoSrc = needData.rmtpUrl;
        }else {
          let mpid = needData.mpid;
          //打开C端工具播放
          axios.get('http://61.153.37.214:81/api/sp/getSecretApi').then(resultConfig=>{
            if(resultConfig){
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
          }).catch(err=>{
            console.log("错误信息---------->" + err);
          });
          // $.ajax({
          //   url:"http://61.153.37.214:81/api/sp/getSecretApi",
          //   dataType:"json",
          //   async:false,
          //   type:"GET",
          //   success:function(resultConfig){
          //     if(resultConfig){
          //       var PalyType = "PlayReal";
          //       var SvrPort = "443";
          //       var httpsflag = "1";
          //       var data = resultConfig.data;
          //       var SvrIp = data.SvrIp;
          //       var appkey = data.appkey;
          //       var appSecret = data.appSecret;
          //       var time = data.time;
          //       var timeSecret = data.timeSecret;
          //       var CamList = mpid;
          //       //主要是添加了'hikvideoclient://' 和 'VersionTag:artemis'2段字符串
          //       var param = 'hikvideoclient://ReqType:' + PalyType + ';' + 'VersionTag:artemis' + ';' + 'SvrIp:' + SvrIp + ';' + 'SvrPort:' + SvrPort + ';' + 'Appkey:' + appkey + ';' + 'AppSecret:' + appSecret + ';' + 'time:' + time + ';' + 'timesecret:' + timeSecret + ';' + 'httpsflag:' + httpsflag + ';' + 'CamList:' + CamList + ';';
          //       document.getElementById("url").src = param;
          //     }
          //   },
          //   error: function (e) {
          //     console.log("错误信息---------->" + e);
          //   }
          // });
        }

      }
    },
    // playVideo(){
    //   this.isActive = true;
    //   //rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000015-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12   ok
    //   //rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000883-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12   ok
    //   //rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000005-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12
    //   //rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000028-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12
    //   //rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000048-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12
    //   //rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000065-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12
    //   //rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000134-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12
    //   //rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000219-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12
    //   this.videoSrc = "rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000883-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12";
    //   // this.$refs["playerObj0"].videoSrc = "rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000015-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12";
    //   // this.$refs["playerObj0"].playerOptions.sources[0].src = "rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000015-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12";
    // }
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
