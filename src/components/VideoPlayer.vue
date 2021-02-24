<template>
  <div class="video-js">
    <div v-if="videoSrc === ''" class="no-video">
      暂未播放视频
    </div>
    <video-player v-else class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions">
    </video-player>
  </div>
</template>
<script>
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import { videoPlayer } from 'vue-video-player';
import 'videojs-contrib-hls';
import 'videojs-flash';
import SWF_URL from 'videojs-swf/dist/video-js.swf';
export default {
  name: 'videojs',
  components: {
    videoPlayer
  },
  props: {
    videoUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      videoSrc: '',
      playerOptions: {
        autoplay: true,
        muted: true, // 默认情况下将会消除任何音频
        loop: false, // 是否视频一结束就重新开始
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          currentTimeDisplay: false, // 当前时间
          volumeControl: false, // 声音控制键
          playToggle: false, // 暂停和播放键
          progressControl: false, // 进度条
          fullscreenToggle: true // 全屏按钮
        },
        techOrder: ['flash', 'html5'], // 兼容顺序
        flash: {
          hls: {
            withCredentials: false
          },
          swf: SWF_URL
        },
        html5: { hls: { withCredentials: false } },
        sources: [{
          // type: 'rtmp/flv',
          withCredentials: false,
          type: 'application/x-mpegURL',
          src: ''
        }],
        notSupportedMessage: '此视频暂无法播放，请稍后再试'
      }
    };
  },
  mounted() {
    this.videoSrc = this.videoUrl
    this.playerOptions.sources[0].src = this.videoUrl;
  },
  watch: {
    videoUrl: function(val) {
      console.log('videoUrl', val);
      this.videoSrc = val
      this.playerOptions.sources[0].src = val;
    }
  }
};
</script>
<style scoped lang="scss">
.video-js {
  width: 100%;
  height: 100%;
}
</style>