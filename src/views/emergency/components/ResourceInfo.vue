<template>
    <div class="info">
        <div><span>物资名称：</span><span>{{info.name}}</span></div>
        <div><span>物资数量：</span><span>{{info.num}}</span></div>
        <div><span>负责人：</span><span>{{info.person}}</span></div>
        <div><span>联系方式：</span><span>{{info.tel}}</span></div>
        <div flex="dir:left"><span>存储位置：</span><span>{{info.address}}</span></div>
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
                width: 200px;
            }
        }
    }
</style>
