<template>
  <div class="video-manage" flex="dir:top">
    <div class="search-panel">
      <my-address @getAddressData="getAddressData"></my-address>
      <div flex="fir:left cross:center" style="margin:10px 0px;">
        <label>监测点名称：</label>
        <a-input placeholder="输入监测点名称" v-model="watchPointName" style="flex:1" />
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
import {videoPointStyle} from '@/utils/util.map.style'
import DetailInfo from './components/DetailInfo.vue'
const userId = util.cookies.get('userId');
export default {
  name: 'manage',
  components:{
    DetailInfo
  },
  data(){
    return {
      //选择的城市---数组形式
      selectedCity: [],
      //监测点名称
      watchPointName: '',
      //展示数据的过渡效果
      showLoading: false,
      //后台传过来的数据
      sourceData: [],
      //查询结果个数
      resultCount: 0,
      //详情需要的所有数据
      detailInfoData: {
        type: 'water',
        name: '',
        detailMessage:[{
          name: '',
          value: 0,
          unit: '',
          yty: '+0',
          mtm: '+0'
        }],
        chartData: []
      },

      //地图相关
      waterFeatures: [],
      waterLayer: null,
      isLoadData: false,
      clusterLayer:null,
        waterOverlay:null
    }
  },
  computed:{
    ...mapState('map', ['mapManager']),
    //获得展示的数据与属性
    treeData:function(){
      let data = JSON.parse(JSON.stringify(this.sourceData));
      this.waterFeatures=[];
      this.resultCount = 0;
      this.changeTreeData(data,'');
      this.isLoadData=!this.isLoadData;
      return data;
    }
  },
  watch:{
    isLoadData:function() {
      if(this.waterFeatures.length>0){
        if(this.waterLayer){
            this.waterLayer.getSource().clear();
            this.waterLayer.getSource().addFeatures(this.carFeatures);
        }else{
            this.waterLayer = this.mapManager.addClusterLayerByFeatures(this.waterFeatures);
            this.waterLayer.set('featureType','videoDistribute');
        }
        const extent=this.waterLayer.getSource().getSource().getExtent();
        this.mapManager.getMap().getView().fit(extent);
      }
    }
  },
  mounted(){
    this.showLoading = true;
    this.map = this.mapManager.getMap();
    this.map.on('click', this.videoMapClickHandler);
    // 地图弹框初始化
    this.waterOverlay = this.mapManager.addOverlay({
        id:'waterSupplyOverlay',
        offset:[0,-20],
        positioning: 'bottom-center',
        element: this.$refs.detailInfo.$el
    });
    this.getAllWaterQMMacTreeData({userId:userId}).then(res=>{
      console.log('getAllWaterQMMacTreeData',res);
      this.sourceData = res.data;
      this.showLoading = false;
    });
  },
  methods:{
    ...mapActions('watersupply/manage', ['getAllWaterQMMacTreeData','getOneWaterQMMacData']),
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
          if(item.online){
            item.slots = {icon: 'equipment'};
          }
          else{
            item.slots = {icon: 'equipment-outline'};
          }
          item.class = 'itemClass';
          this.resultCount++;
          // 通过经纬度生成点位加到地图上
          if(item.x && item.x.length>0 && item.y && item.y.length>0){
            const feature=_this.mapManager.xyToFeature(item.x,item.y);
            feature.set('icon','carmera_online');
            feature.set('props',item);
            feature.set('type','waterSupply');
            _this.waterFeatures.push(feature);
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
      this.getAllWaterQMMacTreeData({userId:userId}).then(res=>{
        console.log('getAllWaterQMMacTreeData',res);
        this.sourceData = res.data;
        this.showLoading = false;
      });
    },

    //点击树中某个节点（某个人员）时触发
    onSelect(selectedKeys, e){
      console.log(selectedKeys, e);
      const obj = e.selectedNodes[0].data.props;
      this.waterOverlay.setPosition([parseFloat(obj.x),parseFloat(obj.y)]);
      this.mapManager.locateTo([parseFloat(obj.x),parseFloat(obj.y)]);
      // 地图上的点位放大居中
      // 获取详情数据
      this.getOneWaterQMMacData({userId:userId}).then(res=>{
        this.detailInfoData = res.data;
        this.detailInfoData.type = 'water';
      });
    },
    videoMapClickHandler({ pixel, coordinate }) {
        const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
        if(feature.get('features')) {
            const clickFeature = feature.get('features')[0];
            // const coordinates=clickFeature.getGeometry().getCoordinates();
            if (clickFeature && clickFeature.get('type') == 'waterSupply') {
                this.waterOverlay.setPosition( coordinate );
                // const videoInfoData = clickFeature.get('props');
            }
        }
    },
    closeTip(){
        this.waterOverlay.setPosition( undefined );
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
