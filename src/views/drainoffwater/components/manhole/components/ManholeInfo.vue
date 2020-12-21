<template>
  <div class="info">
    <div><span>当前状态：</span>{{ info.statusName }}</div>
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
.info {
  width: 100%;
  height: 100%;
  padding: 17px;
  background-color: #ffffff;
}
</style>
