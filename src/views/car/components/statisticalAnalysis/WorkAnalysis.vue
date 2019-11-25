<template>
  <div class="analysis-panel">
    <div class="panel-header" flex="dir:left cross:center">
      <span class="title">中队工作</span>
    </div>
    <div class="panel-content">
      <div class="car-tab-panel">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) in carTypeData" :class="{active: activeTemp == index}"><span @click="setActive(index)" >{{item}}</span></swiper-slide>
<!--          <swiper-slide :class="{active : activeTemp == 1}"><span @click="setActive(1)" >渣土车</span></swiper-slide>-->
<!--          <swiper-slide :class="{active : activeTemp == 2}"><span @click="setActive(2)" >环卫车</span></swiper-slide>-->
<!--          <swiper-slide :class="{active : activeTemp == 3}"><span @click="setActive(3)" >xxxx车</span></swiper-slide>-->
<!--          <swiper-slide :class="{active : activeTemp == 4}"><span @click="setActive(4)" >yyyy车</span></swiper-slide>-->
<!--          <swiper-slide :class="{active : activeTemp == 5}"><span @click="setActive(5)" >zzzz车</span></swiper-slide>-->
        </swiper>
        <div class="swiper-button-prev" slot="button-prev"><a-icon type="left" /></div>
        <div class="swiper-button-next" slot="button-next"><a-icon type="right" /></div>
      </div>
      <div class="show-panel">
        <div class="legend-panel" flex="cross:center" style="flex-wrap: wrap">
          <span class="item" flex="cross:center"><i class="legend yellow"></i>车辆数（辆）</span>
          <span class="item" flex="cross:center"><i class="legend green"></i>里程（km）</span>
          <span class="item" flex="cross:center"><i class="legend red"></i>超速里程（km）</span>
          <span class="item" flex="cross:center"><i class="legend purple"></i>越界里程（km）</span>
        </div>
        <div id="bar-chart"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

import { mapActions } from 'vuex'
export default {
    name: 'WorkAnalysis',
    data(){
        return {
          sourceData: [],
          chartData: [],
          activeTemp: 0,
          carTypeData: [],
          swiperOption: {
            loop: false,
            slidesPerView: 4,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          },
        }
    },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
    mounted(){
        this.getChartData();
    },
    methods:{
        ...mapActions('car/statistical', ['getCarWorkInfoData']),
       //激活某个车辆类型，从而展示该车辆在各个中队的情况
      setActive(index){
          console.log('go to setActive');
          this.activeTemp = index;
        let tempData = this.sourceData[index].groupData;
        let groupArr = [];
        let totalArr = [];
        let lcArr = [];
        let yjlcArr = [];
        let cslcArr = [];
        tempData.forEach((item) => {
          groupArr.push(item.groupName);
          totalArr.push(-item.totalNum);
          lcArr.push(item.lc);
          cslcArr.push(item.cslc);
          yjlcArr.push(item.yjlc);
        });
        this.chartData = [groupArr,totalArr,lcArr,cslcArr,yjlcArr];
        this.chartInit();
      },
        //获取人员状态数据
        getChartData(){
            this.getCarWorkInfoData().then(res=>{
              this.sourceData = res.data;
              res.data.forEach((item) => {
                this.carTypeData.push(item.type);
              });
              let tempData = res.data[0].groupData;
              let groupArr = [];
              let totalArr = [];
              let lcArr = [];
              let yjlcArr = [];
              let cslcArr = [];
              tempData.forEach((item) => {
                groupArr.push(item.groupName);
                totalArr.push(-item.totalNum);
                lcArr.push(item.lc);
                cslcArr.push(item.cslc);
                yjlcArr.push(item.yjlc);
              });
              this.chartData = [groupArr,totalArr,lcArr,cslcArr,yjlcArr];
              this.chartInit();
            });

        },
        //初始化图表
        chartInit(){
            let _this = this;
            const ChartColumnar = this.$echarts.init(document.getElementById('bar-chart'));
            ChartColumnar.setOption({
                grid: {
                    top: 10,
                    left: 10,
                    right: 10,
                    bottom: 10,
                    containLabel: true
                },
                tooltip: {
                    show: false
                },
                xAxis: {
                    type:'value',
                    min: -120,
                    axisLabel: {
                        show: true,
                        textStyle:{
                            color: '#999999'
                        },
                        formatter:function(value){
                            if(value<0){
                              return -value
                            }
                            else{
                              return value
                            }
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            type: 'dashed',
                            color: '#dddddd'
                        }
                    }

                },
                yAxis: {
                    type: 'category',
                    axisLabel: {
                        show: true,
                        fontSize: 12,
                        color: '#333333',
                        align: 'right',
                        width: 80,
                        interval: 0,
                        formatter:function(value){
                            var result = "";//拼接加\n返回的类目项
                            var maxLength = 4;//每项显示文字个数
                            var valLength = value.length;//X轴类目项的文字个数
                            var rowNumber = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                            if (rowNumber > 1)//如果文字大于3,
                            {
                                for (var i = 0; i < rowNumber ; i++) {
                                    var temp = "";//每次截取的字符串
                                    var start = i * maxLength;//开始截取的位置
                                    var end = start + maxLength;//结束截取的位置
                                    temp = value.substring(start, end) + "\n";
                                    result += temp; //拼接生成最终的字符串
                                }
                                return result ;
                            }
                            else {
                                return value;
                            }
                        },
                        rich:{
                            a:{}
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle:{
                            color: '#dddddd'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    data: _this.chartData[0],
                },
                series: [{
                    type: 'bar',
                    name: '车辆数',
                    stack: '1',
                    label:{
                        show: true,
                        position: 'left',
                        fontSize: 12,
                        color: '#999999',
                        formatter: function(params){
                            return -params.value
                        }
                    },
                    barWidth: 8,
                    itemStyle: {
                        normal: {
                            color: '#ffd800'
                        },
                        emphasis: {
                            color: '#ffd800'
                        }
                    },
                    data: _this.chartData[1]
                }, {
                    type: 'bar',
                    name: '里程',
                    stack: '1',
                    label:{
                        show: true,
                        position: 'right',
                        fontSize: 12,
                        color: '#999999'
                    },
                    barWidth: 8,
                    itemStyle: {
                        normal: {
                            color: '#00cd66'
                        },
                        emphasis: {
                            color: '#00cd66'
                        }
                    },
                    data: _this.chartData[2]
                },{
                    type: 'bar',
                    name: '超速里程',
                  label:{
                    show: true,
                    position: 'right',
                    fontSize: 12,
                    color: '#999999'
                  },
                    barWidth: 8,
                    itemStyle: {
                        normal: {
                            color: '#f34750'
                        },
                        emphasis: {
                            color: '#f34750'
                        }
                    },
                    data: _this.chartData[3]
                },{
                  type: 'bar',
                  name: '越界里程',
                  label:{
                    show: true,
                    position: 'right',
                    fontSize: 12,
                    color: '#999999'
                  },
                  barWidth: 8,
                  itemStyle: {
                    normal: {
                      color: '#7c2cf3'
                    },
                    emphasis: {
                      color: '#7c2cf3'
                    }
                  },
                  data: _this.chartData[4]
                }]
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.analysis-panel {
  width: 100%;
  height: 400px;
  padding-top: 10px;
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
    height: calc(100% - 30px);
    .car-tab-panel {
      height: 34px;
      width: 100%;
      background-color: #f5f5f5;
      position: relative;
      /deep/.swiper-container{
        height:100%;
        margin: 0px 15px;
        .swiper-slide {
          text-align: center;
          line-height: 34px;
          span {
            height: 100%;
            display: inline-block;
            border-bottom: 2px solid transparent;
            cursor: pointer;
          }
        }
        .swiper-slide.active span {
          color: #2c90f3;
          font-weight: 600;
          border-bottom: 2px solid #2c90f3;
        }
      }
      .swiper-button-prev, .swiper-button-next{
        position: absolute;
        top: 0;
        width: 20px;
        height: 34px;
        margin-top: 0px;
        z-index: 10;
        cursor: pointer;
        background-image: unset !important;
        background-color: #eeeeee;
        outline: unset;
        i{
          margin-top: 10px;
          margin-left:4px;
        }
      }
      .swiper-button-prev{
        left: 0px;
      }
      .swiper-button-next{
        right: 0px;
      }
    }
    .show-panel {
      margin-top: 5px;
      height: 323px;
      width: 100%;
      background-color: #f5f5f5;
      .legend-panel {
        height: 58px;
        width: 100%;
        border-bottom: solid 1px #dddddd;
        padding: 10px 0px 10px 20px;
        .item {
          width: 137px;
          font-size: 13px;
          .legend {
            width: 10px;
            height: 10px;
            border-radius: 2px;
            margin: 0px 5px 0px 10px;
            &.green {
              background-color: #00cd66;
            }
            &.red {
              background-color: #f34750;
            }
            &.yellow {
              background-color: #ffd800;
            }
            &.purple {
              background-color: #7c2cf3;
            }
          }
        }
      }
      #bar-chart {
        width: 100%;
        height: calc(100% - 58px);
      }
    }
    /*background-color: #f5f5f5;*/
  }
}
</style>
