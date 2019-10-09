<template>
  <div class="modal" ref="modal" :class="{ bkUpAnimation: isActive }" v-if="visible" v-show="showModal">
    <div
      class="modal-content"
      :class="{ upAnimate: isActive }"
      :style="{ width: dWidth + 'px', height: dHeight + 'px' }"
    >
      <div class="modal-header" flex="dir:left cross:center main:justify">
        <div class="modal-title" flex="cross:center">
          {{ dialogTitle }}
        </div>
        <div
          class="close"
          flex="main:center cross:center"
          @click="closeDialog(false)"
        ></div>
      </div>
      <div class="modal-body" :style="padding">
        <component v-if="Object.keys(componentId).length>0"
                   :is="componentId"
                   :sourceData="sourceData"
                   @close="closeDialog(true)"
                   @hide="hideDialog"
                   @show="showDialog">
        </component>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default{
    name: 'customDialog',
    data(){
        return {
            //是否增加出现的动效
            isActive: false,
            //dialog显示还是隐藏
            showModal: true
        }
    },
    props:{
        //dialog是否渲染
        visible:{
            type: Boolean,
            default: false
        },
        //dialog标题
        dialogTitle:{
            type:String,
            default: '标题'
        },
        //dialog宽度
        dWidth:{
            type: Number,
            default: 810
        },
        //dialog高度
        dHeight:{
            type: Number,
            default: 450
        },
        //dialog的body内边框
        bodyPadding:{
            type: Array,
            default: function(){
                return [0,0,0,0]
            }
        },
        //dialog的body内组件
        componentId:{
            type: Object,
            default(){
                return {}
            }
        },
        //dialog关闭时的回调
        closeCallBack:{
            type: Function,
            default(){
                return null
            }
        },
        //dialog给内部组件的原始数据
        sourceData:{
            default(){
                return {}
            }
        }
    },
    computed:{
        padding: function(){
            return {
                paddingTop:  this.bodyPadding[0]||0 + 'px',
                paddingRight: this.bodyPadding[1]||0 + 'px',
                paddingBottom: this.bodyPadding[2]||0 + 'px',
                paddingLeft: this.bodyPadding[3]||0 + 'px'
            }
        },
    },
    mounted(){
        //挂载到body上
        this.$nextTick(() => {
            const body = document.querySelector("body");
            if (body.append) {
                body.append(this.$el);
            } else {
                body.appendChild(this.$el);
            }
        });
    },
    watch:{},
    methods:{
        init(){
        },
        //隐藏dialog
        hideDialog(){
            this.isActive = true;
            setTimeout(()=>{
              this.showModal = false;
            },600);
        },
        //关闭dialog
        closeDialog(needCallBack){
            this.isActive = true;
            let _this = this;
            new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    _this.isActive = false;
                    this.$emit('update:visible', false);
                    resolve('ok');
                },600);
            }).then(function (result) {
                console.log('关闭dialog ' + result);
                if(needCallBack){
                    _this.closeCallBack&&_this.closeCallBack();
                }
            });
        },
        //显示dialog
        showDialog(){
          this.isActive = false;
          this.showModal = true;
        }
    }
}
</script>
<style lang="scss" scoped>
@-webkit-keyframes bkDownAnimation {
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(0, 0, 0, 0.7);
  }
}

@keyframes bkDownAnimation {
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(0, 0, 0, 0.7);
  }
}

@-webkit-keyframes topDown {
  from {
    top: -50%;
    opacity: 0;
  }
  to {
    top: 50%;
    opacity: 1;
  }
}
@keyframes topDown {
  from {
    top: -50%;
    opacity: 0;
  }
  to {
    top: 50%;
    opacity: 1;
  }
}

@-webkit-keyframes bkUpAnimation {
  from {
    background: rgba(0, 0, 0, 0.7);
  }
  to {
    background: rgba(0, 0, 0, 0);
  }
}

@keyframes bkUpAnimation {
  from {
    background: rgba(0, 0, 0, 0.7);
  }
  to {
    background: rgba(0, 0, 0, 0);
  }
}

@-webkit-keyframes topUp {
  from {
    top: 50%;
    opacity: 1;
  }
  to {
    top: -50%;
    opacity: 0;
  }
}

@keyframes topUp {
  from {
    top: 50%;
    opacity: 1;
  }
  to {
    top: -50%;
    opacity: 0;
  }
}
.modal {
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
  -webkit-animation: bkDownAnimation 0.6s;
  animation: bkDownAnimation 0.6s;
  &.bkUpAnimation {
    -webkit-animation: bkUpAnimation 0.6s;
    animation: bkUpAnimation 0.6s;
  }
  .modal-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1200px;
    height: 644px;
    background-image: linear-gradient(90deg, #0065ea 0%, #6f62ee 100%);
    border-radius: 6px;
    box-shadow: 0px 13px 20px 9px #33333345;
    -webkit-animation: topDown 0.6s;
    animation: topDown 0.6s;
    overflow: hidden;
    &.upAnimate {
      -webkit-animation: topUp 0.6s;
      animation: topUp 0.6s;
    }
    .modal-header {
      height: 50px;
      width: 100%;
      padding-left: 20px;
      .modal-title {
        font-size: 22px;
        color: #ffffff;
        font-weight: 500;
      }
      .close {
        width: 44px;
        height: 44px;
        line-height: 44px;
        transition: all 0.2s;
        transform: rotate(0deg);
        transform-origin: center;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA4ElEQVRYR+2WUQ4CMQhEh5vozfRkejO9CaaJTYhpy8Cq7Uf3d4F5O8C2gsmPTNbHBtgOuA6o6klEnplhZXKHAKp6AXADcBWRewSCze0CFHoADyNKQxjxmn7uucg6UAu5EA3xYQ4zA7UNLkRUvBR0AUoQU5iJac0QBeBBZMVpByp5S+j9rmyK26JDDgwgbF13SD8h6BbYxIYT5XVYPNwCx4X/AHS+PtX/sANTh3C0aj9fQ0aAiUmtYaRwJLbCrHsYrXYch3f88IXE/HTmXckiV7BsbOosyIql1vCbYhtgSQdeDpKoIXzqLREAAAAASUVORK5CYII=")
          no-repeat 6px 6px;
        &:hover {
          text-decoration: none;
          cursor: pointer;
          transform: rotate(90deg);
        }
      }
    }
    .modal-body {
      width: 100%;
      height: calc(100% - 50px);
      padding: 0px 10px 10px 10px;
      overflow: hidden;
    }
  }
}
</style>
