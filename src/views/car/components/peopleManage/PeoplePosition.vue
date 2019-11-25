<template>
    <div class="people-manage" flex="dir:top">
        <div class="search-panel">
            <a-input-search placeholder="输入关键词搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
        </div>
        <div class="yuan_dialog_body">
            <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
                <a-spin tip="数据加载中..."></a-spin>
            </div>
            <cg-container scroll v-if="!showLoading&&treeData.length>0">
                <a-tree class="tree-panel" showIcon showLine :treeData="treeData" @select="onSelect">
                    <img slot="dept" src="~@img/avatar_dept.png"/>
                    <img slot="male" src="~@img/avatar-male.png"/>
                    <img slot="male-outline" src="~@img/avatar-male-outline.png"/>
                    <img slot="female" src="~@img/avatar-female.png"/>
                    <img slot="female-outline" src="~@img/avatar-female-outline.png"/>
                </a-tree>
            </cg-container>
            <div v-if="!showLoading&&treeData.length==0" class="nodata-panel" flex="main:center cross:center">
                <img src="~@img/zanwudata.png" />
            </div>
        </div>
        <people-info ref="peopleInfo"
                     style="position:fixed; top: 100px;right:100px;display:none"
                     :info="peopleInfoData"
                     @closeTip="closeTip"
                     @getUserId="getUserId"></people-info>
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
                showLoading: false,
                sourceData: [],
                peopleInfoData: {}
            }
        },
        computed:{
            //获得展示的数据与属性
           treeData:function(){
               let data = JSON.parse(JSON.stringify(this.sourceData));
               this.changeTreeData(data);
               return data
           }
        },
        mounted(){
            this.showLoading = true;
            this.getAllPeopleTreeData().then(res=>{
                this.sourceData = res.data;
                this.showLoading = false;
            });
            // console.log('this.sourceData',JSON.stringify(this.sourceData));
        },
        methods:{
            ...mapActions('section/common', ['getAllPeopleTreeData']),
            onSearch(val){
                this.showLoading = true;
                this.getAllPeopleTreeData({searchContent: val}).then(res=>{
                    this.sourceData = res.data;
                    this.showLoading = false;
                });
            },
            //给后端的数据增加一些前端展示与判断需要的属性
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
            //点击树中某个节点（某个人员）时触发
            onSelect(selectedKeys, e){
                console.log(selectedKeys, e);
                if(selectedKeys.length===0){
                    this.$refs.peopleInfo.$el.style.display = 'none';
                }
                else if(selectedKeys[0].indexOf('dept_')<0){
                    this.getUserInfoById(this.sourceData,selectedKeys[0],'')
                    console.log('userInfo', this.peopleInfoData);
                    this.$refs.peopleInfo.$el.style.display = 'block';
                }

            },
            //获取父节点的一些关键信息存放入peopleInfoData，给peopleInfo使用
            getUserInfoById(arr,id,dept){
                for(let i=0;i<arr.length;i++){
                    if(arr[i].isLeaf){
                        if(arr[i].id == id){
                            arr[i].dept = dept;
                            this.peopleInfoData = arr[i];
                        }
                    }
                    else{
                        this.getUserInfoById(arr[i].children,id,arr[i].name);
                    }
                }
            },
            //人员轨迹触发
            getUserId(data){
                this.$emit('getUserId',data);
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
            .tree-panel{
                width: 100%;
                height: 100%;
                padding: 10px;
                img {
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    border-radius: 12px;
                    margin-right: 8px;
                }
            }
            .nodata-panel,.spin-panel{
                width: 100%;
                height: 100%;
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
