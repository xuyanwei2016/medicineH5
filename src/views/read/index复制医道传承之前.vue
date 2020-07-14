<template>
  <div class="read" :style="{height:((detail.readTextPower!=0&&!token)||(detail.readTextPower!=0&&token&&detail.isFree==0))?winH+'px':'',overflow:((detail.readTextPower!=0&&!token)||(detail.readTextPower!=0&&token&&detail.isFree==0))?'hidden':''}">
    <div class="readTit">
      <div class="back" @click="$router.go(-1)">
        <img src="../../assets/img/list/back.png" alt="">
      </div>
      <div class="set">
        <img src="../../assets/img/list/font.png" alt="" @click="isShowSize=!isShowSize,isShow=1">
        <img src="../../assets/img/list/share.png" alt=""  @click="isShowSize=!isShowSize,isShow=2">
      </div>

    </div>
    <div class="cont readCont" v-if="detail.title" >
      <h1>{{detail.title}}</h1>
      <h2><span v-if="detail.source">来源: {{detail.source}}</span><span v-if="detail.author" style="padding: 0">作者: {{detail.author}}</span></h2>
      <div v-if="!((detail.readTextPower!=0&&!token)||(detail.readTextPower!=0&&token&&detail.isFree==0))||!detail.text">
        <img :src="imgLink(detail.img)" alt="" v-if="detail.img">

        <audio :src="src"  ref="player"></audio>
        <!--<audio :src="'http://192.168.2.231/2019/12/25/c1cdddbb87ac43c5bff7f6f247075926.mp3'" v-if="detail.audio&&detail.audio!='无权限'" ref="player" controls>
        </audio>-->

        <div class="audioCss" v-if="detail.audio&&detail.audio!='无权限'">
          <div class="bar">
            <div class="progressbar" @click="playMusic" ref="runfatbar">
              <div class="greenbar" ref="runbar">
                <span class="yuan" draggable="true"></span>
              </div>
            </div>
          </div>
          <div class="time">
            <span>{{cTime}}</span>
            <span>{{dTime}}</span>
          </div>
          <div class="buttons">
            <img src="../../assets/img/list/back15.png" alt="" class="small" @click="back">
            <img :src="play?'./static/img/stop.png':'./static/img/start.png'" alt="" class="big"
                 @click="audioState">
            <img src="../../assets/img/list/forward15.png" alt="" class="small" @click="forward">
          </div>

        </div>

        <!--<video :src="imgLink(detail.video)" controls v-if="detail.video&&detail.video!='无权限'"></video>-->
        <!--<video-player  class="video-player vjs-custom-skin"
                       x5-video-player-fullscreen="true"
                       x5-playsinline
                       playsinline
                       webkit-playsinline
                       preload="auto"
                       ref="videoPlayer"
                       :options="playerOptions"
                       @play = "onPlayerPlay($event)"
        ></video-player>-->
        <div style="position: relative; z-index: 1" v-if="detail.video&&detail.video!='无权限'">
          <!--<video-player  class="vjs-custom-skin"
                         ref="videoPlayer"
                         :options="playerOptions"
                         :playsinline="true"
                         @play="onPlayerPlay($event)">
          </video-player>-->
          <div id="video" style="z-index: 1"></div>
        </div>
      </div>


      <p v-html="detail.text" :style="{fontSize:fontSIZE[curSize].size}"></p>
    </div>

    <div class="foot" v-if="token">
      <ul>
        <li @click="linkFn"><img :src="`./static/img/${comment}.png`" alt=""><span>({{commentTotal}})</span></li>
        <li @click="collectionFn"><img :src="`./static/img/${collection}.png`" alt=""></li>
      </ul>
    </div>

    <!--设置字体-->
    <div class="setFont" v-if="isShowSize" @click="isShowSize=false">
      <div class="setFontSize" @click.stop="" v-if="isShow==1">
        <h1>字号大小</h1>
        <ul>
          <li :class="curSize==indexSize?'active':''" v-for="(itSize,indexSize) in fontSIZE" :key="indexSize" @click="curSize=indexSize">{{itSize.name}}</li>
        </ul>
      </div>
      <div class="share" @click.stop="" v-if="isShow==2">
        <ul>
          <!--<li>
            <img src="../../assets/img/list/wx.png" alt="">
            <span>微信好友</span>
          </li>
          <li>
            <img src="../../assets/img/list/pyq.png" alt="">
            <span>朋友圈</span>
          </li>-->
          <li @click="shareFn('QQ')">
            <img src="../../assets/img/list/qq.png" alt="">
            <span>QQ空间</span>
          </li>
          <li @click="shareFn('weibo')">
            <img src="../../assets/img/list/wb.png" alt="">
            <span>微博</span>
          </li>
        </ul>

        <h1>取消</h1>
      </div>

    </div>

    <!--没有登录显示-->
    <div class="login" v-if="(detail.readTextPower!=0&&!token)||(detail.readTextPower!=0&&token&&detail.isFree==0)" :style="{height:isHeight+'px'}">
      <h1>试读结束</h1>
      <h2>{{!token?'登录后继续阅读全文':'请先购买方可阅读更多内容'}}</h2>
      <div class="button" @click="jurisdiction">{{!token?'登录阅读':detail.isFree==0?'立即购买':''}}</div>
    </div>
    <noHave v-if="(loading==2||loading==0)&&!detail.title" :mess="{top:winH,loading:loading}" style="margin-top: .64rem"></noHave>

  </div>
</template>

<script>
  import noHave from '../../components/noHave.vue';
  import {addCollectAPI,delCollectAPI} from '@/api/my.js';
  import {getArticleDetailAPI,getCommentListAPI} from '@/api/detail.js';
  import {getImgLinkAPI} from '@/api/list.js';
  import { baseUrl } from '@/utils/global.js';
/*  var vConsole = new VConsole();*/


  export default {
    name: 'HelloWorld',
    data() {
      return {
        comment:'comment',
        collection:'collection',
        fontSIZE:[{name:'小',size:'.12rem'},{name:'中',size:'.16rem'},{name:'大',size:'.18rem'},{name:'超大',size:'.20rem'}],
        curSize:1,
        isShowSize:false,
        isShow:null,
        isLogin:false,
        baseUrl:baseUrl,
        audioUrl:'',
        cTime: '00:00', // 已播放时间
        dTime: '00:00', // 总播放时间
        play: false,
        isCollection:false,
        commentTotal:0,
        id: this.$route.query.id,
        detail:{title:null,audio:null,readTextPower:0},
        src:null,
        loading: 0,
        winH:0,
        isHeight:0,
        music:null,
        playerOptions: {
          height: '360',
          autoplay: false,
          muted: false,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            // mp4
            src: "",
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "",//封面
        },
        videoObject: {
          width: '100%', // 宽度，也可以支持百分比(不过父元素宽度要有)
          /*height: 574, */// 高度，也可以支持百分比
          container: "#video", //“#”代表容器的ID，“.”或“”代表容器的class
          variable: "player", //该属性必需设置，值等于下面的new chplayer()的对象
          autoplay: false, //自动播放
          live: false,
          video: "", //视频地址(必填)
          poster: '', //封面图片

        }
      }
    },
    components: {noHave},
    created() {
      let winW=document.documentElement.clientWidth;
      this.winH=document.documentElement.clientHeight-(winW*64/375);
      this.isHeight=document.documentElement.clientHeight-(winW*310/375);
      this.getDetail();

    },
    computed: {
      token() {  //通过方法访问
        return this.$store.state.token;
      },
        player() {
          return this.$refs.videoPlayer.player
        }

    },
    mounted(){
      /*setTimeout(() => {
        console.log('dynamic change options', this.player)
        // change src
        // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
        // change item
        // this.$set(this.playerOptions.sources, 0, {
        //   type: "video/mp4",
        //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
        // })
        // change array
        // this.playerOptions.sources = [{
        //   type: "video/mp4",
        //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
        // }]
        this.player.muted(false)
      }, 5000)*/
    },
    watch: {
      curSize(n,o){

      },
    },
    methods: {



      getDetail(){
        let  self=this;
        this.loading=0;
        getArticleDetailAPI(this.id).then(res=>{
          if(res.data.status){
            this.detail=res.data.data;
            /*this.playerOptions.sources[0].src ='http://192.168.2.231/file/file/?fileName=b6a1bf7f5b70404db788d61e8161a343&isOnLine=true'+ '/index.m3u8';*/
            this.collection=this.detail.isCollection?'collectionB':'collection';
            if(this.detail.audio&&this.detail.audio!='无权限'){
              getImgLinkAPI(this.detail.audio).then(res=>{
                this.src=process.env.BASE_API+res.data.data;
              })
            }

            this.$nextTick(()=>{
              if(!self.detail.audio){return}
              const music = self.$refs.player  // 音频所在对象
              const musicBar = self.$refs.runbar  // 颜色进度条所在对象

              const musicWidth = self.$refs.runfatbar.offsetWidth // 底部进度条总宽

              // 获得音频加载完成可播放时的处理
              music.addEventListener('canplay', () => {
                const musicTime = music.duration // 获得音频时长
                console.log('时间',music.duration)
                const branch = Math.floor(musicTime / 60) // 计算音频分钟
                const second = Math.round(musicTime % 60) // 计算音频秒
                if (branch < 10 && second < 10) { // 四种情况判断音频总时间
                  this.dTime = `0${branch}:0${second}`
                } else if (branch < 10) {
                  this.dTime = `0${branch}:${second}`
                } else if (second < 10) {
                  this.dTime = `${branch}:0${second}`
                } else {
                  this.dTime = `${branch}:${second}`
                }

              })

              // 获得音频正在播放时的处理
              music.addEventListener('timeupdate', () => {
                const musicTime = music.duration // 获得音频时长
                const stopTime = music.currentTime // 获得已播放的音频时长
                musicBar.style.width = `${(stopTime / musicTime) * 100}%` // 计算进度条所在比例宽度
                const branch = Math.floor(stopTime / 60) // 计算已播放的音频分钟
                const second = Math.floor(stopTime % 60) // 计算已播放的音频秒
                if (branch < 10 && second < 10) { // 四种情况判断显示音频以播放时间
                  this.cTime = `0${branch}:0${second}`
                } else if (branch < 10) {
                  this.cTime = `0${branch}:${second}`
                } else if (second < 10) {
                  this.cTime = `${branch}:0${second}`
                } else {
                  this.cTime = `${branch}:${second}`
                }
                if(stopTime>=musicTime){
                  music.pause();
                  this.play = false;
                }
              })


// 监听颜色进度条是否触摸拖动
              musicBar.addEventListener('touchmove', (event) => {
                const events = event.targetTouches[0].pageX // 获得触摸拖动的距离
                musicBar.style.width = `${(events / musicWidth) * 100}%` // 计算进度条所在比例宽度
                music.pause() // 触摸拖动时停止播放
              })

              // 监听颜色进度条是否触摸拖动结束
              musicBar.addEventListener('touchend', () => {
                const touwidth = (musicBar.offsetWidth / musicWidth) // 计算进度条所在比例
                music.currentTime = music.duration * touwidth // 通过所在比例赋值给音频应在的播放时间
                music.play() // 根据播放时间开始播放
                this.play = true // 更改播放暂停按钮为播放
              })
            });
            this.getVideoUrl();
            this.commentFn();
            this.loading=2;
          }
        })
      },

      /*获取视频路径*/
      getVideoUrl(){
        /*this.videoObject.video = 'http://vjs.zencdn.net/v/oceans.mp4';
      let player = new ckplayer(this.videoObject);*/
        if(this.detail.video&&this.detail.video!='无权限') {
          getImgLinkAPI(this.detail.video).then(res => {
            this.videoObject.video = process.env.BASE_API + res.data.data;
            this.playerOptions.sources[0].src = process.env.BASE_API + res.data.data;
            let player = new ckplayer(this.videoObject);
          })
        }
      },

      /*分享*/
      shareFn(val){
        let link=this.baseUrl+this.$route.fullPath;
        var share = new SimpleShare({
          url: link,
          title:this.detail.title,
          /*content: '淘宝是个很不错的购物网站',
          pic: 'http://gtms01.alicdn.com/tps/i1/T1SwHiFnlkXXc.QAHh-202-55.png'*/
        });
/*


        let link='http://192.168.2.8:8080/'+this.$route.fullPath;
        console.log(111111,`${'http://192.168.2.8:8080/#'+this.$route.fullPath}`)*/
        if(val=='QQ'){
          share.qzone();
        }else{
          share.weibo();
        }
      },
      /*視頻*/
      onPlayerPlay() {
        /*this.$refs.videoPlayer.player.pause();*/
      },
      /*收藏*/
      collectionFn(){

        if(!this.token){
          this.$router.push('/loginPassword');
          return}
        let API=this.detail.isCollection?delCollectAPI:addCollectAPI;
        API({
            "goodsList": [
              {
                "id": this.id,
                "type": "2-2"
              }
            ]
          }
        ).then(res => {
          if (res.data.status) {
            this.detail.isCollection=!this.detail.isCollection;
            this.collection=(this.detail.isCollection?'collectionB':'collection');
            this.$valert.show(`${this.detail.isCollection?'已收藏':'已取消收藏'}`);
          }
        })
      },

      /*评论*/
      commentFn(){
        getCommentListAPI({
          resourceClass: this.detail.resourceType,
          resourceId: this.$route.query.id,
          pageNum:1,
          pageSize:10,
        }).then(res=>{
          if(res.data.status){
            this.commentTotal=res.data.data.total;
          }

        })

      },


      //前进15秒
      forward(){
        this.$nextTick(()=>{
          const music = this.$refs.player;
          const musicBar = this.$refs.runbar;
          const musicWidth = this.$refs.runfatbar.offsetWidth;
          const musicTime = music.duration // 获得音频时长
          const stopTime = music.currentTime+15 // 获得已播放的音频时长
          musicBar.style.width = `${(stopTime / musicTime) * 100}%` // 计算进度条所在比例宽度
          const branch = Math.floor(stopTime / 60) // 计算已播放的音频分钟
          const second = Math.floor(stopTime % 60) // 计算已播放的音频秒
          if (branch < 10 && second < 10) { // 四种情况判断显示音频以播放时间
            this.cTime = `0${branch}:0${second}`
          } else if (branch < 10) {
            this.cTime = `0${branch}:${second}`
          } else if (second < 10) {
            this.cTime = `${branch}:0${second}`
          } else {
            this.cTime = `${branch}:${second}`
          }

          const touwidth = (musicBar.offsetWidth / musicWidth) // 计算进度条所在比例

          music.currentTime = stopTime // 通过所在比例赋值给音频应在的播放时间
          music.play() // 根据播放时间开始播放
          this.play = true // 更改播放暂停按钮为播放
        })
      },
      //后退15秒
      back(){
        const music = this.$refs.player;
        const musicBar = this.$refs.runbar;
        const musicWidth = this.$refs.runfatbar.offsetWidth;
        const musicTime = music.duration // 获得音频时长
        if(music.currentTime<15){return}
        const stopTime = music.currentTime-15 // 获得已播放的音频时长
        musicBar.style.width = `${(stopTime / musicTime) * 100}%` // 计算进度条所在比例宽度
        const branch = Math.floor(stopTime / 60) // 计算已播放的音频分钟
        const second = Math.floor(stopTime % 60) // 计算已播放的音频秒
        if (branch < 10 && second < 10) { // 四种情况判断显示音频以播放时间
          this.cTime = `0${branch}:0${second}`
        } else if (branch < 10) {
          this.cTime = `0${branch}:${second}`
        } else if (second < 10) {
          this.cTime = `${branch}:0${second}`
        } else {
          this.cTime = `${branch}:${second}`
        }
        const touwidth = (musicBar.offsetWidth / musicWidth) // 计算进度条所在比例
        music.currentTime = music.duration * touwidth // 通过所在比例赋值给音频应在的播放时间
        music.play() // 根据播放时间开始播放
        this.play = true // 更改播放暂停按钮为播放

      },


      // 点击进度条事件
      playMusic (e) {
        const music = this.$refs.player // 音频所在对象
        const barWidth = e.pageX / this.$refs.runfatbar.offsetWidth // 计算点击位置相对父元素总宽的比例
        this.$refs.runbar.style.width = `${barWidth * 100}%` // 进度条应所在的比例总宽
        music.currentTime = music.duration * barWidth // 计算点击时应播放所在的时间
        music.play() // 播放音频
        this.play = true // 更改播放暂停按钮为播放
      },

      audioState() {
        this.play = !this.play // 更改播放暂停按钮状态
        const music = this.$refs.player // 音频所在对象
        if (this.play) {
          music.play() // 播放音乐
        } else {
          music.pause() // 暂停音乐
        }
      },

      linkFn(){
        if(this.token){
          this.$router.push({path:'/comment',query:{id:this.id,type:this.detail.resourceType}});
        }else{
          this.$router.push('/loginPassword');
        }
      },
      jurisdiction(){
        if(!this.token){
          this.$router.push('/loginPassword');
        }else{
          this.$valert.show('暂时未开发');
        }
      },

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .read {
    background: #F7F7F7;
    min-height: 100%;
    .readTit {
      width: 3.75rem;
      position: fixed;
      z-index: 99999;
      top: 0;
      left: 0;
      background: url("../../assets/img/list/top-bg.png") no-repeat;
      padding-top: 0.33rem;
      height: 0.31rem;
      display: flex;
      justify-content: space-between;
      .back {
        width: 0.1rem;
        height: 0.18rem;
        padding-left: 0.12rem;
        img {
          width: 0.1rem;
          height: 0.18rem;
        }
      }
      .set {
        padding-right: 0.02rem;
        display: flex;
        img {
          margin-right: 0.18rem;
          display: block;
        }
        img:first-child {
          width: 0.24rem;
          height: 0.19rem;
        }
        img:nth-child(2) {
          width: 0.19rem;
          height: 0.19rem;
        }
      }
    }

    .cont {

      padding: 1rem 0.12rem 0.55rem 0.12rem;
      h1 {
        color: #333;
        font-size: 0.24rem;
        padding-bottom: 0.15rem;
        text-align: center;
      }
      h2{
        text-align: center;
        font-size: 0.12rem;
        color: #9B9B9B;
        font-weight: normal;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        span{
          display: inline-block;
          padding-right: 0.1rem;
        }
      }
      img{
        display: inline-block;
        text-align: center;
        max-width: 3.51rem;
        /*height: 2.04rem;*/
        margin: 0.2rem 0 0.18rem 0;
      }
      p{
        text-indent: 2em;
        line-height: 0.27rem;
        font-size: 0.16rem;
        color: #333333;
        padding-bottom: 0.16rem;
        padding-top: 0.16rem;
        img{
          width: 3.51rem;
        }
      }

      /*音频*/
      .audioCss{
        width: 3.45rem;
        padding-bottom: 0.15rem;
        padding-top: 0.16rem;
        height: 1.46rem;
        .bar:before{
          content: '';
          position: absolute;
          width: 0.06rem;
          height: 0.06rem;
          border-radius: 50%;
          background: #1278bd;
          top: -0.02rem;
          left: -0.01rem;
        }
        .bar:after{
          content: '';
          position: absolute;
          width: 0.06rem;
          height: 0.06rem;
          border-radius: 50%;
          background: #cac8ba;
          top: -0.02rem;
          right: -0.05rem;
        }
        .bar {
          width: 100%;
          height: 3px;
          line-height:3px;
          position: relative;
          .progressbar {
            width: 100%;
            height:3px;
            background-color: #cac8ba;
            margin-top:.1rem;
            border-radius:3px;
            position: relative;
          }

          .greenbar {
            width: 0%;
            height:3px;
            border-radius:3px;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #1296db;

            .yuan {
              display: inline-block;
              padding:.1rem .03rem;
              position: absolute;
              top: -0.08rem;
              right:-.05rem;
              background: #1278bd;
              border-radius: 0.03rem;
              z-index: 11;
            }
          }
        }
        .time {
          padding-top: .1rem;
          display: flex;
          justify-content: space-between;
          color: #424242;
          font-size: .1rem;
        }
        .buttons{
          padding-top: 0.27rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 0.62rem;
          .small{
            width: 0.26rem;
            height: 0.235rem;
          }
          .big{
            width: 0.62rem;
            height: 0.62rem;
          }
        }
      }

      /*视频*/
      video{
        margin: 0 auto;
        width: 3.5rem;
      }
    }
    .foot{
      position: fixed;
      z-index: 20;
      bottom: 0;
      left: 0;
      height: 0.5rem;
      width: 100%;
      background: #fff;
      box-shadow: 0.05rem 0.05rem 0.1rem 0.05rem rgba(0,0,0,0.1);
      ul{
        padding: 0.12rem 0.8rem 0 0.8rem;
        display: flex;
        justify-content: space-between;
        li{
          display: flex;
          align-items: center;
          a{
            display: flex;
            align-items: center;
          }
          img{
            width: 0.24rem;
          }
          span{
            font-size: 0.13rem;
            color: #999999;
            padding-left: 0.05rem;
          }
        }
      }

    }



    .login{
      width: 100%;
      position: fixed;
      z-index: 12;
      background:#fff;
      bottom: 0;
      box-shadow: 0.1rem 0.05rem 0.3rem 0.6rem rgba(255,255,255,1);
      text-align: center;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-content: center;
      h1{
        font-size: 0.2rem;
        color: #212020;
        padding-bottom: 0.16rem;
        padding-top: 0.1rem;
      }
      h2 {
        font-size: 0.13rem;
        color: #696969;
        font-weight: normal;
        padding-bottom: 0.3rem;
      }
      .button{
        display: block;
        width: 2.6rem;
        height:0.39rem;
        color: #fff;
        font-size: 0.16rem;
        background: #F97754;
        border-radius: 0.04rem;
        margin: 0 auto .1rem;
        line-height: 0.39rem;
      }
    }

  }
  /*.video-player {
    position:absolute;
    width:100%;
    height: 100%
  }
  .vjs-big-play-button {
    background-color:none !important;
    border:none !important;
  }
  .vjs-custom-skin .video-js .vjs-big-play-button {
    background:raba(0,0,0,.8);
    border-radius:50%;
    width:1.5rem;
    height:1.5rem !important;
    margin:0 auto;
  }
  .vjs-poster {
    background-size:100% 100%;
  }
  .vjs-custom-skin > .video-js .vjs-big-play-button {
    margin-left: -1em;
  }*/
</style>
