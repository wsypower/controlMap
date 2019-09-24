<template>
    <div class="info">
        <div><span>更新时间：</span>{{new Date(parseInt(info.updateTime))|date_format()}}</div>
        <div><span>探测距离：</span>{{info.currentLog.distance}}<span v-if="info.currentLog.distance!==null">M</span></div>
        <div><span>信噪比：</span>{{info.currentLog.snr}}<span v-if="info.currentLog.snr!==null">dBm</span></div>
        <div><span>电池电压：</span>{{info.currentLog.mainVoltage}}<span v-if="info.currentLog.mainVoltage!==null">V</span></div>
        <div><span>环境温度：</span>{{info.currentLog.temperature}}<span v-if="info.currentLog.temperature!==null">℃</span></div>
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
