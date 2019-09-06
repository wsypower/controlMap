<template>
    <a-tabs :defaultActiveKey="defaultActiveKey" @change="changeTab" style="height: 100%" class="tab-layer">
        <a-tab-pane v-for="(item, index) in tabData" :tab="item.name" :key="index">
            <cg-container scroll v-if="item.name==='统计分析'">
                <component :is="item.component"></component>
            </cg-container>
            <component v-else :is="item.component"></component>
        </a-tab-pane>
        <!--<div style="position:absolute;left:50%;top:10px;height: 15px;border-right: 1px solid #dddddd"></div>-->
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
    /*/deep/.cg-container-full-bs__body-wrapper-inner{*/
        /*height:100%;*/
    /*}*/
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
