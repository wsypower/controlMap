<template>
  <a-drawer
    placement="left"
    :wrapClassName="'drawer'"
    :zIndex="1"
    :width="357"
    :closable="false"
    :visible="asideCollapse"
    :maskClosable="false"
    :mask="false"
  >
    <slot></slot>
  </a-drawer>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutDrawer',
  computed: {
    ...mapState('cgadmin/menu', ['asideCollapse'])
  }
}
</script>

<style lang="scss" >
.drawer {
  top: 0px;
  left: 60px;
  .ant-drawer-content-wrapper {
    height: 100%;
    .ant-drawer-wrapper-body {
      overflow: hidden !important;
    }
    .ant-drawer-body {
      padding: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>