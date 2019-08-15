<template>
  <a-modal ref="baoZhangDialog" title="保障视图" v-model="mapDialogVisible" width="100%" :maskClosable="false" @cancel="handleCancel">
    <div class="yuan_dialog_body" id="bao_zhang_map" ref="baoZhangBody">
      <!-- 地图控件注入地址 -->
      <LayoutMap ref="olMap"></LayoutMap>
      <div hidden>
        <div class="set-baozhang-dialog" ref="infoOverlay">
          <div class="set-baozhang-dialog-header" flex="main:justify cross:center">
            <span>保障信息</span>
            <a-icon type="close" @click="closeSetDialog" />
          </div>
          <div class="set-baozhang-dialog-body">
            <cg-container scroll>
              <a-form :form="form" style="margin:10px">
                <a-form-item label="保障点位：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{baoZhangFormData.name}}</span>
                </a-form-item>
                <a-form-item label="人员：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{baoZhangFormData.people}}</span>
                </a-form-item>
                <a-form-item label="备注：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{baoZhangFormData.remark}}</span>
                </a-form-item>
              </a-form>
            </cg-container>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script type="text/ecmascript-6">
  import LayoutMap from '@/views/map/olMap.vue'
  import { MapManager } from '@/utils/util.map.manage'
  import VectorLayer from 'ol/layer/Vector'
  import VectorSource from 'ol/source/Vector'
  import Select from 'ol/interaction/Select.js';
  import { Circle as CircleStyle,Fill, Stroke, Style} from 'ol/style.js';
  import { getEmergencyFeatures } from '@/api/map/service'
  let map;
  let mapManager;
  let draw,modify;
  let source;
  let vectorLayer;
  let select;
    export default{
      name: 'baoZhangMapForViewDialog',
      components: {
        LayoutMap,
      },
      props:{
        visible: {
            type: Boolean,
            default: false
        },
        baoZhangData:{
          type: Array,
          default(){
            return []
          }
        }
      },
      data(){
        return {
          infoOverlay:null,
          mapDialogVisible: false,
          pointFeatures:[],
          lineFeatures:[],
          polygonFeatures:[],
          drawFeatures:[],
          selectedFeature:null,
          form: null,
          //一条保障点位的数据
          baoZhangFormData: {
            id: '',
            mapId: '',
            name: '',
            mapType:'',
            people: '',
            remark: ''
          },

          //编辑时,确定第几个保障点位
          index: 0,
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
      created(){
        this.form = this.$form.createForm(this);
      },
      mounted() {},
      updated(){
        this.$nextTick().then(() => {
          // let height = document.body.clientHeight - 300;
          // this.$refs.baoZhangBody.style.height= height + 'px';
          if(!map){
            map = this.$refs.olMap.getMap();
            mapManager = new MapManager(map);
            //初始化地图弹框
            this.infoOverlay = mapManager.addOverlay({
              element: this.$refs.infoOverlay
            });
            //绑定地图双击事件
            map.on('dblclick', this.mapClickHandler);
          }
        })
      },
      methods:{
        init(){
          console.log('mapForView',this.baoZhangData);
          //编辑状态下通过图形id获取已保存的图形数据
          if(this.baoZhangData.length>0){
            const mapIdList=this.baoZhangData.map(data => {
              return data.mapId;
            })
            let searchId ='(';
            for(let i=0;i<mapIdList.length;i++){
              searchId+="'"+mapIdList[i]+"'";
              if(i+1<mapIdList.length){
                searchId+=','
              }
            }
            searchId +=')';
            console.log(searchId);
            if(!source){
              source = new VectorSource({ wrapX: false });
            }
            getEmergencyFeatures(searchId,'Point').then(data=>{
              console.log(data);
              source.addFeatures(data);
            });
          }
        },
        //地图点击事件处理器
        mapClickHandler({ pixel, coordinate }) {
          const feature = map.forEachFeatureAtPixel(pixel, feature => feature)
          if(feature){
            this.showSetDialog(feature.get('id'));
            this.infoOverlay.setPosition(coordinate);
            console.log('==点击feature==',feature);
          }
        },
        //根据选择绘制图形
        handleOperateClick(value){
          map.un('dblclick', this.mapClickHandler);
          console.log('handleMenuClick',value);
          if(select){
            map.removeInteraction(select);
          }
          if(!source){
            source = new VectorSource({ wrapX: false });
            vectorLayer = new VectorLayer({
              source: source,
              style: new Style({
                fill: new Fill({
                  color: 'rgba(255, 255, 255, 0.3)'
                }),
                stroke: new Stroke({
                  color: '#ffcc33',
                  width: 2
                }),
                image: new CircleStyle({
                  radius: 7,
                  fill: new Fill({
                    color: '#ffcc33'
                  })
                })
              })
            });
            map.addLayer(vectorLayer);
          }
          if(draw){
            mapManager.inactivateDraw(draw);
          }
          draw = mapManager.activateDraw(value.key,source);
          const _this=this;
          draw.on('drawend', function(e) {
            const id=_this.getMapId();
            e.feature.set('id',id);
            _this.showSetDialog(id);
            _this.infoOverlay.setPosition(e.feature.getGeometry().getLastCoordinate());
          });
        },
        //获取随机绘制图形id
        getMapId(){
          return Number(Math.random().toString().substr(3,6) + Date.now()).toString(36);
        },
        //选择任一图形要素
        selectGeometry(){
          console.log(this.$refs.infoOverlay.$el);
          map.on('dblclick', this.mapClickHandler);
          if(draw){
            mapManager.inactivateDraw(draw);
          }
          select = new Select();
          map.addInteraction(select);
          const _this=this;
          select.on('select', function(e) {
            console.log(e.selected[0]);
            _this.selectedFeature=e.selected[0];
          });
        },
        //清除选中的图形
        clearSelectGeometry() {
          if (vectorLayer) {
            vectorLayer.getSource().removeFeature(this.selectedFeature);
            map.removeInteraction(select);
          }
        },
        //双击区域后触发此方法，带出mapId
        showSetDialog(mapId){
          let temp = null;
          for(let i=0;i<this.baoZhangData.length;i++){
            if(this.baoZhangData[i].mapId === mapId){
              temp = this.baoZhangData[i];
              this.index = i;
            }
          }
          this.baoZhangFormData.id = temp.id;
          this.baoZhangFormData.name = temp.name;
          this.baoZhangFormData.people = temp.people;
          this.baoZhangFormData.remark = temp.remark;
        },

        //重置保障点位设置
        reset(){
          this.baoZhangFormData = Object.assign({},this.$options.data()['baoZhangFormData']);
        },
        //保障点位设置弹窗的左上角关闭
        closeSetDialog(){
            this.infoOverlay.setPosition(undefined)
            this.reset();
        },

        //关闭保障视图弹窗
      handleCancel(){
        if(vectorLayer){
          vectorLayer.getSource().clear();
        }
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
  .show-set-button {
    position: absolute;
    top: 10px;
  }
  .set-baozhang-dialog {
    position: absolute;
    width: 400px;
    height: 300px;
    border: 1px solid #cccccc;
    background-color: #ffffff;
    border-radius: 6px;
    .set-baozhang-dialog-header {
      padding: 0px 10px;
      height: 40px;
      width: 100%;
      border-bottom: 1px solid #cccccc;
      i {
        font-size: 16px;
        cursor: pointer;
        color: #868e96;
        &:hover {
          color: #343434;
        }
      }
    }
    .set-baozhang-dialog-footer {
      height: 40px;
      width: 100%;
      text-align: center;
      line-height: 40px;
      border-top: 1px solid #cccccc;
      button:last-child {
        margin-left: 10px;
      }
    }
    .set-baozhang-dialog-body {
      height: calc(100% - 80px);
      width: 100%;
      padding: 10px;
      position: relative;
      /deep/.ant-form-item {
        margin-bottom: 6px;
      }
    }
  }
}
</style>
