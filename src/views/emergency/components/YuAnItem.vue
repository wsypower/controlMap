<template>
    <div class="item" flex @click="clickDataItem">
        <div class="item-left">
            <pin :content="index" :isActive="isActive"></pin>
        </div>
        <div class="item-right" flex="dir:top">
            <div class="top" flex="cross: center main:justify">
                <div class="name-panel">{{ itemData.typeName }}</div>
                <div class="flag-panel">
                    <span class="level-panel"
                        :class="{yanzhong:itemData.levelId == 0,yiban:itemData.levelId == 1}">等级：{{itemData.levelName}}</span>
                    <span class="status-panel"
                        :class="{nostart:itemData.statusId == 0,handle:itemData.statusId == 1,complete:itemData.statusId == 2}">{{itemData.statusName}}</span>
                </div>
            </div>
            <div class="description-panel">信息：{{ itemData.description }}</div>
            <div class="item-operate">
                <span class="operate-btn" @click.stop="editYuan(itemData)">
                    <cg-icon-svg name="edit" class="svg_icon_edit"></cg-icon-svg>编辑
                </span>
                <span class="operate-btn" @click.stop="deleteYuan(itemData)">
                    <cg-icon-svg name="delete" class="svg_icon_delete"></cg-icon-svg>删除
                </span>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Pin from './Position.vue';
    export default {
        name: 'yuAnItem',
        props:{
            //序号
            index:{
                type:Number,
                default: null
            },
            //展示数据
            itemData:{
                type: Object,
                default(){
                    return {

                    }
                }
            },
            //是否激活
            isActive:{
                type: Boolean,
                default: false
            }
        },
        data(){
            return{

            }
        },
        components:{
            Pin
        },
        methods:{
            editYuan(item){
                this.$emit('editYuAnItem',item);
            },
            deleteYuan(item){
                this.$emit('deleteYuAnItem',item);
            },
            clickDataItem(){
                this.$emit('onClick');
            }
        }
    }
</script>
<style lang="scss" scoped>
    .item {
        padding: 20px 20px 0px 20px;
        &:hover,&.active{
            background-color: #e9f6ff;
        }
        .item-left {
            width: 25px;
            height: 25px;
            .icon_pin {
                display: inline-block;
                width: 25px;
                height: 25px;
                line-height: 20px;
                text-align: center;
                font-family: PingFang-SC-Heavy;
                font-size: 16px;
                color: #ffffff;
            }
        }
        .item-right {
            width: 100%;
            padding-left: 5px;
            padding-bottom: 10px;
            border-bottom: solid 1px #dddddd;
            .top {
                height: 18px;
                width: 100%;
                .name-panel {
                    font-family: PingFang-SC-Heavy;
                    font-size: 14px;
                    color: #333333;
                }
                .flag-panel {
                    .level-panel {
                        border-radius: 7px;
                        font-family: PingFang-SC-Medium;
                        font-size: 12px;
                        color: #ffffff;
                        padding: 1px 6px;
                        &.yanzhong {
                            background-color: #f07171;
                        }
                        &.yiban {
                            background-color: #f99f12;
                        }
                    }
                    .status-panel {
                        border-radius: 7px;
                        font-family: PingFang-SC-Medium;
                        font-size: 12px;
                        color: #ffffff;
                        padding: 1px 6px;
                        margin-left: 10px;
                        &.handle {
                            background-color: #2b8ff3;
                        }
                        &.nostart {
                            background-color: #999999;
                        }
                        &.complete {
                            background-color: #50cf3f;
                        }
                    }
                }
            }
            .description-panel {
                font-family: PingFang-SC-Medium;
                font-size: 13px;
                line-height: 18px;
                color: #666666;
                margin: 8px 0px;
                max-height: 80px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
            }
            .item-operate {
                .operate-btn {
                    display: inline-block;
                    width: 60px;
                    height: 18px;
                    line-height: 18px;
                    font-family: PingFang-SC-Medium;
                    font-size: 13px;
                    color: #2c90f3;
                    cursor: pointer;
                    .svg_icon_edit,.svg_icon_delete{
                        width: 12px;
                        height: 14px;
                        color: #2c90f3;
                        margin-right: 5px;
                    }
                }
            }
        }
    }
</style>
