<template>
  <div class="left-message">
    <div class="left-message-title">
      智能垃圾桶
    </div>
    <div class="search-panel">
      <a-input-search placeholder="输入关键词搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
    </div>
    <div class="search-result">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <div class="data-panel" v-else>
        <cg-container scroll v-if="dataArr.length > 0">
          <div
            v-for="(item, index) in dataArr"
            :key="index"
            class="item"
            :class="{ active: activeIndex === index, warning: item.alarmState === '2' }"
            flex="cross:center main:justify"
            @click="clickDataItem(item, index)"
          >
            <div class="item_left">
              <cg-icon-svg name="dustbin" class="svg_icon"></cg-icon-svg>
              <span>{{ item.imei }}</span>
            </div>
            <div class="item_right">
              <span>{{ item.alarmReason }}</span>
              <cg-icon-svg name="pin" class="svg_icon"></cg-icon-svg>
            </div>
          </div>
        </cg-container>
        <div v-else class="none-panel" flex="main:center cross:center">
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
    </div>
    <div hidden>
      <tip-modal
        ref="dustbinOverlay"
        :modalWidth="modalWidth"
        :modalHeight="modalHeight"
        :iconName="iconName"
        :title="modalTitle"
        :subTitle="subTitle"
        :componentId="tipComponentId"
        :info="infoData"
        @closeDialog="closeOverlay()"
      ></tip-modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import DustbinInfo from './components/DustbinInfo'
// import { getTypeEquip } from '@/api/map/service'
import { emergencyEquipStyle } from '@/utils/util.map.style'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
export default {
  name: 'dustbin',
  data() {
    return {
      //查询条件
      query: {
        deviceType: 7,
        searchContent: '', //搜索关键字
        status: '', //状态，‘’代表全部
        pageNo: 1,
        pageSize: 50
      },
      //数据查询中
      showLoading: false,
      //数据存放处
      dataArr: [],
      //总数
      totalSize: 0,
      //目前激活的垃圾桶序号
      activeIndex: null,
      //信息窗的宽度
      modalWidth: 300,
      //信息窗的高度
      modalHeight: 180,
      //tipModal弹窗标题上的icon
      iconName: 'dustbin',
      //tipModal弹窗标题
      modalTitle: '',
      //tipModal弹窗副标题
      subTitle: '',
      //tipModal弹窗body内组件
      tipComponentId: {},
      //tipModal组件内组件的原始数据
      infoData: {},
      dustbinLayer: null,
      map:null,
      dustbinOverlay:null
    }
  },
  components: {
    DustbinInfo
  },
  computed:{
    ...mapState('map', ['mapManager']),
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getDataList();
      // this.getEquipPoints();
      this.map = this.mapManager.getMap()
      this.map.on('click', this.dustbinClickHandler);
      this.setClickHandler(this.dustbinClickHandler);
      this.dustbinOverlay = this.mapManager.addOverlay({
          offset:[0,-20],
          positioning: 'bottom-center',
        element: this.$refs.dustbinOverlay.$el
      });
      this.setOverlay(this.dustbinOverlay);
    })
  },
  watch: {},
  methods: {
    ...mapActions('intelligence/intelligence', ['getDeviceDataList']),
    ...mapMutations('map', ['pushPageLayers','setClickHandler','setOverlay']),
    dustbinClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature)
      if(feature){
        this.clickDataItem(feature.get('info'),null)
        this.dustbinOverlay.setPosition(coordinate);
      }
    },
    //获取垃圾桶数据
    getDataList() {
      this.showLoading = true
      this.getDeviceDataList(this.query).then(res => {
        console.log(res)
        this.dataArr = res.list
        this.totalSize = res.total
        this.showLoading = false
        const features = this.dataArr.map(p => {
            const point = new Feature({
                geometry: new Point([parseFloat(p.longitudeGps84Y),parseFloat(p.latitudeGps84X)])
            });
            point.set('id', p.id);
            point.set('info',p);
            point.set('state',p.alarmState);
            return point;
        });
        this.dustbinLayer = this.mapManager.addVectorLayerByFeatures(features, emergencyEquipStyle('7'), 3);
        this.map.getView().fit(this.dustbinLayer.getSource().getExtent());
        this.pushPageLayers(this.dustbinLayer);
      })
    },
    //获取垃圾桶设备点位
    // getEquipPoints() {
    //   // getTypeEquip('7').then(res => {
    //     console.log('===物联信息-7', res)
    //     const features = res.map(p => {
    //       const point = new Feature({
    //         geometry: new Point(p.position)
    //       });
    //       point.set('id', p.id);
    //       point.set('info',p.info);
    //       point.set('state',p.info.alarmState);
    //       return point;
    //     });
    //     this.dustbinLayer = this.mapManager.addVectorLayerByFeatures(features, emergencyEquipStyle('7'), 3);
    //     this.map.getView().fit(this.dustbinLayer.getSource().getExtent());
    //     this.pushPageLayers(this.dustbinLayer);
    //   // })
    // },
    //搜索关键字查询
    onSearch(val) {
      this.query.searchContent = val
      this.getDataList()
    },

    //翻页
    changePagination(pageNo, pageSize) {
      console.log('changePagination', pageNo, pageSize)
      this.query.pageNo = pageNo
      this.getDataList()
    },

    //选择某个垃圾桶
    clickDataItem(item, index) {
      console.log('clickDataItem', index)
      this.activeIndex = index
      const data = item;
      if (data.alarmState === '2') {
        this.$refs.dustbinOverlay.$el.style.backgroundImage =
          'linear-gradient(90deg, #f76a63 0%, #f77f6e 50%, #f79378 100%)'
      } else {
        this.$refs.dustbinOverlay.$el.style.backgroundImage = 'linear-gradient(90deg, #0065ea 0%, #00a5ff 100%)'
      }
      this.modalTitle = data.imei;
      this.tipComponentId = DustbinInfo;
      this.infoData = data;
      const xy=[parseFloat(data.longitudeGps84Y), parseFloat(data.latitudeGps84X)];
      this.mapManager.locateTo(xy);
      this.dustbinOverlay.setPosition(xy);
    },
    closeOverlay() {
      this.dustbinOverlay.setPosition(undefined);
    }
  }
}
</script>

<style lang="scss" scoped>
.left-message {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  .left-message-title {
    height: 50px;
    width: 100%;
    padding-left: 20px;
    line-height: 50px;
    background-color: #f5f7f8;
    color: #2b90f3;
    font-size: 18px;
    text-align: left;
  }
  .search-panel {
    padding: 20px;
  }
  .search-result {
    width: 100%;
    height: calc(100% - 180px);
    padding: 0px 20px;
    .spin-panel {
      width: 100%;
      height: 100%;
    }
    .data-panel {
      width: 100%;
      height: 100%;
      position: relative;
      .none-panel {
        width: 100%;
        height: 100%;
      }
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
    }
    .pagination-panel {
      text-align: right;
      padding: 20px 0px 10px 0px;
    }
  }
}
</style>
