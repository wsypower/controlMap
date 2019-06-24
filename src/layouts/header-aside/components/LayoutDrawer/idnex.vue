<template>
  <a-drawer
    placement="left"
    :wrapClassName="'drawer'"
    :zIndex="1"
    :width="357"
    :closable="false"
    :visible="false"
    :maskClosable="false"
    :mask="false"
  >
    <cg-container scroll>
      <slot></slot>
    </cg-container>
  </a-drawer>
</template>
<script>
export default {
  name: 'LayoutDrawer'
}
</script>

<style lang="scss" >
.drawer {
  top: 60px;
  left: 60px;
}
</style>