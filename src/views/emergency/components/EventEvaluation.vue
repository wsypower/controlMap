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
      <div class="part-content">
        <div class="part-content-header" flex="cross:center">
          <span flex="cross:center main:center"><cg-icon-svg name="image" class="svg_icon image"></cg-icon-svg>添加图片(可多选）</span>
          <span>|</span>
          <span flex="cross:center main:center"><cg-icon-svg name="video" class="svg_icon video"></cg-icon-svg>添加视频(可多选）</span>
        </div>
        <a-textarea placeholder="对本此预案可以写下你的意见..." :autosize="{ minRows: 4, maxRows: 4 }" />
        <div class="file-show-panel" v-show="false">
          <div style="width: 200px;height: 140px;border: 1px solid #dddddd;"></div>
        </div>
      </div>
      <div class="part-content-footer" flex="cross:center main:center">
        <a-button type="primary" @click="submitEventEvaluationMessage">提交</a-button>
      </div>
    </div>
    <div class="part-content-panel list-panel" v-show="showList">
      <div class="part-content">
        <cg-container scroll>
          <div v-for="(ev, index) in evaluationDataList" :key="index" flex class="evaluation-item">
            <a-checkbox ></a-checkbox>
            <div class="evaluation-item-right">
              <div class="message">{{ev.message}}</div>
              <div>
                <span class="time">{{ev.time}}</span>
                <div v-if="ev.fileList.length>0">
                  <span class="op-btn">{{item.isExpand?'展开':'收起'}}</span>
                  <a-icon v-if="!item.isExpand" type="down" />
                  <a-icon v-else type="up" />
                </div>
              </div>
              <div class="file-show-panel" v-if="ev.fileList.length>0">
                <div v-for="(file, index) in ev.fileList" :key="index">

                </div>
                <div style="width: 100px;height: 70px;border: 1px solid #dddddd;"></div>
              </div>
            </div>
          </div>
        </cg-container>
      </div>
      <div class="list-panel-footer" flex="cross:center main:justify">
        <div flex="cross:center">
          <a-checkbox @change="onChange">全选（当前页）</a-checkbox>
          <a-button type="primary" size="small" ghost>删除</a-button>
          <a-button style="margin-left: 10px;" type="primary" size="small" ghost>新增</a-button>
        </div>
        <a-pagination v-model="pageNo" :total="totalSize" />
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
      showList: true,
      evaluationDataList: [{},{}],
      pageNo: 10,
      totalSize: 36
    }
  },
  watch:{
    eventId: function(val){
      let temp1 = {
        id: 'qh783074647dj6hdkslikd78w64',
        message: '应急评估应急评估应急评估应急评估应急评估应急评估应急评估应急评估应急评估应急评估应急评估应急。',
        time: '2019-12-19 17:16',
        isExpand: false,
        fileList: [{
          type: 'image',
          name: '20191118075945806659.jpg',
          imageUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118075945806659.jpg',
          videoSrc: ''
        }, {
          type: 'image',
          name: '20191118113903272296.jpg',
          imageUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118113903272296.jpg',
          videoSrc: ''
        }, {
          type: 'video',
          name: '',
          imageUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118080357327335.jpg',
          videoSrc: ''
        }]
      }
      let temp2 = {
        id: 'aa783074647dsx234gikd78w64',
        message: '应急评估应急评估应急评估应急评估应急评估应急评估应急评估应急评估应急评估应急评估应急评估应急。',
        time: '2019-12-19 17:16',
        isExpand: false,
        fileList: [{
          type: 'video',
          name: '',
          imageUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118080357327335.jpg',
          videoSrc: ''
        }]
      }
      this.evaluationDataList.push(temp1);
      this.evaluationDataList.push(temp2);
    }
  },
  methods:{
    submitEventEvaluationMessage(){
      console.log('submitEventEvaluationMessage');
    },
    toList(){
      this.showList = true;
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

        span:nth-child(1),
        span:nth-child(3){
          width: 170px;
          /*text-align: center;*/
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          color: #2b90f3;
          .svg_icon {
            height: 18px;
            margin-right: 10px;
          }
        }
        span:nth-child(2){
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
      .file-show-panel {
        padding: 20px;
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
        .evaluation-item-right{
          margin-left:10px;
          border-bottom: 1px solid #dddddd;
          .message{
            color:#333333;
          }
          .time{
            color:#999999;
          }
          .op-btn{
            color: #2b8ff3;
            margin-left: 10px;
          }
          .file-show-panel{
            padding: 20px 0px;
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
