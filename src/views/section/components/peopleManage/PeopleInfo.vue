<template>
    <div class="tip-content">
        <div class="tip-header" flex="dir:left">
            <div class="info-body-left" flex="main:center cross:center">
                <img v-if="!info.online" src="~@img/avatar_default.png"/>
                <img v-if="info.online&&info.sex=='male'" src="~@img/avatar_boy.png"/>
                <img v-if="info.online&&info.sex=='female'" src="~@img/avatar_girl.png"/>
            </div>
            <div class="info-body-right">
                <div flex="dir:left cross:center">
                    <span class="name_text">{{info.name}}</span>
                    <span class="sub_text">{{info.online?'在线':'离线'}}</span>
                </div>
                <div flex="dir:left cross:center">
                    <cg-icon-svg name="telephone" class="svg_icon_telephone"></cg-icon-svg>
                    <span>{{info.phone}}</span>
                </div>
                <div flex="dir:left cross:center">
                    <cg-icon-svg name="menu-section" class="svg_icon_section"></cg-icon-svg>
                    <span>{{info.dept}}</span>
                </div>
            </div>
            <div class="close" flex="main:center cross:center" @click="closeDialog"></div>
        </div>
        <div class="tip-body">
            <div flex="dir:left cross:center main:center">
                <div class="tab_panel">
                    <span :class="{active: activeIndex===0}" @click="clickTab(0)">今日工作</span>
                    <span :class="{active: activeIndex===1}" @click="clickTab(1)">历史工作</span>
                </div>
            </div>
            <div class="data_panel" v-show="activeIndex===0" flex="dir:left cross:center main:center">
                <div><span>{{todayData.num1}}</span><span>上报数</span></div>
                <div><span>{{todayData.num2}}</span><span>核实数</span></div>
                <div><span>{{todayData.num3}}</span><span>核查数</span></div>
                <div><span>{{todayData.num4}}</span><span>废弃数</span></div>
            </div>
            <div class="data_panel" v-show="activeIndex===1" flex="dir:left cross:center main:center">
                <div><span>{{historyData.num1}}</span><span>上报数</span></div>
                <div><span>{{historyData.num2}}</span><span>核实数</span></div>
                <div><span>{{historyData.num3}}</span><span>核查数</span></div>
                <div><span>{{historyData.num4}}</span><span>废弃数</span></div>
            </div>
        </div>
        <div class="info-body-operation" @click="lookPeopleTrail">
            查看轨迹
        </div>
        <div class="tooltip__arrow"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapActions } from 'vuex'
    export default{
        name: 'peopleInfo',
        data(){
            return {
                activeIndex: 0,
                todayData: {
                    num1: 0,
                    num2: 0,
                    num3: 0,
                    num4: 0
                },
                historyData: {
                    num1: 0,
                    num2: 0,
                    num3: 0,
                    num4: 0
                }
            };
        },
        props:{
            info:{
                default(){
                    return {
                        id: '',
                        sex: '',
                        name: '',
                        phone: '',
                        dept: '',
                        online: true,
                    }
                }
            },
            closeCallBack:{
                type: Function,
                default(){
                    return null
                }
            }
        },
        watch: {
            'info.id':function(val){
                this.getUserWorkInfoData({userId:this.info.id}).then(res=>{
                    console.log('',res.data);
                    this.todayData = {
                        num1: res.data.br_sbs,
                        num2: res.data.br_hss,
                        num3: res.data.br_hcs,
                        num4: res.data.br_fqs,
                    }
                    this.historyData = {
                        num1: res.data.bh_sbs,
                        num2: res.data.bh_hss,
                        num3: res.data.bh_hcs,
                        num4: res.data.bh_fqs,
                    }
                })
            }
        },
        mounted(){},
        methods:{
            ...mapActions('section/manage', ['getUserWorkInfoData']),
            clickTab(tab){
                this.activeIndex = tab;
            },
            lookPeopleTrail(){
                this.$emit('getUserId',this.info.id);
            },
            closeDialog(){
                this.$emit('closeTip')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tip-content {
        z-index: 10;
        width: 300px;
        height: 240px;
        background-image: linear-gradient(90deg, #0065ea 0%, #00a5ff 100%);
        border-radius: 6px;
        box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.12);
        border: solid 1px #dddddd;
        .tip-header {
            height: 96px;
            width: 100%;
            padding-left: 10px;
            padding-right: 10px;
            position: relative;
            .info-body-left{
                width: 80px;
                height: 100%;
                img{
                    width: 50px;
                    height: 50px;
                }
            }
            .info-body-right{
                padding-top: 10px;
                >div{
                    font-family: PingFang-SC-Regular;
                    font-size: 13px;
                    color: #ffffff;
                    line-height: 24px;
                    .svg_icon_telephone,.svg_icon_section{
                        width: 14px;
                        height: 14px;
                        color: #ffffff;
                        margin-right: 10px;
                    }
                    .name_text{
                        font-size: 16px;
                    }
                    .sub_text{
                        margin-left: 20px;
                        font-size: 12px;
                    }
                }
            }
            .close {
                position: absolute;
                right: 0px;
                top: 0px;
                width: 24px;
                height: 24px;
                line-height: 24px;
                transition: all 0.2s;
                transform: rotate(0deg);
                transform-origin: center;
                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA4ElEQVRYR+2WUQ4CMQhEh5vozfRkejO9CaaJTYhpy8Cq7Uf3d4F5O8C2gsmPTNbHBtgOuA6o6klEnplhZXKHAKp6AXADcBWRewSCze0CFHoADyNKQxjxmn7uucg6UAu5EA3xYQ4zA7UNLkRUvBR0AUoQU5iJac0QBeBBZMVpByp5S+j9rmyK26JDDgwgbF13SD8h6BbYxIYT5XVYPNwCx4X/AHS+PtX/sANTh3C0aj9fQ0aAiUmtYaRwJLbCrHsYrXYch3f88IXE/HTmXckiV7BsbOosyIql1vCbYhtgSQdeDpKoIXzqLREAAAAASUVORK5CYII=")
                no-repeat;
                background-size: 100% 100%;
                &:hover {
                    text-decoration: none;
                    cursor: pointer;
                    transform: rotate(90deg);
                }
            }
        }
        .tip-body {
            width: 100%;
            height: calc(100% - 131px);
            overflow: hidden;
            background-color: #ffffff;
            .tab_panel{
                height: 26px;
                line-height: 26px;
                border-radius: 4px;
                border: solid 1px #2b90f3;
                margin: 10px 0px;
                overflow: hidden;
                span{
                    display:inline-block;
                    height: 100%;
                    padding: 0px 10px;
                    font-family: PingFang-SC-Heavy;
                    font-size: 13px;
                    color: #2b90f3;
                    background-color: #ffffff;
                    cursor: pointer;
                    &.active{
                        background-color: #2b90f3;
                        color: #ffffff
                    }
                }
            }
            .data_panel{
                >div{
                    width: 70px;
                    height: 50px;
                    span{
                        display: block;
                        text-align: center;
                    }
                }
            }
        }
        .info-body-operation{
            border-top: 1px dashed #dddddd;
            height: 35px;
            text-align: center;
            font-family: PingFang-SC-Medium;
            font-size: 13px;
            line-height: 35px;
            color: #2b90f3;
            background-color: #ffffff;
            cursor: pointer;
        }
        .tooltip__arrow {
            width: 50px;
            height: 25px;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            overflow: hidden;
            &::after {
                content: "";
                position: absolute;
                width: 20px;
                height: 20px;
                background: white;
                transform: translateX(-50%) translateY(-50%) rotate(45deg);
                top: 0;
                left: 50%;
                box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.12);
                /*box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.12);*/
                border: solid 1px #dddddd;
            }
        }
    }
</style>
