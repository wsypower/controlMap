<template>
  <div class="header">
    <div class="header__status" flex="main:right">
      <!-- 头部装饰线 -->
      <div class="header__status--topline"></div>
      <!-- 本地天气 -->
      <div class="header__weather"></div>
      <!-- 本地时间 -->
      <div class="header__time" flex="cross:center">
        <span>{{localTime|date_format('YYYY - MM - DD')}}</span>
        <span>{{localTime|date_format('HH:mm:ss')}}</span>
        <span>{{localTime|date_week()}}</span>
      </div>
    </div>
    <div class="header__name" flex>
      <!-- 系统LOGO -->
      <div class="header__icon--warp" flex="main:center cross:center">
        <cg-icon-svg name="logo" class="header__logo__icon"></cg-icon-svg>
      </div>
      <!-- 系统名称 -->
      <div class="header__title" flex="cross:center">
        <span>指挥调度平台</span>
<!--        <cg-icon-svg name="title" class="header__title__icon"></cg-icon-svg>-->
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  name: 'LayoutHeader',
  data() {
    return {
      localTime: new Date()
    }
  },
  methods: {
    refreshTime() {
      setInterval(() => {
        this.localTime = new Date()
      }, 1000)
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
  // 头部
  &__status {
    width: 100%;
    height: 53px;
    background-color: $color-header-white;
    box-shadow: 0px 1px 10px 0px rgba(4, 39, 77, 0.2);
    position: relative;
    padding-right: 30px;
    // 头部蓝色条
    &--topline {
      position: absolute;
      top: 0;
      right: 0;
      height: 13px;
      width: 100%;
      background-image: $color-top-line;
    }
  }
  &__time {
    height: 100%;
    font-size: 18px;
    color: #0092f1;
    padding-top: 13px;
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
    span{
      font-family: SourceHanSansCN-Bold;
      font-size: 26px;
      letter-spacing: 5px;
      color: #ffffff;
      font-weight: 600;
    }
  }
}
</style>