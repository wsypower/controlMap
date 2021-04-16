<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="dir:left cross:center">
      <span class="title">案卷来源</span>
    </div>
    <div class="panel-content">
      <div id="recordsSource"></div>
      <!-- <div class="step"></div> -->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
  name: 'RecordsSourceAnalysis',
  data() {
    return {
      dataArr: []
    }
  },
  mounted() {
    this.getChartData();
  },
  methods: {
    ...mapActions('records/statistical', ['getRecordsSourceAnalysisData']),
    getChartData() {
      this.getRecordsSourceAnalysisData().then(res => {
        console.log('getRecordsSourceAnalysisData', res);
        res.forEach((item) => {
          let temp = {
            name: item.name,
            value: item.num
          }
          this.dataArr.push(temp);
        })
        let totalNum = res.reduce((acc, item) => {
          return acc + item.num
        }, 0);
        this.chartInit(this.dataArr, totalNum);
      });
      // let data = [{
      //     name: '微信上报',
      //     num: 43
      //   },
      //   {
      //     name: '视频上报',
      //     num: 38
      //   },
      //   {
      //     name: '平台上报',
      //     num: 94
      //   },
      //   {
      //     name: '网络员上报',
      //     num: 178
      //   },
      //   {
      //     name: '其他',
      //     num: 78
      //   }
      // ]
      // data.forEach((item) => {
      //   let temp = {
      //     name: item.name + '  ' + item.num,
      //     value: item.num
      //   }
      //   this.dataArr.push(temp);
      // })
      // let totalNum = data.reduce((acc, item) => {
      //   return acc + item.num
      // }, 0);

      // this.chartInit(this.dataArr, totalNum);
    },
    //初始化图表
    chartInit(scaleData, total) {
      const ChartColumnar = this.$echarts.init(document.getElementById('recordsSource'));
      // ChartColumnar.setOption({
      //   grid: {
      //     top: 10,
      //     left: 5,
      //     right: 5,
      //     bottom: 10,
      //     containLabel: true
      //   },
      //   title: {
      //     text: total,
      //     subtext: "案卷总数",
      //     itemGap: 5,
      //     top: 50,
      //     left: 98,
      //     textAlign: "center",
      //     textStyle: {
      //       color: "#333333",
      //       fontSize: 23,
      //       width: 200,
      //       align: 'right',
      //       rich: {
      //         a: {
      //           width: 80,
      //           align: 'right'
      //         }
      //       }
      //     },
      //     subtextStyle: {
      //       "color": "#999999",
      //       "fontSize": 12,
      //     }
      //   },
      //   tooltip: {
      //     show: true,
      //     formatter: function(params) {
      //       return params.name.replace(' ', '：')
      //     }
      //   },
      //   legend: {
      //     type: 'scroll',
      //     orient: 'vertical',
      //     left: "200",
      //     top: 'middle',
      //     icon: "roundRect",
      //     itemWidth: 12,
      //     itemHeight: 12,
      //     textStyle: {
      //       "color": "#333333",
      //       "fontSize": 12,
      //       padding: [0, 0, 0, 2],
      //       width: 120
      //     },
      //     pageIconSize: 10,
      //   },
      //   series: [{
      //     type: "pie",
      //     center: ["32%", "50%"],
      //     radius: ["50%", "65%"],
      //     color: ["#febb08", "#f07171", "#50cf3f", "#2c90f3", "#3fcfc0", "#7c2cf3", "#ba6112", "#FE2C8A"],
      //     startAngle: 135,
      //     label: {
      //       show: false
      //     },
      //     data: data
      //   }]
      // });
      const rich = {
        white: {
          color: '#8FC7FB',
          align: 'center',
          padding: [0, 0],
        },
      };
      const data = [];
      // var color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000'];
      // var colors = ['#00ffff', '#00c5f3', '#0066df', '#e7cb00', '#e69800', '#e65200', '#e22a00'];
      const color = ['#00ffff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000'];
      const colors = ['#00ffff', '#0066df', '#e7cb00', '#e69800', '#e65200', '#e22a00'];
      for (let i = 0; i < scaleData.length; i++) {
        data.push({
          value: scaleData[i].value,
          name: scaleData[i].name,
          itemStyle: {
            normal: {
              borderWidth: 6,
              shadowBlur: 20,
              borderColor: color[i],
              shadowColor: colors[i],
            },
          },
        });
      }
      const seriesObj = [{
        minAngle: 15,
        name: '',
        type: 'pie',
        clockWise: false,
        radius: [45, 49],
        hoverAnimation: false,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'outside',
              color: '#000',
              fontSize: '13',
              formatter: function(params) {
                let percent = 0;
                let total = 0;
                for (let i = 0; i < scaleData.length; i++) {
                  total += scaleData[i].value;
                }
                percent = ((params.value / total) * 100).toFixed(2);
                if (params.name !== '') {
                  return params.name + '\n{white|' + '占比' + percent + '%}';
                } else {
                  return '';
                }
              },
              rich: rich,
            },
            labelLine: {
              fontSize: '14',
              length: 2,
              length2: 30,
              show: true,
              color: '#000',
              type: 'dashed',
              smooth: true,
            },
          },
        },
        data: data,
      }, ];
      ChartColumnar.setOption({
        tooltip: {
          show: false,
          trigger: 'item',
          formatter: function(params) {
            const result = scaleData.filter(function(item) {
              return item.name === params.name;
            });
            return result[0].integral + ' ：' + params.value;
          },
          backgroundColor: 'rgba(0,0,0,0.7)', // 背景
          extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
          padding: [8, 10], //内边距
        },
        legend: {
          show: false,
        },
        toolbox: {
          show: false,
        },
        series: seriesObj,
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.analysis-panel {
  width: 100%;
  height: 190px;
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
    background-color: #f5f5f5;
    position: relative;

    #recordsSource {
      width: 100%;
      height: 100%;
    }

    .step {
      height: 100%;
      position: absolute;
      right: 120px;
      bottom: 0px;
      border-right: 1px solid #dddddd;
    }
  }
}
</style>