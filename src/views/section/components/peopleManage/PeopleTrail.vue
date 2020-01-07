<template>
  <div class="people-trail" flex="dir:top">
    <div class="search-panel">
      <div flex="fir:left cross:center">
        <label style="width: 70px;">选择人员：</label>
        <a-select v-model="query.userDisplayId" showSearch placeholder="请选择" style="flex:1;width: 246px;">
          <a-select-option v-for="(people, index) in peopleDataList" :value="people.userDisplayId" :key="index"
            >{{ people.name }}（{{ people.dept }}）</a-select-option
          >
        </a-select>
      </div>
      <div flex="fir:left cross:center" style="margin:10px 0px;">
        <label style="width: 90px;">查询时间：</label>
        <a-range-picker v-model="dayRange" format="YYYY-MM-DD" style="width: 100%" />
      </div>
      <a-button type="primary" style="width: 100%" @click="onSearch">查询</a-button>
    </div>
    <div class="table_header">
      <span>序号</span>
      <div>
        <span>起止时间</span>
        <span class="sort-icon">
          <i @click="onSort('desc')">
            <cg-icon-svg name="caret-up" class="svg_icon_up" :class="{ active: activeName === 'desc' }"></cg-icon-svg>
          </i>
          <i @click="onSort('asc')">
            <cg-icon-svg
              name="caret-down"
              class="svg_icon_down"
              :class="{ active: activeName === 'asc' }"
            ></cg-icon-svg>
          </i>
        </span>
      </div>
    </div>
    <div class="content_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && trackSegments.length > 0">
        <div class="item" flex="dir:left main:justify" v-for="(item, index) in trackSegments" :key="index">
          <div flex="cross:center main:center">
            <span>{{ index }}</span>
          </div>
          <div>
            <p><span class="dot green"></span>{{ item.coordinates[0].time }}</p>
            <p><span class="dot red"></span>{{ item.coordinates[item.coordinates.length-1].time }}</p>
          </div>
          <div flex="cross:center main:center">
              <!--<div @click="trackPlayHandler(item, index)">-->
                  <!--<a-icon v-show="item.isStart" type="pause-circle" theme="filled" @click="trackPlayHandler(item, index)" />-->
              <!--</div>-->
            <!--<cg-icon-svg name="telephone" class="svg_icon_telephone" @click="onSort('desc')"></cg-icon-svg>-->
            <a-icon v-show="!item.isStart" type="play-circle" theme="filled" @click="trackPlayHandler(item, index)" />
            <a-icon v-show="item.isStart" type="pause-circle" theme="filled" @click="trackPlayHandler(item, index)" />
          </div>
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
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions,mapState } from 'vuex'
import moment from 'moment';
import util from '@/utils/util';
import {stampConvertToTime} from '@/utils/util.tool';
import { trackByLocationList,pointByCoord } from '@/utils/util.map.manage';
import {trackStyle,trackPointStyle,alarmPointStyle} from '@/utils/util.map.style';
import {TrackPlaying} from '@/utils/util.map.trackPlaying'
export default {
    name: 'peopleTrail',
    props:{
        infoId:{
            type: String,
            default: ''
        },
        peopleDataList:{
            type: Array,
            default(){
                return []
            }
        }
    },
    data(){
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
            dataList:[],
            //总数
            totalSize: 0,
            trackSegments:[],
            currentQueryTracks:[],
            trackLayer:null,
            eventFeatures:[],
            eventLayer:null,
            trackPlaying:null,
            isPlayingTrack:null,
            trackIndex:0
        }
    },
    computed:{
        ...mapState('map', ['mapManager'])
    },
    mounted(){
        this.map=this.mapManager.getMap();
        let userId = '';
        if(this.infoId){
            userId = this.infoId.split('_')[0];
        }
        else{
            userId = util.cookies.get('userId');
        }
        this.query.userId = userId;
        let temp = this.peopleDataList.find(item => item.id === userId );

        if(temp) {
          this.query.userDisplayId = temp.userDisplayId;
        }
        let day = moment(new Date()).format('YYYY-MM-DD');
        this.dayRange = [moment(day, 'YYYY-MM-DD'),moment(day, 'YYYY-MM-DD')];
        this.query.startTime = new Date(day).getTime();
        this.query.endTime = new Date(day).getTime();
        this.getDataList();
    },
    watch:{
        infoId:function(val){
            if(val) {
                console.log('infoId',val);
                let temp = this.peopleDataList.find(item => item.id === val );
                this.query.userId = val;
                this.query.userDisplayId = temp.userDisplayId;
            }
            let day = moment(new Date()).format('YYYY-MM-DD');
            this.dayRange = [moment(day, 'YYYY-MM-DD'),moment(day, 'YYYY-MM-DD')];
            this.query.startTime = new Date(day).getTime();
            this.query.endTime = new Date(day).getTime();
            this.getDataList();
        }
    },
    methods:{
        ...mapActions('section/manage', ['getUserTrailDataList','getTrailDetailData']),
        //获取人员轨迹数据
        getDataList(){
            console.log('this.query',this.query);
            this.showLoading = true;
            this.getUserTrailDataList(this.query).then(res=>{
              this.showLoading = false;
              this.dataList = res.map(item=>{
                item.isStart = false;
                item.hasDetail = false;
                item.time = stampConvertToTime(item.gpstime);
                return item;
              });
                if(res.length>0){
                    this.trackDataHandler(res);
                    const trackLineFeature = trackByLocationList(this.dataList);
                    this.trackLayer = this.mapManager.addVectorLayerByFeatures(trackLineFeature,trackStyle(),3);
                    this.trackLayer.set('featureType','PeopleTrail');
                    this.eventLayer= this.mapManager.addVectorLayerByFeatures(this.eventFeatures,trackPointStyle(),3);
                    this.eventLayer.set('featureType','PeopleTrail');
                    this.mapManager.getMap().getView().fit(this.trackLayer.getSource().getExtent());
                }else{
                    this.$message.warning('未查询到轨迹数据！！！');
                }
               // this.totalSize = res.data.total;
            });
        },
        // 传过来的轨迹点位分段处理并保存
        trackDataHandler (coords) {
            this.trackSegments=[];
            this.currentQueryTracks=[];
            // 按间隔时间轨迹分段
            let currentCoord = coords[0];
            let nextCoord = null;
            let lineCoordinates = [];
            let lineCoords = [];
            lineCoordinates.push(currentCoord); // 加载第一个点
            lineCoords.push([parseFloat(currentCoord.gpsx),parseFloat(currentCoord.gpsy)]);
            if(currentCoord.operate=="2" ||currentCoord.operate=="0" ||currentCoord.operate=="1"
                || currentCoord.operate=="5"|| currentCoord.operate=="99" ) {//上报、签到、签退、核查、普通轨迹点
                const feature =pointByCoord([parseFloat(currentCoord.gpsx),parseFloat(currentCoord.gpsy)]);
                feature.setProperties(currentCoord);
                this.eventFeatures.push(feature);
            }
            for (let i = 1; i < coords.length - 1; i++) {
                nextCoord = coords[i];
                if(nextCoord.operate=="2" ||nextCoord.operate=="0" ||nextCoord.operate=="1"|| nextCoord.operate=="5"||i % 1 == 0){//配置轨迹点抽稀
                    const feature = pointByCoord([parseFloat(nextCoord.gpsx),parseFloat(nextCoord.gpsy)]);
                    feature.setProperties(nextCoord);
                    this.eventFeatures.push(feature);
                }
                if(nextCoord.operate=="99") {//只串联普通轨迹点
                    if (nextCoord.gpstime - currentCoord.gpstime <= 60 * 1000 * 30) { // 小于间隔时间 30分钟
                        lineCoordinates.push(nextCoord); // 加入当前线段
                        lineCoords.push([parseFloat(nextCoord.gpsx),parseFloat(nextCoord.gpsy)])
                    }
                    else { // 大于间隔时间
                        if (lineCoordinates.length > 3) {
                            this.trackSegments.push({
                                coordinates:lineCoordinates,
                                isStart:false
                            });
                            this.currentQueryTracks.push(lineCoords);
                        }else{ //如果轨迹点数小于3的则不计入轨迹段中

                        }
                        lineCoordinates = [];
                        lineCoords = [];
                        // 将下一个线段的第一点加入
                        lineCoordinates.push(nextCoord); // 加入当前线段
                        lineCoords.push([parseFloat(nextCoord.gpsx),parseFloat(nextCoord.gpsy)]);
                    }
                }
                currentCoord = nextCoord;
            }
            // 处理最后一次
            if (lineCoordinates.length > 0) {
                this.trackSegments.push({
                    coordinates:lineCoordinates,
                    isStart:false
                });
                this.currentQueryTracks.push(lineCoords);
            }
            console.log('轨迹=====',this.trackSegments);
        },
        //轨迹播放处理
        trackPlayHandler(item,index){
            // this.isPlayingTrack=!this.isPlayingTrack;
            if(this.trackIndex !== index){
                this.trackIndex=index;
                this.isPlayingTrack = null;
                if(this.trackPlaying){
                    this.trackPlaying.stopMoving();
                    this.trackPlaying.clearLayer();
                    this.trackPlaying=null;
                }
                this.trackSegments[index].isStart=true;
            }
            if(this.isPlayingTrack === null) {
                this.trackSegments[index].isStart = true;
                const routeCoords = this.currentQueryTracks[index];
                if (!this.trackPlaying) {
                    this.trackPlaying = new TrackPlaying(this.map, routeCoords, null,null, 'people',this.stopPlayer,index);
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
            }else if(this.isPlayingTrack === false){ //继续播放
                this.trackSegments[index].isStart= true;
                this.trackPlaying.continueMoving();
                this.isPlayingTrack = true;
            }else if(this.isPlayingTrack === true){ // 暂停播放
                this.trackSegments[index].isStart=false;
                this.trackPlaying.pauseMoving();
                this.isPlayingTrack = false;
            }
        },
        //播放停止
        stopPlayer(index){
            this.trackSegments[index].isStart= false;
            console.log('回调========')
        },
        //查询(默认显示当天，当前登入的用户)
        onSearch() {
            this.query.startTime = this.dayRange[0]._d.getTime();
            this.query.endTime = this.dayRange[1]._d.getTime();
            this.query.userId = this.query.userDisplayId.split('_')[0];
            this.getDataList();
            this.map.removeLayer(this.trackLayer);
            this.map.removeLayer(this.eventLayer);
            if(this.trackPlaying){
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
        onSort(sortType){
            console.log(11111111111,sortType);
            this.activeName = sortType;
            this.query.sortType = sortType;
            this.getDataList();
        },
        //开始播放
        startPlay(item,i){
            this.dataList[i].isStart = true;
            if(item.hasDetail) {

            }
            else{
                let temp = {
                    userId: this.query.userId,
                    startTime: item.startTime,
                    endTime: item.endTime
                }
                this.getTrailDetailData(temp).then(res=>{
                    console.log('TrailDetailData',res.data);
                    item.hasDetail = true;
                });
            }
        },
        //暂停播放
        pausePlay(item,i){
            this.dataList[i].isStart = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.people-trail {
  height: 100%;
  width: 100%;
  .search-panel {
    padding: 20px 0px;
  }
  .table_header {
    margin-bottom: 8px;
    > div {
      display: inline-block;
      width: 100px;
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
      > * {
        vertical-align: middle;
      }
    }
    > span {
      display: inline-block;
      width: 80px;
      text-align: center;
      vertical-align: middle;
    }
  }
  .content_body {
    background-color: #f5f5f5;
    height: calc(100% - 70px);
    position: relative;
    .item {
      width: 100%;
      height: 68px;
      border-top: solid 1px #f5f5f5;
      border-right: solid 1px #f5f5f5;
      border-left: solid 1px #f5f5f5;
      border-bottom: 1px solid #dddddd;
      &:hover {
        background-color: #e9f6ff;
        border: solid 1px #2b90f3;
      }
      > div {
        &:first-child {
          width: 74px;
          height: 100%;
          span {
            color: #ffffff;
            font-size: 14px;
            padding: 5px 8px;
            background-color: #2b90f3;
            border-radius: 4px;
            width: 35px;
            text-align: center;
          }
        }
        &:nth-child(2) {
          border-left: 1px dashed #dddddd;
          margin: 20px 0px 20px -30px;
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
          width: 66px;
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
