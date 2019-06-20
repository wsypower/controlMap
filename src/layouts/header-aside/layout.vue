<template>
  <!-- 外包裹 -->
  <div class="layout__group">
    <!-- 主体内容 -->
    <div class="layout__content">
      <!-- 顶栏 -->
      <div class="header">
        <div class="header__status">
          <!-- 头部装饰线 -->
          <div class="header__status--topline"></div>
          <!-- 本地天气 -->
          <div class="header__weather"></div>
          <!-- 本地时间 -->
          <div class="header__time"></div>
        </div>
        <div class="header__name" flex>
          <!-- 系统icon -->
          <div class="header__icon"></div>
          <!-- 系统名称 -->
          <div class="header__title" flex="cross:center">
            <cg-icon-svg name="title" class="header__title__icon"></cg-icon-svg>
          </div>
        </div>
      </div>
      <!-- 主体 -->
      <div class="container" flex>
        <!-- 主体 左侧边栏 -->
        <div class="container__menu">
          <div class="container__menu__item"></div>
        </div>
        <!-- 主体 右侧按钮栏 -->
        <div class="container__aside"></div>
        <!-- 主体 -->
        <div class="ccontainer__main"></div>
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
@import './index';
</style>