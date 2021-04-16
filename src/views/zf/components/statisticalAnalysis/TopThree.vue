<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="dir:left cross:center">
      <span class="title">队员TOP3</span>
    </div>
    <div class="panel-content">
      <div class="item" flex="dir:left" v-for="(item, index) in topData" :key="index">
        <img src="~@img/avatar_boy.png" />
        <div class="message">
          <p>
            <span>{{ item.name }}</span
            ><span>（{{ item.dept }}）</span>
          </p>
          <p>上报案卷：{{ item.sbajs }}件</p>
          <p>核实案卷：{{ item.hsajs }}件</p>
          <p>核查案卷：{{ item.hcajs }}件</p>
        </div>
        <i v-if="index == 0" class="icon one"></i>
        <i v-if="index == 1" class="icon two"></i>
        <i v-if="index == 2" class="icon three"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
    name: 'TopThree',
    data(){
        return {
            topData: []
        }
    },
    mounted(){
        this.getChartData();
    },
    methods:{
        ...mapActions('section/statistical', ['getPeopleTopThreeData']),
        //获取前三的人员数据
        getChartData(){
            // this.getPeopleTopThreeData().then(res=>{
            //     console.log('getPeopleTopThreeData',res);
            //     this.topData = res.data;
            // });
          let data = [
            {
              photoUrl: '',
              name: '许三多',
              dept: '金东区指挥平台',
              sbajs: 56,
              hsajs: 48,
              hcajs: 36
            },
            {
              photoUrl: '',
              name: '许三多',
              dept: '金东区指挥平台',
              sbajs: 50,
              hsajs: 31,
              hcajs: 30
            },
            {
              photoUrl: '',
              name: '许三多',
              dept: '金东区指挥平台',
              sbajs: 41,
              hsajs: 29,
              hcajs: 36
            }
          ]
          this.topData = data;
        }

    }
}
</script>
<style lang="scss" scoped>
.analysis-panel {
  width: 100%;
  height: 346px;
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
    height: calc(100% - 36px);
    .item {
      width: 100%;
      height: 100px;
      background-color: #f5f5f5;
      padding: 10px;
      margin-bottom: 5px;
      position: relative;
      img {
        width: 60px;
        height: 100%;
        margin-right: 10px;
      }
      .message {
        p {
          font-family: PingFang-SC-Medium;
          font-size: 13px;
          line-height: 8px;
          letter-spacing: 0px;
          color: #666666;
          span:first-child {
            font-size: 16px;
            line-height: 14px;
            color: #333333;
          }
        }
      }
      .icon {
        position: absolute;
        top: 0;
        right: 14px;
        width: 30px;
        height: 45px;
        background-size: 100% 100%;
        &.one {
          background: url('~@img/topone.png') no-repeat;
        }
        &.two {
          background: url('~@img/toptwo.png') no-repeat;
        }
        &.three {
          background: url('~@img/topthree.png') no-repeat;
        }
      }
    }
  }
}
</style>
