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
                <a-spin tip="数据加载中..."></a-spin>
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
            <!--<div @click="clickTip">测试点击</div>-->
            <a-pagination
                    :total="totalSize"
                    :showTotal="total => `共 ${total} 条`"
                    :pageSize="10"
                    :defaultCurrent="1"
                    @change="changePagination"
            />
        </div>
        <operation ref="Operate" :class="{position:addPositionClass}" :isActiveOperation="isActiveOperation" @addItem="addItemOperation" @ychjOperate="ychjOperation"></operation>
        <custom-dialog
                :visible.sync="dialogVisible"
                :dWidth="dWidth"
                :dHeight="dHeight"
                :dialogTitle="dialogTitle"
                :bodyPadding="bodyPadding"
                :componentId="dialogComponentId"
                :sourceData="sourceData"
                :closeCallBack="getDataList"
        >
        </custom-dialog>
        <tip-modal
                :visible.sync="yuAnTipVisible"
                :positionX="positionX"
                :positionY="positionY"
                :title="modalTitle"
                :timeStr="timeStr"
                :componentId="tipComponentId"
                :info="sourceData"
        ></tip-modal>
    </div>
</template>

<script>
    import { mapState,mapActions } from 'vuex'
    import Operation from './components/Operation.vue';
    import YuAnForm from "./components/YuAnForm.vue";
    import FarCall from "./components/FarCall.vue";
    import YuAnItem from "./components/YuAnItem.vue";
    import YuAnInfo from "./components/YuAnInfo.vue";
    export default {
        name: 'page6',
        data(){
            return{
                //
                addPositionClass: false,
                //查询条件
                query:{
                    searchContent: '',  //搜索关键字
                    status: '',   //状态，‘’代表全部
                    pageNo: 1,    //当前页码
                    pageSize: 10  //当前页条数
                },
                //数据查询中
                showLoading: false,
                //数据存放处
                dataArr:[],
                //预案总数
                totalSize: 0,
                //目前激活的预案序号
                activeIndex: null,
                //操作区是否展示
                isActiveOperation: false,
                //新增预案弹窗是否隐藏
                showAddYuAnDialog: false,
                //dialog弹窗是否渲染
                dialogVisible: false,
                //dialog弹窗宽度
                dWidth: 0,
                //dialog弹窗高度
                dHeight: 0,
                //dialog弹窗标题
                dialogTitle: '新增预案',
                //dialog弹窗body内边距设置
                bodyPadding: [0,10,10,10],
                //dialog弹窗body内组件
                dialogComponentId: {},
                //dialog弹窗body内组件需要使用的数据
                sourceData: {},
                //tipModal弹窗是否渲染
                yuAnTipVisible: false,
                //tipModal弹窗显示位置X
                positionX: 0,
                //tipModal弹窗显示位置Y
                positionY: 0,
                //tipModal弹窗标题
                modalTitle: '',
                //tipModal弹窗标题上的时间
                timeStr: '',
                //tipModal弹窗body内组件
                tipComponentId: {}
            }
        },
        components:{
            Operation,
            YuAnForm,
            FarCall,
            YuAnItem,
            YuAnInfo
        },
        computed: {
            ...mapState('cgadmin/menu', ['aside', 'asideCollapse']),
            ...mapState('cgadmin/page', ['current'])
        },
        watch:{
            asideCollapse: function(val){
                console.log('asideCollapse 777777',val);
                this.isActiveOperation = false;
                //true:展开，false:关闭
                if(val){
                    setTimeout(()=>{
                        this.addPositionClass = !val;
                        this.isActiveOperation = true;
                    },300);
                }
                else{
                    this.addPositionClass = !val;
                    setTimeout(()=>{
                        this.isActiveOperation = true;
                    },300);
                }
            }
        },
        mounted(){
            this.getDataList();
            this.isActiveOperation = true;
        },
        beforeDestroy(){
        },
        methods:{
            ...mapActions('emergency/emergency', ['getEmergencyYuAnDataList','deleteEmergencyYuAn']),
            //获取预案数据
            getDataList(){
                this.showLoading = true;
                this.getEmergencyYuAnDataList(this.query).then((res) => {
                    console.log('res',res);
                    this.dataArr = res.list;
                    this.totalSize = res.total;
                    this.showLoading = false;
                })
            },
            //搜索关键字查询
            onSearch(val){
                this.query.searchContent = val;
                this.getDataList();
            },
            //翻页
            changePagination(pageNo,pageSize){
                console.log('changePagination',pageNo,pageSize);
                this.query.pageNo = pageNo;
                this.getDataList();
            },
            //增加预案
            addItemOperation(){
                this.dialogComponentId = YuAnForm;
                this.dWidth = 810;
                this.dHeight = 450;
                this.dialogTitle = '新增预案';
                this.bodyPadding = [0,10,10,10];
                this.sourceData = {};
                this.dialogVisible = true;
            },
            //编辑预案
            editYuAnItem(item){
                console.log('editYuan item',item);
                this.dialogComponentId = YuAnForm;
                this.dWidth = 810;
                this.dHeight = 450;
                this.dialogTitle = '修改预案';
                this.bodyPadding = [0,10,10,10];
                this.sourceData = item;
                this.dialogVisible = true;
            },
            //删除预案
            deleteYuAnItem(item){
                console.log('deleteYuan',item);
                let data = {id:item.id};
                let _this = this;
                this.deleteEmergencyYuAn(data).then((res) => {
                    console.log(res);
                    // if(res.code == 0){
                        _this.getDataList();
                    // }
                })
            },
            //选择某个预案
            clickDataItem(index){
                console.log('clickDataItem',index)
                this.activeIndex = index;
                console.log('this.activeIndex',this.activeIndex);
            },
            clickTip(e){
                this.positionX = e.clientX;
                this.positionY = e.clientY;
                this.modalTitle = '消防火灾';
                this.timeStr = '2019-07-12';
                this.tipComponentId = YuAnInfo;
                this.yuAnTipVisible = true;
            },
            //远程呼叫
            ychjOperation(){
                this.dialogComponentId = FarCall;
                this.dWidth = 1200;
                this.dHeight = 644;
                this.dialogTitle = '远程呼叫';
                this.bodyPadding = [0,10,10,10];
                this.dialogVisible = true;
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
        .position{
            left: 380px;
            top: 20px;
        }
    }
</style>
