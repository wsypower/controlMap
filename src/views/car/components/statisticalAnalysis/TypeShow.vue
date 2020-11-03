<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="dir:left cross:center">
      <span class="title">分类显示</span>
    </div>
    <div class="panel-content">
      <a-radio-group name="radioGroup" defaultValue="all">
        <a-radio v-for="(item, index) in typeData" :value="item.id" :key="index"
          >{{ item.type }}（{{ item.num }}）</a-radio
        >
      </a-radio-group>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
  name: 'TypeShow',
  data(){
    return {
      typeData: []
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.getChartData();
    });
  },
  methods:{
    ...mapActions('car/statistical', ['getCarTypeAnalysisData']),
    //获取前三的人员数据
    getChartData(){
      // this.getCarTypeAnalysisData().then(res=>{
      //   console.log('getCarTypeAnalysisData',res);
      //   let totalNum = res.data.reduce((acc,item) => {
      //     return acc + item.num
      //   },0);
      //   this.typeData = [{type:'全部车辆', id:'all', num: totalNum}].concat(res.data);
      //   console.log('typeData',this.typeData);
      // });
      let data = [
        {
          type: '清扫车',
          id: 'qsc',
          num: 30
        },
        {
          type: '洒水车',
          id: 'ssc',
          num: 20
        },
        {
          type: '生活垃圾车',
          id: 'shljc',
          num: 30
        },
        {
          type: '渣土车',
          id: 'ztc',
          num: 9
        },
        {
          type: '餐饮垃圾车',
          id: 'cyljc',
          num: 10
        }
      ]
      let totalNum = data.reduce((acc,item) => {
        return acc + item.num
      },0);
      this.typeData = [{type:'全部车辆', id:'all', num: totalNum}].concat(data);
    }

  }
}
</script>
<style lang="scss" scoped>
.analysis-panel {
  width: 100%;
  height: auto;
  padding-top: 6px;
  .panel-header {
    width: 100%;
    height: 30px;
    .title {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #333333;
    }
  }
  .panel-content {
    width: 100%;
    padding: 7px 15px;
    background-color: #f5f5f5;
    /deep/.ant-radio-wrapper {
      width: 140px;
      margin: 8px 0px;
    }
  }
}
</style>
