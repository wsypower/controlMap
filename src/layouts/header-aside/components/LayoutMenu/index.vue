<template>
  <div class="container__menu">
    <div class="container__menu__item"></div>
  </div>
</template>

<script>
export default {
  name: 'LayoutMenu'
}
</script>

<style lang="scss" scoped>
//menu
.container__menu {
  width: 60px;
  height: 100%;
  background-image: $color-menu;
  //menu-item
  &__item {
    width: 14px;
  }
  &__icon {
    font-size: 40px;
    color: red;
  }
}
</style>