<template>
    <div class="info">
        <div><span>车&emsp;&emsp;牌：</span><span>{{info.carNumber}}</span></div>
        <div><span>车辆类型：</span><span>{{info.type}}</span></div>
        <div><span>GPS：</span><span>{{info.GPS}}</span></div>
        <div>
            <span>车&emsp;&emsp;速：</span>
            <span v-if="info.speed>=0" :class="{red: info.isOverSpeed}">{{ info.speed }}km/h</span>
        </div>
        <div><span>驾&ensp;驶&ensp;员：</span><span>{{info.driver}}</span></div>
        <div><span>电&emsp;&emsp;话：</span><span>{{info.phone}}</span></div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        name: 'info',
        props:{
            info:{
                type: Object,
                default(){
                    return {}
                }
            }
        },

    }
</script>
<style lang="scss" scoped>
    .info{
        width: 100%;
        height:100%;
        padding: 17px;
        background-color: #ffffff;
        div{
            span:first-child{
                display:inline-block;
                width: 80px;
            }
            span:last-child{
                display:inline-block;
                width: 200px;
                &.red{
                    color: #e03131;
                }
            }
        }
    }
</style>
