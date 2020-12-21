<template>
  <div class="page">
    <content-tabs :tabData="tabData" @changeTab="changeTab"></content-tabs>
  </div>
</template>
<script>
import waterQuality from './components/waterquality/index.vue';
import pressure from './components/pressure/index.vue'
import flow from './components/flow/index.vue'
export default {
  name: 'waterSupply',
  data() {
    return {
      //tab标签
      tabData: [
        {
          name: '水质监测',
          component: waterQuality,
          hasScroll: false
        },
        {
          name: '压力监测',
          component: pressure,
          hasScroll: false
        },
        {
          name: '流量监测',
          component: flow,
          hasScroll: false
        }
      ]
    }
  },
  mounted() {},
  methods: {
    changeTab(val) {

    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
}
</style>
