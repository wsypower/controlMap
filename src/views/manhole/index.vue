<template>
    <div class="left-message">
        <div class="left-message-title">
            智能窨井盖
        </div>
        <div class="search-panel">
            <a-input-search placeholder="输入关键词搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
        </div>
        <div class="search-result">
            <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
                <a-spin tip="数据加载中..."></a-spin>
            </div>
            <div class="data-panel" v-else>
                <cg-container scroll v-if="dataArr.length > 0">
                    <div v-for="(item, index) in dataArr"
                         :key="index" class="item"
                         :class="{active: activeIndex===index,warning:item.statusId==='02'}"
                         flex="cross:center main:justify"
                         @click="clickDataItem(index)">
                        <div class="item_left">
                            <cg-icon-svg name="manhole" class="svg_icon"></cg-icon-svg>
                            <span>{{item.name}}</span>
                        </div>
                        <div class="item_right">
                            <span>水位：{{item.statusName}}</span>
                            <cg-icon-svg name="pin" class="svg_icon"></cg-icon-svg>
                        </div>
                    </div>
                </cg-container>
                <div v-else class="none-panel" flex="main:center cross:center">
                    <img src="~@img/zanwuyuan.png" />
                </div>
            </div>
        </div>
        <div hidden>
            <tip-modal
                    ref="yuAnOverlay"
                    :modalWidth="modalWidth"
                    :modalHeight="modalHeight"
                    :iconName="iconName"
                    :title="modalTitle"
                    :subTitle="subTitle"
                    :componentId="tipComponentId"
                    :info="infoData"
                    @closeDialog="closeOverlay()"
            ></tip-modal>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    export default {
        name: 'manhole',
        data() {
            return {
                //查询条件
                query: {
                    searchContent: '', //搜索关键字
                    status: '', //状态，‘’代表全部
                },
                //数据查询中
                showLoading: false,
                //数据存放处
                dataArr: [],
                //目前激活的窨井盖序号
                activeIndex: null,

                //tipModal弹窗标题上的icon
                iconName: '',
                //tipModal弹窗标题
                modalTitle: '',
                //tipModal弹窗副标题
                subTitle: '',
                //tipModal弹窗body内组件
                tipComponentId: {},
                //tipModal组件内组件的原始数据
                infoData: {},
            }
        },
        components: {

        },
        computed: {
            ...mapState('cgadmin/menu', ['aside', 'asideCollapse']),
            ...mapState('cgadmin/page', ['current']),
            ...mapState('map', ['mapManager'])
        },
        mounted() {
            this.getDataList();
        },
        watch: {

        },
        methods: {
            // ...mapMutations('map', ['setEmergencyAllArea', 'setSelectEmergencyFeature']),
            // ...mapActions('emergency/emergency', ['getEmergencyYuAnDataList', 'deleteEmergencyYuAn', 'getAllEmergencyPeople','getPersonInfo']),
            //获取预案数据
            getDataList() {
                //this.showLoading = true
                this.dataArr = [{
                    id: 'aaa',
                    name: '窨井盖G100001',
                    statusId: '01',
                    statusName: '正常',
                    updateTime: 1568278602377,
                    wLevel: '1.0M',
                    voltage: '23',
                    signalStrength: '3.6V',
                    temperature: '33℃'
                }, {
                    id: 'bbb',
                    name: '窨井盖G100002',
                    statusId: '02',
                    statusName: '告警',
                    updateTime: 1568278602377,
                    wLevel: '1.0M',
                    voltage: '23',
                    signalStrength: '3.6V',
                    temperature: '33℃'
                },{
                    id: 'ccc',
                    name: '窨井盖G100003',
                    statusId: '01',
                    statusName: '正常',
                    updateTime: 1568278602377,
                    wLevel: '1.0M',
                    voltage: '23',
                    signalStrength: '3.6V',
                    temperature: '33℃'
                },{
                    id: 'ddd',
                    name: '窨井盖G100004',
                    statusId: '02',
                    statusName: '告警',
                    updateTime: 1568278602377,
                    wLevel: '1.0M',
                    voltage: '23',
                    signalStrength: '3.6V',
                    temperature: '33℃'
                },{
                    id: 'eee',
                    name: '窨井盖G100005',
                    statusId: '01',
                    statusName: '正常',
                    updateTime: 1568278602377,
                    wLevel: '1.0M',
                    voltage: '23',
                    signalStrength: '3.6V',
                    temperature: '33℃'
                },{
                    id: 'fff',
                    name: '窨井盖G100006',
                    statusId: '01',
                    statusName: '正常',
                    updateTime: 1568278602377,
                    wLevel: '1.0M',
                    voltage: '23',
                    signalStrength: '3.6V',
                    temperature: '33℃'
                },{
                    id: 'ggg',
                    name: '窨井盖G100007',
                    statusId: '01',
                    statusName: '正常',
                    updateTime: 1568278602377,
                    wLevel: '1.0M',
                    voltage: '23',
                    signalStrength: '3.6V',
                    temperature: '33℃'
                },{
                    id: 'hhh',
                    name: '窨井盖G100008',
                    statusId: '01',
                    statusName: '正常',
                    updateTime: 1568278602377,
                    wLevel: '1.0M',
                    voltage: '23',
                    signalStrength: '3.6V',
                    temperature: '33℃'
                }]
                // this.getEmergencyYuAnDataList(this.query).then(res => {
                //     console.log(res)
                //     this.dataArr = res.list
                //     this.totalSize = res.total
                //     this.showLoading = false
                // })
            },
            //搜索关键字查询
            onSearch(val) {
                this.query.searchContent = val
                this.getDataList()
            },

            //选择某个预案
            clickDataItem(index) {
                console.log('clickDataItem', index);
                this.activeIndex = index;
                const data = this.dataArr[index];

            }
        }
    }
</script>

<style lang="scss" scoped>
    .left-message {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        position: relative;
        .left-message-title {
            height: 50px;
            width: 100%;
            padding-left: 20px;
            line-height: 50px;
            background-color: #f5f7f8;
            color: #2b90f3;
            font-size: 18px;
            text-align: left;
        }
        .search-panel {
            padding: 20px;
        }
        .search-result {
            width: 100%;
            height: calc(100% - 170px);
            padding: 0px 20px;
            .spin-panel {
                width: 100%;
                height: 480px;
            }
            .data-panel {
                width: 100%;
                height: 100%;
                position: relative;
                .none-panel {
                    width: 100%;
                    height: 100%;
                }
                .item{
                    width: 100%;
                    height:40px;
                    margin-top: 2px;
                    background-color: #f5f7f8;
                    font-family: PingFang-SC-Medium;
                    font-size: 14px;
                    color: #333333;
                    cursor: pointer;
                    &.active{
                        background-color: #e9f6ff;
                    }
                    &.warning{
                        color: #f07171;
                        .item_left{
                            .svg_icon{
                                color: #f07171;
                            }
                        }
                    }
                    .svg_icon{
                        width: 16px;
                        height: 16px;
                    }
                    .item_left{
                        margin-left: 10px;
                        .svg_icon{
                            color: #2b8ff3;
                        }
                        span{
                            margin-left: 5px;
                        }
                    }
                    .item_right{
                        margin-right: 10px;
                        .svg_icon{
                            color: #2b8ff3;
                        }
                        span{
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
    }
</style>

