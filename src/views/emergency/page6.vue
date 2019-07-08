<template>
    <div class="left-message">
        <div class="left-message-title">
            预案列表
        </div>
        <div class="search-panel">
            <a-input-search
                    placeholder="输入关键词搜索"
                    @search="onSearch"
                    enterButton="搜 索"
            ></a-input-search>
        </div>
        <div class="search-result">
            <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
                <a-spin tip="数据加载中...">

                </a-spin>
            </div>
            <div class="data-panel" v-else>
                <div
                        class="item"
                        :class="{active: activeIndex==index}"
                        v-for="(item, index) in dataArr"
                        :key="index"
                        flex
                        @click="clickDataItem(index)"
                >
                    <div class="item-left">
                        <pin :content="index" :isActive="activeIndex==index"></pin>
                    </div>
                    <div class="item-right" flex="dir:top">
                        <div class="top" flex="cross: center main:justify">
                            <div class="name-panel">{{ item.name }}</div>
                            <div class="flag-panel">
                <span v-if="item.level == 0" class="level-panel yanzhong"
                >等级：严重</span
                >
                                <span v-else class="level-panel yiban">等级：一般</span>
                                <span v-if="item.status == 0" class="status-panel handle"
                                >进行中</span
                                >
                                <span v-else-if="item.status == -1" class="status-panel nostart"
                                >未开始</span
                                >
                                <span v-else class="status-panel complete">已完成</span>
                            </div>
                        </div>
                        <div class="description-panel">信息：{{ item.description }}</div>
                        <div class="item-operate">
                        <span class="operate-btn" @click="editYuan(item)">
                             <cg-icon-svg name="edit" class="svg_icon_edit"></cg-icon-svg>
                            编辑
                        </span>
                            <span class="operate-btn" @click="deleteYuan(item)">
                            <cg-icon-svg name="delete" class="svg_icon_delete"></cg-icon-svg>
                            删除
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination-panel">
            <a-pagination
                    :total="totalSize"
                    :showTotal="total => `共 ${total} 条`"
                    :pageSize="4"
                    :defaultCurrent="1"
                    @change="changePagination"
            />
        </div>
    </div>
</template>

<script>
    import pin from './components/position.vue'
    import mapState from 'vuex'
    export default {
        name: 'page6',
        data(){
            return{
                showLoading: false,
                dataArr:[],
                activeIndex: null,
                totalSize: 0,
            }
        },
        components:{pin},
        computed: {
            // ...mapState('')[]
        },
        mounted(){
            // let result = {
            //     code: 0,
            //     data: [{'name':'消防安全','description':'烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火。','level': '0','status':0,'statusName':'进行中'},
            //         {'name':'消防安全','description':'烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火。','level': '1','status':-1,'statusName':'未开始'},
            //         {'name':'消防安全','description':'烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火。','level': '1','status':1,'statusName':'已完成'},
            //         {'name':'消防安全','description':'烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火烧烤店起火。','level': '1','status':1,'statusName':'已完成'}],
            //     total: 9
            // };
            // this.dataArr = result.data;
            // this.totalSize = result.total;
            this.showLoading = true;
            let data = {
                searchContent: '',
                pageNo: 1,
                pageSize: 4
            }
            this.$store.dispatch('emergency/emergency/getEmergencyYuAnDataList',data).then((res) => {
                console.log(res);
                this.dataArr = res.data;
                this.totalSize = res.total;
                this.showLoading = false;
            })
        },
        methods:{
            onSearch(val){

            },
            clickDataItem(index){
                this.activeIndex = index;
            },
            editYuan(item){
                console.log('editYuan',item);
            },
            deleteYuan(item){
                console.log('deleteYuan',item);
            },
            changePagination(pageNo,pageSize){
                console.log('changePagination',pageNo,pageSize);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .left-message {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        -webkit-box-shadow: 1px 0px 10px 0px rgba(1, 44, 104, 0.2);
        box-shadow: 1px 0px 10px 0px rgba(1, 44, 104, 0.2);
        border: solid 2px #ffffff;
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
            min-height: 480px;
            .spin-panel{
                width: 100%;
                height: 480px;
            }
            .data-panel{
                width: 100%;
                height: 100%;
                .item {
                    padding: 20px 20px 0px 20px;
                    &:hover,&.active{
                        background-color: #e9f6ff;
                    }
                    .item-left {
                        width: 25px;
                        height: 25px;
                        .icon_pin {
                            display: inline-block;
                            width: 25px;
                            height: 25px;
                            line-height: 20px;
                            text-align: center;
                            font-family: PingFang-SC-Heavy;
                            font-size: 16px;
                            color: #ffffff;
                        }
                    }
                    .item-right {
                        padding-left: 5px;
                        padding-bottom: 10px;
                        border-bottom: solid 1px #dddddd;
                        .top {
                            height: 18px;
                            width: 100%;
                            .name-panel {
                                font-family: PingFang-SC-Heavy;
                                font-size: 14px;
                                color: #333333;
                            }
                            .flag-panel {
                                .level-panel {
                                    border-radius: 7px;
                                    font-family: PingFang-SC-Medium;
                                    font-size: 12px;
                                    color: #ffffff;
                                    padding: 1px 6px;
                                    &.yanzhong {
                                        background-color: #f07171;
                                    }
                                    &.yiban {
                                        background-color: #f99f12;
                                    }
                                }
                                .status-panel {
                                    border-radius: 7px;
                                    font-family: PingFang-SC-Medium;
                                    font-size: 12px;
                                    color: #ffffff;
                                    padding: 1px 6px;
                                    margin-left: 10px;
                                    &.handle {
                                        background-color: #2b8ff3;
                                    }
                                    &.nostart {
                                        background-color: #999999;
                                    }
                                    &.complete {
                                        background-color: #50cf3f;
                                    }
                                }
                            }
                        }
                        .description-panel {
                            font-family: PingFang-SC-Medium;
                            font-size: 13px;
                            line-height: 18px;
                            color: #666666;
                            margin: 8px 0px;
                            max-height: 80px;
                        }
                        .item-operate {
                            .operate-btn {
                                display: inline-block;
                                width: 60px;
                                height: 18px;
                                line-height: 18px;
                                font-family: PingFang-SC-Medium;
                                font-size: 13px;
                                color: #2c90f3;
                                cursor: pointer;
                                .svg_icon_edit,.svg_icon_delete{
                                    width: 12px;
                                    height: 14px;
                                    color: #2c90f3;
                                }
                            }
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
</style>
