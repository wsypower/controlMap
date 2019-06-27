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
      this.asideCollapseSet(!active)
      // this.menuItemActivePath = item.path
      // this.$router.replace(item.path)
      this.asideSetItemActive(item).then(() => {
        console.log(1)
      })
    }
  },
  watch: {
    /**
     * TODO:后续修改*
     * @description 不能通过路由路径判断(页面会先跳转再执行动画)，通过判断aside改变控制侧边栏的路径跳转收缩动画
     * @author weiyafei
     * @date 2019-06-27-11:34:07
     */
    aside: {
      // handler(newValue, oldValue) {
      //   //获取改变后的aside激活的对象
      //   let newValueChange = newValue.filter(item => item.active)[0]
      //   let oldValueChange = oldValue.filter(item => item.active)[0]
      //   console.log(newValueChange)
      //   console.log(oldValueChange)
      //   //做收起动画并跳转到被点击的页面
      //   this.asideCollapseToggle().then(() => {
      //     setTimeout(() => {
      //       this.asideCollapseSet(true).then(() => {
      //         this.$router.replace(this.menuItemActivePath)
      //       })
      //     }, 300)
      //   })
      // },
      // deep: true
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