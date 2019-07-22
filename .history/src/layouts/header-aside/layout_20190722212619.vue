<template>
  <!-- 外包裹 -->
  <div class="layout__group">
    <!-- 主体内容 -->
    <div class="layout__content">
      <!-- 加载动效 -->
      <a-spin tip="Loading..." size="large" :spinning="Spinning" :indicator="indicator">
        <!-- 顶栏 -->
        <layout-header />
        <!-- 主体 -->
        <div class="container" flex>
          <!-- 主体 左侧边栏 -->
          <layout-menu />
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
              <keep-alive :include="keepAlive">
                <router-view />
              </keep-alive>
            </layout-drawer>
            <!-- 地图控件注入地址 -->
            <LayoutMap />
          </div>
        </div>
      </a-spin>
    </div>
  </div>
</template>

<script>
import { LayoutMenu, LayoutDrawer, LayoutHeader, Loading } from './components/index'
import LayoutMap from '@/views/map/index.vue'
import { mapState } from 'vuex'
export default {
  name: 'layoutHeaderAside',
  components: {
    LayoutMenu,
    LayoutDrawer,
    LayoutMap,
    LayoutHeader,
    Loading
  },
   data() {
    return {
      indicator: h => {
        return <div>1111</div>
      }
    }
  },
  computed: {
    ...mapState('cgadmin', {
      //缓存页面 ====> keep-alive
      keepAlive: state => state.page.keepAlive,
       //页面加载提示 ====> login接口resolve后消失
      Spinning: state => state.page.Spinning
    })
  },
  data() {
    return {}
  },
  methods: {}
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
    /* ant-Vue spin修改样式*/
    /deep/.ant-spin-nested-loading {
      width: 100%;
      height: 100%;
    }
    /deep/.ant-spin-container {
      width: 100%;
      height: 100%;
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
}
</style>
