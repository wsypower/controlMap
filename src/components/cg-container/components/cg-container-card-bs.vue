<template>
  <div class="cg-container-card-bs">
    <div v-if="$slots.header" class="cg-container-card-bs__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="cg-container-card-bs__body" ref="wrapper">
      <div class="cg-container-card-bs__body-wrapper-inner">
        <div class="cg-container-card-bs__body-card">
          <slot/>
        </div>
      </div>
    </div>
    <div v-if="$slots.footer" class="cg-container-card-bs__footer" ref="footer">
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
// 卡片式布局组件 - 滚动优化
.cg-container-card-bs {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .cg-container-card-bs__header {
    padding: 20px;
  }
  .cg-container-card-bs__body {
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    .cg-container-card-bs__body-wrapper-inner {
      padding-bottom: 20px;
    }
    .cg-container-card-bs__body-card {
      position: relative;
      padding: 20px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
     //滚动条样式改变
    /deep/ .bscroll-indicator {
      background: rgba(245, 244, 244, 0.4) !important;
      border: 1px solid rgba(255, 255, 255, 0.3)!important;
    }
  }
  .cg-container-card-bs__footer {
    padding: 20px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
}
</style>