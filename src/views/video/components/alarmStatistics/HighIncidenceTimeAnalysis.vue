<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="dir:left cross:center">
      <span class="title">高发时段</span>
    </div>
    <div class="panel-content">
      <div class="month-tab-panel">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) in monthData" :key="index">{{ item }}</swiper-slide>
        </swiper>
        <div class="swiper-button-prev" slot="button-prev" @click="prevFun"><a-icon type="left" /></div>
        <div class="swiper-button-next" slot="button-next" @click="nextFun"><a-icon type="right" /></div>
      </div>
      <div class="show-panel">
        <div id="calender-chart"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

import { mapActions } from 'vuex'
export default {
    name: 'HighIncidenceTimeAnalysis',
    data(){
        return {
          chartData: [],
          activeTemp: 0,
          monthData: ['一月','二月','三月','4月','5月','6月','7月','8月','9月'],
          swiperOption: {
            loop: false,
            slidesPerView: 1,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          },
        }
    },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
    mounted(){
      this.$nextTick(() => {
        this.getChartData();
      });
    },
    methods:{
      ...mapActions('video/statistical', ['getHighIncidenceTimeAnalysisData']),
       //激活某个车辆类型，从而展示该车辆在各个中队的情况
      prevFun(){
        //this.swiper
        console.log('prev');

      },
      nextFun(){
        console.log('next');
        this.chartData = [
          { day: '2018-02-01', num: 16 },
          { day: '2018-02-02', num: 61 },
          { day: '2018-02-03', num: 26 },
          { day: '2018-02-04', num: 62 },
          { day: '2018-02-05', num: 36 },
          { day: '2018-02-06', num: 64 },
          { day: '2018-02-07', num: 56 },
          { day: '2018-02-08', num: 66 },
          { day: '2018-02-09', num: 67 },
          { day: '2018-02-10', num: 0 },
          { day: '2018-02-11', num: 0 },
          { day: '2018-02-12', num: 0 },
          { day: '2018-02-13', num: 23 },
          { day: '2018-02-14', num: 34 },
          { day: '2018-02-15', num: 41 },
          { day: '2018-02-16', num: 51 },
          { day: '2018-02-17', num: 13 },
          { day: '2018-02-18', num: 6 },
          { day: '2018-02-19', num: 65 },
          { day: '2018-02-20', num: 0 },
          { day: '2018-02-21', num: 1 },
          { day: '2018-02-22', num: 0 },
          { day: '2018-02-23', num: 77 },
          { day: '2018-02-24', num: 0 },
          { day: '2018-02-25', num: 89 },
          { day: '2018-02-26', num: 34 },
          { day: '2018-02-27', num: 22 },
          { day: '2018-02-28', num: 0 }
        ]
        this.chartInit();
      },
      //获取人员状态数据
        getChartData(){
          let data = [
            { day: '2018-01-01', num: 16 },
            { day: '2018-01-02', num: 61 },
            { day: '2018-01-03', num: 26 },
            { day: '2018-01-04', num: 62 },
            { day: '2018-01-05', num: 36 },
            { day: '2018-01-06', num: 64 },
            { day: '2018-01-07', num: 56 },
            { day: '2018-01-08', num: 66 },
            { day: '2018-01-09', num: 67 },
            { day: '2018-01-10', num: 0 },
            { day: '2018-01-11', num: 0 },
            { day: '2018-01-12', num: 0 },
            { day: '2018-01-13', num: 23 },
            { day: '2018-01-14', num: 34 },
            { day: '2018-01-15', num: 41 },
            { day: '2018-01-16', num: 51 },
            { day: '2018-01-17', num: 13 },
            { day: '2018-01-18', num: 6 },
            { day: '2018-01-19', num: 65 },
            { day: '2018-01-20', num: 0 },
            { day: '2018-01-21', num: 1 },
            { day: '2018-01-22', num: 0 },
            { day: '2018-01-23', num: 77 },
            { day: '2018-01-24', num: 0 },
            { day: '2018-01-25', num: 89 },
            { day: '2018-01-26', num: 34 },
            { day: '2018-01-27', num: 22 },
            { day: '2018-01-28', num: 0 },
            { day: '2018-01-29', num: 36 },
            { day: '2018-01-30', num: 76 },
            { day: '2018-01-31', num: 16 }
          ]
          this.chartData = data;
          this.chartInit();
            // this.getHighIncidenceTimeAnalysisData().then(res=>{
            //   console.log(res.data);
            //   this.chartData = res.data
            //   this.chartInit();
            // });

        },
        //初始化图表
        chartInit(){
          let data1 = [];
          for (let i = 0; i < this.chartData.length; i++) {
            data1.push([this.chartData[i].day,this.chartData[i].num]);
          }
            const ChartColumnar = this.$echarts.init(document.getElementById('calender-chart'));
            ChartColumnar.setOption({
                grid: {
                    top: 10,
                    left: 10,
                    right: 10,
                    bottom: 10,
                    containLabel: true
                },
              tooltip: {
                trigger: 'item',
                formatter:'{a}<br/>{c}',
              },
              calendar: [{
                top: 40,
                left: 'center',
                range: [data1[0][0], data1[data1.length-1][0]],
                orient: 'vertical',
                cellSize: 45,
                splitLine: {
                  show: false,
                  lineStyle: {
                    color: '#204371',
                    width: 5,
                    type: 'solid'
                  }
                },
                yearLabel: {
                  margin:0,
                  show:false,
                  color:'#000000'
                },
                monthLabel: {
                  show:false,
                  firstDay: 1,
                  nameMap: 'cn',
                  color:'#000000'
                },
                dayLabel: {
                  firstDay: 1,
                  nameMap: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                  margin: 10,
                  align: 'center',
                  textStyle: {
                    color: '#000000'
                  }
                }
              }],
              series: [{
                name: '高发时段',
                type: 'effectScatter',
                coordinateSystem: 'calendar',
                data: data1,
                symbolSize: function(val) {
                  val = val[1] / 5;
                  val = Math.min(val, 30);
                  // val = val <5 ? 5 : Math.min(val, 30);
                  return val;
                },
                itemStyle: {
                  normal: {
                    color: '#86bcf9'
                  }
                },
                label: {
                  show: true,
                  formatter (params) {
                    return params.value[0].split("-")[2]
                  },
                  offset: [10, -10],
                  color: '#000000'
                }
              }]
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.analysis-panel {
  width: 100%;
  height: 345px;
  padding-top: 10px;
  .panel-header {
    width: 100%;
    height: 30px;
    .title {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #333333;
    }
  }
  .panel-content {
    width: 100%;
    height: calc(100% - 30px);
    .month-tab-panel {
      height: 34px;
      width: 100%;
      background-color: #f5f5f5;
      position: relative;
      ::v-deep.swiper-container {
        height: 100%;
        margin: 0px 15px;
        .swiper-slide {
          text-align: center;
          line-height: 34px;
          span {
            height: 100%;
            display: inline-block;
            border-bottom: 2px solid transparent;
            cursor: pointer;
          }
        }
        .swiper-slide.active span {
          color: #2c90f3;
          font-weight: 600;
          border-bottom: 2px solid #2c90f3;
        }
      }
      .swiper-button-prev,
      .swiper-button-next {
        position: absolute;
        top: 0;
        width: 20px;
        height: 34px;
        margin-top: 0px;
        z-index: 10;
        cursor: pointer;
        background-image: unset !important;
        background-color: #eeeeee;
        outline: unset;
        i {
          margin-top: 10px;
          margin-left: 4px;
        }
      }
      .swiper-button-prev {
        left: 0px;
      }
      .swiper-button-next {
        right: 0px;
      }
    }
    .show-panel {
      margin-top: 5px;
      height: 265px;
      width: 100%;
      background-color: #f5f5f5;
      #calender-chart {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
