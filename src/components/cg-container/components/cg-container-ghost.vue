<template>
  <div class="cg-container-ghost">
    <div v-if="$slots.header" class="cg-container-ghost__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="cg-container-ghost__body" ref="body">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="cg-container-ghost__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import scroll from './mixins/normal'
export default {
  name: 'cg-container-ghost',
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
// 隐形布局组件
.cg-container-ghost {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .cg-container-ghost__header {
    padding: 20px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .cg-container-ghost__body {
    flex-grow: 1;
    overflow: auto;
    position: relative;
    //滚动条样式改变
    /deep/ .bscroll-indicator {
      background: rgba(245, 244, 244, 0.4) !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
    }
  }
  .cg-container-ghost__footer {
    padding: 20px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
}
</style>
