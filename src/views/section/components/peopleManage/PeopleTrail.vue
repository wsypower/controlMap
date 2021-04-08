<template>
  <div class="people-trail" flex="dir:top">
    <div class="search-panel">
      <div flex="fir:left cross:center">
        <label style="width: 70px;">选择人员：</label>
        <a-select v-model="query.userDisplayId" showSearch placeholder="请选择" style="flex:1;width: 246px;">
          <a-select-option v-for="(people, index) in peopleDataList" :value="people.userDisplayId" :key="index">{{ people.name }}（{{ people.dept }}）</a-select-option>
        </a-select>
      </div>
      <div flex="fir:left cross:center" style="margin:10px 0px;">
        <label style="width: 90px;">查询时间：</label>
        <a-range-picker v-model="dayRange" :show-time="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm" style="width: 100%" />
      </div>
      <a-button type="primary" style="width: 100%" @click="onSearch">查询</a-button>
    </div>
    <div class="table_header">
      <span>序号</span>
      <div>
        <span>时间</span>
        <span class="sort-icon">
          <i @click="onSort('desc')">
            <cg-icon-svg name="caret-up" class="svg_icon_up" :class="{ active: activeName === 'desc' }"></cg-icon-svg>
          </i>
          <i @click="onSort('asc')">
            <cg-icon-svg name="caret-down" class="svg_icon_down" :class="{ active: activeName === 'asc' }"></cg-icon-svg>
          </i>
        </span>
      </div>
      <div>
        <a-select v-if="!showLoading && dataList.length > 0" v-model="intervalTime" placeholder="请选择" @change="intervalTimeChange">
          <a-select-option :value="0">全部</a-select-option>
          <a-select-option :value="30000">30秒</a-select-option>
          <a-select-option :value="60000">1分钟</a-select-option>
          <a-select-option :value="120000">2分钟</a-select-option>
          <a-select-option :value="180000">3分钟</a-select-option>
          <a-select-option :value="240000">4分钟</a-select-option>
          <a-select-option :value="300000">5分钟</a-select-option>
        </a-select>
      </div>
      <div class="play-tool" v-if="!showLoading && dataList.length > 0">
        <a-icon v-show="!isPlayingTrack" type="play-circle" theme="filled" @click="playHandler" />
        <a-icon v-show="isPlayingTrack" type="pause-circle" theme="filled" @click="playHandler" />
      </div>
    </div>
    <div class="content_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container ref="cgContainer" scroll v-if="!showLoading && dataList.length > 0">
        <div class="item" :class="{ active: trackIndex === index }" flex="dir:left main:left" v-for="(item, index) in dataList" :id="'trackItem' + index" :key="index" @click="trackItemClick(index)">
          <div flex="cross:center main:center">
            <span>{{ index + 1 }}</span>
          </div>
          <div flex="cross:center main:center">
            <span>{{ item.time }}</span>
            <!-- <p><span class="dot green"></span>{{ item.coordinates[0].time }}</p>
            <p><span class="dot red"></span>{{ item.coordinates[item.coordinates.length-1].time }}</p> -->
          </div>
          <!-- <div flex="cross:center main:center"> -->
          <!--<div @click="trackPlayHandler(item, index)">-->
          <!--<a-icon v-show="item.isStart" type="pause-circle" theme="filled" @click="trackPlayHandler(item, index)" />-->
          <!--</div>-->
          <!--<cg-icon-svg name="telephone" class="svg_icon_telephone" @click="onSort('desc')"></cg-icon-svg>-->
          <!--  <a-icon v-show="!item.isStart" type="play-circle" theme="filled" @click="trackPlayHandler(item, index)" />
            <a-icon v-show="item.isStart" type="pause-circle" theme="filled" @click="trackPlayHandler(item, index)" /> -->
          <!-- </div> -->
        </div>
        <!--<div v-if="dataList.length > 20" class="pagination-panel">-->
        <!--<a-pagination-->
        <!--:total="totalSize"-->
        <!--:showTotal="total => `共 ${total} 条`"-->
        <!--:pageSize="20"-->
        <!--:defaultCurrent="1"-->
        <!--@change="changePagination"-->
        <!--/>-->
        <!--</div>-->
      </cg-container>
      <div v-if="!showLoading && dataList.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <div hidden>
      <a-card ref="trailTimeCard" :bodyStyle="cardBodyStyle" style="width: 150px;" title="时间" :headStyle="cardHeadStyle">
        <a-icon type="close" slot="extra" @click="timeCardClose" />
        <div>{{ trailTimeData }}</div>
      </a-card>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions, mapState } from 'vuex'
import { getDistance } from 'ol/sphere'
import { Style, Icon, Stroke } from 'ol/style'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import Feature from 'ol/Feature'
import { Point, LineString } from 'ol/geom'
import moment from 'moment';
import util from '@/utils/util';
import { stampConvertToTime } from '@/utils/util.tool';
import { trackByLocationList, pointByCoord } from '@/utils/util.map.manage';
import { trackStyle, trackPointStyle, alarmPointStyle } from '@/utils/util.map.style';
import { TrackPlaying } from '@/utils/util.map.trackPlaying'
export default {
  name: 'peopleTrail',
  props: {
    infoId: {
      type: String,
      default: ''
    },
    peopleDataList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      //各项查询条件
      query: {
        userId: '',
        userDisplayId: '',
        startTime: '',
        endTime: '',
        sortType: 'desc',
      },
      //查询的时间范围
      dayRange: [],
      //查询时的过渡效果
      showLoading: false,
      //正序asc、倒序desc
      activeName: 'desc',
      //单页数据
      dataList: [],
      resultList: [],
      //总数
      totalSize: 0,
      trackSegments: [],
      currentQueryTracks: [],
      trackLayer: null,
      eventFeatures: [],
      eventLayer: null,
      trackPlaying: null,
      isPlayingTrack: null,
      trackIndex: 0,
      trailOverlay: null,
      trailTimeData: {},
      cardBodyStyle: { 'padding': '8px', 'text-align': 'center' },
      cardHeadStyle: { 'min-height': '35px', 'padding': '0 12px' },
      routeLayer: null,
      lineFeature: null,
      posFeature: null,
      posImageName: '1',
      rotationTrue: 0,
      intervalTime: 0
    }
  },
  computed: {
    ...mapState('map', ['mapManager'])
  },
  mounted() {
    this.map = this.mapManager.getMap();
    let userId = '';
    if (this.infoId) {
      userId = this.infoId;
    } else {
      userId = util.cookies.get('userId');
    }
    let temp = this.peopleDataList.find(item => item.id === userId);
    if (temp) {
      this.query.userId = userId;
      this.query.userDisplayId = temp.userDisplayId;
    } else {
      this.query.userId = userId;
      this.query.userDisplayId = this.peopleDataList[0].userDisplayId;
      // this.query.userDisplayId = '';
    }

    // let day = moment(new Date()).format('YYYY-MM-DD HH:mm');
    this.dayRange = [moment().startOf('day').format('YYYY-MM-DD HH:mm'), moment().endOf('day').format('YYYY-MM-DD HH:mm')];
    // this.query.startTime = new Date(day).getTime();
    // this.query.endTime = new Date(day).getTime();
    this.query.startTime = moment().startOf('day').valueOf();
    this.query.endTime = moment().endOf('day').valueOf();

    this.trailOverlay = this.mapManager.addOverlay({
      id: 'peopleTrailOverlay',
      offset: [0, -20],
      positioning: 'bottom-center',
      element: this.$refs.trailTimeCard.$el
    });
    this.map.on('click', this.trailTimeClickHandler);

    this.getDataList();
  },
  watch: {
    infoId: function(val) {
      if (val) {
        console.log('infoId', val);
        let temp = this.peopleDataList.find(item => item.id === val);
        this.query.userId = val;
        this.query.userDisplayId = temp.userDisplayId;
      }
      // let day = moment(new Date()).format('YYYY-MM-DD HH:mm');
      this.dayRange = [moment().startOf('day').format('YYYY-MM-DD HH:mm'), moment().endOf('day').format('YYYY-MM-DD HH:mm')];
      // this.query.startTime = new Date(day).getTime();
      // this.query.endTime = new Date(day).getTime();
      this.query.startTime = moment().startOf('day').valueOf();
      this.query.endTime = moment().endOf('day').valueOf();
      this.getDataList();
    }
  },
  methods: {
    ...mapActions('section/manage', ['getUserTrailDataList', 'getTrailDetailData']),
    //获取人员轨迹数据
    getDataList() {
      console.log('this.query', this.query);
      this.showLoading = true;
      this.getUserTrailDataList(this.query).then(res => {
        this.showLoading = false;
        let index = 0;
        this.resultList = res.map(item => {
          item.isStart = false;
          item.hasDetail = false;
          item.index = index;
          item.time = stampConvertToTime(item.gpstime);
          index++;
          return item;
        });
        this.trackResultHandler();
        // this.totalSize = res.data.total;
      });
    },
    intervalTimeChange() {
      this.timeCardClose();
      this.routeClear();
      this.map.removeLayer(this.trackLayer);
      this.map.removeLayer(this.eventLayer);
      this.trackResultHandler();
    },
    trackResultHandler() {
      this.dataList = [];
      let index = 0;
      if (this.intervalTime > 0) {
        this.resultList.forEach(item => {
          if (index == 0) {
            this.dataList.push(item);
            index++;
          } else {
            const preItem = this.dataList[this.dataList.length - 1];
            if ((item.gpstime - preItem.gpstime) > this.intervalTime) {
              this.dataList.push(item);
              this.dataList[this.dataList.length - 1].index = index;
              index++;
            }
          }
        });
      } else {
        this.dataList = this.resultList;
      }
      if (this.dataList.length > 0) {
        this.trackDataHandler(this.dataList);
        const trackLineFeature = trackByLocationList(this.dataList);
        this.trackLayer = this.mapManager.addVectorLayerByFeatures(trackLineFeature, trackStyle(), 3);
        this.trackLayer.set('featureType', 'PeopleTrail');
        this.eventLayer = this.mapManager.addVectorLayerByFeatures(this.eventFeatures, trackPointStyle(), 3);
        this.eventLayer.set('featureType', 'PeopleTrail');
        this.mapManager.getMap().getView().fit(this.trackLayer.getSource().getExtent());
        this.routeLayer = new VectorLayer({
          zIndex: 99,
          source: new VectorSource(),
          style: feature => {
            if (feature.getGeometry().getType() == 'Point') {
              return new Style({
                image: new Icon({
                  src: require(`@/assets/mapImage/track/people/${this.posImageName}.png`),
                  scale: 0.3,
                  anchor: [0.5, 1],
                  rotateWithView: false,
                  rotation: this.rotationTrue
                })
              });
            } else {
              return new Style({
                stroke: new Stroke({
                  color: 'blue',
                  width: 4
                })
              });
            }
          }
        });
        this.lineFeature = new Feature({
          geometry: new LineString([])
        });
        this.posFeature = new Feature({
          geometry: new Point([0, 0])
        });
        this.routeLayer.set('featureType', 'trackLine');
        this.routeLayer.getSource().addFeatures([this.lineFeature, this.posFeature]);
        this.map.addLayer(this.routeLayer);
        this.$nextTick(() => {
          this.$refs.cgContainer.scrollToTop();
        });
      } else {
        this.$message.warning('未查询到轨迹数据！！！');
      }
    },
    // 传过来的轨迹点位分段处理并保存
    trackDataHandler(coords) {
      this.trackSegments = [];
      this.currentQueryTracks = [];
      this.eventFeatures = [];
      // 按间隔时间轨迹分段
      let currentCoord = coords[0];
      let nextCoord = null;
      // let lineCoordinates = [];
      let lineCoords = [];
      // lineCoordinates.push(currentCoord); // 加载第一个点
      lineCoords.push([parseFloat(currentCoord.gpsx), parseFloat(currentCoord.gpsy)]);
      if (currentCoord.operate == "2" || currentCoord.operate == "0" || currentCoord.operate == "1" ||
        currentCoord.operate == "5" || currentCoord.operate == "99") { //上报、签到、签退、核查、普通轨迹点
        const feature = pointByCoord([parseFloat(currentCoord.gpsx), parseFloat(currentCoord.gpsy)]);
        feature.setProperties(currentCoord);
        this.eventFeatures.push(feature);
      }
      // let isOvertime = false;
      // let isDeletePosition = false;
      // let stayPosition = currentCoord;
      for (let i = 1; i < coords.length; i++) {
        nextCoord = coords[i];
        // const distance = getDistance([parseFloat(stayPosition.gpsx), parseFloat(stayPosition.gpsy)], [parseFloat(nextCoord.gpsx), parseFloat(nextCoord.gpsy)]);
        // if (isOvertime) {
        //   if (distance < 200) {
        //     if (isDeletePosition) {
        //       console.log('delete------------------------------')
        //       const coordIndex = this.dataList.indexOf(nextCoord);
        //       if (coordIndex > -1) {
        //         this.dataList.splice(coordIndex, 1);
        //       }
        //       // currentCoord = nextCoord;
        //       // continue;
        //     } else {
        //       if (nextCoord.gpstime - stayPosition.gpstime >= 60 * 1000 * 10) {
        //         isDeletePosition = true;
        //         nextCoord.isOvertime = true;
        //         nextCoord.text = stayPosition.time;
        //       }
        //     }
        //   } else {
        //     isOvertime = false;
        //     if (isDeletePosition) {
        //       isDeletePosition = false;
        //       nextCoord.isOvertime = true;
        //       nextCoord.text = stayPosition.time;
        //     }
        //     stayPosition = nextCoord;
        //   }
        // } else {
        //   if (distance < 200) {
        //     isOvertime = true;
        //     stayPosition = coords[i - 1];
        //     if (nextCoord.gpstime - stayPosition.gpstime >= 60 * 1000 * 10) {
        //       isDeletePosition = true;
        //       nextCoord.isOvertime = true;
        //     }
        //   }
        // }
        if (nextCoord.operate == "2" || nextCoord.operate == "0" || nextCoord.operate == "1" || nextCoord.operate == "5" || i % 1 == 0) { //配置轨迹点抽稀
          const feature = pointByCoord([parseFloat(nextCoord.gpsx), parseFloat(nextCoord.gpsy)]);
          feature.setProperties(nextCoord);
          this.eventFeatures.push(feature);
        }
        // if (nextCoord.operate == "99") { //只串联普通轨迹点
        //   if (nextCoord.gpstime - currentCoord.gpstime <= 60 * 1000 * 30) { // 小于间隔时间 30分钟
        // lineCoordinates.push(nextCoord); // 加入当前线段
        lineCoords.push([parseFloat(nextCoord.gpsx), parseFloat(nextCoord.gpsy)])
        //   } else { // 大于间隔时间
        //     if (lineCoordinates.length > 3) {
        //       this.trackSegments.push({
        //         coordinates: lineCoordinates,
        //         isStart: false
        //       });
        // this.currentQueryTracks.push(lineCoords);
        //     } else { //如果轨迹点数小于3的则不计入轨迹段中

        //     }
        //     lineCoordinates = [];
        //     lineCoords = [];
        //     // 将下一个线段的第一点加入
        //     lineCoordinates.push(nextCoord); // 加入当前线段
        //     lineCoords.push([parseFloat(nextCoord.gpsx), parseFloat(nextCoord.gpsy)]);
        //   }
        // }
        // currentCoord = nextCoord;
      }
      // 处理最后一次
      // if (lineCoordinates.length > 0) {
      //   this.trackSegments.push({
      //     coordinates: lineCoordinates,
      //     isStart: false
      //   });
      this.currentQueryTracks.push(lineCoords);
      // }
      // console.log('轨迹=====', this.trackSegments);
    },
    playHandler() {
      this.isPlayingTrack = !this.isPlayingTrack;
      if (this.isPlayingTrack) {
        this.routePlay();
        this.routeTimer = setInterval(() => {
          this.routePlay();
        }, 1 * 1000);
      } else {
        this.routePause();
      }
    },
    changePosImage() {
      if (this.trackIndex > 1) {
        const curCoords = this.currentQueryTracks[0][this.trackIndex];
        const preCoords = this.currentQueryTracks[0][this.trackIndex - 1];
        let x = curCoords[0],
          y = curCoords[1];
        let x1 = preCoords[0],
          y1 = preCoords[1];
        let dx = x - x1,
          dy = y - y1;
        if ((dx && dy) && (dx != 0 || dy != 0)) {
          const rotation = Math.atan2(dy, dx);
          const PI = Math.PI;
          let rotationTrue = 0;
          let suffix = '';
          if (rotation >= 0 && rotation < PI / 2) {
            rotationTrue = -rotation;
            suffix = '';
          } else if (rotation >= PI / 2 && rotation < PI) {
            rotationTrue = (PI - rotation);
            suffix = 'bak';
          } else if (rotation >= -PI && rotation < -PI / 2) {
            rotationTrue = -(rotation + PI);
            suffix = 'bak';
          } else if (rotation >= -PI / 2 && rotation < 0) {
            suffix = '';
            rotationTrue = (-rotation);
          }
          const num = this.trackIndex % 20 + 1;
          this.posImageName = num + suffix;
          this.rotationTrue = rotationTrue;
        }
      }
    },
    routePlay() {
      this.trackIndex++;
      this.$refs.cgContainer.scrollToElement(document.getElementById(`trackItem${this.trackIndex}`));
      const coords = this.currentQueryTracks[0][this.trackIndex];
      this.lineFeature.getGeometry().appendCoordinate(coords);
      this.changePosImage();
      this.posFeature.setGeometry(new Point(coords));
    },
    routePause() {
      this.isPlayingTrack = false;
      clearInterval(this.routeTimer);
    },
    trackItemClick(index) {
      this.trackIndex = index;
      const coords = this.currentQueryTracks[0].slice(0, this.trackIndex + 1);
      this.lineFeature.setGeometry(new LineString(coords));
      this.changePosImage();
      this.posFeature.setGeometry(new Point(coords[coords.length - 1]));
    },
    routeClear() {
      this.routePause();
      this.trackIndex = 0;
      if (this.routeLayer) {
        this.map.removeLayer(this.routeLayer);
        this.routeLayer = null;
      }
    },
    trackPlayHandler(item, index) {
      // this.isPlayingTrack = !this.isPlayingTrack;
      if (this.trackIndex !== index) {
        this.trackIndex = index;
        this.isPlayingTrack = null;
        if (this.trackPlaying) {
          this.trackPlaying.stopMoving();
          this.trackPlaying.clearLayer();
          this.trackPlaying = null;
        }
        this.trackSegments[index].isStart = true;
      }
      if (this.isPlayingTrack === null) {
        this.trackSegments[index].isStart = true;
        const routeCoords = this.currentQueryTracks[index];
        if (!this.trackPlaying) {
          this.trackPlaying = new TrackPlaying(this.map, routeCoords, null, null, 'people', this.stopPlayer, index);
        } else {
          this.trackPlaying.data = routeCoords;
        }
        this.trackPlaying.clearLayer();
        this.trackPlaying.speed = 5;
        this.trackPlaying.dealCoordsData();
        this.trackPlaying.drawLine();
        this.trackPlaying.trackMoving();
        this.map.render();
        this.isPlayingTrack = true;
      } else if (this.isPlayingTrack === false) { //继续播放
        this.trackSegments[index].isStart = true;
        this.trackPlaying.continueMoving();
        this.isPlayingTrack = true;
      } else if (this.isPlayingTrack === true) { // 暂停播放
        this.trackSegments[index].isStart = false;
        this.trackPlaying.pauseMoving();
        this.isPlayingTrack = false;
      }
    },
    //播放停止
    stopPlayer(index) {
      this.trackSegments[index].isStart = false;
      console.log('回调========')
    },
    //查询(默认显示当天，当前登入的用户)
    onSearch() {
      this.query.startTime = this.dayRange[0] ? new Date(this.dayRange[0]).getTime() : '';
      this.query.endTime = this.dayRange[1] ? new Date(this.dayRange[1]).getTime() : '';
      // this.query.startTime = this.dayRange[0] ? this.dayRange[0]._d.getTime() : '';
      // this.query.endTime = this.dayRange[1] ? this.dayRange[1]._d.getTime() : '';
      let dates = Math.floor((this.query.endTime - this.query.startTime)) / (1000 * 60 * 60 * 24);
      if (dates > 3) {
        this.$message.warning('查询时间不可超过3天！！！');
        return;
      }
      this.getDataList();
      this.timeCardClose();
      this.routeClear();
      this.map.removeLayer(this.trackLayer);
      this.map.removeLayer(this.eventLayer);
      if (this.trackPlaying) {
        this.trackPlaying.stopMoving();
        this.trackPlaying.clearLayer();
      }
    },
    // //翻页
    // changePagination(pageNo, pageSize) {
    //     console.log('changePagination', pageNo, pageSize);
    //     this.query.pageNo = pageNo;
    //     this.getDataList()
    // },
    //按照时间排序（正序、倒序）
    onSort(sortType) {
      // console.log(11111111111, sortType);
      // this.activeName = sortType;
      // this.query.sortType = sortType;
      // this.getDataList();
    },
    //开始播放
    startPlay(item, i) {
      this.dataList[i].isStart = true;
      if (item.hasDetail) {

      } else {
        let temp = {
          userId: this.query.userId,
          startTime: item.startTime,
          endTime: item.endTime
        }
        this.getTrailDetailData(temp).then(res => {
          console.log('TrailDetailData', res.data);
          item.hasDetail = true;
        });
      }
    },
    //暂停播放
    pausePlay(item, i) {
      this.dataList[i].isStart = false;
    },
    timeCardClose() {
      this.trailOverlay.setPosition(null);
    },
    trailTimeClickHandler({ pixel, coordinate }) {
      const feature = this.map.forEachFeatureAtPixel(pixel, feature => {
        if (feature && feature.getGeometry().getType() == 'Point') {
          const coordinates = feature.getGeometry().getCoordinates();
          const trailData = feature.getProperties();
          this.trailOverlay.setPosition(coordinates);
          this.trailTimeData = trailData.time;
        }
        return feature;
      }, {
        layerFilter: layer => {
          if (layer == this.eventLayer) {
            return true;
          } else {
            return false;
          }
        }
      });
      if (!feature) {
        this.trailOverlay.setPosition(null);
      }
    }
  },
  beforeDestroy() {
    this.map.removeOverlay(this.trailOverlay);
    this.map.un('click', this.trailTimeClickHandler);
  }
}
</script>
<style lang="scss" scoped>
.people-trail {
  height: 100%;
  width: 100%;

  .search-panel {
    padding: 20px 0px;

    ::v-deep.ant-calendar-picker-input.ant-input {
      padding: 4px 1px;
    }

    ::v-deep.ant-calendar-range-picker-input {
      width: 46%;
    }
  }

  .table_header {
    margin-bottom: 8px;

    >div {
      display: inline-block;
      width: 80px;
      text-align: center;

      .sort-icon {
        display: inline-block;
        margin-left: 5px;

        .svg_icon_up,
        .svg_icon_down {
          display: block;
          width: 8px;
          height: 8px;
          color: #cccecf;
          cursor: pointer;

          &.active {
            color: #333333;
          }
        }
      }

      >* {
        vertical-align: middle;
      }
    }

    >span {
      display: inline-block;
      width: 80px;
      text-align: center;
      vertical-align: middle;
    }

    .play-tool {
      height: 100%;
      width: 50px;
      margin-left: 10px;

      i {
        color: #2bbdf3;
        font-size: 26px;
        cursor: pointer;

        &:hover {
          color: #2b90f3;
        }
      }
    }
  }

  .content_body {
    background-color: #f5f5f5;
    height: calc(100% - 70px);
    position: relative;
    margin-bottom: 25px;

    ::v-deep .bscroll-vertical-scrollbar {
      opacity: 1 !important
    }

    .item {
      width: 96%;
      height: 40px;
      border-top: solid 1px #f5f5f5;
      border-right: solid 1px #f5f5f5;
      border-left: solid 1px #f5f5f5;
      border-bottom: 1px solid #dddddd;
      cursor: pointer;

      &:hover {
        background-color: #e9f6ff;
        border: solid 1px #2b90f3;
      }

      &.active {
        background-color: #e9f6ff;
        border: solid 1px #2b90f3;
      }

      >div {
        &:first-child {
          width: 74px;
          height: 100%;

          span {
            color: #ffffff;
            font-size: 14px;
            padding: 2px 5px;
            background-color: #2b90f3;
            border-radius: 4px;
            text-align: center;
          }
        }

        &:nth-child(2) {

          p {
            margin-bottom: 5px;
            margin-left: -4px;

            &:first-child {
              margin-top: -10px;
            }
          }

          .dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 8px;
            margin-right: 15px;

            &.green {
              background-color: #50cf3f;
            }

            &.red {
              background-color: #f07171;
            }
          }
        }

        &:last-child {
          height: 100%;

          i {
            color: #2bbdf3;
            font-size: 26px;
            cursor: pointer;

            &:hover {
              color: #2b90f3;
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