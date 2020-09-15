<template>
    <div class="group-people-panel">
        <div class="group-people-panel-header"><i style="color:#d60000;">*</i>{{title}}：</div>
        <div class="group-people-panel-method" flex="dir:left cross:center">
            <a-textarea v-if="nowOptType"
                        v-model="groupResultData.description"
                        placeholder="请输入组详情"
                        allow-clear
                        :autosize="{ minRows: 3, maxRows: 3 }"
                        @change="onChange" />
            <div v-else>{{groupResultData.description}}</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
   export default {
     name: 'groupPeopleTwo',
     props:{
       optType:{
         type: String,
         default: ''
       },
       groupData:{
         type: Object,
         default(){
           return{
             groupName: 'zonghexietiao',
             description: ''
           }
         }
       }
     },
     data(){
       return {
         groupResultData:{},
       }
     },
     computed:{
       title: function(){
         return this.groupData.groupName==='zonghexietiao'?'综合协调组':'纪检督查组'
       },
       userType: function(){
         return this.$store.getters['cgadmin/user/type'];
       },
       nowOptType:function(){
         return this.userType==='qxsl'&&this.optType!=='look'
       }
     },
     mounted() {
       this.groupResultData = JSON.parse(JSON.stringify(this.groupData));
     },
     watch:{
       groupResultData:{
         handler: function(value){
           this.$emit('getResult', value);
         },
         deep: true
       }
     },
     methods:{
       onChange(e){

       }
     }
   }
</script>
<style lang="scss" scoped>
.group-people-panel{
    width: 100%;
    .group-people-panel-header{
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        line-height: 30px;
        color: #4d4d4d;
        font-weight: 600;
    }
    .group-people-panel-method{
        margin-bottom: 10px;
        >div{
            &:last-child{
                margin-left: 10px;
            }
        }
    }
}
</style>