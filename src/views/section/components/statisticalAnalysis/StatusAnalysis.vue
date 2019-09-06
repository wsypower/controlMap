<template>
    <div class="analysis-panel">
        <div class="panel-header" flex="dir:left cross:center">
            <span class="title">状态</span>
        </div>
        <div class="panel-content">
            <div class="status-choose-panel">
                <a-radio-group @change="onChange" v-model="status">
                    <a-radio value="all">全部(630)</a-radio>
                    <a-radio value="online">在线(100)</a-radio>
                    <a-radio value="outline">离线(530)</a-radio>
                </a-radio-group>
            </div>
            <div id="status"></div>
            <div class="step"></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'StatusAnalysis',
        data(){
            return {
                status: 'all'
            }
        },
        mounted(){
            this.getChartData();
        },
        methods:{
            onChange(val){
                console.log('status:change',val);
            },
            getChartData(){
                this.chartInit();
            },
            chartInit(){
                let data = [{'name':'市本级指挥中心1','value': 24},
                    {'name':'市本级指挥中心2','value': 24},
                    {'name':'信息采集中心1','value': 34},
                    {'name':'信息采集中心2','value': 17},
                    {'name':'信息采集中心3','value': 78},
                    {'name':'信息采集中心4','value': 31},
                    {'name':'信息采集中心5','value': 8},
                    {'name':'信息采集中心6','value': 1},
                    {'name':'信息采集中心7','value': 45},
                    {'name':'信息采集中心8','value': 77},
                    {'name':'信息采集中心9','value': 51}]

                const ChartColumnar = this.$echarts.init(document.getElementById('status'));
                ChartColumnar.setOption({
                    grid: {
                        top: 10,
                        left: 5,
                        right: 5,
                        bottom: 10,
                        containLabel: true
                    },
                    title: {
                        text: 630,
                        subtext: "人员总数",
                        itemGap: 5,
                        top: 75,
                        left: 73,
                        //textAlign:"center",
                        textStyle: {
                            color: "#333333",
                            fontSize: 23,
                            width: 200,
                            align: 'center',
                            rich:{
                                a:{
                                    width:100,
                                    align: 'center'
                                }
                            }
                        },
                        subtextStyle: {
                            "color": "#999999",
                            "fontSize": 12,
                        }
                    },
                    tooltip: {
                        show: false
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: "0",
                        top: 'middle',
                        icon: "roundRect",
                        itemWidth: 12,
                        itemHeight: 12,
                        textStyle: {
                            "color": "#333333",
                            "fontSize": 12,
                            padding: [0,0,0,2],
                            width: 90
                        },
                        pageIconSize: 10
                    },
                    series: [{
                        type: "pie",
                        center: ["32%", "50%"],
                        radius: ["40%", "50%"],
                        color: ["#febb08", "#f07171", "#50cf3f", "#2c90f3", "#3fcfc0", "#7c2cf3", "#ba6112", "#FE2C8A"],
                        startAngle: 135,
                        // labelLine: {
                        //     "normal": {
                        //         "length": 25
                        //     }
                        // },
                        label: {
                            normal: {
                                formatter: "{c|{c}}",
                                rich: {
                                    "c": {
                                        "color": "#333333",
                                        "fontSize": 12
                                    }
                                }
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                formatter: "{c|{c}}",
                                rich: {
                                    "c": {
                                        "fontSize": 16,
                                        "color": "#222222"
                                    }
                                }
                            }
                        },
                        data: data
                    }]
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
.analysis-panel{
    width: 100%;
    height: 270px;
    padding-top: 6px;
    .panel-header{
        width: 100%;
        height: 30px;
        .title{
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #333333;
        }
    }
    .panel-content{
        width: 100%;
        height: calc(100% - 30px);
        background-color: #f5f5f5;
        position: relative;
        .status-choose-panel{
            height: 38px;
            width: 100%;
            border-bottom: 1px solid #dddddd;
            text-align: center;
            line-height: 38px;
        }
        #status{
            width: 100%;
            height: calc(100% - 38px);
        }
        .step{
            height: calc(100% - 38px);
            position: absolute;
            right: 120px;
            bottom: 0px;
            border-right: 1px solid #dddddd;
        }
    }
}
</style>
