<template>
  <div class="page">
    <div class="event_list_panel" flex="dir:top">
      <div class="event_list_panel_header" flex="cross:center main:justify">
        <div class="search_btn_panel">
          <a-button icon="schedule" type="primary" @click="searchEventData('type_01')">日常事件</a-button>
          <a-button icon="schedule" type="primary" @click="searchEventData('type_02')">活动保障事件</a-button>
          <a-button icon="schedule" type="primary" @click="searchEventData('type_03')">应急事件</a-button>
          <a-button icon="schedule" class="templateBtn" @click="searchEventData('template_0')">模板</a-button>
        </div>
        <div class="operate_panel" flex="dir:left cross:center">
<!--          <a-select v-model="query.statusId" @select="handleSelectChange">-->
<!--            <a-select-option value="">全部</a-select-option>-->
<!--            <a-select-option v-for="(item,index) in statusList" :value="item.id" :key="index">{{item.name}}</a-select-option>-->
<!--          </a-select>-->
          <a-input-search v-model="query.searchContent" placeholder="请输入关键字" @search="searchDataByContent"/>
          <a-button type="primary" icon="user" @click="searchEventData('myYuAn_true')" flex="cross:center">我的预案</a-button>
          <a-button type="primary" icon="file-sync" class="review" @click="searchEventData('myStatus_02')">
            <a-badge :count="countForMyToCheck">
              <span class="text">待审核</span>
            </a-badge>
          </a-button>
          <a-button class="addfiles" icon="plus-circle" @click="addNewEvent" flex="cross:center">新增预案</a-button>
        </div>
      </div>
      <div class="loading event_list_content" v-if="dataLoading" flex="main:center cross:center">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <div class="event_list_content" v-if="!dataLoading&&eventDataList.length>0" flex="dir:top">
          <div class="event_list_content-operate" flex="dir:left cross:center main:right">
              <a-button class="btn_opt btn_delete"><a-icon type="delete" />批量删除</a-button>
              <a-button class="btn_opt btn_export"><a-icon type="export" />批量导出</a-button>
          </div>
          <div class="main-table-panel">
              <ul class="main-table-header">
                  <li flex="cross:center">
                      <span><a-checkbox @change=""></a-checkbox></span>
                      <span>事件名称</span>
                      <span>事件类型</span>
                      <span>保障时间</span>
                      <span>审核进度</span>
                      <span>处理状态</span>
                      <span>操作</span>
                      <span v-if="true">是否设置为模版</span>
                      <span v-else>是否为模版</span>
                  </li>
              </ul>
              <ul class="main-table-tbody">
                  <my-scroll>
                      <li v-for="item in eventDataList" :key="item.id" flex="cross:center">
                          <span><a-checkbox @change="" :id="item.id"></a-checkbox></span>
                          <span>{{item.name}}</span>
                          <span>{{item.typeName}}</span>
                          <span>{{item.startTime}}~{{item.endTime}}</span>
                          <span>{{item.processName}}</span>
                          <span>{{item.statusName}}</span>
                          <span>
                              <i class="btn_mini btn_look">查看</i>
                              <i class="btn_mini btn_handle">处置</i>
                          </span>
                          <span>
                              <a-icon type="star" v-if="item.isTemplate===0"/>
                              <a-icon type="star" theme="filled" style="color: #ffb94c;" v-else/>
                          </span>
                      </li>
                  </my-scroll>
              </ul>
          </div>
      </div>
      <div class="no-data event_list_content" flex="main:center cross:center" v-if="!dataLoading&&eventDataList.length===0">
        <img src="~@img/zanwuyuan.png" />
      </div>

      <div class="pagination" flex="cross:center main:right" style="paddingRight:17px">
        <a-pagination :showTotal="total => `总共 ${total} 条`"
                      :pageSize.sync="query.pageSize"
                      @showSizeChange="onShowSizeChange"
                      @change="onPageNoChange"
                      :total="totalSize"
                      v-model="query.pageNo"/>
      </div>
    </div>
<!--    <add-edit-dialog :visible.sync="addYuAnDialogVisible" :dialogTitle="dialogTitle" :yuAnId="yuAnId" @refreshList="getTuAnDataList"></add-edit-dialog>-->
<!--    <yu-an-info-and-review-dialog :visible.sync="yuAnInfoDialogVisible" :yuAnId="yuAnId" @refreshList="()=>{getTuAnDataList();getToCheckCount();}"></yu-an-info-and-review-dialog>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import dayjs from 'dayjs'
  import util from '@/utils/util'
  import AddEditDialog from './components/AddEditDialog'
  import YuAnInfoAndReviewDialog from './components/YuAnInfoAndReviewDialog'
  import { mapActions } from 'vuex'

  export default {
    name: 'index',
    components:{
      AddEditDialog,
      YuAnInfoAndReviewDialog
    },
    data() {
      return {
        statusList:[],
        countForMyToCheck: 0,
        dataLoading: false,
        query:{
          typeId:'',
          statusId: '',
          isTemplate: '0',
          isMyYuAn: false,
          searchContent: '',
          pageNo: 1,
          pageSize: 12
        },
        eventDataList:[],
        totalSize: 0,

        addYuAnDialogVisible: false,
        dialogTitle: '新增预案',
        yuAnId: '',
        yuAnInfoDialogVisible: false,
      }
    },
    computed:{
      userId(){
        return util.cookies.get('userId');
      }
    },
    created(){},
    mounted(){
      // let _this = this;
      // this.setBaseData();
      // window.onresize = function(){
      //   _this.setBaseData();
      // }
      // this.getStatusDataList().then((res)=>{
      //   console.log('getStatusDataList',res);
      //   this.statusList = res;
      // });
      // this.getToCheckCount();
      this.getEventDataList();

    },
    watch:{

    },
    methods: {
      ...mapActions('emergency/common', ['getStatusDataList']),
      ...mapActions('emergency/emergency', ['getCountForMyToCheck',
        'getEmergencyeventDataList','deleteEmergencyYuAn','setEmergencyYuAnToTemplate']),
      /***************************事件查询区 start****************************/
      resetQuery(){
        let pageSize = this.query.pageSize;
        this.query = Object.assign({}, this.$options.data().query);
        this.query.pageSize = pageSize;
        console.log('resetQuery',this.query);
      },

      getEventDataList(){
        this.dataLoading = true;
        console.log('this.query',this.query);
        // this.getEmergencyeventDataList(this.query).then((res)=>{
        //   this.eventDataList = res.list;
        //   this.totalSize = res.total;
        //   if(this.query.pageNo == Math.ceil(this.totalSize/this.query.pageSize)){
        //     let n = this.eventDataList.length%this.countOneRow;
        //     this.buWeiNum = n==0? 0 : this.countOneRow - n;
        //   }
        //
        // })
        let temp = {
          id: '001',
          name: '文明创城行动',
          typeName: '日常事件',
          typeId: 0,
          startTime: 1234567890,
          endTime: 1234567890,
          processName: '中队未上报',
          processId: 1,
          statusName: '本部门未处理',
          statusId: 0,
          isTemplate: 1
        }
        for(let i=0;i<12;i++){
          temp.id = temp.id + i;
          temp.name = temp.name + i;
          this.eventDataList.push(temp);
        }
        this.totalSize = 12;

        this.dataLoading = false;
      },
      getToCheckCount(){
        this.getCountForMyToCheck({userId: this.userId}).then((res)=>{
          this.countForMyToCheck = res;
        });
      },
      searchEventData(param){
        this.resetQuery();
        this.query.statusId = null;
        let ct = param.split('_');
        switch(ct[0]){
          case 'type':
            this.query.typeId = ct[1];
            break;
          case 'status':
            this.query.statusId = ct[1];
            break;
          case 'template':
            this.query.isTemplate = '1';
            break;
          case 'myYuAn':
            this.query.isMyYuAn = true;
            break;
          case 'myStatus':
            this.query.isMyYuAn = true;
            this.query.statusId = ct[1];
            break;
          case 'search':
            this.query.searchContent = param.substring(param.indexOf('_')+1);
            break;
          default:
            console.log('no search');
        }
        this.getEventDataList();
      },
      handleSelectChange(val){
        let param = 'status_' + val;
        this.searchEventData(param);
      },
      searchDataByContent(val,e){
        let param = 'search_' + val;
        this.searchEventData(param);
      },
      onShowSizeChange(pageNO,pageSize){
        console.log('onShowSizeChange',pageNO,pageSize);
        this.getTuAnDataList();
      },
      onPageNoChange(pageNO,pageSize){
        console.log('onPageNoChange',pageNO,pageSize);
        this.getTuAnDataList();
      },
      /***************************事件查询区 end****************************/
      addNewEvent(){
        console.log('addNewEvent click');
        this.yuAnId = '';
        this.dialogTitle = '新增预案';
        this.addYuAnDialogVisible = true;
      },

      /***************************对已有预案的操作 start****************************/
      editYuAn(id){
        this.yuAnId = id;
        this.dialogTitle = '编辑预案';
        this.addYuAnDialogVisible = true;
      },

      setYuAn(item){
        this.setEmergencyYuAnToTemplate({id:item.id}).then((res)=>{
          if(item.isTemplate==='0'){
            item.isTemplate = '1';
          }
          else{
            item.isTemplate = '0';
          }

        });
      },

      deleteYuAn(id,index){
        let _this = this;
        this.$confirm({
          title: '確定删除这个预案吗?',
          content: '删除后不可恢复',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            _this.deleteEmergencyYuAn({id: id}).then((res)=>{
              _this.getTuAnDataList();
            });

          },
          onCancel() {

          },
        });
      },
      toMonitorPage(item){
        this.$router.push(
          {
            path:'/emergency',
            query:{
              yuAnId: item.id
            }
          }
        )
      },
      /*******************查看详情+审核 start*************************/
      openInfoDialog(item){
        console.log('openInfoDialog',item);
        this.yuAnId = item.id;
        this.yuAnInfoDialogVisible = true;
      },
      /********************查看详情+审核 end************************/

    },
  }
</script>
<style lang="scss" scoped>
  .page {
    width: 100%;
    height: 100%;
    background-color: #f4f4f5;
    padding: 70px 10px 10px 10px;
    ::v-deep.ant-select-selection {
      width: 120px;
    }
  }
  .event_list_panel {
    width: 100%;
    height: 100%;
    box-shadow: 1px 0px 8px 3px rgba(4, 39, 77, 0.06);
    border-radius: 5px;
    overflow: hidden;
    .event_list_panel_header {
      width: 100%;
      height: 60px;
      background-color: #ffffff;
      // box-shadow: 1px 0px 8px 3px rgba(4, 39, 77, 0.06);
      // border-radius: 5px;
      box-sizing: border-box;
      z-index: 5;
      border-bottom: 2px solid #028efc;
      .ant-btn-primary {
        .anticon {
          font-size: 22px;
        }
        .anticon-plus-circle {
          font-size: 26px;
        }
      }

      .search_btn_panel {
        button {
          font-weight: 600;
          margin-left: 10px;
          .anticon-paper-clip {
            font-size: 22px;
          }
        }
        .templateBtn {
          color: #40a9ff;
          border-color: #40a9ff;
          ::v-deep.anticon-alert {
            font-size: 16px;
            color: #40a9ff;
          }
        }
      }
      .operate_panel {
        .text {
          width: 60px;
          display: inline-block;
        }
        > * {
          margin-right: 10px;
        }
        button:last-child {
          margin-left: 10px;
        }
      }
      .review {
        margin-right: 0;
        .ant-badge {
          margin-left: 0;
        }
        ::v-deep.anticon-bell {
          font-size: 14px;
        }
      }
      .addfiles {
        color: #fff;
        border: none;
        font-weight: 600;
        background-image: linear-gradient(90deg, #f79378 0%, #f77f6e 50%, #f76a63 100%);
        ::v-deep.anticon-plus-circle {
          padding-top: 2px;
          font-size: 16px;
        }
      }
    }
    .loading,
    .no-data {
      width: 100%;
      height: calc(100% - 140px);
    }
    .event_list_content {
      width: 100%;
      height: calc(100% - 120px);
      background-color: rgba(254, 254, 255, 0.67);
        padding: 0px 13px;
        .event_list_content-operate{
            width: 100%;
           height: 50px;
            .btn_opt{
                border: solid 1px #1890ff;
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                color: #1890ff;
                /deep/ span{
                    margin-left: 4px;
                }
                &.btn_delete{

                }
                &.btn_export{
                    margin-left: 20px;
                }
            }
        }
        .main-table-panel{
            flex:1;
            border-radius: 5px;
            border: solid 1px #e5e5e5;
            overflow: hidden;
            ul {
                margin: 0px;
                padding: 0px;
                li {
                    margin: 0px;
                    padding: 0px;
                    height: 40px;
                    background-color: #ffffff;
                    span {
                        text-align: center;
                        &:nth-child(1) {
                            width: 60px;
                        }

                        &:nth-child(2) {
                            flex: 1;
                        }

                        &:nth-child(3) {
                            width: 100px;
                        }

                        &:nth-child(4) {
                            width: 200px;
                        }

                        &:nth-child(5) {
                            flex: 1;
                        }

                        &:nth-child(6) {
                            flex: 1;
                        }

                        &:nth-child(7) {
                            width: 120px;
                        }

                        &:nth-child(8) {
                            width: 140px;
                        }
                    }
                }
            }
            .main-table-header{
                height: 40px;
                li{
                    background-color: #d8ebfd;
                    span{
                        font-family: PingFang-SC-Bold;
                        font-size: 16px;
                        letter-spacing: 1px;
                        color: #5d6d92;
                    }
                }
            }
            .main-table-tbody{
                height: calc(100% - 40px);
                li{
                    .btn_mini{
                        width: 40px;
                        height: 22px;
                        line-height: 22px;
                        border-radius: 4px;
                        font-family: PingFang-SC-Medium;
                        font-size: 12px;
                        letter-spacing: 1px;
                        color: #ffffff;
                        text-align: center;
                        padding: 0px 6px;
                        font-style: normal;
                        &.btn_look{
                            background-color: #1eae80;
                        }
                        &.btn_handle{
                            margin-left: 10px;
                            background-color: #1890ff;
                        }
                    }
                }
                li:nth-child(2n){
                    background-color: #f2f5fd;
                }
            }
        }
    }
    .pagination {
      height: 60px;
      width: 100%;
      text-align: right;
      background-color: #fff;
      // border-radius: 5px;
      // box-shadow: 1px 0px 8px 3px rgba(4, 39, 77, 0.06);
      z-index: 5;
    }
    ::v-deep.ant-badge-count {
      top: -15px;
    }
  }
</style>
<style lang="scss">
  .ant-modal-footer {
    text-align: center;
  }
  .ant-tag {
    margin-bottom: 5px;
  }
</style>
