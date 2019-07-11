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
                        v-decorator="['subType',
                                         {rules: [{ required: true, message: '请选择' }]}
                                       ]"
                          placeholder="请选择"
                          style="width: 277px">
                  <a-select-option value='0'>消防火灾</a-select-option>
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
                          v-decorator="['level',
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
                        v-decorator="['time',
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
                <a-textarea v-decorator="['message',
                                         {rules: [{ required: true, message: '请选择' }]}
                                       ]"
                        placeholder="请输入" :rows="2" :autosize="{minRows: 2, maxRows: 2}" style="width: 277px" />
              </a-form-item>
              <a-form-item
                label="区域"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-select v-decorator="['area',
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
                name="avatar"
                listType="picture-card"
                class="avatar-uploader"
                :showUploadList="false"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :beforeUpload="beforeUpload"
                @change="handleChange"
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
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                @change="handleChange"
              >
                <a-button style="width: 277px;">
                  <a-icon type="upload" /> 上传附件
                </a-button>
              </a-upload>
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
export default {
    name: 'yuanForm',
    data(){
        return{
            form: this.$form.createForm(this),
            dateFormat:'YYYY-MM-DD',
            imageUrl: '',
            headers: {
                authorization: 'authorization-text',
            },
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
                subType: value.type,
                level: value.level,
                time: moment(value.time, 'YYYY-MM-DD'),
                position: value.position,
                message: value.message,
                area: value.area,
            })
        }
    },
    mounted(){
        this.form.setFieldsValue({
            subType: this.sourceData.type,
            level: this.sourceData.level,
            time: moment(this.sourceData.time, 'YYYY-MM-DD'),
            position: this.sourceData.position,
             message: this.sourceData.message,
             area: this.sourceData.area,
        })
    },
    methods:{
        init(){

        },
        onChange(value){
            console.log('date',value);
        },
        beforeUpload(file){

        },
        handleChange(file){

        },
        handleSubmit(e){
            e.preventDefault();
            this.form.validateFields((error, values) => {
                console.log('error', error);
                console.log('Received values of form: ', values);
                if(values.time){
                    values.time = values.time.format("YYYY-MM-DD")
                }

                console.log('form value: ', values);
            });
            // let data = {
            //     type: 1,
            //     level: 0,
            //     time: '2019-07-11 11:07:38',
            //     position: '华星路99号',
            //     message: '这是第一条开发测试数据',
            //     area: 3,
            //     photo:{},
            //     files:{}
            // }
            // this.$store.dispatch('emergency/emergency/addNewEmergencyYuAn',data).then((res) => {
            //     console.log(res);
            // })
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
      .upload-btn {
        width: 100%;
        height: 100%;
        background: url("~@img/picture-upload.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .operate-panel {
    width: 100%;
    height: 60px;
  }
}
</style>
