<template>
  <div class="yuan-body" flex>
    <a-form :form="form" @submit="handleSubmit" style="width: 100%">
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
                        v-decorator="['typeId',
                                         {rules: [{ required: true, message: '请选择' }]}
                                       ]"
                          placeholder="请选择"
                          style="width: 277px">
                  <a-select-option value='0'>消防安全</a-select-option>
                  <a-select-option value='1'>地震灾害</a-select-option>
                  <a-select-option value='3'>洪涝灾害</a-select-option>
                  <a-select-option value='4'>台风灾害</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="等级"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-select
                          v-decorator="['levelId',
                                         {rules: [{ required: true, message: '请选择' }]}
                                       ]"
                          placeholder="请选择"
                          style="width: 277px">
                  <a-select-option value="0">重大</a-select-option>
                  <a-select-option value="1">一般</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="时间"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-date-picker
                        v-decorator="['dayTime',
                                         {rules: [{ required: true, message: '请选择' }]}
                                       ]"
                        :format="dateFormat"
                  placeholder="请选择"
                  @change="onChange"
                  style="width: 277px"
                />
              </a-form-item>
              <a-form-item
                label="位置"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-input v-decorator="['position',
                                         {rules: [{ required: true, message: '请选择' }]}
                                       ]"
                         placeholder="请输入" style="width: 277px" />
              </a-form-item>
              <a-form-item
                label="信息"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-textarea v-decorator="['description',
                                         {rules: [{ required: true, message: '请选择' }]}
                                       ]"
                        placeholder="请输入" :rows="2" :autosize="{minRows: 2, maxRows: 2}" style="width: 277px" />
              </a-form-item>
              <a-form-item
                label="区域"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-select v-decorator="['areaId',
                                         {rules: [{ required: true, message: '请选择' }]}
                                       ]"
                          placeholder="请选择" style="width: 277px">
                  <a-select-option value="0">正方形</a-select-option>
                  <a-select-option value="1">矩形</a-select-option>
                  <a-select-option value="2">圆形</a-select-option>
                  <a-select-option value="3">多边形</a-select-option>
                  <a-select-option value="4">任意面</a-select-option>
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
                  <span>{{file.basefile.oldName}}</span><a-icon type="close"/>
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
import { mapActions } from 'vuex';
export default {
    name: 'yuanForm',
    data(){
        return{
            form: this.$form.createForm(this),
            dateFormat:'YYYY-MM-DD',
            imageUrl: '',
            image:{},
            fileLoading: false,
            fileList:[]

        }
    },
    props:{
        sourceData:{
            type: Object,
            default(){
                return{

                }
            }
        }
    },
    watch:{
        sourceData: function(value){
            console.log('sourceData',value);
            this.form.setFieldsValue({
                typeId: value.typeId||value.typeId==0?value.typeId.toString():null,
                levelId: value.levelId||value.levelId==0?value.levelId.toString():null,
                dayTime: value.dayTime?moment(value.dayTime, 'YYYY-MM-DD'):null,
                position: value.position,
                description: value.description,
                areaId: value.areaId||value.areaId==0?value.areaId.toString():null
            });
            this.image = value.image?value.image:{};
            this.fileList = value.fileList?value.fileList:[];
            this.imageUrl = this.image.basefile?this.image.basefile.newPath:'';
        }
    },
    mounted(){
        this.form.setFieldsValue({
            typeId: this.sourceData.typeId||this.sourceData.typeId==0?this.sourceData.typeId.toString():null,
            levelId: this.sourceData.levelId||this.sourceData.levelId==0?this.sourceData.levelId.toString():null,
            dayTime: this.sourceData.dayTime?moment(this.sourceData.dayTime, 'YYYY-MM-DD'):null,
            position: this.sourceData.position,
            description: this.sourceData.description,
            areaId: this.sourceData.areaId||this.sourceData.areaId==0?this.sourceData.areaId.toString():null
        })
        this.image = this.sourceData.image?this.sourceData.image:{};
        this.fileList = this.sourceData.fileList?this.sourceData.fileList:[];
        this.imageUrl = this.image.basefile?this.image.basefile.newPath:'';
    },
    methods:{
        ...mapActions('emergency/emergency', ['addNewEmergencyYuAn']),
        init(){

        },
        onChange(value){
            console.log('date',value);
        },
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
        handleImgChange (res) {
            console.log('uploadImage handleChange',res);
            if (res.file.status === 'done') {
                this.imageUrl = res.file.response.basefile.newPath;
                this.image = res.file.response;
            }
        },
        handleFileChange (res) {
            if (res.file.status === 'uploading') {
                this.fileLoading = true;
                return
            }
            console.log('uploadImage handleChange',res.file.response);
            if (res.file.status === 'done') {
                this.fileLoading = false;
                this.fileList.push(res.file.response);
            }
        },
        handleSubmit(e){
            e.preventDefault();
            let _this = this;
            this.form.validateFields((error, values) => {
                console.log('error', error);
                console.log('Received values of form: ', values);
                if(values.dayTime){
                    values.dayTime = values.dayTime.format("YYYY-MM-DD")
                }
                console.log('form value: ', values);
                if(this.sourceData.id){
                    values.id = this.sourceData.id;
                }
                //编辑时状态status是否需要改变
                this.addNewEmergencyYuAn(values).then((res) => {
                    console.log(res);
                    if(res.code==0){
                        _this.$emit('close');
                    }
                })
            });
        }
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
