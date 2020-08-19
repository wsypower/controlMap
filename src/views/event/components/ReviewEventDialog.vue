<template>
    <a-modal title=" "
             v-model="reviewDialogVisible"
             wrapClassName="addmodelwrap"
             class="add-edit-dialog"
             width="100%"
             style="paddingBottom: 0px;margin: 0px;height: 100%;top:0px"
             :bodyStyle="{height:'calc(100% - 58px)',padding:'10px 20px 0px 20px'}"
             :mask="false"
             :maskClosable="false"
             :destroyOnClose="true"
             @cancel="handleCancel">
        <div class="event_dialog_body">
            <iframe :src="url" width="100%" height="100%" frameborder="0"></iframe>
        </div>
        <template slot="footer">
            <span></span>
<!--            <a-button type="primary" v-print="printObj">打印</a-button>-->
<!--            <a-button type="primary" @click="">下载</a-button>-->
        </template>
    </a-modal>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'reviewDialog',
    props:{
      visible:{
        type: Boolean,
        default: false
      },
      eventId:{
        type: String,
        default: ''
      }
    },
    data(){
      return{
        reviewDialogVisible: false,
        url: '',
        printObj: {
          id: "printReview",
          popTitle: '事件信息'
        }
      }
    },
    computed:{
      id:function(){
        return this.eventId
      }
    },
    created(){},
    mounted(){
    },
    watch:{
      reviewDialogVisible:function(val){
        if(val){
          this.init();
        }
        else{
          this.$emit('update:visible', false);
        }
      },
      visible:function(val){
        if(val){
          this.reviewDialogVisible = true;
        }
      }
    },
    methods:{
      init(){
        this.url = URL_CONFIG.eventInfoURL + this.id
      },
      handleCancel(){
        this.reviewDialogVisible = false;
      }
    }
  }
</script>
<style lang="scss" scoped>
    .add-edit-dialog {
        width: 100%;
        height: 100%;
        .event_dialog_body{
            width: 100%;
            height: 100%;
        }
        .subtitle-panel{
            font-size: 14px;
            height: 40px;
            margin-bottom: 10px;
            color: #028efc;
            border-botton: 1px solid #d9d9d9;
        }
        .template-panel{
            margin-bottom: 10px;
            font-size: 14px;
            padding: 8px 0 8px 40px;
            background-color: #fafafa;
            border: 1px solid #d9d9d9;
            border-radius: 5px;
            color: #028efc;
            font-size: 16px;
        }
        .turnDown{
            background-color: #FDE2E2;
            color: #F76B6B;
        }
        .event_dialog_body_content {
            height: calc(100% - 60px);
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
            .icon_delete,
            .icon_add {
                font-size: 18px;
                cursor: pointer;
                &:hover {
                    color: #00a4fe;
                }
            }
            .icon_add {
                margin-left: 10px;
            }
        }
    }
</style>
<style lang="scss">
    .addmodelwrap {
        top: 69px;
        height: calc(100% - 78px);
        width: calc(100% - 80px);
        left: 70px;
        .ant-modal-header{
            border-width: 0px;
        }
        .ant-modal-footer{
            border-width: 0px;
        }
        .ant-modal-content {
            height: 100%;
        }
        .ant-collapse-header {
            .anticon {
                color: #00a4fe;
            }
        }
    }
</style>
