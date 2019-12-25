<template>
  <div class="modal" ref="videoModal" :class="{ bkUpAnimation: isActive }" v-if="visible" v-show="showModal">
    <div class="modal-content" :class="{ upAnimate: isActive }" style="width: 600px; height: 340px;">
      <div class="modal-body" >
        <video width="600" height="340" controls="controls">
          <source :src="videoSrc" type="video/ogg">
          <source :src="videoSrc" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="close-btn" @click="closeDialog(false)">
          <a-icon type="close" />
        </div>
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
        //dialog关闭时的回调
        closeCallBack:{
            type: Function,
            default(){
                return null
            }
        },
        //dialog给内部组件的原始数据
        videoSrc:{
            type: String,
            default: ''
        }
    },
    computed:{},
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
  z-index: 1000;
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
    border-radius: 6px;
    box-shadow: 0px 13px 20px 9px #33333345;
    -webkit-animation: topDown 0.6s;
    animation: topDown 0.6s;
    overflow: hidden;
    &.upAnimate {
      -webkit-animation: topUp 0.6s;
      animation: topUp 0.6s;
    }
    .modal-body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      .close-btn{
        position: absolute;
        right: 8px;
        top: 8px;
        width: 30px;
        height: 30px;
        background-color: #cccccc;
        cursor: pointer;
        i{
          color: #ffffff;
          font-size: 30px;
        }
        &:hover{
          background-color: #666666;
        }
      }
    }
  }
}
</style>
