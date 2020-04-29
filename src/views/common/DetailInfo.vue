<template>
  <div class="tip-content">
    <div class="tip-header" flex="dir:left">
      <div class="info-body-left" flex="cross:center">
        <cg-icon-svg name="jiance" class="svg_icon_jiance"></cg-icon-svg>
        <span>{{ info.detailMessage.name }}</span>
      </div>
      <div class="close" flex="main:center cross:center" @click="closeDialog"></div>
    </div>
    <div class="tip-body">
      <div class="detail" flex="dir:left main:justify">
        <div class="detail-left" flex="dir:left cross:center">
          <img v-if="info.type === 'water'" src="~@img/shui.png" />
          <img v-if="info.type === 'gas'" src="~@img/ranqi.png" />
          <img v-if="info.type === 'light'" src="~@img/ludeng.png" />
          <div class="mes" flex="dir:top" v-if="info.type === 'water' || info.type === 'gas'">
            <span>{{ info.detailMessage.value }}<em>{{ info.detailMessage.unit }}</em></span>
            <span>当前监测值</span>
          </div>
          <div class="mes" v-if="info.type === 'light'">
            当前状态
          </div>
        </div>
        <div class="detail-right" flex="dir:left cross:bottom" v-if="info.type === 'water' || info.type === 'gas'">
          <span v-if="info.detailMessage.yty>0">
            日同比&nbsp;+{{ info.detailMessage.yty }}{{ info.detailMessage.unit }}
            <a-icon style="color: #50cf3f" type="arrow-up" />
          </span>
          <span v-else-if="info.detailMessage.yty === 0">
            日同比&nbsp;+{{ info.detailMessage.yty }}{{ info.detailMessage.unit }}
          </span>
          <span v-else>
            日同比&nbsp;{{ info.detailMessage.yty }}{{ info.detailMessage.unit }}
            <a-icon style="color: #f07171" type="arrow-down" />
          </span>
          <span v-if="info.detailMessage.mtm>0">
            日环比&nbsp;+{{ info.detailMessage.mtm }}{{ info.detailMessage.unit }}
            <a-icon style="color: #50cf3f" type="arrow-up" />
          </span>
          <span v-else-if="info.detailMessage.mtm === 0">
            日环比&nbsp;+{{ info.detailMessage.mtm }}{{ info.detailMessage.unit }}
          </span>
          <span v-else>
            日环比&nbsp;{{ info.detailMessage.mtm }}{{ info.detailMessage.unit }}
            <a-icon style="color: #f07171" type="arrow-down" />
          </span>
        </div>
        <div class="detail-right" flex="dir:left cross:center" v-if="info.type === 'light'">
          <span class="status-c">{{info.detailMessage.online ? '在线' : '离线' }}</span>
        </div>
      </div>
      <div v-if="info.chartData[0].length>0" class="line-chart" ref="lineChart"></div>
      <div v-else class="nodata-panel">
        <span class="nodata">暂无数据</span>
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

    }
  },
  props:{
    info:{
      default(){
        return {
          type: 'water',
          detailMessage:{
            name: '',
            flagName: '',
            value: 0,
            unit: '',
            yty: 0,
            mtm: 0
          },
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
      if(val[0].length>0){
        this.chartInit(val);
      }
    }
  },
  methods:{
    closeDialog(){
      this.$emit('closeTip')
    },
    //初始化图表
    chartInit(data){
      let titleName = this.info.detailMessage.flagName;
      let unitName = this.info.detailMessage.unit;
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
            let text = params[0].seriesName + '：' + params[0].value + unitName;
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
          name: titleName,
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
    }
  }
}
</script>
<style lang="scss" scoped>
.tip-content {
  z-index: 10;
  width: 480px;
  height: 335px;
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
      height: 102px;
      padding: 0px 20px 0px 30px;
      background-color: #f5f5f5;
      .detail-left {
        img {
          width: 72px;
          height: 72px;
        }
        .mes {
          padding: 0px 15px;
          span {
            font-family: PingFang-SC-Heavy;
            font-size: 36px;
            color: #2c90f3;
            line-height: 30px;
            em {
              font-size: 14px;
              font-style: normal;
            }
          }
          span:last-child {
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #666666;
            line-height: 15px;
          }
        }
      }
      .detail-right {
        padding-bottom: 20px;
        span {
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          color: #333333;
          &:first-child {
            margin-right: 20px;
          }
          i {
          }
        }
        .status-c{
          font-family: PingFang-SC-Heavy;
          font-size: 30px;
          color: #2c90f3;
          margin-bottom: -20px;
        }
      }
    }
    .line-chart,.nodata-panel{
      width: 100%;
      height: 193px;
      background-color: #ffffff;
    }
    .nodata-panel{
      line-height: 193px;
      text-align: center;
      .nodata{
        font-size: 16px;
        color: #999999;
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
