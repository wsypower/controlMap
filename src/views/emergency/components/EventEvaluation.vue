<template>
  <div class="part evaluation">
    <div class="part-header" flex="cross:center main:justify">
      <div>
        <span class="title">应急评估</span
        ><span class="time">{{ new Date() | date_format('YYYY-MM-DD HH:mm') }}</span>
      </div>
      <div @click="toList" v-show="!showList"><cg-icon-svg name="list" class="svg_icon list"></cg-icon-svg><span class="title">查看列表</span></div>
    </div>
    <div class="part-content-panel" v-if="!showList">
      <div class="part-content add-panel">
        <div class="part-content-header" flex="cross:center">
          <span flex="cross:center main:center" class="upload-btn"><cg-icon-svg name="image" class="svg_icon image"></cg-icon-svg>
              <a-upload
                  name="file"
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
                 name="file"
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
        <div class="file-show-panel" v-if="fileList.length > 0">
          <happy-scroll color="rgba(0,0,0,0.2)" size="5" resize>
            <div flex="cross:center" style="height:140px;">
              <div class="file-item" v-for="(file, index) in fileList" :key="index">
                <img v-if="file.type==='image'" :src="file.imageDisplayUrl">
                <video  v-else width="200" height="140" controls="controls">
                  <source :src="file.videoDisplaySrc" type="video/ogg">
                  <source :src="file.videoDisplaySrc" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
                <div class="delete-btn" @click="deleteFileItem(index)">
                  <a-icon type="close" />
                </div>
              </div>
            </div>
          </happy-scroll>
        </div>
      </div>
      <div class="part-content-footer" flex="cross:center main:center">
        <a-button type="primary" @click="submitEventEvaluationMessageFn">提交</a-button>
      </div>
    </div>
    <div class="part-content-panel list-panel" v-if="showList">
      <div class="part-content" @mouseenter="mouseEnterFn" @mouseleave="mouseLeaveFn">
        <!--<cg-container scroll>-->
        <vuescroll :ops="ops">
          <div v-for="(ev, index) in evaluationDataList" :key="index" flex class="evaluation-item">
            <a-checkbox :checked="ev.isChecked" @change="(e) => {onItemChange(e,index);}"></a-checkbox>
            <div class="evaluation-item-right">
              <div class="message">{{ev.message}}</div>
              <div flex>
                <span class="time" v-if="ev.time">{{new Date(ev.time)|date_format('YYYY-MM-DD HH:mm:ss')}}</span>
                <div v-if="ev.fileList.length>0" class="op-panel" @click="expandHandle(ev)">
                  <span class="op-btn">{{!ev.isExpand?'展开':'收起'}}</span>
                  <a-icon style="color:#cccccc;" :class="{trans180: ev.isExpand}" type="down" />
                </div>
              </div>
              <div class="file-show-panel" v-if="ev.fileList.length>0" flex :class="{height90: ev.isExpand}">
                <div v-for="(file, index) in ev.fileList" :key="index" class="file-item" flex="cross:center">
                  <div v-if="file.type==='image'" >
                    <img style="width:100%;cursor:pointer;" :src="file.imageUrl" @click="clickEvaluationImage(file.imageUrl)">
                  </div>
                  <div v-if="file.type==='video'">
                    <div class="video-btn-panel" flex="cross:center main:center" @click="playVideo(file.videoSrc)">
                      <a-icon type="play-circle"/>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </vuescroll>
          <!--</cg-container>-->
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
    <play-video-modal :visible.sync="modalVisible" :videoSrc="videoSrc"></play-video-modal>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import vuescroll from 'vuescroll';
import dayjs from 'dayjs'
export default {
  name: 'eventEvaluation',
  components:{
    vuescroll
  },
  props:{
    eventId:{
      type: String,
      default: ''
    }
  },
  data(){
    return{
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingY:true
        },
        rail: {
          background: '#cccccc'
        },
        bar: {
          background: '#c1c1c1'
        }
      },
      showList: false,
      evaluationData: {
        eventId: '',
        message: '',
        time: 0,
        fileList: ''
      },
      fileList: [],
      evaluationDataList: [],
      deleteIdArr: [],
      query:{
        eventId: '',
        pageNo: 1,
        pageSize: 20
      },
      totalSize: 0,
      modalVisible: false,
      videoSrc: ''
    }
  },
  methods:{
    ...mapActions('emergency/emergency', ['submitEventEvaluationMessage','getEvaluationListData', 'deleteEvaluation']),
    //附件图片上传之前的校验
    beforeImageUpload (file,filelist) {
      return true
    },
    //附件图片上传状态改变
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
          imageDisplayUrl: data.newPath,
          imageUrl: data.originPath,
          videoSrc: ''
        }
        this.fileList.push(temp);
      }
    },
    //附件视频上传之前的校验
    beforeVideoUpload (file,filelist) {
      return true
    },
    //附件视频上传状态改变
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
          videoDisplaySrc: data.newPath,
          videoSrc: data.originPath
        }
        this.fileList.push(temp);
      }
    },
    deleteFileItem(index){
      this.fileList.splice(index,1);
    },
    //提交评估信息
    submitEventEvaluationMessageFn(){
      this.evaluationData.fileList = JSON.stringify(this.fileList);
      this.evaluationData.eventId = this.eventId;
      this.evaluationData.time = new Date().getTime();
      console.log('submitEventEvaluationMessage',this.evaluationData);
      this.submitEventEvaluationMessage(this.evaluationData).then(()=>{
        //成功后调用
        this.evaluationData.message = '';
        this.evaluationData.time = 0;
        this.evaluationData.fileList = '';
        this.fileList = [];
        this.toList();
      });

    },
    //鼠标进入容器触发事件
    mouseEnterFn(){
      console.log('mouseEnterFn');
      this.$emit('stopParentScroll');
    },
    //鼠标离开容器触发事件
    mouseLeaveFn(){
      console.log('mouseLeaveFn');
      this.$emit('stopParentScroll');
    },
    //获取评价列表
    getEvaluationListDataFn(){
      this.query.eventId = this.eventId;
      this.getEvaluationListData(this.query).then((res)=>{
        console.log('getEvaluationListData',res);
        this.evaluationDataList = res.list.map( item => {
          item.isExpand = false;
          item.isChecked = false;
          return item
        });
        this.totalSize = res.total;
      })
    },
    toList(){
      this.showList = true;
      this.deleteIdArr = [];
      let _this = this;
      setTimeout(() => {
        _this.getEvaluationListDataFn();
      },500);
    },
    expandHandle(ev){
      ev.isExpand = !ev.isExpand;
    },
    playVideo(videoSrc){
      this.videoSrc = videoSrc;
      this.modalVisible = true;
    },
    onItemChange(e, index){
      console.log('098765');
      let checked = `${e.target.checked}`;
      //let id = this.evaluationDataList[index].id;
      if(checked==='true'){
        this.evaluationDataList[index].isChecked = true;
        //this.deleteIdArr.push(id);
      }
      else{
        // let i = this.deleteIdArr.indexOf(id);
        // this.deleteIdArr.splice(i,1);
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
      this.deleteIdArr = [];
      this.evaluationDataList.forEach(item => {
        if(item.isChecked) this.deleteIdArr.push(item.id);
      })
      console.log('deleteEvaluationFn', this.eventId, this.deleteIdArr);
      if(this.deleteIdArr.length===0){
        this.$message.warning('请至少选择一条评估进行删除操作！！！');
      }
      else{
        let _this = this;
        this.$confirm({
          title: '你确定要删除这些评估吗?',
          content: '',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            let temp = {
              eventId: _this.eventId,
              evaluationIdArr: JSON.stringify(_this.deleteIdArr)
            }
            _this.deleteEvaluation(temp).then((res) => {
              _this.getEvaluationListDataFn();
            });
          },
          onCancel() {
            console.log('取消了');
          }
        });
      }
    },
    changePageNoHandle(pageNo,pageSize){
      this.query.pageNo = pageNo;
      this.getEvaluationListDataFn();
    },
    clickEvaluationImage(imageUrl){
      window.open(imageUrl);
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
      height: 180px;
      width: 100%;
      .file-item{
        width: 200px;
        height: 140px;
        border: 1px solid #dddddd;
        margin-right:10px;
        overflow: hidden;
        text-align: center;
        position: relative;
        img{
          height:100%;
        }
        .delete-btn{
          position: absolute;
          right: 0px;
          top: 0px;
          width: 20px;
          height: 20px;
          background-color: #cccccc;
          border-radius: 20px;
          cursor: pointer;
          &:hover{
            background-color: #666666;
          }
          i{
            color: #ffffff
          }
        }
      }
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
        &:last-child{
          .evaluation-item-right{
            border-bottom: 1px solid transparent;
          }
        }
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
              margin: 0px 5px 0px 10px;
            }
            i{
              font-size:12px;
              transition: all 0.3s;
              &.trans180{
                transform:rotate(180deg);
                -ms-transform:rotate(180deg); 	/* IE 9 */
                -moz-transform:rotate(180deg); 	/* Firefox */
                -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
                -o-transform:rotate(180deg); 	/* Opera */
              }
            }
          }

          .file-show-panel{
            padding-top: 0px;
            height: 0px;
            overflow: hidden;
            transition: all 0.3s;
            &.height90{
              height: 90px;
              padding-top: 20px;
            }
              .file-item{
                width: 100px;
                height: 70px;
                border: 1px solid #dddddd;
                background-color: #dddddd;
                margin-right: 10px;
                .video-btn-panel{
                  width: 100px;
                  height: 70px;
                  background-color: #000000;
                  i{
                    color: #888;
                    font-size: 30px;
                    cursor: pointer;
                  }
                  &:hover i{
                    color: #fff;
                  }
                }
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
