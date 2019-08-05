<template>
  <a-spin tip="Loading..." size="large" :spinning="Spinning" :indicator="indicator">
    <slot></slot>
  </a-spin>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Loading'
}
</script>

<style lang="scss" scoped>

</style>