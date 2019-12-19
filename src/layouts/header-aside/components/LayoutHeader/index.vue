<template>
  <div class="header">
    <div class="header__status" flex="main:right">
      <ul flex="cross:center">
        <li :class="{active:activeModule == 'jm'}" @click="toPage('jm')"><cg-icon-svg name="jiemian" class="svg_icon jiemian"></cg-icon-svg>智慧街面</li>
        <li :class="{active:activeModule == 'sz'}" @click="toPage('sz')"><cg-icon-svg name="shizheng" class="svg_icon shizheng"></cg-icon-svg>智慧市政</li>
        <li :class="{active:activeModule == 'hw'}" @click="toPage('hw')"><cg-icon-svg name="huanwei" class="svg_icon huanwei"></cg-icon-svg>智慧环卫</li>
        <li :class="{active:activeModule == 'ps'}" @click="toPage('ps')"><cg-icon-svg name="paishui" class="svg_icon paishui"></cg-icon-svg>智慧排水</li>
        <li :class="{active:activeModule == 'ld'}" @click="toPage('ld')"><cg-icon-svg name="ludeng" class="svg_icon ludeng"></cg-icon-svg>智慧路灯</li>
      </ul>
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
      <!-- 本地时间 -->
      <div class="header__time" flex="cross:center">
        <span>{{localTime|date_format('YYYY - MM - DD')}}</span>
        <span>{{localTime|date_format('HH:mm:ss')}}</span>
        <span>{{localTime|date_week()}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import menuAside from '@/menu/aside.js'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'LayoutHeader',
  data() {
    return {
      localTime: new Date(),
      activeModule: 'jm'
    }
  },
  computed: {
    ...mapState('cgadmin/menu', ['aside', 'asideCollapse']),
    ...mapState('cgadmin/page', ['current']),
    ...mapState('map', ['mapManager'])
  },
  methods: {
    ...mapActions('cgadmin/menu', ['asideCollapseSet', 'asideSetItemActive']),
    refreshTime() {
      setInterval(() => {
        this.localTime = new Date()
      }, 1000)
    },
    toPage(module){
      console.log('current',this.current);
      if(module==='ld'){
        window.open('https://www.baidu.com');
      }
      else{
        this.asideCollapseSet(false);
        this.activeModule = module;
        this.$store.commit('cgadmin/menu/activeModuleSetState', module)
        menuAside.forEach( item => {
          item.active = false;
        });
        const menu = menuAside.filter(v => v.role.includes('admin')&&v.module.includes(module))
        this.$store.commit('cgadmin/menu/asideSet', menu)
        let i = 0;
        let index = 0;
        for(i;i<menu.length;i++){
          if(menu[i].path === this.current){
            if(i===menu.length-1){
              index = 0;
            }
            else{
              index = i + 1;
            }
            break;
          }
        }
        if(i!==menu.length){
          this.$router.replace(menu[index].path)
        }
      }
    }
  },
  mounted() {
    this.refreshTime()
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  position: absolute;
  top: 0px;
  z-index: 10;
  background-image: linear-gradient(90deg,
          #0068eb 0%,
          #6e37ea 100%);
  // 头部
  &__status {
    height: 50px;
    margin-left: 600px;
    background: url('~@img/layout-header-tab-bc.png') no-repeat;
    position: relative;
    margin-top: 11px;
    padding: 0px 70px;
    background-size: 100%;
    ul{
      width:100%;
      height:100%;
      list-style: none;
      li{
        width: 130px;
        height: 100%;
        line-height: 48px;
        text-align: center;
        color: #ffffff;
        font-size: 15px;
        margin-right: 20px;
        cursor: pointer;
        &.active{
          background-image: linear-gradient(0deg,
                  #3fd3fd 0%,
                  rgba(63, 211, 253, 0) 100%);
        }
        .svg_icon{
          width: 22px;
          color: #ffffff;
        }
      }
    }
  }
  &__time {
    height: 100%;
    font-size: 18px;
    color: #ffffff;
    font-weight: 600;
    span {
      margin-right: 15px;
      &:nth-last-child(1) {
        margin-right: 0;
      }
    }
  }
  // 头部logo&title包裹层
  &__name {
    position: absolute;
    left: 0;
    top: 0;
    width: 550px;
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
    width: 238px;
    height: 100%;
    /*background: url('~@img/layout-header-title-bc.png') no-repeat;*/
    padding-left: 24px;
    overflow: hidden;
    //title => SVG
    &__icon {
      font-size: $fs-header-title;
      color: #fff;
    }
  }
}
</style>