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
          <a-button type="primary" icon="user" @click="searchEventData('myEvent_true')" flex="cross:center">我的事件</a-button>
          <a-button type="primary" icon="file-sync" class="review" @click="searchEventData('myStatus_02')">
            <a-badge :count="countForMyToHandle">
              <span class="text">待处理</span>
            </a-badge>
          </a-button>
          <a-button v-if="userType==='cjy'" class="addfiles" icon="plus-circle" @click="addNewEvent" flex="cross:center">新增事件</a-button>
        </div>
      </div>
      <div class="loading event_list_content" v-if="dataLoading" flex="main:center cross:center">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <div class="event_list_content" v-if="!dataLoading&&eventDataList.length>0" flex="dir:top">
          <div class="event_list_content-operate" flex="dir:left cross:center main:right">
              <a-button v-if="userType!=='zybm'" class="btn_opt btn_delete"><a-icon type="delete" @click="deleteEvents"/>批量删除</a-button>
              <a-button class="btn_opt btn_export"><a-icon type="export" @click="exportEvents('part')"/>批量导出</a-button>
              <a-button class="btn_opt btn_export"><a-icon type="export" @click="exportEvents('all')"/>全部导出</a-button>
          </div>
          <div class="main-table-panel">
              <ul class="main-table-header">
                  <li flex="cross:center">
                      <span><a-checkbox :checked="checkedAll" @change="checkAll"></a-checkbox></span>
                      <span>事件名称</span>
                      <span>事件类型</span>
                      <span>保障时间</span>
                      <span>审核进度</span>
                      <span>处理状态</span>
                      <span>操作</span>
                      <span v-if="userType!=='zybm'">是否设置为模版</span>
                      <span v-else>是否为模版</span>
                  </li>
              </ul>
              <ul class="main-table-tbody">
                  <my-scroll>
                      <li v-for="item in eventDataList" :key="item.id" flex="cross:center">
                          <span><a-checkbox :checked="item.checked" @change="checkHandle(item)"></a-checkbox></span>
                          <span>{{item.name}}</span>
                          <span>{{item.typeName}}</span>
                          <span>
                              {{new Date(item.startDayTime)|date_format('YYYY-MM-DD HH:mm:ss')}}
                              ~
                              {{new Date(item.endDayTime)|date_format('YYYY-MM-DD HH:mm:ss')}}
                          </span>
                          <span>{{item.processName}}</span>
                          <span>{{item.statusName}}</span>
                          <span>
                              <i class="btn_mini btn_look" @click="lookEvent(item.id)">查看</i>
                              <i class="btn_mini btn_handle" @click="editEvent(item.id)">处置</i>
                          </span>
                          <span v-if="userType!=='zybm'">
                              <a-icon v-if="item.processId==='008'&&!item.isTemplate" type="star" @click="setTemplate(item)"/>
                              <a-icon v-if="item.processId==='008'&&item.isTemplate" type="star" theme="filled" style="color: #ffb94c;" @click="setTemplate(item)"/>
                          </span>
                          <span v-else>
                              <a-icon v-if="item.isTemplate" type="star" theme="filled" style="color: #ffb94c;"/>
                          </span>
                      </li>
                      <li v-if="needFixedRowNum>0" v-for="i in needFixedRowNum" :key="i"></li>
                  </my-scroll>
              </ul>
          </div>
      </div>
      <div class="no-data event_list_content" flex="main:center cross:center" v-if="!dataLoading&&eventDataList.length===0">
        <img src="~@img/zanwuyuan.png" />
      </div>

      <div class="pagination" flex="cross:center main:justify">
        <div style="color:#ff0000bd;">备注：表头上复选框全选代表当前页的全选</div>
        <a-pagination :showTotal="total => `总共 ${total} 条`"
                      :pageSize.sync="query.pageSize"
                      @change="onPageNoChange"
                      :total="totalSize"
                      v-model="query.pageNo"/>
      </div>
    </div>
    <add-edit-look-dialog :visible.sync="addEventDialogVisible"
                          :dialogTitle="dialogTitle"
                          :eventId="eventId"
                          :optType="optType"
                          @refreshList=""></add-edit-look-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import util from '@/utils/util'
  import AddEditLookDialog from './components/AddEditLookDialog'
  import { mapActions } from 'vuex'

  export default {
    name: 'index',
    components:{
      AddEditLookDialog
    },
    data() {
      return {
        statusList:[],
        countForMyToHandle: 0,
        dataLoading: false,
        query:{
          typeId:'',
          statusId: '',
          isTemplate: false,
          isMyEvent: false,
          searchContent: '',
          pageNo: 1,
          pageSize: 12
        },
        eventDataList:[],
        totalSize: 0,
        //需要补齐的剩余行
        needFixedRowNum: 0,
        //全选
        checkedAll: false,
        addEventDialogVisible: false,
        dialogTitle: '新增事件',
        eventId: '',
      }
    },
    computed:{
      userId(){
        return util.cookies.get('userId');
      },
      userType(){
        return this.$store.getters['cgadmin/user/type']
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
      this.getToHandleCount();
      this.getEventDataList();

    },
    watch:{

    },
    methods: {
      ...mapActions('event/common', ['getStatusDataList']),
      ...mapActions('event/event', ['getToHandleCountData','getEventList','setEventToTemplate','deleteEventByIds']),
      //重置搜素条件
      resetQuery(){
        let pageSize = this.query.pageSize;
        this.query = Object.assign({}, this.$options.data().query);
        this.query.pageSize = pageSize;
        console.log('resetQuery',this.query);
      },
      //获取事件数据
      getEventDataList(){
        this.dataLoading = true;
        console.log('this.query',this.query);
        this.getEventList(this.query).then((res)=>{
          this.dataLoading = false;
          res.data.list.map(item => {
            item.checked = false;
            return item
          });
          this.eventDataList = res.data.list;
          this.totalSize = res.data.total;
          if(res.data.list.length<12){
            this.needFixedRowNum = this.query.pageSize - res.data.list.length;
          }
        })

      },
      //获取待处理的事件总数
      getToHandleCount(){
        let params = {
          userId: this.userId,
          isMyEvent: true,
          statusId: 1
        }
        this.getToHandleCountData(params).then((res)=>{
          console.log('view ToHandleCount', res);
          this.countForMyToHandle = res.data;
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
      // handleSelectChange(val){
      //   let param = 'status_' + val;
      //   this.searchEventData(param);
      // },
      //查询内容触发
      searchDataByContent(val,e){
        let param = 'search_' + val;
        this.searchEventData(param);
      },
      //换页触发
      onPageNoChange(pageNO,pageSize){
        console.log('onPageNoChange',pageNO,pageSize);
        this.query.pageNo = pageNO;
        this.getEventDataList();
      },
      //全选按钮触发
      checkAll(){
        this.checkedAll = !this.checkedAll;
        this.eventDataList.map(item => {
          item.checked = this.checkedAll;
        });
      },
      //点击某一行的复选框触发--实现与表头全选的联动
      checkHandle(item){
        console.log('checkHandle',item);
        item.checked = !item.checked;
        if(!item.checked){
          this.checkedAll = false;
        }
        else{
          let checkedNum = this.eventDataList.reduce((acc, item)=>{
            if(item.checked){
              acc = acc + 1;
            }
            return acc
          },0);
          if(checkedNum===this.eventDataList.length){
            this.checkedAll = true;
          }
          else{
            this.checkedAll = false;
          }
        }
      },
      //删除选中的事件
      deleteEvents(){
        let checkedIds = this.eventDataList.reduce((acc, item)=>{
          if(item.checked){
            acc.push(item.id);
          }
          return acc
        },[]);
        console.log('需要删除的事件有：' , checkedIds);
        let _this = this;
        if(checkedIds.length === 0){
          this.$message.warning('请选择需要删除的事件');
        }
        else{
            this.$confirm({
              title: '確定删除这些事件吗?',
              content: '删除后不可恢复',
              okText: '确定',
              okType: 'danger',
              cancelText: '取消',
              onOk() {
                _this.deleteEventByIds({ids:checkedIds}).then(res =>{
                  if(res.code === 0){
                    _this.$message.success('删除成功');
                    _this.getEventDataList();
                  }
                  else{
                    _this.$message.error(res.errmsg);
                  }
                });
              },
              onCancel() {

              },
            });
        }
      },
      //导出事件
      exportEvents(type){
        if(type === 'part'){
          let checkedIds = this.eventDataList.reduce((acc, item)=>{
            if(item.checked){
              acc.push(item.id);
            }
            return acc
          },[]);
          console.log('需要导出的事件有：' , checkedIds);
          if(checkedIds.length === 0){
            this.$message.warning('请选择需要导出的事件');
          }
          else{
            //window.open(URL_CONFIG.baseURL + '/emergencyplan/exportEventByIds?id=' + id);
          }
        }
        else{
          console.log('导出全部事件');
          //window.open(URL_CONFIG.baseURL + '/emergencyplan/exportEventByIds?id=' + id);
        }
      },
      //设置某个事件是否为模版
      setTemplate(item){
        item.isTemplate = !item.isTemplate;
        this.setEventToTemplate({id:item.id, isTemplate:item.isTemplate}).then(res => {
          if(res.code === 0){
            this.$message.success('设置成功');
          }
          else{
            this.$message.error(res.errmsg);
          }
        })
      },
      //新增事件
      addNewEvent(){
        console.log('addNewEvent click');
        this.eventId = '';
        this.optType = 'add';
        this.dialogTitle = '新增事件';
        this.addEventDialogVisible = true;
      },
      //处置事件
      editEvent(id){
        this.eventId = id;
        this.optType = 'edit';
        this.dialogTitle = '事件处置流程';
        this.addEventDialogVisible = true;
      },
      //查看事件
      lookEvent(id){
        this.eventId = id;
        this.optType = 'look';
        this.dialogTitle = '事件处置流程';
        this.addEventDialogVisible = true;
      }
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
                            width: 400px;
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
                            i{
                                cursor: pointer;
                            }
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
                        cursor: pointer;
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
      background-color: #fff;
      z-index: 5;
      padding: 0px 17px;
    }
    ::v-deep.ant-badge-count {
      top: -15px;
    }
    ::v-deep.ant-modal-footer {
      text-align: center;
    }
    ::v-deep.ant-tag {
      margin-bottom: 5px;
    }
  }
</style>
