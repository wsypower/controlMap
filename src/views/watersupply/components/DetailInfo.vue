<template>
  <div class="tip-content">
    <div class="tip-header" flex="dir:left">
      <div class="info-body-left" flex="cross:center">
        <cg-icon-svg name="jiance" class="svg_icon_jiance"></cg-icon-svg>
        <span>{{ info.name }}</span>
      </div>
      <div class="close" flex="main:center cross:center" @click="closeDialog"></div>
    </div>
    <div class="tip-body">
      <div class="detail" flex="dir:left main:justify">
        <div class="item" v-for="(item, index) in info.detailMessage" :key="index" flex="dir:top cross:center">
          <div class="item-header">{{titleArr[index]}}当前监测值</div>
          <div class="item-value">{{item.value}}</div>
          <div v-if="item.yty>0">日同比&nbsp;&nbsp;+{{ item.yty }}{{ item.unit }}
            <a-icon style="color: #50cf3f" type="arrow-up" />
          </div>
          <div v-else-if="item.yty===0">日同比&nbsp;&nbsp;{{ item.yty }}{{ item.unit }}</div>
          <div v-else>日同比&nbsp;&nbsp;{{ item.yty }}{{ item.unit }}
            <a-icon style="color: #f07171" type="arrow-down" />
          </div>
          <div v-if="item.mtm>0">日环比&nbsp;&nbsp;+{{ item.mtm }}{{ item.unit }}
            <a-icon style="color: #50cf3f" type="arrow-up" />
          </div>
          <div v-else-if="item.mtm===0">日环比&nbsp;&nbsp;{{ item.mtm }}{{ item.unit }}</div>
          <div v-else>日环比&nbsp;&nbsp;{{ item.mtm }}{{ item.unit }}
            <a-icon style="color: #f07171" type="arrow-down" />
          </div>
        </div>
      </div>
      <div class="chart-panel">
        <ul class="tab-panel" flex="dir:left">
          <li :class="{active: tabIndex===0}" @click="changeTab(0)">PH</li>
          <li :class="{active: tabIndex===1}" @click="changeTab(1)">浊度</li>
          <li :class="{active: tabIndex===2}" @click="changeTab(2)">余氯</li>
        </ul>
        <div ref="lineChart" class="line-chart"></div>
      </div>
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default{
  name: 'detailInfo',
  data(){
    return {
      tabIndex: 0,
      titleArr:['PH','浊度','余氯']
    }
  },
  props:{
    info:{
      default(){
        return {
          name: '监测设备',
          detailMessage:[],
          chartData: []
        }
      }
    },
    closeCallBack:{
      type: Function,
      default(){
        return null
      }
    }
  },
  mounted(){},
  watch: {
    'info.chartData': function(val){
      console.log('watch info.chartData',val);
      let data = [val[0],val[this.tabIndex+1]];
      this.chartInit(data);
    }
  },
  methods:{
    //切换tab
    changeTab(index){
      this.tabIndex = index;
      let data = [this.info.chartData[0],this.info.chartData[this.tabIndex+1]];
      this.chartInit(data);
    },
    //初始化图表
    chartInit(data){
      let _this = this;
      const ChartColumnar = this.$echarts.init(this.$refs.lineChart);
      ChartColumnar.setOption({
        grid: {
          top: 40,
          left: 30,
          right: 30,
          bottom: 10,
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            lineStyle:{
              color: '#dddddd',
              opacity: 0.5
            }
          },
          formatter: function(params){
            let text = params[0].seriesName + '：' + params[0].value + _this.info.detailMessage[_this.tabIndex].unit;
            return text + "<br/>" + params[0].name
          }
        },
        xAxis: {
          type: 'category',
          data: data[0],
          axisLabel: {
            show: true,
            textStyle:{
              fontSize: 13,
              color: '#333333'
            },
            formatter: function(val){
              return val.substring(11)
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
          name: '近3小时趋势图',
          nameTextStyle:{
            padding: [0,0,0,30],
            fontSize: 13,
            color: '#333333'
          },
          axisLabel: {
            fontSize: 13,
            color: '#333333'
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
          name: _this.titleArr[_this.tabIndex],
          type: 'line',
          smooth: false,
          symbol: 'circle',
          itemStyle:{
            borderWidth: 2,
            borderColor: '#2c90f3',
            color: '#2c90f3',
          },
          lineStyle:{
            color: '#2c90f3'
          },
          data: data[1]
        }]
      });
    },
    closeDialog(){
      this.$emit('closeTip')
    }
  }
}
</script>
<style lang="scss" scoped>
.tip-content {
  z-index: 10;
  width: 480px;
  height: 380px;
  background-image: linear-gradient(90deg, #0065ea 0%, #00a5ff 100%);
  border-radius: 6px;
  box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.12);
  .tip-header {
    height: 40px;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
    .info-body-left {
      width: 300px;
      height: 100%;
      .svg_icon_jiance {
        width: 22px;
        height: 22px;
        color: #ffffff;
        margin-right: 10px;
      }
      span {
        margin-left: 10px;
        color: #ffffff;
        font-size: 16px;
      }
    }
    .close {
      position: absolute;
      right: 6px;
      top: 6px;
      width: 24px;
      height: 24px;
      line-height: 24px;
      transition: all 0.2s;
      transform: rotate(0deg);
      transform-origin: center;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA4ElEQVRYR+2WUQ4CMQhEh5vozfRkejO9CaaJTYhpy8Cq7Uf3d4F5O8C2gsmPTNbHBtgOuA6o6klEnplhZXKHAKp6AXADcBWRewSCze0CFHoADyNKQxjxmn7uucg6UAu5EA3xYQ4zA7UNLkRUvBR0AUoQU5iJac0QBeBBZMVpByp5S+j9rmyK26JDDgwgbF13SD8h6BbYxIYT5XVYPNwCx4X/AHS+PtX/sANTh3C0aj9fQ0aAiUmtYaRwJLbCrHsYrXYch3f88IXE/HTmXckiV7BsbOosyIql1vCbYhtgSQdeDpKoIXzqLREAAAAASUVORK5CYII=')
        no-repeat;
      background-size: 100% 100%;
      &:hover {
        text-decoration: none;
        cursor: pointer;
        transform: rotate(90deg);
      }
    }
  }
  .tip-body {
    width: 100%;
    height: calc(100% - 40px);
    overflow: hidden;
    background-color: #ffffff;
    .detail {
      width: 100%;
      height: 150px;
      padding: 15px 20px;
      background-color: #f5f5f5;
      .item{
        width: 139px;
        height: 120px;
        background-color: #ffffff;
        .item-header{
          width: 139px;
          height: 22px;
          background-color: #2c90f3;
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          line-height: 22px;
          color: #ffffff;
          text-align: center;
        }
        .item-value{
          font-family: PingFang-SC-Heavy;
          font-size: 36px;
          line-height: 50px;
          color: #2c90f3;
        }
      }
    }
    .chart-panel {
      width: 100%;
      height: 193px;
      background-color: #ffffff;
      position: relative;
      .line-chart{
        width: 100%;
        height: 100%;
      }
      .tab-panel{
        position: absolute;
        top: 10px;
        right: 10px;
        list-style: none;
        z-index: 1;
        li{
          margin: 0px 10px;
          border-bottom: 2px solid transparent;
          font-family: PingFang-SC-Medium;
          font-size: 13px;
          line-height: 22px;
          color: #333333;
          cursor: pointer;
          &.active{
            border-bottom: 2px solid #2c90f3;
            color: #2c90f3;
          }
        }
      }
    }
  }

  .tooltip__arrow {
    width: 50px;
    height: 25px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background: white;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      top: 0;
      left: 50%;
      box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.12);
      border: solid 1px #dddddd;
    }
  }
}
</style>
