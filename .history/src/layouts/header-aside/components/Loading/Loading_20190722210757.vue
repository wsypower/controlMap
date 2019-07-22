<template>
<a-spin tip="Loading..." size="large" :spinning="Spinning" :indicator="indicator">
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="scss" scoped>
.cg__loading {
  width: 100%;
  height: 100%;
  background-color: red;
}
</style>