<template>
  <div class="analysis-panel">
    <div class="panel-header">
      <span class="title">高发路段</span>
    </div>
    <div class="panel-content" id="highRoad"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
    name: 'HighIncidenceRoadAnalysis',
    data(){
        return {
        }
    },
    mounted(){
      this.$nextTick(() => {
        this.getChartData();
      });
    },
    methods:{
        ...mapActions('video/statistical', ['getHighIncidenceRoadAnalysisData']),
        //获取越界数据
        getChartData(){
          let needdata = [
            {
              name: 'xxxx路',
              num: 40
            },
            {
              name: 'yyyyy路',
              num: 32
            },
            {
              name: 'aaaa路',
              num: 21
            },
            {
              name: 'bbbb路',
              num: 10
            },
            {
              name: 'ccccc路',
              num: 16
            },
            {
              name: 'zzzzzzzz路',
              num: 12
            }
          ]
          let data = [],
                  nameArr = [],
                  numArr = [];
          needdata.forEach(item=>{
            nameArr.push(item.name);
            numArr.push(item.num);
          })
          data.push(nameArr);
          data.push(numArr);
          this.chartInit(data);
            // this.getHighIncidenceRoadAnalysisData().then(res=>{
            //     console.log('getHighIncidenceRoadAnalysisData',res);
            //     let data = [],
            //         nameArr = [],
            //         numArr = [];
            //     res.data.forEach(item=>{
            //         nameArr.push(item.name);
            //         numArr.push(item.num);
            //     })
            //     data.push(nameArr);
            //     data.push(numArr);
            //     this.chartInit(data);
            // })

        },
        //初始化图表
        chartInit(data){
            const ChartColumnar = this.$echarts.init(document.getElementById('highRoad'));
            ChartColumnar.setOption({
                grid: {
                    top: 60,
                    left: 5,
                    right: 5,
                    bottom: 10,
                    containLabel: true
                },
                // tooltip: {
                //     show: true,
                //     position: 'top',
                //     backgroundColor: '#febb08',
                //     textStyle:{
                //         color: '#000000'
                //     },
                //     formatter: '人数：{c}'
                // },
                // legend:{
                //     show: true,
                //     top: 10,
                //     right: 1,
                //     itemWidth: 14,
                //     itemHeight: 8
                // },
                xAxis: {
                    type: 'category',
                    data: data[0],
                    axisLabel: {
                        show: true,
                        textStyle:{
                            color: '#999999'
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

                },
                yAxis: {
                    axisLabel: {
                        fontSize: 12,
                        color: '#999999'
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
                    name: '高发路段',
                    type: 'bar',
                  barWidth: 8,
                  itemStyle: {
                    normal: {
                      color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#6a7bfa'
                      }, {
                        offset: 1,
                        color: '#95a0f4'
                      }])
                    },
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
  height: 230px;
  background-image: -webkit-linear-gradient(180deg, #ffffff 40px, #f5f5f5 40px);
  background-image: -moz-linear-gradient(180deg, #ffffff 40px, #f5f5f5 40px);
  background-image: -ms-linear-gradient(180deg, #ffffff 40px, #f5f5f5 40px);
  background-image: -o-linear-gradient(180deg, #ffffff 40px, #f5f5f5 40px);
  background-image: linear-gradient(180deg, #ffffff 40px, #f5f5f5 40px);
  position: relative;
  .panel-header {
    position: absolute;
    top: 15px;
    .title {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #333333;
    }
  }
  .panel-content {
    height: 100%;
    width: 100%;
  }
}
</style>
