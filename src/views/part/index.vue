<template>
  <div class="page">
    <div class="page-header">
      <span class="larger">部件</span>
    </div>
    <partList></partList>
  </div>
</template>
<script>
import partList from './components/PartList.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'part',
  components: {
    partList
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