<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="cross:center">
      <span class="title">案卷统计</span>
    </div>
    <div class="panel-content">
      <div class="tab-panel" flex="cross:center main:center">
        <div>
          <span :class="{active: activeIndex ===0 }" @click="changeTab(0)">本日</span>
          <span :class="{active: activeIndex ===1 }" @click="changeTab(1)">本月</span>
          <span :class="{active: activeIndex ===2 }" @click="changeTab(2)">历史</span>
        </div>
      </div>
      <div id="records-bar1"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
  name: 'RecordsStatistical',
  data(){
    return {
      activeIndex: 0,
      chartData: []
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.getChartData();
    });
  },
  methods:{
    ...mapActions('records/statistical', ['getRecordsStatisticalAnalysisData']),
    //切换tab
    changeTab(index){
      this.activeIndex = index;
    },
    //获取人员状态数据
    getChartData(){
      this.getRecordsStatisticalAnalysisData().then(res=>{
        console.log('getRecordsStatisticalAnalysisData', res);
        let xArr = [];
        let yArr = [];
        res.data.forEach(item => {
          xArr.push(item.name);
          yArr.push(item.num);
        });
        this.chartData = [xArr, yArr];
        this.chartInit();
      });
    },
    //初始化图表
    chartInit(){
      let _this = this;
      const ChartColumnar = this.$echarts.init(document.getElementById('records-bar1'));
      ChartColumnar.setOption({
        grid: {
          top: 10,
          left: 5,
          right: 5,
          bottom: 10,
          containLabel: true
        },
        tooltip: {
          show: false
        },
        xAxis: {
          data: _this.chartData[0],
          axisLabel: {
            fontSize: 12,
            color: '#333333',
            interval: 0
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
        },
        yAxis: {
          axisLabel: {
            show: true,
            textStyle:{
              color: '#999999'
            }
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
        series: [{
          type: 'bar',
          name: '数量',
          barWidth: 8,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#7662ee'
              }, {
                offset: 1,
                color: '#00a5ff'
              }])
            }
          },
          label:{
            show: true,
            position: 'top'
          },
          data: _this.chartData[1]
        }]
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.analysis-panel {
  width: 100%;
  height: 292px;
  padding-top: 6px;
  .panel-header {
    width: 100%;
    height: 30px;
    .title {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #333333;
    }
    .legend {
      > span {
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #666666;
        .dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 2px;
          margin: 0px 5px 0px 10px;
          &.green {
            background-color: #50cf3f;
          }
          &.blue {
            background-color: #3296fa;
          }
          &.grey {
            background-color: #a0a0a0;
          }
        }
      }
    }
  }
  .panel-content {
    width: 100%;
    height: 258px;
    background-color: #f5f5f5;
    .tab-panel {
      padding-top: 6px;
      width: 100%;
      height: 50px;
      div {
        height: 30px;
        > span {
          display: inline-block;
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: solid 1px #2b90f3;
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          color: #2b90f3;
          background-color: #ffffff;
          cursor: pointer;
          &:nth-child(1) {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
          &:nth-child(2) {
            border-right: 1px solid transparent;
            border-left: 1px solid transparent;
          }
          &:nth-child(3) {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }
          &.active {
            color: #ffffff;
            background-color: #2b90f3;
          }
        }
      }
    }
    #records-bar1 {
      width: 100%;
      height: calc(100% - 56px);
    }
  }
}
</style>
