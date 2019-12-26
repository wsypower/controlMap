<template>
    <div class="info">
        <div><span>名称：</span>{{info.deviceName}}</div>
        <div><span>水位：</span>{{info.currentLog.waterLevel}}<span v-if="info.currentLog.waterLevel!==null">M</span></div>
        <div>
            <span>是否告警：</span>
            <span v-if="info.deviceName==='长河西'">{{info.currentLog.waterLevel - 1.6 > 0 ? '是':'否'}}</span>
            <span v-else>{{info.currentLog.waterLevel - 1.9 > 0 ? '是':'否'}}</span>
        </div>
        <div><span>更新时间：</span>{{new Date(parseInt(info.updateTime))|date_format()}}</div>
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
