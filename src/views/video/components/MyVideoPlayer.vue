<template>
  <div class="body-video-panel" flex="dir:right cross:center">
    <div v-for="(item, index) in realVideoSrcArr" :key="index">
      <div class="video-play-item" v-if="item.show">
        <video-player :videoUrl="item.srcUrl"></video-player>
        <div class="close-panel" flex="cross:center main:center" @click="close(index)">X</div>
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
  flex-wrap: wrap;
  .video-play-item {
    //display: none;
    width: 250px;
    height: 150px;
    border: 2px solid rgba(43, 144, 243, 0.8);
    margin-bottom: 10px;
    margin-left: 10px;
    position: relative;
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
}
</style>
