<template>
    <div class="info-body" flex="dir:left main:justify">
        <div class="info-body-left">
            <img :src="info.photoUrl" />
        </div>
        <div class="info-body-right">
            <div flex="dir:left"><span>位置：</span><span>{{info.position}}</span></div>
            <div flex="dir:left"><span>等级：</span><span class="level" :class="{yiban: info.levelId==1}">{{info.levelName}}</span></div>
            <div flex="dir:left"><span>详情：</span><span>{{info.description}}</span></div>
            <p flex="dir:left"><span>附件：</span><span v-for="(file,index) in info.fileList"
                          :key="index"
                          class="file">{{file.basefile.oldName}}</span></p>
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
                    return {}
                }
            }
        },
        data(){
            return {
                info:{
                    photoUrl: 'http://192.168.71.33:50000//upload/file/2019/07/12/20190712090917893.png',
                    position: '杭州市西湖区翠园创意园区17号楼，发生A级火灾，西湖区消防大队前往创意园区消灭火灾，于XXXXX',
                    levelId: 1,
                    levelName: '一般',
                    description:'杭州市西湖区翠园创意园区17号楼，发生A级火灾，西湖区消防大队前往创意园区消灭火灾，于XXXXX',
                    fileList:[{
                        basefile:{
                            oldName: 'xhsdhdjdk.xml'
                        }
                    },{
                        basefile:{
                            oldName: 'shxjskalhd.xml'
                        }
                    }]
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
            width: 250px;
            >div{
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
                    width: 205px;
                    &.level{
                        color: #f07171;
                        &.yiban{
                            color: #f99f12;
                        }
                    }
                }
            }
            >p{
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
                    &:last-child{
                        margin-right: 0px;
                    }
                }
            }
        }
    }
</style>

