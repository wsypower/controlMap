<template>
  <div class="analysis-panel">
    <div class="panel-header">
      <span class="title">越界人员分析</span>
    </div>
    <div class="panel-content" id="overstep"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
    name: 'OverstepAnalysis',
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
        ...mapActions('section/statistical', ['getOverstepAnalysisData']),
        //获取越界数据
        getChartData(){
            // this.getOverstepAnalysisData().then(res=>{
            //     console.log('getOverstepAnalysisData',res);
            //     let data = [],
            //         dayArr = [],
            //         numArr = [];
            //     res.data.forEach(item=>{
            //         dayArr.push(item.day);
            //         numArr.push(item.num);
            //     })
            //     data.push(dayArr);
            //     data.push(numArr);
            //     this.chartInit(data);
            // })
          let result = [
            {
              day: '09-23',
              num: 40
            },
            {
              day: '09-24',
              num: 32
            },
            {
              day: '09-25',
              num: 21
            },
            {
              day: '09-26',
              num: 10
            },
            {
              day: '09-27',
              num: 16
            },
            {
              day: '09-28',
              num: 12
            }
          ]
          let data = [],
              dayArr = [],
              numArr = [];
          result.forEach(item=>{
              dayArr.push(item.day);
              numArr.push(item.num);
          })
          data.push(dayArr);
          data.push(numArr);
          this.chartInit(data);
        },
        //初始化图表
        chartInit(data){
            const ChartColumnar = this.$echarts.init(document.getElementById('overstep'));
            ChartColumnar.setOption({
                grid: {
                    top: 50,
                    left: 5,
                    right: 5,
                    bottom: 10,
                    containLabel: true
                },
                tooltip: {
                    show: true,
                    position: 'top',
                    backgroundColor: '#febb08',
                    textStyle:{
                        color: '#000000'
                    },
                    formatter: '人数：{c}'
                },
                legend:{
                    show: true,
                    top: 10,
                    right: 1,
                    itemWidth: 14,
                    itemHeight: 8
                },
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
                    name: '监督员',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    itemStyle:{
                        borderWidth: 1,
                        borderColor: '#ffffff'
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
  height: 240px;
  background-image: -webkit-linear-gradient(180deg, #ffffff 36px, #f5f5f5 36px);
  background-image: -moz-linear-gradient(180deg, #ffffff 36px, #f5f5f5 36px);
  background-image: -ms-linear-gradient(180deg, #ffffff 36px, #f5f5f5 36px);
  background-image: -o-linear-gradient(180deg, #ffffff 36px, #f5f5f5 36px);
  background-image: linear-gradient(180deg, #ffffff 36px, #f5f5f5 36px);
  position: relative;
  .panel-header {
    position: absolute;
    top: 10px;
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
