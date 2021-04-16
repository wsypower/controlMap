<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="cross:center">
      <span class="title">案卷统计</span>
    </div>
    <div class="panel-content">
      <div class="tab-panel" flex="cross:center main:center">
        <div>
          <span :class="{active: activeType === 'day' }" @click="changeTab('day')">本日</span>
          <span :class="{active: activeType === 'month' }" @click="changeTab('month')">本月</span>
          <!-- <span :class="{active: activeIndex ===2 }" @click="changeTab(2)">历史</span> -->
        </div>
      </div>
      <div id="records-bar"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
  name: 'RecordsStatistical',
  data() {
    return {
      activeType: 'day',
      chartData: [],
      chartColumnar: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getChartData();
    });
  },
  methods: {
    ...mapActions('records/statistical', ['getRecordsStatisticalAnalysisData']),
    changeTab(type) {
      if (this.activeType == type) return;
      this.activeType = type;
      if (!this.chartColumnar.isDisposed()) {
        this.chartColumnar.dispose();
      }
      this.getChartData();
    },
    getChartData() {
      this.getRecordsStatisticalAnalysisData({ type: this.activeType }).then(res => {
        console.log('getRecordsStatisticalAnalysisData', res);
        let xArr = ['上报', '立案', '处置', '核实', '核查', '结案', '作废'];
        let yArr = [0, 0, 0, 0, 0, 0, 0];
        res.forEach(item => {
          switch (item.name) {
            case 'sb':
              yArr[0] = item.num;
              break;
            case 'la':
              yArr[1] = item.num;
              break;
            case 'cz':
              yArr[2] = item.num;
              break;
            case 'hs':
              yArr[3] = item.num;
              break;
            case 'hc':
              yArr[4] = item.num;
              break;
            case 'ja':
              yArr[5] = item.num;
              break;
            case 'zf':
              yArr[6] = item.num;
              break;
            default:
              break;
          }
          // xArr.push(item.name);
          // yArr.push(item.num);
        });
        this.chartData = [xArr, yArr];
        this.chartInit();
      });
      // let data = [
      //   {
      //     name: '上报',
      //     num: 475
      //   },
      //   {
      //     name: '立案',
      //     num: 357
      //   },
      //   {
      //     name: '处置',
      //     num: 331
      //   },
      //   {
      //     name: '核实',
      //     num: 209
      //   },
      //   {
      //     name: '核查',
      //     num: 201
      //   },
      //   {
      //     name: '结案',
      //     num: 199
      //   },
      //   {
      //     name: '废弃',
      //     num: 157
      //   }
      // ]
      // let xArr = [];
      // let yArr = [];
      // data.forEach(item => {
      //   xArr.push(item.name);
      //   yArr.push(item.num);
      // });
      // this.chartData = [xArr, yArr];
      // this.chartInit();
    },
    chartInit() {
      let _this = this;
      this.chartColumnar = this.$echarts.init(document.getElementById('records-bar'));
      this.chartColumnar.setOption({
        grid: {
          top: 20,
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
            lineStyle: {
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
            textStyle: {
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
            lineStyle: {
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
          label: {
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
      >span {
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

        >span {
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

          &:nth-child(3) {
            border-right: 1px solid transparent;
            border-left: 1px solid transparent;
          }

          &:nth-child(2) {
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

    #records-bar {
      width: 100%;
      height: calc(100% - 56px);
    }
  }
}
</style>