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
          <div class="menu__items">
            <cg-container scroll>
              <div
                tabindex="0"
                class="menu__item"
                flex="main:center cross:center"
                v-for="(item,index) in menu"
                :key="item.icon"
                :class="menuItemActive == index ? 'menu__item--active':''"
                @click="handlerMenuClick(index)"
              >
                <cg-icon-svg :name="item.icon" class="menu__item__icon"></cg-icon-svg>
              </div>
            </cg-container>
          </div>
        </div>
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
import { LayoutDrawer } from './components/index'
export default {
  name: 'layoutHeaderAside',
  components: {
    LayoutDrawer
  },
  data() {
    return {
      // 0为默认选择第一个，-1为不选择
      menuItemActive: -1,
      menu: [
        { name: '人员管控', icon: 'menu-section' },
        { name: '车辆管控', icon: 'menu-car' },
        { name: '案卷', icon: 'menu-records' },
        { name: '视频', icon: 'menu-video' },
        { name: '专题服务', icon: 'menu-special' },
        { name: '应急指挥', icon: 'menu-emergency' }
      ],
      visible: false
    }
  },
  methods: {
    // 把当前点击元素的index，赋值给menuItemActive
    // 点击启动激活状态
    // 重复点击取消激活状态
    handlerMenuClick(index) {
      this.menuItemActive == index ? (this.menuItemActive = -1) : (this.menuItemActive = index)
    }
  },
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
//menu
.menu {
  width: 60px;
  height: calc(100% - 60px);
  background-image: $color-menu;
  position: relative;
  top: 60px;
  z-index: 9;
  &__items {
    position: absolute;
    height: 100%;
    width: 60px;
    /deep/.cg-container-full-bs__body-wrapper-inner {
      padding-top: 50px;
      padding-bottom: 50px;
    }
  }
  &__slider {
    width: 60px;
    height: 60px;
    background-color: $color-menu-item-bc;
    position: absolute;
    top: 50px;
    opacity: 0.4;
  }
  //menu-item
  &__item {
    width: 60px;
    height: 60px;
    cursor: pointer;
    margin-bottom: 28px;
    transition: 0.5s;
    z-index: 2;
    border-radius: 3px;
    outline: 0;
    &:active {
      background-color: rgb(19, 85, 199);
    }
    &--active {
      background-color: $color-menu-item-bc;
    }
    // &:hover {
    //   background-color: $color-menu-item-bc;
    // }
    // background-color:$color-menu-item-bc;
    &__icon {
      font-size: $fs-menu-item-icon;
      color: $color-menu-item;
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
