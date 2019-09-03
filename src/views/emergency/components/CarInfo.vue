<template>
    <div class="info">
        <div><span>车牌：</span><span>{{info.name}}</span></div>
        <div><span>类型：</span><span>{{info.type}}</span></div>
        <div><span>GPS：</span><span>{{info.person}}</span></div>
        <div><span>驾驶员：</span><span>{{info.tel}}</span></div>
        <div><span>电话：</span><span>{{info.address}}</span></div>
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
                width: 70px;
            }
            span:last-child{
                display:inline-block;
                max-width: 200px;
            }
        }
    }
</style>
