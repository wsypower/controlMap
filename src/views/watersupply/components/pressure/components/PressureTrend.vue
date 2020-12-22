<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="dir:left cross:center">
      <span class="title">供水压力趋势图</span>
    </div>
    <div class="panel-content">
      <div class="time-range" flex="dir:top cross:center">
        <div class="status-choose-panel">
          <a-radio-group v-model="timeMethod" @change="changeTimeMethod">
            <a-radio value="day">今日</a-radio>
            <a-radio value="week">本周</a-radio>
            <a-radio value="month">本月</a-radio>
          </a-radio-group>
        </div>
        <a-range-picker @change="onChange" style="width:240px" v-model="dayRange" />
      </div>
      <div ref="trendLineChart" class="trend-line-chart"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import moment from 'moment';
import { getSelectDateRange } from '@/utils/util.tool.js'
import { mapActions } from 'vuex'
import util from '@/utils/util';
const userId = util.cookies.get('userId');
export default {
  name: 'PressureTrend',
  data(){
    return {
      dateFormat: 'YYYY-MM-DD',
      timeMethod: 'week',
      dayRange: []
    }
  },
  mounted(){
    let dayRangeArr = getSelectDateRange(this.timeMethod);
    this.dayRange = [moment(dayRangeArr[0], this.dateFormat), moment(dayRangeArr[1], this.dateFormat)];
  },
  watch:{
    'dayRange': function(){
      this.getChartData();
    }
  },
  methods:{
    ...mapActions('watersupply/statistical', ['getPressTrendData']),
    moment,
    //获取全部数据
    getChartData(){
      console.log('getChartData dayRange',this.dayRange);
      let params = {
        userId:userId,
        startTime: new Date(this.dayRange[0]._i).getTime(),
        endTime: new Date(this.dayRange[1]._i).getTime()
      }
      this.getPressTrendData(params).then(res=>{
        console.log('getPressTrendData',res);
        let xArr = [];
        let yArr = [];
        res.forEach(item => {
          xArr.push(item.dayTime);
          yArr.push(item.value);
        })
        let chartData = [xArr,yArr];
        console.log('chartData',chartData);
        this.chartInit(chartData);
      })
    },
    //选择年月日触发
    changeTimeMethod(){
      let dayRangeArr = getSelectDateRange(this.timeMethod);
      this.dayRange = [moment(dayRangeArr[0], this.dateFormat), moment(dayRangeArr[1], this.dateFormat)];
    },
    onChange() {
      console.log( 'changeDayRange',this.dayRange);
    },
    //初始化图表
    chartInit(data){
      const ChartColumnar = this.$echarts.init(this.$refs.trendLineChart);
      ChartColumnar.setOption({
        grid: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 50,
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            lineStyle:{
              color: '#dddddd',
              opacity: 0.5
            }
          },
          formatter: function(params){
            let text = params[0].seriesName + '：' + params[0].value + 'm';
            return text + "<br/>" + params[0].name
          }
        },
        xAxis: [{
          type: 'category',
          data: data[0],
          axisLabel: {
            show: true,
            interval: 0,
            textStyle:{
              fontSize: 13,
              color: '#333333'
            },
            formatter: function(val){
              return val.substring(11)
            }
          },
          axisLine: {
            show: true,
            lineStyle:{
              color: '#dddddd'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        }],
        yAxis: {
          min: 0,
          axisLabel: {
            fontSize: 13,
            color: '#333333'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle:{
              type: 'dashed',
              color: '#dddddd'
            }
          }
        },
        dataZoom: [ {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          height: 20,
          bottom: 10,
          start: 10,
          end: 14,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle:{
            color:"#d3dee5",
          },
          textStyle:{
            color:"#000"
          },
          borderColor: 'rgba(144,151,156,0.5)',
          areaStyle:{
            color: 'rgba(0,0,0,0.5)'
          }
        },{
          type: "inside",
          xAxisIndex: [0],
          start: 1,
          end: 35
        }],
        series: [{
          name: '供水压力',
          type: 'line',
          smooth: false,
          symbol: 'circle',
          itemStyle:{
            borderWidth: 2,
            borderColor: '#2c90f3',
            color: '#2c90f3',
          },
          lineStyle:{
            color: '#2c90f3'
          },
          data: data[1]
        }]
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.analysis-panel {
  width: 100%;
  height: 400px;
  padding-top: 6px;
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
    background-color: #f5f5f5;
    .time-range {
      height: 80px;
      width: 100%;
      .status-choose-panel {
        padding: 10px 0px;
      }
    }
    .trend-line-chart {
      height: calc(100% - 80px);
    }
  }
}
</style>
