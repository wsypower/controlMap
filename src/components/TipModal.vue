<template>
  <div
    class="tip-content"
    :style="tipClass"
    :class="{ active: isActive }"
    v-if="visible"
  >
    <div class="tip-header" flex="dir:left cross:center main:justify">
      <div class="tip-title" flex="cross:center">
        <i v-if="iconShow" class="icon"></i>
        <span>{{ title || info.typeName }}</span>
        <span>{{ timeStr || info.dayTime}}</span>
      </div>
      <div
        class="close"
        flex="main:center cross:center"
        @click="closeDialog"
      ></div>
    </div>
    <div class="tip-body" :style="padding">
      <component v-if="Object.keys(componentId).length>0" :is="componentId" :info="info"></component>
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default{
    name: 'tipModal',
    data(){
        return {
            isActive: false
        }
    },
    props:{
        visible:{
            type: Boolean,
            default: false
        },
        modalWidth: {
            type: Number,
            default: 482
        },
        modalHeight: {
            type: Number,
            default: 254
        },
        bodyPadding:{
            type: Array,
            default: function(){
                return [0,0,0,0]
            }
        },
        positionX:{
            type: Number,
            default: 0
        },
        positionY:{
            type: Number,
            default: 0
        },
        title: {
            type: String,
            default: '标题'
        },
        iconName: {
            type: String,
            default: ''
        },
        timeStr: {
            type: String,
            default: ''
        },
        componentId:{
            type: Object,
            default(){
                return {}
            }
        },
        info:{
            type: Object,
            default(){
                return {}
            }
        },
        closeCallBack:{
            type: Function,
            default(){
                return null
            }
        }
    },
    computed:{
        tipClass: function(){
            let left = this.positionX-this.modalWidth/2;
            let top = this.positionY-this.modalHeight -20;
            return {
                left: left + 'px',
                top: top + 'px',
                width: this.modalWidth + 'px',
                height:  this.modalHeight + 'px'
            }
        },
        padding: function(){
            return {
                paddingTop:  this.bodyPadding[0]||0 + 'px',
                paddingRight: this.bodyPadding[1]||0 + 'px',
                paddingBottom: this.bodyPadding[2]||0 + 'px',
                paddingLeft: this.bodyPadding[3]||0 + 'px'
            }
        },
        iconShow: function(){
            return this.iconName && this.iconName.length>0
        }
    },
    mounted(){
        this.$nextTick(() => {
            const body = document.querySelector("body");
            if (body.append) {
                body.append(this.$el);
            } else {
                body.appendChild(this.$el);
            }
        });
    },
    watch:{
        visible: function(value){
            console.log('active ' + value);
            if(value){
                this.init();
            }
            else{
                this.isActive = false;
            }
        }
    },
    methods:{
        init(){
            setTimeout(()=>{
              this.isActive = true;
            });
        },
        closeDialog(){
            this.isActive = false;
            let _this = this;
            new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    this.$emit('update:visible', false);
                    resolve('ok');
                },1000);
            }).then(function (result) {
                console.log('关闭 ' + result);
                _this.closeCallBack&&_this.closeCallBack();
            });

        }
    }
}
</script>
<style lang="scss" scoped>
.active {
  opacity: 1 !important;
  transition: opacity 1s;
  -moz-transition: opacity 1s; /* Firefox 4 */
  -webkit-transition: opacity 1s; /* Safari 和 Chrome */
  -o-transition: opacity 1s; /* Opera */
}
.tip-content {
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 10;
  width: 482px;
  height: 224px;
  background-image: linear-gradient(90deg, #0065ea 0%, #6f62ee 100%);
  border-radius: 6px;
  box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.12);
  border: solid 1px #dddddd;
  opacity: 0;
  transition: opacity 1s;
  -moz-transition: opacity 1s; /* Firefox 4 */
  -webkit-transition: opacity 1s; /* Safari 和 Chrome */
  -o-transition: opacity 1s; /* Opera */
  .tip-header {
    height: 40px;
    width: 100%;
    padding-left: 20px;
    padding-right: 10px;
    .tip-title {
      font-size: 16px;
      color: #ffffff;
      .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        //background: url("../assets/images/zhuantifuwu.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 10px;
      }
      span:nth-child(2) {
        margin-left: 10px;
      }
    }
    .close {
      width: 24px;
      height: 24px;
      line-height: 24px;
      transition: all 0.2s;
      transform: rotate(0deg);
      transform-origin: center;
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA4ElEQVRYR+2WUQ4CMQhEh5vozfRkejO9CaaJTYhpy8Cq7Uf3d4F5O8C2gsmPTNbHBtgOuA6o6klEnplhZXKHAKp6AXADcBWRewSCze0CFHoADyNKQxjxmn7uucg6UAu5EA3xYQ4zA7UNLkRUvBR0AUoQU5iJac0QBeBBZMVpByp5S+j9rmyK26JDDgwgbF13SD8h6BbYxIYT5XVYPNwCx4X/AHS+PtX/sANTh3C0aj9fQ0aAiUmtYaRwJLbCrHsYrXYch3f88IXE/HTmXckiV7BsbOosyIql1vCbYhtgSQdeDpKoIXzqLREAAAAASUVORK5CYII=")
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
    padding: 0px 10px 10px 10px;
    overflow: hidden;
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
      content: "";
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
