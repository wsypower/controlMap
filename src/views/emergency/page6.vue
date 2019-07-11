<template>
  <div class="page">page6</div>
</template>

<script>
import { add } from '@/api/account/list'

export default {
  name: 'page6',
  mounted() {
    add({
      add: 1,
      delete: 2,
      change: 3,
      check: 4
    }).then(re => {
      console.log(re)
    })
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 1600px;
}
</style>