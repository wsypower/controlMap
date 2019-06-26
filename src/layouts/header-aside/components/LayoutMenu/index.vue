<template>
  <div class="menu">
    <div class="menu__items">
      <cg-container scroll>
        <menu-item
          tabindex="0"
          v-for="(item,index) in menu"
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
import { mapState, mapActions } from 'vuex'
export default {
  name: 'LayoutMenu',
  components: {
    menuItem
  },
  data() {
    return {
      // 0为默认选择第一个，-1为不选择
      menuItemActive: -1,
      menu: [
        { name: '人员管控', icon: 'menu-section', path: '/section', active: false },
        { name: '车辆管控', icon: 'menu-car', path: '/car', active: false },
        { name: '案卷', icon: 'menu-records', path: '/records', active: false },
        { name: '视频', icon: 'menu-video', path: '/special', active: false },
        { name: '专题服务', icon: 'menu-special', path: '/video', active: false },
        { name: '应急指挥', icon: 'menu-emergency', path: '/emergency', active: false }
      ]
    }
  },
  computed: {
    ...mapState('cgadmin/menu', ['asideCollapse']),
    ...mapState('cgadmin/page', ['current'])
  },
  watch: {
    current(newValue, oldValue) {
      console.log(newValue)
      console.log(oldValue)
      this.asideCollapseToggle()
    }
  },
  methods: {
    ...mapActions('cgadmin/menu', ['asideCollapseSet', 'asideCollapseToggle']),
    menuItemClick(index, item) {
      let { active } = item
      item.active = !active
      this.asideCollapseSet(!active)
      this.$router.push(item.path)
      this.menu.map((v, i) => {
        if (i !== index) {
          v.active = false
        }
      })
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