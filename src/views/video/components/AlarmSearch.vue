<template>
  <div class="alarm-search" flex="dir:top">
    <div class="search-panel">
      <div flex="fir:left cross:center" style="margin-bottom: 10px">
        <label style="width: 90px;">查询时间：</label>
        <a-range-picker v-model="dayRange" format="YYYY-MM-DD" style="width: 100%" />
      </div>
      <div flex="fir:left cross:center" style="margin-bottom: 10px">
        <label style="width: 90px;">告警类型：</label>
        <a-select v-model="query.alarmTypeId" showSearch placeholder="请选择" style="width: 100%">
          <a-select-option value="" :key="-1">所有</a-select-option>
          <a-select-option v-for="(alarmType, index) in alarmTypeList" :value="alarmType.id" :key="index">{{
            alarmType.name
          }}</a-select-option>
        </a-select>
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
          @click="clickDataItem(index)"
          :class="{ active: activeIndex === index }"
        >
          <div class="item-left">
            <pin :content="index" :isActive="activeIndex === index"></pin>
          </div>
          <div class="item-right" flex="dir:top">
            <div class="top" flex="cross: center main:justify">
              <div class="name-panel" :title="itemData.name">告警类型：{{ itemData.typeName }}</div>
              <div class="camera-panel">
                <span class="icon_camera" @click="playVideo(itemData.videoSrc)"></span>
              </div>
            </div>
            <div class="item_body" flex="cross:center">
              <div class="description-panel">
                <div flex>
                  <span>时间：</span
                  ><span v-if="itemData.dayTime">{{
                    new Date(parseInt(itemData.dayTime)) | date_format('YYYY-MM-DD HH:mm')
                  }}</span>
                </div>
                <div flex>
                  <span>地点：</span><span>{{ itemData.position }}</span>
                </div>
                <div flex>
                  <span>监控名称：</span><span>{{ itemData.cameraName }}</span>
                </div>
              </div>
              <div class="photo"><img :src="itemData.photoUrl" /></div>
            </div>
          </div>
        </div>
        <div v-if="dataList.length > 20" class="pagination-panel">
          <a-pagination
            :total="totalSize"
            :showTotal="total => `共 ${total} 条`"
            :pageSize="20"
            :defaultCurrent="1"
            @change="changePagination"
          />
        </div>
      </cg-container>
      <div v-if="!showLoading && dataList.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div class="player-panel active">
      <my-video-player :videoSrc.sync="videoSrc" :multiple="false"></my-video-player>
    </div>
    <div hidden>
      <alarm-info
              ref="alarmInfo"
              :info="alarmInfoData"
              @closeTip="closeTip"
      ></alarm-info>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState,mapActions } from 'vuex'
import moment from 'moment';
import Pin from '../../emergency/components/Position.vue';
import MyVideoPlayer from "./MyVideoPlayer.vue";
import AlarmInfo from './AlarmInfo.vue';
import {alarmPointStyle} from '@/utils/util.map.style'
export default {
  name: 'alarmSearch',
  components:{
    Pin,
    MyVideoPlayer,
    AlarmInfo
  },
  data(){
    return {
      //告警类型
      alarmTypeList: [],
      //各项查询条件
      query: {
        startDay: '',
        endDay: '',
        alarmTypeId: '',
        pageNo: 1,
        pageSize: 20
      },
      //查询的时间范围
      dayRange: [],
      //查询时的过渡效果
      showLoading: false,
      //单页数据
      dataList:[],
      //总数
      totalSize: 0,
      //目前激活的告警
      activeIndex: 0,
      //视频播放源
      videoSrc: '',
      //告警信息查询展示
      alarmInfoData:{
        id: '',
        photoUrl: '',
        position: '',
        dayTime: null,
        type: ''
      },
        alarmFeatures:[],
        alarmLayer:null,
        alarmOverlay:null
    }
  },
  computed:{
      ...mapState('map', ['mapManager']),
      //获得展示的数据与属性
      treeData:function(){
          let data = JSON.parse(JSON.stringify(this.sourceData));
          this.carFeatures=[];
          this.allCarData = [];
          this.changeTreeData(data,'');
          this.isLoadData=!this.isLoadData;
          return data
      }
  },
  mounted(){
    this.getAllAlarmTypeDataList().then(res=>{
      this.alarmTypeList = res.data;
    });
    this.map = this.mapManager.getMap();
    this.map.on('click', this.alarmMapClickHandler);
    this.alarmOverlay = this.mapManager.addOverlay({
        id:'alarmOverlay',
        offset:[0,-20],
        positioning: 'bottom-center',
        element: this.$refs.alarmInfo.$el
    });
    let day = moment(new Date()).format('YYYY-MM-DD');
    this.dayRange = [moment(day, 'YYYY-MM-DD'),moment(day, 'YYYY-MM-DD')];
    this.query.startDay = day;
    this.query.endDay = day;
    this.getDataList();
  },
  methods:{
    ...mapActions('video/manage', ['getAllAlarmTypeDataList','getAllAlarmDataList']),
    //获取人员轨迹数据
    getDataList(){
        const _this=this;
      console.log('this.query',this.query);
      this.showLoading = true;
      this.getAllAlarmDataList(this.query).then(res=>{
        this.showLoading = false;
        this.dataList = res.data.list;
          _this.alarmFeatures=this.dataList.map((d)=>{
              if(d.x&&d.x.length>0&&d.y&&d.y.length>0){
                  const feature = _this.mapManager.xyToFeature(d.x,d.y);
                  feature.set('props',d);
                  return feature;
              }
          });
        if(this.alarmFeatures.length>0){
            _this.alarmLayer = _this.mapManager.addVectorLayerByFeatures(this.alarmFeatures,alarmPointStyle(),3);
            _this.alarmLayer.set('featureType','alarmSearch');
            _this.mapManager.getMap().getView().fit(_this.alarmLayer.getSource().getExtent());
        }
        this.totalSize = res.data.total;
      });
    },
    //查询(默认显示当天，当前登入的用户)
    onSearch() {
      this.query.startDay = moment(this.dayRange[0]._d).format("YYYY-MM-DD");
      this.query.endDay = moment(this.dayRange[1]._d).format("YYYY-MM-DD");
      this.query.pageNo = 1;
      this.getDataList();
    },
    //翻页
    changePagination(pageNo, pageSize) {
      console.log('changePagination', pageNo, pageSize);
      this.query.pageNo = pageNo;
      this.getDataList();
    },
    clickDataItem(index){
      this.activeIndex = index;
      this.alarmInfoData = this.dataList[index];
      this.alarmOverlay.setPosition([parseFloat(this.alarmInfoData.x),parseFloat(this.alarmInfoData.y)])
    },
    playVideo(videoSrc){
      this.videoSrc = videoSrc;
    },
    //地图上告警点位图标点击事件处理器
    alarmMapClickHandler({ pixel, coordinate }){
        const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature)
        if(feature){
            this.alarmInfoData=feature.get('props');
            this.alarmOverlay.setPosition(coordinate);
        }
    },
    //关闭地图上的弹窗
    closeTip(){
        this.alarmOverlay.setPosition(undefined);
    }
  },
    beforeDestroy(){
      console.log('tttttttttttttttttt');
    }
}
</script>
<style lang="scss" scoped>
.alarm-search {
  height: 100%;
  width: 100%;
  .search-panel {
    padding: 20px;
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
        position: relative;
        .top {
          height: 20px;
          width: 100%;
          .name-panel {
            font-family: PingFang-SC-Heavy;
            font-size: 14px;
            color: #333333;
            max-width: 155px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .camera-panel {
            cursor: pointer;
            .icon_camera {
              display: inline-block;
              width: 20px;
              height: 20px;
              background: url('~@img/globel-eye.png') no-repeat;
            }
          }
        }
        .item_body {
          margin: 8px 0px 0px 0px;
          max-height: 200px;
          .description-panel {
            flex: 1;
            padding-right: 10px;
            > div {
              font-family: PingFang-SC-Medium;
              font-size: 13px;
              line-height: 20px;
              color: #333333;
              overflow: hidden;
              span:first-child {
                //width: 50px;
                color: #999999;
              }
              span:last-child {
                //width: 100%;
                flex: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
              }
            }
          }
          .photo {
            width: 84px;
            height: 60px;
            img {
              width: 100%;
            }
          }
        }
      }
    }
    .pagination-panel {
      text-align: right;
      padding: 20px 20px 0px 0px;
    }
    .nodata-panel,
    .spin-panel {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
