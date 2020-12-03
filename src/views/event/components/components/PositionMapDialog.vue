<template>
  <a-modal
    ref="baoZhangDialog"
    title="事件位置"
    v-model="positionDialogVisible"
    :maskClosable="false"
    @cancel="handleCancel"
    wrapClassName="baoZhangDialogwraps"
    width="80%"
    :bodyStyle="{ padding: '0px 5px', borderRadius: '7px', overFlow: 'hidden' }"
    style="top:57px"
    :destroyOnClose="false"
    :afterClose="afterClose"
  >
    <div class="yuan_dialog_body">
      <!-- 地图控件注入地址 -->
      <LayoutMap ref="olMap"></LayoutMap>
    </div>
    <template slot="footer">
      <a-button v-if="!optType" @click="positionDialogVisible = false">关闭</a-button>
      <a-button v-if="optType" type="primary" @click="savePositionData">确定</a-button>
      <a-button v-if="optType" type="primary" @click="resetPosition">重置</a-button>
    </template>
  </a-modal>
</template>
<script type="text/ecmascript-6">
  import LayoutMap from '@/views/map/olMap.vue';
  import { MapManager } from '@/utils/util.map.manage';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import { Style} from 'ol/style.js';
  import Icon from 'ol/style/Icon';
  import Draw from 'ol/interaction/Draw.js';
  import Feature from 'ol/Feature';
  import Point from 'ol/geom/Point';
  let map;
  let mapManager;
  let source;
  let vectorLayer;
    export default{
      name: 'positionMapDialog',
      components: {
        LayoutMap,
      },
      props:{
        visible: {
            type: Boolean,
            default: false
        },
        optType: {
          type: Boolean,
          default: ''
        },
        positionData: {
          type: Object,
          default(){
            return {
              x84: '',
              y84: ''
            }
          }
        },
      },
      data(){
        return {
          data: [],//地址搜索返回数据
          value: undefined,// 地址搜索点击数据
          positionDialogVisible: false,
          //编辑edit或者查看look位置
          // optType: 'edit',
          draw:null,
          xyData:[],
        }
      },
      computed:{},
      watch:{
        positionDialogVisible:function(val){
          if(val){
            this.init();
          }
          else{
            this.$emit('update:visible', false);
          }
        },
        visible:function(val){
          if(val){
            this.positionDialogVisible = true;
          }
        },
      },
      created(){},
      mounted() {},
      methods:{
        init(){
          this.$nextTick().then(() => {
            map = this.$refs.olMap.getMap();
            mapManager = new MapManager(map);
            source = new VectorSource({ wrapX: false });
            vectorLayer = new VectorLayer({
              source: source,
              style: new Style({
                image: new Icon({
                  src: require('@/assets/mapImage/flag.png')
                }),
              })
            });
            map.addLayer(vectorLayer);
            if(this.positionData.x84.length>0&&this.positionData.y84.length>0){
              this.xyData=[parseFloat(this.positionData.x84),parseFloat(this.positionData.y84)];
              const feature=new Feature(new Point(this.xyData));
              source.addFeature(feature);
              mapManager.locateTo(this.xyData);
            }
            if(this.optType){
              this.draw = new Draw({
                source: source,
                type: 'Point'
              })
              map.addInteraction(this.draw);
              this.draw.on('drawstart', function() {
                source&&source.clear();
              });
              this.draw.on('drawend', (e)=> {
                const feature=e.feature;
                this.xyData = feature.getGeometry().getCoordinates();
                console.log('经纬度1：',this.xyData);
              });
            }
          })
        },
        //确定位置数据
        savePositionData() {
          if(this.xyData.length===0){
            this.$notification['error']({
              message: '事件位置必选',
              description: '请检查',
              style: {
                width: '350px',
                marginLeft: `50px`,
                fontSize: '14px'
              }
            });
          }
          else{
            this.positionDialogVisible = false;
            //触发更新道路表格数据
            this.$emit('savePositionData',this.xyData)
          }
        },
        //重置视图
        resetPosition(){
          source&&source.clear();
          this.xyData=[];
        },
        //关闭视图弹窗
        handleCancel(){
          // source&&source.clear();
          this.positionDialogVisible = false;
        },
        afterClose(){
          // this.disableEdit = false;
          console.log('关闭了')
        }
    }
}
</script>
<style lang="scss" scoped>
.yuan_dialog_body {
  height: 600px;
  /*height: 90%;*/
  width: 100%;
  position: relative;
  background-color: #fff;
  .operate-panel {
    position: absolute;
    top: 20px;
    right: 20px;
    button {
      margin-left: 10px;
    }
  }
  .search-map {
    position: absolute;
    top: 20px;
    left: 60px;
  }
  .show-set-button {
    position: absolute;
    top: 10px;
  }
}
</style>
<style lang="scss">
.baoZhangDialogwraps {
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
