<template>
  <a-modal
    title="保障视图"
    v-model="mapDialogVisible"
    width="100%"
    wrapClassName="bao-zhang-map-dialog-wap"
    :bodyStyle="{ top: 0 + 'px', height: '100%' }"
    class="bao-zhang-map-dialog"
    @cancel="handleCancel"
  >
    <div class="yuan_dialog_body">
      <!-- 地图控件注入地址 -->
      <LayoutMap ref="olMap"></LayoutMap>
      <div class="operate-panel">
        <a-button type="primary" @click="drawDot">点</a-button>
        <a-button type="primary" @click="drawLine">线</a-button>
        <a-button type="primary" @click="drawArea">面</a-button>
        <a-button type="primary" @click="clearDraw">清除选中图形</a-button>
      </div>
    </div>
    <template slot="footer">
      <a-button type="primary" @click="saveMap">保存视图</a-button>
      <a-button @click="resetMap">重置视图</a-button>
    </template>
  </a-modal>
</template>
<script type="text/ecmascript-6">
import LayoutMap from '@/views/map/olMap.vue'
import { MapManager } from '@/utils/util.map.manage'
let map;
let mapManager;
  export default{
    name: 'baoZhangMapDialog',
    components: {
      LayoutMap,
    },
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
    updated(){
        debugger;
        map = this.$refs.olMap.getMap();
        mapManager = new MapManager(map);
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
    mounted(){
      this.$nextTick().then(() => {
        // debugger;
        // 获取地图
        // map = this.$refs.olMap.getMap()
        // mapManager = new MapManager(map)
        // 将mapManager状态存至vuex
        // this.setMapManager(mapManager)
        // map.on('click', this.mapClickHandler)
      })
    },
    methods:{
      init(){

      },
      drawDot(){
        const draw = mapManager.activateDraw('point');
        console.log(draw);
        draw.on('drawend', function(e) {
          console.log(e);
        })
      },
      drawLine(){

      },
      drawArea(){

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
.bao-zhang-map-dialog-wap {
  .bao-zhang-map-dialog {
    height: 500px;
    /deep/.ant-modal {
      top: 0;
      height: 100%;
    }
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
  }
}

/*/deep/.ant-modal{*/
/*top:0;*/
/*height:100%;*/
/*}*/
</style>
