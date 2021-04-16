<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="dir:left cross:center main:justify">
      <span class="title">队员分析</span>
      <div class="legend">
        <span><i class="dot green"></i>在岗</span>
        <span><i class="dot blue"></i>在线</span>
        <span><i class="dot grey"></i>全部</span>
      </div>
    </div>
    <div class="panel-content" id="analysis"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
    name: 'PeopleAnalysis',
    data(){
        return {
            chartData: []
        }
    },
    mounted(){
      this.$nextTick(() => {
        this.getChartData();
      });
    },
    methods:{
        ...mapActions('section/statistical', ['getPeopleAnalysisData']),
        //获取人员状态数据
        getChartData(){
            // this.getPeopleAnalysisData().then(res=>{
            //     console.log('getPeopleAnalysisData', res);
            //     let gArr = [], allArr = [], onWorkArr = [], onLineArr = [];
            //     res.data.forEach(item=>{
            //         gArr.push(item.groupName);
            //         allArr.push(item.allNum);
            //         onWorkArr.push(item.onWorkNum);
            //         onLineArr.push(item.onlineNum);
            //     })
            //     this.chartData.push(gArr);
            //     this.chartData.push(onWorkArr);
            //     this.chartData.push(onLineArr);
            //     this.chartData.push(allArr);
            //     console.log('this.chartData',this.chartData);
            //     this.chartInit();
            // });
          let data = [
            {
              groupName: '市本级指挥中心',
              allNum: 240,
              onWorkNum: 115,
              onlineNum: 180
            },
            {
              groupName: '金东区指挥平台',
              allNum: 290,
              onWorkNum: 130,
              onlineNum: 230
            },
            {
              groupName: '婺城区指挥平台',
              allNum: 240,
              onWorkNum: 150,
              onlineNum: 180
            },
            {
              groupName: '兰溪市指挥平台',
              allNum: 290,
              onWorkNum: 180,
              onlineNum: 230
            },
            {
              groupName: '义乌市指挥平台',
              allNum: 260,
              onWorkNum: 70,
              onlineNum: 160
            },
            {
              groupName: '东阳市指挥平台',
              allNum: 275,
              onWorkNum: 130,
              onlineNum: 195
            },
            {
              groupName: '永康市指挥平台',
              allNum: 310,
              onWorkNum: 90,
              onlineNum: 220
            }
          ]
          let gArr = [], allArr = [], onWorkArr = [], onLineArr = [];
          data.forEach(item=>{
              gArr.push(item.groupName);
              allArr.push(item.allNum);
              onWorkArr.push(item.onWorkNum);
              onLineArr.push(item.onlineNum);
          })
          this.chartData.push(gArr);
          this.chartData.push(onWorkArr);
          this.chartData.push(onLineArr);
          this.chartData.push(allArr);
          this.chartInit();
        },
        //初始化图表
        chartInit(){
            let _this = this;
            const ChartColumnar = this.$echarts.init(document.getElementById('analysis'));
            ChartColumnar.setOption({
                grid: {
                    top: 10,
                    left: 5,
                    right: 50,
                    bottom: 10,
                    containLabel: true
                },
                tooltip: {
                    show: false
                },
                xAxis: {
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
                yAxis: {
                    data: _this.chartData[0],
                    axisLabel: {
                        fontSize: 12,
                        color: '#333333',
                        align: 'right',
                        width: 80,
                        interval: 0,
                        formatter:function(value){
                            var result = "";//拼接加\n返回的类目项
                            var maxLength = 4;//每项显示文字个数
                            var valLength = value.length;//X轴类目项的文字个数
                            var rowNumber = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                            if (rowNumber > 1)//如果文字大于3,
                            {
                                for (var i = 0; i < rowNumber ; i++) {
                                    var temp = "";//每次截取的字符串
                                    var start = i * maxLength;//开始截取的位置
                                    var end = start + maxLength;//结束截取的位置
                                    temp = value.substring(start, end) + "\n";
                                    result += temp; //拼接生成最终的字符串
                                }
                                return result ;
                            }
                            else {
                                return value;
                            }
                        },
                        rich:{
                            a:{}
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
                series: [{
                    type: 'bar',
                    name: '全部',
                    // legendHoverLink: false,
                    label:{
                        show: true,
                        position: 'right',
                        fontSize: 12,
                        color: '#ccc',
                        formatter: function(params){
                            return _this.chartData[1][params.dataIndex]
                                + '/' + _this.chartData[2][params.dataIndex]
                                +'/'+ _this.chartData[3][params.dataIndex]
                        }
                    },
                    barWidth: 8,
                    itemStyle: {
                        normal: {
                            color: '#a0a0a0'
                        },
                        emphasis: {
                            color: '#a0a0a0'
                        }
                    },
                    data: _this.chartData[3]
                }, {
                    type: 'bar',
                    name: '在线',
                    barWidth: 8,
                    // legendHoverLink: false,
                    // label: _label,
                    itemStyle: {
                        normal: {
                            color: '#3296fa'
                        },
                        emphasis: {
                            color: '#3296fa'
                        }
                    },
                    data: _this.chartData[2]
                },{
                    type: 'bar',
                    name: '在岗',
                    //legendHoverLink: false,
                    barWidth: 8,
                    barGap: '-100%',
                    itemStyle: {
                        normal: {
                            color: '#50cf3f'
                        },
                        emphasis: {
                            color: '#50cf3f'
                        }
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
  height: 306px;
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
    height: calc(100% - 30px);
    background-color: #f5f5f5;
  }
}
</style>
