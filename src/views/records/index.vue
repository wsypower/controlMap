<template>
  <div class="page">
    <div class="page-title">
      案卷管控
    </div>
    <records-manage></records-manage>
  </div>
</template>
<script>
import recordsManage from './components/RecordsManage.vue'
export default {
  name: 'records',
  components:{
    recordsManage
  },
  data() {
    return {}
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
