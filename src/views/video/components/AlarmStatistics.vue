<template>
  <div class="chart-content">
    <div class="charts">
      <p>告警类型</p>
      <div id="alarm-type" style="width: 316px;height: 150px"></div>
    </div>
    <div class="charts">
      <p>高发路段</p>
      <div id="frequent-part" style="width: 316px;height: 196px"></div>
    </div>
    <div class="charts">
      <p>高发时段</p>
      <div style="background-color: #f5f5f5">
        <!--<button class="btn"><a-icon type="left" /></button>-->
        <!--<span style="padding-left: 122px;padding-right: 122px">四月</span>-->
        <!--<button class="btn" disabled><a-icon type="right" /></button>-->
        <a-button-group>
          <a-button type="default"> <a-icon type="left" /> </a-button>
          <span style="padding-left: 122px;padding-right: 122px">四月</span>
          <a-button type="default" disabled> <a-icon type="right" /> </a-button>
        </a-button-group>
      </div>
      <div id="frequent-time" style="width: 316px;height: 246px"></div>
    </div>
  </div>
</template>

<script>
import { getAlarmStatisticData } from '@/api/video/service'
import { alarmTypeChart, frequentPartChart } from '@/utils/util.tool.echarts'
export default {
  name: 'AlarmStatistics',
  mounted() {
    this.$nextTick().then(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      const _this = this
      //获取告警类型表格数据，并生成图表
      getAlarmStatisticData().then(data => {
        //告警类型图表
        _this.alarmTypeChart(data.alarmType)
        //高发路段图表
        _this.frequentPartChart(data.frequentPart)
      })
    },
    alarmTypeChart(data) {
      const alarmChart = this.$echarts.init(document.getElementById('alarm-type'))
      const alarmChartOption = alarmTypeChart(data)
      alarmChart.setOption(alarmChartOption)
    },
    frequentPartChart(data) {
      const frequentChart = this.$echarts.init(document.getElementById('frequent-part'))
      const frequentChartOption = frequentPartChart(data, this.$echarts)
      frequentChart.setOption(frequentChartOption)
    }
  }
}
</script>

<style scoped lang="scss">
.chart-content {
  margin: 10px 20px 0 20px;
  height: calc(100% - 40px);
  overflow-y: auto;
  .charts {
    margin-bottom: 10px;
    /deep/.ant-btn-default {
      width: 20px;
      padding: 0;
      border-radius: 0;
      background-color: #eeeeee;
    }
  }
}
</style>
