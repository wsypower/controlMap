<template>
  <div class="page">
      <div class="people-manage" flex :class="{trans: isDetail}">
          <people-list @toDetail="toDetail" @getUserId="getUserId"></people-list>
          <people-detail @toList="toList" :id="mId"></people-detail>
      </div>
  </div>
</template>
<script>
import PeopleList from './components/PeopleList'
import PeopleDetail from './components/PeopleDetail'
export default {
  name: 'people',
  components:{
    PeopleList,
    PeopleDetail
  },
  data() {
    return {
      isDetail: false,
      mId: ''
    }
  },
  mounted() {},
  methods: {
    getUserId(id){
        this.mId = id;
    },
    toDetail(data){
      console.log('toDetail',data);
      this.isDetail = true;
    },
    toList(data){
      console.log('toList',data);
      this.isDetail = false;
    }
  }
}
</script>

<style lang="scss" scoped>
    .trans{
        transform:translateX(-50%);
        transition: transform 0.5s;
    }
.page {
    width: 100%;
    height: 100%;
    .people-manage{
        height: 100%;
        width: 200%;
        transition: transform 0.5s;
    }
}
</style>
