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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="179px"
              height="25px"
            >
              <image
                x="0px"
                y="0px"
                width="179px"
                height="25px"
                xlink:href="data:img/png;base64,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"
              ></image>
            </svg>
          </div>
        </div>
      </div>
      <!-- 主体 -->
      <div class="container" flex>
        <!-- 主体 左侧边栏 -->
        <div class="container__menu"></div>
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