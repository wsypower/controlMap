<template>
  <div class="manage" flex="dir:top">
    <div class="search-panel">
      <div flex="fir:left cross:center" style="margin-bottom: 10px">
        <label style="width: 80px;">案卷状态：</label>
        <a-radio-group name="recordsStatus" v-model="query.statusId">
          <a-radio :value="1">超期</a-radio>
          <a-radio :value="2">紧急</a-radio>
          <a-radio :value="3">督办</a-radio>
        </a-radio-group>
      </div>
      <div flex="fir:left cross:center" style="margin-bottom: 10px">
        <label style="width: 80px;">查询时间：</label>
        <a-radio-group name="searchType" v-model="query.timeTypeId">
          <a-radio :value="1">今日</a-radio>
          <a-radio :value="2">本月</a-radio>
          <a-radio :value="3">历史</a-radio>
        </a-radio-group>
      </div>
      <div flex="fir:left cross:center" style="margin-bottom: 10px">
        <label style="width: 80px;">地&emsp;&emsp;区：</label>
        <a-cascader
          :options="addressData"
          @change="onChange"
          placeholder="街道/社区/网格"
          changeOnSelect
          style="width:80%;"
        />
      </div>
      <a-button type="primary" style="width: 100%" @click="onSearch">查询</a-button>
    </div>
    <div class="table_header">
      <span>查询结果</span>
    </div>
    <div class="content_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && dataList.length > 0">
        <div
          v-for="(itemData, index) in dataList"
          :key="index"
          class="item"
          flex
          @click="clickDataItem(index)"
          :class="{ active: activeIndex === index }"
        >
          <div class="item-left">
            <pin :content="index" :isActive="activeIndex === index"></pin>
          </div>
          <div class="item-right" flex="cross:center">
            <div class="description-panel">
              <div class="name-panel" :title="itemData.name">【{{ itemData.code }}】</div>
              <div flex>
                <span>类型：</span><span>{{ itemData.typeName }}</span>
              </div>
              <div flex>
                <span>描述：</span><span :title="itemData.description">{{ itemData.description }}</span>
              </div>
            </div>
            <div class="photo"><img :src="itemData.photoUrl" /></div>
          </div>
        </div>
        <div v-if="dataList.length > 20" class="pagination-panel">
          <a-pagination
            :total="totalSize"
            :showTotal="total => `共 ${total} 条`"
            :pageSize="20"
            :defaultCurrent="1"
            @change="changePagination"
          />
        </div>
      </cg-container>
      <div v-if="!showLoading && dataList.length == 0" class="nodata-panel" flex="main:center cross:center">
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <record-info ref="recordInfo" style="position:fixed; top: 100px;right:100px;" :code="code" @closeTip="closeTip"></record-info>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import Pin from '../../emergency/components/Position.vue';
import RecordInfo from './RecordInfo.vue';
export default {
  name: 'recordsManage',
  components:{
    Pin,
    RecordInfo
  },
  data(){
    return {
      //地区数据
      addressData: [],
      //各项查询条件
      query: {
        statusId: 1,
        timeTypeId: 1,
        address: [],
        pageNo: 1,
        pageSize: 20
      },
      //查询时的过渡效果
      showLoading: false,
      //单页数据
      dataList:[],
      //总数
      totalSize: 0,
      //目前激活的告警
      activeIndex: 0,
      //案卷编码
      code: ''
    }
  },
  mounted(){
    this.getAllAddressData().then(res=>{
      this.addressData = res.data;
    });
    this.getDataList();
  },
  methods:{
    ...mapActions('records/manage', ['getAllAddressData','getAllRecordsDataList']),
    //地区改变时触发
    onChange(val){
      console.log('onChange', val);
      this.query.address = val;
    },
    //获取人员轨迹数据
    getDataList(){
      console.log('this.query',this.query);
      this.showLoading = true;
      this.getAllRecordsDataList(this.query).then(res=>{
        this.showLoading = false;
        this.dataList = res.data.list;
        this.totalSize = res.data.total;
      });
    },
    //查询(默认显示当天，当前登入的用户)
    onSearch() {
      this.query.pageNo = 1;
      this.getDataList()
    },
    //翻页
    changePagination(pageNo, pageSize) {
      console.log('changePagination', pageNo, pageSize);
      this.query.pageNo = pageNo;
      this.getDataList()
    },
    clickDataItem(index){
      this.activeIndex = index;
      this.code = this.dataList[index].code.toString();
    },
    playVideo(videoSrc){
      this.videoSrc = videoSrc;
    },
    //关闭地图上的弹窗
    closeTip(){

    }
  }
}
</script>
<style lang="scss" scoped>
.manage {
  height: 100%;
  width: 100%;
  .search-panel {
    padding: 20px;
    ::v-deep.ant-radio-wrapper {
      width: 70px;
    }
  }
  .table_header {
    padding: 10px 20px 5px 20px;
    span {
      font-family: PingFang-SC-Heavy;
      font-size: 14px;
      letter-spacing: 0px;
      color: #2b90f3;
      &::after {
        content: '';
        border-bottom: 1px dashed #dddddd;
        margin-left: 10px;
        display: inline-block;
        width: 250px;
        vertical-align: middle;
      }
    }
  }
  .content_body {
    background-color: #ffffff;
    height: calc(100% - 70px);
    position: relative;
    .item {
      padding: 16px 20px 18px 20px;
      &:hover,
      &.active {
        background-color: #e9f6ff;
      }
      .item-left {
        width: 25px;
        height: 25px;
        .icon_pin {
          display: inline-block;
          width: 25px;
          height: 25px;
          line-height: 20px;
          text-align: center;
          font-family: PingFang-SC-Heavy;
          font-size: 16px;
          color: #ffffff;
        }
      }
      .item-right {
        width: 100%;
        padding-left: 5px;
        .description-panel {
          flex: 1;
          padding-right: 10px;
          > div {
            font-family: PingFang-SC-Medium;
            font-size: 13px;
            line-height: 20px;
            color: #333333;
            overflow: hidden;
            &:first-child {
              font-family: PingFang-SC-Heavy;
              font-size: 14px;
              line-height: 24px;
              color: #333333;
              margin-bottom: 10px;
              font-weight: 600;
            }
            span:first-child {
              color: #999999;
            }
            span:last-child {
              flex: 1;
              width: 157px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
        .photo {
          width: 100px;
          height: 70px;
          img {
            width: 100%;
          }
        }
      }
    }
    .pagination-panel {
      text-align: right;
      padding: 20px 20px 0px 0px;
    }
    .nodata-panel,
    .spin-panel {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
