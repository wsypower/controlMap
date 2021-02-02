<!--签到签退弹窗详情-->
<template>
  <div class="tip-content">
    <div class="tip-header" flex="dir:left cross:center">
      <div>{{ info.isSignIn ? '签到 ' : '签退 ' }}{{ new Date(info.signTime) | date_format() }}</div>
      <div class="close" flex="main:center cross:center" @click="closeDialog"></div>
    </div>
    <div class="tip-body">
      <!--      <img :src="info.photoUrl"/>-->
      <div v-if="info.photoList" class="tip-body-content">
        <swiper :options="swiperOption" ref="mySwiper" v-viewer>
          <swiper-slide v-for="(item, index) in info.photoList" :key="index">
            <img :src="item.url" :alt="item.name" />
          </swiper-slide>
        </swiper>
        <div class="swiper-button-prev" slot="button-prev">
          <a-icon type="left" />
        </div>
        <div class="swiper-button-next" slot="button-next">
          <a-icon type="right" />
        </div>
      </div>
      <img v-else src="@/assets/images/noImage.png">
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'peopleSignInfo',
  data() {
    return {
      swiperOption: {
        loop: false,
        slidesPerView: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    };
  },
  props: {
    info: {
      default () {
        return {
          photoUrl: '',
          photoName: '',
          photoList: [],
          signTime: '',
          isSignIn: true
        }
      }
    },
    closeCallBack: {
      type: Function,
      default () {
        return null
      }
    }
  },
  mounted() {},
  methods: {
    // showPhoto(){
    //     this.$emit('showPhoto',0)
    // },
    closeDialog() {
      this.$emit('closeTip')
    }
  }
}
</script>
<style lang="scss" scoped>
.tip-content {
  z-index: 10;
  width: 300px;
  height: 240px;
  border-radius: 6px;
  box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;

  .tip-header {
    height: 40px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    background-image: linear-gradient(90deg, #0065ea 0%, #00a5ff 100%);
    position: relative;
    color: #ffffff;
    font-size: 16px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;

    .close {
      position: absolute;
      right: 5px;
      top: 8px;
      width: 24px;
      height: 24px;
      line-height: 24px;
      transition: all 0.2s;
      transform: rotate(0deg);
      transform-origin: center;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA4ElEQVRYR+2WUQ4CMQhEh5vozfRkejO9CaaJTYhpy8Cq7Uf3d4F5O8C2gsmPTNbHBtgOuA6o6klEnplhZXKHAKp6AXADcBWRewSCze0CFHoADyNKQxjxmn7uucg6UAu5EA3xYQ4zA7UNLkRUvBR0AUoQU5iJac0QBeBBZMVpByp5S+j9rmyK26JDDgwgbF13SD8h6BbYxIYT5XVYPNwCx4X/AHS+PtX/sANTh3C0aj9fQ0aAiUmtYaRwJLbCrHsYrXYch3f88IXE/HTmXckiV7BsbOosyIql1vCbYhtgSQdeDpKoIXzqLREAAAAASUVORK5CYII=') no-repeat;
      background-size: 100% 100%;

      &:hover {
        text-decoration: none;
        cursor: pointer;
        transform: rotate(90deg);
      }
    }
  }

  .tip-body {
    width: 100%;
    height: calc(100% - 45px);
    overflow: hidden;
    background-color: #ffffff;
    text-align: center;
    padding: 10px;

    .tip-body-content {
      position: relative;
      width: 100%;
      height: 100%;
    }

    ::v-deep.swiper-container {
      height: 100%;
      margin: 0px 15px;

      .swiper-slide {
        text-align: center;
        line-height: 34px;

        img {
          //width: 100%;
          height: 100%;
          cursor: zoom-in;
        }
      }
    }

    .swiper-button-prev,
    .swiper-button-next {
      position: absolute;
      top: 42%;
      width: 20px;
      height: 34px;
      margin-top: 0px;
      z-index: 10;
      cursor: pointer;
      background-image: unset !important;
      background-color: #eeeeee;
      outline: unset;

      i {
        margin-top: 10px;
        margin-left: 4px;
      }
    }

    .swiper-button-prev {
      left: 0px;
    }

    .swiper-button-next {
      right: 0px;
    }
  }

  .tooltip__arrow {
    width: 50px;
    height: 25px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background: white;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      top: 0;
      left: 50%;
      box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.12);
      /*box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.12);*/
      border: solid 1px #dddddd;
    }
  }
}
</style>