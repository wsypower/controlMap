<template>
    <div class="info-panel">
        <div class="info-panel-header" flex="main:justify cross:center">
            <span>{{monitorData.name}}</span>
            <span><cg-icon-svg name="time" class="svg_icon_time"></cg-icon-svg>进行中</span>
        </div>
        <div class="online-panel">
            <p>人员在岗监测</p>
            <div class="online-content-panel" flex="cross:center" >
                <div id="person-monitor"></div>
                <div class="des-panel">
                    <p>到岗人数：{{monitorData.peopleMonitor.online}}</p>
                    <p>未到岗人数：{{monitorData.peopleMonitor.offline}}</p>
                </div>
            </div>
        </div>
        <div class="case-panel">
            <p>案件监测</p>
            <div class="tab-panel">
                <a-radio-group @change="onChangeTab" v-model="caseType">
                    <a-radio-button value="all">总案件</a-radio-button>
                    <a-radio-button value="noHandle">未处理案件</a-radio-button>
                </a-radio-group>
            </div>
            <div class="case-content-panel" id="case-monitor">

            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
    export default {
      name: 'monitorYuAn',
      data(){
        return{
          caseType: 'all',
          monitorData:{
            name: '',
            peopleMonitor:{
              online: 0,
              offline: 0
            }
          }
        }
      },
      mounted() {
        this.getMonitorInfoById().then((res)=>{
          this.monitorData = res.data;
          this.init();
        });
      },
      methods:{
        ...mapActions('emergency/monitor', ['getMonitorInfoById']),
        init(){
          this.gaugeChartInit();
          this.pieChartInit();
        },
        gaugeChartInit(){
          let online = this.monitorData.peopleMonitor.online,
            offline = this.monitorData.peopleMonitor.offline,
            onlineRate = (online*100/(online + offline)).toFixed(2);
          const ChartGauge = this.$echarts.init(document.getElementById('person-monitor'));
          ChartGauge.setOption({
            series: [{
              name: '刻度',
              type: 'gauge',
              radius: '80%',
              min:0,
              max:36,
              splitNumber: 10, //刻度数量
              startAngle: 220,
              endAngle: -40,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 1,
                  color: [[1,'rgba(0,0,0,0)']]
                }
              },
              //仪表盘轴线
              axisLabel: {
                show: false,
                color:'#00a4fe'
              },
              //刻度标签
              axisTick: {
                show: true,
                lineStyle: {
                  color: '#00a4fe',
                  width: 1
                },
                length: -6
              },
              //刻度样式
              splitLine: {
                show: true,
                length: -10,
                lineStyle: {
                  color: '#00a4fe'
                }
              },
              //分隔线样式
              detail: {
                show: false
              },
              pointer: {
                show: false
              }
            },
              {
                type: 'gauge',
                radius: '70%',
                center: ['50%', '50%'],
                splitNumber: 0, //刻度数量
                startAngle: 220,
                endAngle: -40,
                axisLine: {
                  show: true,
                  lineStyle: {
                    width: 5,
                    color: [
                      [
                        0.98, new this.$echarts.graphic.LinearGradient(
                        0, 0, 1, 0, [{
                          offset: 0,
                          color: '#ae3df6'
                        },
                          {
                            offset: 1,
                            color: '#53bef9'
                          }
                        ]
                      )
                      ],
                      [
                        1, '#222e7d'
                      ]
                    ]
                  }
                },
                //分隔线样式。
                splitLine: {
                  show: false,
                },
                axisLabel: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                pointer: {
                  show: false
                },
                title: {
                  show: true,
                  offsetCenter: [0, '110%'], // x, y，单位px
                  textStyle: {
                    color: '#00a4fe',
                    fontSize: 16
                  }
                },
                //仪表盘详情，用于显示数据。
                detail: {
                  show: true,
                  offsetCenter: [0, 0],
                  color: '#00a4fe',
                  formatter: function(params) {
                    return params + '%'
                  },
                  textStyle: {
                    fontSize: 16
                  }
                },
                data: [{
                  name: "到岗率",
                  value: onlineRate
                }]
              }
            ]});
        },
        pieChartInit(){

          let info = [];
          if(this.caseType=='all'){
            info = this.monitorData.caseMonitor.totalInfo;
          }
          else{
            info = this.monitorData.caseMonitor.noHandleInfo;
          }
          let total = info.reduce((res,item)=>{
             return res + item.value
           },0)

          const ChartPie = this.$echarts.init(document.getElementById('case-monitor'));
          ChartPie.setOption({
            color: ['#c881ec','#16f2ae','#e75fc3','#a0f821','#f2719a','#fc661f','#f59a8f','#fdb301','#57e7ec','#cf9ef1'],
            title: [
              {
                text: '总共',
                subtext: total + '个',
                textStyle:{
                  fontSize:14,
                  color:"#00a4fe"
                },
                subtextStyle: {
                  fontSize: 14,
                  color: '#00a4fe'
                },
                textAlign:"center",
                x: '29%',
                y: '40%',
              }],
            legend: {
              type:"scroll",
              orient: 'vertical',
              left:'60%',
              align:'left',
              top:'middle',
              textStyle: {
                color:'#00a4fe'
              }
            },
            series: [
              {
                name:'标题',
                type:'pie',
                center: ['30%', '50%'],
                radius: ['40%', '50%'],
                clockwise: false, //饼图的扇区是否是顺时针排布
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'outter',
                    formatter:function (parms){
                      return parms.data.legendname
                    }
                  }
                },
                labelLine: {
                  normal: {
                    length:5,
                    length2:3,
                    smooth:true,
                  }
                },
                data:info
              }
            ]
          });
        },
        onChangeTab(){
          this.pieChartInit();
        }
      }
    }
</script>
<style lang="scss" scoped>
    .info-panel{
        position: absolute;
        top: 80px;
        left:20px;
        width: 300px;
        height: 500px;
        border: 1px solid #cccccc;
        background-color: #ffffff;
        border-radius: 6px;
        .info-panel-header{
            height: 40px;
            font-size: 16px;
            line-height: 40px;
            padding: 0px 10px;
            span{
                font-size: 16px;
                &:first-child{
                    color: #555555;
                }
                &:last-child{
                    color: #00c600;
                }
            }
            .svg_icon_time{
                width: 18px;
                height: 18px;
                font-size: 14px;
                color: #00c600;
                vertical-align: middle;
                margin-right: 5px;
            }
        }
        .online-panel{
            margin-top: 20px;
            padding: 0px 10px;
            color: rgba(0, 0, 0, 0.65);
            >p{
                font-size: 14px;
            }
            .online-content-panel{
                width: 100%;
                height: 140px;
                #person-monitor{
                    width: 60%;
                    height: 100%;
                }
            }
        }
        .case-panel{
            margin-top: 20px;
            padding: 0px 10px;
            >p{
                color: rgba(0, 0, 0, 0.65);
                font-size: 14px;
            }
            .tab-panel{
                width: 100%;
                text-align: center;
            }
            .case-content-panel{
                width: 100%;
                height: 180px;
            }
        }
    }
</style>
