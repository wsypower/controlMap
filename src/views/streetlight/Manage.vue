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
            <span>{{ item.name }}</span>
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
        :total="totalSize"
        :showTotal="total => `共 ${total} 条`"
        :pageSize="50"
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
        pageSize: 50
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
    this.getEquipPoints();
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
  },
  watch: {},
  methods: {
    ...mapActions('streetlight/manage', ['getAllLightListData','getOneLightMacData']),
    ...mapMutations('map', ['pushPageLayers','setClickHandler','setOverlay']),
    getAddressData(val){
      console.log('selected city data',val);
      this.query.area = val;
    },
    manholeClickHandler({ pixel, coordinate }) {
        const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
        if(feature.get('features')) {
            const clickFeature = feature.get('features')[0];
            // const coordinates=clickFeature.getGeometry().getCoordinates();
            if (clickFeature && clickFeature.get('type') == 'light') {
                this.lightOverlay.setPosition(coordinate);
            }
        }
    },
    //获取预案数据
    getDataList() {
      this.showLoading = true
      this.getAllLightListData(this.query).then(res => {
        this.sourceData = res.list;
        this.totalSize = res.total
        this.showLoading = false
      })
    },
    //获取井盖设备点位
    getEquipPoints() {
      getTypeEquip('3').then(res => {
        console.log('===物联信息-3', res)
        const features = res.map(p => {
          const point = new Feature({
            geometry: new Point(p.position)
          });
          point.set('id', p.id);
          point.set('info',p.info);
          point.set('state',p.info.alarmState);
          point.set('type','light');
          point.set('icon','carmera_online');
          return point;
        });
        // this.lightLayer = this.mapManager.addVectorLayerByFeatures(features, emergencyEquipStyle('3'), 3);
        this.lightLayer = this.mapManager.addClusterLayerByFeatures(features);
        this.lightLayer.set('featureType','light');
        const extent=this.lightLayer.getSource().getSource().getExtent();
        this.mapManager.getMap().getView().fit(extent);
        // this.pushPageLayers(this.lightLayer);
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
      this.lightOverlay.setPosition([parseFloat(item.x),parseFloat(item.y)]);
      this.mapManager.locateTo([parseFloat(item.x),parseFloat(item.y)]);
      this.activeIndex = index;
      //detailInfoData
      this.detailInfoData.type = 'light';
      this.detailInfoData.detailMessage.name = item.name;
      this.detailInfoData.detailMessage.online = item.online;
      this.detailInfoData.detailMessage.unit = '度';
      this.detailInfoData.detailMessage.flagName = '耗电量';
      console.log('macId: '+ item.id);
      this.getOneLightMacData({userId: userId, macId: item.id}).then( res =>{
        let chartData = res.reduce((acc,item) => {
          acc[0].push(item.dayTime);
          acc[1].push(item.value);
          return acc
        },[[],[]]);
        this.detailInfoData.chartData = chartData;
      })
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
          max-width: 150px;
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
    padding: 20px 0px 10px 0px;
  }
}
</style>
