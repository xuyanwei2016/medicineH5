<template>
  <div class="read" id="read"
       :style="{height:((detail.readTextPower!=0&&!token)||(detail.readTextPower!=0&&token&&detail.isFree==0)||(detail.readTextPower==0&&!token&&detail.realPrice!=0))?winH+'px':'',overflow:((detail.readTextPower!=0&&!token)||(detail.readTextPower!=0&&token&&detail.isFree==0)||(detail.readTextPower==0&&!token&&detail.realPrice!=0))?'hidden':''}">
    <!--{{((detail.readTextPower!=0&&!token)||(detail.readTextPower!=0&&token&&detail.isFree==0)||(detail.readTextPower==0&&!token&&detail.realPrice!=0))}}-->
    <div class="readTit">
      <div class="back" @click="$router.go(-1)">
        <img src="../../assets/img/list/back.png" alt="">
      </div>
      <div class="set">
        <img src="../../assets/img/list/font.png" alt="" @click="isShowSize=!isShowSize,isShow=1">
        <img src="../../assets/img/list/share.png" alt="" @click="!isFixed&&(isShowSize=!isShowSize,isShow=2)">
      </div>

    </div>
    <div class="cont readCont" v-if="detail.title">
      <h1>{{detail.title}}<!--{{docmHeight}}{{showHeight}}--></h1>
      <h2><span v-if="detail.source">来源: {{detail.source}}</span><span v-if="detail.author" style="padding: 0">作者: {{detail.author}}</span></h2>
      <!--<img :src="imgLink(detail.img)" alt="" v-if="detail.img">-->
      <!--<div class="other">
        &lt;!&ndash;<div>
          <span v-if='detail.source'>来源: {{detail.source}}</span>
          <span v-if='detail.uploadTime'>{{timeFn(detail.uploadTime)}}</span>
        </div>&ndash;&gt;
        <div v-show="detail.isFree==0">
          <span v-if='detail.price'>￥<del>{{detail.price&&detail.price.toFixed(2)}}</del></span>
          <span v-if='detail.realPrice'>￥{{detail.realPrice&&detail.realPrice.toFixed(2)}}</span>
        </div>
        &lt;!&ndash; <span  v-if='detail.source'>来源: {{detail.source}}&nbsp;&nbsp;&nbsp;&nbsp;{{detail.updateTime}}</span>
        <span style="padding: 0">
          <i v-if='detail.price'>￥</i><del v-if='detail.price'>{{detail.price}}</del>
          <i>￥</i>{{detail.realPrice}}</span> &ndash;&gt;
      </div>-->
      <div
        v-if="!((detail.readTextPower!=0&&!token)||(detail.readTextPower!=0&&token&&detail.isFree==0))||!detail.text" :style="{paddingTop: src&&'.2rem'}">
        <audio :src="src" ref="player" id="audio" preload="load">
      </audio>


        <!--<audio :src="'http://192.168.2.231:2018/2020/03/20/79496399f9d7491693484660830f3e7a.mp3'" controls>
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
            <img :src="play?'./static/img/stop.png':'./static/img/start.png'" alt="" class="big yinyu" @click="audioState">
            <img src="../../assets/img/list/forward15.png" alt="" class="small" @click="forward">
          </div>

        </div>

        <!--<img :src="imgLink(detail.img)" alt="" v-if="detail.img&&detail.resourceType!=40" class="detailImg" @click="bigBtn(imgLink(detail.img))">-->

      </div>

      <div v-if="!((detail.readTextPower!=0&&!token)||(detail.readTextPower!=0&&token&&detail.isFree==0))||!detail.text"
           class="detailVideo" id="videoId">
        <div :class="isFixed?'videoPO':'video'" v-if="detail.video&&detail.video!='无权限'">
            <div id="mse"></div>
          <!--<video :src="`http://test16.zhongdianyun.com:2018/file/file/?fileName=${this.detail.video}&isOnLine=true`"
                 poster="../../../static/img/defCover.jpg"
                 controls="controls"
                 x5-playsinline=""
                 playsinline="true"
                 webkit-playsinline="true"
                 x-webkit-airplay="true"
                 x5-video-player-type="h5"
                 x5-video-player-fullscreen=""
                 x5-video-orientation="portraint" id="video" :style="{height: curVideoH+'px'}"></video>-->
        </div>
      </div>
      <div class="imgs" v-if="detail.imgs&&detail.imgs.length>0">
        <img :src="imgLink(itImg)" alt="" v-for="(itImg,inImg) in detail.imgs" :key="inImg">
      </div>
      <p v-html="detail.text" :style="{fontSize:fontSIZE[curSize].size}" v-if="!detail.pdf" @click="!isFixed&&getImg($event)"
         id="page"></p>


      <!--pdf-->
      <pdf
        v-for="i in numPages"
        :key="i"
        :page="i"
        :src="pdfUrl" style="width: 100%; height: auto; padding: .2rem 0;" v-if="detail.pdf">
      </pdf>

      <!--<div v-if="!((detail.readTextPower!=0&&!token)||(detail.readTextPower!=0&&token&&detail.isFree==0))||!detail.text"  class="detailVideo">
        &lt;!&ndash;<div style="position: relative; z-index: 1" v-if="detail.video&&detail.video!='无权限'">
          &lt;!&ndash;<video-player  class="vjs-custom-skin"
                         ref="videoPlayer"
                         :options="playerOptions"
                         :playsinline="true"
                         @play="onPlayerPlay($event)">
          </video-player>&ndash;&gt;
          <div id="video" style="z-index: 1"></div>
        </div>&ndash;&gt;


        <div class="video" v-if="detail.video&&detail.video!='无权限'">
          &lt;!&ndash;<i @click="playVideo"></i>
          <img src="../../../static/img/defCover.jpg" alt="" class="cover">&ndash;&gt;
          &lt;!&ndash;<video-player  class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                         :options="playerOptions"
          ></video-player>&ndash;&gt;

          &lt;!&ndash;<video  style="position: relative;  object-fit: fill;"   loop id="video1" x5-video-player-type="h5" x5-video-orientation="h5" x5-video-player-fullscreen="true" x-webkit-airplay="true" x5-playsinline="true" webkit-playsinline="true" playsinline="true"  src="video.mp4"></video>
          <canvas id="myCanvas" width="400" height="400"></canvas>
          //预览图
          <img src='./images/videoPreview.jpg' id='poster' style='display: none;' >
          //播放暂停按钮
          <div class='palyChange'></div>&ndash;&gt;


          &lt;!&ndash;<video
            :src="`http://192.168.2.231:2018/file/file/?fileName=${this.detail.video}&isOnLine=true`"
            id="video1"
            x5-video-player-type="h5"
          />
          <canvas id="myCanvas"></canvas>
          <img src='../../../static/img/defCover.jpg' id='poster'  @touchstart="gtouchstart()">
          <div class='palyChange' @click="palyChange"></div>&ndash;&gt;


        </div>
        &lt;!&ndash;<video :src="`http://192.168.2.231:2018/file/file/?fileName=${this.detail.video}&isOnLine=true`"  controls="controls"  autoplay="autoplay"></video>&ndash;&gt;
      </div>-->
    </div>

    <div class="foot" id="foot">
      <ul>
        <li @click="linkFn"><img :src="`./static/img/${comment}.png`" alt=""><span>({{commentTotal}})</span></li>
        <li @click="collectionFn"><img :src="`./static/img/${collection}.png`" alt=""></li>
      </ul>
    </div>

    <!--设置字体-->
    <div class="setFont" v-if="isShowSize" @click="isShowSize=false" style="z-index: 111">
      <div class="setFontSize" @click.stop="" v-if="isShow==1" style="bottom:0;padding-bottom: 10px;">
        <h1>字号大小</h1>
        <ul>
          <li :class="curSize==indexSize?'active':''" v-for="(itSize,indexSize) in fontSIZE" :key="indexSize"
              @click="setFontSize(indexSize)">{{itSize.name}}
          </li>
        </ul>
      </div>
      <div class="share" @click.stop="" v-if="isShow==2" style="bottom:0;padding-bottom: 10px;">
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

        <h1 @click="isShow=false,isShowSize=false">取消</h1>
      </div>
      <!--放大图片-->
      <div class="curImg" v-if="isShow==3">
        <img :src="curImg" alt="">
      </div>

      <!--视频-->
      <div class="curImg" v-if="isShow==4">
        <i class=" el-icon-close"></i>

        <!--<video  :src="`http://192.168.2.231:2018/file/file/?fileName=${this.detail.video}&isOnLine=true`" id="video"  controls="controls" preload="auto">
          &lt;!&ndash;<source :src="`http://192.168.2.231:2018/file/file/?fileName=${this.detail.video}&isOnLine=true`" type="video/ogg" />
          <source :src="`http://192.168.2.231:2018/file/file/?fileName=${this.detail.video}&isOnLine=true`" type="video/mp4" />
          Your browser does not support the video tag.&ndash;&gt;

        </video>-->
      </div>
    </div>

    <!--没有登录显示-->
    <div class="login" v-if="((detail.readTextPower!=0&&!token)||(detail.readTextPower!=0&&token&&detail.isFree==0)||(detail.readTextPower==0&&!token&&detail.realPrice!=0))"
         :style="{height:isHeight+'px',marginBottom:padHeight+'rem'}">
      <h1>试读结束</h1>
      <h2>{{!token?'登录后继续阅读全文':'请先购买方可阅读更多内容'}}</h2>
      <div class="button" @click="jurisdiction" id="buyBtn">{{!token?'登录阅读':detail.isFree==0?'立即购买':''}}</div>
    </div>


    <noHave v-if="(loading==2||loading==0)&&!detail.title" :mess="{top:winH,loading:loading}"
            style="margin-top: .64rem"></noHave>

  </div>
</template>

<script>
  import noHave from '../../components/noHave.vue';
  import {addCollectAPI, delCollectAPI} from '@/api/my.js';
  import {getArticleDetailAPI, getCommentListAPI} from '@/api/detail.js';
  import {getImgLinkAPI} from '@/api/list.js';
  import {baseUrl} from '@/utils/global.js';
  import 'xgplayer'
  import HlsJsPlayer from 'xgplayer-hls.js';

  import pdf from 'vue-pdf';
  import $ from 'jquery';

  let videoCurTime=null;
  export default {
    name: 'HelloWorld',
    data() {
      return {
        ttt: 111,
        comment: 'comment',
        collection: 'collection',
        fontSIZE: [{name: '小', size: '.12rem'}, {name: '中', size: '.16rem'}, {name: '大', size: '.18rem'}, {
          name: '超大',
          size: '.20rem'
        }],
        curSize: 1,
        padHeight: 0,
        isShowSize: false,
        isShow: null,
        isLogin: false,
        baseUrl: baseUrl,
        audioUrl: '',
        cTime: '00:00', // 已播放时间
        dTime: '00:00', // 总播放时间
        play: false,
        isCollection: false,
        commentTotal: 0,
        id: this.$route.query.id,
        detail: {title: null, audio: null, readTextPower: 0},
        src: null,
        loading: 0,
        winH: 0,
        isHeight: 0,
        music: null,
        curImg: '',
        pdfUrl: '',
        numPages: 0,
        musicTime: 0,
        isplay: false,
        timer: null,
        offsetH: 0,
        isFixed: false,
        currentTime: 0,//视频当前播放时间
        nextTime: 0,
        curVideoH: 0,
        playerOptions: {
          height: '215',
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
          notSupportedMessage: "此视频暂无法播放，请稍后再试",

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
        },
        height1:'',
        height2:'',
        docmHeight: 0,  //默认屏幕高度
        showHeight: 0,   //实时屏幕高度
        isA:false,
      }
    },
    components: {noHave, pdf},
    created() {
      this.isA=true;
      this.docmHeight=document.documentElement.clientHeight;
      this.showHeight=$(document.body).outerHeight(true);
     /* this.getDetail();*/
      let winW = document.documentElement.clientWidth;
      this.winH = document.documentElement.clientHeight - (winW * 44 / 375);
      this.offsetH = winW * 44 / 375;
      this.isHeight = document.documentElement.clientHeight - (winW * 310 / 375);
      this.curVideoH = winW * 215 / 375;

    },
    computed: {
      token() {  //通过方法访问
        return this.$store.state.token;
      },

    },
    mounted() {
      /*if (this.token) {
        increaseLearningNumAPI(this.$route.query.id).then(res => {
        })
      }*/
      window.addEventListener('scroll', this.handleScroll, true)
      /*window.onresize = ()=>{
        return(()=>{
          this.showHeight = document.documentElement.clientHeight;
        })()
      }*/

    },
    watch: {
      /*currentTime(n, o) {
        console.log(123456789,n)
      },*/
      isShowSize(n,o){
        if(n){
          if(!this.detail.video||this.detail.video=='无权限'){
            return
          }
          this.currentTime = document.querySelector('video').currentTime;
          let winW = document.documentElement.clientWidth;
          let curH = $('#videoId').offset().top;
          let videoH = winW * 215 / 375;
          console.log('滚动isShow',curH + videoH)
          if((curH + videoH) > (document.documentElement.clientHeight - winW * 170 / 375)&&this.currentTime>0){
            this.isFixed=true;
          }
          /*$('#video').offset().top=0;*/
        }else{
          this.isFixed=false;
        }

      },
      /*showHeight:function(n,o) {
        if(this.docmHeight - n>100){
          this.hideshow=false
        }else{
          this.hideshow=true
        }
      }*/

    },
    methods: {
      handleScroll(e) {
        let winW = document.documentElement.clientWidth;

        if(!this.detail.video||this.detail.video=='无权限'){
          return
        }
        if(!$('#videoId')||!document.querySelector('video')){return}
        let curH = $('#videoId').offset().top;
        let videoH = winW * 215 / 375;
        if(document.querySelector('video')){
          this.currentTime = document.querySelector('video').currentTime;
          if (this.currentTime == this.nextTime && this.currentTime == 0) {
            if ((curH + videoH) > (document.documentElement.clientHeight - winW * 50 / 375)) {
              this.curVideoH = videoH - ((curH + videoH) - (document.documentElement.clientHeight - winW * (this.isShowSize?170:50) / 375));
            }else{
              this.curVideoH = winW * 215 / 375;
            }
          } else {//会出现浮动
            if (curH <= 0) {
              this.isFixed = true;
            } else {
              if ((curH + videoH) > (document.documentElement.clientHeight - winW * 50 / 375)) {
                this.curVideoH = videoH - ((curH + videoH) - (document.documentElement.clientHeight - winW * (this.isShowSize?170:50) / 375));
              }else{
                this.curVideoH = winW * 215 / 375;
              }
              this.isFixed = false;
            }
          }
        }


        // 执行代码
        this.nextTime = document.querySelector('video').currentTime;
        /*console.log('监听滚动事件',document.querySelector('video').currentTime)*/
      },

      getDetail() {

        this.height1=window.screen.height;
        this.height2=window.screen.availHeight;

        let self = this;
        this.loading = 0;
        getArticleDetailAPI(this.id).then(res => {
          if (res.data.status) {
            this.detail = res.data.data;

            console.log(55555,this.detail)
            if (this.detail.pdf) {
              this.loadPdfHandler();
            }

            this.playerOptions.sources[0].src = `http://test16.zhongdianyun.com:2018/file/file/?fileName=${this.detail.video}&isOnLine=true`;
            this.playerOptions.poster = '../../../static/img/defCover.jpg';
            this.collection = this.detail.isCollection ? 'collectionB' : 'collection';
            /* this.currentTime = document.querySelector('video').currentTime;*/
            if (this.detail.audio && this.detail.audio != '无权限') {
              getImgLinkAPI(this.detail.audio).then(res => {
                //this.src='http://192.168.2.231:2018/'+res.data.data;
                this.src = `${process.env.BASE_API}` + res.data.data;
                /*http://test16.zhongdianyun.com:2018/2020/06/23/e95f0fbe6ba540fea003141e6bf3e5c7.mp3*/

                /*var audio = document.createElement("audio");
                audio.src = this.src;
                audio.loop = true;
                audio.addEventListener("canplaythrough",
                  function() {
                    $(".yinyu").show();
                    console.log('musice loaded!')
                    audio.play();
                  },
                  false);
                audio.load();*/



              })
            }
            if (this.detail.video && this.detail.video != '无权限') {
              this.$nextTick(() => {
                let winW = document.documentElement.clientWidth;
                let curH = $('#videoId').offset().top;
                let videoH = winW * 215 / 375;
                if ((curH + videoH) > (document.documentElement.clientHeight - winW * 50 / 375)) {
                  this.curVideoH = videoH - ((curH + videoH) - (document.documentElement.clientHeight - winW * (this.isShowSize ? 170 : 50) / 375));
                } else {
                  this.curVideoH = winW * 215 / 375;
                }
              })
            }
            if (this.detail.audio && this.detail.audio != '无权限') {
              this.$nextTick(() => {
                /*if(!self.detail.audio){return}*/
                const music = self.$refs.player  // 音频所在对象
                const musicBar = self.$refs.runbar  // 颜色进度条所在对象

                const musicWidth = self.$refs.runfatbar.offsetWidth // 底部进度条总宽

                // 获得音频加载完成可播放时的处理
                /*music.addEventListener('canplay', () => {
                  console.log(332233)


                })*/

                var audio = document.getElementById("audio");
                audio.loop = true;
                audio.load();

                const musicTime = this.detail.audioTimeLength / 1000; // 获得音频时长

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


                // 获得音频正在播放时的处理
                music.addEventListener('timeupdate', () => {
                  const musicTime = this.detail.audioTimeLength / 1000; // 获得音频时长
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
                  if (stopTime >= musicTime) {
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
                  music.currentTime = this.detail.audioTimeLength / 1000 * touwidth // 通过所在比例赋值给音频应在的播放时间
                  music.play() // 根据播放时间开始播放
                  this.play = true // 更改播放暂停按钮为播放
                })
              });
            }

            this.getVideoUrl();
            this.commentFn();
            this.loading = 2;
            if ((this.detail.readTextPower != 0 && !this.token) || (this.detail.readTextPower != 0 && this.token && this.detail.isFree == 0)) {
              this.$nextTick(() => {
                let winW = document.documentElement.clientWidth;
                let buyHeight = winW * 50 / 375, buybtn = $('#buyBtn').offset().top, foot = $('#foot').offset().top;

                if (buybtn + buyHeight >= foot) {
                  self.padHeight = 0.45;
                } else {
                  self.padHeight = 0;
                }
              })
            }


          } else {
            this.loading = 2;
          }
        })
      },

      async loadPdfHandler() {

        this.pdfUrl = pdf.createLoadingTask(this.imgLink(this.detail.pdf));
        this.pdfUrl.then(pdf => {
          this.numPages = pdf.numPages
        })
      },


      timeFn(item) {
        let ary = item.match(/\d+/g);
        return ary[0] + '-' + ary[1] + '-' + ary[2];
      },

      getVideo(data){
        console.log('视频路径',`${process.env.BASE_API}/${data}/index.m3u8`)
        return `${process.env.BASE_API}/${data}/index.m3u8`
      },


      /*获取视频路径*/
      getVideoUrl() {
        /*this.videoObject.video = 'http://vjs.zencdn.net/v/oceans.mp4';
      let player = new ckplayer(this.videoObject);*/

        if (this.detail.video && this.detail.video != '无权限') {
          getImgLinkAPI(this.detail.video).then(res => {
            console.log(223323232,res.data.data)
            /*this.videoObject.video = 'http://test16.zhongdianyun.com:2018/' + res.data.data;
            let player = new ckplayer(this.videoObject);*/
            let startIndex=res.data.data.indexOf('.mp4');

            let file=res.data.data.slice(0,startIndex);
            let player = new HlsJsPlayer({
              id: 'mse',
              url: this.getVideo(file),
              autoplay: false,
              playsinline: true,
              height: 'auto',
              width: '100%',
              poster: '../../static/img/defCover.jpg'
            });
          })
        }
      },

      /*分享*/
      shareFn(val) {
        let link = this.baseUrl + this.$route.fullPath;
        var share = new SimpleShare({
          url: link,
          title: this.detail.title,

        });

        if (val == 'QQ') {
          share.qzone();
        } else {
          share.weibo();
        }
      },
      /*視頻*/
      onPlayerPlay() {
        this.$refs.videoPlayer.player.pause();
      },
      /*收藏*/
      collectionFn() {

        if (!this.token) {
          this.$router.push('/loginPassword');
          return
        }
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
            this.detail.isCollection = !this.detail.isCollection;
            this.collection = (this.detail.isCollection ? 'collectionB' : 'collection');
            this.$valert.show(`${this.detail.isCollection ? '收藏成功' : '已取消收藏'}`);
          }
        })
      },

      /*评论*/
      commentFn() {

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
      forward() {
        this.$nextTick(() => {
          const music = this.$refs.player;
          const musicBar = this.$refs.runbar;
          const musicWidth = this.$refs.runfatbar.offsetWidth;
          const musicTime = music.duration // 获得音频时长
          const stopTime = music.currentTime + 15 // 获得已播放的音频时长
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
      back() {
        const music = this.$refs.player;
        const musicBar = this.$refs.runbar;
        const musicWidth = this.$refs.runfatbar.offsetWidth;
        const musicTime = music.duration // 获得音频时长
        if (music.currentTime < 15) {
          return
        }
        const stopTime = music.currentTime - 15 // 获得已播放的音频时长
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
      playMusic(e) {
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
        console.log(333333,this.play)
        if (this.play) {
          music.play() // 播放音乐
        } else {
          music.pause() // 暂停音乐
        }
      },

      linkFn() {
        this.$router.push({path: '/comment', query: {id: this.id, type: this.detail.resourceType||this.detail.type}});
        /*if (this.token) {
          this.$router.push({path: '/comment', query: {id: this.id, type: this.detail.resourceType||this.detail.type}});
        } else {
          this.$router.push('/loginPassword');
        }*/
      },
      jurisdiction() {
        if (!this.token) {
          this.$router.push('/loginPassword');
        } else {
          this.$valert.show('暂时未开发');
        }
      },

      /*放大图片*/
      bigBtn(link) {
        this.isShowSize = true;
        this.isShow = 3;
        this.curImg = link;
      },

      getImg($event) {
        if ($event.target.currentSrc) {
          this.bigBtn($event.target.currentSrc);
        }

        /* $('#page img').unbind('click').click(function () { // 需要解绑，否则会重复绑定事件
           // some...
         });*/
      },
      playVideo() {
        var video = document.getElementById('video1');
        var poster = document.getElementById('poster'); //用于视频初始化poster图片
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        canvas.width = 351;  //获取屏幕宽度作为canvas的宽度  这个设置的越大，画面越清晰（相当于绘制的图像大，然后被css缩小）
        /*canvas.height = window.innerHeight;*/
        context.drawImage(poster, 0, 0, canvas.width);//canvas上绘制postere图片 也可以点击播放后隐藏图片无需绘制

        this.isplay = false;//视频播放状态
        /*$('#myCanvas').on('touchstart',function(e){
          var e=e || event;
          e.preventDefault();
          if(!this.isplay){
            this.isplay=true;
            video.pause();
            $('.palyChange').show();
            clearInterval(this.timer)
          }else{
            video.play();
            $('.palyChange').hide();
            this.isplay=false;
            this.draw1()
          }

        })*/


      },
      gtouchstart(e) {
        var video = document.getElementById('video1');
        var e = e || event;
        e.preventDefault();

        if (!this.isplay) {
          this.isplay = true;
          video.pause();
          $('.palyChange').show();
          clearInterval(this.timer)
        } else {
          video.play();

          $('.palyChange').hide();
          this.isplay = false;
          this.draw1()
        }
      },
      draw1() {//绘制视频
        var video = document.getElementById('video1');
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        video.play();
        this.timer = setInterval(function () {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);//绘制视频
        }, 40);
      },
      palyChange() {//初始化暂停状态下 点击播放（开始绘制视频）
        var video = document.getElementById('video1');
        video.play();
        $('.palyChange').hide();
        this.isplay = false;
        this.draw1();
      },
      setFontSize(indexSize){
        this.curSize=indexSize;
        let reg=/font-size:.*?;/g;
        let index=indexSize==0?12:indexSize==1?16:indexSize==2?18:20;
        let winW = document.documentElement.clientWidth;
        let fontSize = winW * index / 375;
        this.detail.text=this.detail.text.replace(reg,`font-size:${fontSize}px;`);
      },
    },
    /*beforeRouteEnter(to, from, next) {
      if(from.name=='read'&&to.name=='comment'){
        console.log(1)
        from.meta.isBack = true;
      }else if(from.name=='read'&&to.name!='comment'){
        console.log(2)
        from.meta.isBack=false;
      }else if(to.name=='read'&&from.name=='comment'){
        console.log(3)
        to.meta.isBack = true;
      }else if(to.name=='read'&&from.name!='comment'){
        console.log(4)
        to.meta.isBack = false;
      }

      next()
    },*/
    activated(){
      if(!this.$route.meta.isBack || this.isA){
        this.curSize=1;
        this.comment='comment';
        this.collection='collection';
        this.padHeight=0;
        this.isShowSize=false;
        this.isLogin=false;
        this.isCollection=false;
        this.play=false;
        this.audioUrl='';
        this.cTime='00:00';
        this.dTime='00:00';
        this.detail={title: null, audio: null, readTextPower: 0};
        this.id=this.$route.query.id;
        this.getDetail();
      }
      this.$route.meta.isBack=false;
      this.isA=false;

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
      z-index: 99;
      top: 0;
      left: 0;
      background: url("../../assets/img/list/top-bg.png") no-repeat;
      background-size: cover;
      padding-top: 0.13rem;
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
      padding: .7rem 0 0.65rem 0;
      h1 {
        color: #333;
        font-size: 0.24rem;
        padding:0 .12rem 0.15rem;
        text-align: center;
      }

      h2{
        line-height: .2rem;
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

      .detailImg {
        display: block;
        max-width: 3.51rem;
        /*height: 2.04rem;*/
        margin: 0.2rem auto 0.18rem;
      }

      p {
        /*text-indent: 2em;*/
        line-height: 0.27rem;
        font-size: 0.16rem;
        color: #333333;
        padding: 0.16rem .12rem;

        img {
          width: 3.51rem;
        }
      }

      /*音频*/

      .audioCss {
        width: 3.35rem;
        padding: 0.16rem .20rem 0.15rem;
        border-bottom: .07rem solid #F5F5F5;
        height: 1.46rem;

        .bar:before {
          content: '';
          position: absolute;
          width: 0.06rem;
          height: 0.06rem;
          border-radius: 50%;
          background: #1278bd;
          top: -0.02rem;
          left: -0.01rem;
        }

        .bar:after {
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
          line-height: 3px;
          position: relative;

          .progressbar {
            width: 100%;
            height: 3px;
            background-color: #cac8ba;
            margin-top: .09rem;
            border-radius: 3px;
            position: relative;
          }

          .greenbar {
            width: 0%;
            height: 3px;
            border-radius: 3px;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #1296db;

            .yuan {
              display: inline-block;
              /*padding:.1rem .03rem;*/
              width: .05rem;
              height: .05rem;
              box-shadow: 0.01rem .01rem .06rem rgba(0, 0, 0, .4);
              position: absolute;
              top: -0.06rem;
              right: -.05rem;
              background: #1278bd;
              border-radius: 50%;
              z-index: 11;
              border: .04rem solid #fff;
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

        .buttons {
          width: 2.5rem;
          margin: 0 auto;
          padding-top: 0.27rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 0.62rem;

          .small {
            width: 0.26rem;
            height: 0.235rem;
          }

          .big {
            width: 0.62rem;
            height: 0.62rem;
            box-shadow: 0.01rem .01rem .06rem rgba(0, 0, 0, .4);
            border-radius: 50%;
          }
        }
      }

      /*视频*/

      .detailVideo {
        padding: 0 .12rem;
        width: 3.51rem;
        height: auto;

        .video {
          width: 3.51rem;
          height: 2.15rem;
          display: flex;
          justify-content: center;
          video {
            max-width: 3.51rem;
            height: 2.15rem;
          }
        }

        .videoPO {
          width: 3.75rem;
          height: 2.15rem;
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          video {
            max-width: 3.75rem;
            height: 2.15rem;
          }
        }

        #myCanvas {
          width: 3.51rem;
        }

        /*这里是将下面canvas绘制放大后的视频缩小为设备的大小*/

        #poster {
          width: 3.51rem;
          height: 2.15rem;
        }

        #video1 {
          display: none;
          position: absolute;
          z-index: 10;
          bottom: .55rem;
          left: 0
        }

        //隐藏video
        /*position: absolute;
        bottom: .55rem;
        left: 0;
        z-index: 0;*/
        /*.video{
          position: absolute;
          z-index: 0;
          width: 3.5rem;
          .cover{
            width: 3.5rem;
          }
        }*/
        /*.video:after{
          content: '';
          position: absolute;
          top:0;
          left:0;
          width: 3.5rem;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0));

          height: 2.15rem;
          overflow: auto;
          -webkit-box-sizing: content-box;
          box-sizing: content-box;
        }
        .video i:before{
          display: block;
          content: "\F101";
          position: absolute;
          top:calc(1.1rem - 0.35rem);
          left:calc(1.75rem - 0.55rem);
          z-index: 11;
          font-family: VideoJS;
          font-weight: normal;
          font-style: normal;
          font-size: 36px;
          color: rgba(255,255,255,.5);
          padding: 15px 35px;
          border: 2px solid rgba(255,255,255,.5);
          border-radius: 10px;
        }*/

        /*video{
          margin: 0 auto;
          width: 3.5rem;
        }*/
      }

      /*图片集*/
      .imgs{
        width: 3.45rem;
        margin: 0 auto;
        img{
          max-width: 3.45rem;
          display: flex;
          margin:.1rem auto 0;
        }

      }

    }

    .foot {
      position: fixed;
      z-index: 20;
      bottom: 0;
      left: 0;
      height: 0.5rem;
      width: 100%;
      background: #fff;
      box-shadow: 0.05rem 0.05rem 0.1rem 0.05rem rgba(0, 0, 0, 0.1);

      ul {
        padding: 0.12rem 0.8rem 0 0.8rem;
        display: flex;
        justify-content: space-between;

        li {
          display: flex;
          align-items: center;

          a {
            display: flex;
            align-items: center;
          }

          img {
            width: 0.24rem;
          }

          span {
            font-size: 0.13rem;
            color: #999999;
            padding-left: 0.05rem;
          }
        }
      }

    }

    .curImg {
      width: 3.75rem;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }

      video {
        background: #3C3F46;
        height: 2rem;
        max-width: 100%;
        max-height: 100%;
      }

    }


    .login {
      width: 100%;
      position: fixed;
      z-index: 12;
      background: #fff;
      bottom: 0;
      box-shadow: 0.1rem 0.05rem 0.3rem 0.6rem rgba(255, 255, 255, 1);
      text-align: center;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-content: center;

      h1 {
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

      .button {
        display: block;
        width: 2.6rem;
        height: 0.39rem;
        color: #fff;
        font-size: 0.16rem;
        background: #BA9F74;
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
