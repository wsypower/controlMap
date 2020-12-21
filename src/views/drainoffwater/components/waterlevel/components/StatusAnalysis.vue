<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="dir:left cross:center">
      <span class="title">水位监测设备统计</span>
    </div>
    <div class="panel-content" ref="statusPieChart"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import util from '@/utils/util';
const userId = util.cookies.get('userId');
export default {
    name: 'StatusAnalysis',
    data(){
        return {
            totalNum: 0,
            totalArr: [],
        }
    },
    mounted(){
        this.getChartData();
    },
    methods:{
        ...mapActions('drainoffwater/statistical', ['getWaterStatusAnalysisData']),
        //获取全部数据
        getChartData(){
            this.getWaterStatusAnalysisData({userId: userId}).then(res=>{
                console.log('getWaterStatusAnalysisData',res);
                res.forEach(item=>{
                  this.totalNum += item.num;
                });
                res.forEach(item=>{
                    let allTemp = {
                        name: item.name + '_' + item.num+ '个' + '_' + (item.num*100/this.totalNum).toFixed(2) + '%',
                        value: item.num
                    }
                    this.totalArr.push(allTemp);
                })
                console.log('dataHandle',this.totalArr);
                this.chartInit(this.totalArr,this.totalNum);
            })
        },
        //初始化图表
        chartInit(data,total){
            const ChartColumnar = this.$echarts.init(this.$refs.statusPieChart);
            ChartColumnar.setOption({
                grid: {
                    top: 10,
                    left: 5,
                    right: 5,
                    bottom: 10,
                    containLabel: true
                },
                title: {
                    text: total,
                    subtext: "总数",
                    itemGap: 5,
                    top: 60,
                    left: 90,
                    textAlign:"center",
                    textStyle: {
                        color: "#333333",
                        fontSize: 23,
                        width: 200,
                        align: 'right',
                        rich:{
                            a:{
                                width:80,
                                align: 'right'
                            }
                        }
                    },
                    subtextStyle: {
                        "color": "#999999",
                        "fontSize": 12,
                    }
                },
                tooltip: {
                    show: true,
                  formatter: function (params) {
                    return params.name.split('_')[0] + ':' + params.value;
                  }
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: "10",
                    top: 'middle',
                    icon: "roundRect",
                    itemWidth: 12,
                    itemHeight: 12,
                    textStyle: {
                        "color": "#333333",
                        "fontSize": 12,
                        padding: [0,0,0,2],
                        width: 90
                    },
                    pageIconSize: 10,
                  formatter: function (name) {
                    return name.replace(/_/g, '  ');
                  }
                },
                series: [{
                    type: "pie",
                    center: ["30%", "50%"],
                    radius: ["55%", "70%"],
                    color: [ "#50cf3f", "#cccccc", "#cc8718"],
                    startAngle: 135,
                    label: {
                        show: false
                    },
                    data: data
                }]
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.analysis-panel {
  width: 100%;
  height: 200px;
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
  }
}
</style>
