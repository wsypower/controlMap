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
        <layout-menu></layout-menu>
        <!-- 主体 右侧上按钮栏 -->
        <div class="container__aside--top">
          <a-button class="container__aside__item" type="primary">1</a-button>
          <a-button class="container__aside__item">2</a-button>
          <a-button class="container__aside__item">3</a-button>
          <a-button class="container__aside__item">4</a-button>
        </div>
        <!-- 主体 右侧下按钮栏 -->
        <div class="container__aside--bottom" flex="dir:top cross:top">
          <a-button class="container__aside__item">1</a-button>
          <a-button class="container__aside__item">2</a-button>
          <a-button class="container__aside__item">3</a-button>
          <a-button class="container__aside__item">4</a-button>
        </div>
        <!-- 主体 -->
        <div class="container__main">
          <!-- 功能抽屉 -->
          <layout-drawer>
            <router-view/>
          </layout-drawer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LayoutMenu, LayoutDrawer } from './components/index'
export default {
  name: 'layoutHeaderAside',
  components: {
    LayoutMenu,
    LayoutDrawer
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.layout {
  &__group {
    @extend %fu;
  }

  &__content {
    @extend %fu;
    position: relative;
  }
}
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

//content
.container {
  width: 100%;
  height: 100%;
  &__main {
    width: calc(100% - 60px);
    height: 100%;
  }
}
.container__aside--top {
  width: 40px;
  position: absolute;
  top: 73px;
  right: 10px;
}
.container__aside--bottom {
  width: 40px;
  position: absolute;
  bottom: 17px;
  right: 10px;
}
.container__aside--bottom,
.container__aside--top {
  .container__aside__item {
    :nth-last-child() {
      margin-bottom: 0;
    }
  }
}
.container__aside__item {
  width: 40px;
  height: 40px;
  box-shadow: 0px 2px 10px 0px rgba(6, 61, 114, 0.2);
  border-radius: 4px;
  margin-bottom: 10px;
}
.container__main {
  width: calc(100% - 60px);
  height: 100%;
  background: rgb(244, 244, 245);
  /deep/ .ant-drawer-content-wrapper {
    top: 60px !important;
    left: 60px;
  }
}
</style>
