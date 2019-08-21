<template>
  <a-modal wrapClassName="positionMapDialogWrap"
           title="位置选择"
           v-model="mapDialogVisible"
           width="80%"
           :maskClosable="false"
           @cancel="handleCancel"
           :bodyStyle="{padding:'0px 5px 5px 5px',borderRadius:'7px',overFlow: 'hidden'}"
           style="top:57px"
           :destroyOnClose="true"
           :footer="null"
  >
    <div class="yuan_dialog_body"></div>
  </a-modal>
</template>
<script type="text/ecmascript-6">
    export default{
      name: 'positionMapDialog',
      components: {},
      props:{
        visible: {
            type: Boolean,
            default: false
        },
        positionData:{
          type: Object,
          default(){
            return {}
          }
        }
      },
      data(){
        return {
            mapDialogVisible: false
        }
      },
      computed:{

      },
      watch:{
        mapDialogVisible:function(val){
          if(val){
            this.init();
          }
          else{
            this.$emit('update:visible', false);
          }
        },
        visible:function(val){
          if(val){
            this.mapDialogVisible = true;
          }
        },

      },
      methods:{
        init(){

        },
        //关闭保障视图弹窗
        handleCancel(){
          this.mapDialogVisible = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.yuan_dialog_body {
  height: 400px;
  width: 100%;
  background-color: #fff;
}
</style>
<style lang='scss'>
  .positionMapDialogWrap {
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
