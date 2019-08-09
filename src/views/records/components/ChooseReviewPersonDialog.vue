<template>
    <a-modal title="选择审核人员" v-model="chooseReViewPersonDialogVisible" width="400px" @cancel="handleCancelForCheck">
        <div class="yuan_dialog_body">
            <a-select v-model="reviewPerson" style="width: 120px">
                <a-select-option v-for="(item,index) in reviewPeopleList" :value="item.id" :key="item.id">{{item.name}}</a-select-option>
            </a-select>
        </div>
        <template slot="footer">
            <a-button type="primary" @click="choosePerson">确定</a-button>
            <a-button @click="handleCancelForCheck">取消</a-button>
        </template>
    </a-modal>
</template>
<script type="text/ecmascript-6">
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
          reviewPeopleList: [{'id':'001','name':'傅建民'},{'id':'002','name':'郑波立'},{'id':'003','name':'邵群艳'},{'id':'004','name':'俞 君'}],
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
        init(){

        },
        choosePerson(){
          console.log('reviewPerson',this.reviewPerson);
          this.$emit('choosePerson',this.reviewPerson);
          this.reviewPerson = '';
          this.chooseReViewPersonDialogVisible = false;
        },
        handleCancelForCheck(){
          this.reviewPerson = '';
          this.chooseReViewPersonDialogVisible = false;
        }
      }
    }
</script>
