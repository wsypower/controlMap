<template>
  <div class="yuan-body" flex>
    <a-form :form="form" @submit="handleSubmit" style="width: 100%">
      <div class="yuan-form">
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="类型"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-select v-decorator="['subType',
                                       {rules: [{ required: true, message: '请选择' }]}
                                     ]"
                        placeholder="请选择"
                        style="width: 277px">
                <a-select-option value="male">male</a-select-option>
                <a-select-option value="female">female</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="等级"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-select v-decorator="['level',
                                       {rules: [{ required: true, message: '请选择' }]}
                                     ]"
                        placeholder="请选择"
                        style="width: 277px">
                <a-select-option value="large">重大</a-select-option>
                <a-select-option value="normal">一般</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="时间"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-date-picker
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
              <a-input placeholder="请输入" style="width: 277px" />
            </a-form-item>
            <a-form-item
              label="信息"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-textarea placeholder="请输入" :rows="2" style="width: 277px" />
            </a-form-item>
            <a-form-item
              label="区域"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-select placeholder="请选择" style="width: 277px">
                <a-select-option value="male">male</a-select-option>
                <a-select-option value="female">female</a-select-option>
              </a-select>
            </a-form-item>
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
      <div class="operate-panel">
        <a-button type="primary" html-type="submit">提交</a-button>
      </div>
    </a-form>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
    name: 'yuanForm',
    data(){
        return{
            form: this.$form.createForm(this),
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
            console.log('sourceData',this.sourceData);
            this.form.setFieldsValue({
                subType: this.sourceData.data1
            })
        }
    },
    mounted(){
        this.form.setFieldsValue({
            subType: this.sourceData.data1
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
        handleSubmit(form){
            console.log('form',form)
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
    line-height: 60px;
  }
}
</style>
<style lang="scss">
.ant-upload.ant-upload-select-picture-card {
  width: 100%;
  height: 100%;
  border: 0px;
}
.ant-upload.ant-upload-select-picture-card > .ant-upload {
  padding: 0px;
}
.ant-form-item {
  margin-bottom: 10px;
  textarea.ant-input {
    max-width: unset;
  }
}
</style>
