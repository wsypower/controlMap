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
    <cg-container scroll>
      <slot></slot>
    </cg-container>
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
  top: 60px;
  left: 60px;
}
</style>