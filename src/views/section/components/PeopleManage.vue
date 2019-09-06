<template>
    <div class="manage">
        <a-tabs v-model="activeTab" @change="changeTab" class="content_tab">
            <a-tab-pane tab="人员定位" key="1">
                <people-position></people-position>
            </a-tab-pane>
            <a-tab-pane tab="轨迹查询" key="2">
                <people-trail></people-trail>
            </a-tab-pane>
            <a-tab-pane tab="违规查询" key="3">
                <violate-rules></violate-rules>
            </a-tab-pane>
            <a-tab-pane tab="签到-签退" key="4">
                <people-work-time></people-work-time>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script type="text/ecmascript-6">
    import PeoplePosition from './peopleManage/PeoplePosition'
    import PeopleTrail from './peopleManage/PeopleTrail'
    import ViolateRules from './peopleManage/ViolateRules'
    import PeopleWorkTime from './peopleManage/PeopleWorkTime'
    export default {
        name: 'peopleManage',
        data(){
            return {
                activeTab: '1'
            }
        },
        components:{
            PeoplePosition,
            PeopleTrail,
            ViolateRules,
            PeopleWorkTime
        },
        methods:{
            init(){},
            changeTab(){

            }
        }
    }
</script>
<style lang="scss" scoped>
    .manage{
        width: 100%;
        padding: 20px;
        height: 100%;
    }
    .content_tab{
        height:100%;
        /deep/.ant-tabs-nav-scroll{
            height:44px;
        }
        /deep/.ant-tabs-nav {
            border: 1px solid #dddddd;
            .ant-tabs-tab{
                padding: 10px;
                font-size: 14px !important;
                color: #333333;
                border-right: solid 1px #dddddd;
                &:last-child{
                    border-right: unset;
                }
            }
            .ant-tabs-tab-active{
                background-color: #ffffff;
            }
            .ant-tabs-ink-bar{
                top:0px;
            }
        }
        /deep/.ant-tabs-bar{
            background-color: #f5f7f8 !important;
            margin-bottom: 0px !important;
            padding: 0px !important;
            .ant-tabs-nav{
                width: 100%;
                .ant-tabs-tab{
                    width: 25% !important;
                    text-align: center;
                    margin: 0px;
                }
            }
        }
        /deep/.ant-tabs-content{
            height: calc(100% - 45px) !important;
            .ant-tabs-tabpane{
                position: relative;
                height: 100%;
            }
        }
    }
</style>
