<template>
  <div class="map">
    <div class="map-header">
      <div class="map-header_title"></div>
    </div>
    <div class="map-main">
      <div class="map-main_content"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Map',
  data() {
    return {}
  },

  methods: {},
  mounted() {
    console.log(process.env)
    this.$axios('/user').then()
  }
}
</script>
<style lang="sass" scoped>
@import 'index.scss';
</style>
