<template>
  <div class="info">
    <div flex><span>桥梁名称：</span><span class="">{{ info.bridgeName }}</span></div>
    <div flex><span>结构类型：</span><span class="">{{ info.bridgeStructure }}</span></div>
    <div flex><span>详细地址：</span><span class="value">{{ info.bridgeAddr }}</span></div>
    <div flex><span>完成日期：</span><span class="">{{ info.completeTime }}</span></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default{
    name: 'bridge-info',
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
.info {
  width: 100%;
  height: 100%;
  padding: 17px;
  background-color: #ffffff;
  .value{
    width: 220px;
  }
}
</style>
