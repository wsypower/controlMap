<template>
  <div class="menu">
    <div class="menu__items">
      <cg-container scroll>
        <menu-item
          tabindex="0"
          v-for="(item,index) in aside"
          :key="index"
          :class="item.active ? 'menu__item--active':''"
          :icon="item.icon"
          @handlerClick="menuItemClick(index,item)"
        ></menu-item>
      </cg-container>
    </div>
  </div>
</template>

<script>
import menuItem from '../components/menu-item/index'
import { mapState, mapActions, mapMutations } from 'vuex'
import router from '../../../../router'
export default {
  name: 'LayoutMenu',
  components: {
    menuItem
  },
  data() {
    return {
      menuItemActivePath: null //被点击元素的path
    }
  },
  computed: {
    ...mapState('cgadmin/menu', ['aside', 'asideCollapse']),
    ...mapState('cgadmin/page', ['current'])
  },
  methods: {
    ...mapActions('cgadmin/menu', ['asideCollapseSet', 'asideCollapseToggle']),
    ...mapMutations('cgadmin/menu', ['asideSetItemActive']),
    /**
     * @description 点击激活,展开侧边栏，跳转路径
     * @author weiyafei
     * @date 2019-06-26-11:14:25
     * @param {Number} index
     * @param {Object} item
     */
    menuItemClick(index, item) {
      let { active } = item
      this.menuItemActivePath = item.path
      this.asideSetItemActive(item)
      this.asideCollapseSet(!active)
    }
  },
  watch: {
    aside: {
      handler(newValue, oldValue) {
        this.asideCollapseToggle().then(() => {
          setTimeout(() => {
            this.asideCollapseSet(true).then(() => {
              this.$router.replace(this.menuItemActivePath)
            })
          }, 300)
        })
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
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
  &__item--active {
    background-color: $color-menu-item-bc;
  }
}
</style>