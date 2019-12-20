<template>
  <div class="part evaluation">
    <div class="part-header" flex="cross:center main:justify">
      <div>
        <span class="title">应急评估</span
        ><span class="time">{{ new Date() | date_format('YYYY-MM-DD HH:mm') }}</span>
      </div>
      <div @click="toList" v-show="!showList"><cg-icon-svg name="list" class="svg_icon list"></cg-icon-svg><span class="title">查看列表</span></div>
    </div>
    <div class="part-content-panel" v-show="!showList">
      <div class="part-content add-panel">
        <div class="part-content-header" flex="cross:center">
          <span flex="cross:center main:center" class="upload-btn"><cg-icon-svg name="image" class="svg_icon image"></cg-icon-svg>
              <a-upload
                  name="image"
                  :multiple="true"
                  action="http://192.168.71.33:50000/file/file/uploadFileWeb"
                  :beforeUpload="beforeImageUpload"
                  :showUploadList="false"
                  @change="handleImageChange"
              >
              <div class="btn-title">添加图片(可多选）</div>
            </a-upload>
          </span>
          <span class="sep">|</span>
          <span flex="cross:center main:center" class="upload-btn"><cg-icon-svg name="video" class="svg_icon video"></cg-icon-svg>
              <a-upload
                 name="image"
                 :multiple="true"
                 action="http://192.168.71.33:50000/file/file/uploadFileWeb"
                 :beforeUpload="beforeVideoUpload"
                 :showUploadList="false"
                  @change="handleVideoChange"
              >
                <div class="btn-title">添加视频(可多选）</div>
            </a-upload>
          </span>
        </div>
        <a-textarea placeholder="对本此预案可以写下你的意见..." :autosize="{ minRows: 4, maxRows: 4 }" v-model="evaluationData.message"/>
        <div class="file-show-panel" v-show="false">
          <div style="width: 200px;height: 140px;border: 1px solid #dddddd;"></div>
        </div>
      </div>
      <div class="part-content-footer" flex="cross:center main:center">
        <a-button type="primary" @click="submitEventEvaluationMessageFn">提交</a-button>
      </div>
    </div>
    <div class="part-content-panel list-panel" v-show="showList">
      <div class="part-content">
        <cg-container scroll>
          <div v-for="(ev, index) in evaluationDataList" :key="index" flex class="evaluation-item">
            <a-checkbox :checked="ev.isChecked" @change="(e) => {onItemChange(e,index);}"></a-checkbox>
            <div class="evaluation-item-right">
              <div class="message">{{ev.message}}</div>
              <div flex>
                <span class="time">{{ev.time}}</span>
                <div v-if="ev.fileList.length>0" class="op-panel" @click="expandHandle(ev)">
                  <span class="op-btn">{{ev.isExpand?'展开':'收起'}}</span>
                  <a-icon v-if="ev.isExpand" style="color:#cccccc;" type="down" />
                  <a-icon v-else style="color:#cccccc;" type="up"/>
                </div>
              </div>
              <div class="file-show-panel" v-if="ev.fileList.length>0" flex v-show="!ev.isExpand">
                <div v-for="(file, index) in ev.fileList" :key="index" class="file-item" flex="cross:center">
                  <div v-if="file.type==='image'" >
                    <img style="width:100%;" :src="file.imageUrl">
                  </div>
                  <div v-if="file.type==='video'">
                    <video width="100" height="70" controls="controls">
                      <source :src="file.videoSrc" type="video/ogg">
                      <source :src="file.videoSrc" type="video/mp4">
                          Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </cg-container>
      </div>
      <div class="list-panel-footer" flex="cross:center main:justify">
        <div flex="cross:center" style="margin-left: 20px;">
          <a-checkbox @change="onChange">全选（当前页）</a-checkbox>
          <a-button type="primary" size="small" ghost @click="deleteEvaluationFn">删除</a-button>
          <a-button style="margin-left: 10px;" type="primary" size="small" ghost @click="addEvaluation">新增</a-button>
        </div>
        <a-pagination v-model="query.pageNo" :pageSize.sync="query.pageSize" :total="totalSize" @change="changePageNoHandle"/>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
export default {
  name: 'eventEvaluation',
  props:{
    eventId:{
      type: String,
      default: ''
    }
  },
  data(){
    return{
      showList: false,
      evaluationData: {
        eventId: '',
        message: '',
        time: 0,
        isExpand: false,
        fileList: []
      },
      evaluationDataList: [],
      deleteIdArr: [],
      query:{
        pageNo: 1,
        pageSize: 20
      },
      totalSize: 36
    }
  },
  mounted(){
    //this.getEvaluationListData();
  },
  watch:{
    eventId: function(val){
      //this.getEvaluationListData();
    }
  },
  methods:{
    ...mapActions('emergency/emergency', ['submitEventEvaluationMessage','getEvaluationListData', 'deleteEvaluation']),
    //附件图片上传之前的校验
    beforeImageUpload (file,filelist) {
      return true
    },
    //附件上传状态改变
    handleImageChange (res) {
      if (res.file.status === 'uploading') {
        return
      }
      console.log('uploadImage handleChange',res.file.response);
      if (res.file.status === 'done') {
        let data  = res.file.response.basefile;
        //this.fileList.push({'newPath': data.newPath ,'oldName':data.oldName});
        let temp = {
          type: 'image',
          name: data.oldName,
          imageUrl: data.newPath,
          videoSrc: ''
        }
        this.evaluationData.fileList.push(temp);
      }
    },
    //附件图片上传之前的校验
    beforeVideoUpload (file,filelist) {
      return true
    },
    //附件上传状态改变
    handleVideoChange (res) {
      if (res.file.status === 'uploading') {
        return
      }
      console.log('uploadVideo handleChange',res.file.response);
      if (res.file.status === 'done') {
        let data  = res.file.response.basefile;
        //this.fileList.push({'newPath': data.newPath ,'oldName':data.oldName});
        let temp = {
          type: 'video',
          name: data.oldName,
          imageUrl: '',
          videoSrc: data.newPath
        }
        this.evaluationData.fileList.push(temp);
      }
    },
    //提交评估信息
    submitEventEvaluationMessageFn(){

      this.evaluationData.eventId = this.eventId;
      this.evaluationData.time = new Date().getTime();
      console.log('submitEventEvaluationMessage',this.evaluationData);
      this.submitEventEvaluationMessage(this.evaluationData).then(()=>{
        //成功后调用
        this.toList();
      });

    },
    //获取评价列表
    getEvaluationListDataFn(){
      this.getEvaluationListData(this.query).then((res)=>{
        this.evaluationDataList = res.data;
        this.totalSize = res.total;
      })
    },
    toList(){
      this.showList = true;
      let _this = this;
      setTimeout(() => {
        _this.getEvaluationListDataFn();
      },500);
    },
    expandHandle(ev){
      ev.isExpand = !ev.isExpand;
    },
    onItemChange(e, index){
      console.log('098765');
      let checked = `${e.target.checked}`;
      let id = this.evaluationDataList[index].id;
      if(checked==='true'){
        this.evaluationDataList[index].isChecked = true;
        this.deleteIdArr.push(id);
      }
      else{
        let i = this.deleteIdArr.indexOf(id);
        this.deleteIdArr.splice(i,1);
        this.evaluationDataList[index].isChecked = false;
      }
    },
    onChange(e){
      console.log('全选：' , e);
      let checked = `${e.target.checked}`;
      if(checked==='true'){
        this.evaluationDataList.forEach(item => {
          item.isChecked = true;
        })
      }
      else{
        this.evaluationDataList.forEach(item => {
          item.isChecked = false;
        })
      }
    },
    addEvaluation(){
      this.showList = false;
    },
    deleteEvaluationFn(){
      console.log('deleteEvaluationFn', this.eventId, this.deleteIdArr);
      let temp = {
        eventId: this.eventId,
        evaluationIdArr: this.deleteIdArr
      }
      this.deleteEvaluation(temp).then((res) => {
        this.getEvaluationListDataFn();
      });
    },
    changePageNoHandle(pageNo,pageSize){
      this.query.pageNo = pageNo;
      this.getEvaluationListDataFn();
    }
  }
}
</script>
<style lang="scss" scoped>
.part {
  background-color: #fafafa;
  /*height: 417px;*/
  height: auto;
  margin: 0px -20px;
  padding: 10px 20px;
  .part-header {
    height: 30px;
    .title {
      font-family: PingFang-SC-Bold;
      font-size: 14px;
      color: #2b8ff3;
    }
    .time {
      margin-left: 10px;
      font-family: PingFang-SC-Bold;
      font-size: 14px;
      color: #999999;
    }
    .svg_icon{
      height: 13px;
      color: #2b8ff3;
      margin-right: 10px;
    }
  }
  .part-content-panel {
    width: 100%;
    .part-content {
      width: 100%;
      /*height: 304px;*/
      height: auto;
      background-color: #ffffff;
      border: solid 1px #dddddd;
      .part-content-header {
        height: 36px;
        background-color: #edf6ff;

        span.upload-btn,
        span.upload-btn{
          width: 170px;
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          color: #2b90f3;
          cursor: pointer;
          .svg_icon {
            height: 18px;
            margin-right: 10px;
          }
          .btn-title{
              color: #2b90f3;
          }
        }
        span.sep{
          color: #dddddd;
        }
      }
      textarea{
        padding: 0px 20px;
        border: 1px solid transparent;
        resize:none;
      }
      .ant-input:focus{
        box-shadow: none;
      }
    }
    .add-panel .file-show-panel {
      padding: 20px;
    }
    .part-content-footer{
      margin-top: 20px;
      button{
        width: 100px;
      }
    }
  }
  .list-panel{
    .part-content{
      height: 300px;
      position: relative;
      .evaluation-item{
        padding: 20px 20px 0px 20px;
        .evaluation-item-right{
          margin-left:10px;
          flex: 1;
          border-bottom: 1px solid #dddddd;
          padding-bottom: 20px;
          .message{
            color:#333333;
          }
          .time{
            color:#999999;
          }
          .op-panel{
            .op-btn{
              color: #2b8ff3;
              margin: 0px 10px;
            }
            i{
              font-size:12px;
            }
          }

          .file-show-panel{
            padding-top: 20px;
              .file-item{
                width: 100px;
                height: 70px;
                border: 1px solid #dddddd;
                background-color: #dddddd;
                margin-right: 10px;
              }
          }
        }
      }
    }
    .list-panel-footer{
      height: 50px;
    }
  }
}
</style>
