<template>
    <div class="yuan-form-panel" flex="dir:top">
        <div class="liucheng-panel" flex="dir:left cross:center main:center">
            <span class="jieduan blue" :class="{active: showStage=='消息阶段'}" @click="sendMessage('消息阶段')">消息阶段</span>
            <cg-icon-svg name="jiantou" class="svg_icon_jiantou"></cg-icon-svg>
            <span class="jieduan orange" :class="{active: showStage=='警报阶段'}" @click="sendMessage('警报阶段')">警报阶段</span>
            <cg-icon-svg name="jiantou" class="svg_icon_jiantou"></cg-icon-svg>
            <span class="jieduan red" :class="{active: showStage=='紧急警报阶段'}" @click="sendMessage('紧急警报阶段')">紧急警报阶段</span>
            <cg-icon-svg name="jiantou" class="svg_icon_jiantou"></cg-icon-svg>
            <span class="jieduan green" :class="{active: showStage=='警报解除阶段'}" @click="sendMessage('警报解除阶段')">警报解除阶段</span>
        </div>
        <div class="yuan-form-panel-body">
            <cg-container scroll>
                <div class="yuan-form">
                    <div class="part">
                        <div class="title">预案信息</div>
                        <div class="content base">
                            <a-row>
                                <a-col :span="7">
                                    <div flex="dir:left"><span class="sub-title">名称：</span><span class="sub-content">{{eventInfo.name}}</span></div>
                                    <div flex="dir:left"><span class="sub-title">预案：</span><span class="sub-content">{{eventInfo.typeName}}</span></div>
                                    <div flex="dir:left"><span class="sub-title">等级：</span><span class="sub-content">{{eventInfo.levelName}}</span></div>
                                    <div flex="dir:left"><span class="sub-title">时间：</span>
                                        <span class="sub-content">
                                            <span v-if="eventInfo.startDay">{{new Date(parseInt(eventInfo.startDay))|date_format('YYYY-MM-DD HH:mm')}}</span>
                                            <span v-if="eventInfo.endDay">~{{new Date(parseInt(eventInfo.endDay))|date_format('YYYY-MM-DD HH:mm')}}</span>
                                        </span>
                                    </div>
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
                                              :title="file.oldName"
                                              @click="downloadFile(file.newPath)">{{file.oldName}}</span>
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
                    <yu-an-stage :stageData.sync="stageData" :activeStage="showStage" :operateType="operateType"></yu-an-stage>
                    <yu-an-people :peopleData.sync="peopleData" :operateType="operateType" @getResult="getPeopleResult"></yu-an-people>
                    <yu-an-resource :resourceData.sync="resourceData" :operateType="operateType" @getResult="getResourceResult"></yu-an-resource>
                    <yu-an-place :placeData.sync="placeData" :operateType="operateType" @getResult="getPlaceResult"></yu-an-place>
                </div>
            </cg-container>
        </div>
        <div class="operate-panel" flex="main:center cross:center" v-if="sourceData.activeStage!=='警报解除阶段'">
            <a-button type="primary" @click="startYuAnEvent">{{sourceData.sourceType===0?'启动预案':'发送'}}</a-button>
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

    const _ = require('lodash')
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
            type: Object,
            default(){
              return{
                id: '',
                //目前的阶段展示
                activeStage: '消息阶段',
                //是进行中的预案进入的还是启动预案进入（0：启动预案，1：进行中预案）
                sourceType: 0
              }
            }
          }
        },
        data(){
            return {
                showStage: '',
                operateType: 'set',
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
                    stageName: '',
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
                    groupMember: []
                },
                peopleResultData:{},
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
              this.showStage = this.sourceData.activeStage;
              if(this.sourceData.activeStage==='警报解除阶段'){
                //所有都只有查看的动作
                this.operateType = 'look';
              }

                this.getEventYuAnInfoById({id: this.sourceData.id}).then((res)=>{
                    this.eventInfo = res.eventData;
                    this.stageData = res.emPlanData.stageData;
                    this.peopleData = res.emPlanData.peopleData;
                    this.resourceData = res.emPlanData.resourceData;
                    this.placeData = res.emPlanData.placeData;
                });
            },
            sendMessage(stageName){
                  this.showStage = stageName;
            },
            lookAreaMap(){
                this.areaMapDialogVisible = true;
                this.mapId = this.eventInfo.mapId;
            },
            //应急人员数据更新
            getPeopleResult(data){
                this.peopleResultData = _.cloneDeep(data);
                // console.log('peopleResultData',this.peopleResultData);
            },
            //应急资源数据更新
            getResourceResult(data){
                this.resourceResultData = JSON.parse(JSON.stringify(data));
            },
            //应急场地数据更新
            getPlaceResult(data){
                this.placeResultData = JSON.parse(JSON.stringify(data));
            },
            //下载附件
            downloadFile(fileUrl){
                window.open(fileUrl);
            },
            //启动预案
            startYuAnEvent(){
                console.log('startYuAnEvent',this.stageData,this.peopleResultData,this.resourceResultData,this.placeResultData);

                //调启动接口
                this.eventYuAnForm.stageName = this.showStage;
                this.eventYuAnForm.id = this.eventInfo.id;
                this.eventYuAnForm.sourceType = this.sourceData.sourceType;
                this.eventYuAnForm.stageData = JSON.stringify(this.stageData);
                this.eventYuAnForm.peopleData = JSON.stringify(this.peopleResultData);
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
        .liucheng-panel{
            height: 60px;
            width: 100%;
            .jieduan{
                display:inline-block;
                height: 28px;
                line-height: 28px;
                border-radius: 14px;
                border: solid 1px #2b90f3;
                padding: 0px 12px;
                margin: 0px 5px;
                font-family: PingFang-SC-Medium;
                font-size: 13px;
                color: #2b90f3;
                cursor: pointer;
                &.blue.active{
                    background-color: #2b90f3;
                    border: solid 1px #2b90f3;
                    color: #ffffff;
                }
                &.orange.active{
                    background-color: #f99927;
                    border: solid 1px #f99927;
                    color: #ffffff;
                }
                &.red.active{
                    background-color: #f96363;
                    border: solid 1px #f96363;
                    color: #ffffff;
                }
                &.green.active{
                    background-color: #49c61a;
                    border: solid 1px #49c61a;
                    color: #ffffff;
                }
            }
            .svg_icon_jiantou{
                width: 20px;
                color: #e5e9ec;
            }
        }
        .yuan-form-panel-body{
            width: 100%;
            height: 100%;
            position: relative;
            .yuan-form {
                padding: 0px 20px;
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
                            margin: 5px 0px 5px 5px;
                            width: 50px;
                        }
                        .sub-content{
                            margin: 5px 0px;
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
