<template>
    <a-modal title="保障视图" v-model="mapDialogVisible" width="100%" height="100%"
             @cancel="handleCancel">
        <div class="yuan_dialog_body" id="bao_zhang_map" ref="baoZhangBody">
            <div class="operate-panel">
            <a-button type="primary" @click="drawArea">多边形</a-button>
            <a-button type="primary" @click="drawLine">线</a-button>
            <a-button type="primary" @click="drawDot">点</a-button>
            <a-button type="primary" @click="clearDraw">清楚选中区域</a-button>
            </div>
        </div>
        <template slot="footer">
            <a-button type="primary" @click="saveMap">保存视图</a-button>
            <a-button @click="resetMap">重置视图</a-button>
        </template>
    </a-modal>
</template>
<script type="text/ecmascript-6">
    export default{
      name: 'baoZhangMapDialog',
        props:{
            visible: {
                type: Boolean,
                default: false
            }
      },
      data(){
        return {
          mapDialogVisible: false
        }
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
        }
      },

      mounted() {

      },
      methods:{
        init(){

        },
        drawArea(){

        },
        drawLine(){

        },
        drawDot(){

        },
        clearDraw(){

        },
        saveMap(){

        },
        resetMap(){

        },
        handleCancel(){
          this.mapDialogVisible = false;
        }
      }
  }
</script>
<style lang="scss" scoped>
    .yuan_dialog_body {
        height: 500px;
        width: 100%;
        position: relative;
        .operate-panel {
            position: absolute;
            top: 20px;
            right: 20px;
            button {
                margin-left: 10px;
            }
        }
    }


</style>
