<template>
  <!-- 外包裹 -->
  <div class="layout__group">
    <!-- 主体内容 -->
    <div class="layout__content">
      <!-- 顶栏 -->
      <layout-header />
      <!-- 主体 -->
      <div class="container" flex>
        <!-- 主体 左侧边栏 -->
        <layout-menu></layout-menu>
        <!-- 主体 右侧上按钮栏 -->
        <div class="container__aside--top">
          <a-button class="container__aside__item" type="primary">1</a-button>
          <a-button class="container__aside__item" >2</a-button>
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
              <router-view></router-view>
          </layout-drawer>
          <!-- 地图控件注入地址 -->
          <LayoutMap ref="olMap"></LayoutMap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LayoutMenu, LayoutDrawer, LayoutHeader } from './components/index'
import LayoutMap from '@/views/map/olMap.vue'
export default {
  name: 'layoutHeaderAside',
  components: {
    LayoutMenu,
    LayoutDrawer,
    LayoutMap,
    LayoutHeader
  },
  data() {
    return {}
  },
  methods: {

  },
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
}
</style>
