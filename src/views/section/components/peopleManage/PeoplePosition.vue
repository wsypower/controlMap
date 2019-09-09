<template>
    <div class="people-manage" flex="dir:top">
        <div class="search-panel">
            <a-input-search placeholder="输入关键词搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
        </div>
        <div class="yuan_dialog_body">
            <cg-container scroll>
                <a-tree showIcon showLine :treeData="treeData" @select="onSelect">
                    <img slot="dept" src="~@img/avatar_dept.png"/>
                    <img slot="male" src="~@img/avatar-male.png"/>
                    <img slot="male-outline" src="~@img/avatar-male-outline.png"/>
                    <img slot="female" src="~@img/avatar-female.png"/>
                    <img slot="female-outline" src="~@img/avatar-female-outline.png"/>
                </a-tree>
            </cg-container>
        </div>
        <people-info ref="peopleInfo" style="position:fixed; top: 100px;right:100px;display:none" :info="peopleInfoData" @closeTip="closeTip"></people-info>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapActions } from 'vuex'
    import PeopleInfo from './PeopleInfo.vue';
    export default {
        name: '',
        components:{
            PeopleInfo
        },
        data(){
            return {
                sourceData: [],
                peopleInfoData:{
                    id: 'sdjfjdgfjsdgfjsd',
                    sex: 'female',
                    name: '沈芳',
                    tel: '13525165428',
                    dept: '信息采集中心',
                    online: true,
                    todayData: {
                        num1: 14,
                        num2: 10,
                        num3: 9,
                        num4: 0
                    },
                    historyData: {
                        num1: 159,
                        num2: 137,
                        num3: 162,
                        num4: 24
                    }
                }
            }
        },
        computed:{
           treeData:function(){
               let data = JSON.parse(JSON.stringify(this.sourceData));
               this.changeTreeData(data);
               return data
           }
        },
        mounted(){
            this.getAllPeopleTreeData().then(res=>{
                this.sourceData = res.data;
            });
            // console.log('this.sourceData',JSON.stringify(this.sourceData));
        },
        methods:{
            ...mapActions('section/common', ['getAllPeopleTreeData']),
            onSearch(val){

            },
            changeTreeData(arr){
                arr.forEach(item=>{
                    item.title = item.name;
                    if(item.isLeaf){
                        item.key = item.id;
                        if(item.sex=='female'){
                            if(item.online){
                                item.slots = {icon: 'female'}
                            }
                            else{
                                item.slots = {icon: 'female-outline'}
                            }
                        }
                        else{
                            if(item.online){
                                item.slots = {icon: 'male'}
                            }
                            else{
                                item.slots = {icon: 'male-outline'}
                            }
                        }
                        item.class = 'itemClass';
                    }
                    else{
                        item.key = 'dept_' + item.id;
                        item.slots = {icon: 'dept'}
                        this.changeTreeData(item.children)
                    }

                })
            },
            onSelect(selectedKeys, e){
                console.log(selectedKeys, e);
                if(selectedKeys[0].indexOf('dept_')<0){
                    this.$refs.peopleInfo.$el.style.display = 'block';
                }
            },
            closeTip(){
                console.log('closeTip');
            }
        }
    }
</script>
<style lang="scss" scoped>
    .people-manage{
        height: 100%;
        width: 100%;
        .search-panel {
            padding: 20px 0px;
        }
        .yuan_dialog_body {
            background-color: #f5f5f5;
            height: calc(100% - 70px);
            position:relative;
            img {
                width: 20px;
                height: 20px;
                display: inline-block;
                border-radius: 12px;
                margin-right: 8px;
            }
            /deep/.ant-tree.ant-tree-show-line li:not(:last-child):before{
                border-left: 1px dashed rgba(0,164,254,0.8);
            }
            /deep/.ant-tree.ant-tree-show-line li span.ant-tree-switcher{
                background-color: #f5f5f5;
                color: rgba(43,144,243,0.8);
            }
            /deep/.itemClass{
                &::before{
                    opacity: 0;
                }
                span.ant-tree-switcher{
                    opacity: 0;
                }
            }
        }
    }
</style>
