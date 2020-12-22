<template>
  <div class="page">
    <div class="page-header">
      <span class="larger">停车中心</span>
    </div>
    <parkingList></parkingList>
  </div>
</template>
<script>
import parkingList from './components/ParkingList.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'parking',
  components: {
    parkingList
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('cgadmin/menu', ['activeModule']),
    message() {
      return 'parking'
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;

  .page-header {
    height: 50px;
    width: 100%;
    padding-left: 20px;
    line-height: 50px;
    color: #2b90f3;
    font-size: 18px;
    text-align: left;
    font-weight: bold;

    .larger {
      font-size: 20px;
    }
  }

  .grey-wrapper {
    background: #f5f5f5;
    padding: 20px;
    height: 100%;
    margin: 0 20px 20px;
  }
}
</style>