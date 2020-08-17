<template>
    <a-modal title="人员选择" v-model="choosePeopleDialogVisible" width="400px"
             :maskClosable="false"
             @cancel="handleCancelForPeople"
             class="choose-people-dialog"
             :bodyStyle="{padding:'0px 5px',borderRadius:'7px',overFlow: 'hidden'}"
             wrapClassName="peoplewrap">
        <div style="height: 400px;position:relative;" class="yuan_dialog_body">
            <div v-show="dataLoading" class="loading" flex="main:center cross:center">
                <a-spin tip="数据加载中..."></a-spin>
            </div>
            <cg-container scroll>
                <a-tree checkable showIcon v-model="checkedKeys"
                        :treeData="treeData">
                    <img slot="dept" src="~@img/avatar_dept.png"/>
                    <img slot="male" src="~@img/avatar_boy.png"/>
                    <img slot="female" src="~@img/avatar_girl.png"/>
                </a-tree>
            </cg-container>
        </div>
        <template slot="footer">
            <a-button type="primary" @click="choosePeople">确定</a-button>
            <a-button @click="handleCancelForPeople">取消</a-button>
        </template>
    </a-modal>
</template>
<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
    export default{
      name: 'choosePeopleDialog',
      props:{
        visible:{
          type:Boolean,
          default: false
        },
        defaultCheckedPeopleIds:{
          type: Array,
          default(){
            return []
          }
        }
      },
      data(){
        return {
          choosePeopleDialogVisible: false,
          treeData: [],
          dataLoading: false,
          peopleList: {},
          checkedKeys: [],
        }
      },
      computed:{
        checkedPeopleKeys: function(){
          let arr = this.checkedKeys.reduce((acc,item)=>{
            if(this.peopleList[item]){
              acc.push(item);
            }
            return acc;
          },[]);
          return arr
        },
        checkedPeopleList: function(){
          let arr = this.checkedPeopleKeys.reduce((res,item)=>{
            let temp = {
              id: item,
              name: this.peopleList[item]
            }
            res.push(temp);
            return res
          },[]);
          return arr
        }
      },
      watch:{
        choosePeopleDialogVisible:function(val){
          if(val){
            this.init();
          }
          else{
            this.$emit('update:visible', false);
          }
        },
        visible:function(val){
          if(val){
            this.choosePeopleDialogVisible = true;
          }
        }
      },
      mounted(){},
      methods:{
        ...mapActions('event/common', ['getPeopleTreeData']),
        init(){
          this.dataLoading = true;
          this.getPeopleTreeData().then((res)=>{
            this.treeData = res.data;
            this.getPeopleList(res.data,this.peopleList);
            console.log('this.peopleList',this.peopleList);
            this.checkedKeys = [...this.defaultCheckedPeopleIds];
            this.dataLoading = false;
          });
        },
        choosePeople(){
          console.log('4444',this.checkedKeys);
          this.$emit('choosePeople',this.checkedPeopleKeys);
          this.checkedKeys = [];
          this.choosePeopleDialogVisible = false;
        },
        handleCancelForPeople(){
          this.checkedKeys = [];
          this.choosePeopleDialogVisible = false;
        },
        getPeopleList(treeData,obj){
          for (let item of treeData) {
            if (item.children) {
              this.getPeopleList(item.children,obj)
            }
            else{
              //console.log(item.key,item.title);
              obj[item.key] = item.title
            }
          }
        }
      }
    }
</script>
<style lang="scss" scoped>
    .choose-people-dialog{
        background-color: #fff;
        .yuan_dialog_body {
            background-color: #fff;
            img {
                width: 20px;
                height: 20px;
                display: inline-block;
                border-radius: 12px;
                margin-right: 8px;
            }
        }
    }
</style>
<style lang='scss'>
    .peoplewrap {
        .ant-modal-close-x {
            color: #fff;
        }
        .loading{
            position: absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            z-index: 10;
            background-color: rgba(255,255,255,0.8);
        }
        .ant-modal-content {
            background-image: linear-gradient(90deg, #0065ea 0%, #6f62ee 100%);
            .ant-modal-header {
                background-image: linear-gradient(90deg, #0065ea 0%, #6f62ee 100%);
                // color: #fff;
                border: none;
                .ant-modal-title {
                    color: #fff;
                    font-size: 18px;
                }
            }
            .ant-modal-footer {
                border: 1px solid;
                border-image: linear-gradient(90deg, #0065ea 0%, #6f62ee 100%) 30 30;
                border-width: 0px 5px 10px 5px;
                background-color: #fff;
            }
        }
    }
</style>
