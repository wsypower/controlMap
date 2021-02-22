<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="dir:left cross:center">
      <span class="title">状态</span>
    </div>
    <div class="panel-content">
      <div class="status-choose-panel">
        <a-radio-group @change="onChange" v-model="status">
          <a-radio value="all">全部({{ totalNum }})</a-radio>
          <a-radio value="online">在线({{ onlineNum }})</a-radio>
          <a-radio value="outline">离线({{ outlineNum }})</a-radio>
        </a-radio-group>
      </div>
      <div id="status"></div>
      <div class="step"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
    name: 'StatusAnalysis',
    data(){
        return {
            status: 'all',
            totalNum: 0,
            onlineNum: 0,
            outlineNum: 0,
            totalArr: [],
            onlineArr: [],
            outlineArr: []
        }
    },
    mounted(){
      this.$nextTick(() => {
        this.getChartData();
      });
    },
    methods:{
        ...mapActions('section/statistical', ['getStatusAnalysisData']),
        onChange(val){
            console.log('status:change',val,this.status);
            if(this.status==='all'){
                this.chartInit(this.totalArr,this.totalNum);
            }
            else if(this.status==='online'){
                this.chartInit(this.onlineArr,this.onlineNum);
            }
            else{
                this.chartInit(this.outlineArr,this.outlineNum);
            }
        },
        //获取全部数据
        getChartData(){
            this.getStatusAnalysisData().then(res=>{
                console.log('getStatusAnalysisData',res);
                //一次性获取全部数据，从而把数据进行归类显示
                res.data.forEach(item=>{
                    let allTemp = {
                        name: item.name,
                        value: item.totalNum
                    }
                    this.totalNum += item.totalNum;
                    this.totalArr.push(allTemp);

                    let onlineTemp = {
                        name: item.name,
                        value: item.onlineNum
                    }
                    this.onlineNum += item.onlineNum;
                    this.onlineArr.push(onlineTemp);

                    let outlineTemp = {
                        name: item.name,
                        value: item.outlineNum
                    }
                    this.outlineNum += item.outlineNum;
                    this.outlineArr.push(outlineTemp);
                })
                console.log('dataHandle',this.totalArr,this.onlineArr,this.outlineArr);
                this.chartInit(this.totalArr,this.totalNum);
            })
        },
        //初始化图表
        chartInit(data,total){
            const ChartColumnar = this.$echarts.init(document.getElementById('status'));
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
                    subtext: "人员总数",
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
  height: 270px;
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
    position: relative;
    .status-choose-panel {
      height: 38px;
      width: 100%;
      border-bottom: 1px solid #dddddd;
      text-align: center;
      line-height: 38px;
    }
    #status {
      width: 100%;
      height: calc(100% - 38px);
    }
    .step {
      height: calc(100% - 38px);
      position: absolute;
      right: 120px;
      bottom: 0px;
      border-right: 1px solid #dddddd;
    }
  }
}
</style>
