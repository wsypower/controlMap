<template>
    <div class="analysis-panel">
        <div class="panel-header" flex="dir:left cross:center main:justify">
            <span class="title">人员分析</span>
            <div class="legend">
                <span><i class="dot green"></i>在岗</span>
                <span><i class="dot blue"></i>在线</span>
                <span><i class="dot grey"></i>全部</span>
            </div>
        </div>
        <div class="panel-content" id="analysis"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'PeopleAnalysis',
        data(){
            return {

            }
        },
        mounted(){
            this.getChartData();
        },
        methods:{
            getChartData(){
                this.chartInit();
            },
            chartInit(){
                let data =[['中队名称','中队名称','中队名称','中队名称','中队名称','中队名称','中队名称'],
                    ['90','130','70','180','150','130','115'],
                    ['220','195','160','230','180','230','180'],
                    ['310','275','260','290','240','290','240']];

                const ChartColumnar = this.$echarts.init(document.getElementById('analysis'));
                ChartColumnar.setOption({
                    grid: {
                        top: 10,
                        left: 5,
                        right: 50,
                        bottom: 10,
                        containLabel: true
                    },
                    tooltip: {
                        show: false
                    },
                    xAxis: {
                        axisLabel: {
                            show: true,
                            textStyle:{
                                color: '#999999'
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
                        data: data[0],
                        axisLabel: {
                            fontSize: 12,
                            color: '#333333'
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
                        }
                    },
                    series: [{
                        type: 'bar',
                        name: '全部',
                        // legendHoverLink: false,
                        label:{
                            show: true,
                            position: 'right',
                            fontSize: 12,
                            color: '#dddddd',
                            formatter: function(params){
                                return data[1][params.dataIndex]
                                    + '/' + data[2][params.dataIndex]
                                    +'/'+ data[3][params.dataIndex]
                            }
                        },
                        barWidth: 8,
                        itemStyle: {
                            normal: {
                                color: '#a0a0a0'
                            },
                            emphasis: {
                                color: '#a0a0a0'
                            }
                        },
                        data: data[3]
                    }, {
                        type: 'bar',
                        name: '在线',
                        barWidth: 8,
                        // legendHoverLink: false,
                        // label: _label,
                        itemStyle: {
                            normal: {
                                color: '#3296fa'
                            },
                            emphasis: {
                                color: '#3296fa'
                            }
                        },
                        data: data[2]
                    },{
                        type: 'bar',
                        name: '在岗',
                        //legendHoverLink: false,
                        barWidth: 8,
                        barGap: '-100%',
                        itemStyle: {
                            normal: {
                                color: '#50cf3f'
                            },
                            emphasis: {
                                color: '#50cf3f'
                            }
                        },
                        data: data[1]
                    }]
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
.analysis-panel{
    width: 100%;
    height: 306px;
    padding-top: 6px;
    .panel-header{
        width: 100%;
        height: 30px;
        .title{
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #333333;
        }
        .legend{
            >span{
                font-family: MicrosoftYaHei;
                font-size: 12px;
                color: #666666;
                .dot{
                    display:inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 2px;
                    margin: 0px 5px 0px 10px;
                    &.green{
                        background-color: #50cf3f;
                    }
                    &.blue{
                        background-color: #3296fa;
                    }
                    &.grey{
                        background-color: #a0a0a0;
                    }
                }
            }
        }
    }
    .panel-content{
        width: 100%;
        height: calc(100% - 30px);
        background-color: #f5f5f5;
    }
}
</style>
