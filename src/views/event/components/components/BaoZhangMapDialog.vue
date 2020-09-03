<template>
  <a-modal ref="baoZhangDialog"
           title="保障视图"
           v-model="mapDialogVisible"
           :maskClosable="false"
           @cancel="handleCancel"
           wrapClassName="baoZhangDialogwraps"
           width="80%"
           :bodyStyle="{padding:'0px 5px',borderRadius:'7px',overFlow: 'hidden'}"
           style="top:57px"
           :destroyOnClose="false"
           :afterClose="afterClose"
  >

    <div class="yuan_dialog_body" ref="baoZhangBody">
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
                <a-form-item label="具体路段：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <a-select
                          placeholder="请选择道路"
                          @change="handleChange"
                          v-model="baoZhangFormData.positionId"
                  >
                    <a-select-option v-for="baoZhang in baoZhangArr" :key="baoZhang.positionId">
                      {{ baoZhang.load }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="负责人：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{baoZhangFormData.leaderName}}</span>
                </a-form-item>
                <a-form-item label="执勤人员：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{baoZhangFormData.personNameStr}}</span>
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
                  <a-select
                          placeholder="请选择道路"
                          @change="handleChange"
                          v-model="baoZhangFormData.positionId"
                          disabled
                  >
                    <a-select-option v-for="baoZhang in baoZhangArr" :key="baoZhang.positionId">
                      {{ baoZhang.load }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="负责人：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{baoZhangFormData.leaderName}}</span>
                </a-form-item>
                <a-form-item label="执勤人员：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <span>{{baoZhangFormData.personNameStr}}</span>
                </a-form-item>
                <a-form-item label="备注：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                  <a-textarea v-model="baoZhangFormData.remark" placeholder="" :autosize="{ minRows: 2, maxRows: 2 }" disabled/>
                </a-form-item>
              </a-form>
            </cg-container>
          </div>
          <div class="set-baozhang-dialog-footer">
            <a-button type="primary" size="small" @click="closeSetDialog">关闭</a-button>
          </div>
        </div>
      </div>
      <div v-if="nowOptType==='edit'&&!disableEdit" class="operate-panel">
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
      <a-button v-if="nowOptType==='look'||disableEdit" @click="disableEdit = false;mapDialogVisible=false;">关闭</a-button>
      <a-button v-if="nowOptType==='edit'&&!disableEdit" type="primary" @click="saveMap">保存视图</a-button>
      <a-button v-if="nowOptType==='edit'&&!disableEdit" @click="resetMap">重置视图</a-button>
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
  import Draw from 'ol/interaction/Draw.js'
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
      },
      data(){
        return {
          baoZhangData: [],
          baoZhangArr: [],
          mapDialogVisible: false,
          //当没有数据可操作时，则所有按钮不可操作
          disableEdit:false,

          infoOverlay:null,
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
          tempFeatures:null,
          selectedFeature:null,

          form: null,
          //一条保障点位的数据
          baoZhangFormData: {
            load: '',
            positionId: '',
            leaderName: '',
            personNameStr: '',
            remark: '',
            mapId: '',
            mapType:''
          },
          // //识别编辑/新增某个保障点位
          opType: 'add',
          //编辑时,确定第几个保障点位
          index: 0,

          //所有的保障点位数据，后续所有操作已这个为基础，最后保存时也已这个作为保存数据
          allBaoZhangData: [],
          hasSave:false,
          reviewInfoOverlay:null,
        }
      },
      computed:{
        //保障视图是新增还是编辑操作
        mapOperateType:function(){
          return this.baoZhangData.length>0?'edit':'add'
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
        console.log(111)
      },
      methods:{
        init(){
          this.clearInitData();
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
            // source=null;
            //绑定地图双击事件
            map.on('dblclick', this.mapClickHandler);
            //编辑状态下通过图形id获取已保存的图形数据
            // 只要设置了组，这里数据一直是大于0
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
                      color: '#fc7012',
                      width: 2
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
                _this.tempSource=source;
                if(this.nowOptType!='look'){
                  _this.editMapFeatures();
                }
                map.addLayer(vectorLayer);
              },500)
            }
          })
        },
        clearInitData(){
          this.baoZhangData = this.$store.getters['event/dunDianQuanDaoData/dunDianQuanDaoInfo'].teamPersonList;
          console.log('this.baoZhangData',this.baoZhangData);
          this.baoZhangArr = [];
          let baoZhangObj = JSON.parse(JSON.stringify(this.baoZhangData));
          baoZhangObj.forEach(baoZhangItem => {
            let a = baoZhangItem.teamPersonData.reduce((acc, item) => {
              if(item.address){
                let personTemp = this.peopleList.find(person => person.id === item.leaderId);
                let perName = item.personList.reduce((arr, id) => {
                  let person = this.peopleList.find(p => p.id === id);
                  arr.push(person.name);
                  return arr
                },[]);
                let addressName = item.address.reduce((acc, it) => {
                    acc = acc + '--' + it.name
                    return acc
                  },'').substring(2);
                let temp = {
                  positionId: item.address[2].id,
                  load: addressName,
                  leaderName: personTemp&&personTemp.name ? personTemp.name : '',
                  personNameStr: perName.join(','),
                  remark: item.remark,
                  mapId: item.mapId,
                  mapType:item.mapType,
                }
                acc.push(temp);
              }
              return acc
            },[]);
            this.baoZhangArr = this.baoZhangArr.concat(a);
          });
          this.allBaoZhangData = JSON.parse(JSON.stringify(this.baoZhangArr));
          //最终保存时，更新一下store
          console.log('打开保障视图需要的数据',this.allBaoZhangData);
          if(this.allBaoZhangData.length===0){
            this.disableEdit = true;
          }
          else{
            this.disableEdit = false;
          }
        },
        //地图点击事件处理器
        mapClickHandler({ pixel, coordinate }) {
          const feature = map.forEachFeatureAtPixel(pixel, feature => feature)
          if(feature&&feature.get('id')){
            this.showSetDialog(feature.get('id'));
            if(this.nowOptType!='edit'){
              this.reviewInfoOverlay.setPosition(coordinate);
            }else{
              this.infoOverlay.setPosition(coordinate);
            }
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
                  color: '#fc7012',
                  width: 2
                }),
                image: new CircleStyle({
                  radius: 7,
                  fill: new Fill({
                    color: '#fc7012'
                  })
                })
              })
            });
            map.addLayer(vectorLayer);
          }
          map.removeInteraction(draw);
          draw = new Draw({
            source: source,
            type: value.key
          })
          map.addInteraction(draw);
          // draw = mapManager.activateDraw(draw,value.key,source);
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
            // console.log(_this.tempSource.getFeatures());
            // if(_this.tempSource.hasFeature(e.feature)){
            //   const type=e.feature.getGeometry().getType();
            //   _this.drawFeatures[type].delete.push(e.feature);
            // }
            const type=e.feature.getGeometry().getType();
            if(!_this.drawFeatures[type].add.includes(e.feature)){
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
          let deleteData;
          if (vectorLayer) {
            vectorLayer.getSource().removeFeature(this.selectedFeature);
            map.removeInteraction(select);
            for(let i=0;i<this.allBaoZhangData.length;i++){
              if(this.allBaoZhangData[i].mapId==this.selectedFeature.get('id')){
                deleteData=this.allBaoZhangData[i];
              }
            }
            const deletePeopleList = deleteData.personList;
            for(let i=0;i<deletePeopleList.length;i++){
              this.checkedPeopleIdList.remove(deletePeopleList[i]);
            }
            this.allBaoZhangData.remove(deleteData);
            console.log(this.allBaoZhangData);
            console.log(this.checkedPeopleIdList)
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
            this.baoZhangFormData.positionId = temp.positionId;
            this.baoZhangFormData.leaderName = temp.leaderName;
            this.baoZhangFormData.personNameStr = temp.personNameStr;
            this.baoZhangFormData.remark = temp.remark;
          }
          else{
            this.baoZhangFormData = Object.assign({},this.$options.data()['baoZhangFormData']);
            this.baoZhangFormData.mapId = mapId;
            this.baoZhangFormData.mapType = mapType;
            this.baoZhangFormData.remark = '';
          }
        },
        //人员选择
        handleChange(value) {
          console.log(`Selected: ${value}`,value);
          let baoZhang = this.baoZhangArr.find(baoZhang => baoZhang.positionId === value);
          this.baoZhangFormData.leaderName = baoZhang.leaderName;
          this.baoZhangFormData.personNameStr = baoZhang.personNameStr;
          this.baoZhangFormData.load = baoZhang.load;
        },
        //保存保障点位设置
        saveBaoZhangInfo(){
          console.log('this.baoZhangFormData',this.baoZhangFormData);
          console.log('this.opType',this.opType);
          this.allBaoZhangData.map(baozhang => {
            if(baozhang.positionId===this.baoZhangFormData.positionId){
              baozhang.load = this.baoZhangFormData.load;
              baozhang.leaderName = this.baoZhangFormData.leaderName;
              baozhang.personNameStr = this.baoZhangFormData.personNameStr;
              baozhang.remark = this.baoZhangFormData.remark;
              baozhang.mapId = this.baoZhangFormData.mapId;
              baozhang.mapType = this.baoZhangFormData.mapType;
            }
          });

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
          this.infoOverlay&&this.infoOverlay.setPosition(undefined)
          this.reviewInfoOverlay&&this.reviewInfoOverlay.setPosition(undefined)
          this.reset();
        },
        //保存图形数据
        saveMap() {
          this.hasSave=true;
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

          let sourceData = this.$store.getters['event/dunDianQuanDaoData/dunDianQuanDaoInfo'];
          sourceData.teamPersonList.forEach(baoZhangTeamItem => {
            baoZhangTeamItem.teamPersonData.map(baozhang => {
              let data = this.allBaoZhangData.find(item => item.positionId===baozhang.positionId);
              baozhang.mapId = data.mapId;
              baozhang.mapType = data.mapType;
              baozhang.remark = data.remark;
            });
          });
          this.disableEdit = false;
          this.$store.commit('event/dunDianQuanDaoData/updateDunDianQuanDaoInfo',sourceData);
          this.$emit('saveDrawData',this.drawFeatures);
          this.mapDialogVisible = false;
          // map.on('dblclick', this.mapClickHandler);
        },
        //重置视图
        resetMap(){
          this.clearInitData();
          if(vectorLayer){
            vectorLayer.getSource().clear();
          }
        },
        //关闭保障视图弹窗
        handleCancel(){
          this.disableEdit = false;
          if(!this.hasSave) {
            this.allBaoZhangData = [];
            if (draw) {
              mapManager.inactivateDraw(draw);
            }
            if (vectorLayer) {
              vectorLayer.getSource().clear();
            }
          }
          this.mapDialogVisible = false;
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
<style lang='scss'>
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
        border-image: linear-gradient(90deg,#0065ea 0%, #6f62ee 100%) 30 30;
        border-width: 0px 5px 10px 5px;
        background-color: #fff;
      }
    }
  }
</style>
