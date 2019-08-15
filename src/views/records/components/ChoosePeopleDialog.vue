<template>
    <a-modal title="人员选择" v-model="choosePeopleDialogVisible" width="400px"
             :maskClosable="false"
             @cancel="handleCancelForPeople"
             class="choose-people-dialog">
        <div style="height: 400px;position:relative;" class="yuan_dialog_body">
            <cg-container scroll>
                <a-tree checkable showIcon v-model="checkedKeys"
                        @check="onCheck"
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
        disablePeopleKey:{
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
          peopleList: {},
          checkedKeys: [],
        }
      },
      computed:{
        checkedPeopleKeys: function(){
          let arr = this.checkedKeys.reduce((res,item)=>{
            if(this.peopleList[item]){
              res.push(item);
            }
            return res;
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
        ...mapActions('emergency/common', ['getAllPeopleDataList']),
        init(){
          this.getAllPeopleDataList().then((res)=>{
            this.setDisabledKeyToTree(res,this.disablePeopleKey);
            this.getPeopleList(res,this.peopleList);
            console.log('this.peopleList',this.peopleList);
            this.treeData = res;
          });
        },
        setDisabledKeyToTree(treeData,disabledKey){
          disabledKey.map(key => {
            for (let item of treeData) {
                if(item.key===key){
                    item.disabled = true;
                }
                if (item.children) {
                    this.setDisabledKeyToTree(item.children,disabledKey)
                }
            }
          })
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
        },
        choosePeople(){
          // let data = {
          //   'key': this.checkedPeopleKeys,
          //   'name': this.checkedPeopleName
          // }
          this.$emit('choosePeople',this.checkedPeopleList);
          this.checkedKeys = [];
          this.choosePeopleDialogVisible = false;
        },
        onCheck(val1,val2){
          console.log('onCheck',val1,val2);
        },
        handleCancelForPeople(){
          this.checkedKeys = [];
          this.choosePeopleDialogVisible = false;
        },
      }
    }
</script>
<style lang="scss" scoped>
    .choose-people-dialog{
        .yuan_dialog_body {
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
