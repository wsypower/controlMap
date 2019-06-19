import { extends } from '../../../.eslintrc';
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
        <div class="cg-container-menu"></div>
        <!-- 主体 右侧按钮栏 -->
        <div class="cg-container-aside"></div>
        <!-- 主体 -->
        <div class="cg-container-main">地图的位置</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layoutHeaderAside',
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
/*=============================================
=                   包裹层                     =
=============================================*/
.cg-layout-header-aside-group {
  @extend %full;
  .cg-layout-header-content {
     @extend %full;
    background-color: saddlebrown;
  }
}

/*=============================================
=                   header                    =
=============================================*/
.cg-header {
  width: 100%;
  height: 60px;
  background-color: red;
}
/*=============================================
=                   content                   =
=============================================*/

/*=============================================
=                    menu                     =
=============================================*/

/*=============================================
=                    aside                    =
=============================================*/
</style>