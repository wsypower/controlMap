<template>
    <div class="people-trail" flex="dir:top">
        <div class="search-panel">
            <div flex="fir:left cross:center">
                <label style="width: 90px;">选择人员：</label>
                <a-select v-model="query.userId" showSearch placeholder="请选择" style="width: 100%;">
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="tom">Tom</a-select-option>
                </a-select>
            </div>
            <div flex="fir:left cross:center" style="margin:10px 0px;">
                <label style="width: 90px;">查询时间：</label>
                <a-range-picker v-model="dayRange" style="width: 100%"/>
            </div>
            <a-button type="primary" style="width: 100%" @click="onSearch">查询</a-button>
        </div>
        <div class="table_header">
            <div>
                <span>序号</span>
                <span class="sort-icon">
                    <i @click="onSort('asc')">
                        <cg-icon-svg name="caret_up" class="svg_icon_up" :class="{active: activeName === 'asc'}" ></cg-icon-svg>
                    </i>
                    <i  @click="onSort('desc')">
                        <cg-icon-svg name="caret_down" class="svg_icon_down" :class="{active: activeName === 'desc'}"></cg-icon-svg>
                    </i>
                </span>
            </div>
            <span>起止时间</span>
        </div>
        <div class="content_body">
            <cg-container scroll>
                <div class="item" flex="dir:left main:justify" v-for="(item,index) in dataList" :key="index">
                    <div flex="cross:center main:center"><span>{{item.index}}</span></div>
                    <div>
                        <p><span class="dot green"></span>{{item.startTime}}</p>
                        <p><span class="dot red"></span>{{item.endTime}}</p>
                    </div>
                    <div flex="cross:center main:center">
                        <span class="look" style="color: #2bbdf3;">查看</span>
                    </div>
                </div>
                <div v-if="dataList.length > 20" class="pagination-panel">
                    <!--<div @click="clickTip">测试点击</div>-->
                    <a-pagination :total="totalSize"
                            :showTotal="total => `共 ${total} 条`"
                            :pageSize="20"
                            :defaultCurrent="1"
                            @change="changePagination"
                    />
                </div>
            </cg-container>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: '',
        data(){
            return {
                query: {
                   userId: '',
                   startDay: '',
                   endDay: '',
                   sortType: 'asc',
                   pageNo: 1,
                   pageSize: 20
                },
                dayRange: [],
                peopleDataList: [],

                start: false,
                activeName: 'asc',
                activeIndex: null,
                dataList:[
                    {
                        index: '01',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },
                    {
                        index: '02',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '03',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '04',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '05',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '06',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '07',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '08',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '09',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '10',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '11',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '12',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '13',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '14',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '15',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '16',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '17',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    },{
                        index: '18',
                        startTime: 1567666798,
                        endTime: 1567666798,
                        isStart: false
                    }
                ],
                totalSize: 18
            }
        },
        methods:{
            //获取人员轨迹数据
            getDataList(){

            },
            //搜索关键字查询
            onSearch() {
                this.getDataList()
            },
            //翻页
            changePagination(pageNo, pageSize) {
                console.log('changePagination', pageNo, pageSize)
                this.query.pageNo = pageNo;
                this.getDataList()
            },
            onSort(sortType){
                console.log(11111111111,sortType)
                this.activeName = sortType;
            },
            startPlay(i){
                this.dataList[i].isStart = true;
            },
            pausePlay(i){
                this.dataList[i].isStart = false;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .people-trail{
        height: 100%;
        width: 100%;
        .search-panel {
            padding: 20px 0px;
        }
        .table_header{
            margin-bottom: 8px;
            >div{
                display: inline-block;
                width: 80px;
                text-align: center;
                .sort-icon{
                    display:inline-block;
                    margin-left: 5px;
                    .svg_icon_up,.svg_icon_down{
                        display:block;
                        width: 8px;
                        height: 8px;
                        color: #cccecf;
                        cursor: pointer;
                        &.active{
                            color: #333333;
                        }
                    }
                }
                >*{
                    vertical-align: middle;
                }
            }
            >span{
                display: inline-block;
                width: 90px;
                text-align: center;
                vertical-align: middle;
            }
        }
        .content_body {
            background-color: #f5f5f5;
            height: calc(100% - 70px);
            position:relative;
            .item{
                width: 100%;
                height: 68px;
                border-top: solid 1px #f5f5f5;
                border-right: solid 1px #f5f5f5;
                border-left: solid 1px #f5f5f5;
                border-bottom: 1px solid #dddddd;
                &:hover{
                    background-color: #e9f6ff;
                    border: solid 1px #2b90f3;
                }
                >div{
                    &:first-child{
                        width: 74px;
                        height: 100%;
                        span{
                            color: #ffffff;
                            font-size: 14px;
                            padding: 5px 8px;
                            background-color: #2b90f3;
                            border-radius: 4px;
                        }
                    }
                    &:nth-child(2){
                        border-left: 1px dashed #dddddd;
                        margin: 20px 0px 20px -30px;
                        p{
                            margin-bottom: 5px;
                            margin-left: -4px;
                            &:first-child{
                                margin-top: -10px;
                            }
                        }
                        .dot{
                            display:inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 8px;
                            margin-right: 15px;
                            &.green{
                                background-color: #50cf3f;
                            }
                            &.red{
                                background-color: #f07171;
                            }
                        }
                    }
                    &:last-child{
                        width: 66px;
                        height: 100%;
                        .look{
                            color: #2bbdf3;
                            cursor: pointer;
                            border-bottom: 1px solid transparent;
                            &:hover{
                                border-bottom: 1px solid #2bbdf3;
                            }
                        }
                    }
                }
            }
            .pagination-panel {
                text-align: right;
                padding: 20px 20px 0px 0px;
            }
        }
    }
</style>
