<template>
  <!-- 外包裹 -->
  <div class="layout__group">
    <!-- 主体内容 -->
    <div class="layout__content">
      <!-- 加载动效 -->
      <loading>
        <!-- 顶栏 -->
        <layout-header />
        <!-- 主体 -->
        <div class="container" flex>
          <!-- 主体 左侧边栏 -->
          <layout-menu />
          <!-- 主体 右侧上按钮栏 -->
          <div class="container__aside--top">
            <!---->
            <div v-if="showSelect">
              <LayersSwitch :class="{'select-active':showType == 'select'}" @show="showSelect"></LayersSwitch>
            </div>
            <div v-if="showQuery">
              <LayersQuery :class="{'query-active':showType == 'query'}" @show="showQuery"></LayersQuery>
            </div>
            <a-button class="container__aside__item" @click="showLayerSwitch">
              <img src="@/assets/mapImage/layer.png" alt="" class="icon">
            </a-button>
            <!-- <a-button class="container__aside__item" @click="showLayerQuery">
              <a-icon type="search" style="font-size: 20px;color: rgb(0, 145, 248);" />
            </a-button> -->
            <!--<a-button class="container__aside__item">2</a-button>-->
            <!--<a-button class="container__aside__item">3</a-button>-->
            <!--<a-button class="container__aside__item">4</a-button>-->
          </div>
          <!-- 主体 右侧下按钮栏 -->
          <!--<div class="container__aside&#45;&#45;bottom" flex="dir:top cross:top">-->
          <!--<a-button class="container__aside__item">1</a-button>-->
          <!--<a-button class="container__aside__item">2</a-button>-->
          <!--<a-button class="container__aside__item">3</a-button>-->
          <!--<a-button class="container__aside__item">4</a-button>-->
          <!--</div>-->
          <!-- 主体 -->
          <div class="container__main">
            <!-- 功能抽屉 -->
            <layout-drawer>
              <keep-alive :include="keepAlive">
                <router-view />
              </keep-alive>
            </layout-drawer>
            <heatmap-analysis v-if="showHeatmapAnalysis"></heatmap-analysis>
            <!-- 地图控件注入地址 -->
            <LayoutMap ref="olMap"></LayoutMap>
          </div>
        </div>
      </loading>
    </div>
  </div>
</template>
<script>
import { LayoutMenu, LayoutDrawer, LayoutHeader, Loading } from './components/index';
import LayoutMap from '@/views/map/olMap.vue';
import LayersSwitch from '@/layouts/menu-right/LayersSwitch.vue'
import LayersQuery from '@/layouts/menu-right/LayersQuery.vue'
import HeatmapAnalysis from '@/views/records/components/statisticalAnalysis/HeatmapAnalysis.vue'
import { mapState } from 'vuex'
export default {
  name: 'layoutHeaderAside',
  components: {
    LayoutMenu,
    LayoutDrawer,
    LayoutMap,
    LayoutHeader,
    Loading,
    LayersSwitch,
    LayersQuery,
    HeatmapAnalysis
  },
  data() {
    return {
      showSelect: false,
      showQuery: false,
      showType: ''
    }
  },
  computed: {
    ...mapState('cgadmin', {
      //缓存页面 ====> keep-alive
      keepAlive: state => state.page.keepAlive
    }),
    ...mapState('map', ['showHeatmapAnalysis'])
  },
  methods: {
    showLayerSwitch() {
      this.showSelect = !this.showSelect;
      if (this.showSelect) {
        this.showType = 'select';
      } else {
        this.showType = '';
      }
    },
    showLayerQuery() {
      this.showQuery = !this.showQuery;
      if (this.showQuery) {
        this.showType = 'query';
      } else {
        this.showType = '';
      }
    },
    showChange(type) {
      if (this.showType == type) {
        this.showType = '';
        if (type == 'select') {
          this.showSelect = false;
        } else if (type == 'query') {
          this.showQuery = false;
        }
      } else {
        this.showType = type;
        if (type == 'select') {
          this.showSelect = true;
        } else if (type == 'query') {
          this.showQuery = true;
        }
      }
    }
  }
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

  .select-active {
    z-index: 999;
  }

  .query-active {
    z-index: 999;
  }
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
    z-index: 99;
    padding: 0;

    :last-child {
      margin-bottom: 0;
    }

    .icon {
      width: 20px;
      height: 20px;
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