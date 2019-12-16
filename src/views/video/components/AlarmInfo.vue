<template>
  <div class="tip-content">
    <div class="tip-header" flex="dir:left cross:center main:justify">
      <span>告警详情</span>
      <div class="close" flex="main:center cross:center" @click="closeDialog(false)"></div>
    </div>
    <div class="tip-body" flex="dir:left cross:center">
      <img :src="info.photoUrl" />
      <div class="message-panel">
        <h6 class="title">告警信息</h6>
        <p>
          <span>【告警点位】</span><span class="mes-content" :title="info.position">{{ info.position }}</span>
        </p>
        <p>
          <span>【告警时间】</span><span>{{ new Date(parseInt(info.dayTime)) | date_format('YYYY-MM-DD HH:mm') }}</span>
        </p>
        <p>
          <span>【告警类型】</span><span>{{ info.typeName }}</span>
        </p>
        <h6 class="title M20">告警备注信息</h6>
        <a-textarea
          v-model="remark"
          placeholder="请输入"
          :autosize="{ minRows: 2, maxRows: 2 }"
          style="width: 300px;margin-left: 5px;"
        />
        <div flex="cross:center main:center" class="btn-panel">
          <a-button @click="noBackRulesHandle()">未违规</a-button>
          <a-button type="primary" @click="reportHandle()">上报案件</a-button>
        </div>
      </div>
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import util from '@/utils/util';
const userId = util.cookies.get('userId');
export default{
    name: 'alarmInfo',
    data(){
        return {
          remark: ''
        }
    },
    props:{
        info:{
            default(){
                return {
                  id: '',
                  photoUrl: '',
                  position: '',
                  dayTime: null,
                  typeName: ''
                }
            }
        },
        closeCallBack:{
            type: Function,
            default(){
                return null
            }
        }
    },
    mounted(){},
    methods:{
      ...mapActions('video/manage', ['alarmNormalHandle','alarmReportHandle']),
      //关闭弹窗
      closeDialog(isRefresh){
        this.$emit('closeTip', isRefresh)
      },
      //未违规操作
      noBackRulesHandle(){
        console.log('noBackRulesHandle',this.info, this.remark);
        this.alarmNormalHandle({userId: userId, id:this.info.id, remark:this.remark}).then((res) => {
          console.log('把告警设置为未违规');
          this.remark = '';
          this.closeDialog(true);
        });
      },
      //案件上报
      reportHandle(){
        console.log('reportHandle',this.info, this.remark);
        this.alarmReportHandle({userId: userId, id:this.info.id, remark:this.remark}).then((res) => {
          console.log('把告警上报上去');
          this.remark = '';
          this.closeDialog(true);
        });
      }
    }
}
</script>
<style lang="scss" scoped>
.tip-content {
  z-index: 10;
  width: 720px;
  height: 330px;
  background-image: linear-gradient(90deg, #0065ea 0%, #00a5ff 100%);
  border-radius: 6px;
  box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.12);
  .tip-header {
    height: 40px;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
    span {
      color: #ffffff;
      font-size: 16px;
    }
    .close {
      width: 24px;
      height: 24px;
      line-height: 24px;
      transition: all 0.2s;
      transform: rotate(0deg);
      transform-origin: center;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA4ElEQVRYR+2WUQ4CMQhEh5vozfRkejO9CaaJTYhpy8Cq7Uf3d4F5O8C2gsmPTNbHBtgOuA6o6klEnplhZXKHAKp6AXADcBWRewSCze0CFHoADyNKQxjxmn7uucg6UAu5EA3xYQ4zA7UNLkRUvBR0AUoQU5iJac0QBeBBZMVpByp5S+j9rmyK26JDDgwgbF13SD8h6BbYxIYT5XVYPNwCx4X/AHS+PtX/sANTh3C0aj9fQ0aAiUmtYaRwJLbCrHsYrXYch3f88IXE/HTmXckiV7BsbOosyIql1vCbYhtgSQdeDpKoIXzqLREAAAAASUVORK5CYII=')
        no-repeat;
      background-size: 100% 100%;
      &:hover {
        text-decoration: none;
        cursor: pointer;
        transform: rotate(90deg);
      }
    }
  }
  .tip-body {
    width: 100%;
    height: calc(100% - 40px);
    overflow: hidden;
    background-color: #ffffff;
    padding: 20px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    img {
      width: 360px;
      height: 250px;
    }
    .message-panel {
      height: 100%;
      margin-left: 15px;
      .title {
        font-family: PingFang-SC-Heavy;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0px;
        color: #2b90f3;
        &.M20 {
          margin-top: 15px;
        }
      }
      p {
        margin: 0px;
        span {
          font-family: PingFang-SC-Medium;
          font-size: 13px;
          line-height: 24px;
          letter-spacing: 0px;
          &:first-child {
            color: #333333;
          }
          &:last-child {
            width: 225px;
            display: inline-block;
            vertical-align: middle;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #666666;
          }
        }
      }
      .btn-panel {
        margin-top: 15px;
        button:first-child {
          margin-right: 10px;
        }
      }
    }
  }
  .tooltip__arrow {
    width: 50px;
    height: 25px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background: white;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      top: 0;
      left: 50%;
      box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.12);
      border: solid 1px #dddddd;
    }
  }
}
</style>
