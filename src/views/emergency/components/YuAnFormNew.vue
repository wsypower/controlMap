<template>
    <div class="yuan-form-panel" flex="dir:top">
        <div class="yuan-form-panel-body">
            <cg-container scroll>
                <div class="yuan-form">
                    <div class="part name">
                        <div class="title">预案名称</div>
                        <a-input placeholder="请输入" style="width: 240px;"/>
                    </div>
                    <yu-an-stage :stageData.sync="stageData"></yu-an-stage>
                    <yu-an-people :peopleData.sync="peopleData"></yu-an-people>
                    <yu-an-resource :resourceData.sync="resourceData"></yu-an-resource>
                    <yu-an-place :placeData.sync="placeData"></yu-an-place>
                </div>
            </cg-container>
        </div>
        <div class="operate-panel" flex="main:center cross:center">
            <a-button type="primary" @click="save">保存</a-button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import YuAnStage from './YuAnStage'
    import YuAnPeople from './YuAnPeople'
    import YuAnResource from './YuAnResource'
    import YuAnPlace from './YuAnPlace'
    export default {
        name: 'yuAnFormNew',
        components:{
            YuAnStage,
            YuAnPeople,
            YuAnResource,
            YuAnPlace
        },
        data(){
            return {
                yuAnForm: {
                    name: '',
                    stageData: [],
                    peopleData:{},
                    resourceData: [],
                    placeData: []
                },
                stageData: [{
                    id: '',
                    stageName: '',
                    description: '',
                    person: '',
                    tel: ''
                }],
                peopleData:{
                    leaderOne: [],
                    leaderTwo: [],
                    leaderThree: [],
                    leaderFour: [],
                    leaderFive: [],
                    memberOne: [],
                    memberTwo: [],
                    groupOneForOne: [],
                    groupOneForTwo: [],
                    groupOneForThree: [],
                    groupTwoForOne: [],
                    groupTwoForTwo: [],
                    groupTwoForThree: [],
                    groupThreeForOne: [],
                    groupThreeForTwo: [],
                    groupThreeForThree: []
                },
                resourceData: [],
                placeData: []
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){

            },
            checkParams(){
               if(this.yuAnForm.name==''){
                   this.$notification['error']({
                       message: '预案名称必填',
                       description: '请检查',
                       style: {
                           width: '300px',
                           marginLeft: `100px`,
                           fontSize: '14px'
                       }
                   });
                   return false
               }
               return true
            },
            save(){
                console.log('yuAnForm',this.yuAnForm);
                if(!this.checkParams()){
                    return
                }
                else{
                    //掉保存接口
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .yuan-form-panel {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        .yuan-form-panel-body{
            width: 100%;
            height: 100%;
            position: relative;
            .yuan-form {
                padding: 20px 20px 0px 20px;
                width: 100%;
                height: 100%;
                .part {
                    margin-bottom: 10px;
                    .title {
                        font-family: PingFang-SC-Bold;
                        font-size: 14px;
                        line-height: 30px;
                        color: #2b8ff3;
                    }
                }
            }
        }
        .operate-panel {
            width: 100%;
            height: 60px;
        }
        /deep/.ant-table-thead > tr > th,
        /deep/.ant-table-tbody > tr > td,
        /deep/.ant-table-footer{
            padding: 6px
        }
    }
</style>
