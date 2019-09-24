<template>
    <div class="info-body" flex="dir:left main:justify">
        <div class="info-body-left">
            <img v-if="JSON.parse(info.imageStr)[0]" :src="JSON.parse(info.imageStr)[0].newPath" />
            <img v-else src="~@img/zanwutupian.png"/>
        </div>
        <div class="info-body-right">
            <div flex="dir:left" class="text-panel"><span>位置：</span><span>{{info.position}}</span></div>
            <div flex="dir:left" class="text-panel"><span>等级：</span><span class="level" :class="{yiban: info.levelId==='01'}">{{info.levelName}}</span></div>
            <div flex="dir:left" class="text-panel"><span>详情：</span><span>{{info.description}}</span></div>
            <div flex="dir:left" class="file-panel">
                <span>附件：</span>
                <span v-for="(file,index) in JSON.parse(info.fileStr)"
                          :key="index"
                          class="file"
                          :title="file.oldName"
                          @click="downloadFile(file.newPath)">{{file.oldName}}</span>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapActions } from 'vuex';
    export default {
        name: 'yuanInfo',
        props:{
            info:{
                type:Object,
                default(){
                    return {
                        imageStr: [],
                        fileStr: []
                    }
                }
            }
        },
        data(){
            return {
            }
        },
        mounted(){

        },
        methods:{
            init(){

            },
            downloadFile(fileUrl){
                window.open(fileUrl);
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
        padding: 20px;
        .info-body-left{
            width: 180px;
            height: 120px;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .info-body-right{
            /*width: 250px;*/
            padding-left: 10px;
            div.text-panel{
                font-family: PingFang-SC-Regular;
                font-size: 13px;
                color: #333333;
                line-height: 20px;
                >span:first-child{
                    width: 40px;
                    display:inline-block;
                }
                >span:last-child{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                    max-width: 205px;
                    &.level{
                        color: #f07171;
                        &.yiban{
                            color: #f99f12;
                        }
                    }
                }
            }
            .file-panel{
                font-family: PingFang-SC-Regular;
                font-size: 13px;
                color: #333333;
                line-height: 20px;
                >span:first-child{
                    width: 40px;
                    display:inline-block;
                }
                span.file{
                    display: inline-block;
                    width: 100px;
                    height: 30px;
                    padding: 0px 15px;
                    margin-right: 10px;
                    background-color: rgba(43,144,243,.2);
                    border-radius: 4px;
                    font-family: PingFang-SC-Medium;
                    font-size: 13px;
                    line-height: 30px;
                    color: #2b90f3;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    cursor: pointer;
                    &:last-child{
                        margin-right: 0px;
                    }
                    &:hover{
                        background-color: rgba(43,144,243,.6);
                        color: #ffffff;
                    }
                }
            }
        }
    }
</style>

