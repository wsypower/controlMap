<template>
    <a-modal title="预案详情"
             wrapClassName="reviewmodelwrap"
             v-model="yuAnInfoDialogVisible"
             :mask="false"
             :maskClosable="false"
             width="100%"
             class="yuan-info-dialog"
             style="paddingBottom: 0px;margin: 0px;height: 100%;top:0px"
             :bodyStyle="{height:'calc(100% - 108px)',padding:'0px 20px 20px 20px'}"
             :destroyOnClose="true">
        <div class="yuan_dialog_body">
            <div v-show="dataLoading" class="loading" flex="main:center cross:center">
                <a-spin tip="数据加载中..."></a-spin>
            </div>
            <cg-container scroll>
                <div class="part base">
                    <!-- 案件标题 -->
                    <div class="part_title" flex="cross:center">
                        <a-icon type="alert" theme="twoTone" style="marginRight:5px;marginTop:-2px" />
                        {{yuAnInfo.name}}
                        <span
                                v-if="yuAnInfo.statusId=='01'"
                                class="status blue"
                                flex="cross:center"
                        >
              <a-icon
                      type="info-circle"
                      theme="filled"
                      style="fontSize:14px;transform:scale(0.9);marginRight:3px"
              />待提交
            </span>
                        <span v-if="yuAnInfo.statusId=='02'" class="status blue">
              <a-icon
                      type="pause-circle"
                      theme="filled"
                      style="fontSize:14px;transform:scale(0.9);marginRight:3px"
              />待审核
            </span>
                        <span v-if="yuAnInfo.statusId=='03'" class="status blue">
              <a-icon
                      type="check-circle"
                      theme="filled"
                      style="fontSize:14px;transform:scale(0.9);marginRight:3px"
              />已通过
            </span>
                        <span v-if="yuAnInfo.statusId=='04'" class="status blue">
              <a-icon
                      type="close-circle"
                      theme="filled"
                      style="fontSize:14px;transform:scale(0.9);marginRight:3px"
              />已驳回
            </span>
                        <span v-if="yuAnInfo.statusId=='05'" class="status yellow">
              <a-icon
                      type="minus-circle"
                      theme="filled"
                      style="fontSize:14px;transform:scale(0.9);marginRight:3px"
              />未开始
            </span>
                        <span v-if="yuAnInfo.statusId=='06'" class="status green">
              <a-icon
                      type="clock-circle"
                      theme="filled"
                      style="fontSize:14px;transform:scale(0.9);marginRight:3px"
              />进行中
            </span>
                        <span v-if="yuAnInfo.statusId=='07'" class="status grey">
              <a-icon
                      type="check-circle"
                      theme="filled"
                      style="fontSize:14px;transform:scale(0.9);marginRight:3px"
              />已结束
            </span>
                        <span v-if="yuAnInfo.statusId=='08'" class="status red">
              <a-icon
                      type="warning"
                      theme="filled"
                      style="fontSize:14px;transform:scale(0.9);marginRight:3px"
              />已逾期作废
            </span>
                    </div>
                    <div class="call__items">
                        <div class="call__item" flex="cross:center">
              <span class="attr">
                <a-icon type="smile" theme="twoTone" />创建人：
              </span>
                            <span class="content">{{yuAnInfo.creator}}</span>
                        </div>
                        <div class="call__item" flex="cross:center">
              <span class="attr">
                <a-icon type="dashboard" theme="twoTone" />保障时间：
              </span>
                            <span
                                    class="content"
                            >{{new Date(yuAnInfo.startDayTime)|date_format()}}~{{new Date(yuAnInfo.endDayTime)|date_format()}}</span>
                        </div>
                        <div class="call__item" flex="cross:center">
              <span class="attr">
                <a-icon type="project" theme="twoTone" />预案描述：
              </span>
                            <span class="content">{{yuAnInfo.description}}</span>
                        </div>
                        <div class="call__item" flex="cross:center">
              <span class="attr">
                <a-icon type="bulb" theme="twoTone" />工作目标：
              </span>
                            <span class="content">{{yuAnInfo.jobGoal}}</span>
                        </div>
                        <div class="call__item" flex="cross:center">
              <span class="attr">
                <a-icon type="layout" theme="twoTone" />组织领导及任务分工：
              </span>
                            <span class="content">{{yuAnInfo.jobAssignment}}</span>
                        </div>
                        <div class="call__item" flex="cross:center">
              <span class="attr">
                <a-icon type="fund" theme="twoTone" />工作内容：
              </span>
                            <span class="content">{{yuAnInfo.jobContent}}</span>
                        </div>
                        <div class="call__item" flex="cross:center">
              <span class="attr">
                <a-icon type="save" theme="twoTone" />工作要求：
              </span>
                            <span class="content">{{yuAnInfo.jobRequirements}}</span>
                        </div>
                    </div>
                </div>
                <div class="part ziyuan">
                    <div class="part_title" flex="cross:center">
            <span>
              <a-icon type="profile" theme="twoTone" style="marginRight:5px;" />资源部署
            </span>
                        <a-tooltip placement="top" title="保障视图">
                            <a-button type="primary" shape="circle" icon="security-scan" @click="openReViewMap"></a-button>
                        </a-tooltip>
                    </div>
                    <a-table
                            bordered
                            :columns="ziyuanColumns"
                            :rowKey="record => record.id"
                            :dataSource="yuAnInfo.baoZhangData"
                            :pagination="false"
                    >
                        <div slot="person" slot-scope="text, record, index">
              <span
                      v-for="(person,index) in record.peopleList"
                      :key="person.id"
              >{{index==record.peopleList.length-1?person.name +'('+person.groupName + ')':person.name +'('+person.groupName + '),'}}</span>
                        </div>
                    </a-table>
                </div>
                <div class="part log">
                    <div class="part_title" flex="cross:center">
                        <a-icon type="reconciliation" theme="twoTone" style="marginRight:5px;" />操作日志
                    </div>
                    <a-table
                            bordered
                            :columns="logColumns"
                            :rowKey="record => record.id"
                            :dataSource="yuAnInfo.logData"
                            :pagination="false"
                    ></a-table>
                </div>
            </cg-container>
        </div>
                <!--<div class="part base">-->
                    <!--<h3>{{yuAnInfo.name}}</h3>-->
                    <!--<span v-if="yuAnInfo.statusId=='01'" class="status blue">待提交</span>-->
                    <!--<span v-if="yuAnInfo.statusId=='02'" class="status blue">待审核</span>-->
                    <!--<span v-if="yuAnInfo.statusId=='03'" class="status blue">已通过</span>-->
                    <!--<span v-if="yuAnInfo.statusId=='04'" class="status blue">已驳回</span>-->
                    <!--<span v-if="yuAnInfo.statusId=='05'" class="status yellow">未开始</span>-->
                    <!--<span v-if="yuAnInfo.statusId=='06'" class="status green">进行中</span>-->
                    <!--<span v-if="yuAnInfo.statusId=='07'" class="status grey">已结束</span>-->
                    <!--<span v-if="yuAnInfo.statusId=='08'" class="status red">已逾期作废</span>-->
                    <!--<div><span class="attr">创建人：</span><span class="content">{{yuAnInfo.creator}}</span></div>-->
                    <!--<div><span class="attr">保障时间：</span><span class="content">{{new Date(yuAnInfo.startDayTime)|date_format()}}~{{new Date(yuAnInfo.endDayTime)|date_format()}}</span></div>-->
                    <!--<div><span class="attr">预案描述：</span><span class="content">{{yuAnInfo.description}}</span></div>-->
                    <!--<div><span class="attr">工作目标：</span><span class="content">{{yuAnInfo.jobGoal}}</span></div>-->
                    <!--<div><span class="attr">组织领导及任务分工：</span><span class="content">{{yuAnInfo.jobAssignment}}</span></div>-->
                    <!--<div><span class="attr">工作内容：</span><span class="content">{{yuAnInfo.jobContent}}</span></div>-->
                    <!--<div><span class="attr">工作要求：</span><span class="content">{{yuAnInfo.jobRequirements}}</span></div>-->
                <!--</div>-->
                <!--<div class="part ziyuan">-->
                    <!--<h3>资源部署</h3>-->
                    <!--<a-button type="primary" size="small" @click="openReViewMap">视图</a-button>-->
                    <!--<a-table :columns="ziyuanColumns"-->
                             <!--:rowKey="record => record.id"-->
                             <!--:dataSource="yuAnInfo.baoZhangData"-->
                             <!--:pagination="false">-->
                        <!--<div slot="person" slot-scope="text, record, index">-->
                            <!--<span v-for="(person,index) in record.peopleList" :key="person.id">-->
                                <!--{{index==record.peopleList.length-1?person.name +'('+person.groupName + ')':person.name +'('+person.groupName + '),'}}-->
                            <!--</span>-->
                        <!--</div>-->
                    <!--</a-table>-->
                <!--</div>-->
                <!--<div class="part log">-->
                    <!--<h3>操作日志</h3>-->
                    <!--<a-table :columns="logColumns"-->
                             <!--:rowKey="record => record.id"-->
                             <!--:dataSource="yuAnInfo.logData"-->
                             <!--:pagination="false">-->
                    <!--</a-table>-->
                <!--</div>-->
            <!--</cg-container>-->
        <!--</div>-->
        <template slot="footer" >
            <div v-if="yuAnInfo.statusId=='02'&&yuAnInfo.reviewUserId === userId">
                <a-button type="primary" @click="agree">同意</a-button>
                <a-button type="primary" @click="back">驳回</a-button>
            </div>
            <div v-else></div>
        </template>
        <a-modal title="填写驳回原因" v-model="backDialogVisible" width="400px" @cancel="handleCancelForBack" :maskClosable="false">
            <div class="back_dialog_body">
                <p>驳回原因：</p>
                <a-textarea v-model="backReason" placeholder="填写驳回原因" :autosize="{ minRows: 4, maxRows: 4 }" />
            </div>
            <template slot="footer">
                <a-button type="primary" @click="clickBack">确定</a-button>
                <a-button @click="handleCancelForBack">取消</a-button>
            </template>
        </a-modal>
        <bao-zhang-map-for-view-dialog :visible.sync="reviewBaoZhangMapDialogVisible" :baoZhangData="reviewBaoZhangMapData"></bao-zhang-map-for-view-dialog>
    </a-modal>
</template>
<script type="text/ecmascript-6">
  import BaoZhangMapForViewDialog from './BaoZhangMapForViewDialog'
    const ziyuanColumns = [{
      title: '保障点位',
      dataIndex: 'name',
      width: '20%',
    }, {
      title: '人数总计',
      dataIndex: 'count',
      width: '10%',
    }, {
      title: '保障人员',
      dataIndex: 'peopleList',
      scopedSlots: { customRender: 'person' }
    }, {
      title: '备注',
      dataIndex: 'remark',
      width: '20%',
    }];
    const logColumns = [{
      title: '时间',
      dataIndex: 'time',
      width: '20%',
    }, {
      title: '操作内容',
      dataIndex: 'content',
      width: '40%',
    }, {
      title: '用户姓名',
      dataIndex: 'user',
      width: '20%',
    }, {
      title: '归属部门',
      dataIndex: 'dept',
    }];
    import { mapActions } from 'vuex'
    import util from '@/utils/util'
    export default{
      name: 'yuAnInfoAndReviewDialog',
      props:{
        visible: {
          type: Boolean,
          default: false
        },
        yuAnId: {
          type: String,
          default: ''
        }
      },
      components:{
        BaoZhangMapForViewDialog
      },
      created(){
        this.userId = util.cookies.get('userId')
      },
      data(){
        return {
          userId: '',
          yuAnInfoDialogVisible: false,
          dataLoading: false,
          ziyuanColumns: ziyuanColumns,
          logColumns: logColumns,
          yuAnInfo:{},
          reviewBaoZhangMapDialogVisible: false,
          reviewBaoZhangMapData: [],
          backDialogVisible: false,
          backReason: ''
        }
      },
      computed: {
        getContainer() {
          console.log(this.$parent.$refs)
          return this.$parent.$refs.content
        }
      },
      watch:{
        yuAnInfoDialogVisible:function(val){
          if(val){
            this.init();
          }
          else{
            this.$emit('update:visible', false);
          }
        },
        visible:function(val){
          if(val){
            this.yuAnInfoDialogVisible = true;
          }
        }
      },
      methods:{
        ...mapActions('emergency/emergency', ['getEmergencyYuAnById','setEmergencyYuAnToPass','setEmergencyYuAnToBack']),
        init(){
          console.log('init yuAnId: ' + this.yuAnId);
            this.getYuAnDataById();
        },
        getYuAnDataById(){
          this.dataLoading = true;
            this.getEmergencyYuAnById({id: this.yuAnId}).then((result)=>{
              this.yuAnInfo = Object.assign({},result);
              let tempData = JSON.parse(JSON.stringify(this.yuAnInfo.baoZhangData));
              this.reviewBaoZhangMapData = tempData.reduce((res,item)=>{
                let peopleList = item.peopleList.reduce((r,i)=>{
                  r.push(i.name + '('+ i.groupName +')')
                  return r
                },[]);
                let temp = {
                  id: item.id,
                  mapId: item.mapId,
                  mapType: item.mapType,
                  name: item.name,
                  people: peopleList.join(','),
                  remark:item.remark
                }
                res.push(temp)
                return res
              },[]);

              this.dataLoading = false;
            });
        },
        openReViewMap(){
          this.reviewBaoZhangMapDialogVisible = true;
        },
        agree(){
          //调取接口修改状态（待审核->已同意）
          this.setEmergencyYuAnToPass({id: this.yuAnId}).then((res)=>{
            console.log(res);
            this.$emit('refreshList');
            this.yuAnInfoDialogVisible = false;
          })
        },

        back(){
          this.backDialogVisible = true;
        },

        clickBack(){
          //调取接口修改状态（待审核->已驳回）
          this.setEmergencyYuAnToBack({id: this.yuAnId,backReason:this.backReason}).then((res)=>{
            console.log(res);
            this.backReason = '';
            this.backDialogVisible = false;
            this.yuAnInfoDialogVisible = false;
            this.$emit('refreshList');
          })
        },

        handleCancelForBack(){
          this.backReason = '';
          this.backDialogVisible = false;
        }
      }
    }
</script>
<style lang="scss" scoped>
    /deep/.ant-modal-content {
        height: 100%;
        /deep/.ant-modal-body {
            height: 100%;
        }
    }
    .yuan-info-dialog {
        top: 0px;

        .yuan_dialog_body {
            width: 100%;
            height: 100%;
            position: relative;
            background-color: #eee;
            .part_title {
                font-size: 18px;
                font-weight: 600;
                color: #028efc;
                height: 70px;
            }
            .part {
                background-color: #ffffff;
                width: 100%;
                .call__items {
                    width: 100%;
                    padding: 10px 20px 20px 20px;
                    background-color: rgb(249, 247, 247);
                    border-radius: 5px;
                    .call__item {
                        height: 50px;
                        border-bottom: 1px dashed rgb(223, 223, 224);
                        .anticon {
                            margin-right: 5px;
                            font-size: 16px;
                        }
                    }
                }

                h3 {
                    height: 30px;
                    line-height: 30px;
                }
                &.base {
                    position: relative;
                    .status {
                        // position: absolute;
                        // top: 10px;
                        // right: 10px;
                        margin-left: 5px;
                        display: inline-block;
                        padding: 2px 8px;
                        background-color: #ffd43b;
                        color: #ffffff;
                        text-align: center;
                        border-radius: 10px;
                        font-size: 14px;
                        line-height: 20px;
                        &.red {
                            background-color: #f76b6b;
                        }
                        &.yellow {
                            background-color: #e7a343;
                        }
                        &.green {
                            background-color: #65c346;
                        }
                        &.blue {
                            background-color: #3a9cfc;
                        }
                        &.grey {
                            background-color: #909399;
                        }
                    }
                    > div {
                        .attr {
                            display: inline-block;
                            width: 187px;
                            color: #888888;
                            text-align: left;
                            vertical-align: top;
                        }
                        .content {
                            display: inline-block;
                            width: calc(100% - 140px);
                        }
                    }
                }
                &.ziyuan {
                    position: relative;
                    button {
                        margin-left: 20px;
                        width: 22px;
                        height: 22px;
                        border-radius: 50%;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .reviewmodelwrap {
        top: 69px;
        height: calc(100% - 78px);
        width: calc(100% - 80px);
        left: 70px;
        .yuan-info-dialog {
            .ant-modal-content {
                height: 100%;
            }
        }
    }
</style>
