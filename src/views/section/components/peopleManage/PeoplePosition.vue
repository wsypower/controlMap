<template>
    <div class="people-manage" flex="dir:top">
        <div class="search-panel">
            <a-input-search placeholder="输入关键词搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
        </div>
        <div class="yuan_dialog_body">
            <cg-container scroll>
                <a-tree showIcon :treeData="treeData">
                    <img slot="dept" src="~@img/avatar_dept.png"/>
                    <img slot="male" src="~@img/avatar_boy.png"/>
                    <img slot="female" src="~@img/avatar_girl.png"/>
                </a-tree>
            </cg-container>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: '',
        data(){
            return {
                checkedKeys: [],
                treeData: [{
                    title: '智慧城管',
                    key: 'chengguan',
                    slots: {
                        icon: 'dept'
                    },
                    children:[{
                        title: '信息采集中心',
                        key: 'xinxi',
                        slots: {
                            icon: 'dept'
                        },
                        children: [{
                            title: '傅建民',
                            key: '0-0-0',
                            slots: {
                                icon: 'male'
                            }
                        }, {
                            title: '董亨芳',
                            key: '0-0-1',
                            slots: {
                                icon: 'female'
                            }
                        }, {
                            title: '顾 祎',
                            key: '0-0-2',
                            slots: {
                                icon: 'male'
                            }
                        }]
                    },{
                        title: '第一中队',
                        key: 'yizhongdui',
                        slots: {
                            icon: 'dept',
                        },
                        children: [{
                            title: '郑波立',
                            key: '0-1-0',
                            slots: {
                                icon: 'male'
                            }
                        }, {
                            title: '金 涛',
                            key: '0-1-1',
                            slots: {
                                icon: 'male'
                            }
                        }, {
                            title: '周 军',
                            key: '0-1-2',
                            slots: {
                                icon: 'male'
                            }
                        }]
                    }]
                }, {
                    title: '智慧教育',
                    key: 'jiaoyu',
                    slots: {
                        icon: 'dept',
                    },
                    children:[{
                        title: '信息采集中心',
                        key: 'caiji',
                        slots: {
                            icon: 'dept',
                        },
                        children: [{
                            title: '郑 明',
                            key: '1-0-0',
                            slots: {
                                icon: 'male'
                            }
                        }, {
                            title: '俞 君',
                            key: '1-0-1',
                            slots: {
                                icon: 'male'
                            }
                        }, {
                            title: '邵群艳',
                            key: '1-0-2',
                            slots: {
                                icon: 'female'
                            }
                        }]
                    }]
                }]
            }
        },
        methods:{
            onSearch(val){

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
        }
    }
</style>
