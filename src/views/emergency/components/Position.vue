<template>
    <div class="icon_position">
        <cg-icon-svg name="position" class="svg_icon_position"></cg-icon-svg>
        <span v-if="content>=0">{{content}}</span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'pin',
        props:{
            content:{
                type: Number,
                default: null
            },
            isActive:{
                type: Boolean,
                default: false
            }
        },
        data(){
            return {

            }
        }
    }
</script>
<style lang="scss" scoped>
    .icon_position{
        width: 22px;
        height: 25px;
        position: relative;
        .svg_icon_position{
            font-size: 16px;
            color: inherit;
            width: 100%;
            height: 100%;
            &.active{
                color: #f07171;
            }
        }
        span{
            display: inline-block;
            position: absolute;
            top: 0px;
            left: 0px;
            width: 22px;
            text-align: center;
            font-family: PingFang-SC-Heavy;
            font-size: 14px;
            color: #ffffff;
        }
    }
</style>
