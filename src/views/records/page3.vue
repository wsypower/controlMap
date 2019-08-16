<template>
  <div class="page">
    <div class="yuan_list_panel" flex="dir:top">
      <div class="yuan_list_panel_header" flex="cross:center main:justify">
        <div class="search_btn_panel">
          <a-button icon="paper-clip" type="primary" @click="searchYuAnData('type_01')">一级预案</a-button>
          <a-button icon="paper-clip" type="primary" @click="searchYuAnData('type_02')">二级预案</a-button>
          <a-button icon="paper-clip" type="primary" @click="searchYuAnData('type_03')">三级预案</a-button>
          <a-button class="templateBtn" @click="searchYuAnData('template_0')">
            <a-icon type="alert" theme="twoTone" />预案模板
          </a-button>
        </div>
        <div class="operate_panel" flex="dir:left cross:center">
          <a-select v-model="query.statusId" @select="handleSelectChange">
            <a-select-option value="">全部</a-select-option>
            <a-select-option v-for="(item,index) in statusList" :value="item.id" :key="index">{{item.name}}</a-select-option>
          </a-select>
          <a-input-search v-model="query.searchContent" placeholder="请输入关键字" @search="searchDataByContent"/>
          <a-button type="primary" icon="user" @click="searchYuAnData('myYuAn_true')" flex="cross:center">我的预案</a-button>
          <a-button type="primary" icon="bell" class="review" @click="searchYuAnData('myStatus_02')">
            <a-badge :count="countForMyToCheck">
              <span class="text">待审核</span>
            </a-badge>
          </a-button>
          <a-button class="addfiles" icon="plus-circle" @click="addNewYuAn" flex="cross:center">新增预案</a-button>
        </div>
      </div>
      <div class="loading yuan_list_content" v-if="dataLoading" flex="main:center cross:center">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <div class="yuan_list_content" v-if="!dataLoading&&yuanDataList.length>0">
        <cg-container scroll>
          <div class="content_panel" flex="main:justify">
            <div v-for="(item, index) in yuanDataList" :key="item.id" class="item" flex="dir:top box:justify cross:center">
              <div class="item__header" flex="cross:center box:first">
                <div class="avatar"></div>
                <a-tooltip placement="topLeft" :title="item.name">
                  <div class="item__header__name">{{item.name}}</div>
                </a-tooltip>
              </div>
              <div class="item__content" flex="dir:top box:last">
                <div class="item__content__t">
                  <div>
                    <span>
                      <a-icon type="smile" theme="twoTone" style="marginRight:-2px" />创建人
                    </span>
                    <span>：</span>{{item.creator}}
                  </div>
                  <div>
                    <span>
                      <a-icon type="security-scan" theme="twoTone" style="marginRight:-2px" />审核人
                    </span>
                    <span>：</span>{{item.reviewUserName}}
                  </div>
                  <div>
                    <span>
                      <a-icon type="dashboard" theme="twoTone" style="marginRight:3px" />保障时间
                    </span>
                    <span>：</span>
                    <span>{{new Date(item.startDayTime)|date_format('YYYY-MM-DD')}}~{{new Date(item.endDayTime)|date_format('YYYY-MM-DD')}}</span>
                  </div>
                </div>
                <div class="item__content__b" flex="dir:left cross:center main:justify">
                  <div class="item__content__b_left">
                    <span v-if="item.statusId=='01'" class="status blue" flex="cross:center">
                      <a-icon type="info-circle" theme="filled" style="fontSize:12px;transform:scale(0.9);marginRight:3px"/>待提交
                    </span>
                    <span v-if="item.statusId=='02'" class="status blue">
                      <a-icon type="pause-circle" theme="filled" style="fontSize:12px;transform:scale(0.9);marginRight:3px"/>待审核
                    </span>
                    <span v-if="item.statusId=='03'" class="status blue">
                      <a-icon type="check-circle" theme="filled" style="fontSize:12px;transform:scale(0.9);marginRight:3px"/>已通过
                    </span>
                    <span v-if="item.statusId=='04'" class="status blue">
                      <a-icon type="close-circle" theme="filled" style="fontSize:12px;transform:scale(0.9);marginRight:3px"/>已驳回
                    </span>
                    <span v-if="item.statusId=='05'" class="status yellow">
                      <a-icon type="minus-circle" theme="filled" style="fontSize:12px;transform:scale(0.9);marginRight:3px"/>未开始
                    </span>
                    <span v-if="item.statusId=='06'" class="status green">
                      <a-icon type="clock-circle" theme="filled" style="fontSize:12px;transform:scale(0.9);marginRight:3px"/>进行中
                    </span>
                    <span v-if="item.statusId=='07'" class="status grey">
                      <a-icon type="check-circle" theme="filled" style="fontSize:12px;transform:scale(0.9);marginRight:3px"/>已结束
                    </span>
                    <span v-if="item.statusId=='08'" class="status red">
                      <a-icon type="warning" theme="filled" style="fontSize:12px;transform:scale(0.9);marginRight:3px"/>已逾期作废
                    </span>
                  </div>
                  <div class="item__content__b_right" flex="main:justify">
                    <!-- 实时监测 -->
                    <a-tooltip placement="top" title="实时监测" v-if="item.statusId=='06'">
                      <span @click="toMonitorPage(item)" class="detection fileButton" style="background:#FDE2E2" flex="cross:center main:center">
                        <a-icon type="alert" theme="filled" style="color:#F96A6A" />
                      </span>
                    </a-tooltip>
                  </div>
                </div>
              </div>
              <div class="item__footer" flex="box:mean cross:center">
                <!-- 详情 -->
                <div class="footer_item" flex="cross:center main:center" @click="openInfoDialog(item)">
                  <a-icon type="align-center" style="marginTop:-1px"/>详情
                </div>
                <!-- 编辑 -->
                <div class="footer_item" flex="cross:center main:center"
                     v-if="item.creatorid == userId&&((item.statusId!='02'&&item.statusId<'05') || item.statusId=='08')" @click="editYuAn(item.id)">
                  <a-icon type="edit" />编辑
                </div>
                <!-- 模板 -->
                <div class="footer_item" flex="cross:center main:center"
                     v-if="item.isTemplate==='0'" @click="setYuAn(item)">
                  <a-icon type="heart" theme="filled" />模板
                </div>
                <div class="footer_item" flex="cross:center main:center"
                     v-else @click="setYuAn(item)">
                  <a-icon type="heart" style="color: #FFB5C5;" theme="filled"/>模板
                </div>
                <!-- 删除 -->
                <div class="footer_item" flex="cross:center main:center"
                     v-if="item.creatorid == userId&&item.statusId!='02'&&item.statusId!='06'" @click="deleteYuAn(item.id,index)">
                  <a-icon type="delete" style="marginTop:-1px"/>删除
                </div>
              </div>
            </div>
            <!--<div v-for="(item, index) in yuanDataList" :key="item.id" class="item">-->
              <!--<div class="top"></div>-->
              <!--<div class="item_tool_panel" v-if="item.creatorid == userId">-->
                <!--<a-icon v-if="(item.statusId!='02'&&item.statusId<'05') || item.statusId=='08'" type="edit" @click="editYuAn(item.id)"/>-->

                <!--<a-icon v-if="item.isTemplate==='0'" type="heart" color="#fe7a83" @click="setYuAn(item)"/>-->
                <!--<a-icon v-else type="heart" theme="filled" @click="setYuAn(item)"/>-->
                <!--<a-icon v-if="item.statusId!='02'&&item.statusId!='06'" type="delete" @click="deleteYuAn(item.id,index)"/>-->
              <!--</div>-->
              <!--<div class="show_content_panel">-->
                <!--<div><span>名称</span><span>：</span>{{item.name}}</div>-->
                <!--<div><span>创建人</span><span>：</span>{{item.creator}}</div>-->
                <!--<div><span>保障时间</span><span>：</span>{{new Date(item.startDayTime)|date_format('YYYY-MM-DD HH:mm')}}~{{new Date(item.endDayTime)|date_format('YYYY-MM-DD HH:mm')}}</div>-->
                <!--<div>-->
                  <!--<span>状态</span><span>：</span>-->
                  <!--<span v-if="item.statusId=='01'" class="status blue">待提交</span>-->
                  <!--<span v-if="item.statusId=='02'" class="status blue">待审核</span>-->
                  <!--<span v-if="item.statusId=='03'" class="status blue">已通过</span>-->
                  <!--<span v-if="item.statusId=='04'" class="status blue">已驳回</span>-->
                  <!--<span v-if="item.statusId=='05'" class="status yellow">未开始</span>-->
                  <!--<span v-if="item.statusId=='06'" class="status green">进行中</span>-->
                  <!--<span v-if="item.statusId=='07'" class="status grey">已结束</span>-->
                  <!--<span v-if="item.statusId=='08'" class="status red">已逾期作废</span>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="item_operate_panel" flex="dir:left cross:center main:center">-->
                <!--<span @click="openInfoDialog(item)">方案详情</span>-->
                <!--<span v-if="item.statusId=='006'" @click="toMonitorPage(item)">实时监测</span>-->
              <!--</div>-->
            <!--</div>-->
            <div v-for="i in buWeiNum" :key="i" class="no_use"></div>
          </div>
        </cg-container>
      </div>
      <div class="no-data yuan_list_content" flex="main:center cross:center" v-if="!dataLoading&&yuanDataList.length===0">
        <img src="~@img/zanwuyuan.png" />
      </div>

      <div class="pagination">
        <a-pagination :showTotal="total => `总共 ${total} 条`"
                      :pageSize.sync="query.pageSize"
                      @showSizeChange="onShowSizeChange"
                      @change="onPageNoChange"
                      :total="totalSize"
                      v-model="query.pageNo"/>
      </div>
    </div>
    <add-edit-dialog :visible.sync="addYuAnDialogVisible" :dialogTitle="dialogTitle" :yuAnId="yuAnId" @refreshList="getTuAnDataList"></add-edit-dialog>
    <yu-an-info-and-review-dialog :visible.sync="yuAnInfoDialogVisible" :yuAnId="yuAnId" @refreshList="getTuAnDataList"></yu-an-info-and-review-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import dayjs from 'dayjs'
  import util from '@/utils/util'
  import AddEditDialog from './components/AddEditDialog'
  import YuAnInfoAndReviewDialog from './components/YuAnInfoAndReviewDialog'
  import { mapActions } from 'vuex'

  export default {
    name: 'page3',
    components:{
      AddEditDialog,
      YuAnInfoAndReviewDialog
    },
    data() {
      return {
        userId: '',
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
          pageSize: 10
        },
        yuanDataList:[],
        buWeiNum: 0,
        countOneRow: 0,
        totalSize: 0,

        addYuAnDialogVisible: false,
        dialogTitle: '新增预案',
        yuAnId: '',
        yuAnInfoDialogVisible: false,
      }
    },
    created(){
      this.userId = util.cookies.get('userId');
    },
    mounted(){
      let _this = this;
      this.setBaseData();
      window.onresize = function(){
        _this.setBaseData();
      }
      this.getStatusDataList().then((res)=>{
        console.log('getStatusDataList',res);
        this.statusList = res;
      });
      this.getCountForMyToCheck({userId: this.userId}).then((res)=>{
        this.countForMyToCheck = res;
      });
      this.getTuAnDataList();
    },
    watch:{
      countOneRow:function(val){
        let n = this.yuanDataList.length%val;
        this.buWeiNum = n==0? 0 : val - n;
      }
    },
    methods: {
      ...mapActions('emergency/common', ['getStatusDataList']),
      ...mapActions('emergency/emergency', ['getCountForMyToCheck',
        'getEmergencyYuAnDataList','deleteEmergencyYuAn','setEmergencyYuAnToTemplate']),
      /***************************预案查询区 start****************************/
      setBaseData(){
        let clientWidth =  document.body.clientWidth;
        if(clientWidth<1600){
          this.query.pageSize = 15;
          this.countOneRow = 5;
        }
        if(clientWidth>=1600&&clientWidth<=1800){
          this.query.pageSize = 18;
          this.countOneRow = 6;
        }
        if(clientWidth>1800){
          this.query.pageSize = 21;
          this.countOneRow = 7;
        }
      },
      resetQuery(){
        let pageSize = this.query.pageSize;
        this.query = Object.assign({}, this.$options.data().query);
        this.query.pageSize = pageSize;
        console.log('resetQuery',this.query);
      },

      getTuAnDataList(){
        this.dataLoading = true;
        console.log('this.query',this.query);
        this.getEmergencyYuAnDataList(this.query).then((res)=>{
          this.yuanDataList = res.list;
          this.totalSize = res.total;
          if(this.query.pageNo == Math.ceil(this.totalSize/this.query.pageSize)){
            let n = this.yuanDataList.length%this.countOneRow;
            this.buWeiNum = n==0? 0 : this.countOneRow - n;
          }
          this.dataLoading = false;
        })
      },
      searchYuAnData(param){
        this.resetQuery();
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
        this.getTuAnDataList();
      },
      handleSelectChange(val){
        let param = 'status_' + val;
        this.searchYuAnData(param);
      },
      searchDataByContent(val,e){
        let param = 'search_' + val;
        this.searchYuAnData(param);
      },
      onShowSizeChange(pageNO,pageSize){
        console.log('onShowSizeChange',pageNO,pageSize);
        this.getTuAnDataList();
      },
      onPageNoChange(pageNO,pageSize){
        console.log('onPageNoChange',pageNO,pageSize);
        this.getTuAnDataList();
      },
      /***************************预案查询区 end****************************/
      addNewYuAn(){
        console.log('addNewYuAn click');
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
    /deep/.ant-select-selection {
      width: 120px;
    }
  }
  .yuan_list_panel {
    width: 100%;
    height: 100%;
    box-shadow: 1px 0px 8px 3px rgba(4, 39, 77, 0.06);
    border-radius: 5px;
    overflow: hidden;
    .yuan_list_panel_header {
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
          /deep/.anticon-alert {
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
        /deep/.anticon-bell {
          font-size: 14px;
        }
      }
      .addfiles {
        color: #fff;
        border: none;
        font-weight: 600;
        background-image: linear-gradient(90deg, #f79378 0%, #f77f6e 50%, #f76a63 100%);
        /deep/.anticon-plus-circle {
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
    .yuan_list_content {
      width: 100%;
      height: calc(100% - 120px);
      // margin-top: 10px;
      // padding-top: 10px;
      position: relative;
      background-color: rgba(254, 254, 255, 0.67);
      .content_panel {
        display: flex;
        flex-flow: row wrap;
        padding: 20px;
        .no_use{
          width: 240px;
          height: 200px;
          margin-bottom: 25px;
          background-color: transparent;
        }
        .item {
          width: 240px;
          height: 200px;
          // margin-right: 10px;
          margin-bottom: 25px;
          background-color: #ffffff;
          border-radius: 6px;
          position: relative;
          box-shadow: 0px 3px 4px 3px #e1e9f5ad;
          cursor: pointer;
          overflow: hidden;

          .item__header {
            width: 100%;
            height: 40px;
            // background-color: red;
            padding: 0 10px;
            .avatar {
              width: 25px;
              height: 25px;
              background: url('~@/assets/images/Headpic@3x.png') no-repeat;
              background-size: 100%;
            }
            .item__header__name {
              // font-family: 'titleFont';
              font-size: 15px;
              padding-left: 10px;
              font-weight: 550;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .item__content {
            width: 100%;
            padding: 0 10px;
            .item__content__t {
              width: 100%;
              // background-color: red;
              padding: 10px 5px 0px 5px;
              font-size: 12px;
              color: #747272;
              div {
                span:first-child {
                  display: inline-block;
                  width: 64px;
                  height: 24px;
                  vertical-align: top;
                  text-align: justify;
                  &::after {
                    display: inline-block;
                    width: 100%;
                    content: '';
                    height: 0;
                  }
                }
              }
            }
            .item__content__b {
              width: 100%;
              padding: 0 5px;
              // background-color: rgb(153, 0, 255);
              font-size: 12px;
              height: 40px;
              .fileButton {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background-color: red;
              }
              .status {
                display: inline-block;
                padding: 2px 8px;
                color: #ffffff;
                text-align: center;
                /* height: 18px; */
                border-radius: 6px;
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
            }
          }
          .item__footer {
            width: 100%;
            height: 40px;
            border-top: 2px solid #f2f2f4;
            .footer_item {
              height: 100%;
              font-size: 12px;
              color: rgb(148, 147, 147);
              .anticon {
                margin-right: 5px;
              }
              &:hover {
                background-color: #ebf7fd;
                color: #00a4fe;
              }
            }
          }
          .top {
            height: 5px;
            width: 100%;
            // background-color: #00a4fe;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            opacity: 0;
          }
          .item_tool_panel {
            position: absolute;
            right: 10px;
            top: 8px;
            display: none;
            i {
              margin-left: 10px;
              cursor: pointer;
              &:hover {
                color: #fe7a83;
              }
            }
          }
          .show_content_panel {
            width: 100%;
            padding: 15px;
            // padding: 25px 5px 30px 20px;
            // height: 100%;
            > div {
              span:first-child {
                display: inline-block;
                width: 60px;
                height: 24px;
                vertical-align: top;
                text-align: justify;
                &::after {
                  display: inline-block;
                  width: 100%;
                  content: '';
                  height: 0;
                }
              }
              .status {
                display: inline-block;
                padding: 0px 8px;
                height: 12px;
                line-height: 18px;
                font-size: 14px;
                color: #ffffff;
                text-align: center;
                border-radius: 6px;
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
            }
          }
          .item_operate_panel {
            // position: absolute;
            // bottom: 0px;
            width: 100%;
            height: 40px;
            border-top: 2px solid #f4f4f5;
            justify-content: space-around;
            /*opacity: 0;*/
            // display: none;
            background-color: #fff;
            color: #00a4fe;
            .anticon {
              font-size: 15px;
              margin-right: 5px;
            }
            .file__details {
              .anticon {
                font-size: 15px;
                margin-right: 5px;
                padding-top: 3px;
              }
            }
            span {
              cursor: pointer;
              &:hover {
                color: #00a4fe;
              }
            }
            .detection {
              color: #fe7a83;
            }
          }
          &:hover {
            .top {
              opacity: 1;
            }
            .item_tool_panel {
              display: block;
            }
            .item_operate_panel {
              display: flex;
            }
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
    /deep/.ant-badge-count {
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
