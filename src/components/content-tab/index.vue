<template>
    <a-tabs :defaultActiveKey="defaultActiveKey" @change="changeTab" style="height: 100%" class="tab-layer">
        <a-tab-pane v-for="(item, index) in tabData" :tab="item.name" :key="index">
            <!--统计分析页面需要全局滚动条，其余页面只是页面中的一部分可能需要滚动显示，故只给统计页面增加全局滚动-->
            <cg-container scroll v-if="item.name==='统计分析'">
                <component :is="item.component"></component>
            </cg-container>
            <component v-else :is="item.component"></component>
        </a-tab-pane>
    </a-tabs>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'contentTabs',
        props:{
            tabData:{
                type: Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return {
                defaultActiveKey: 0
            }
        },
        methods: {
            changeTab(val){
                console.log('changeTab',val);
            }
        }
    }
</script>
<style lang="scss" scoped>
.tab-layer{
    height: 100%;
    /deep/.ant-tabs-bar{
        background-color: #f5f5f5;
        margin-bottom: 3px;
        padding: 0px 20px;
        .ant-tabs-nav{
            width: 100%;
            .ant-tabs-tab{
                width: 50%;
                text-align: center;
                margin: 0px;
                font-size: 18px;
            }
        }
    }
    /deep/.ant-tabs-content{
        height: calc(100% - 50px);
        .ant-tabs-tabpane{
            position: relative;
            height: 100%;
        }
    }
}
</style>
