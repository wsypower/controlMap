<template>
  <!-- 外包裹 -->
  <div class="cg-layout-header-aside-group">
    <!-- 主体内容 -->
    <div class="cg-layout-header-content">
      <!-- 顶栏 -->
      <div class="cg-header"></div>
      <!-- 主体 -->
      <div class="cg-container">
        <!-- 主体 左侧边栏 -->
        <div class="cg-container-meau"></div>
        <!-- 主体 右侧按钮栏 -->
        <div class="cg-container-aside"></div>
        <!-- 主体 -->
        <div class="cg-container-main">地图的位置</div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'layoutHeaderAside',
  data() {
    return {}
  },
  mounted() {
    this.$axios
      .post('@text/login', {
        username: 'admin',
        password: '123456'
      })
      .then(res => {
        console.log(res)
      })
  }
}
</script>

<style lang="scss" scoped>
// 外层包裹
.cg-layout-header-aside-group {
  width: 100%;
  height: 100%;
}
.cg-layout-header-content {
}
</style>