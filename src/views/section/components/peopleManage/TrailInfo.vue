<template>
  <div class="tip-content">
    <div class="tip-header" flex="dir:left">
      <div class="info-body-left">
        <span>轨迹信息</span>
      </div>
      <div class="info-body-right">
        <div class="close" v-on="$listeners"></div>
      </div>
    </div>
    <div class="tip-body">
      <div class="data_panel">
        <span>上报时间：</span><span>{{ info }}</span>
      </div>
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'trailInfo',
  data() {
    return {};
  },
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.tip-content {
  width: 230px;
  height: 70px;
  background-image: linear-gradient(90deg, #0065ea 0%, #00a5ff 100%);
  border-radius: 6px;
  box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.12);
  cursor: default;

  .tip-header {
    height: 30px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;

    .info-body-left {
      width: 80px;
      height: 100%;
      color: white;
      display: flex;
      align-items: center;
    }

    .info-body-right {
      display: flex;
      align-items: center;

      >div {
        font-family: PingFang-SC-Regular;
        font-size: 13px;
        color: #ffffff;
        line-height: 24px;
      }
    }

    .close {
      position: absolute;
      right: 8px;
      width: 24px;
      height: 24px;
      line-height: 24px;
      transition: all 0.2s;
      transform: rotate(0deg);
      transform-origin: center;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA4ElEQVRYR+2WUQ4CMQhEh5vozfRkejO9CaaJTYhpy8Cq7Uf3d4F5O8C2gsmPTNbHBtgOuA6o6klEnplhZXKHAKp6AXADcBWRewSCze0CFHoADyNKQxjxmn7uucg6UAu5EA3xYQ4zA7UNLkRUvBR0AUoQU5iJac0QBeBBZMVpByp5S+j9rmyK26JDDgwgbF13SD8h6BbYxIYT5XVYPNwCx4X/AHS+PtX/sANTh3C0aj9fQ0aAiUmtYaRwJLbCrHsYrXYch3f88IXE/HTmXckiV7BsbOosyIql1vCbYhtgSQdeDpKoIXzqLREAAAAASUVORK5CYII=') no-repeat;
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
    height: calc(100% - 30px);
    overflow: hidden;
    background-color: #ffffff;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;

    .data_panel {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
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
      /*box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.12);*/
      border: solid 1px #dddddd;
    }
  }
}
</style>