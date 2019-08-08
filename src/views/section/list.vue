<template>
  <div class="warn_list">
    <cg-container scroll>
      <div style="width:100%;height:1000px;">
        测试keep-alive
        <div class="lists">
          <div class="lists__item" flex="main:center cross:center" @click="clickItem">2</div>
          <div class="lists__item" flex="main:center cross:center" @click="clickItem">1</div>
          <div class="lists__item" flex="main:center cross:center" @click="clickItem">3</div>
          <div class="lists__item" flex="main:center cross:center" @click="clickItem">4</div>
        </div>
      </div>
    </cg-container>
  </div>
</template>

<script>
export default {
  name: 'warnList',
  methods: {
    clickItem() {
      this.$router.push('/section/warnDetails')
    }
  }
}
</script>

<style lang="scss" scoped>
.warn_list {
  width: 100%;
  height: 100%;
}
.lists {
  width: 100%;
  &__item {
    width: 100%;
    height: 150px;
    background-color: silver;
    margin-bottom: 5px;
    color: #fff;
  }
}
</style>