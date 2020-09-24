<template>
  <a-modal
    ref="baoZhangDialog"
    :title="'保障视图 (' + baoZhangItemData.load + ')'"
    v-model="mapDialogVisible"
    :maskClosable="false"
    @cancel="handleCancel"
    wrapClassName="baoZhangDialogwraps"
    width="80%"
    :bodyStyle="{ padding: '0px 5px', borderRadius: '7px', overFlow: 'hidden' }"
    style="top:57px"
    :destroyOnClose="false"
    :afterClose="afterClose"
  >
    <div class="yuan_dialog_body" ref="baoZhangBody">
      <!-- 地图控件注入地址 -->
      <LayoutMap ref="olMap"></LayoutMap>
      <div hidden>
        <div class="set-baozhang-dialog" ref="infoOverlay">
          <div class="set-baozhang-dialog-header" flex="main:justify cross:center">
            <span>设置保障信息</span>
            <a-icon type="close" @click="closeSetDialog" />
          </div>
          <div class="set-baozhang-dialog-body">
            <cg-container scroll>
              <a-form :form="form" style="margin:10px">
                <a-form-item label="具体路段：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{ baoZhangItemData.load }}</span>
                </a-form-item>
                <a-form-item label="负责人：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{ baoZhangItemData.leaderName }}</span>
                </a-form-item>
                <a-form-item label="执勤人员：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{ baoZhangItemData.personNameStr }}</span>
                </a-form-item>
                <a-form-item label="支援人员：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{ baoZhangItemData.zhiyuan }}</span>
                </a-form-item>
                <a-form-item label="备注：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <a-textarea v-model="baoZhangItemData.remark" placeholder="" :autosize="{ minRows: 2, maxRows: 2 }" />
                </a-form-item>
              </a-form>
            </cg-container>
          </div>
          <div class="set-baozhang-dialog-footer">
            <a-button type="primary" size="small" @click="saveBaoZhangInfo">确定</a-button>
            <a-button type="primary" size="small" @click="reset">重置</a-button>
          </div>
        </div>
      </div>
      <div hidden>
        <div class="set-baozhang-dialog" ref="reviewInfoOverlay">
          <div class="set-baozhang-dialog-header" flex="main:justify cross:center">
            <span>保障信息</span>
            <a-icon type="close" @click="closeSetDialog" />
          </div>
          <div class="set-baozhang-dialog-body">
            <cg-container scroll>
              <a-form :form="form" style="margin:10px">
                <a-form-item label="具体路段：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{ baoZhangItemData.load }}</span>
                </a-form-item>
                <a-form-item label="负责人：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{ baoZhangItemData.leaderName }}</span>
                </a-form-item>
                <a-form-item label="执勤人员：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{ baoZhangItemData.personNameStr }}</span>
                </a-form-item>
                <a-form-item label="支援人员：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{ baoZhangItemData.zhiyuan }}</span>
                </a-form-item>
                <a-form-item label="备注：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{ baoZhangItemData.remark }}</span>
                </a-form-item>
              </a-form>
            </cg-container>
          </div>
          <div class="set-baozhang-dialog-footer">
            <a-button type="primary" size="small" @click="closeSetDialog">关闭</a-button>
          </div>
        </div>
      </div>
      <div class="search-map">
        <a-select
          show-search
          :value="value"
          placeholder="请输入搜索地点"
          style="width: 300px"
          :default-active-first-option="false"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          @search="handleSearchMap"
          @change="handleSearchChange"
        >
          <a-select-option v-for="(d, index) in data" :key="index">
            {{ d.name }}
          </a-select-option>
        </a-select>
      </div>
      <div v-if="nowOptType === 'edit' && !disableEdit" class="operate-panel">
        <a-dropdown>
          <a-menu slot="overlay" @click="handleOperateClick">
            <a-menu-item key="Point">点</a-menu-item>
            <a-menu-item key="LineString">线</a-menu-item>
            <a-menu-item key="Polygon">多边形</a-menu-item>
          </a-menu>
          <a-button class="op-btn yacz-btn">
            <span class="memu-title-text">新增</span>
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
        <!--<a-button type="primary" @click="editMapFeatures" v-if="this.baoZhangData.length>0">编辑</a-button>-->
        <!--<a-button type="primary" @click="selectGeometry">选择</a-button>-->
        <a-button type="primary" @click="clearSelectGeometry">删除</a-button>
      </div>
    </div>
    <template slot="footer">
      <a-button
        v-if="nowOptType === 'look' || disableEdit"
        @click="
          disableEdit = false
          mapDialogVisible = false
        "
        >关闭</a-button
      >
      <a-button v-if="nowOptType === 'edit' && !disableEdit" type="primary" @click="saveMap">保存视图</a-button>
      <a-button v-if="nowOptType === 'edit' && !disableEdit" @click="resetMap">重置视图</a-button>
    </template>
  </a-modal>
</template>
<script type="text/ecmascript-6">
  import { mapState, mapActions } from 'vuex'
  import LayoutMap from '@/views/map/olMap.vue'
  import { MapManager } from '@/utils/util.map.manage'
  import VectorLayer from 'ol/layer/Vector'
  import VectorSource from 'ol/source/Vector'
  import { Circle as CircleStyle,Fill, Stroke, Style} from 'ol/style.js';
  import { getSingleFeature,getAddress } from '@/api/map/service'
  import Draw from 'ol/interaction/Draw.js'
  let map;
  let mapManager;
  let draw;
  let source;
  let vectorLayer;
    export default{
      name: 'baoZhangMapDialog',
      components: {
        LayoutMap,
      },
      props:{
        visible: {
            type: Boolean,
            default: false
        },
        optType: {
          type: String,
          default: ''
        },
        peopleList:{
          type: Array,
          default(){
            return []
          }
        },
        loadData: {
          type: Object,
          default(){
            return {}
          }
        },
      },
      data(){
        return {
          data: [],//地址搜索返回数据
          value: undefined,// 地址搜索点击数据
          mapDialogVisible: false,
          //此环境中数据修改使用
          baoZhangItemData: {},
          //当没有数据可操作时，则所有按钮不可操作
          disableEdit:false,

          infoOverlay:null,
          drawFeature:{
            'Point': {
              add:null,
              delete:null
            },
            'LineString':{
              add: null,
              delete:null
            },
            'Polygon':{
              add: null,
              delete:null
            }
          },
          tempFeature:null,
          form: null,
          // //识别编辑/新增某个保障点位
          opType: 'add',
          reviewInfoOverlay:null,
        }
      },
      computed:{
        ...mapState('event/baoZhangData', ['baoZhangData']),
        //保障视图是新增还是编辑操作
        mapOperateType:function(){
          return this.baoZhangItemData.mapId&&this.baoZhangItemData.mapId.length>0?'edit':'add'
        },
        userType:function(){
          return this.$store.getters['cgadmin/user/type']
        },
        //只有中队可以编辑，其他角色不可编辑
        nowOptType:function(){
          let type = '';
          console.log('optType',this.optType);
          if(this.userType === 'zybm' && this.optType === 'edit'){
            type = 'edit';
          }
          else{
            type = 'look';
          }
          return type
        },
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
      mounted() {
        console.log('loadData',this.loadData);
      },
      methods:{
        // ...mapActions('event/baoZhangData', ['updateBaoZhangMapItemData']),
        init(){
          // this.deleteFeature=false;
          this.clearInitData();
          source&&source.clear();
          vectorLayer&&map.removeLayer(vectorLayer);
          this.$nextTick().then(() => {
              map = this.$refs.olMap.getMap();
              mapManager = new MapManager(map);
              //初始化地图弹框
              this.infoOverlay = mapManager.addOverlay({
                element: this.$refs.infoOverlay
              });
              this.reviewInfoOverlay = mapManager.addOverlay({
                element: this.$refs.reviewInfoOverlay
              });
              //绑定地图双击事件
              map.on('dblclick', this.mapClickHandler);
              //编辑状态下通过图形id获取已保存的图形数据
              if (!source) {
                source = new VectorSource({ wrapX: false });
                vectorLayer = new VectorLayer({
                  source: source,
                  style: new Style({
                    fill: new Fill({
                      color: 'rgba(255, 255, 255, 0.3)'
                    }),
                    stroke: new Stroke({
                      color: '#fc7012',
                      width: 5
                    }),
                    image: new CircleStyle({
                      radius: 7,
                      fill: new Fill({
                        color: '#fc7012'
                      })
                    })
                  })
                });
              }
              const currentData=this.baoZhangData[this.loadData.key+'_'+this.loadData.positionId];
              if(currentData.drawFeature){
                const feature=currentData.drawFeature[currentData.mapType].add;
                source.addFeature(feature);
              }else if(currentData.mapId.length>0){
                getSingleFeature(currentData.mapId, currentData.mapType).then(data => {
                  source.addFeatures(data);
                });
              }
              setTimeout(() => {
                map.addLayer(vectorLayer);
              }, 500)
          })
        },
        clearInitData(){
          console.log('loadData',this.loadData);
          this.baoZhangItemData = JSON.parse(JSON.stringify(this.loadData));
          if(this.baoZhangItemData.address){
            let personTemp = null;
            if(this.baoZhangItemData.leaderId){
              personTemp = this.peopleList.find(person => person.id === this.baoZhangItemData.leaderId);
            }
            let perName = this.baoZhangItemData.personList.reduce((arr, id) => {
              let person = this.peopleList.find(p => p.id === id);
              arr.push(person.name);
              return arr
            },[]);
            let addressName = this.baoZhangItemData.address.reduce((acc, it) => {
              acc = acc + '--' + it.name
              return acc
            },'').substring(2);
            let temp = {
              keyPositionId:this.baoZhangItemData.key+'_'+this.baoZhangItemData.positionId,
              positionId: this.baoZhangItemData.positionId,
              load: addressName,
              leaderName: personTemp&&personTemp.name ? personTemp.name : '',
              personNameStr: perName.join(','),
              zhiyuan: this.baoZhangItemData.zhiyuan,
              mapId: this.baoZhangItemData.mapId,
              mapType:this.baoZhangItemData.mapType,
              remark: this.baoZhangItemData.remark
            }
            this.baoZhangItemData = temp;
          }
          console.log('======保障视图内部操作的数据源=======',this.baoZhangItemData);
        },
        //地图点击事件处理器
        mapClickHandler({ pixel, coordinate }) {
          console.log('经纬度',coordinate);
          const feature = map.forEachFeatureAtPixel(pixel, feature => feature)
          if(feature&&feature.get('id')){
            // this.showSetDialog(feature.get('id'));
            // if(this.nowOptType!='edit'){
            //   this.reviewInfoOverlay.setPosition(coordinate);
            // }else{
            //   this.infoOverlay.setPosition(coordinate);
            // }
            console.log('==点击feature==',feature);
          }
        },
        //根据选择绘制图形
        handleOperateClick(value){
          map.un('dblclick', this.mapClickHandler);
          console.log('handleMenuClick',value);
          draw&&map.removeInteraction(draw);
          draw = new Draw({
            source: source,
            type: value.key
          })
          map.addInteraction(draw);
          const _this=this;
          draw.on('drawstart', function(e) {
           source&&source.clear();
          });
          draw.on('drawend', function(e) {
            map.removeInteraction(draw);
            const id=_this.getMapId();
            e.feature.set('id',id);
            e.feature.setId(id);
            const type=e.feature.getGeometry().getType();
            _this.baoZhangItemData.mapId = id;
            _this.baoZhangItemData.mapType = type;
            _this.drawFeature[type].add=e.feature;
            _this.infoOverlay.setPosition(e.feature.getGeometry().getLastCoordinate());
          });
        },
        //获取随机绘制图形id
        getMapId(){
          return Number(Math.random().toString().substr(3,6) + Date.now()).toString(36);
        },
        //清除选中的图形
        clearSelectGeometry() {
          // this.deleteFeature=true;
          Array.prototype.indexOf = function (val) {
            for (var i = 0; i < this.length; i++) {
              if (this[i] == val) return i;
            }
            return -1;
          };
          Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
              this.splice(index, 1);
            }
          };
          if (source) {
            const feature=source.getFeatures()[0];
            this.drawFeature[feature.getGeometry().getType()].delete=feature;
            source.clear();
            this.baoZhangItemData.mapId = '';
            this.baoZhangItemData.mapType = '';
            this.baoZhangItemData.remark = '';
          }
        },
        //双击区域后触发此方法，带出mapId
        // showSetDialog(mapId,mapType){
        //
        // },
        //保存保障点位设置
        saveBaoZhangInfo(){
          //只是对备注的修改
          console.log('saveBaoZhangInfo baoZhangItemData',this.baoZhangItemData);
          this.infoOverlay.setPosition(undefined);
        },
        //重置保障点位备注信息
        reset(){
          this.baoZhangItemData.remark = this.loadData.remark;
        },
        //保障点位设置弹窗的左上角关闭
        closeSetDialog(){
          this.infoOverlay&&this.infoOverlay.setPosition(undefined)
          this.reviewInfoOverlay&&this.reviewInfoOverlay.setPosition(undefined)
          this.reset();
        },
        closeDialog(){
          source=null;
          this.infoOverlay&&this.infoOverlay.setPosition(undefined)
          this.reviewInfoOverlay&&this.reviewInfoOverlay.setPosition(undefined)
          this.mapDialogVisible=false;
        },
        //保存图形数据
        saveMap() {
          this.infoOverlay&&this.infoOverlay.setPosition(undefined)
          this.reviewInfoOverlay&&this.reviewInfoOverlay.setPosition(undefined)
          if (draw) {
            map.removeInteraction(draw);
          }
          console.log('saveMap before', this.$store.getters['event/baoZhangData/baoZhangData']);

          if(this.baoZhangItemData.mapId.length>0){
            let data = {
              keyPositionId: this.baoZhangItemData.keyPositionId,
              positionId: this.baoZhangItemData.positionId,
              mapId: this.baoZhangItemData.mapId,
              mapType:this.baoZhangItemData.mapType,
              drawFeature: this.drawFeature
            };
            console.log('saveMap baoZhangMapItemData', data);
            this.$store.commit('event/baoZhangData/updateBaoZhangMapItemData', data);

            console.log('saveMap after', this.$store.getters['event/baoZhangData/baoZhangData']);
          }
          // this.updateBaoZhangMapItemData(data);
          console.log('saveMap baoZhangItemData', this.baoZhangItemData);
          this.disableEdit = false;
          this.mapDialogVisible = false;
          this.$emit('saveDrawData',this.baoZhangItemData)
        },
        //重置视图
        resetMap(){
          this.clearInitData();
          this.infoOverlay&&this.infoOverlay.setPosition(undefined)
          this.reviewInfoOverlay&&this.reviewInfoOverlay.setPosition(undefined)
          if(vectorLayer){
            vectorLayer.getSource().clear();
          }
        },
        //关闭保障视图弹窗
        handleCancel(){
          this.disableEdit = false;
          this.infoOverlay&&this.infoOverlay.setPosition(undefined)
          this.reviewInfoOverlay&&this.reviewInfoOverlay.setPosition(undefined)
          // if(!this.hasSave) {
          //   if (draw) {
          //     mapManager.inactivateDraw(draw);
          //   }
          //   source&&source.clear();
          //   console.log('关闭this.drawFeatures',this.drawFeatures);
          // }
          this.mapDialogVisible = false;
      },
      // 地图搜索
      handleSearchMap(value){
        getAddress(value).then(res=>{
          if(res){
            this.data=res;
            console.log('地址搜索==',res);
          }
        })
      },
      handleSearchChange(index) {
        const item = this.data[index];
        this.value = item.name;
        map.getView().animate({
          center: item.coord,
          zoom: 15,
          duration: 500
        })
      },
      afterClose(){
        this.disableEdit = false;
        console.log('关闭了')
      }
    }
}
</script>
<style lang="scss" scoped>
.yuan_dialog_body {
  /*height: 570px;*/
  height: 90%;
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
  .set-baozhang-dialog {
    position: absolute;
    /*top: 60px;*/
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
      ::v-deep.ant-form-item {
        margin-bottom: 6px;
      }
    }
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
