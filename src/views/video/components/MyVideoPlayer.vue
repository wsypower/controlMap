<template>
  <div class="body-video-panel">
    <div v-if="multiple" flex="dir:right cross:center" style="width: 100%;flex-wrap: wrap;">
      <div v-for="(item, index) in realVideoSrcArr" :key="index">
        <div class="video-play-item" v-if="item.show">
          <video-player :videoUrl="item.srcUrl"></video-player>
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
        let length = this.realVideoSrcArr.reduce((acc, item) => {
          if (item.show) {
            ++acc
          }
          return acc
        }, 0)
        if (length < 6) {
          let temp = {
            srcUrl: val,
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
    height: 165px;
    background-color: rgba(43, 144, 243, 0.8);
    border: 2px solid rgba(43, 144, 243, 0.8);
    margin-bottom: 10px;
    margin-left: 10px;
    position: relative;
    &.active {
      display: block;
    }
    .close-panel {
      z-index: 999;
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
