<template>
  <div class="tip-content">
    <div class="tip-header" flex="dir:left">
      <div class="info-body-left" flex="cross:center">
        <img src="~@img/pin.png" />
        <span>{{ info.addressName }}</span>
      </div>
      <div class="close" flex="main:center cross:center" @click="closeDialog"></div>
    </div>
    <div class="tip-body">
      <!--<vue-scroll :ops="ops">-->
        <a-checkbox-group :options="info.videoList" v-model="selectVideo"/>
      <!--</vue-scroll>-->
    </div>
    <div class="info-body-operation" @click="openVideoPlayer">
      预览
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default{
    name: 'videoInfo',
    data(){
        return {
          ops: {
            vuescroll: {},
            scrollPanel: {},
            rail: {
            },
            bar: {
              background: '#2676e5',
              opacity: 0.2
            }
          },
          selectVideo: [],
          //videoList: []
        }
    },
    props:{
        info:{
            default(){
                return {
                    addressName: '',
                    videoList: []
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
        //打开视频，触发父组件的方法
        openVideoPlayer(){
          if(this.selectVideo.length===0){
            this.$message.warning('请选择摄像头！！！');
          }else{
            this.$emit('openVideoPlayer',this.selectVideo);
          }
        },
        closeDialog(){
            this.$emit('closeTip')
        }
    }
}
</script>
<style lang="scss" scoped>
.tip-content {
  z-index: 10;
  width: 240px;
  //height: 210px;
  background-image: linear-gradient(90deg, #0065ea 0%, #00a5ff 100%);
  border-radius: 6px;
  box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.12);
  .tip-header {
    height: 40px;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
    .info-body-left {
      width: 200px;
      height: 100%;
      img {
        width: 20px;
        height: auto;
      }
      span {
        margin-left: 10px;
        color: #ffffff;
        font-size: 16px;
      }
    }
    .info-body-right {
      padding-top: 10px;
      > div {
        font-family: PingFang-SC-Regular;
        font-size: 13px;
        color: #ffffff;
        line-height: 24px;
        .svg_icon_telephone,
        .svg_icon_section {
          width: 14px;
          height: 14px;
          color: #ffffff;
          margin-right: 10px;
        }
        .name_text {
          font-size: 16px;
        }
        .sub_text {
          margin-left: 20px;
          font-size: 12px;
        }
      }
    }
    .close {
      position: absolute;
      right: 6px;
      top: 6px;
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
    /*height: 150px;*/
    max-height: 150px;
    //height: calc(100% - 75px);
    overflow: hidden;
    background-color: #ffffff;
    padding: 10px 20px;
    font-size: 13px;
    color: #333333;
    /deep/.ant-checkbox-group-item{
      margin: 5px 5px 5px 0px !important;
    }
    > div {
      line-height: 24px;
      .red{
        color: #e03131;
      }
    }
    .title {
      color: #888888;
    }
  }
  .info-body-operation {
    border-top: 1px dashed #dddddd;
    height: 35px;
    text-align: center;
    font-family: PingFang-SC-Medium;
    font-size: 13px;
    line-height: 35px;
    color: #2b90f3;
    background-color: #ffffff;
    cursor: pointer;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
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
