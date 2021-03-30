<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="dir:left cross:center">
      <span class="title">违章类型构成</span>
    </div>
    <div class="panel-content">
      <div id="breakType"></div>
      <div class="step"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
    name: 'BreakTypeAnalysis',
    data(){
        return {
            dataArr: []
        }
    },
    mounted(){
      this.$nextTick(() => {
        this.getChartData();
      });
    },
    methods:{
        ...mapActions('car/statistical', ['getBreakTypeAnalysisData']),
        //获取全部数据
        getChartData(){
            // this.getBreakTypeAnalysisData().then(res=>{
            //     console.log('getBreakTypeAnalysisData',res);
            //     //一次性获取全部数据，从而把数据进行归类显示
            //   res.data.forEach((item) => {
            //     let temp = {
            //       name: item.name +'  '+ item.num,
            //       value: item.num
            //     }
            //     this.dataArr.push(temp);
            //   })
            //   let totalNum = res.data.reduce((acc,item) => {
            //     return acc + item.num
            //   },0);
            //
            //     this.chartInit(this.dataArr,totalNum);
            // })
          let data = [
            {
              name: '超速',
              num: 43
            },
            {
              name: '禁行路段',
              num: 38
            },
            {
              name: '超时停留',
              num: 34
            },
            {
              name: '超范围',
              num: 178
            },
            {
              name: '疑似偷盗',
              num: 78
            }
          ]
          data.forEach((item) => {
            let temp = {
              name: item.name +'  '+ item.num,
              value: item.num
            }
            this.dataArr.push(temp);
          })
          let totalNum = data.reduce((acc,item) => {
            return acc + item.num
          },0);
          this.chartInit(this.dataArr,totalNum);

        },
        //初始化图表
        chartInit(data,total){
            const ChartColumnar = this.$echarts.init(document.getElementById('breakType'));
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
                    show: true,
                  formatter: function(params){
                      return params.name.replace(' ','：')
                  }
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    left: "200",
                    top: 'middle',
                    icon: "roundRect",
                    itemWidth: 12,
                    itemHeight: 12,
                    textStyle: {
                        "color": "#333333",
                        "fontSize": 12,
                        padding: [0,0,0,2],
                        width: 120
                    },
                    pageIconSize: 10,
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
    #breakType {
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
