<template>
  <a-tooltip placement="right" overlayClassName="defaultClass">
    <template slot="title">
      <span>{{title}}</span>
    </template>
    <div class="menu__item" flex="main:center cross:center" @click="$emit('handlerClick')">
      <div v-if="title==='sso'" class="sso"></div>
      <cg-icon-svg v-else :name="icon" class="menu__item__icon"></cg-icon-svg>
    </div>
  </a-tooltip>
</template>

<script>
export default {
  name: 'menu-item',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
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
  .sso {
    width: 40px;
    height: 40px;
    background: url('~@/assets/images/sso_logo.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>