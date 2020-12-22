<template>
  <div class="video-manage" flex="dir:top">
    <div class="search-panel">
      <!--<my-address @getAddressData="getAddressData"></my-address>-->
      <div flex="fir:left cross:center" style="margin-top:10px">
        <label>井盖状态：</label>
        <a-select v-model="query.statusId" style="flex:1">
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="normal">正常</a-select-option>
          <a-select-option value="outline">离线</a-select-option>
          <a-select-option value="warn">警告</a-select-option>
        </a-select>
      </div>
      <div flex="fir:left cross:center" style="margin:10px 0px;">
        <label>详细地址：</label>
        <a-input placeholder="输入详细地址" v-model="query.address" style="flex:1" />
      </div>
      <!--<div flex="fir:left cross:center" style="margin-bottom:10px;">-->
        <!--<label>井盖编号：</label>-->
        <!--<a-input placeholder="输入井盖编号" v-model="query.code" style="flex:1" />-->
      <!--</div>-->
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
          :class="{ active: activeIndex === index, warning: item.statusId === 1, outline: item.statusId === 2 }"
          flex="cross:center main:justify"
          @click="clickDataItem(item, index)"
        >
          <div class="item_left" flex="cross:center">
            <cg-icon-svg name="manhole" class="svg_icon"></cg-icon-svg>
            <span :title="item.address">{{ item.address }}</span>
          </div>
          <div class="item_right" flex="cross:center">
            <span>{{ item.statusName }}</span>
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
      <tip-modal
        ref="manholeOverlay"
        :modalWidth="modalWidth"
        :modalHeight="modalHeight"
        :iconName="iconName"
        :title="modalTitle"
        :subTitle="subTitle"
        :componentId="tipComponentId"
        :info="infoData"
        @closeDialog="closeOverlay"
      ></tip-modal>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState, mapActions, mapMutations } from 'vuex'
import util from '@/utils/util';
import {mixins} from '@/mixins/index'
import ManholeInfo from './components/ManholeInfo'
import { getTypeEquip } from '@/api/map/service'
import { emergencyEquipStyle } from '@/utils/util.map.style'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
const userId = util.cookies.get('userId');
export default {
  name: 'manage',
  mixins: [mixins],
  components:{
  },
  data(){
    return {
      //查询条件
      query: {
        deviceType: 3,
        userId: userId,
        //选择的城市---数组形式
        area: '',
        //井盖状态
        statusId: '',
        //井盖地址
        address: '',
        //井盖编号
        code: '',
        pageNo: 1,
        pageSize: 50
      },
      //目前激活的窨井盖序号
      activeIndex: null,
      //信息窗的宽度
      modalWidth: 300,
      //信息窗的高度
      modalHeight: 180,
      //tipModal弹窗标题上的icon
      iconName: 'manhole',
      //tipModal弹窗标题
      modalTitle: '',
      //tipModal弹窗副标题
      subTitle: '',
      //tipModal弹窗body内组件
      tipComponentId: {},
      //tipModal组件内组件的原始数据
      infoData: {},
      manholeLayer: null,
      manholeOverlay:null
    }
  },
  computed:{
    ...mapState('map', ['mapManager']),
  },
  mounted() {
    this.map = this.mapManager.getMap()
    this.map.on('click', this.manholeClickHandler);
    this.setClickHandler(this.manholeClickHandler);
    this.manholeOverlay = this.mapManager.addOverlay({
      id:'manholeOverlay',
      offset:[0,-20],
      positioning: 'bottom-center',
      element: this.$refs.manholeOverlay.$el
    });
    this.setOverlay(this.manholeOverlay);
    this.getDataList();
  },
  watch: {},
  methods: {
    ...mapActions('drainoffwater/manage', ['getAllManholeMacData']),
    ...mapMutations('map', ['pushPageLayers','setClickHandler','setOverlay']),
    getAddressData(val){
      console.log('selected city data',val);
      this.selectedCity = val;
      this.query.area = val;
    },
    manholeClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature)
      if(feature){
        this.clickDataItem(feature.get('props'),null)
        this.manholeOverlay.setPosition(coordinate);
      }
    },
    //获取预案数据
    getDataList() {
      this.showLoading = true
      const _this=this;
      this.getAllManholeMacData(this.query).then(res => {
        console.log('getAllManholeMacData',res)
        this.sourceData = res.list;
        this.totalSize = res.total;
        this.showLoading = false;
        const data = res.list.map(r => {
            if (r.x.length > 0 && r.y.length > 0){
                const feature = new Feature({
                    geometry: new Point([parseFloat(r.x), parseFloat(r.y)])
                });
                let img;
                if(r.online){
                    img = 'manhole';
                }else{
                    img = 'manhole-lx';
                }
                feature.set('icon',img);
                feature.set('type','manhole');
                feature.set('props',r);
                // feature.set('type',r.deviceType);
                return feature;
            }
        });
        // _this.manholeLayer = _this.mapManager.addVectorLayerByFeatures(data, emergencyEquipStyle('3'), 3);
        _this.manholeLayer = _this.mapManager.addClusterLayerByFeatures(data);
        _this.manholeLayer.set('featureType','manhole');
        _this.map.getView().fit(_this.manholeLayer.getSource().getExtent());
      })
    },
    //搜索关键字查询
    onSearch(val) {
      this.getDataList()
    },

    //翻页
    changePagination(pageNo, pageSize) {
      console.log('changePagination', pageNo, pageSize)
      this.query.pageNo = pageNo
      this.getDataList()
    },

    //选择某个预案
    clickDataItem(item, index) {
      console.log('clickDataItem', item)
      this.activeIndex = index
      const data = item;
      if (data.alarmState === '2') {
        this.$refs.manholeOverlay.$el.style.backgroundImage =
          'linear-gradient(90deg, #f76a63 0%, #f77f6e 50%, #f79378 100%)'
      } else {
        this.$refs.manholeOverlay.$el.style.backgroundImage = 'linear-gradient(90deg, #0065ea 0%, #00a5ff 100%)'
      }
      this.modalTitle = data.address
      this.tipComponentId = ManholeInfo
      this.infoData = data;
      const xy=[parseFloat(data.x), parseFloat(data.y)];
      this.mapManager.locateTo(xy);
      this.manholeOverlay.setPosition(xy);
      console.log('infoData', data);
    },
    closeOverlay() {
      this.manholeOverlay.setPosition(undefined);
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
        height: 16px;
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
