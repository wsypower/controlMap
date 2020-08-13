<template>
    <a-modal title="中队选择" v-model="chooseTeamDialogVisible" width="400px"
             :maskClosable="false"
             @cancel="handleCancelForTeam"
             class="choose-team-dialog"
             :bodyStyle="{padding:'0px 5px',borderRadius:'7px',overFlow: 'hidden'}"
             wrapClassName="teamwrap">
        <div style="min-height:200px;" class="team_dialog_body" flex="dir:left">
            <div v-show="dataLoading" class="loading" flex="main:center cross:center">
                <a-spin tip="数据加载中..."></a-spin>
            </div>
            <a-checkbox :checked="item.checked" @change="onChange(item)" v-for="item in teamList" :key="item.id">
                {{item.name}}
            </a-checkbox>
        </div>
        <template slot="footer">
            <a-button type="primary" @click="chooseTeam">确定</a-button>
            <a-button @click="handleCancelForTeam">取消</a-button>
        </template>
    </a-modal>
</template>
<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
    export default{
      name: 'chooseTeamDialog',
      props:{
        visible:{
          type:Boolean,
          default: false
        },
        defaultCheckedIds:{
          type: Array,
          default(){
            return []
          }
        }
      },
      data(){
        return {
          chooseTeamDialogVisible: false,
          dataLoading: false,
          teamList: []
        }
      },
      watch:{
        chooseTeamDialogVisible:function(val){
          if(val){
            this.init();
          }
          else{
            this.$emit('update:visible', false);
          }
        },
        visible:function(val){
          if(val){
            this.chooseTeamDialogVisible = true;
          }
        }
      },
      mounted(){},
      methods:{
        ...mapActions('event/common', ['getTeamDataList']),
        init(){
          this.dataLoading = true;
          this.teamList = [];
          this.getTeamDataList().then((res)=>{
            this.dataLoading = false;
            res.data.map(item => {
              let index = this.defaultCheckedIds.findIndex(id=>id===item.id);
              if(index<0){
                item.checked = false;
              }
              else{
                item.checked = true;
              }

            });
            this.teamList = res.data;
          });
        },
        onChange(item){
          item.checked = !item.checked;
        },
        handleCancelForTeam(){
          this.chooseTeamDialogVisible = false;
        },
        chooseTeam(){
           let checkedTeams = this.teamList.reduce((acc,item) => {
            if(item.checked){
              acc.push(item);
            }
            return acc
          },[]);
          this.chooseTeamDialogVisible = false;
          console.log('team checkedTeams',checkedTeams);
          this.$emit('chooseTeam',checkedTeams);
        }
      }
    }
</script>
<style lang="scss" scoped>
    .choose-team-dialog{
        background-color: #fff;
        .team_dialog_body {
            width: 100%;
            padding: 20px;
            background-color: #fff;
            flex-wrap: wrap;
            position: relative;
            .loading{
                position: absolute;
                top:0;
                left:0;
                right:0;
                bottom:0;
                z-index: 10;
                background-color: rgba(255,255,255,0.8);
            }
            /deep/.ant-checkbox-wrapper{
                margin-left: 0px;
                width: 50%;
            }
        }
    }
</style>
<style lang='scss'>
    .teamwrap {
        .ant-modal-close-x {
            color: #fff;
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
