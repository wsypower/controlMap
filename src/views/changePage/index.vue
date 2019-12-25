<template>
  <div><span>changePage</span></div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  const module = {
    'jm':'智慧街面',
    'sz':'智慧市政',
    'hw':'智慧环卫',
    'ps':'智慧排水',
    'ld':'智慧路灯'
  }
export default {
  name: 'changePage',
  computed: {
    ...mapState('cgadmin/menu', [ 'activeModule']),
    message() {
      return 'changePage'
    }
  },
  mounted(){
    // let title = module[this.activeModule];
    // console.log(this.$router);
    // console.log('title: ' + title);
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
