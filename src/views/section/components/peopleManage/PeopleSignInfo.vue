<!--签到签退弹窗详情-->
<template>
  <div class="tip-content">
    <div class="tip-header" flex="dir:left cross:center">
      <div>{{ info.isSignIn ? '签到  ' : '签退  ' }}{{ new Date(info.signTime) | date_format() }}</div>
      <div class="close" flex="main:center cross:center" @click="closeDialog"></div>
    </div>
    <div class="tip-body">
      <div class="tip-body-content">
          <a-carousel arrows :dots="false" :autoplay="false" :infinite="false" v-viewer>
              <div slot="prevArrow"
                   slot-scope="props"
                   class="custom-slick-arrow"
                   style="left: 10px;zIndex: 1"
              >
                  <a-icon type="left" />
              </div>
              <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
                  <a-icon type="right" />
              </div>
              <div v-for="(item, index) in info.photoList" :key="index" data-index="index" style="height: 180px;text-align: center;cursor: zoom-in;">
                  <img style="height: 100%;display:inline-block;" :src="item.url" :alt="item.name"/>
              </div>
          </a-carousel>
      </div>
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default{
  name: 'peopleSignInfo',
  props:{
    info:{
      default(){
        return {
          photoUrl: '',
          photoName: '',
          photoList: [],
          signTime: '',
          isSignIn: true
        }
      }
    },
    closeCallBack:{
      type: Function,
      default(){
        return null
      }
    }
  },
  data(){
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
  mounted(){
    console.log('peopleSignInfo mounted');
  },
  methods:{
    closeDialog(){
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
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA4ElEQVRYR+2WUQ4CMQhEh5vozfRkejO9CaaJTYhpy8Cq7Uf3d4F5O8C2gsmPTNbHBtgOuA6o6klEnplhZXKHAKp6AXADcBWRewSCze0CFHoADyNKQxjxmn7uucg6UAu5EA3xYQ4zA7UNLkRUvBR0AUoQU5iJac0QBeBBZMVpByp5S+j9rmyK26JDDgwgbF13SD8h6BbYxIYT5XVYPNwCx4X/AHS+PtX/sANTh3C0aj9fQ0aAiUmtYaRwJLbCrHsYrXYch3f88IXE/HTmXckiV7BsbOosyIql1vCbYhtgSQdeDpKoIXzqLREAAAAASUVORK5CYII=')
        no-repeat;
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
        ::v-deep.custom-slick-arrow{
            width: 20px;
            height: 34px;
            background-color: #eeeeee;
            i{
                font-size: 20px;
                color: #fff;
                margin-top: 7px;
            }
            &:hover{
                background-color: #cccccc;
            }
            &.slick-disabled{
                background-color: #eeeeee !important;
                cursor: not-allowed;
            }
        }
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
