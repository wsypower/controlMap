<template>
    <div class="info">
        <div><span>姓名：</span><span>{{info.name}}</span></div>
        <div><span>电话：</span><span>{{info.phone}}</span></div>
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
                width: 45px;
            }
            span:last-child{
                display:inline-block;
                width: 100px;
            }
        }
    }
</style>
