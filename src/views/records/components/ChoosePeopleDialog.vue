<template>
    <a-modal title="人员选择" v-model="choosePeopleDialogVisible" width="400px" @cancel="handleCancelForPeople" class="choose-people-dialog">
        <div style="height: 400px;position:relative;" class="yuan_dialog_body">
            <cg-container scroll>
                <a-tree checkable showIcon v-model="checkedKeys" @check="onCheck" :treeData="treeData">
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
          checkedKeys: [],
        }
      },
      computed:{
        peopleList:function(){
          return {
            "0-0-0":"傅建民",
            "0-0-1":"董亨芳",
            "0-0-2":"顾 祎",
            "0-1-0":"郑波立",
            "0-1-1":"金 涛",
            "0-1-2":"周 军",
            "1-0-0":"郑 明",
            "1-0-1":"俞 君",
            "1-0-2":"邵群艳"
          }
        },
        checkedPeople: function(){
          let arr = this.checkedKeys.reduce((res,item,index)=>{
            return res.concat(this.peopleList[item])
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
      mounted(){
        this.init();
      },
      methods:{
        init(){
          this.treeData = [{
            title: '智慧城管',
            key: 'chengguan',
            slots: {
              icon: 'dept'
            },
            children:[{
              title: '信息采集中心',
              key: 'xinxi',
              slots: {
                icon: 'dept'
              },
              children: [{
                title: '傅建民',
                key: '0-0-0',
                slots: {
                  icon: 'male'
                }
              }, {
                title: '董亨芳',
                key: '0-0-1',
                slots: {
                  icon: 'female'
                }
              }, {
                title: '顾 祎',
                key: '0-0-2',
                slots: {
                  icon: 'male'
                }
              }]
            },{
              title: '第一中队',
              key: 'yizhongdui',
              slots: {
                icon: 'dept',
              },
              children: [{
                title: '郑波立',
                key: '0-1-0',
                slots: {
                  icon: 'male'
                }
              }, {
                title: '金 涛',
                key: '0-1-1',
                slots: {
                  icon: 'male'
                }
              }, {
                title: '周 军',
                key: '0-1-2',
                slots: {
                  icon: 'male'
                }
              }]
            }]
          }, {
            title: '智慧教育',
            key: 'jiaoyu',
            slots: {
              icon: 'dept',
            },
            children:[{
              title: '信息采集中心',
              key: 'caiji',
              slots: {
                icon: 'dept',
              },
              children: [{
                title: '郑 明',
                key: '1-0-0',
                slots: {
                  icon: 'male'
                }
              }, {
                title: '俞 君',
                key: '1-0-1',
                slots: {
                  icon: 'male'
                }
              }, {
                title: '邵群艳',
                key: '1-0-2',
                slots: {
                  icon: 'female'
                }
              }]
            }]

          }];
        },
        choosePeople(){
          let data = {
            'key': this.checkedKeys,
            'name': this.checkedPeople
          }
          this.$emit('choosePeople',data);
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
