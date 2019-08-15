<template>
    <a-modal title="预案详情" v-model="yuAnInfoDialogVisible" width="1080px" class="yuan-info-dialog">
        <div style="width:100%; height: 500px;position:relative;background-color: #eee;padding:10px;" class="yuan_dialog_body">
            <cg-container scroll>
                <div class="part base">
                    <h3>{{yuAnInfo.name}}</h3>
                    <span v-if="yuAnInfo.statusId=='01'" class="status blue">待提交</span>
                    <span v-if="yuAnInfo.statusId=='02'" class="status blue">待审核</span>
                    <span v-if="yuAnInfo.statusId=='03'" class="status blue">已通过</span>
                    <span v-if="yuAnInfo.statusId=='04'" class="status blue">已驳回</span>
                    <span v-if="yuAnInfo.statusId=='05'" class="status yellow">未开始</span>
                    <span v-if="yuAnInfo.statusId=='06'" class="status green">进行中</span>
                    <span v-if="yuAnInfo.statusId=='07'" class="status grey">已结束</span>
                    <span v-if="yuAnInfo.statusId=='08'" class="status red">已逾期作废</span>
                    <div><span class="attr">创建人：</span><span class="content">{{yuAnInfo.creator}}</span></div>
                    <div><span class="attr">保障时间：</span><span class="content">{{new Date(yuAnInfo.startDayTime)|date_format()}}~{{new Date(yuAnInfo.endDayTime)|date_format()}}</span></div>
                    <div><span class="attr">预案描述：</span><span class="content">{{yuAnInfo.description}}</span></div>
                    <div><span class="attr">工作目标：</span><span class="content">{{yuAnInfo.jobGoal}}</span></div>
                    <div><span class="attr">组织领导及任务分工：</span><span class="content">{{yuAnInfo.jobAssignment}}</span></div>
                    <div><span class="attr">工作内容：</span><span class="content">{{yuAnInfo.jobContent}}</span></div>
                    <div><span class="attr">工作要求：</span><span class="content">{{yuAnInfo.jobRequirements}}</span></div>
                </div>
                <div class="part ziyuan">
                    <h3>资源部署</h3>
                    <a-button type="primary" size="small" @click="openReViewMap">视图</a-button>
                    <a-table :columns="ziyuanColumns"
                             :rowKey="record => record.id"
                             :dataSource="yuAnInfo.baoZhangData"
                             :pagination="false">
                        <div slot="person" slot-scope="text, record, index">
                            <span v-for="(person,index) in record.peopleList" :key="person.id">
                                {{index==record.peopleList.length-1?person.name +'('+person.groupName + ')':person.name +'('+person.groupName + '),'}}
                            </span>
                        </div>
                    </a-table>
                </div>
                <div class="part log">
                    <h3>操作日志</h3>
                    <a-table :columns="logColumns"
                             :rowKey="record => record.id"
                             :dataSource="yuAnInfo.logData"
                             :pagination="false">
                    </a-table>
                </div>
            </cg-container>
        </div>
        <template slot="footer" v-if="yuAnInfo.reviewUserId === userId">
            <a-button type="primary" @click="agree">同意</a-button>
            <a-button type="primary" @click="back">驳回</a-button>
        </template>
        <a-modal title="填写驳回原因" v-model="backDialogVisible" width="400px" @cancel="handleCancelForBack">
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
          ziyuanColumns: ziyuanColumns,
          logColumns: logColumns,
          yuAnInfo:{},
          reviewBaoZhangMapDialogVisible: false,
          reviewBaoZhangMapData: [],
          backDialogVisible: false,
          backReason: ''
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
            });
        },
        openReViewMap(){
          this.reviewBaoZhangMapDialogVisible = true;
        },
        agree(){
          //调取接口修改状态（待审核->已同意）
          this.setEmergencyYuAnToPass({id: this.yuAnId}).then((res)=>{
            console.log(res);
            this.yuAnInfoDialogVisible = false;
          })
        },

        back(){
          this.backDialogVisible = true;
        },

        clickBack(){
          //调取接口修改状态（待审核->已驳回）
          this.setEmergencyYuAnToBack({id: this.yuAnId,reason:this.backReason}).then((res)=>{
            console.log(res);
            this.backReason = '';
            this.backDialogVisible = false;
            this.yuAnInfoDialogVisible = false;
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
    .yuan-info-dialog{
        .yuan_dialog_body {
            .part {
                margin-bottom: 10px;
                background-color: #ffffff;
                width: 100%;
                border-radius: 6px;
                h3 {
                    height: 30px;
                    line-height: 30px;
                }
                &.base {
                    position: relative;
                    .status {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        display: inline-block;
                        padding: 0px 8px;
                        background-color: #ffd43b;
                        color: #ffffff;
                        text-align: center;
                        border-radius: 10px;
                        font-size: 14px;
                        line-height: 20px;
                        &.red {
                            background-color: #ff0000;
                        }
                        &.yellow {
                            background-color: #ffcc00;
                        }
                        &.green {
                            background-color: #66cc66;
                        }
                        &.blue {
                            background-color: #1761f3;
                        }
                        &.grey {
                            background-color: #6b6b6b;
                        }
                    }
                    > div {
                        border-bottom: 1px solid #eeeeee;
                        padding: 5px 0px;
                        .attr {
                            display: inline-block;
                            width: 140px;
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
                        position: absolute;
                        top: 5px;
                        right: 10px;
                    }
                }
            }
        }
    }
</style>
