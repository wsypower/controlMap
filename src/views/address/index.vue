<template>
  <div class="addr-list-page" flex="dir:left cross:center">
    <div class="addr-list-page-left">
      <department @getSelectRange="getSelectRange"></department>
    </div>
    <div class="addr-list-page-right">
      <person-table :rangeId="rangeId" :range="range" :type="type" :groupType="groupType"></person-table>
    </div>
  </div>
<!--    <div class="addr-list-page" style="background-color: #ffffff;padding:100px 40px">-->
<!--        <div style="font-size: 30px; color: #00a5ff">正在开发中...</div>-->
<!--    </div>-->
</template>

<script type="text/ecmascript-6">
import Department from './department.vue';
import PersonTable from './personTable.vue';
export default {
  name: 'addresslist',
  components:{
    Department,
    PersonTable
  },
  data(){
    return {
      rangeId: 'all',
      range: '国测',
      type: '1',
      groupType: ''
    }
  },
  methods:{
    getSelectRange(data){
      console.log('getSelectRange', data);
      this.rangeId = data.id;
      this.range = data.range;
      this.type = data.type;
      this.groupType = data.groupType;
    }
  }
}
</script>

<style lang="scss" scoped>
.addr-list-page {
  width: 100%;
  height: 100%;
  padding-top: 70px;
  padding-bottom: 10px;
  .addr-list-page-left{
    margin-left: 10px;
    width: 250px;
    height: 100%;
    background-color: #ffffff;
  }
  .addr-list-page-right{
    flex:1;
    margin:0px 10px;
    height: 100%;
    background-color: #ffffff;
  }
}
</style>