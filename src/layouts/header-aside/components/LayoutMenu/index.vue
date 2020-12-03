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
          :title="item.title"
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
  mounted(){},
  computed: {
    ...mapState('cgadmin/menu', ['aside', 'asideCollapse']),
    ...mapState('cgadmin/page', ['current'])
  },
  watch:{
    aside: function(newValue){
      console.log('menu watcher');
      // 根据hash来打开对应的页面
      let hash = this.getUrlHash();
      //streetlight  // bridge
      if(hash === 'streetlight' || hash === 'bridge' || hash === 'streetVideo'){
        this.menuItemClick(0,newValue[0]);
      }
    }
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
      if(item.title==='sso'){
        window.open('http://luan.fitbright.cn/index.php/FitbrightSso/zhcg_login?username=luanzhihuichengguan&password=luanzhihuichg123');
        return
      }
      //当前元素设置active设为true，其他设为false
      this.asideSetItemActive(item).then(isCollapse => {
        //TODO:(貌似search更快一点，实际再测试)判断点击页是否是当前页或当前页子页面
        const isPath = this.current.includes(item.path)
        if (!isPath)
          this.menuItemCange(item).then(() => {
            this.$router.replace(item.path)
          })
        else this.asideCollapseSet(isCollapse)
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
    getUrlHash() {
      let hash = window.location.hash;

      console.log('URL#/：',hash.substring(2));
      return hash.substring(2)
    }
  }
}
</script>

<style lang="scss" scoped>
//menu
.menu {
  width: 60px;
  height: 100%;
  background-image: $color-menu;
  position: relative;
  top: 0px;
  z-index: 9;
  &__items {
    position: absolute;
    height: 100%;
    width: 60px;
    ::v-deep.cg-container-full-bs__body-wrapper-inner {
      padding-top: 50px;
      padding-bottom: 50px;
    }
  }
  &__item--active {
    background-color: $color-menu-item-bc;
  }
}
</style>