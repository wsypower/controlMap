<template>
  <div class="menu__item" flex="main:center cross:center" @click="$emit('handlerClick')">
    <cg-icon-svg :name="icon" class="menu__item__icon"></cg-icon-svg>
  </div>
</template>

<script>
export default {
  name: 'menu-item',
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
//menu-item
.menu__item {
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin-bottom: 28px;
  transition: 0.5s;
  z-index: 2;
  border-radius: 3px;
  outline: 0;
  &:active {
    background-color: rgb(19, 85, 199);
  }

  &__icon {
    font-size: $fs-menu-item-icon;
    color: $color-menu-item;
  }
}
</style>