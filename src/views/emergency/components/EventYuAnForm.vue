<template>
    <div class="yuan-form-panel" flex="dir:top">
        <div class="yuan-form-panel-body">
            <cg-container scroll>
                <div class="yuan-form">
                    <div class="part">
                        <div class="title">预案信息</div>
                        <div class="content base">
                            <a-row>
                                <a-col :span="7">
                                    <div flex="dir:left"><span class="sub-title">名称：</span><span class="sub-content">{{eventInfo.name}}</span></div>
                                    <div flex="dir:left"><span class="sub-title">类型：</span><span class="sub-content">{{eventInfo.typeName}}</span></div>
                                    <div flex="dir:left"><span class="sub-title">等级：</span><span class="sub-content">{{eventInfo.levelName}}</span></div>
                                    <div flex="dir:left"><span class="sub-title">时间：</span>
                                        <span class="sub-content">{{new Date(parseInt(eventInfo.startDay))|date_format('YYYY-MM-DD HH:mm')}}~{{new Date(parseInt(eventInfo.endDay))|date_format('YYYY-MM-DD HH:mm')}}</span></div>
                                </a-col>
                                <a-col :span="11" style="padding-right:20px;">
                                    <div flex="dir:left"><span class="sub-title">位置：</span><span class="sub-content">{{eventInfo.position}}</span></div>
                                    <div flex="dir:left"><span class="sub-title">信息：</span><span class="sub-content">{{eventInfo.description}}</span></div>
                                    <div flex="dir:left">
                                        <span class="sub-title">区域：</span>
                                        <span class="sub-content">{{areaList[eventInfo.areaId]}}</span>
                                        <a-button v-if="false" type="primary" @click="lookAreaMap" size="small">查看区域范围</a-button>
                                    </div>
                                    <div flex="dir:left"><span class="sub-title">附件：</span>
                                        <span v-for="(file,index) in JSON.parse(eventInfo.fileStr)"
                                              :key="index"
                                              class="file"
                                              :title="file.oldName">{{file.oldName}}</span>
                                    </div>
                                </a-col>
                                <a-col :span="6">
                                    <div class="photo">
                                        <span class="sub-title">照片：</span>
                                        <img v-if="JSON.parse(eventInfo.imageStr)[0]" :src="JSON.parse(eventInfo.imageStr)[0].newPath" />
                                        <img v-else src="~@img/zanwutupian_v1.png"/>
                                    </div>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                    <yu-an-stage :stageData.sync="stageData"></yu-an-stage>
                    <yu-an-people :peopleData.sync="peopleData"></yu-an-people>
                    <yu-an-resource :resourceData.sync="resourceData" @getResult="getResourceResult"></yu-an-resource>
                    <yu-an-place :placeData.sync="placeData" @getResult="getPlaceResult"></yu-an-place>
                </div>
            </cg-container>
        </div>
        <div class="operate-panel" flex="main:center cross:center">
            <a-button type="primary" @click="startYuAnEvent">启动预案</a-button>
        </div>
        <area-map-dialog :visible.sync="areaMapDialogVisible" :mapId="mapId"></area-map-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapActions } from 'vuex'
    import YuAnStage from './YuAnStage'
    import YuAnPeople from './YuAnPeople'
    import YuAnResource from './YuAnResource'
    import YuAnPlace from './YuAnPlace'
    import AreaMapDialog from './AreaMapDialog'
    export default {
        name: 'eventYuAnForm',
        components:{
            YuAnStage,
            YuAnPeople,
            YuAnResource,
            YuAnPlace,
            AreaMapDialog
        },
        props:{
            //原始数据
            sourceData:{
                type: String,
                default: ''
            }
        },
        data(){
            return {
                areaList:{
                    '2':'圆形',
                    '3':'多边形',
                    '4':'任意面'
                },
                eventInfo:{
                    name: '',
                    typeName: '',
                    levelName: '',
                    startDay: 0,
                    endDay: 0,
                    position: '',
                    description: '',
                    areaId: '',
                    imageStr: '[]',
                    fileStr: '[]'
                },
                areaMapDialogVisible: false,
                mapId: null,
                eventYuAnForm: {
                    id: '',
                    stageData: '',
                    peopleData:'',
                    resourceData: '',
                    placeData: ''
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
                resourceResultData: [],
                placeData: [],
                placeResultData: [],

            }
        },
        mounted(){
            this.init();
        },
        methods:{
            ...mapActions('emergency/emergency', ['getEventYuAnInfoById','startYuAn']),
            init(){
                this.getEventYuAnInfoById({id: this.sourceData}).then((res)=>{
                    this.eventInfo = res.eventData;
                    this.stageData = res.emPlanData.stageData;
                    this.peopleData = res.emPlanData.peopleData;
                    this.resourceData = res.emPlanData.resourceData;
                    this.placeData = res.emPlanData.placeData;
                });
            },
            lookAreaMap(){
                this.areaMapDialogVisible = true;
                this.mapId = this.eventInfo.mapId;
            },

            getResourceResult(data){
                this.resourceResultData = JSON.parse(JSON.stringify(data));
            },
            getPlaceResult(data){
                this.placeResultData = JSON.parse(JSON.stringify(data));
            },
            startYuAnEvent(){
                console.log('startYuAnEvent',this.stageData,this.peopleData,this.resourceResultData,this.placeResultData);

                //调启动接口
                this.eventYuAnForm.id = this.eventInfo.id;
                this.eventYuAnForm.stageData = JSON.stringify(this.stageData);
                this.eventYuAnForm.peopleData = JSON.stringify(this.peopleData);
                this.eventYuAnForm.resourceData = JSON.stringify(this.resourceResultData);
                this.eventYuAnForm.placeData = JSON.stringify(this.placeResultData);
                console.log('startYuAn eventYuAnForm',this.eventYuAnForm);
                this.startYuAn(this.eventYuAnForm).then((res)=>{
                    console.log('startYuAn',res);
                    this.$emit('close')
                });
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
                    .content {
                        background-color: #f5f7f8;
                        padding: 5px;
                        span.file{
                            display: inline-block;
                            width: 190px;
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
                            cursor: pointer;
                            &:last-child{
                                margin-right: 0px;
                            }
                            &:hover{
                                background-color: rgba(43,144,243,.6);
                                color: #ffffff;
                            }
                        }
                    }
                    .base{
                        .sub-title{
                            width: 50px;
                        }
                        .sub-content{
                            width: 100%;
                        }
                        .photo{
                            span{
                                vertical-align: top;
                            }
                            img{
                                width: 200px;
                                height: 150px;
                            }
                        }
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
