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
#nprogress {
  .bar {
    background: rgba(34, 159, 255, 0.7) !important; //自定义颜色
    z-index: 200000 !important;
    height: 4px !important;
  }
  .peg {
    background: rgba(34, 159, 255, 0.7) !important; //自定义颜色
    box-shadow: 0 0 5px rgba(34, 159, 255, 0.7), inset 0 0 5px rgba(58, 161, 250, 0.4) !important;
    // box-shadow: 0 0 10px $color-primary, 0 0 5px $color-primary !important;
  }
}
</style>
