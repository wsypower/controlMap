<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="dir:left cross:center">
      <span class="title">分组统计</span>
    </div>
    <div class="panel-content">
      <div id="group"></div>
      <div class="step"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
    name: 'GroupAnalysis',
    data(){
        return {
            dataArr: []
        }
    },
    mounted(){
        this.getChartData();
    },
    methods:{
        ...mapActions('car/statistical', ['getCarGroupAnalysisData']),
        //获取全部数据
        getChartData(){
            this.getCarGroupAnalysisData().then(res=>{
                console.log('getCarGroupAnalysisData',res);
                //一次性获取全部数据，从而把数据进行归类显示
                res.data.forEach((item) => {
                  let temp = {
                    name: item.name,
                    value: item.num
                  }
                  this.dataArr.push(temp);
                })
                let totalNum = res.data.reduce((acc,item) => {
                    return acc + item.num
                },0);
                this.chartInit(this.dataArr, totalNum);
            })

        },
        //初始化图表
        chartInit(data,total){
            const ChartColumnar = this.$echarts.init(document.getElementById('group'));
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
                    subtext: "车辆总数",
                    itemGap: 5,
                    top: 75,
                    left: 95,
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
                    show: true
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: "0",
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
                    pageIconSize: 10
                },
                series: [{
                    type: "pie",
                    center: ["32%", "50%"],
                    radius: ["40%", "50%"],
                    color: ["#febb08", "#f07171", "#50cf3f", "#2c90f3", "#3fcfc0", "#7c2cf3", "#ba6112", "#FE2C8A"],
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
  height: 230px;
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
    #group {
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
