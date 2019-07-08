<template>
  <div class="cg-container-ghost-bs">
    <div v-if="$slots.header" class="cg-container-ghost-bs__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="cg-container-ghost-bs__body" ref="wrapper">
      <div>
        <slot/>
      </div>
    </div>
    <div v-if="$slots.footer" class="cg-container-ghost-bs__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import bs from './mixins/bs'
export default {
  name: 'cg-container-card-bs',
  mixins: [bs]
}
</script>
<style lang="scss">
// 隐形布局组件 - 滚动优化
.cg-container-ghost-bs {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .cg-container-ghost-bs__header {
    padding: 20px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .cg-container-ghost-bs__body {
    flex-grow: 1;
    overflow: hidden;
    position: relative;
    //滚动条样式改变
    /deep/ .bscroll-indicator {
      background: rgba(245, 244, 244, 0.4) !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
    }
  }
  .cg-container-ghost-bs__footer {
    padding: 20px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
}
</style>