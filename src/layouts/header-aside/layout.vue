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
      <!-- 主体 -->
      <div class="container" flex>
        <!-- 主体 左侧边栏 -->
        <div class="menu">
          <div class="menu__item" flex="main:center cross:center">
            <cg-icon-svg name="menu-section" class="menu__item__icon"></cg-icon-svg>
          </div>
          <div class="menu__item" flex="main:center cross:center"></div>
          <div class="menu__item" flex="main:center cross:center"></div>
          <div class="menu__item" flex="main:center cross:center"></div>
          <div class="menu__item" flex="main:center cross:center"></div>
          <div class="menu__item" flex="main:center cross:center"></div>
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
import { LayoutHeader, LayoutMenu } from './components/index'
export default {
  name: 'layoutHeaderAside',
  components: {
    LayoutMenu
  },
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.layout {
  &__group {
    @extend %full;
  }

  &__content {
    @extend %full;
  }
}
.header {
  width: 100%;
  height: 60px;
  position: relative;
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
    background: #064ac2;
  }
  //logo => SVG
  &__logo__icon {
    font-size: 34px;
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
      font-size: 12em;
    }
  }
}
//menu
.menu {
  width: 60px;
  height: 100%;
  background-image: $color-menu;
  padding-top: 50px;
  //menu-item
  &__item {
    width: 60px;
    height: 60px;
    cursor: pointer;
    margin-bottom: 28px;
    background-color: #00a4fe;
    &__icon {
      font-size: 22px;
      color: #fff;
    }
  }
}
//content
.container {
  width: 100%;
  height: calc(100% - 60px);
}
.ontainer__aside {
}

.container__main {
}
</style>