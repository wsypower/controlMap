<template>
    <div class="address" flex="fir:left cross:center">
        <label>所在区域：</label>
        <a-cascader :options="cityData" v-model="selectedAddress" placeholder="请选择市区（县）" changeOnSelect style="flex:1"/>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
      name: 'myAddress',
      data(){
        return {
          cityData: [],
          selectedAddress: ['100','100000']
        }
      },
      mounted(){
        this.cityData = [
          {
            value: '100',
            label: '六安市',
            children: [
              {
                value: '100000',
                label: '全市',
              },
              {
                value: '100001',
                label: '金安区',
              },
              {
                value: '100002',
                label: '裕安区',
              },
              {
                value: '100003',
                label: '叶集区',
              },
              {
                value: '100004',
                label: '霍邱县',
              },
              {
                value: '100005',
                label: '霍山县',
              },
              {
                value: '100006',
                label: '全寨县',
              },
              {
                 value: '100007',
                 label: '舒城县',
              }
            ],
          }];
      },
      methods:{
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