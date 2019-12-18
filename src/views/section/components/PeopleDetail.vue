<template>
  <div class="detail-panel">
      是否飘着过？
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import util from '@/utils/util'
export default {
  name: 'peopleDetail',
  components:{},
  data(){
    return {

    }
  },
  computed:{
  },
  watch:{},
  mounted(){},
  beforeDestroy(){
    clearInterval(this.timer)
  },
  methods:{
    ...mapActions('section/manage', ['getAllPeopleTreeData']),

  }
}
</script>
<style lang="scss" scoped>
.detail-panel {
  height: 100%;
  width: 50%;
  padding: 20px;
}
</style>
