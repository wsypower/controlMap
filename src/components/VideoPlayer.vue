<template>
  <!-- <div class="video-js"> -->
  <!-- <div v-if="videoSrc === ''" class="no-video">
      暂未播放视频
    </div> -->
  <!-- <video-player v-else class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions">
    </video-player> -->
  <!-- <video class="video-js vjs-default-skin vjs-big-play-centered" ref="videoPlayer" controls autoplay preload="auto" data-setup="{}">
      <source ref="videoSource" src="" type="application/x-mpegURL" />
    </video> -->
  <!-- </div> -->
  <div :id="videoSrc" class="playWnd"></div>
</template>
<script>
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "vue-video-player/src/custom-theme.css";
// import { videoPlayer } from "vue-video-player";
// import "videojs-flash";
// import "videojs-contrib-hls";
// import SWF_URL from "videojs-swf/dist/video-js.swf";
// import 'videojs-contrib-hls/dist/videojs-contrib-hls.js'

// videojs.options.flash.swf = SWF_URL; // 设置flash路径，Video.js会在不支持html5的浏览中使用flash播放视频文件
let oWebControl;
export default {
  name: "videojs",
  components: {
    // videoPlayer
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
        live: true,
        autoplay: true, // 如果true，浏览器准备好时开始播放
        muted: false, // 默认情况下将会消除任何音频
        loop: false, // 是否视频一结束就重新开始
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
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
        // hls: true,
        // techOrder: ["flash"], // 兼容顺序
        // flash: {
        //   hls: {
        //     withCredentials: false
        //   },
        // swf: SWF_URL
        // },
        sources: [{
          type: "application/x-mpegURL",
          src: "" // 视频地址-改变它的值播放的视频会改变
        }],
        notSupportedMessage: "此视频暂无法播放，请稍后再试" // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      initCount: 0,
      pubKey: ''
    };
  },
  mounted() {
    this.videoSrc = this.videoUrl;
    // this.playerOptions.sources[0].src = this.videoUrl;
    this.$nextTick(() => {
      // this.$refs.videoSource.src = this.videoSrc;
      // videojs(this.$refs.videoPlayer, () => {
      //   this.play();
      // });
      this.initPlugin();
    });
  },
  watch: {
    videoUrl: function(val) {
      this.videoSrc = val;
      // this.playerOptions.sources[0].src = val;
    }
  },
  methods: {
    initPlugin() {
      const _this = this;
      oWebControl = new WebControl({
        szPluginContainer: _this.videoSrc, // 指定容器id
        iServicePortStart: 15900, // 指定起止端口号，建议使用该值
        iServicePortEnd: 15909,
        szClassId: "23BF3B0A-2C56-4D97-9C03-0CB103AA8F11", // 用于IE10使用ActiveX的clsid
        cbConnectSuccess: function() { // 创建WebControl实例成功                     
          oWebControl.JS_StartService("window", { // WebControl实例创建成功后需要启动服务
            dllPath: "./VideoPluginConnect.dll" // 值"./VideoPluginConnect.dll"写死 
          }).then(function() { // 启动插件服务成功
            oWebControl.JS_SetWindowControlCallback({ // 设置消息回调
              cbIntegrationCallBack: _this.cbIntegrationCallBack
            });

            oWebControl.JS_CreateWnd(_this.videoSrc, 250, 150).then(function() { //JS_CreateWnd创建视频播放窗口，宽高可设定
              _this.init(); // 创建播放实例成功后初始化
            });
          }, function() { // 启动插件服务失败
          });
        },
        cbConnectError: function() { // 创建WebControl实例失败
          oWebControl = null;
          console.log("插件未启动，正在尝试启动，请稍候...");
          WebControl.JS_WakeUp("VideoWebPlugin://"); // 程序未启动时执行error函数，采用wakeup来启动程序
          _this.initCount++;
          if (_this.initCount < 3) {
            setTimeout(function() {
              _this.initPlugin();
            }, 3000)
          } else {
            console.log("插件启动失败，请检查插件是否安装！");
          }
        },
        cbConnectClose: function(bNormalClose) {
          // 异常断开：bNormalClose = false
          // JS_Disconnect正常断开：bNormalClose = true  
          console.log("cbConnectClose");
          oWebControl = null;
        }
      });
    },
    // 设置窗口控制回调
    setCallbacks() {
      oWebControl.JS_SetWindowControlCallback({
        cbIntegrationCallBack: this.cbIntegrationCallBack
      });
    },
    // 推送消息
    cbIntegrationCallBack(oData) {
      showCBInfo(JSON.stringify(oData.responseMsg));
    },
    init() {
      const _this = this;
      this.getPubKey(function() {
        ////////////////////////////////// 请自行修改以下变量值 ////////////////////////////////////    
        var appkey = "21308996"; //综合安防管理平台提供的appkey，必填
        var secret = _this.setEncrypt("k75DrBJ8nvciN8aAjMsT"); //综合安防管理平台提供的secret，必填
        var ip = "2.133.171.14"; //综合安防管理平台IP地址，必填
        var playMode = 0; //初始播放模式：0-预览，1-回放
        var port = 443; //综合安防管理平台端口，若启用HTTPS协议，默认443
        var snapDir = "D:\\SnapDir"; //抓图存储路径
        var videoDir = "D:\\VideoDir"; //紧急录像或录像剪辑存储路径
        var layout = "1x1"; //playMode指定模式的布局
        var enableHTTPS = 1; //是否启用HTTPS协议与综合安防管理平台交互，这里总是填1
        var encryptedFields = 'secret'; //加密字段，默认加密领域为secret
        var showToolbar = 1; //是否显示工具栏，0-不显示，非0-显示
        var showSmart = 1; //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
        var buttonIDs = "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769"; //自定义工具条按钮
        ////////////////////////////////// 请自行修改以上变量值 ////////////////////////////////////

        oWebControl.JS_RequestInterface({
          funcName: "init",
          argument: JSON.stringify({
            appkey: appkey, //API网关提供的appkey
            secret: secret, //API网关提供的secret
            ip: ip, //API网关IP地址
            playMode: playMode, //播放模式（决定显示预览还是回放界面）
            port: port, //端口
            snapDir: snapDir, //抓图存储路径
            videoDir: videoDir, //紧急录像或录像剪辑存储路径
            layout: layout, //布局
            enableHTTPS: enableHTTPS, //是否启用HTTPS协议
            encryptedFields: encryptedFields, //加密字段
            showToolbar: showToolbar, //是否显示工具栏
            showSmart: showSmart, //是否显示智能信息
            buttonIDs: buttonIDs //自定义工具条按钮
          })
        }).then(function(oData) {
          oWebControl.JS_Resize(250, 150); // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
          _this.play();
        });
      });
    },
    //获取公钥
    getPubKey(callback) {
      const _this = this;
      oWebControl.JS_RequestInterface({
        funcName: "getRSAPubKey",
        argument: JSON.stringify({
          keyLength: 1024
        })
      }).then(function(oData) {
        console.log(oData);
        if (oData.responseMsg.data) {
          _this.pubKey = oData.responseMsg.data;
          callback()
        }
      })
    }, //RSA加密
    setEncrypt(value) {
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubKey);
      return encrypt.encrypt(value);
    },
    play() {
      var cameraIndexCode = this.videoSrc; //获取输入的监控点编号值，必填
      var streamMode = 0; //主子码流标识：0-主码流，1-子码流
      var transMode = 1; //传输协议：0-UDP，1-TCP
      var gpuMode = 0; //是否启用GPU硬解，0-不启用，1-启用
      var wndId = -1; //播放窗口序号（在2x2以上布局下可指定播放窗口）

      cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
      cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");

      oWebControl.JS_RequestInterface({
        funcName: "startPreview",
        argument: JSON.stringify({
          cameraIndexCode: cameraIndexCode, //监控点编号
          streamMode: streamMode, //主子码流标识
          transMode: transMode, //传输协议
          gpuMode: gpuMode, //是否开启GPU硬解
          wndId: wndId //可指定播放窗口
        })
      })
    },
    stop() {
      oWebControl.JS_RequestInterface({
        funcName: "stopAllPreview"
      });
    }
  },
  beforeDestroy() {
    if (oWebControl != null) {
      this.stop();
      oWebControl.JS_HideWnd(); // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题 
      oWebControl.JS_Disconnect().then(function() { // 断开与插件服务连接成功
        },
        function() { // 断开与插件服务连接失败
        });
    }
  }
};
</script>
<style scoped lang="scss">
.video-js {
  width: 100%;
  height: 100%;
}

.playWnd {
  margin-top: 10px;
  margin-left: 0px;
  width: 250px;
  height: 150px;
}
</style>