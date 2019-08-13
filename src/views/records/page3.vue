<template>
  <div class="page">
    <div class="yuan_list_panel" flex="dir:top">
      <div class="yuan_list_panel_header" flex="cross:center main:justify">
        <div class="search_btn_panel">
          <a-button type="primary" @click="searchYuAnData('type_001')">一级预案</a-button>
          <a-button type="primary" @click="searchYuAnData('type_002')">二级预案</a-button>
          <a-button type="primary" @click="searchYuAnData('type_003')">三级预案</a-button>
          <a-button type="primary" @click="searchYuAnData('template_true')">预案模板</a-button>
        </div>
        <div class="operate_panel" flex="dir:left cross:center">
          <a-select v-model="query.statusId" @select="handleSelectChange">
            <a-select-option value="">全部</a-select-option>
            <a-select-option v-for="(item,index) in statusList" :value="item.id" :key="index">{{item.name}}</a-select-option>
          </a-select>
          <a-input-search v-model="query.searchContent" placeholder="请输入关键字" @search="searchDataByContent"/>
          <a-button type="primary" @click="searchYuAnData('myYuAn_true')">我的预案</a-button>
          <a-button type="primary" @click="searchYuAnData('myStatus_002')">
            <a-badge count="5">
              <span class="text">待审核</span>
            </a-badge>
          </a-button>
          <a-button type="primary" icon="plus" @click="addNewYuAn">新增预案</a-button>
        </div>
      </div>
      <div class="loading" v-if="dataLoading" flex="main:center cross:center">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <div class="yuan_list_content" v-if="!dataLoading&&yuanDataList.length>0">
        <cg-container scroll>
          <div class="content_panel">
            <div v-for="(item, index) in yuanDataList" :key="index" class="item">
            <div class="top"></div>
            <div class="item_tool_panel">
              <a-icon v-if="item.statusId<'005' || item.statusId=='008'" type="edit" @click="editYuAn(item)"/>
              <a-icon v-if="item.isTemplate" type="heart" theme="filled" @click="setYuAn(item)"/>
              <a-icon v-else type="heart" @click="setYuAn(item)"/>
              <a-icon v-if="item.statusId!='006'" type="delete" @click="deleteYuAn(item.id,index)"/>
            </div>
            <div class="show_content_panel">
              <div><span>名称：</span>{{item.name}}</div>
              <div><span>创建人：</span>{{item.creator}}</div>
              <div><span>保障时间：</span>{{new Date(item.startDayTime)|date_format('YYYY-MM-DD HH:mm')}}~{{new Date(item.endDayTime)|date_format('YYYY-MM-DD HH:mm')}}</div>
              <div>
                <span>状态：</span>
                <span v-if="item.statusId=='001'" class="status blue">待提交</span>
                <span v-if="item.statusId=='002'" class="status blue">待审核</span>
                <span v-if="item.statusId=='003'" class="status blue">已通过</span>
                <span v-if="item.statusId=='004'" class="status blue">已驳回</span>
                <span v-if="item.statusId=='005'" class="status yellow">未开始</span>
                <span v-if="item.statusId=='006'" class="status green">进行中</span>
                <span v-if="item.statusId=='007'" class="status grey">已结束</span>
                <span v-if="item.statusId=='008'" class="status red">已逾期作废</span>
              </div>
            </div>
            <div class="item_operate_panel" flex="dir:left cross:center main:center">
              <span @click="openInfoDialog(item)">方案详情</span>
              <span v-if="item.statusId=='006'" @click="toMonitorPage(item)">实时监测</span>
            </div>
          </div>
          </div>
        </cg-container>
      </div>
      <div class="no-data" flex="main:center cross:center" v-if="!dataLoading&&yuanDataList.length===0">
        <img src="~@img/zanwuyuan.png" />
      </div>

      <div class="pagination">
        <a-pagination :showTotal="total => `总共 ${total} 条`"
                      showSizeChanger
                      :pageSize.sync="query.pageSize"
                      @showSizeChange="onShowSizeChange"
                      @change="onPageNoChange"
                      :total="totalSize"
                      v-model="query.pageNo"/>
      </div>
    </div>
    <add-edit-dialog :visible.sync="addYuAnDialogVisible" :dialogTitle="dialogTitle" :yuAnForm="yuAnForm"></add-edit-dialog>
    <yu-an-info-and-review-dialog :visible.sync="yuAnInfoDialogVisible"></yu-an-info-and-review-dialog>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
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
        statusList:[],
        dataLoading: false,
        query:{
          typeId:'',
          statusId: '',
          isTemplate: false,
          isMyYuAn: false,
          searchContent: '',
          pageNo: 1,
          pageSize: 10
        },
        yuanDataList:[],
        totalSize: 0,

        addYuAnDialogVisible: false,
        dialogTitle: '新增预案',
        yuAnForm:{
          name: '',
          typeId: '',
          startDay: '',
          endDay: '',
          description: '',
          jobGoal: '',
          jobAssignment: '',
          jobContent: '',
          jobRequirements: '',
          groupData: [{
            key: 'azxcvbnm',
            groupName: '',
            personList: []
          }]
        },

        yuAnInfoDialogVisible: false,
      }
    },

    mounted(){
      this.getStatusDataList().then((res)=>{
        console.log('getStatusDataList',res);
        this.statusList = res.data;
      });
      this.getTuAnDataList();
    },
    methods: {
      ...mapActions('emergency/common', ['getStatusDataList']),
      ...mapActions('emergency/emergency', ['getEmergencyYuAnDataList','deleteEmergencyYuAn','setEmergencyYuAnToTemplate']),
      /***************************预案查询区 start****************************/
      resetQuery(){
        this.query = Object.assign({}, this.$options.data().query);
        console.log('resetQuery',this.query);
      },

      getTuAnDataList(){
        this.dataLoading = true;
        console.log('this.query',this.query);
        this.getEmergencyYuAnDataList(this.query).then((res)=>{
          this.yuanDataList = res.data;
          this.totalSize = res.total;
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
            this.query.isTemplate = true;
            break;
          case 'myYuAn':
            this.query.isMyYuAn = true;
            break;
          case 'myStatus':
            this.query.isMyYuAn = true;
            this.query.statusId = ct[1];
            break;
          case 'search':
            let content = param.substring(param.indexOf('_'));
            this.query.searchContent = content;
            break;
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
        this.dialogTitle = '新增预案';
        this.addYuAnDialogVisible = true;
      },

      /***************************对已有预案的操作 start****************************/
      editYuAn(item){
        this.yuAnForm.name = item.name;
        this.yuAnForm.typeId = item.typeId;
        this.yuAnForm.startDay = item.startDay;
        this.yuAnForm.endDay = item.endDay;
        this.yuAnForm.description = item.description;
        this.yuAnForm.jobGoal = item.jobGoal || 'jagsdjhgjdfhgsafjhskfhgdsf';
        this.yuAnForm.jobAssignment = item.jobAssignment;
        this.yuAnForm.jobContent = item.jobContent;
        this.yuAnForm.jobRequirements = item.jobRequirements;
        this.yuAnForm.groupData = [{
          key: 'azxcvbnm',
          groupName: '',
          personList: []
        }];
        this.dialogTitle = '编辑预案';
        this.addYuAnDialogVisible = true;
      },

      setYuAn(item){
        this.setEmergencyYuAnToTemplate({id:item.id}).then((res)=>{
          console.log(res);
          console.log('已设置为模板预案');
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
              console.log(res);
              _this.yuanDataList.splice(index,1);
            });

          },
          onCancel() {

          },
        });
      },
      toMonitorPage(item){
        // this.$router.push('/emergency?yuAnId=1452364');
        this.$router.push(
          {
            path:'/emergency',
            query:{
              yuAnId: item.id,
              mapIdList: item.mapIdList.join(',')
            }
          }
        )
      },
      /*******************查看详情+审核 start*************************/
      openInfoDialog(item){
        this.yuAnInfoDialogVisible = true;
      },
      /********************查看详情+审核 end************************/

    },
  }
</script>
<style lang="scss" scoped>
  .page{
    width: 100%;
    height: 100%;
    background-color: #f4f4f5;
    padding: 70px 10px 10px 10px;
    /deep/.ant-select-selection{
      width: 120px;
    }
  }
  .yuan_list_panel{
    width: 100%;
    height:100%;
    .yuan_list_panel_header{
      width: 100%;
      height: 60px;
      background-color: #ffffff;
      .search_btn_panel{
        button{
          margin-left: 10px;
        }
      }
      .operate_panel{
        .text{
          width: 60px;
          display: inline-block;
        }
        >*{
          margin-right: 10px;
        }
        button:last-child{
          margin-left: 10px;
        }
      }
    }
    .loading,.no-data{
      width: 100%;
      height: calc(100% - 160px);
    }
    .yuan_list_content{
      width: 100%;
      height: calc(100% - 100px);
      margin-top: 10px;
      position: relative;
      .content_panel {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        .item {
          width: 350px;
          height: 160px;
          margin-right: 10px;
          margin-bottom: 10px;
          border: 1px solid #eeeeee;
          background-color: #ffffff;
          position: relative;
          .top {
            height: 5px;
            width: 100%;
            background-color: #00a4fe;
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
                color: #00a4fe;
              }
            }
          }
          .show_content_panel {
            width: 100%;
            padding: 25px 5px 30px 20px;
            height: 100%;
            > div {
              span:first-child {
                display: inline-block;
                width: 80px;
                text-align: left;
                vertical-align: top;
              }
              .status {
                display: inline-block;
                padding: 0px 8px;
                height: 18px;
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
            position: absolute;
            bottom: 0px;
            width: 348px;
            height: 30px;
            border-top: 1px solid #cccccc;
            justify-content: space-around;
            /*opacity: 0;*/
            display: none;
            span {
              cursor: pointer;
              &:hover {
                color: #00a4fe;
              }
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
    .pagination{
      height: 40px;
      width:100%;
      text-align: right;
    }
  }

</style>
<style lang="scss">
  .ant-modal-footer{
    text-align: center;
  }
  .ant-tag{
    margin-bottom: 5px;
  }
</style>
