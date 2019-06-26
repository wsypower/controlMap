<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'app',
  data() {
    return {
      zh_CN
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/layout/flex';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  // min-height: 500px;
}
</style>
