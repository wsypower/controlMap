<template>
  <div class="page">
    <div class="page-title">
      人员管控
    </div>
    <people-manage></people-manage>
  </div>
</template>
<script>
import PeopleManage from './components/PeopleManage.vue'
export default {
  name: 'people',
  components:{
    PeopleManage
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
