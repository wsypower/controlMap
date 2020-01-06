<template>
    <div class="info">
        <div><span>名&emsp;&emsp;称：</span>{{info.deviceName}}</div>
        <div><span>水&emsp;&emsp;位：</span>{{info.currentLog.waterLevel}}<span v-if="info.currentLog.waterLevel!==null">M</span></div>
        <div>
            <span>是否告警：</span>
            <span v-if="info.deviceName==='长河西'">{{info.currentLog.waterLevel - 1.6 > 0 ? '是':'否'}}</span>
            <span v-else>{{info.currentLog.waterLevel - 1.9 > 0 ? '是':'否'}}</span>
        </div>
        <div><span>管理单位：</span>{{info.manageCompany}}</div>
        <div><span>管理人员：</span>{{info.managerName}}</div>
        <div><span>联系电话：</span>{{info.managerPhone}}</div>
        <div><span>更新时间：</span>{{new Date(parseInt(info.updateTime))|date_format()}}</div>
        <!--<div><span>是否告警：</span>{{info.alarmState === '2' ? '是' : '否' }}</div>-->
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
