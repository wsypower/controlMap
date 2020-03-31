<template>
    <div class="address" flex="fir:left cross:center">
        <label>所在区域：</label>
        <a-cascader :options="cityData" v-model="selectedAddress" placeholder="请选择市区（县）" changeOnSelect @change="onChange" style="flex:1"/>
    </div>
</template>
<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
    export default{
      name: 'myAddress',
      data(){
        return {
          cityData: [],
          selectedAddress: ['100','100000']
        }
      },
      mounted(){
        this.getCountyList().then(res =>{
          this.cityData = res.data;
        });
      },
      methods:{
        ...mapActions('drainoffwater/manage', ['getCountyList']),
        onChange(val){
            this.$emit('getAddressData',this.selectedAddress);
        }
      }
    }
</script>
<style lang="scss" scoped>
    .address{

    }
</style>