<template>
    <div class="yuan-list" flex="dir:top">
        <div class="header" flex="dir:left cross:center main:justify">
            <span class="title">应急预案</span>
            <a-button type="primary" icon="plus" @click="addYuAn">新建预案</a-button>
        </div>
        <div class="content">
            <div class="search-panel">
                <a-input-search placeholder="输入关键词搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
            </div>
            <div class="content_body">
                <div v-for="(item,index) in yuAnList"
                     :key="index"
                     class="item"
                     flex="dir:left cross:center main:justify"
                     @click="openYuAnInfo(item.id)">
                    <span class="title">{{item.name}}</span>
                    <span class="operate">
                        <a-icon type="edit" style="color:#2b90f3" @click="editYuAn(item.id)"/>
                        <i class="sep"></i>
                        <a-icon type="delete" style="color:#2b90f3" @click="deleteYuAn(item.id)"/>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
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
            init(){},
            onSearch(val){
               this.searchContent = val;
               this.getYuAnList();
            },
            getYuAnList(){
                this.yuAnList = [{'id':'aaa','name':'防台风预案'},
                    {'id':'bbb','name':'防旱预案'},
                    {'id':'ccc','name':'防汛预案'},
                    {'id':'ddd','name':'领导视察'},
                    {'id':'eee','name':'城管突发事件'}]
            },
            addYuAn(){
                let data = { type: 'add',id:''};
                this.$emit('operate', data);
            },
            openYuAnInfo(id){
                let data = { type: 'info',id:id};
                this.$emit('operate', data);
            },
            editYuAn(id){
                let data = { type: 'edit',id:id};
                this.$emit('operate', data);
            },
            deleteYuAn(id){

            },

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
