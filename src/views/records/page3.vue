<template>
  <div class="page">
    <div class="content" flex="dir:left main:justify cross:top">
      <div class="item" @click="clickHandler">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page3',
  mounted() {
    console.log('emergency')
  },
  methods: {
    clickHandler() {
      this.$router.push({
        path: '/emergency',
        query: {
          id: 123
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  background-color: #f4f4f5;
  padding-top: 60px;
  .content {
    width: 100%;
    height: 100%;
    padding: 20px;
    flex-wrap: wrap;
    .item {
      width: 240px;
      height: 240px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0px 4px 13px 1px #e0e7f14a;
    }
  }
}
</style>