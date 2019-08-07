<template>
  <div class="yuan-body" flex>
    <a-form :form="form" hideRequiredMark @submit="handleSubmit" style="width: 100%">
      <div class="yuan-form">
        <a-row style="height:100%">
          <a-col :span="12" style="height:100%">
            <!--<cg-container scroll>-->
            <!--<div style="height: 290px">-->
              <happy-scroll color="rgba(0,0,0,0.2)" size="5" resize smaller-move-v="end" bigger-move-v="end">
                <div>
                  <a-form-item
                    label="类型"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
                  >
                    <a-select
                        v-decorator="['typeId',config]"
                        placeholder="请选择"
                        style="width: 277px">
                      <a-select-option
                              v-for="(item,index) in typeList"
                              :value="item.id"
                              :key="item.id">
                          {{item.name}}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item
                    label="等级"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
                  >
                    <a-select
                              v-decorator="['levelId',config]"
                              placeholder="请选择"
                              style="width: 277px">
                      <a-select-option
                              v-for="(item,index) in levelList"
                              :value="item.id"
                              :key="item.id">
                          {{item.name}}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item
                    label="时间"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
                  >
                      <a-range-picker
                              v-decorator="['rangeDay', config]"
                              :placeholder="['开始日期', '结束日期']"
                              :disabledDate="disabledDate"
                              format="YYYY-MM-DD"
                              style="width: 277px"
                      />
                  </a-form-item>
                  <a-form-item
                    label="位置"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
                  >
                    <a-input v-decorator="['position',configText]"
                             placeholder="请输入" style="width: 277px" />
                  </a-form-item>
                  <a-form-item
                    label="信息"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
                  >
                    <a-textarea v-decorator="['description',configText]"
                            placeholder="请输入" :rows="2" :autosize="{minRows: 2, maxRows: 2}" style="width: 277px" />
                  </a-form-item>
                  <a-form-item
                    label="区域"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
                  >
                    <div v-if="sourceData.id">
                      <span style="margin-right: 10px;">{{areaName}}</span>
                      <a-button type="primary" size="small" @click="editAreaPart">区域微调</a-button>
                    </div>
                    <a-select v-else v-decorator="['areaId',config]"
                              placeholder="请选择" style="width: 277px" @select="selectPaintMethod">
                      <a-select-option
                              v-for="(item,index) in areaList"
                              :value="item.id"
                              :key="item.id">
                          {{item.name}}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
            <!--</cg-container>-->
              </happy-scroll>
            <!--</div>-->
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="照片"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-upload
                name="file"
                listType="picture-card"
                class="avatar-uploader"
                accept=".jpg,.png"
                :showUploadList="false"
                action="http://192.168.71.33:50000/file/file/uploadFileWeb"
                :beforeUpload="beforeUpload"
                @change="handleImgChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else class="upload-btn"></div>
              </a-upload>
            </a-form-item>
            <a-form-item
              label="附件"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-upload
                name="file"
                :multiple="false"
                action="http://192.168.71.33:50000/file/file/uploadFileWeb"
                :beforeUpload="beforeFileUpload"
                :showUploadList="false"
                @change="handleFileChange"
              >
                <a-button style="width: 277px;">
                  <a-icon type="upload" /> 上传附件<a-icon style="margin-left: 20px;" v-if="fileLoading" type="loading"/>
                </a-button>
              </a-upload>
              <div v-if="fileList.length>0" class="upload-file-panel" flex="main:justify cross:center">
                <div v-for="(file,index) in fileList" class="file-item" flex="cross:center">
                  <span>{{file.oldName}}</span><a-icon type="close" @click="deleteFile(index)"/>
                </div>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <div class="operate-panel" flex="main:center cross:center">
        <a-button type="primary" html-type="submit">提交</a-button>
      </div>
    </a-form>
  </div>
</template>
<script type="text/ecmascript-6">
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { mapActions,mapState } from 'vuex';
import Feature from 'ol/Feature';
import { getCenter } from 'ol/extent'
import Circle from 'ol/geom/Circle';
import { postEmergencyArea } from '@/api/map/service'
import { emergencyAreaStyle } from '@/utils/util.map.style'
import {circleToPloygon} from '@/utils/util.map.manage'
let draw;
export default {
    name: 'yuanForm',
    data(){
        return{
           drawLayer:null,
           drawFeature:null,//绘制区域
           emergencyLayer:null,
           drawType:0,//绘制区域类型
           modifyType:0,//区域修改类型
           beforeModifyFeature:null,
           mapCenter:null,//绘制区域中心点位坐标
           mapId:null,
           form: this.$form.createForm(this),
            //校验配置
            config: {rules: [{ required: true, message: '请选择' }]},
            configText: {rules: [{ required: true, message: '请输入' }]},
            //类型数据
            typeList: [],
            //等级数据
            levelList: [],
            //区域数据
            areaList:[
              // {'id':'0','name':'正方形'},
              // {'id':'1','name':'矩形'},
              {'id':'2','name':'圆形'},
              {'id':'3','name':'多边形'},
              {'id':'4','name':'任意面'}],
            //区域名称
            areaName: '',
            //照片路径，全路径
            imageUrl: '',
            //照片上传后得到的照片对象
            image:{},
            //附件上传过程的动效展示
            fileLoading: false,
            //附件上传后得到的附件对象数组
            fileList:[],
            //编辑时是否点击区域微调
            clickAreaEdit: false
        }
    },
    props:{
        //原始数据
        sourceData:{
            type: Object,
            default(){
                return{}
            }
        }
    },
    watch:{},
    created(){},
    mounted(){
        let _this = this;
        this.getEmergencyYuAnInitData().then((res) => {
              _this.typeList = res.emergency_plan_type;
              _this.levelList = res.emergency_plan_grade;

            //console.log('_this.sourceData',_this.sourceData,moment(_this.sourceData.startDay, 'YYYY-MM-DD'),moment(1567159292614).format());
            let startDay;
            let endDay;
            if(_this.sourceData.startDay){
                startDay  = moment(parseInt(_this.sourceData.startDay)).format('YYYY-MM-DD');
             }
            if(_this.sourceData.endDay){
                endDay = moment(parseInt(_this.sourceData.endDay)).format('YYYY-MM-DD');
            }

                _this.form.setFieldsValue({
                    typeId: _this.sourceData.typeId,
                    levelId: _this.sourceData.levelId,
                    rangeDay: _this.sourceData.startDay?[moment(startDay, 'YYYY-MM-DD'),moment(endDay, 'YYYY-MM-DD')]:undefined,
                    position: _this.sourceData.position,
                    description: _this.sourceData.description
                });

                _this.image = _this.sourceData.imageStr?JSON.parse(_this.sourceData.imageStr):[];
                _this.fileList = _this.sourceData.fileStr?JSON.parse(_this.sourceData.fileStr):[];
                _this.imageUrl = _this.image[0]?_this.image[0].newPath:'';

                _this.mapId = _this.sourceData.mapId;
                _this.mapCenter = [_this.sourceData.positionX,_this.sourceData.positionY];
                let index = parseInt(_this.sourceData.areaId)-2;
                if(_this.sourceData.id||_this.sourceData.id===0){
                    _this.areaName =  _this.areaList[index].name;
                }
                else{
                    _this.form.setFieldsValue({
                        areaId: _this.sourceData.areaId
                    })
                }


        }).catch((error) => {
            console.log(error)
        })
        console.log('=====预案区域=====');
    },
    methods:{
        ...mapActions('emergency/emergency', ['getEmergencyYuAnInitData','addNewEmergencyYuAn']),
        init(){
        },
        //时间不可选设置
        disabledDate(current) {
            return current && current < moment().endOf('day');
        },
        //选择区域
        // changePaintMethod(val){
          // const _this = this;
          // draw = this.mapManager.activateDraw(val,draw);
          // this.drawType = val;
          // this.$emit('hide');
          // draw.on('drawend', function(e) {
          //   _this.mapManager.inactivateDraw(draw);
          //   _this.$emit('show');
          //   _this.drawFeature=e.feature;
          //   const mapExtent = e.feature.getGeometry().getExtent();
          //   _this.mapCenter= getCenter(mapExtent);
          //   _this.addDraw();
          // })
        // },
        //选择区域
        selectPaintMethod(val,option){
          console.log('selectPaintMethod',val,option);
          const _this = this;
          const drawResult=this.mapManager.activateDraw(val,draw);
          draw = drawResult[0];
          this.drawLayer=drawResult[1];
          this.drawType = val;
          this.$emit('hide');
          draw.on('drawend', function(e) {
            _this.mapManager.inactivateDraw(draw);
            _this.$emit('show');
            _this.drawFeature=e.feature;
            const mapExtent = e.feature.getGeometry().getExtent();
            _this.mapCenter= getCenter(mapExtent);
          })
        },
        //编辑时区域
        editAreaPart(){
            this.clickAreaEdit = true;
          let modify;
          this.$emit('hide');
          const feature = this.emergencyAllArea.filter(p => p.get('id') == this.sourceData.mapId);
          this.beforeModifyFeature=feature[0];
          console.log('====编辑区域起始图形===',feature[0].get('id'));
          if(feature[0].get('type')==2){
            const circleFeature =new Feature({
              geometry:new Circle([feature[0].get('centerX'),feature[0].get('centerY')],feature[0].get('radius'))
            });
            //预案区域图层
            this.emergencyLayer = this.mapManager.addVectorLayerByFeatures([circleFeature], emergencyAreaStyle(), 2);
            this.modifyType=2;
          }
          else{
            //预案区域图层
            this.emergencyLayer = this.mapManager.addVectorLayerByFeatures(feature, emergencyAreaStyle(), 2);
            this.modifyType=3;
          }
          modify = this.mapManager.activeModifyFeature(modify,this.emergencyLayer.getSource());
          let _this=this;
          modify.on("modifyend",function (e) {
            debugger;
            _this.mapManager.inactivateDraw(modify);
            var features =e.features.array_;
            _this.drawFeature=features[0];
            _this.$emit('show');
          });
        },
        //照片上传之前的校验
        beforeUpload (file,filelist) {
            // const isJPG = file.type === 'image/jpeg'
            // if (!isJPG) {
            //     this.$message.error('You can only upload JPG file!')
            // }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!')
            }
            console.log('isLt2M',isLt2M);
            return isLt2M
        },
        //照片上传状态改变
        handleImgChange (res) {
            console.log('uploadImage handleChange',res);
            if (res.file.status === 'done') {
                let data  = res.file.response.basefile;
                this.imageUrl = data.newPath;
                this.image = [{'newPath': data.newPath ,'oldName':data.oldName}];
            }
        },
        //附件上传之前的校验
        beforeFileUpload (file,filelist) {
            let pass = false;
            if(this.fileList.length<2){
                pass = true;
            }
            else{
                this.$message.error('最多上传2个附件！')
            }
            return pass
        },
        //附件上传状态改变
        handleFileChange (res) {
            if (res.file.status === 'uploading') {
                this.fileLoading = true;
                return
            }
            console.log('uploadImage handleChange',res.file.response);
            if (res.file.status === 'done') {
                this.fileLoading = false;
                let data  = res.file.response.basefile;
                this.fileList.push({'newPath': data.newPath ,'oldName':data.oldName});
            }
        },
        //删除附件
        deleteFile(index){
            this.fileList.splice(index,1);
        },
        //获取随机绘制图形id
        getMapId(){
          return Number(Math.random().toString().substr(3,6) + Date.now()).toString(36);
        },
        //保存新增绘制图形数据到gis数据库
        addDraw(callBack){
            let feature;
            if(this.drawType==2) {
              feature=circleToPloygon(this.drawFeature);
            } else{
              feature = this.drawFeature;
            }
            let prop=feature.getProperties();
            // prop["the_geom"]=prop["geometry"];
            this.mapId=this.getMapId();
            prop["id"]=this.mapId;
            if(this.drawType==2){
              const center=this.drawFeature.getGeometry().getCenter();
              prop["type"]=2;//圆形
              prop["centerX"]=center[0];
              prop["centerY"]=center[1];
              prop["radius"]=this.drawFeature.getGeometry().getRadius();
            }
            else{
              prop["type"]=3;//多边形
            }
            feature.setProperties(prop);
            postEmergencyArea('add',feature).then(res=>{
                console.log(res);
                var xmlDoc = (new DOMParser()).parseFromString(res,'text/xml');
                var insertNum = xmlDoc.getElementsByTagName('wfs:totalInserted')[0].textContent;
                if(insertNum>0){
                  console.log('===保存成功====');
                  callBack&&callBack();
                }
              })
        },
        //保存编辑图形数据到gis数据库
        editDraw(callBack){
          let feature;
          if(this.modifyType==2){
            const circleFeature = circleToPloygon(this.drawFeature);
            let beforeProp = this.beforeModifyFeature.getProperties();
            const prop=circleFeature.getProperties();
            beforeProp["geometry"]=prop["geometry"];
            beforeProp["radius"]=this.drawFeature.getGeometry().getRadius();
            this.beforeModifyFeature.setProperties(beforeProp);
            feature=this.beforeModifyFeature;
          }
          else{
            feature=this.drawFeature;
          }
          console.log('====编辑完成后id====',feature.get('id'));
          postEmergencyArea('edit',feature).then(res=>{
              console.log('edit map',res);
              var xmlDoc = (new DOMParser()).parseFromString(res,'text/xml');
              var insertNum = xmlDoc.getElementsByTagName('wfs:SUCCESS');
              if(insertNum&&insertNum.length>0){
                  console.log('===保存成功====');
                  callBack&&callBack();
              }
          })
        },
        //提交表单
        handleSubmit(e){
            e.preventDefault();
            let _this = this;
            if(this.drawLayer){
              this.drawLayer.getSource().clear();
            }
            this.form.validateFields((error, values) => {
                console.log('error', error);
                console.log('Received values of form: ', values);
                if(this.sourceData.id){
                    values.id = this.sourceData.id;
                    values.areaId = this.sourceData.areaId;
                }
                if(values.rangeDay){
                    values.startDay = values.rangeDay[0]._d.getTime();
                    values.endDay = values.rangeDay[1]._d.getTime();
                }
                if(this.image.length>0){
                  values.imageStr = this.image[0].newPath + '|' + this.image[0].oldName;
                }
                if(this.fileList.length>0) {
                    let fileStr = '';
                    for (let i = 0; i < this.fileList.length; i++) {
                        if (i < this.fileList.length - 1) {
                            fileStr += this.fileList[i].newPath + '|' + this.fileList[i].oldName + ',';
                        }
                        else {
                            fileStr += this.fileList[i].newPath + '|' + this.fileList[i].oldName;
                        }
                    }
                    values.fileStr = fileStr;
                }
                delete values.rangeDay;
                console.log('form value: ', values);
                if(this.checkSubmitParams(values)) {
                  if(this.sourceData.id){
                      if(this.clickAreaEdit){
                          this.editDraw(function(){
                              values.mapId = _this.mapId;
                              values.positionX = _this.mapCenter[0];
                              values.positionY = _this.mapCenter[1];
                              _this.addNewEmergencyYuAn(values).then((res) => {
                                  console.log('addNewEmergencyYuAn', res);
                                  _this.$emit('close');
                              })
                          });
                      }
                      else{
                          values.mapId = this.sourceData.mapId;
                          values.positionX = this.sourceData.positionX;
                          values.positionY = this.sourceData.positionY;
                          this.addNewEmergencyYuAn(values).then((res) => {
                              console.log('addNewEmergencyYuAn', res);
                              _this.$emit('close');
                          })
                      }

                  }
                  else{
                    this.addDraw(function () {
                      values.mapId = _this.mapId;
                      values.positionX = _this.mapCenter[0];
                      values.positionY = _this.mapCenter[1];
                      _this.addNewEmergencyYuAn(values).then((res) => {
                        console.log('addNewEmergencyYuAn', res);
                        _this.$emit('close');
                      })
                    });
                  }
                }
            });
        },
        checkSubmitParams(params){
            if(!params.imageStr){
                this.$message.error('照片必须上传！')
                return false
            }
            if(!params.fileStr){
                this.$message.error('附件必须上传！')
                return false
            }
            return true
        }
    },
    computed:{
      ...mapState('map', [
        'mapManager',
        'emergencyAllArea'
      ]),
    }
}
</script>
<style lang="scss" scoped>
.yuan-body {
  width: 100%;
  height: 390px;
  background-color: #ffffff;
  .yuan-form {
    width: 100%;
    height: calc(100% - 60px);
    padding: 20px;
    border-bottom: 1px solid #dddddd;
    /deep/.ant-upload.ant-upload-select-picture-card {
      width: 100%;
      height: 100%;
      border: 0px;
    }
    /deep/.ant-upload.ant-upload-select-picture-card > .ant-upload {
      padding: 0px;
    }
    /deep/.ant-form-item {
      margin-bottom: 5px;
      textarea.ant-input {
        max-width: unset;
      }
    }
    .avatar-uploader {
      display: inline-block;
      width: 277px;
      height: 190px;
      overflow: hidden;
      .upload-btn {
        width: 100%;
        height: 100%;
        background: url("~@img/picture-upload.png") no-repeat;
        background-size: 100% 100%;
      }
      img{
        max-width: 100%;
      }
    }
    .upload-file-panel{
      height: 40px;
      width: 277px;
      .file-item{
        width: 133px;
        height: 30px;
        background-color: rgba(43,144,243,.2);
        border-radius: 4px;
        span{
          display:inline-block;
          padding-left: 20px;
          width: 110px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 13px;
          line-height: 30px;
          color: #2b90f3;
        }
        i{
          color:#2b90f3;
          cursor: pointer;
          &:hover{
            color: #1761f3;
          }
        }
      }
    }
  }
  .operate-panel {
    width: 100%;
    height: 60px;
  }
}
</style>
