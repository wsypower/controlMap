<template>
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
      <!-- 系统LOGO -->
      <div class="header__icon--warp" flex="main:center cross:center">
        <cg-icon-svg name="logo" class="header__logo__icon"></cg-icon-svg>
      </div>
      <!-- 系统名称 -->
      <div class="header__title" flex="cross:center">
        <cg-icon-svg name="title" class="header__title__icon"></cg-icon-svg>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  name: 'LayoutHeader',
  data() {
    return {}
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  position: absolute;
  top: 0px;
  z-index: 10;
  // 头部
  &__status {
    width: 100%;
    height: 53px;
    background-color: $color-header-white;
    box-shadow: 0px 1px 10px 0px rgba(4, 39, 77, 0.2);
    // 头部蓝色条
    &--topline {
      height: 13px;
      width: 100%;
      background-image: $color-top-line;
    }
  }
  // 头部logo&title包裹层
  &__name {
    position: absolute;
    left: 0;
    top: 0;
    width: 449px;
    height: 100%;
  }
  //logo包裹层
  &__icon--warp {
    width: 60px;
    height: 60px;
    background: $color-header-logo-bc;
  }
  //logo => SVG
  &__logo__icon {
    font-size: $fs-header-logo;
    color: #fff;
  }
  //title包裹层
  &__title {
    width: 389px;
    height: 100%;
    background: url('~@img/layout-header-title-bc.png') no-repeat;
    padding-left: 24px;
    overflow: hidden;
    //title => SVG
    &__icon {
      font-size: $fs-header-title;
      color: #fff;
    }
  }
}
</style>