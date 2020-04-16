<template>
  <div class="address" flex="fir:left cross:center">
    <label>所在区域：</label>
    <a-cascader
      :options="cityData"
      v-model="selectedAddress"
      placeholder="请选择市区（县）"
      changeOnSelect
      @change="onChange"
      style="flex:1"
    />
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import util from '@/utils/util';
const userId = util.cookies.get('userId');
  export default{
    name: 'myAddress',
    data(){
      return {
        cityData: [],
        selectedAddress: ['0000000000','100000']
      }
    },
    mounted(){
      this.$emit('getAddressData','3415');
      this.getCountyList({userId: userId}).then(res =>{
        console.log('getCountyList', res);
        let children = res.children;
        let oneChild = {
          label: '全市',
          value: res.value
        }
        children.unshift(oneChild);
        let resultData = [
          {
            value: '0000000000',
            label: res.label,
            children: children
          }]
        this.cityData = resultData;
        this.selectedAddress = ['0000000000',oneChild.value];
      });
    },
    methods:{
      ...mapActions('drainoffwater/manage', ['getCountyList']),
      onChange(val){
          this.$emit('getAddressData',this.selectedAddress[1]);
      }
    }
  }
</script>
<style lang="scss" scoped>
.address {
}
</style>
