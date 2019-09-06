<template>
    <div class="people-trail" flex="dir:top">
        <div class="search-panel">
            <div flex="fir:left cross:center">
                <label style="width: 90px;">查询时间：</label>
                <a-range-picker v-model="dayRange" style="width: 100%"/>
            </div>
            <div flex="fir:left cross:center" style="margin:10px 0px;">
                <label style="width: 90px;">选择人员：</label>
                <a-select v-model="query.userId" showSearch placeholder="请选择" style="width: 100%;">
                    <a-select-option value="">全部</a-select-option>
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="tom">Tom</a-select-option>
                </a-select>
            </div>
            <div flex="fir:left cross:center" style="margin-bottom:10px;">
                <label style="width: 90px;">违规类型：</label>
                <a-select v-model="query.vType" showSearch placeholder="请选择" style="width: 100%;">
                    <a-select-option value="">全部</a-select-option>
                    <a-select-option value="越界">越界</a-select-option>
                    <a-select-option value="不在岗">不在岗</a-select-option>
                </a-select>
            </div>
            <a-button type="primary" style="width: 100%" @click="onSearch">查询</a-button>
        </div>
        <div class="table_header" flex="dir:left cross:center main:justify">
            <span>违规记录</span>
            <span v-if="dataList.length>1">人数：{{dataList.length}}</span>
        </div>
        <div class="content_body">
            <cg-container scroll>
                <div class="item" v-for="(item,index) in dataList" :key="index">
                    <div class="base-info-panel">
                        <div class="base"><span>{{item.name}}</span><span>（{{item.dept}}）</span></div>
                        <div class="type"><span v-for="vType in item.vTypeList" :class="{yuejie:vType=='越界',buzaigang:vType=='不在岗'}">{{vType}}</span></div>
                        <div class="right-top-panel">违规{{item.vLog.length}}次</div>
                        <div class="right-bottom-panel" @click="onExpend(index,item)">
                            <span>{{item.expend?'收起':'展开'}}</span><a-icon type="caret-down" class="expend-icon" :class="{up:item.expend}"/>
                        </div>
                    </div>
                    <ul ref="animatePanel" class="animate-panel" :class="{downAnimate:item.expend, upAnimate:!item.expend}">
                        <div class="animate-content" ref="animateContent">
                            <li v-for="(log,i) in item.vLog" :key="i">
                                <span>{{log.day}}</span>
                                <span>{{log.startTime}}~{{log.endTime}}</span>
                                <span :class="{yuejie:log.vType==='越界', buzaigang:log.vType==='不在岗'}">{{log.vType}}</span>
                                <span @click="startPlay(log)">播放</span>
                                <span><a-icon type="delete" @click="deleteVLog(log)"/></span>
                            </li>
                        </div>
                    </ul>
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
                    vType: '',
                },
                dayRange: [],
                peopleDataList: [],
                dataList:[
                    {
                        userId: 'jhsjhdhdj',
                        name: '甄某某',
                        dept: '信息采集中心',
                        vTypeList: ['越界'],
                        expend: false,
                        vLog:[{
                                day: '2018-09-23',
                                startTime: '09:30',
                                endTime: '09:50',
                                vType: '越界'
                            },
                            {
                                day: '2018-09-26',
                                startTime: '09:30',
                                endTime: '09:50',
                                vType: '越界'
                            },{
                                day: '2018-09-27',
                                startTime: '09:30',
                                endTime: '09:50',
                                vType: '越界'
                            },{
                                day: '2018-09-28',
                                startTime: '09:30',
                                endTime: '09:50',
                                vType: '越界'
                            },{
                                day: '2018-09-29',
                                startTime: '09:30',
                                endTime: '09:50',
                                vType: '越界'
                            }
                        ],
                    }, {
                        userId: 'erghjhdhdjfdgfhfghg',
                        name: '何某',
                        dept: '信息采集中心',
                        vTypeList: ['越界', '不在岗'],
                        expend: false,
                        vLog:[{
                            day: '2018-09-23',
                            startTime: '09:30',
                            endTime: '09:50',
                            vType: '越界'
                            },{
                                day: '2018-09-26',
                                startTime: '09:30',
                                endTime: '09:50',
                                vType: '不在岗'
                            },{
                                day: '2018-09-27',
                                startTime: '09:30',
                                endTime: '09:50',
                                vType: '不在岗'
                            }
                        ],
                    },
                ],
                totalSize: 18
            }
        },
        methods:{
            //获取人员违规数据
            getDataList(){

            },
            //搜索关键字查询
            onSearch() {
                this.getDataList()
            },
            onExpend(index,item){
                let height = this.$refs.animateContent[index].offsetHeight;
                console.log('onExpend',height);
                item.expend = !item.expend;
                if(item.expend){
                    this.$refs.animatePanel[index].style.height = height + 'px';
                }
                else{
                    this.$refs.animatePanel[index].style.height = '0px';
                }
            },
            startPlay(log){

            },
            // pausePlay(i){
            //     this.dataList[i].isStart = false;
            // },
            deleteVLog(log){

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
        }
        .content_body {
            height: calc(100% - 70px);
            position:relative;
            .item{
                width: 100%;
                margin-bottom: 10px;
                background-color: #f5f5f5;
                position: relative;
                .base-info-panel{
                    padding: 8px 12px 0px 12px;
                    width: 100%;
                    position: relative;
                }
                .base{
                    span{
                        &:first-child{
                            font-family: PingFang-SC-Bold;
                            font-size: 18px;
                            font-weight: bold;
                            color: #333333;
                        }
                        &:last-child{
                            font-family: PingFang-SC-Medium;
                            font-size: 13px;
                            color: #333333;
                        }
                    }
                }
                .type{
                    margin-top:6px;
                    padding-bottom: 12px;
                    span{
                        display:inline-block;
                        width: 66px;
                        height: 22px;
                        line-height: 22px;
                        border-radius: 11px;
                        text-align: center;
                        font-family: PingFang-SC-Bold;
                        font-size: 13px;
                        margin-right: 8px;
                        &.yuejie{
                            background-color: rgba(240,113,113,0.2);
                            color: #f07171;
                        }
                        &.buzaigang{
                            background-color: rgba(254,135,8,0.2);
                            color: #fe8708;
                        }
                    }
                }
                .right-top-panel{
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    background-color: #f07171;
                    border-bottom-left-radius: 8px;
                    font-family: PingFang-SC-Medium;
                    font-size: 13px;
                    line-height: 20px;
                    color: #ffffff;
                    padding: 2px 8px;
                }
                .right-bottom-panel{
                    position: absolute;
                    right: 12px;
                    top: 45px;
                    span{
                        font-family: PingFang-SC-Medium;
                        font-size: 13px;
                        color: #2b90f3;
                        margin-right: 2px;
                    }
                    i{
                        color:#aaaaaa;
                        &.expend-icon{
                            transition: all 0.2s;
                            transform: rotate(0deg);
                            transform-origin: center;
                            &.up{
                                transform: rotate(180deg);
                            }
                        }
                    }
                }
                .animate-panel{
                    height: 0px;
                    overflow: hidden;
                    transition: height 0.3s;
                    &.upAnimate {
                        height: 0px;
                    }
                    &.downAnimate {
                        height: auto;
                    }
                }
                ul{
                    width: 100%;
                    list-style: unset;
                    padding: 0;
                    margin: 0;
                    li{
                        width: 100%;
                        height: 27px;
                        line-height: 27px;
                        border-top: 1px dashed #ddd;
                        &:first-child{
                            border-top: 1px solid #dddddd;
                        }
                        span{
                            display: inline-block;
                            text-align: center;
                            font-size: 13px;
                            color: #666666;
                            &:nth-child(1){
                                width: 90px;
                            }
                            &:nth-child(2){
                                width: 90px;
                            }
                            &:nth-child(3){
                                width: 60px;
                                &.yuejie{
                                    color: #f07171;
                                }
                                &.buzaigang{
                                    color: #fe8708;
                                }
                            }
                            &:nth-child(4){
                                width: 50px;
                                color: #2b90f3;
                                cursor: pointer;
                            }
                            &:nth-child(5){
                                cursor: pointer;
                                &:hover{
                                    color: #2b90f3;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
