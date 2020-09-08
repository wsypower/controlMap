<template>
  <div class="manage" flex="dir:top">
    <div class="search-panel">
      <div flex="fir:left cross:center" style="margin-bottom: 10px">
        <label style="width: 80px;">案卷状态：</label>
        <a-radio-group name="recordsStatus" v-model="query.type">
          <a-radio :value="0">所有</a-radio>
          <a-radio :value="1">紧急</a-radio>
          <a-radio :value="2">超期</a-radio>
        </a-radio-group>
      </div>
      <div flex="fir:left cross:center" style="margin-bottom: 10px">
        <label style="width: 80px;">查询时间：</label>
        <a-radio-group name="searchType" v-model="query.timetype">
          <a-radio :value="0">今日</a-radio>
          <a-radio :value="1">本月</a-radio>
          <a-radio :value="2">历史</a-radio>
        </a-radio-group>
      </div>
      <div flex="fir:left cross:center" style="margin-bottom: 10px">
        <label style="width: 80px;">地&emsp;&emsp;区：</label>
        <a-cascader
          :options="addressData"
          @change="onChange"
          placeholder="街道/社区/网格"
          changeOnSelect
          style="width:80%;"
        />
      </div>
      <a-button type="primary" style="width: 100%" @click="onSearch">查询</a-button>
    </div>
    <div class="table_header">
      <span>查询结果</span>
    </div>
    <div class="content_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && dataList.length > 0">
        <div
          v-for="(itemData, index) in dataList"
          :key="index"
          class="item"
          flex
          @click="clickDataItem(itemData,index)"
          :class="{ active: activeIndex === index }"
        >
          <div class="item-left">
            <pin :isActive="activeIndex === index"></pin>
          </div>
          <div class="item-right" flex="cross:center">
            <div class="description-panel">
              <div class="name-panel" :title="itemData.taskcode">【{{ itemData.taskcode }}】</div>
              <div flex>
                <span>类型：</span><span>{{ itemData.type1name }}</span>
              </div>
              <div flex>
                <span>描述：</span><span :title="itemData.eventdesc">{{ itemData.eventdesc }}</span>
              </div>
            </div>
            <div class="photo"><img :src="itemData.url ? itemData.fileServer + itemData.url:''" /></div>
          </div>
        </div>
        <div v-if="totalSize > 20" class="pagination-panel">
          <a-pagination size="small"
            :total="totalSize"
            :showTotal="total => `共 ${total} 条`"
            :pageSize="20"
            :current="query.curpage"
            @change="changePagination"
          />
        </div>
      </cg-container>
      <div v-if="!showLoading && dataList.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div hidden>
      <record-info ref="recordInfo" :code="code" @closeTip="closeTip"></record-info>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions,mapState } from 'vuex'
import Pin from '../../emergency/components/Position.vue';
import RecordInfo from './RecordInfo.vue';
import { pointByCoord } from '@/utils/util.map.manage';
import util from '@/utils/util';
const userId = util.cookies.get('userId');
export default {
  name: 'recordsManage',
  components:{
    Pin,
    RecordInfo
  },
  data(){
    return {
      //地区数据
      addressData: [],
      //各项查询条件
      query: {
        userId: userId,
        type: 0,
        timetype: 0,
        address: [],
        areaId: '',
        streetId: '',
        countryId: '',
        curpage: 1,
        pagesize: 20
      },
      //查询时的过渡效果
      showLoading: false,
      //单页数据
      dataList:[],
      //总数
      totalSize: 0,
      //目前激活的告警
      activeIndex: null,
      //案卷编码
      code: '',
      eventLayer:null
    }
  },
  computed:{
      ...mapState('map', ['mapManager']),
  },
  mounted(){
    this.getAllAddressData({userId: userId}).then(res=>{
      this.addressData = res;
    });
    this.getDataList();
    this.map = this.mapManager.getMap();
    this.map.on('click', this.eventMapClickHandler);
    this.eventOverlay = this.mapManager.addOverlay({
        id:'eventPositionOverlay',
        offset:[0,-20],
        positioning: 'bottom-center',
        element: this.$refs.recordInfo.$el
    });

  },
  methods:{
    ...mapActions('records/manage', ['getAllAddressData','getAllRecordsDataList']),
    //地区改变时触发
    onChange(val){
      console.log('onChange', val);
      this.query.address = val;
      this.query.areaId = val[0]?val[0]:'';
      this.query.streetId = val[1]?val[1]:'';
      this.query.countryId = val[2]?val[2]:'';
    },
    //获取案卷数据
    getDataList(){
      console.log('this.query',this.query);
      this.showLoading = true;
      this.getAllRecordsDataList(this.query).then(res=>{
        this.showLoading = false;
        this.dataList = res.data;
        this.totalSize = res.count;
        this.eventPointHandler(this.dataList);
      });
    },
    //查询(默认显示当天，当前登入的用户)
    onSearch() {
      this.query.curpage = 1;
      this.getDataList()
    },
    //翻页
    changePagination(pageNo, pageSize) {
      console.log('changePagination', pageNo, pageSize);
      this.query.curpage = pageNo;
      this.getDataList()
    },
    clickDataItem(item,index){
      this.activeIndex = index;
      this.code = item.taskcode.toString();
      if(item.x84&&item.y84){
          const coordinate=[parseFloat(item.x84),parseFloat(item.y84)];
          this.eventOverlay.setPosition(coordinate);
          this.mapManager.locateTo(coordinate);
      }else{
          this.eventOverlay.setPosition(undefined);
          this.$message.warning('当前案卷无点位信息！！！');
      }
    },
    playVideo(videoSrc){
      this.videoSrc = videoSrc;
    },
    //关闭地图上的弹窗
    closeTip(){
        this.eventOverlay.setPosition(undefined);
    },
    //地图点击事件
    eventMapClickHandler({ pixel, coordinate }){
        const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);
        if(feature.get('features')) {
            const clickFeature = feature.get('features')[0];
            // const coordinates = clickFeature.getGeometry().getCoordinates();
            if (clickFeature && clickFeature.get('type') == 'eventPosition') {
                this.code = clickFeature.get('props').code;
                this.eventOverlay.setPosition(coordinate);
            }
        }
    },
    // 事件点位处理
    eventPointHandler(list){
        const features=[];
        list.forEach((item)=>{
            if(item.x84&&item.x84.length>0&&item.y84&&item.y84.length>0){
                const feature=pointByCoord([parseFloat(item.x84),parseFloat(item.y84)]);
                feature.set('icon','event');
                feature.set('props',item);
                feature.set('type','eventPosition');
                features.push(feature);
            }
        })
        //加载聚类车辆图层
        if(this.eventLayer){
            this.eventLayer.getSource().clear();
            this.eventLayer.getSource().addFeatures(features);
        }else{
            this.eventLayer = this.mapManager.addClusterLayerByFeatures(features);
            this.eventLayer.set('featureType','eventPosition');
        }
        const extent=this.eventLayer.getSource().getSource().getExtent();
        this.mapManager.getMap().getView().fit(extent);
    }
  }
}
</script>
<style lang="scss" scoped>
.manage {
  height: 100%;
  width: 100%;
  .search-panel {
    padding: 20px 20px 0px 20px;
    /deep/.ant-radio-wrapper {
      width: 70px;
    }
  }
  .table_header {
    padding: 10px 20px 5px 20px;
    span {
      font-family: PingFang-SC-Heavy;
      font-size: 14px;
      letter-spacing: 0px;
      color: #2b90f3;
      &::after {
        content: '';
        border-bottom: 1px dashed #dddddd;
        margin-left: 10px;
        display: inline-block;
        width: 250px;
        vertical-align: middle;
      }
    }
  }
  .content_body {
    background-color: #ffffff;
    height: calc(100% - 70px);
    position: relative;
    .item {
      padding: 16px 20px 18px 20px;
      &:hover,
      &.active {
        background-color: #e9f6ff;
      }
      .item-left {
        width: 25px;
        height: 25px;
        .icon_pin {
          display: inline-block;
          width: 25px;
          height: 25px;
          line-height: 20px;
          text-align: center;
          font-family: PingFang-SC-Heavy;
          font-size: 16px;
          color: #ffffff;
        }
      }
      .item-right {
        width: 100%;
        padding-left: 5px;
        .description-panel {
          flex: 1;
          padding-right: 10px;
          > div {
            font-family: PingFang-SC-Medium;
            font-size: 13px;
            line-height: 20px;
            color: #333333;
            overflow: hidden;
            &:first-child {
              font-family: PingFang-SC-Heavy;
              font-size: 14px;
              line-height: 24px;
              color: #333333;
              margin-bottom: 10px;
              font-weight: 600;
            }
            span:first-child {
              color: #999999;
            }
            span:last-child {
              flex: 1;
              width: 157px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
        .photo {
          width: 100px;
          height: 70px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
      }
    }
    .pagination-panel {
      text-align: right;
      padding: 10px 20px 20px 0px;
    }
    .nodata-panel,
    .spin-panel {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
