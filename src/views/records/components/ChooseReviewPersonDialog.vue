<template>
    <a-modal title="选择审核人员"
             v-model="chooseReViewPersonDialogVisible"
             width="400px"
             :maskClosable="false"
             @cancel="handleCancelForCheck">
        <div class="yuan_dialog_body">
            <span>审核人员：</span>
            <a-select v-model="reviewPerson"
                      style="width: 180px"
                      showSearch
                      placeholder="请输入或者下拉选择"
                      optionFilterProp="children"
                      :filterOption="filterOption">
                <a-select-option v-for="(item,index) in reviewPeopleList" :value="item.id" :key="index">{{item.realname}}</a-select-option>
            </a-select>
        </div>
        <template slot="footer">
            <a-button type="primary" @click="choosePerson">确定</a-button>
            <a-button @click="handleCancelForCheck">取消</a-button>
        </template>
    </a-modal>
</template>
<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
    export default {
      name: 'chooseReviewPersonDialog',
      props:{
        visible: {
          type: Boolean,
          default: false
        }
      },
      data(){
        return {
          chooseReViewPersonDialogVisible: false,
          reviewPeopleList: [],
          reviewPerson: '',
        }
      },
      watch:{
        chooseReViewPersonDialogVisible:function(val){
          if(val){
            this.init();
          }
          else{
            this.$emit('update:visible', false);
          }
        },
        visible:function(val){
          if(val){
            this.chooseReViewPersonDialogVisible = true;
          }
        }
      },
      mounted(){},
      methods:{
        ...mapActions('emergency/common', ['getReviewPeopleDataList']),
        init(){
            this.getReviewPeopleDataList().then((res)=>{
              this.reviewPeopleList = res;
            });
        },
        filterOption(input, option) {
          return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        },
        choosePerson(){
          if(this.reviewPerson === ''){
            this.$notification['error']({
              message: '未选择审核人员',
              description: '请检查',
              style: {
                width: '300px',
                marginLeft: `100px`,
                fontSize: '14px'
              }
            });
          }
          else{
            // console.log('reviewPerson',this.reviewPerson);
            this.$emit('choosePerson',this.reviewPerson);
            this.reviewPerson = '';
            this.chooseReViewPersonDialogVisible = false;
          }
        },
        handleCancelForCheck(){
          this.reviewPerson = '';
          this.chooseReViewPersonDialogVisible = false;
        }
      }
    }
</script>
