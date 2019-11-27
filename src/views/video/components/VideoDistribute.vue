<template>
  <div class="content">
    <a-input-search placeholder="请输入查询人姓名" @search="onSearch" enterButton="搜索"/>
  </div>
</template>

<script>
export default {
  name: 'VideoDistribute'
}
</script>

<style scoped lang="scss">
.content{
    margin: 26px 20px 0 20px;
}
</style>
