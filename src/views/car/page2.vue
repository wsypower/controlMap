<template>
  <div class="page">
    <div class="video-panel">
      <my-video-player ref="myPlayer"></my-video-player>
      <div class="footer-panel" flex="cross:center main:justify"  @click="fullScreenHandle">
        <span>视频编号：XO1425</span>
        <cg-icon-svg name="fullscreen" class="svg_icon_fullscreen"></cg-icon-svg>
      </div>
    </div>
    <a @click="playVideo">播放视频</a>
  </div>
</template>

<script>
import { storagePointData } from '@/api/account/login'
export default {
  name: 'page2',
    data(){
      return {}
    },

    methods: {
        playVideo() {
            this.$refs['myPlayer'].videoSrc = 'rtmp://192.168.10.3:1935/live/pag/192.168.10.2/7302/33092104001320012103/0/MAIN/TCP?checkinfo=ewogICAidGltZSIgOiAiMjAxOTA3MjBUMDkzNzE0WiIsCiAgICJ1cmwiIDogInJ0bXA6Ly8xOTIuMTY4LjEwLjM6MTkzNS9saXZlL3BhZy8xOTIuMTY4LjEwLjIvNzMwMi8zMzA5MjEwNDAwMTMyMDAxMjEwMy8wL01BSU4vVENQIgp9Cg%3D%3D&idinfo=EAAAAAAQAADh9flnMdrvl03BuMSu0R3r6u3NZ06p6V%2BogbhAGOojgXCnScym5Ls3Uf%2BOx6Ctcbc%3D'
            this.$refs['myPlayer'].playerOptions.sources[0].src = 'rtmp://192.168.10.3:1935/live/pag/192.168.10.2/7302/33092104001320012103/0/MAIN/TCP?checkinfo=ewogICAidGltZSIgOiAiMjAxOTA3MjBUMDkzNzE0WiIsCiAgICJ1cmwiIDogInJ0bXA6Ly8xOTIuMTY4LjEwLjM6MTkzNS9saXZlL3BhZy8xOTIuMTY4LjEwLjIvNzMwMi8zMzA5MjEwNDAwMTMyMDAxMjEwMy8wL01BSU4vVENQIgp9Cg%3D%3D&idinfo=EAAAAAAQAADh9flnMdrvl03BuMSu0R3r6u3NZ06p6V%2BogbhAGOojgXCnScym5Ls3Uf%2BOx6Ctcbc%3D'
        },
        fullScreenHandle(){
            console.log('123456789');
            this.$refs['myPlayer'].fullScreenHandle();
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  .video-panel{
    width: 276px;
    height: 176px;
    margin:20px 20px;
    padding: 8px;
    background: url('~@img/video-border.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .footer-panel{
      position: absolute;
      bottom: 8px;
      left: 8px;
      right: 8px;
      height: 30px;
      background-color: rgba(0,0,0,0.6);
      >span{
        font-family: PingFang-SC-Medium;
        font-size: 13px;
        color: #eaf1fa;
        padding-left: 10px;
      }
      .svg_icon_fullscreen{
        width: 14px;
        height: 14px;
        color: #eaf1fa;
        margin-right: 10px;
        cursor: pointer;
        &:hover{
          color: #ffffff;
        }
      }
    }
  }
}
</style>
