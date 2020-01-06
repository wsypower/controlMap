<template>
    <div class="info">
        <div><span>更新时间：</span>{{new Date(parseInt(info.updateTime))|date_format()}}</div>
        <div><span>水&emsp;&emsp;位：</span>{{info.currentLog.waterLevel}}</div>
        <div><span>信号强度：</span>{{info.currentLog.signalIntensity}}</div>
        <div><span>电池电压：</span>{{info.currentLog.batteryVoltage}}</div>
        <div><span>环境温度：</span>{{info.currentLog.ambientTemperature}}</div>
        <div><span>管理单位：</span>{{info.manageCompany}}</div>
        <div><span>管理人员：</span>{{info.managerName}}</div>
        <div><span>联系电话：</span>{{info.managerPhone}}</div>
        <div><span>是否告警：</span>{{info.alarmState === '2' ? '是' : '否' }}</div>
    </div>
</template>
<script type="text/ecmascript-6">
  export default{
      name: 'info',
      props:{
          info:{
              type: Object,
              default(){
                  return {}
              }
          }
      },
  }
</script>
<style lang="scss" scoped>
  .info{
      width: 100%;
      height:100%;
      padding: 17px;
      background-color: #ffffff;
  }
</style>
