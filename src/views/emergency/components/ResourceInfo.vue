<template>
    <div class="info">
        <div><span>物资名称：</span>{{info.name}}</div>
        <div><span>物资数量：</span>{{info.num}}</div>
        <div><span>负责人：</span>{{info.person}}</div>
        <div><span>联系方式：</span>{{info.tel}}</div>
        <div><span>存储位置：</span>{{info.address}}</div>
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
    }
</style>
