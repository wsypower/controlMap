<template>
    <div class="yuan-list" flex="dir:top">
        <div class="header" flex="dir:left cross:center main:justify">
            <span class="title">应急预案</span>
            <a-button type="primary" icon="plus" @click="addYuAn">新建预案</a-button>
        </div>
        <div class="content">
            <div v-if="yuAnList.length===0" style="padding:10px;" flex="main:center cross:center">
                <img src="~@img/zanwumuban.png" />
            </div>
            <div v-if="yuAnList.length!==0" class="search-panel">
                <a-input-search placeholder="输入应急预案名称搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
            </div>
            <div v-if="yuAnList.length!==0" class="content_body">
                <div v-for="(item,index) in yuAnList"
                     :key="index"
                     class="item"
                     flex="dir:left cross:center main:justify">
                    <span class="title">{{item.name}}</span>
                    <span class="operate">
                        <a-icon type="edit" style="color:#2b90f3;cursor: pointer;" @click="editYuAnItem(item.id)"/>
                        <i class="sep"></i>
                        <a-icon type="export" style="color:#2b90f3;cursor: pointer;" title="导出" @click="exportYuAnExcel(item.id)"/>
                        <i class="sep"></i>
                        <a-icon type="delete" style="color:#2b90f3;cursor: pointer;" @click="deleteYuAnItem(item.id,index)"/>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapActions } from 'vuex'
    export default {
        name: 'yuAnList',
        data(){
            return {
                searchContent: '',
                yuAnList: []
            }
        },
        mounted(){
            this.getYuAnList();
        },
        methods:{
            ...mapActions('emergency/yuan', ['getYuAnDataList','deleteYuAn']),
            init(){},
            //查询预案
            onSearch(val){
               this.searchContent = val;
               this.getYuAnList();
            },
            //获取所有预案数据
            getYuAnList(){
                this.getYuAnDataList({'searchContent':this.searchContent}).then((res)=>{
                    this.yuAnList = res;
                });
            },
            //新增预案
            addYuAn(){
                let data = { type: 'add',id:''};
                this.$emit('operate', data);
            },
            //展示预案信息
            openYuAnInfo(id){
                let data = { type: 'info',id:id};
                this.$emit('operate', data);
            },
            //编辑预案
            editYuAnItem(id){
                let data = { type: 'edit',id:id};
                this.$emit('operate', data);
            },
            //删除预案
            deleteYuAnItem(id,index){
                let _this = this;
                this.$confirm({
                    title: '确定删除此应急预案吗？',
                    content: '删除后不可恢复',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        _this.deleteYuAn({id:id}).then((res)=>{
                            _this.yuAnList.splice(index,1);
                        });
                    },
                    onCancel() {
                        console.log('no delete operation');
                    },
                });
            },
            //导出预案Excel，包括人员、资源、场地
            exportYuAnExcel(id){
                console.log('exportYuAnExcel',id);
                window.open('http://192.168.71.238:8015/api/emergencyplan/exportResourceExcel?id=' + id);
            }
        }

    }
</script>
<style lang="scss" scoped>
    .yuan-list{
        position:fixed;
        right: 20px;
        top:80px;
        width: 360px;
        max-height: 600px;
        .header{
            width: 100%;
            height: 50px;
            padding: 0px 20px;
            background-image: linear-gradient(90deg, #0065ea 0%, #00a5ff 100%);
            .title{
                font-family: PingFang-SC-Heavy;
                font-size: 18px;
                color: #ffffff;
            }
            button{
                border-color: #ffffff;
            }
        }
        .content{
            height: 100%;
            width: 100%;
            background-color: #ffffff;
            padding: 20px;
            .search-panel{
                padding-bottom: 10px;
            }
            .content_body{
                .item{
                    width: 100%;
                    height: 40px;
                    background-color: #f5f7f8;
                    margin-bottom: 4px;
                    padding: 0px 12px;
                    /*cursor: pointer;*/
                    &:last-child{
                        margin-bottom: 0px;
                    }
                    &:hover{
                        background-color: #e9f6ff;
                    }
                    .title{
                        font-family: PingFang-SC-Medium;
                        font-size: 14px;
                        color: #333333;
                    }
                    .operate{
                        .sep{
                            width:1px;
                            height: 12px;
                            background-color: #dddddd;
                            display:inline-block;
                            margin: 0px 8px;
                        }
                    }
                }
            }
        }
    }
</style>
