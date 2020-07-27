// 视频播放器插件
<template>
  <div class="video">
    <video id="myvideo" class="video-js vjs-default-skin b vjs-big-play-centered" data-setup="{}">
      <!-- 3，HTTP协议直播源

香港卫视：http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8

CCTV1高清：http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8

CCTV3高清：http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8

CCTV5高清：http://ivi.bupt.edu.cn/hls/cctv5hd.m3u8

CCTV5+高清：http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8

      CCTV6高清：http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8-->
      <source :src="srcUrl" />
    </video>
  </div>
</template>
<script>
import Video from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-hls";
export default {
  props: {
    srcUrl: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      options: {
        techOrder: ["html5"],
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        loop: false, // 导致视频一结束就重新开始。
        autoplay: true, //是否自动播放
        bigPlayButton: true, //是否显示播放按钮
        controls: true, //是否用显示控制条
        textTrackDisplay: false,
        posterImage: false,
        fluid: true, //当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        //  poster: onCover, //你的封面地址
        // width: document.documentElement.clientWidth,
        errorDisplay: false,
        preload: "none",// 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        control: {
          captionsButton: false,
          chaptersButton: false,
          subtitlesButton: false,
          liveDisplay: true,
          playbackRateMenuButton: false
        },
        controlBar: { muteToggle: false, ProgressControl: false }
      },
      player: ""
    };
  },
  methods: {
    startVideo() {
      var isVideoBreak;
      var _this = this;
      //判断开始播放视频，移除高斯模糊等待层
      /*var isVideoPlaying = setInterval(function(){
                var currentTime = _this.player.currentTime();
                if(currentTime > 0){
                    $('.vjs-poster').remove();
                    clearInterval(isVideoPlaying);
                }
            },200)*/

      //判断视频是否卡住，卡主3s重新load视频
      var lastTime = -1,
        tryTimes = 0;

      clearInterval(isVideoBreak);
      isVideoBreak = setInterval(function() {
        var currentTime = _this.player.currentTime();
        if (currentTime == lastTime) {
          //此时视频已卡主3s
          //设置当前播放时间为超时时间，此时videojs会在play()后把currentTime设置为0
          _this.player.currentTime(currentTime + 10000);
          _this.player.play();

          //尝试5次播放后，如仍未播放成功提示刷新
          if (++tryTimes > 5) {
            //dialog('提示',"您的网速有点慢，刷新下试试",1);
            window.location.reload();
            tryTimes = 0;
          }
        } else {
          lastTime = currentTime;
          tryTimes = 0;
        }
      }, 3000);
    }
  },
  watch: {
    // 切换播放源
    srcUrl: {
      handler(val) {
        this.player.src({src: val});
      }
    }
  },
  mounted() {
    var _this = this;
    this.player = Video("myvideo", this.options, function() {
      console.log("videojs播放器初始化成功");
    });
    this.player.ready(()=>{
      console.log('----hasbeenReady')
      this.play()
      this.startVideo();
    })
  }
};
</script>
<style lang='stylus' scoped>
.video {
  width: 100%;

  &>>>.myvideo-dimensions {
    width: 100%;
  }

  .video-js { /* 给.video-js设置字体大小以统一各浏览器样式表现，因为video.js采用的是em单位 */
    font-size: 14px;
  }

  .video-js button {
    outline: none;
  }

  .video-js.vjs-fluid, .video-js.vjs-16-9, .video-js.vjs-4-3 {
    /* 视频占满容器高度 */
    height: 100%;
    background-color: #161616;
  }

  .vjs-poster {
    background-color: #161616;
  }

  .video-js .vjs-big-play-button { /* 中间大的播放按钮 */
    font-size: 2.7em;
    line-height: 1.5em;
    height: 1.5em;
    width: 1.5em;
    -webkit-border-radius: 2.2em;
    -moz-border-radius: 2.2em;
    border-radius: 2.2em;
    background-color: rgba(0, 0, 0, 0.3);
    border-width: 0;
    margin-top: -1em;
    margin-left: -0.9em;
  }

  .video-js.vjs-paused .vjs-big-play-button { /* 视频暂停时显示播放按钮 */
    display: block;
  }

  .video-js.vjs-error .vjs-big-play-button { /* 视频加载出错时隐藏播放按钮 */
    display: none;
  }

  .vjs-loading-spinner { /* 加载圆圈 */
    font-size: 2em;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    margin-top: -1em;
    margin-left: -1.5em;
  }

  .video-js .vjs-control-bar { /* 控制条默认显示 */
    display: flex;
  }

  .video-js .vjs-time-control {
    display: block;
  }

  .video-js .vjs-remaining-time {
    display: none;
  }

  .vjs-button > .vjs-icon-placeholder:before { /* 控制条所有图标，图标字体大小最好使用px单位，如果使用em，各浏览器表现可能会不大一样 */
    font-size: 22px;
    line-height: 1.9;
  }

  .video-js .vjs-playback-rate .vjs-playback-rate-value {
    line-height: 2.4;
    font-size: 18px;
  }

  /* 进度条背景色 */
  .video-js .vjs-play-progress {
    color: #dc0b21;
    /* background-color: #ffb845; */
  }

  /* dc0b21 */
  .video-js .vjs-progress-control .vjs-mouse-display {
    /* background-color: #ffb845; */
  }

  .vjs-mouse-display .vjs-time-tooltip {
    padding-bottom: 6px;
    background-color: #dc0b21;
  }

  .video-js .vjs-play-progress .vjs-time-tooltip {
    display: none !important;
  }

  /* 控制台背景色 */
  .video-js .vjs-control-bar {
    background-color: rgba(43, 51, 63, 0.5);
  }
}
</style>