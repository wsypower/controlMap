<template>
  <div class="video-manage" flex="dir:top">
    <div class="search-panel">
      <div flex="fir:left cross:center" style="margin:10px 0px;">
        <label>泵站名称：</label>
        <a-input placeholder="输入泵站名称" v-model="watchPointName" style="flex:1" />
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
          <img slot="equipment" src="~@img/avatar-equipment.png" />
          <img slot="equipment-outline" src="~@img/avatar-equipment-outline.png" />
        </a-tree>
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
      //地图相关
      watchFeatures: [],
      watchLayer: null,
      isLoadData: false,
      clusterLayer: null,
      watchOverlay: null
    }
  },
  computed:{
    ...mapState('map', ['mapManager']),
    //获得展示的数据与属性
    treeData:function(){
      let data = JSON.parse(JSON.stringify(this.sourceData));
      this.watchFeatures=[];
      this.changeTreeData(data,'');
      this.isLoadData=!this.isLoadData;
      return data;
    }
  },
  watch:{
    isLoadData:function() {
      if(this.watchFeatures.length>0){
        if(this.watchLayer){
            this.watchLayer.getSource().getSource().clear();
            this.watchLayer.getSource().getSource().addFeatures(this.watchFeatures);
        }else{
            this.watchLayer = this.mapManager.addClusterLayerByFeatures(this.watchFeatures);
            this.watchLayer.set('featureType','rainfall');
        }
        const extent=this.watchLayer.getSource().getSource().getExtent();
        this.mapManager.getMap().getView().fit(extent);
      }
    }
  },
  mounted(){
    this.map = this.mapManager.getMap();
    this.map.on('click', this.videoMapClickHandler);
    // 地图弹框初始化
    this.watchOverlay = this.mapManager.addOverlay({
        id:'rainWatchOverlay',
        offset:[0,-20],
        positioning: 'bottom-center',
        element: this.$refs.detailInfo.$el
    });
    this.getAllRainMac();
  },
  methods:{
    ...mapActions('drainoffwater/manage', ['getAllRainMacTreeData','getOneRainMacData','getRainfallTrendDataForOneMac']),
    //获取市区地址范围
    // getAddressData(val){
    //   console.log('selected city data',val);
    //   this.selectedCity = val;
    // },
    getAllRainMac(){
      this.showLoading = true;
      //入参：城市范围、监测点名称，用户ID
      console.log('area: ',this.selectedCity,'watchPointName: ' + this.watchPointName, 'userId: ' + userId);
      let params = {
        userId: userId,
            // area: this.selectedCity,
        watchPointName: this.watchPointName
      }
      this.getAllRainMacTreeData(params).then(res=>{
        console.log('getAllRainMacTreeData',res);
        this.sourceData = res.treeData;
        this.totalSize = res.total;
        this.showLoading = false;
      });
    },
    //递归调用-给后端的数据增加一些前端展示与判断需要的属性
    changeTreeData(arr,deptName){
      const _this = this;
      arr.forEach(item=>{
        item.scopedSlots = { title: 'title' };
        if(item.isLeaf){
          item.title = item.name;
          item.key = item.id;
          item.dept = deptName;
          if(item.online){
            item.slots = {icon: 'equipment'};
          }
          else{
            item.slots = {icon: 'equipment-outline'};
          }
          item.class = 'itemClass';
          let img;
          if(item.online){
              img='rainfall'
          }else{
              img='rainfall-lx'
          }
          // 通过经纬度生成点位加到地图上
          if(item.x && item.x.length>0 && item.y && item.y.length>0){
            const feature=_this.mapManager.xyToFeature(item.x,item.y);
            feature.set('icon',img);
            feature.set('props',item);
            feature.set('type','rainfall');
            _this.watchFeatures.push(feature);
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
      this.getAllRainMac();
    },

    //点击树中某个节点（某个人员）时触发
    onSelect(selectedKeys, e){
      console.log(selectedKeys, e);
      if(selectedKeys.length>0){
        if(selectedKeys[0].indexOf('dept_')<0){
          let needData = e.selectedNodes[0].data.props;
          this.showInfo(needData);
          this.mapManager.locateTo([parseFloat(needData.x),parseFloat(needData.y)]);
        }
      }
    },
    // 地图上弹框显示事件
    showInfo(info){
        // 获取详情数据
        this.detailInfoData.detailMessage.name = info.dept + '-' +info.name;
        this.detailInfoData.detailMessage.value = info.value;
        this.detailInfoData.detailMessage.unit = info.unit;
        this.detailInfoData.detailMessage.flagName = '降雨量';
        this.detailInfoData.type = 'water';
        console.log('macId: ' + info.id, 'userId: ' + userId);
        this.getOneRainMacData({userId: userId, macId:info.id}).then(res=>{
            this.detailInfoData.detailMessage.yty = res.yty;
            this.detailInfoData.detailMessage.mtm = res.mtm;
        });
        this.getRainfallTrendDataForOneMac({userId: userId, macId:info.id}).then(res=>{
            let chartData = res.reduce((acc,item) => {
                acc[0].push(item.dayTime);
                acc[1].push(item.value);
                return acc
            },[[],[]]);
            this.detailInfoData.chartData = chartData;
        });
        //地图上的点位放大居中显示
        if(!info.x||!info.y){
            this.$message.warning('当前视频无点位信息！！！');
        }else{
            this.watchOverlay.setPosition([parseFloat(info.x),parseFloat(info.y)]);
        }
    },
    // 地图点击事件处理器
    videoMapClickHandler({ pixel, coordinate }) {
        const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
        if(feature.get('features')) {
            const clickFeature = feature.get('features')[0];
            if (clickFeature && clickFeature.get('type') == 'rainfall') {
                this.showInfo(clickFeature.get('props'));
                this.watchOverlay.setPosition( coordinate );
            }
        }
    },
    // 地图弹框关闭方法
    closeTip(){
        this.watchOverlay.setPosition( undefined );
    }
  }
}
</script>
<style lang="scss" scoped>
.video-manage {
  height: 100%;
  width: 100%;
  padding-top: 20px;
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
        width: 18px;
        height: 18px;
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
