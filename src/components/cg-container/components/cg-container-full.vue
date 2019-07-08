<template>
  <div class="cg-container-full">
    <div v-if="$slots.header" class="cg-container-full__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="cg-container-full__body" ref="body">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="cg-container-full__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import scroll from './mixins/normal'
export default {
  name: 'cg-container-full',
  mixins: [scroll],
  mounted() {
    // 增加滚动事件监听
    this.addScrollListener()
  },
  beforeDestroy() {
    // 移除滚动事件监听
    this.removeScrollListener()
  }
}
</script>
<style lang="scss">
// 填充式布局组件
.cg-container-full {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .cg-container-full__header {
    padding: 20px;
  }
  .cg-container-full__body {
    flex-grow: 1;
    height: 100%;
    overflow: auto;
    position: relative;
     //滚动条样式改变
    /deep/ .bscroll-indicator {
      background: rgba(245, 244, 244, 0.4) !important;
      border: 1px solid rgba(255, 255, 255, 0.3)!important;
    }
  }
  .cg-container-full__footer {
    padding: 20px;
  }
}
</style>