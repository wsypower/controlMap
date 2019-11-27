/**
 * @description: ecarts样式
 * @author:sijianting
 * @createDate:2019/10/22 17:05
 */

/**
 * @description:告警类型图表配置
 * @author:sijianting
 * @createDate:2019/10/24 16:57
 */
export function alarmTypeChart(chartData) {
  let total = 0
  chartData.forEach(item => {
    total += item.value
  })
  return {
    grid: {
      top: 10,
      left: 5,
      right: 5,
      bottom: 10,
      containLabel: true
    },
    title: {
      text: total,
      subtext: '告警总数',
      itemGap: 5,
      top: 55,
      left: 95,
      textAlign: 'center',
      textStyle: {
        color: '#333333',
        fontSize: 23,
        width: 200,
        align: 'right',
        rich: {
          a: {
            width: 80,
            align: 'right'
          }
        }
      },
      subtextStyle: {
        color: '#999999',
        fontSize: 12
      }
    },
    tooltip: {
      show: true
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: '0',
      top: 'middle',
      icon: 'roundRect',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        color: '#333333',
        fontSize: 12,
        padding: [0, 0, 0, 2],
        width: 90
      },
      pageIconSize: 10,
      formatter: function(name) {
        let index = 0
        const clientlabels = chartData.map(data => {
          return data.name
        })
        const clientcounts = chartData.map(data => {
          return data.value
        })
        clientlabels.forEach(function(value, i) {
          if (value == name) {
            index = i
          }
        })
        return name + '  ' + clientcounts[index]
      }
    },
    series: [
      {
        type: 'pie',
        center: ['32%', '50%'],
        radius: ['60%', '80%'],
        color: ['#febb08', '#f07171', '#50cf3f', '#2c90f3', '#3fcfc0', '#7c2cf3', '#ba6112', '#FE2C8A'],
        startAngle: 135,
        label: {
          show: false
        },
        data: chartData
      }
    ]
  }
}

/**
 * @description:高发路段图表配置
 * @author:sijianting
 * @createDate:2019/10/24 16:57
 */
export function frequentPartChart(chartData,echarts) {
  const xData = chartData.map(item => {
    return item.name
  })
  const yData = chartData.map(item => {
    return item.value
  })
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: 50,
      left: 5,
      right: 5,
      bottom: 10,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: xData,
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#dddddd'
          }
        }
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '15%',
        data: yData,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#6a7bfa' },
            { offset: 1, color: '#95a0f4' }
          ]),
          borderWidth: 1,
          // borderColor: '#ffffff'
        }
      }
    ]
  }
}

/**
 * @description:高发时段图表配置
 * @author:sijianting
 * @createDate:2019/10/25 10:53
 */
export function frequentTimeChart(chartData,echarts) {
  return {

  }
}