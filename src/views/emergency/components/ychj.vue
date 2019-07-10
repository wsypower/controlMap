<template>
    <div class="ychj-body">
        <div class="ychj-body-content" flex="dir:top">
            <div class="ychj-body-header" flex="cross:center main:justify">
                <div class="search-panel">
                    <a-input placeholder="搜索联系人" v-model="userName">
                        <a-icon slot="prefix" type="search" />
                    </a-input>
                </div>
                <div class="search-btn-panel">
                    <span>在线</span>
                    <span>离线</span>
                </div>
            </div>
            <div class="person-content">
                <a-collapse defaultActiveKey="1" :bordered="false">
                    <a-collapse-panel header="专业特级部门 18/20" key="1">
                        <div class="persons">
                            <div class="item">
                                <a-col :span="3"
                                ><a-checkbox value="A"
                                ><a-avatar icon="user" />A</a-checkbox
                                ></a-col
                                >
                                <a-col :span="3"
                                ><a-checkbox value="B"
                                ><a-avatar icon="user" />B</a-checkbox
                                ></a-col
                                >
                                <a-col :span="3"
                                ><a-checkbox value="C"
                                ><a-avatar icon="user" />C</a-checkbox
                                ></a-col
                                >
                                <a-col :span="3"
                                ><a-checkbox value="D"
                                ><a-avatar icon="user" />D</a-checkbox
                                ></a-col
                                >
                                <a-col :span="3"
                                ><a-checkbox value="E"
                                ><a-avatar icon="user" />E</a-checkbox
                                ></a-col
                                >
                                <a-col :span="3"
                                ><a-checkbox value="E"
                                ><a-avatar icon="user" />E</a-checkbox
                                ></a-col
                                >
                                <a-col :span="3"
                                ><a-checkbox value="E"
                                ><a-avatar icon="user" />E</a-checkbox
                                ></a-col
                                >
                                <a-col :span="3"
                                ><a-checkbox value="E"
                                ><a-avatar icon="user" />E</a-checkbox
                                ></a-col
                                >
                                <a-col :span="3"
                                ><a-checkbox value="E"
                                ><a-avatar icon="user" />E</a-checkbox
                                ></a-col
                                >
                                <a-col :span="3"
                                ><a-checkbox value="E"
                                ><a-avatar icon="user" />E</a-checkbox
                                ></a-col
                                >
                            </div>
                        </div>
                    </a-collapse-panel>
                    <a-collapse-panel header="专业一级部门 20/20" key="2">
                        <div class="persons">
                            <div class="item">
                                <a-col :span="3"><a-checkbox value="A">A</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="B">B</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="C">C</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="D">D</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                            </div>
                        </div>
                    </a-collapse-panel>
                    <a-collapse-panel header="专业二级部门 12/20" key="3">
                        <div class="persons">
                            <div class="item">
                                <a-col :span="3"><a-checkbox value="A">A</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="B">B</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="C">C</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="D">D</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                            </div>
                        </div>
                    </a-collapse-panel>
                    <a-collapse-panel header="专业二级部门 12/20" key="4">
                        <div class="persons">
                            <div class="item">
                                <a-col :span="3"><a-checkbox value="A">A</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="B">B</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="C">C</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="D">D</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                            </div>
                        </div>
                    </a-collapse-panel>
                    <a-collapse-panel header="专业二级部门 12/20" key="5">
                        <div class="persons">
                            <div class="item">
                                <a-col :span="3"><a-checkbox value="A">A</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="B">B</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="C">C</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="D">D</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                            </div>
                        </div>
                    </a-collapse-panel>
                    <a-collapse-panel header="专业二级部门 12/20" key="6">
                        <div class="persons">
                            <div class="item">
                                <a-col :span="3"><a-checkbox value="A">A</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="B">B</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="C">C</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="D">D</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                            </div>
                        </div>
                    </a-collapse-panel>
                    <a-collapse-panel header="专业二级部门 12/20" key="7">
                        <div class="persons">
                            <div class="item">
                                <a-col :span="3"><a-checkbox value="A">A</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="B">B</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="C">C</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="D">D</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                                <a-col :span="3"><a-checkbox value="E">E</a-checkbox></a-col>
                            </div>
                        </div>
                    </a-collapse-panel>
                </a-collapse>
            </div>
            <div class="footer-operate">
                <a-button type="primary" @click="shipinStart">远程呼叫</a-button>
            </div>
        </div>
        <div v-show="showVideo" class="transfer_infor" :class="{ up: showAnimation, down:!showAnimation }" flex="dir:top main:center cross:center">
            <img src="~@img/shipinlianjie.png" />
            <p>远程协助视频会议开启中...</p>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'yuanchenghujiao',
        data(){
            return {
                userName: '',
                showVideo: false,
                showAnimation: false
            }
        },
        methods:{
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
                        &:nth-child(1) {
                            color: #ffffff;
                            background-color: #2c90f3;
                            margin-right: 10px;
                        }
                        &:nth-child(2) {
                            color: #666666;
                            background-color: #f5f5f5;
                            border: solid 1px #dddddd;
                        }
                    }
                }
            }
            .person-content {
                flex: 1;
                padding: 0px 20px;
                overflow-y: auto;
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
<style lang="scss">
    .person-content {
        .ant-collapse-item {
            border-bottom-width: 0px;
        }
        .ant-col-3 {
            margin-bottom: 8px;
        }
    }
</style>
