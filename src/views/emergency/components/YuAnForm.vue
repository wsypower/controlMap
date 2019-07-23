<template>
  <div class="yuan-body" flex>
    <a-form :form="form" hideRequiredMark @submit="handleSubmit" style="width: 100%">
      <div class="yuan-form">
        <a-row style="height:100%">
          <a-col :span="12" style="height:100%">
            <cg-container scroll>
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
                <a-input v-decorator="['position',config]"
                         placeholder="请输入" style="width: 277px" />
              </a-form-item>
              <a-form-item
                label="信息"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-textarea v-decorator="['description',config]"
                        placeholder="请输入" :rows="2" :autosize="{minRows: 2, maxRows: 2}" style="width: 277px" />
              </a-form-item>
              <a-form-item
                label="区域"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-select v-decorator="['areaId',config]"
                          placeholder="请选择" style="width: 277px" @change="changePaintMethod">
                  <a-select-option
                          v-for="(item,index) in areaList"
                          :value="item.id"
                          :key="item.id">
                      {{item.name}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </cg-container>
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
import { mapActions,mapState } from 'vuex';
import WFS from 'ol/format/WFS';
import Feature from 'ol/Feature';
import MultiPolygon from 'ol/geom/MultiPolygon';
import { fromCircle } from 'ol/geom/Polygon'
import { getCenter } from 'ol/extent'
import { postFeature } from '@/api/map/map'
let draw;
const namespace = 'map'
export default {
    name: 'yuanForm',
    data(){
        return{
           drawFeature:null,//绘制区域
           drawType:0,//绘制区域类型
           mapCenter:null,//绘制区域中心点位坐标
           mapId:null,
           form: this.$form.createForm(this),
            //校验配置
            config: {rules: [{ required: true, message: '请选择' }]},
            //类型数据
            typeList: [],
            //等级数据
            levelList: [],
            //区域数据
            areaList:[
              {'id':'0','name':'正方形'},
              {'id':'1','name':'矩形'},
              {'id':'2','name':'圆形'},
              {'id':'3','name':'多边形'},
              {'id':'4','name':'任意面'}],
            //照片路径，全路径
            imageUrl: '',
            //照片上传后得到的照片对象
            image:{},
            //附件上传过程的动效展示
            fileLoading: false,
            //附件上传后得到的附件对象数组
            fileList:[]
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
        // let p1 = this.getAllTypeData().then((res) => {
        //     console.log(res);
        //     if(res.code==0){
        //         _this.typeList = res.data;
        //     }
        // })
        // let p2 = this.getAllLevelData().then((res) => {
        //     console.log(res);
        //     if(res.code==0){
        //         _this.levelList = res.data;
        //     }
        // })
        this.getEmergencyYuAnInitData().then((res) => {
              _this.typeList = res.emergency_plan_type;
              _this.levelList = res.emergency_plan_grade;

            console.log('_this.sourceData',_this.sourceData,moment(_this.sourceData.startDay, 'YYYY-MM-DD'),moment(1567159292614).format());
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
                  description: _this.sourceData.description,
                  areaId: _this.sourceData.areaId
              });

              _this.image = _this.sourceData.imageStr?JSON.parse(_this.sourceData.imageStr):{};
              _this.fileList = _this.sourceData.fileStr?JSON.parse(_this.sourceData.fileStr):[];
              _this.imageUrl = _this.image[0].newPath?_this.image[0].newPath:'';

        }).catch((error) => {
            console.log(error)
        })
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
        changePaintMethod(val){
          const _this = this;
          if(draw){
            this.mapManager.inactivateDraw(draw);
          }
          console.log('====激活绘制====')
          draw = this.mapManager.activateDraw(val);
          this.drawType=val;
          this.$emit('hide');
          draw.on('drawend', function(e) {
            _this.mapManager.inactivateDraw(draw);
            _this.$emit('show');
            _this.drawFeature=e.feature;
            const mapExtent = e.feature.getGeometry().getExtent();
            _this.mapCenter= getCenter(mapExtent);
            debugger;
            _this.addDraw();
          })
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
            return true
        },
        //照片上传状态改变
        handleImgChange (res) {
            console.log('uploadImage handleChange',res);
            if (res.file.status === 'done') {
                let data  = res.file.response.basefile;
                this.imageUrl = data.newPath;
                this.image = {'newPath': data.newPath ,'oldName':data.oldName};
            }
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
        //保存绘制图形数据到gis数据库
        addDraw(callBack){
          let feature;
          if(this.drawType==2) {
            const polygon = fromCircle(this.drawFeature.getGeometry(), 32,90);
            let mutiPolygon = new MultiPolygon({});
            mutiPolygon.appendPolygon(polygon);
            feature = new Feature({
              geometry: mutiPolygon
            })
          }
          else{
            feature=this.drawFeature;
          }
            let prop=feature.getProperties();
            prop["the_geom"]=prop["geometry"];
            this.mapId=this.getMapId();
            prop["mapid"]=this.mapId;
            feature.setProperties(prop);
            const format = new WFS();
            const xml = format.writeTransaction([feature], null, null, {
              featureNS: "http://www.haining.com",//该图层所在工作空间的uri
              featurePrefix: "haining",//工作空间名称0
              featureType: "预案区域",//图层名称
            });
            const serializer = new XMLSerializer();
            callBack&&callBack();
            // 将参数转换为xml格式数据
            // const featString = serializer.serializeToString(xml);
            // postFeature(featString).then((res) => {
            //
            //   var xmlDoc = (new DOMParser()).parseFromString(res,'text/xml');
            //   var insertNum = xmlDoc.getElementsByTagName('wfs:totalInserted')[0].textContent;
            //
            //   if(insertNum>0){
            //     console.log('===保存成功====');
            //       callBack&&callBack();
            //   }
            // })
        },
        //提交表单
        handleSubmit(e){
            e.preventDefault();
            let _this = this;
            this.form.validateFields((error, values) => {
                console.log('error', error);
                console.log('Received values of form: ', values);
                if(this.sourceData.id){
                    values.id = this.sourceData.id;
                }
                if(values.rangeDay){
                    values.startDay = values.rangeDay[0]._d.getTime();
                    values.endDay = values.rangeDay[1]._d.getTime();
                }

                if(this.image.newPath){
                  values.imageStr = this.image.newPath + '|' + this.image.oldName;
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

                values.mapId = this.mapId;
                values.positionX = this.mapCenter[0];
                values.positionY = this.mapCenter[1];

                delete values.rangeDay;

                console.log('form value: ', values);
                if(this.checkSubmitParams(values)){
                    this.addNewEmergencyYuAn(values).then((res) => {
                        console.log('addNewEmergencyYuAn', res);
                        _this.$emit('close');
                    })
                }

                // this.addDraw(function(){
                //     _this.addNewEmergencyYuAn(values).then((res) => {
                //         console.log('addNewEmergencyYuAn', res);
                //         _this.$emit('close');
                //     })
                // });

            });
        },
        checkSubmitParams(params){
            if(!params.imageStr){
                message.error('照片必须上传');
                return false
            }
            if(!params.fileStr){
                message.error('附件必须上传');
                return false
            }
            return true
        }
    },
    computed:{
      ...mapState('map', [
        'mapManager'
      ]),
    }
}
</script>
<style lang="scss" scoped>
.yuan-body {
  width: 100%;
  height: 100%;
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
      margin-bottom: 7px;
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
