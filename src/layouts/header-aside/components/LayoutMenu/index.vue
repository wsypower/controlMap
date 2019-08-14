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
  watch: {
    current(newCurrent, oldCurrent) {
      const aside = this.aside
      this.currentAsideSetActive(aside, newCurrent)
    }
  },
  computed: {
    ...mapState('cgadmin/menu', ['aside', 'asideCollapse']),
    ...mapState('cgadmin/page', ['current'])
  },
  methods: {
    ...mapActions('cgadmin/menu', ['asideCollapseSet', 'asideSetItemActive']),
    /**
     * @description 点击激活,展开侧边栏，跳转路径
     * @author weiyafei
     * @date 2019-06-26-11:14:25
     * @param {Number} index
     * @param {Object} item
     */

    menuItemClick(index, item) {
      console.log('点击了')
      //当前元素设置active设为true，其他设为false
      this.asideSetItemActive(item).then(isCollapse => {
        //TODO:(貌似search更快一点，实际再测试)判断点击页是否是当前页或当前页子页面
        const isPath = this.current.includes(item.path)
        this.menuItemCange(item).then(() => {
          this.$router.replace(item.path)
        })
        // if (!isPath)
        //   this.menuItemCange(item).then(() => {
        //     this.$router.replace(item.path)
        //   })
        // else this.asideCollapseSet(isCollapse)
      })
    },
    /**
     * @description 切换不同页面时menu做一个关闭再打开的动画（表示切换）
     * @author weiyafei
     * @date 2019-06-27-16:33:30
     * @param {Object} item 点击的元素
     */
    menuItemCange(item) {
      //当前menu伸缩状态
      let asideCollapse = this.asideCollapse
      return new Promise(resolve => {
        if (asideCollapse) {
          this.asideCollapseSet(false)
          setTimeout(() => (this.asideCollapseSet(true), resolve()), 400)
        } else {
          this.asideCollapseSet(true), resolve()
        }
      })
    },
    /**
     * @description 点亮当前页或当前页的顶层路径图标
     * @author weiyafei
     * @date 2019-08-12-16:59:37
     * @param {Array} aside 侧边栏
     * @param {String} current 当前页
     */
    currentAsideSetActive(aside, current) {
      return aside.map((item, arr) => (current.includes(item.path) ? (item.active = true) : (item.active = false)))
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
