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
                <yuan-item v-for="(item, index) in dataArr"
                           :itemData="item"
                           :index="index"
                           :key="index"
                           :class="{active: activeIndex==index}"
                           :isActive="activeIndex==index"
                           @editYuAnItem="editYuAnItem"
                           @deleteYuAnItem="deleteYuAnItem"
                           @onClick="clickDataItem(index)">
                </yuan-item>
                <!--<div-->
                        <!--class="item"-->
                        <!--:class="{active: activeIndex==index}"-->
                        <!--v-for="(item, index) in dataArr"-->
                        <!--:key="index"-->
                        <!--flex-->
                        <!--@click="clickDataItem(index)"-->
                <!--&gt;-->
                    <!--<div class="item-left">-->
                        <!--<pin :content="index" :isActive="activeIndex==index"></pin>-->
                    <!--</div>-->
                    <!--<div class="item-right" flex="dir:top">-->
                        <!--<div class="top" flex="cross: center main:justify">-->
                            <!--<div class="name-panel">{{ item.name }}</div>-->
                            <!--<div class="flag-panel">-->
                <!--<span v-if="item.level == 0" class="level-panel yanzhong"-->
                <!--&gt;等级：严重</span-->
                <!--&gt;-->
                                <!--<span v-else class="level-panel yiban">等级：一般</span>-->
                                <!--<span v-if="item.status == 0" class="status-panel handle"-->
                                <!--&gt;进行中</span-->
                                <!--&gt;-->
                                <!--<span v-else-if="item.status == -1" class="status-panel nostart"-->
                                <!--&gt;未开始</span-->
                                <!--&gt;-->
                                <!--<span v-else class="status-panel complete">已完成</span>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="description-panel">信息：{{ item.description }}</div>-->
                        <!--<div class="item-operate">-->
                        <!--<span class="operate-btn" @click="editYuan(item)">-->
                             <!--<cg-icon-svg name="edit" class="svg_icon_edit"></cg-icon-svg>-->
                            <!--编辑-->
                        <!--</span>-->
                            <!--<span class="operate-btn" @click="deleteYuan(item)">-->
                            <!--<cg-icon-svg name="delete" class="svg_icon_delete"></cg-icon-svg>-->
                            <!--删除-->
                        <!--</span>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
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
        <operation :isActiveOperation.sync="isActiveOperation" @addItem="addItemOperation" @ychjOperate="ychjOperation"></operation>
        <custom-dialog
                :visible.sync="dialogVisible"
                :dWidth="dWidth"
                :dHeight="dHeight"
                :dialogTitle="dialogTitle"
                :bodyPadding="bodyPadding"
                :componentId="dialogComponentId"
                :sourceData="sourceData"
        >
        </custom-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import pin from './components/position.vue';
    import operation from './components/operation.vue';
    import yuanForm from "./components/yuanForm.vue";
    import ychj from "./components/ychj.vue";
    import yuanItem from "./components/yuanItem.vue";
    export default {
        name: 'page6',
        data(){
            return{
                showLoading: false,
                dataArr:[],
                activeIndex: null,
                totalSize: 0,
                isActiveOperation: false,
                dialogVisible: false,
                dWidth: 0,
                dHeight: 0,
                dialogTitle: '新增预案',
                bodyPadding: [0,10,10,10],
                dialogComponentId: {},
                sourceData: {}
            }
        },
        components:{
            pin,
            operation,
            yuanForm,
            ychj,
            yuanItem
        },
        computed: {
            ...mapState('cgadmin/page', ['current']),
            isActive:function(){
                return
            }
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
                this.isActiveOperation = true;
            })
        },
        beforeDestroy(){
            console.log('beforeDestroy',this.isActiveOperation);
            this.isActiveOperation = false;
        },
        methods:{
            onSearch(val){

            },
            addItemOperation(){
                this.dialogComponentId = yuanForm;
                this.dWidth = 810;
                this.dHeight = 450;
                this.dialogTitle = '新增预案';
                this.bodyPadding = [0,10,10,10];
                this.sourceData = {};
                this.dialogVisible = true;
            },
            ychjOperation(){
                this.dialogComponentId = ychj;
                this.dWidth = 1200;
                this.dHeight = 644;
                this.dialogTitle = '远程呼叫';
                this.bodyPadding = [0,10,10,10];
                this.dialogVisible = true;
            },
            clickDataItem(index){
                console.log(1)
                this.activeIndex = index;
                console.log('this.activeIndex',this.activeIndex);
            },
            editYuAnItem(item){
                console.log('editYuan item',item);
                this.dialogComponentId = yuanForm;
                this.dWidth = 810;
                this.dHeight = 450;
                this.dialogTitle = '修改预案';
                this.bodyPadding = [0,10,10,10];
                this.sourceData = {
                    data1: 'female',
                    data2: 1423,
                    data3: '2019-07-05'
                };
                this.dialogVisible = true;
            },
            deleteYuAnItem(item){
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
            min-height: 480px;
            .spin-panel{
                width: 100%;
                height: 480px;
            }
            .data-panel{
                width: 100%;
                height: 100%;
            }

        }
        .pagination-panel {
            text-align: right;
            padding: 20px 20px 0px 0px;
        }
    }
</style>
