<template>
  <div class="video-manage" flex="dir:top">
    <div class="search-panel">
      <my-address @getAddressData="getAddressData"></my-address>
      <div flex="fir:left cross:center" style="margin:10px 0px;">
        <label>路灯搜索：</label>
        <a-input placeholder="输入路灯名称" v-model="query.lightName" style="flex:1" />
      </div>
      <a-button type="primary" style="width: 100%;margin-bottom: 10px;" @click="onSearch">查询</a-button>
      <div>共计{{ totalSize }}个查询结果</div>
    </div>
    <div class="yuan_dialog_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && sourceData.length > 0">
        <div
          v-for="(item, index) in sourceData"
          :key="index"
          class="item"
          :class="{ active: activeIndex === index, outline: !item.online }"
          flex="cross:center main:justify"
          @click="clickDataItem(item, index)"
        >
          <div class="item_left">
            <cg-icon-svg name="zhld" class="svg_icon"></cg-icon-svg>
            <span :title="item.name">{{ item.name }}</span>
          </div>
          <div class="item_right">
            <span>{{ item.online ? '在线' : '离线' }}</span>
            <cg-icon-svg name="pin" class="svg_icon"></cg-icon-svg>
          </div>
        </div>
      </cg-container>
      <div v-if="!showLoading && sourceData.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div class="pagination-panel">
      <a-pagination
        size="small"
        :total="totalSize"
        :pageSize="query.pageSize"
        :defaultCurrent="1"
        @change="changePagination"
      />
    </div>
    <div hidden>
      <detail-info ref="detailInfo" :info="detailInfoData" @closeTip="closeTip"></detail-info>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState, mapActions, mapMutations } from 'vuex'
import util from '@/utils/util';
import {mixins} from '@/mixins/index'
import DetailInfo from '../common/DetailInfo.vue'
import { getTypeEquip } from '@/api/map/service'
import { emergencyEquipStyle } from '@/utils/util.map.style'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
const userId = util.cookies.get('userId');
export default {
  name: 'manage',
  mixins: [mixins],
  components:{ DetailInfo },
  data(){
    return {
      //查询条件
      query: {
        deviceType: 3,
        userId: userId,
        //选择的城市
        area: '',
        //路灯名称
        lightName: '',
        pageNo: 1,
        pageSize: 100
      },

      //目前激活的路灯序号
      activeIndex: null,

      lightLayer: null,
      lightOverlay:null
    }
  },
  computed:{
    ...mapState('map', ['mapManager']),
  },
  mounted() {
    this.map = this.mapManager.getMap()
    this.map.on('click', this.manholeClickHandler);
    this.setClickHandler(this.manholeClickHandler);
    this.lightOverlay = this.mapManager.addOverlay({
        id:'lightOverlay',
        offset:[0,-20],
        positioning: 'bottom-center',
      element: this.$refs.detailInfo.$el
    });
    this.getDataList();
    this.getAllMapLightData();
  },
  watch: {},
  methods: {
    ...mapActions('streetlight/manage', ['getAllLightListData','getOneLightMacData']),
    ...mapMutations('map', ['pushPageLayers','setClickHandler','setOverlay']),
    getAddressData(val){
      console.log('selected city data',val);
      this.query.area = val;
    },
    //获取路灯分页数据
    getDataList() {
      this.showLoading = true
      this.getAllLightListData(this.query).then(res => {
        this.sourceData = res.list;
        this.totalSize = res.total
        this.showLoading = false;
      })
    },
    //获取路灯全部地图数据
    getAllMapLightData() {
      const _this=this;
      this.getAllLightListData({userId:userId,area:this.query.area,lightName:'', pageNo:1,pageSize:100000}).then(res => {
        const data = res.list.map(r => {
          if (r.x.length > 0 && r.y.length > 0){
            const feature = new Feature({
              geometry: new Point([parseFloat(r.x), parseFloat(r.y)])
            });
            let img;
            if(r.online){
              img = 'streetlight';
            }else{
              img = 'streetlight-lx';
            }
            feature.set('icon',img);
            feature.set('type','light');
            feature.set('props',r);
            return feature;
          }
        });
        if(_this.lightLayer){
          _this.lightLayer.getSource().getSource().clear();
          _this.lightLayer.getSource().getSource().addFeatures(data);
        }else{
          _this.lightLayer = _this.mapManager.addClusterLayerByFeatures(data);
          _this.lightLayer.set('featureType','waterLevel');
        }
        const extent=_this.lightLayer.getSource().getSource().getExtent();
        _this.mapManager.getMap().getView().fit(extent);
      })
    },
    //搜索关键字查询
    onSearch() {
      this.getDataList()
    },
    //翻页
    changePagination(pageNo, pageSize) {
      console.log('changePagination', pageNo, pageSize)
      this.query.pageNo = pageNo
      this.getDataList()
    },

    //选择某个路灯
    clickDataItem(item, index) {
      console.log('clickDataItem', item);
      this.activeIndex = index;
      this.showInfo(item);
      this.lightOverlay.setPosition([parseFloat(item.x),parseFloat(item.y)]);
      this.mapManager.locateTo([parseFloat(item.x),parseFloat(item.y)]);
    },
    // 地图上弹框显示事件
    showInfo(info){
        //detailInfoData
        this.detailInfoData.type = 'light';
        this.detailInfoData.detailMessage.name = info.name;
        this.detailInfoData.detailMessage.online = info.online;
        this.detailInfoData.detailMessage.unit = '度';
        this.detailInfoData.detailMessage.flagName = '耗电量';
        console.log('macId: '+ info.id);
        this.getOneLightMacData({userId: userId, macId: info.id}).then( res =>{
            let chartData = res.reduce((acc,item) => {
                acc[0].push(item.dayTime);
                acc[1].push(item.value);
                return acc
            },[[],[]]);
            this.detailInfoData.chartData = chartData;
        })
    },
    // 井盖图标点击处理器
    manholeClickHandler({ pixel, coordinate }) {
        const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
        if(feature.get('features')) {
            const clickFeature = feature.get('features')[0];
            // const coordinates=clickFeature.getGeometry().getCoordinates();
            if (clickFeature && clickFeature.get('type') == 'light') {
                this.showInfo(clickFeature.get('props'));
                this.lightOverlay.setPosition(coordinate);
            }
        }
    },
    closeTip(){
        this.lightOverlay.setPosition(undefined);
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
    .item {
      width: 100%;
      height: 40px;
      margin-top: 2px;
      background-color: #f5f7f8;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #333333;
      cursor: pointer;
      &.active {
        background-color: #e9f6ff;
      }
      &.warning {
        color: #f07171;
        .item_left {
          .svg_icon {
            color: #f07171;
          }
        }
      }
      &.outline {
        color: #cccccc;
        .item_left {
          .svg_icon {
            color: #cccccc;
          }
        }
      }
      .svg_icon {
        width: 16px;
        height: 14px;
      }
      .item_left {
        margin-left: 10px;
        .svg_icon {
          color: #2b8ff3;
        }
        span {
          display: inline-block;
          max-width: 210px;
          margin-left: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: middle;
        }
      }
      .item_right {
        margin-right: 10px;
        .svg_icon {
          color: #2b8ff3;
        }
        span {
          display: inline-block;
          max-width: 100px;
          margin-right: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: middle;
        }
      }
    }
    .nodata-panel,
    .spin-panel {
      width: 100%;
      height: 100%;
    }
  }
  .pagination-panel {
    text-align: right;
    padding-top: 10px;
  }
}
</style>
