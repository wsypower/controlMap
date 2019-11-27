<template>
  <div class="tip-content">
    <div class="tip-header" flex="dir:left">
      <div class="info-body-left" flex="cross:center">
        <img src="~@img/car_default.png" />
        <span>{{ info.name }}</span>
      </div>
      <div class="close" flex="main:center cross:center" @click="closeDialog"></div>
    </div>
    <div class="tip-body">
      <div>
        <span class="title">编码：</span><span>{{ info.code }}</span>
      </div>
      <div>
        <span class="title">标识：</span><span>{{ info.flag }}</span>
      </div>
      <div>
        <span class="title">电话：</span><span>{{ info.phone }}</span>
      </div>
      <div>
        <span class="title">组别：</span><span>{{ info.dept }}</span>
      </div>
      <div>
        <span class="title">GPS上报：</span><span>{{new Date(info.gpsTime)|date_format()}}</span>
      </div>
    </div>
    <div class="info-body-operation" @click="lookCarTrail">
      查看轨迹
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default{
    name: 'carInfo',
    data(){
        return {
          name: ''
        }
    },
    props:{
        info:{
            default(){
                return {
                    id: '',
                    name: '',
                    code: '',
                    flag: '',
                    phone: '',
                    dept: '',
                    gpsTime: ''
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
        //查看轨迹，触发父组件的方法
        lookCarTrail(){
            this.$emit('getCarId',this.info.id);
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
  width: 280px;
  height: 210px;
  background-image: linear-gradient(90deg, #0065ea 0%, #00a5ff 100%);
  border-radius: 6px;
  box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.12);
  border: solid 1px #dddddd;
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
      right: 0px;
      top: 0px;
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
    height: calc(100% - 75px);
    overflow: hidden;
    background-color: #ffffff;
    padding: 10px 16px;
    font-size: 13px;
    color: #333333;
    > div {
      line-height: 24px;
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
