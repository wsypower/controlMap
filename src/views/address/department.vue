<template>
    <div class="result_body-main">
        <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
            <a-spin tip="数据加载中..."></a-spin>
        </div>
        <cg-container scroll v-if="!showLoading && treeData.length > 0">
            <a-tree class="tree-panel" showLine showIcon
                    :treeData="treeData"
                    :selectedKeys.sync="selectedKeys"
                    @select="onSelect">
                <img slot="dot" src="~@img/dot.png" />
            </a-tree>
        </cg-container>
        <div v-if="!showLoading && treeData.length == 0" class="nodata-panel" flex="main:center cross:center">
            <img src="~@img/zanwudata.png" />
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'

export default {
  name: 'department',
  data(){
    return {
      //展示数据的过渡效果
      showLoading: false,
      //后台传过来的数据
      sourceData: [],
      //默认选中第一个节点
      selectedKeys: []
    }
  },
  computed:{
    //获得展示的数据与属性
    treeData:function(){
      let data = JSON.parse(JSON.stringify(this.sourceData));
      this.changeTreeData(data,'');
      return data;
    }
  },
  mounted() {
    this.showLoading = true;
    this.getAllAddressListTreeData().then(res=>{
      console.log('getAllAddressListTreeData',res);
      this.sourceData = res;
      this.selectedKeys.push(this.sourceData[0].id);
      let data = {
        id: this.sourceData[0].id,
        range: this.sourceData[0].name + '@',
        type: this.sourceData[0].type,
        groupType: ''
      }
      this.$emit('getSelectRange', data)
      this.showLoading = false;
    });
  },
  methods:{
    ...mapActions('address/list', ['getAllAddressListTreeData']),
    //给后端的数据增加一些前端展示与判断需要的属性
    changeTreeData(arr,deptName){
      const _this = this;
      arr.forEach(item=>{
        item.scopedSlots = { title: 'title' };
        if(item.isLeaf){
          item.title = item.name;
          item.key = item.id;
          item.range = item.name + '@' + deptName;
          item.slots = {icon: 'dot'};
          item.class = 'itemClass';
        }
        else{
          item.title = item.name;
          item.key = item.id;
          item.range = item.name + '@' + deptName;
          // item.slots = {icon: 'dept'};
          this.changeTreeData(item.children, item.range);
        }
      })
    },
    onSelect(selectedKeys, e){
      let needData = e.selectedNodes[0].data.props;
      let data = {
        id:needData.id,
        range: needData.range,
        type: this.sourceData[0].type,
        groupType: needData.groupType ? needData.groupType : ''
      }
      this.$emit('getSelectRange', data)
    }
  }
}
</script>
<style lang="scss" scoped>
    .result_body-main {
        position: relative;
        /*background-color: #f5f5f5;*/
        height: 100%;

        .tree-panel {
            width: 100%;
            height: 100%;
            padding: 10px 14px;
            img {
                width: 20px;
                height: 20px;
                display: inline-block;
                border-radius: 12px;
                margin-right: 8px;
            }
        }

        .nodata-panel,
        .spin-panel {
            width: 100%;
            height: 100%;
        }
    }

    /deep/.ant-tree.ant-tree-show-line li:not(:last-child):before {
        border-left: 1px dashed rgba(0, 164, 254, 0);
    }
    /deep/.ant-tree.ant-tree-show-line li span.ant-tree-switcher {
        /*background-color: #f5f5f5;*/
        color: #00a4fe;
    }
    /deep/.itemClass {
        &::before {
            opacity: 0;
        }
        span.ant-tree-switcher {
            opacity: 0;
            display: none;
        }
    }
    /deep/.ant-tree-node-content-wrapper-open .ant-tree-iconEle{
        display: none
    }
    /deep/.ant-tree-node-content-wrapper-close .ant-tree-iconEle{
        display: none
    }
    /deep/.ant-tree li .ant-tree-node-content-wrapper{
        padding: 0 15px 0px 5px;
        height: unset;
    }
    /deep/.ant-tree-title{
        white-space: normal;
        display: inline-block;
    }
</style>