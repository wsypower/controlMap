<template>
    <div class="person-table-panel" flex="dir:top">
        <div class="person-table-panel-header" flex="dir:left cross:center">
            <cg-icon-svg name="home" class="icon_home"></cg-icon-svg>
            <span>{{header}}</span>
        </div>
        <div class="person-table-panel-search" flex="dir:left cross:center">
            <span>查询：</span>
            <a-input v-model="searchValue" placeholder="请输入查询内容" />
            <a-button type="primary" @click="onSearch">搜索</a-button>
        </div>
        <div class="person-table-panel-main">
            <ul class="main-table-header" >
                <li flex="cross:center">
                    <span>姓名</span>
                    <span>所属部门</span>
                    <span>手机号码</span>
                    <span>绑定设备</span>
                    <span>绑定状态</span>
                </li>
            </ul>
            <ul class="main-table-tbody">
                <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
                    <a-spin tip="数据加载中..."></a-spin>
                </div>
                <my-scroll v-else>
                    <li v-for="(item, index) in tableData" :key="index" flex="cross:center">
                        <span>{{item.name}}</span>
                        <span>{{item.department}}</span>
                        <span>{{item.phone}}</span>
                        <span>{{item.bindEquip}}</span>
                        <span :class="{red: item.bindStatus=='未绑定'}">{{item.bindStatus}}</span>
                    </li>
                </my-scroll>
            </ul>
        </div>
        <div class="person-table-panel-pagination">
            <a-pagination show-quick-jumper
                          :show-total="total => `共 ${total} 条`"
                          :pageSize="query.pageSize"
                          :current="query.pageNo"
                          :total="totalSize"
                          @change="onChange"
                          :item-render="itemRender"/>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapActions } from 'vuex'
    const row = {
      id: '',
      name: '',
      department: '',
      phone: '',
      bindEquip: '',
      bindStatus: ''
    }
export default {
  name: 'personTable',
  props: {
    rangeId:{
      type: String,
      default: 'all'
    },
    range:{
      type: String,
      default: '国测'
    }
  },
  data(){
    return {
      header:'',
      showLoading: false,
      searchValue: '',
      tableData:[],
      totalSize: 0,
      query:{
        rangeId: '',
        searchValue: '',
        pageSize: 12,
        pageNo: 1
      }
    }
  },
  mounted() {},
  watch:{
    rangeId: {
      handler:function(value){
        this.header = this.range.substring(0,this.range.length-1).split('@').reverse().join(' > ')
        this.query.rangeId = value;
        this.getTableListData();
      },
      immediate: true
    }
  },
  methods:{
    ...mapActions('address/list', ['getAllPersonListData']),
    itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return <a class='p-button prev'>上一页</a>;
      } else if (type === 'next') {
        return <a class='p-button next'>下一页</a>;
      }
      return originalElement;
    },
    getTableListData(){
      this.showLoading = true;
      this.getAllPersonListData(this.query).then(res=>{
        console.log('getAllPersonListData',res.data);
        this.showLoading = false;
        this.tableData = res.data;
        this.totalSize = res.data.length;
        let length = 12-res.data.length;
        if(length>0){
          for(let i=0;i<length;i++){
            this.tableData.push(row);
          }
        }
      });
    },
    onSearch(){
        this.query.searchValue = this.searchValue;
        this.query.pageNo = 1;
        this.getTableListData();
    },
    onChange(pageNo,pageSize){
      this.query.pageNo = pageNo;
      this.getTableListData();
    }
  }
}
</script>
<style lang="scss" scoped>
.person-table-panel{
    width: 100%;
    height: 100%;
    .person-table-panel-header{
        height: 45px;
        width: 100%;
        border-bottom: 1px solid #f5f5f5;
        padding-left: 20px;
        .icon_home{
            width: 14px;
            height: 14px;
            color: #00a4fe;
        }
        span{
            margin-left: 6px;
        }
    }
    .person-table-panel-search{
        padding: 10px 20px;
        span{
            width: 70px;
        }
        button{
            margin-left : 20px;
        }
    }
    .person-table-panel-main{
        width: 100%;
        padding: 0px 20px;
        height: calc(100% - 145px);
        ul {
            margin: 0px;
            padding: 0px;
            li {
                height: 40px;
                span {
                    width: 20%;
                    text-align: center;
                }
            }
        }
        .main-table-header{
            background-color: #d8ebfd;
        }
        .main-table-tbody{
            height: calc(100% - 40px);
            border: solid 1px #e5e5e5;
            li:nth-child(2n+1){
                background-color: #f2f5fd;
            }
            li span.red{
                color: #d90913;
            }
            .spin-panel{
                width: 100%;
                height: 100%;
            }
        }
    }
    .person-table-panel-pagination{
        padding-top: 10px;
        text-align: center;
        .p-button{
            height: 32px;
            line-height: 30px;
            text-align: center;
            list-style: none;
            display: inline-block;
            vertical-align: middle;
            border: 1px solid #d9d9d9;
            background-color: #fff;
            border-radius: 4px;
            width: 70px;
            &.prev{
                margin-right: 10px;
            }
            &.next{
                margin-left: 10px;
            }
            &:hover{
                border-color: #1890ff;
                color: #1890ff;
            }
        }
    }
}
</style>