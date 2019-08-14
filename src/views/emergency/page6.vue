<template>
  <div class="page">
    <div class="content" flex="dir:left cross:top main:justify">
      <div class="item" @click="clickHandler">222</div>
      <!-- <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>-->
    </div>
  </div>
</template>

<script>
import { add } from '@/api/account/list'
export default {
  name: 'page6',
  data() {
    return {
      shw: true,
      title: '6666'
    }
  },
  methods: {
    reload() {
      this.$router.replace('/refresh')
    },
    clickHandler() {
      this.$router.push({
        path: '/emergency',
        query: {
          id: 123
        }
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    //先刷新页面路劲
    next()
    //指向refresh页面，然后再次跳转回本页面，重走页面的生命周期
    this.reload()
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