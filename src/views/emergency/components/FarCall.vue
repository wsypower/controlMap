<template>
    <div class="ychj-body">
        <div class="ychj-body-content" flex="dir:top">
            <div class="ychj-body-header" flex="cross:center main:justify">
                <div class="search-panel">
                    <a-input placeholder="搜索联系人" v-model="query.searchName">
                        <a-icon slot="prefix" type="search" />
                    </a-input>
                </div>
                <div class="search-btn-panel">
                    <span :class="{active:query.statusId==1}" @click="changeStatus('online')">在线</span>
                    <span :class="{active:query.statusId===0}" @click="changeStatus('outline')">离线</span>
                </div>
            </div>
            <div class="person-content" flex="main:center cross:center" v-if="showLoading">
                <a-spin tip="数据加载中...">

                </a-spin>
            </div>
            <div class="person-content" v-else>
                <div v-if="peopleDataList.length==0" class="none-panel" flex="main:center cross:center">
                    <img src="~@img/zanwuyuan.png" />
                </div>
                <cg-container scroll v-else>
                    <a-collapse defaultActiveKey="0" :bordered="false">
                        <a-collapse-panel v-for="(item,index) in peopleDataList" :key="index">
                            <template slot="header">
                                {{item.departmentName}} <span v-if="query.statusId==''">{{item.onlineNum}}/{{item.totalNum}}</span>
                            </template>
                            <div class="persons">
                                <a-col :span="3" v-for="(person,index) in item.peopleList" :key="index">
                                    <a-checkbox :value="person.id">
                                        <a-avatar v-if="!person.avatar" icon="user" />
                                        <a-avatar v-else src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        {{person.name}}
                                    </a-checkbox>
                                </a-col>
                            </div>
                        </a-collapse-panel>
                        <!--<a-collapse-panel key="1">-->
                            <!--<template slot="header">-->
                                <!--专业特级部门 18/20-->
                            <!--</template>-->
                            <!--<div class="persons">-->
                                    <!--<a-col :span="3"-->
                                    <!--&gt;<a-checkbox value="A"-->
                                    <!--&gt;<a-avatar icon="user" />A</a-checkbox-->
                                    <!--&gt;</a-col-->
                                    <!--&gt;-->
                                    <!--<a-col :span="3"-->
                                    <!--&gt;<a-checkbox value="B"-->
                                    <!--&gt;<a-avatar icon="user" />B</a-checkbox-->
                                    <!--&gt;</a-col-->
                                    <!--&gt;-->
                                    <!--<a-col :span="3"-->
                                    <!--&gt;<a-checkbox value="C"-->
                                    <!--&gt;<a-avatar icon="user" />C</a-checkbox-->
                                    <!--&gt;</a-col-->
                                    <!--&gt;-->
                                    <!--<a-col :span="3"-->
                                    <!--&gt;<a-checkbox value="D"-->
                                    <!--&gt;<a-avatar icon="user" />D</a-checkbox-->
                                    <!--&gt;</a-col-->
                                    <!--&gt;-->
                                    <!--<a-col :span="3"-->
                                    <!--&gt;<a-checkbox value="E"-->
                                    <!--&gt;<a-avatar icon="user" />E</a-checkbox-->
                                    <!--&gt;</a-col-->
                                    <!--&gt;-->
                                    <!--<a-col :span="3"-->
                                    <!--&gt;<a-checkbox value="E"-->
                                    <!--&gt;<a-avatar icon="user" />E</a-checkbox-->
                                    <!--&gt;</a-col-->
                                    <!--&gt;-->
                                    <!--<a-col :span="3"-->
                                    <!--&gt;<a-checkbox value="E"-->
                                    <!--&gt;<a-avatar icon="user" />E</a-checkbox-->
                                    <!--&gt;</a-col-->
                                    <!--&gt;-->
                                    <!--<a-col :span="3"-->
                                    <!--&gt;<a-checkbox value="E"-->
                                    <!--&gt;<a-avatar icon="user" />E</a-checkbox-->
                                    <!--&gt;</a-col-->
                                    <!--&gt;-->
                                    <!--<a-col :span="3"-->
                                    <!--&gt;<a-checkbox value="E"-->
                                    <!--&gt;<a-avatar icon="user" />E</a-checkbox-->
                                    <!--&gt;</a-col-->
                                    <!--&gt;-->
                                    <!--<a-col :span="3"-->
                                    <!--&gt;<a-checkbox value="E"-->
                                    <!--&gt;<a-avatar icon="user" />E</a-checkbox-->
                                    <!--&gt;</a-col-->
                                    <!--&gt;-->
                            <!--</div>-->
                        <!--</a-collapse-panel>-->
                        <!--<a-collapse-panel header="专业一级部门 20/20" key="2">-->
                            <!--<div class="persons">-->
                                <!--<div class="item">-->
                                    <!--<a-col :span="3"><a-checkbox value="A">A</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="B">B</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="C">C</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="D">D</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</a-collapse-panel>-->
                        <!--<a-collapse-panel header="专业二级部门 12/20" key="3">-->
                            <!--<div class="persons">-->
                                <!--<div class="item">-->
                                    <!--<a-col :span="3"><a-checkbox value="A">A</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="B">B</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="C">C</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="D">D</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</a-collapse-panel>-->
                        <!--<a-collapse-panel header="专业二级部门 12/20" key="4">-->
                            <!--<div class="persons">-->
                                <!--<div class="item">-->
                                    <!--<a-col :span="3"><a-checkbox value="A">A</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="B">B</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="C">C</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="D">D</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</a-collapse-panel>-->
                        <!--<a-collapse-panel header="专业二级部门 12/20" key="5">-->
                            <!--<div class="persons">-->
                                <!--<div class="item">-->
                                    <!--<a-col :span="3"><a-checkbox value="A">A</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="B">B</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="C">C</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="D">D</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</a-collapse-panel>-->
                        <!--<a-collapse-panel header="专业二级部门 12/20" key="6">-->
                            <!--<div class="persons">-->
                                <!--<div class="item">-->
                                    <!--<a-col :span="3"><a-checkbox value="A">A</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="B">B</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="C">C</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="D">D</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</a-collapse-panel>-->
                        <!--<a-collapse-panel header="专业二级部门 12/20" key="7">-->
                            <!--<div class="persons">-->
                                <!--<div class="item">-->
                                    <!--<a-col :span="3"><a-checkbox value="A">A</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="B">B</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="C">C</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="D">D</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                    <!--<a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</a-collapse-panel>-->
                    </a-collapse>
                </cg-container>
            </div>
            <div class="footer-operate">
                <a-button type="primary" @click="shipinStart" :disabled="peopleDataList.length==0">远程呼叫</a-button>
            </div>
        </div>
        <div v-show="showVideo" class="transfer_infor" :class="{ up: showAnimation, down:!showAnimation }" flex="dir:top main:center cross:center">
            <img src="~@img/shipinlianjie.png" />
            <p>远程协助视频会议开启中...</p>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapActions } from 'vuex';
    export default {
        name: 'yuanchenghujiao',
        data(){
            return {
                query:{
                    searchName: '',
                    statusId: ''
                },
                showLoading: false,
                peopleDataList:[],
                showVideo: false,
                showAnimation: false
            }
        },
        mounted(){
            this.getPeopleDataList();
        },
        methods:{
            ...mapActions('emergency/emergency', ['getAllEmergencyPeople']),
            getPeopleDataList(){
                this.showLoading = true;
                this.getAllEmergencyPeople(this.query).then((res)=>{
                    console.log('getAllEmergencyPeople',res);
                    this.peopleDataList = res.data;
                    this.showLoading = false;
                });
            },
            changeStatus(btnType){
                console.log('btnType: ' + btnType);
                if(btnType == 'online'){
                    if(this.query.statusId == 1){
                        this.query.statusId = '';
                    }
                    else{
                        this.query.statusId = 1;
                    }
                }
                if(btnType == 'outline'){
                    if(this.query.statusId === 0){
                        this.query.statusId = '';
                    }
                    else{
                        this.query.statusId = 0;
                    }
                }
                this.getPeopleDataList();
            },
            shipinStart(){
                this.showVideo = true;
                this.showAnimation = true;
                setTimeout(()=>{
                    this.showAnimation = false;
                    setTimeout(()=>{
                        this.showVideo = false;
                    },600);
                },1000)
            },
        }
    }
</script>
<style lang="scss" scoped>
    .ychj-body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .ychj-body-content {
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            .ychj-body-header {
                height: 56px;
                width: 100%;
                border-bottom: solid 1px #dddddd;
                .search-panel {
                    margin-left: 20px;
                    width: 300px;
                }
                .search-btn-panel {
                    margin-right: 20px;
                    span {
                        padding: 3px 10px;
                        border-radius: 18px;
                        font-family: PingFang-SC-Medium;
                        font-size: 14px;
                        color: #666666;
                        background-color: #f5f5f5;
                        border: solid 1px #dddddd;
                        cursor: pointer;
                        &:hover,&.active{
                            color: #ffffff;
                            background-color: #2c90f3;
                            border: solid 1px #2c90f3;
                        }
                        &:first-child{
                            margin-right: 10px;
                        }
                    }
                }
            }
            .person-content {
                height: calc(100% - 114px);
                padding: 0px 20px;
                position: relative;
                .none-panel{
                    width: 100%;
                    height: 100%;
                }
                /deep/.ant-collapse-item {
                    border-bottom-width: 0px;
                }
                /deep/.ant-col-3 {
                    margin-bottom: 8px;
                }
            }
            .footer-operate {
                height: 56px;
                line-height: 56px;
                text-align: center;
                border-top: solid 1px #dddddd;
            }
        }
        .transfer_infor {
            position: absolute;
            top: 640px;
            left: 10px;
            bottom: 10px;
            right: 10px;
            background-color: #ffffff;
            opacity: 0;
            z-index: 3;
            img {
                width: 300px;
                height: 180px;
            }
            p {
                font-family: PingFang-SC-Heavy;
                font-size: 14px;
                line-height: 70px;
                color: #444054;
            }
        }
    }
    @-webkit-keyframes upVideo {
        from {
            top: 640px;
            opacity: 0;
        }
        to {
            top: 50px;
            opacity: 1;
        }
    }

    .up {
         -webkit-animation: upVideo 0.6s;
         animation: upVideo 0.6s;
         animation-fill-mode: forwards;
     }
    @-webkit-keyframes downVideo {
        from {
            top: 50px;
            opacity: 1;
        }
        to {
            top: 640px;
            opacity: 0;
        }
    }
    .down {
        -webkit-animation: downVideo 0.6s;
        animation: downVideo 0.6s;
        animation-fill-mode: forwards;
    }
</style>

