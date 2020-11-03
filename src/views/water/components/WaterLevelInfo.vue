<template>
    <div class="info">
        <div><span>更新时间：</span>{{new Date(parseInt(info.updateTime))|date_format()}}</div>
        <div><span>液位：</span>{{info.currentLog.waterLevel}}<span v-if="info.currentLog.waterLevel!==null">M</span></div>
        <div><span>电池电压：</span>{{info.currentLog.voltage}}<span v-if="info.currentLog.voltage!==null">V</span></div>
        <div><span>gprs信号：</span>{{info.currentLog.gprs}}</div>
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
