<template>
    <div class="info-body" >
        <div class="info-body-content" flex="dir:left main:justify">
            <div class="info-body-left">
                <img v-if="info.photoUrl" :src="info.photoUrl"/>
                <img v-else src="~@img/avatar_boy.png"/>
            </div>
            <div class="info-body-right">
                <div flex="dir:left">
                    <cg-icon-svg name="telephone" class="svg_icon_telephone"></cg-icon-svg>
                    <span>{{info.phone}}</span>
                </div>
                <div flex="dir:left">
                    <cg-icon-svg name="menu-section" class="svg_icon_section"></cg-icon-svg>
                    <span>{{info.dept}}</span>
                </div>
            </div>
        </div>
        <div class="info-body-operation">
            查看轨迹
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapActions } from 'vuex';
    export default {
        name: 'yuanInfo',
        props:{
            info1:{
                type:Object,
                default(){
                    return {

                    }
                }
            }
        },
        data(){
            return {
                info:{
                    phone: '14253245126',
                    dept: '信息采集中心'
                }
            }
        },
        mounted(){

        },
        methods:{
            init(){

            }
        }
    }
</script>
<style lang="scss" scoped>
    .info-body {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        overflow: hidden;
        .info-body-content{
            .info-body-left{
                width: 50px;
                height: 50px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .info-body-right{
                width: 250px;
                >div{
                    font-family: PingFang-SC-Regular;
                    font-size: 13px;
                    color: #333333;
                    line-height: 20px;
                    .svg_icon_telephone,.svg_icon_section{
                        width: 14px;
                        height: 14px;
                        color: #00a5ff;
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
        }
    }
</style>

