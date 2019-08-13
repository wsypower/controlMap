<template>
    <a-modal ref="baoZhangDialog" title="保障视图" v-model="mapDialogVisible" width="100%"
             @cancel="handleCancel">
        <div class="yuan_dialog_body" id="bao_zhang_map" ref="baoZhangBody">
            <!-- 地图控件注入地址 -->
            <LayoutMap ref="olMap"></LayoutMap>
            <a-button type="primary" @click="showSetDialog(0)" class="show-set-button">展示设置弹窗</a-button>
            <div class="set-baozhang-dialog">
                <div class="set-baozhang-dialog-header" flex="main:justify cross:center">
                    <span>设置保障信息</span>
                    <a-icon type="close" @click="closeSetDialog"/>
                </div>
                <div class="set-baozhang-dialog-body">
                    <cg-container scroll>
                        <a-form :form="form" style="margin:10px">
                            <a-form-item label="保障点位：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                                <a-input v-model="baoZhangFormData.name" placeholder="请输入保障点位"/>
                            </a-form-item>
                            <a-form-item label="人员选择：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                                <a-select
                                        mode="multiple"
                                        placeholder="请选择人员"
                                        @change="handleChange"
                                        v-model="baoZhangFormData.personList"
                                >
                                    <a-select-option v-for="person in peopleList" :key="person.id">
                                        {{person.name}}
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
            <div class="operate-panel">
                <a-dropdown>
                    <a-menu slot="overlay" @click="handleOperateClick">
                        <a-menu-item key="area">多边形</a-menu-item>
                        <a-menu-item key="line">线</a-menu-item>
                        <a-menu-item key="dot">点</a-menu-item>
                    </a-menu>
                    <a-button class="op-btn yacz-btn">
                        <span class="memu-title-text">绘图工具</span>
                        <a-icon type="down" />
                    </a-button>
                </a-dropdown>
                <!--<a-button type="primary" @click="clearDraw">清除选中区域</a-button>-->
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
  import { MapManager } from '@/utils/util.map.manage'
  import VectorLayer from 'ol/layer/Vector'
  import VectorSource from 'ol/source/Vector'
  import Select from 'ol/interaction/Select.js';
  let map;
  let mapManager;
  let draw;
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
          mapDialogVisible: false,
          pointFeatures:[],
          lineFeatures:[],
          polygonFeatures:[],
          drawFeatures:[],
          selectedFeature:null,
          form: null,
          //一条保障点位的数据
          baoZhangFormData: {
            mapId: '',
            name: '',
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
          return this.allBaoZhangData.reduce((res,item)=>{
            let temp = item.peopleList.reduce((r,i)=>{
              r.push(i.id);
              return r
            },[])
            return res.concat(temp)
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
          let height = document.body.clientHeight - 300;
          this.$refs.baoZhangBody.style.height= height + 'px';
          map = this.$refs.olMap.getMap();
          mapManager = new MapManager(map);
        })

      },
      methods:{
        init(){
          this.allBaoZhangData = JSON.parse(JSON.stringify(this.baoZhangData));
        },
        handleOperateClick(value){
          console.log('handleMenuClick',value);
          switch(value.key){
            case 'area':
              this.drawArea();
              break;
            case 'line':
              this.drawLine();
              break;
            case 'dot':
              this.drawDot();
              break;
            default:
              console.log('no operation');
          }
        },
        //获取随机绘制图形id
        getMapId(){
          return Number(Math.random().toString().substr(3,6) + Date.now()).toString(36);
        },
        //绘制图形
        drawGeometry(type){
          if(select){
            map.removeInteraction(select);
          }
          if(!source){
            source = new VectorSource({ wrapX: false });
            vectorLayer = new VectorLayer({
              source: source
            });
            map.addLayer(vectorLayer);
          }
          if(draw){
            mapManager.inactivateDraw(draw);
          }
          draw = mapManager.activateDraw(type,source);
          const _this=this;
          draw.on('drawend', function(e) {
            e.feature.set('id',_this.getMapId());
            // if(type=='Point'){
            //   _this.pointFeatures.push(e.feature)
            // }
            // else if(type=='LineString'){
            //   _this.lineFeatures.push(e.feature)
            // }
            // else{
            //   _this.polygonFeatures.push(e.feature)
            // }
          })
        },
        //选择图形
        selectGeometry(){
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
            let selectList = temp.peopleList.reduce((r,i)=>{
              r.push(i.id);
              return r
            },[])
            this.filterPeopleList = this.checkedPeopleIdList.reduce((res,item)=>{
              if(!selectList.includes(item)){
                res.push(item)
              }
              return res
            },[]);

            this.baoZhangFormData.name = temp.name;
            this.baoZhangFormData.personList = temp.personList;
            this.baoZhangFormData.remark = temp.remark;
          }
          else{
            this.filterPeopleList = this.checkedPeopleIdList;
            this.baoZhangFormData.mapId = mapId;
            this.baoZhangFormData.name = '';
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
          console.log('this.baoZhangFormData',this.baoZhangFormData)
          if(this.opType == 'edit'){
            this.allBaoZhangData[this.index].name = this.baoZhangFormData.name;
            this.allBaoZhangData[this.index].personList = this.baoZhangFormData.personList;
            this.allBaoZhangData[this.index].remark = this.baoZhangFormData.remark;
          }
          else{
            this.allBaoZhangData.push(this.baoZhangFormData);
          }
        },
        //重置保障点位设置
        reset(){
          let mapId = this.baoZhangFormData.mapId;
          this.baoZhangFormData = Object.assign({},this.$options.data()['baoZhangFormData']);
          this.baoZhangFormData.mapId = mapId;
        },
        //保障点位设置弹窗的左上角关闭
        closeSetDialog(){
            this.reset();
        },
        drawArea(){

        },
        drawLine(){

        },
        drawDot(){

        },
        //保存图形数据
        saveMap() {
          console.log('新增还是编辑：mapOperateType', this.mapOperateType);
          this.pointFeatures = [];
          this.lineFeatures = [];
          this.polygonFeatures = [];
          if (draw) {
            mapManager.inactivateDraw(draw);
          }
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
          this.drawFeatures=[this.pointFeatures,this.lineFeatures,this.polygonFeatures]
          console.log('this.allBaoZhangData', this.allBaoZhangData);
          this.$emit('saveDrawData',this.drawFeatures);
          this.mapDialogVisible = false;
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
        .show-set-button{
            position: absolute;
            top: 10px;
        }
        .set-baozhang-dialog{
            position: absolute;
            top: 60px;
            width: 400px;
            height: 300px;
            border: 1px solid #cccccc;
            background-color: #ffffff;
            border-radius: 6px;
            .set-baozhang-dialog-header{
                padding: 0px 10px;
                height: 40px;
                width: 100%;
                border-bottom: 1px solid #cccccc;
                i{
                    font-size: 16px;
                    cursor: pointer;
                    color: #868e96;
                    &:hover{
                        color: #343434;
                    }
                }
            }
            .set-baozhang-dialog-footer{
                height: 40px;
                width: 100%;
                text-align: center;
                line-height: 40px;
                border-top: 1px solid #cccccc;
                button:last-child{
                    margin-left: 10px;
                }
            }
            .set-baozhang-dialog-body{
                height:calc(100% - 80px);
                width:100%;
                padding:10px;
                position: relative;
                /deep/.ant-form-item{
                    margin-bottom: 6px;
                }
            }
        }
      }
</style>
