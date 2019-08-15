<template>
  <div class="video-js">
    <div v-if="videoSrc === ''" class="no-video" flex="main:center cross:center">
      暂未播放视频
    </div>
    <video-player
      v-else
      class="video-player vjs-custom-skin"
      ref="myVideoPlayer"
      :playsinline="true"
      :options="playerOptions"
    >
    </video-player>
  </div>
</template>

<script type="text/ecmascript-6">
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import {videoPlayer} from 'vue-video-player'
import 'videojs-flash'
import SWF_URL from 'videojs-swf/dist/video-js.swf'

videojs.options.flash.swf = SWF_URL // 设置flash路径，Video.js会在不支持html5的浏览中使用flash播放视频文件
export default {
    name: 'myVideoPlayer',
    components: {
        videoPlayer
    },
    data () {
        return {
            videoSrc: '',
            playerOptions: {
                live: true,
                autoplay: false, // 如果true，浏览器准备好时开始播放
                muted: false, // 默认情况下将会消除任何音频
                loop: false, // 是否视频一结束就重新开始
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                aspectRatio: '13:8', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
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
                techOrder: ['flash'], // 兼容顺序
                flash: {
                    hls: {
                        withCredentials: false
                    },
                    swf: SWF_URL
                },
                sources: [{
                    type: 'rtmp/flv',
                    src: '' // 视频地址-改变它的值播放的视频会改变
                }],
                notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
            }
        }
    },
    computed: {

    },
    methods: {

    }

}
</script>
<style lang="scss" scoped>
.video-js {
  width: 100%;
  height: 100%;
  .no-video {
    font-size: 14px;
    width: 100%;
    height: 100%;
  }
}
</style>
