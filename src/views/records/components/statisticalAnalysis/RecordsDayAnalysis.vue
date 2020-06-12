<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="cross:center main:justify">
      <span class="title">月周期案卷数</span>
      <div class="legend">
        <span><i class="dot blue"></i>上报</span>
        <span><i class="dot green"></i>立案</span>
        <span><i class="dot yellow"></i>处置</span>
      </div>
    </div>
    <a-select v-model="year" @change="handleChange" class="year-panel">
      <a-select-option value="2019">2019</a-select-option>
      <a-select-option value="2018">2018</a-select-option>
      <a-select-option value="2017">2017</a-select-option>
      <a-select-option value="2016">2016</a-select-option>
    </a-select>
    <div class="panel-content">
      <happy-scroll color="rgba(0,0,0,0.2)" size="5" resize>
        <div id="day-bar"></div>
      </happy-scroll>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
  name: 'RecordsDayAnalysis',
  data(){
    return {
      year: '2019',
      chartData: []
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.getChartData();
    });
  },
  methods:{
    ...mapActions('records/statistical', ['getRecordsDayAnalysisData']),
    //获取越界数据
    getChartData(){
      //this.chartData = [['一月','二月','三月','四月','五月'],[20,30,40,50,60],[40,50,60,30,20],[60,70,40,50,20]];
      this.getRecordsDayAnalysisData({year: this.year}).then(res=>{
        console.log('getRecordsDayAnalysisData',res);
        let xArr = [], yArr1 = [], yArr2 = [], yArr3 = [];
        res.data.forEach(item=>{
          xArr.push(item.month);
          yArr1.push(item.num1);
          yArr2.push(item.num2);
          yArr3.push(item.num3);
        })
        this.chartData = [xArr, yArr1, yArr2, yArr3];
        this.chartInit();
      })
    },
    //初始化图表
    chartInit(){
      const ChartColumnar = this.$echarts.init(document.getElementById('day-bar'));
      ChartColumnar.setOption({
        grid: {
          top: 90,
          left: 5,
          right: 5,
          bottom: 10,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.chartData[0],
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
        tooltip:{
          show: true,
          trigger: 'axis',
          axisPointer: {
            type:'none'
          }
        },
        series: [{
          name: '上报',
          type: 'bar',
          barWidth: 8,
          color: '#2c90f3',
          data: this.chartData[1]
        },
        {
          name: '立案',
          type: 'bar',
          barWidth: 8,
          color: '#50cf3f',
          data: this.chartData[2]
        },
        {
          name: '处置',
          type: 'bar',
          barWidth: 8,
          color: '#febb08',
          barCategoryGap: 20,
          data: this.chartData[3]
        }]
      });
    },
    //选择年份
    handleChange(val){
      console.log(val);
    }
  }
}
</script>
<style lang="scss" scoped>
.analysis-panel {
  margin-top: 10px;
  width: 100%;
  height: 272px;
  background-image: -webkit-linear-gradient(180deg, #ffffff 36px, #f5f5f5 36px);
  background-image: -moz-linear-gradient(180deg, #ffffff 36px, #f5f5f5 36px);
  background-image: -ms-linear-gradient(180deg, #ffffff 36px, #f5f5f5 36px);
  background-image: -o-linear-gradient(180deg, #ffffff 36px, #f5f5f5 36px);
  background-image: linear-gradient(180deg, #ffffff 36px, #f5f5f5 36px);
  position: relative;
  .panel-header {
    position: absolute;
    top: 10px;
    width: 100%;
    padding-right: 3px;
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
            background-color: #2c90f3;
          }
          &.yellow {
            background-color: #febb08;
          }
        }
      }
    }
  }
  .year-panel {
    position: absolute;
    right: 15px;
    top: 45px;
    width: 88px;
    height: 30px;
    z-index: 1;
  }
  .panel-content {
    height: 272px;
    width: 317px;
    ::v-deep.happy-scroll-container {
      height: 272px !important;
      width: 317px !important;
    }
    #day-bar {
      height: 272px;
      width: 700px;
    }
  }
}
</style>
