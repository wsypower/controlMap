<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="dir:left cross:center">
      <span class="title">今日水质总体趋势图</span>
    </div>
    <div class="panel-content">
      <div class="time-range" flex="dir:top cross:center">
        <div class="status-choose-panel">
          <a-radio-group @change="onChange" v-model="waterFlag">
            <a-radio value="ph">PH</a-radio>
            <a-radio value="zd">浊度</a-radio>
            <a-radio value="yl">余氯</a-radio>
          </a-radio-group>
        </div>
      </div>
      <div ref="trendLineChart" class="trend-line-chart"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import moment from 'moment';
import { getSelectDateRange } from '@/utils/util.tool.js'
import { mapActions } from 'vuex'
const FLAGARR = {
  'ph': 'PH',
  'zd': '浊度',
  'yl': '余氯'
}
const UNIT = {
  'ph': '',
  'zd': 'NTU',
  'yl': 'mg/L'
}
export default {
    name: 'WaterQualityTrend',
    data(){
        return {
          waterFlag: 'ph',
        }
    },
    computed:{
      unit: function(){
        return UNIT[this.waterFlag]
      }
    },
    mounted(){
        this.getChartData();
    },
    methods:{
        ...mapActions('watersupply/statistical', ['getWaterQualityTrendData']),
        moment,
        //获取全部数据
        getChartData(){
            this.getWaterQualityTrendData().then(res=>{
                console.log('getWaterQualityTrendData',res);
                let xArr = [];
                let yArr = [];
              res.data.forEach(item => {
                xArr.push(item.day);
                yArr.push(item.num);
              })
              let chartData = [xArr,yArr];
              console.log('chartData',chartData);
              this.chartInit(chartData);
            })
        },
      onChange() {
        this.getChartData();
      },
      //初始化图表
      chartInit(data){
          let _this = this;
        const ChartColumnar = this.$echarts.init(this.$refs.trendLineChart);
        ChartColumnar.setOption({
          grid: {
            top: 10,
            left: 30,
            right: 30,
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
              let text = params[0].seriesName + '：' + params[0].value +  _this.unit;
              return text + "<br/>" + params[0].name
            }
          },
          xAxis: [{
            type: 'category',
            data: data[0],
            axisLabel: {
              show: true,
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
            end: 35,
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
            name: FLAGARR[_this.waterFlag],
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
  height: 370px;
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
      height: 50px;
      width: 100%;
      .status-choose-panel {
        padding: 10px 0px;
      }
    }
    .trend-line-chart {
      height: calc(100% - 50px);
    }
  }
}
</style>
