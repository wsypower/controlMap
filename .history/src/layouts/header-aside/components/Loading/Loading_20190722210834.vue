<template>
  <a-spin tip="Loading..." size="large" :spinning="Spinning" :indicator="indicator">
    <slot></slot>
  </a-spin>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="scss" scoped>

</style>