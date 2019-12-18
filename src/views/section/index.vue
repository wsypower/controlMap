<template>
  <div class="page">
      <div class="people-manage" flex :class="{trans: isDetail}">
          <people-list @toDetail="toDetail"></people-list>
          <people-detail></people-detail>
          <div hidden>
              <!--<people-info ref="peopleInfo" :info="peopleInfoData" @closeTip="closeTip" @getUserId="getUserId"></people-info>-->
          </div>
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
    }
  },
  mounted() {},
  methods: {
    toDetail(data){
      console.log('toDetail',data);
      this.isDetail = true;
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
    }
}
</style>
