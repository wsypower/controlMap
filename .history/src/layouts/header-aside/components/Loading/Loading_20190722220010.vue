<template>
  <a-spin tip="Loading..." size="large" :spinning="Spinning" indicator>
    <slot></slot>
  </a-spin>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '../components/loading-logo/LoadingLogo.vue'
export default {
  name: 'Loading',
  data() {
    return {
      indicator: h => {
        return <Logo></Logo>
      }
    }
  },
  computed: {
    ...mapState('cgadmin', {
      //页面加载提示 ====> login接口resolve后消失
      Spinning: state => state.page.Spinning
    })
  }
}
</script>

<style lang="scss" scoped>
</style>