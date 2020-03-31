<template>
  <div class="body-video-panel">
    <div v-if="multiple" flex="dir:right cross:center" style="width: 100%;flex-wrap: wrap;">
      <div v-for="(item, index) in realVideoSrcArr" :key="index">
        <div class="video-play-item" v-if="item.show">
          <div class="video-header">{{item.name}}</div>
          <video-player :videoUrl="item.srcUrl" style="height:calc(100% - 30px)"></video-player>
          <div class="close-panel" flex="cross:center main:center" @click="close(index)">X</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="single-video" v-if="realVideoSrc !== ''">
        <video-player :videoUrl="realVideoSrc"></video-player>
        <div class="close-panel" flex="cross:center main:center" @click="closeSingleVideo()">X</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myVideoPlayer',
  props: {
    videoId: {
      type: String,
      default: ''
    },
    videoName: {
      type: String,
      default: ''
    },
    videoSrc: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      realVideoSrc: '',
      realVideoSrcArr: []
    }
  },
  mounted() {},
  watch: {
    videoSrc: function(val) {
      this.realVideoSrc = val
    },
    realVideoSrc: function(val) {
      if (val && val.length > 0) {
        let videoIndex = this.realVideoSrcArr.findIndex(item => item.id === this.videoId);
        let length = this.realVideoSrcArr.reduce((acc, item) => {
          if (item.show) {
            ++acc
          }
          return acc
        }, 0)
        if(videoIndex<0 || !this.realVideoSrcArr[videoIndex].show){
          if (length >= 6) {
            let opIndex = this.realVideoSrcArr.findIndex(item => item.show === true);
            this.realVideoSrcArr[opIndex].show = false;
          }
          let temp = {
            srcUrl: val,
            name: this.videoName,
            id: this.videoId,
            show: true
          }
          this.realVideoSrcArr.push(temp)
        }
      } else {
        console.log(11111)
        this.$emit('update:videoSrc', '')
      }
    }
  },
  methods: {
    close(index) {
      this.realVideoSrcArr[index].show = false
      this.realVideoSrc = ''
    },
    closeSingleVideo() {
      this.realVideoSrc = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.body-video-panel {
  position: fixed;
  right: 10px;
  top: 60px;
  max-width: 550px;
  height: auto;
  max-height: 600px;
  .video-play-item {
    width: 250px;
    height: 170px;
    border: 2px solid rgba(43, 144, 243, 0.8);
    margin-bottom: 10px;
    margin-left: 10px;
    position: relative;
    background-color: #000;
    .video-header{
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #ffffff;
    }
    &.active {
      display: block;
    }
    .close-panel {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background-color: rgba(255, 0, 0, 0.5);
      color: #ffffff;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 0, 0, 0.8);
      }
    }
  }
  .single-video {
    min-width: 500px;
    height: 300px;
    border: 2px solid rgba(43, 144, 243, 0.8);
    position: relative;
    .close-panel {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background-color: rgba(255, 0, 0, 0.5);
      color: #ffffff;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 0, 0, 0.8);
      }
    }
  }
}
</style>
