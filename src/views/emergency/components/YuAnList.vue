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
                <a-input-search placeholder="输入关键词搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
            </div>
            <div v-if="yuAnList.length!==0" class="content_body">
                <div v-for="(item,index) in yuAnList"
                     :key="index"
                     class="item"
                     flex="dir:left cross:center main:justify">
                    <span class="title">{{item.name}}</span>
                    <span class="operate">
                        <a-icon type="edit" style="color:#2b90f3" @click="editYuAnItem(item.id)"/>
                        <i class="sep"></i>
                        <a-popconfirm title="确定删除此预案吗？" @confirm="deleteYuAnItem(item.id,index)" @cancel="cancel" okText="确定" cancelText="取消">
                            <a-icon type="delete" style="color:#2b90f3"/>
                        </a-popconfirm>
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
            onSearch(val){
               this.searchContent = val;
               this.getYuAnList();
            },
            getYuAnList(){
                this.getYuAnDataList({'searchContent':this.searchContent}).then((res)=>{
                    this.yuAnList = res;
                });
            },
            addYuAn(){
                let data = { type: 'add',id:''};
                this.$emit('operate', data);
            },
            openYuAnInfo(id){
                let data = { type: 'info',id:id};
                this.$emit('operate', data);
            },
            editYuAnItem(id){
                let data = { type: 'edit',id:id};
                this.$emit('operate', data);
            },
            deleteYuAnItem(id,index){
                this.deleteYuAn({id:id}).then((res)=>{
                    this.yuAnList.splice(index,1);
                });
            },
            cancel(){
                console.log('no delete operation');
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
                    cursor: pointer;
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
