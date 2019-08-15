<template>
  <a-modal ref="baoZhangDialog" title="保障视图" v-model="mapDialogVisible" width="100%" :maskClosable="false" @cancel="handleCancel">
    <div class="yuan_dialog_body" id="bao_zhang_map" ref="baoZhangBody">
      <!-- 地图控件注入地址 -->
      <LayoutMap ref="olMap"></LayoutMap>
      <!--<a-button type="primary" @click="showSetDialog(0)" class="show-set-button">展示设置弹窗</a-button>-->
      <div hidden>
        <div class="set-baozhang-dialog" ref="infoOverlay">
          <div class="set-baozhang-dialog-header" flex="main:justify cross:center">
            <span>设置保障信息</span>
            <a-icon type="close" @click="closeSetDialog" />
          </div>
          <div class="set-baozhang-dialog-body">
            <cg-container scroll>
              <a-form :form="form" style="margin:10px">
                <a-form-item label="保障点位：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <a-input v-model="baoZhangFormData.name" placeholder="请输入保障点位" />
                </a-form-item>
                <a-form-item label="人员选择：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <a-select
                    mode="multiple"
                    placeholder="请选择人员"
                    @change="handleChange"
                    v-model="baoZhangFormData.personList"
                  >
                    <a-select-option v-for="person in peopleList" :key="person.id">
                      {{ person.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="备注：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <a-textarea v-model="baoZhangFormData.remark" placeholder="" :autosize="{ minRows: 2, maxRows: 2 }" />
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
      <div class="operate-panel">
        <a-dropdown>
          <a-menu slot="overlay" @click="handleOperateClick">
            <a-menu-item key="Point">点</a-menu-item>
            <a-menu-item key="LineString">线</a-menu-item>
            <a-menu-item key="Polygon">多边形</a-menu-item>
          </a-menu>
          <a-button class="op-btn yacz-btn">
            <span class="memu-title-text">新增</span>
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
        <!--<a-button type="primary" @click="editMapFeatures" v-if="this.baoZhangData.length>0">编辑</a-button>-->
        <a-button type="primary" @click="selectGeometry">选择</a-button>
        <a-button type="primary" @click="clearSelectGeometry">删除选择</a-button>
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
  import { MapManager,filterMapId } from '@/utils/util.map.manage'
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
      name: 'baoZhangMapDialog',
      components: {
        LayoutMap,
      },
      props:{
        visible: {
            type: Boolean,
            default: false
        },
        sourcePeopleList:{
          type: Array,
          default(){
            return []
          }
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
          drawFeatures:{
            'Point': {
              add:[],
              update:[],
              delete:[]
            },
            'LineString':{
              add: [],
              update:[],
              delete:[]
            },
            'Polygon':{
              add: [],
              update:[],
              delete:[]
            }
          },
          editFeatures:{
            add:[],
            update:[],
            delete:[]
          },
          tempChangeFeature:null,
          tempSource:null,
          selectedFeature:null,
          form: null,
          //一条保障点位的数据
          baoZhangFormData: {
            mapId: '',
            name: '',
            mapType:'',
            personList: [],
            remark: ''
          },
          //识别编辑/新增某个保障点位
          opType: 'add',
          //编辑时,确定第几个保障点位
          index: 0,
          //某一个保障点位，需要过滤的人员数据
          filterPeopleList: [],
          //所有的保障点位数据，后续所有操作已这个为基础，最后保存时也已这个作为保存数据
          //allBaoZhangData有值为编辑，没有值为新增
          allBaoZhangData: []
        }
      },
      computed:{
        //所有已选择人员数据
        checkedPeopleIdList: function(){
          return this.baoZhangData.reduce((res,item)=>{
            item.personList.forEach((id)=>{
              res.push(id)
            })
            return res
          },[]);
        },
        //可选择的人员数据
        peopleList:function(){
          let resArr = this.sourcePeopleList.reduce((res,item)=>{
            if(!this.filterPeopleList.includes(item.id)){
              res.push(item)
            }
            return res
          },[])
          console.log('peopleList',this.resArr);
            return resArr

        },
        //保障视图是新增还是编辑操作
        mapOperateType:function(){
          return this.baoZhangData.length>0?'edit':'add'
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
        },

      },
      created(){
        this.form = this.$form.createForm(this);
      },
      mounted() {},
      updated(){
        this.$nextTick().then(() => {
        //   // let height = document.body.clientHeight - 300;
        //   // this.$refs.baoZhangBody.style.height= height + 'px';
        //   if(!map){
            // map = this.$refs.olMap.getMap();
            // mapManager = new MapManager(map);
            // //初始化地图弹框
            // this.infoOverlay = mapManager.addOverlay({
            //   element: this.$refs.infoOverlay
            // });
            // //绑定地图双击事件
            // map.on('dblclick', this.mapClickHandler);
          // }
        })
      },
      methods:{
        init(){
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
            this.allBaoZhangData = JSON.parse(JSON.stringify(this.baoZhangData));
            //编辑状态下通过图形id获取已保存的图形数据
            if(this.allBaoZhangData.length>0){
              const idList=filterMapId(this.allBaoZhangData);
              console.log(idList);
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
              }
              if(idList[0]){
                getEmergencyFeatures(idList[0],'Point').then(data=>{
                  console.log('查询点',data);
                  source.addFeatures(data);
                });
              }
              if(idList[1]){
                getEmergencyFeatures(idList[1],'LineString').then(data=>{
                  console.log('查询线',data);
                  source.addFeatures(data);
                });
              }
              if(idList[2]){
                getEmergencyFeatures(idList[2],'Polygon').then(data=>{
                  console.log('查询面',data);
                  source.addFeatures(data);
                });
              }
              const _this=this;
              setTimeout(()=>{
                console.log('==source==',source)
                _this.tempSource=source;
                _this.editMapFeatures();
                map.addLayer(vectorLayer);
              },500)
            }
          })
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
            _this.showSetDialog(id,e.feature.getGeometry().getType());
            _this.infoOverlay.setPosition(e.feature.getGeometry().getLastCoordinate());
          });
        },
        editMapFeatures(){
          const _this=this;
          modify = mapManager.activeModify(source);
          modify.on("modifyend",function (e) {
            const type=_this.tempChangeFeature.getGeometry().getType();
            _this.drawFeatures[type].update.push(_this.tempChangeFeature);
          });
          source.on('addfeature', function(e) {
            e.preventDefault();
            const type=e.feature.getGeometry().getType();
            _this.drawFeatures[type].add.push(e.feature);
          });
          source.on('changefeature', function(e) {
            e.preventDefault();
            _this.tempChangeFeature=e.feature;
          });
          source.on('removefeature', function(e) {
            e.preventDefault();
            if(_this.tempSource.hasFeature(e.feature)){
              const type=e.feature.getGeometry().getType();
              _this.drawFeatures[type].delete.push(e.feature);
            }
          });
        },
        //获取随机绘制图形id
        getMapId(){
          return Number(Math.random().toString().substr(3,6) + Date.now()).toString(36);
        },
        //选择任一图形要素
        selectGeometry(){
          console.log(this.$refs.infoOverlay.$el);
          map.removeInteraction(modify);
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
            console.log('==removemapip==',this.selectedFeature.get('id'));
          }
        },
        //双击区域后触发此方法，带出mapId
        showSetDialog(mapId,mapType){
          let flag = this.allBaoZhangData.some(item =>{
            return item.mapId === mapId
          });
          this.opType = flag? 'edit': 'add';

          if(this.opType === 'edit'){
              let temp = null;
              for(let i=0;i<this.allBaoZhangData.length;i++){
                if(this.allBaoZhangData[i].mapId === mapId){
                  temp = this.allBaoZhangData[i];
                  this.index = i;
                }
              }
              if(temp.personList){
                let selectList = temp.personList.reduce((r,i)=>{
                  r.push(i);
                  return r
                },[])
                this.filterPeopleList = this.checkedPeopleIdList.reduce((res,item)=>{
                  if(!selectList.includes(item)){
                    res.push(item)
                  }
                  return res
                },[]);
              }
            this.baoZhangFormData.name = temp.name;
            this.baoZhangFormData.personList = temp.personList;
            this.baoZhangFormData.remark = temp.remark;
          }
          else{
            this.filterPeopleList = this.checkedPeopleIdList;
            this.baoZhangFormData.mapId = mapId;
            this.baoZhangFormData.name = '';
            this.baoZhangFormData.mapType=mapType;
            this.baoZhangFormData.personList = [];
            this.baoZhangFormData.remark = '';
          }
        },
        //人员选择
        handleChange(value) {
          console.log(`Selected: ${value}`,value);
          this.baoZhangFormData.personList = value;
        },
        //保存保障点位设置
        saveBaoZhangInfo(){
          console.log('this.baoZhangFormData',this.baoZhangFormData);
          console.log('this.opType',this.opType);
          if(this.opType == 'edit'){
            this.allBaoZhangData[this.index].name = this.baoZhangFormData.name;
            this.allBaoZhangData[this.index].personList = this.baoZhangFormData.personList;
            this.allBaoZhangData[this.index].remark = this.baoZhangFormData.remark;
          }
          else{
            let temp = JSON.parse(JSON.stringify(this.baoZhangFormData))
            this.allBaoZhangData.push(temp);
          }
          this.baoZhangFormData.personList.forEach((item)=>{
            this.checkedPeopleIdList.push(item);
          })

          console.log('saveBaoZhangInfo',this.allBaoZhangData);

          this.infoOverlay.setPosition(undefined);
        },
        //重置保障点位设置
        reset(){
          let mapId = this.baoZhangFormData.mapId;
          this.baoZhangFormData = Object.assign({},this.$options.data()['baoZhangFormData']);
          this.baoZhangFormData.mapId = mapId;
        },
        //保障点位设置弹窗的左上角关闭
        closeSetDialog(){
            this.infoOverlay.setPosition(undefined)
            this.reset();
        },
        //保存图形数据
        saveMap() {
          debugger;
          console.log('==编辑要素==',this.editFeatures)
          this.pointFeatures = [];
          this.lineFeatures = [];
          this.polygonFeatures = [];
          if (draw) {
            mapManager.inactivateDraw(draw);
          }
          console.log('新增还是编辑：mapOperateType', this.mapOperateType);
          if(this.mapOperateType=='add'){
            const features = vectorLayer.getSource().getFeatures();
            for (let i = 0; i < features.length; i++) {
              if (features[i].getGeometry().getType() == 'Point') {
                this.pointFeatures.push(features[i])
              }
              else if (features[i].getGeometry().getType() == 'LineString') {
                this.lineFeatures.push(features[i])
              }
              else {
                this.polygonFeatures.push(features[i])
              }
            }
            this.drawFeatures={
              'Point': {
                add:this.pointFeatures,
                update:null,
                delete:null
              },
              'LineString':{
                add: this.lineFeatures,
                update:null,
                delete:null
              },
              'Polygon':{
                add: this.polygonFeatures,
                update:null,
                delete:null
              }
            };
          }
          if(this.mapOperateType=='edit'){
            console.log('==drawFeature==',this.drawFeatures)
          }
          console.log('this.allBaoZhangData', this.allBaoZhangData);
          let data = {
            drawFeatures: this.drawFeatures,
            allBaoZhangData:this.allBaoZhangData
          }
          this.$emit('saveDrawData',data);

          this.mapDialogVisible = false;
          map.on('dblclick', this.mapClickHandler);
        },
        //重置视图
        resetMap(){
          this.allBaoZhangData = [];
          if(vectorLayer){
            vectorLayer.getSource().clear();
          }
        },
        //关闭保障视图弹窗
        handleCancel(){
        this.allBaoZhangData = [];
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
      /deep/.ant-form-item {
        margin-bottom: 6px;
      }
    }
  }
}
</style>
