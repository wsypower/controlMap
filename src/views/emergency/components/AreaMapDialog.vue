<template>
  <a-modal wrapClassName="positionMapDialogWrap"
           title="区域查看"
           v-model="mapDialogVisible"
           width="80%"
           :maskClosable="false"
           @cancel="handleCancel"
           :bodyStyle="{padding:'0px 5px 5px 5px',borderRadius:'7px',overFlow: 'hidden'}"
           style="top:57px"
           :destroyOnClose="true"
           :footer="null"
  >
    <div class="yuan_dialog_body">
      <!-- 地图控件注入地址 -->
      <LayoutMap ref="olMap"></LayoutMap>
    </div>
  </a-modal>
</template>
<script type="text/ecmascript-6">
  import LayoutMap from '@/views/position/olMap.vue'
  // import { MapManager,filterMapId } from '@/utils/util.map.manage'
  import {Draw, Modify, Snap} from 'ol/interaction.js';
  import {Vector as VectorLayer} from 'ol/layer.js';
  import {Vector as VectorSource} from 'ol/source.js';
  import { Style} from 'ol/style.js';
  import Icon from 'ol/style/Icon';
  import {getAddress} from '@/api/map/service'
  let map;
  let source;
    export default{
      name: 'positionMapDialog',
      components: {
        LayoutMap
      },
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
          this.$nextTick().then(() => {

          })
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
  position: relative;
}
.upload{
  position: absolute;
  top:20px;
  right: 20px;
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
