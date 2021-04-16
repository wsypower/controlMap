<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="cross:center">
      <span class="title">高发问题TOP5</span>
    </div>
    <div class="panel-content">
      <div id="top5-bar"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
  name: 'HighIncidenceTOP5',
  data() {
    return {
      chartData: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getChartData();
    });
  },
  methods: {
    ...mapActions('records/statistical', ['getHighIncidenceTOP5Data']),
    getChartData() {
      this.getHighIncidenceTOP5Data().then(res => {
        console.log('getHighIncidenceTOP5Data', res);
        let xArr = [];
        let yArr = [];
        res.forEach(item => {
          xArr.push(item.name);
          yArr.push(item.num);
        });
        this.chartData = [xArr, yArr];
        this.chartInit();
      });
      // let data = [
      //   {
      //     name: '私搭乱建',
      //     num: 475
      //   },
      //   {
      //     name: '上水井盖',
      //     num: 357
      //   },
      //   {
      //     name: '非法小广告',
      //     num: 331
      //   },
      //   {
      //     name: '无照经营游商',
      //     num: 209
      //   },
      //   {
      //     name: '街头散发广告',
      //     num: 201
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
      const ChartColumnar = this.$echarts.init(document.getElementById('top5-bar'));
      ChartColumnar.setOption({
        grid: {
          top: 30,
          left: 5,
          right: 5,
          bottom: 10,
          containLabel: true
        },
        tooltip: {
          show: true
        },
        xAxis: {
          data: _this.chartData[0],
          axisLabel: {
            fontSize: 12,
            color: '#333333',
            interval: 0,
            rotate: 50,
            formatter: value => {
              let res = value;
              if (res.length > 8) {
                res = `${res.substring(0, 7)}..`;
              }
              return res;
            },
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
                color: '#f76a63'
              }, {
                offset: 0.5,
                color: '#f77f6e'
              }, {
                offset: 1,
                color: '#f79378'
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
  height: 262px;
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
    height: 232px;
    background-color: #f5f5f5;

    #top5-bar {
      width: 100%;
      height: 100%;
    }
  }
}
</style>