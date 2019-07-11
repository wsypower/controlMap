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
                <cg-container scroll v-if="dataArr.length>0" >
                    <yu-an-item v-for="(item, index) in dataArr"
                               :itemData="item"
                               :index="index"
                               :key="index"
                               :class="{active: activeIndex==index}"
                               :isActive="activeIndex==index"
                               @editYuAnItem="editYuAnItem"
                               @deleteYuAnItem="deleteYuAnItem"
                               @onClick="clickDataItem(index)">
                    </yu-an-item>
                </cg-container>
                <div v-else class="none-panel" flex="main:center cross:center">
                    <img src="~@img/zanwuyuan.png" />
                </div>
            </div>

        </div>
        <div v-if="dataArr.length>0" class="pagination-panel">
            <a-pagination
                    :total="totalSize"
                    :showTotal="total => `共 ${total} 条`"
                    :pageSize="10"
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
    import { mapState,mapActions } from 'vuex'
    import Operation from './components/Operation.vue';
    import YuAnForm from "./components/YuAnForm.vue";
    import ychj from "./components/ychj.vue";
    import YuAnItem from "./components/YuAnItem.vue";
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
            Operation,
            YuAnForm,
            ychj,
            YuAnItem
        },
        computed: {
            ...mapState('cgadmin/page', ['current'])
        },
        mounted(){
            this.showLoading = true;
            let data = {
                searchContent: '',
                status: '',
                pageNo: 1,
                pageSize: 10
            }
            this.getEmergencyYuAnDataList(data).then((res) => {
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
            ...mapActions('emergency/emergency', ['getEmergencyYuAnDataList']),
            onSearch(val){

            },
            addItemOperation(){
                this.dialogComponentId = YuAnForm;
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
                this.dialogComponentId = YuAnForm;
                this.dWidth = 810;
                this.dHeight = 450;
                this.dialogTitle = '修改预案';
                this.bodyPadding = [0,10,10,10];
                this.sourceData = {
                    type: '1',
                    level: '0',
                    time: '2019-07-11',
                    position: '华星路99号',
                    message: '这是第一条开发测试数据',
                    area: '3',
                    photo:{},
                    files:{}
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
            height: calc(100% - 200px);
            position: relative;
            .spin-panel{
                width: 100%;
                height: 480px;
            }
            .data-panel{
                width: 100%;
                height: 100%;
                .none-panel{
                    width: 100%;
                    height: 100%;
                }
            }

        }
        .pagination-panel {
            text-align: right;
            padding: 20px 20px 0px 0px;
        }
    }
</style>
