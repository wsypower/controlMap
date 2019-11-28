<template>
  <div class="car-trail" flex="dir:top">
    <div class="search-panel">
      <div flex="fir:left cross:center">
        <label>选择车辆：</label>
        <a-select v-model="query.carId" showSearch placeholder="请选择" style="width: 246px;">
          <a-select-option value="" :key="-1">全部</a-select-option>
          <a-select-option v-for="(car, index) in carDataList" :value="car.id" :key="index"
            >{{ car.name }}（{{ car.dept }}）</a-select-option
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
          <i @click="onSort('asc')">
            <cg-icon-svg name="caret-up" class="svg_icon_up" :class="{ active: activeName === 'asc' }"></cg-icon-svg>
          </i>
          <i @click="onSort('desc')">
            <cg-icon-svg
              name="caret-down"
              class="svg_icon_down"
              :class="{ active: activeName === 'desc' }"
            ></cg-icon-svg>
          </i>
        </span>
      </div>
    </div>
    <div class="content_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && dataList.length > 0">
        <div class="item" flex="dir:left main:justify" v-for="(item, index) in dataList" :key="index">
          <div flex="cross:center main:center">
            <span>{{ item.index }}</span>
          </div>
          <div>
            <p><span class="dot green"></span>{{ new Date(item.startTime) | date_format() }}</p>
            <p><span class="dot red"></span>{{ new Date(item.endTime) | date_format() }}</p>
          </div>
          <div flex="cross:center main:center">
            <a-icon v-show="!item.isStart" type="play-circle" theme="filled" @click="startPlay(item, index)" />
            <a-icon v-show="item.isStart" type="pause-circle" theme="filled" @click="pausePlay(item, index)" />
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
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import moment from 'moment';
export default {
    name: 'carTrail',
    props:{
        infoId:{
            type: String,
            default: ''
        },
        carDataList:{
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
               carId: '',
               startDay: '',
               endDay: '',
               sortType: 'asc',
               pageNo: 1,
               pageSize: 20
            },
            //查询的时间范围
            dayRange: [],
            //查询时的过渡效果
            showLoading: false,
            //正序asc、倒序desc
            activeName: 'asc',
            //单页数据
            dataList:[],
            //总数
            totalSize: 0
        }
    },
    mounted(){
        if(this.infoId){
            this.query.carId = this.infoId;
        }
        let day = moment(new Date()).format('YYYY-MM-DD');
        this.dayRange = [moment(day, 'YYYY-MM-DD'),moment(day, 'YYYY-MM-DD')];
        this.query.startDay = day;
        this.query.endDay = day;
        this.getDataList();
    },
    watch:{
        infoId:function(val){
            this.query.carId = val;
            let day = moment(new Date()).format('YYYY-MM-DD');
            this.dayRange = [moment(day, 'YYYY-MM-DD'),moment(day, 'YYYY-MM-DD')];
            this.query.startDay = day;
            this.query.endDay = day;
            this.getDataList();
        }
    },
    methods:{
        ...mapActions('car/manage', ['getCarTrailDataList','getTrailDetailData']),
        //获取人员轨迹数据
        getDataList(){
            console.log('this.query',this.query);
            this.showLoading = true;
            this.getCarTrailDataList(this.query).then(res=>{
                this.showLoading = false;
                this.dataList = res.data.list.map(item=>{
                    item.isStart = false;
                    item.hasDetail = false;
                    return item
                });

                this.totalSize = res.data.total;
            });
        },
        //查询(默认显示当天，当前登入的用户)
        onSearch() {
            this.query.startDay = moment(this.dayRange[0]._d).format("YYYY-MM-DD");
            this.query.endDay = moment(this.dayRange[1]._d).format("YYYY-MM-DD");
            this.query.pageNo = 1;
            this.getDataList()
        },
        //翻页
        changePagination(pageNo, pageSize) {
            console.log('changePagination', pageNo, pageSize);
            this.query.pageNo = pageNo;
            this.getDataList()
        },

        //按照时间排序（正序、倒序）
        onSort(sortType){
            console.log(11111111111,sortType);
            this.activeName = sortType;
            this.query.sortType = sortType;
            this.query.pageNo = 1;
            this.getDataList();
        },
        //开始播放
        startPlay(item,i){
            this.dataList[i].isStart = true;
            if(item.hasDetail){

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
.car-trail {
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
