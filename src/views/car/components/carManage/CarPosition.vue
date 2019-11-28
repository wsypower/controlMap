<template>
  <div class="car-manage" flex="dir:top">
    <div class="search-panel">
      <a-input-search placeholder="输入关键词搜索" @search="onSearch" enterButton="搜 索"></a-input-search>
    </div>
    <div class="yuan_dialog_body">
      <div class="spin-panel" flex="main:center cross:center" v-if="showLoading">
        <a-spin tip="数据加载中..."></a-spin>
      </div>
      <cg-container scroll v-if="!showLoading && treeData.length > 0 && showTree">
        <a-tree
          class="tree-panel"
          showIcon
          showLine
          :treeData="treeData"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          @select="onSelect"
          @expand="onExpand"
        >
          <img slot="dept" src="~@img/avatar_dept.png" />
          <img slot="car" src="~@img/avatar-car.png" />
          <img slot="car-outline" src="~@img/avatar-car-outline.png" />
          <template slot="title" slot-scope="{ title }">
            <span v-if="title.indexOf(searchValue) > -1">
              {{ title.substr(0, title.indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>
              {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
            </span>
            <span v-else>{{ title }}</span>
          </template>
        </a-tree>
      </cg-container>
      <div
        v-if="(!showLoading && treeData.length == 0) || !showTree"
        class="nodata-panel"
        flex="main:center cross:center"
      >
        <img src="~@img/zanwudata.png" />
      </div>
    </div>
    <car-info
      ref="carInfo"
      style="position:fixed; top: 100px;right:100px;display:none"
      :info="carInfoData"
      @closeTip="closeTip"
      @getCarId="getCarId"
    ></car-info>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import CarInfo from './CarInfo.vue';
export default {
    name: '',
    components:{
      CarInfo
    },
    data(){
        return {
          expandedKeys: [],
          autoExpandParent: true,
          searchValue: '',
          showLoading: false,
          sourceData: [],
          allCarData: [],
          carInfoData: {},
          showTree: true,
          timer: null
        }
    },
    computed:{
        //获得展示的数据与属性
       treeData:function(){
           let data = JSON.parse(JSON.stringify(this.sourceData));
           this.allCarData = [];
           this.changeTreeData(data,'');
           return data
       }
    },
    mounted(){
        this.showLoading = true;
        this.getAllCarTreeData().then(res=>{
            this.sourceData = res.data;
            this.showLoading = false;
        });
        let _this = this;
      this.timer = setInterval(function() {
        _this.getAllCarTreeData().then(res=>{
          _this.sourceData = res.data;
        });
      },600000)
    },
   beforeDestroy(){
     clearInterval(this.timer)
   },
    methods:{
        ...mapActions('car/manage', ['getAllCarTreeData']),
        //给后端的数据增加一些前端展示与判断需要的属性
        changeTreeData(arr,deptName){
            arr.forEach(item=>{
                item.title = item.name;
                item.scopedSlots = { title: 'title' };
                if(item.isLeaf){
                    item.key = item.id;
                    item.dept = deptName;
                    if(item.online){
                        item.slots = {icon: 'car'}
                    }
                    else{
                        item.slots = {icon: 'car-outline'}
                    }
                    item.class = 'itemClass';

                    let temp = {
                      title: item.name,
                      key: item.id
                    }
                    this.allCarData.push(temp);
                }
                else{
                    item.key = 'dept_' + item.id;
                    item.slots = {icon: 'dept'}
                    this.changeTreeData(item.children, item.name)
                }
            })
        },
      onSearch(val){
        this.expandedKeys = [];
        this.searchValue = val;
        this.allCarData.forEach(item => {
          if(item.title.indexOf(val)>=0){
            this.expandedKeys.push(item.key);
          }
        });
        this.autoExpandParent = true;
        if(this.expandedKeys.length === 0){
          this.showTree = false;
        }
        else{
          this.showTree = true;
        }
      },
      onExpand(expandedKeys) {
        this.expandedKeys = expandedKeys;
        this.autoExpandParent = false;
      },
      //点击树中某个节点（某个人员）时触发
      onSelect(selectedKeys, e){
        console.log(selectedKeys, e);
        if(selectedKeys[0].indexOf('dept_')<0){
          let needData = e.selectedNodes[0].data.props;
          let temp = {};
          temp.id = needData.id;
          temp.name = needData.carNumber;
          temp.code = needData.carNumber;
          temp.flag = needData.carNumber;
          temp.phone = needData.phone;
          temp.dept = needData.dept;
          temp.gpsTime = needData.gpsTime;
          temp.x = needData.x;
          temp.y = needData.y;
          this.carInfoData = temp;
          this.$refs.carInfo.$el.style.display = 'block';
        } else{
          this.$refs.carInfo.$el.style.display = 'none';
        }
      },
        //人员轨迹触发
      getCarId(data){
        this.$emit('getCarId',data);
      },
      closeTip(){
        console.log('closeTip');
      }
    }
}
</script>
<style lang="scss" scoped>
.car-manage {
  height: 100%;
  width: 100%;
  .search-panel {
    padding: 20px 0px;
  }
  .yuan_dialog_body {
    background-color: #f5f5f5;
    height: calc(100% - 70px);
    position: relative;
    .tree-panel {
      width: 100%;
      height: 100%;
      padding: 10px;
      img {
        width: 20px;
        /*height: 14px;*/
        display: inline-block;
        border-radius: 12px;
        margin-right: 8px;
        margin-bottom: 5px;
      }
    }
    .nodata-panel,
    .spin-panel {
      width: 100%;
      height: 100%;
    }
    /deep/.ant-tree.ant-tree-show-line li:not(:last-child):before {
      border-left: 1px dashed rgba(0, 164, 254, 0.8);
    }
    /deep/.ant-tree.ant-tree-show-line li span.ant-tree-switcher {
      background-color: #f5f5f5;
      color: rgba(43, 144, 243, 0.8);
    }
    /deep/.itemClass {
      &::before {
        opacity: 0;
      }
      span.ant-tree-switcher {
        opacity: 0;
      }
    }
  }
}
</style>
