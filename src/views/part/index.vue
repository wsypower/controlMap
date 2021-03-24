<template>
  <div class="page">
    <div class="page-title">
      部件
    </div>
    <part-manage></part-manage>
  </div>
</template>
<script>
import partManage from './components/PartManage'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'part',
  components: {
    partManage
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('cgadmin/menu', ['activeModule']),
    message() {
      return 'part'
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
  background-color: #ffffff;
  position: relative;

  .page-title {
    height: 50px;
    width: 100%;
    padding-left: 20px;
    line-height: 50px;
    background-color: #f5f7f8;
    color: #2b90f3;
    font-size: 18px;
    text-align: left;
  }
}
</style>