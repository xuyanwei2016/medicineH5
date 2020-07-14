<template>
<div style="width: 100%">
  <!--<div class="item">
    <div class="player">
      <video-player  class="vjs-custom-skin"
                     ref="videoPlayer"
                     :options="playerOptions"
                     :playsinline="true"
                     @play="onPlayerPlay($event)">
      </video-player>
    </div>
  </div>-->
  <div id="video"></div>
</div>

</template>

<script>
  // custom skin css
 /* import '../src/custom-theme.css'*/

  export default {
    data() {
      return {
        // videojs options
        playerOptions: {
          height: '360',
          autoplay: false,
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            // mp4
            src: "http://vjs.zencdn.net/v/oceans.mp4",
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
        },
        videoObject: {
          width: '100%', // 宽度，也可以支持百分比(不过父元素宽度要有)
          /*height: 574, */// 高度，也可以支持百分比
          container: "#video", //“#”代表容器的ID，“.”或“”代表容器的class
          variable: "player", //该属性必需设置，值等于下面的new chplayer()的对象
          autoplay: false, //自动播放
          live: true,
          video: "", //视频地址(必填)
          poster: '', //封面图片

        }
      }
    },
    mounted() {
      // console.log('this is current player instance object', this.player)
      this.videoObject.video = 'http://vjs.zencdn.net/v/oceans.mp4';
      let player = new ckplayer(this.videoObject);

    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },

    }
  }
</script>
