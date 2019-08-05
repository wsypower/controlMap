<template>
  <a-spin tip="Loading..." size="large" :spinning="Spinning" :indicator="indicator">
    <slot></slot>
  </a-spin>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Loading',
  computed: {
    ...mapState('cgadmin', {
      //页面加载提示 ====> login接口resolve后消失
      Spinning: state => state.page.Spinning
    }),
     return {
        indicator: <a-icon type="loading" style="font-size: 24px" spin />
      }
  }
}
</script>

<style lang="scss" scoped>
</style>