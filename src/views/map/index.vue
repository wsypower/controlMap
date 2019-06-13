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
    this.$axios.post('/login').then((res) => {
      console.log(res);
    })
  }
}
</script>
<style lang="sass" scoped>
@import 'index.scss';
</style>
