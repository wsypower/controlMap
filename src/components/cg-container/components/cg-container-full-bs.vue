<template>
  <div class="cg-container-full-bs">
    <div v-if="$slots.header" class="cg-container-full-bs__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="cg-container-full-bs__body" ref="wrapper">
      <div class="cg-container-full-bs__body-wrapper-inner">
        <slot/>
      </div>
    </div>
    <div v-if="$slots.footer" class="cg-container-full-bs__footer" ref="footer">
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
<style lang='scss'>
// 填充式布局组件 - 滚动优化
.cg-container-full-bs {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .cg-container-full-bs__header {
    padding: 20px;
  }
  .cg-container-full-bs__body {
    flex-grow: 1;
    overflow: hidden;
    position: relative;
    .cg-container-full-bs__body-wrapper-inner {
      position: relative;
    }
    //滚动条样式改变
    /deep/ .bscroll-indicator {
      background: rgba(216, 216, 216, 0.4) !important;
      border: 1px solid rgba(255, 255, 255, 0.3)!important;
    }
  }
  .cg-container-full-bs__footer {
    padding: 20px;
  }
}
</style>