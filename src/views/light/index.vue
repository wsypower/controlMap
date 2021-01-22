<template>
  <div class="page">
    <div class="page-header">
      <span class="larger">智能路灯</span>
    </div>
    <equipList></equipList>
    <itemDetail ref="itemDetail"></itemDetail>
  </div>
</template>
<script>
import equipList from './components/equipList.vue'
import itemDetail from './components/itemDetail.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'light',
  components: {
    equipList,
    itemDetail
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('cgadmin/menu', ['activeModule']),
    message() {
      return 'light'
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