<template>
  <div class="page">
      <swiper :options="swiperOption" style="width:100%;height:30px">
          　　<swiper-slide>slide1</swiper-slide>
          　　<swiper-slide>slide2</swiper-slide>
          <swiper-slide>slid3</swiper-slide>
          <swiper-slide>slide4</swiper-slide>
          　　<div class="swiper-button-prev" slot="button-prev"></div>
          　　<div class="swiper-button-next" slot="button-next"></div>
      </swiper>
  </div>
</template>

<script>
export default {
  name: 'page3',
  data(){
    return {
      swiperOption: {
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 1600px;
}
</style>