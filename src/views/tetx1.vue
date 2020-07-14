<template>
  <!--<div class="Wheel">
    <div class="item">
      <img :src="imgs[curImg]" alt="">
    </div>
    <ul class="indexList">
      <li v-for="(item,index) in imgs.length" :class="curImg==index?'active':''" @click="curImg=index"></li>
    </ul>
  </div>-->
  <div>
    <!--<audio
      ref="player" src="../../static/金玟岐%20-%20岁月神偷%20(Demo).mp3">
    </audio>-->
    <audio
      ref="player" :src="src">
    </audio>


    <div class="audioCss">
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
        <img src="../assets/img/list/back15.png" alt="" class="small" @click="back">
        <img :src="play?'../../static/img/stop.png':'../../static/img/start.png'" alt="" class="big"
             @click="audioState">
        <img src="../assets/img/list/forward15.png" alt="" class="small" @click="forward">
      </div>
    </div>


  </div>

</template>

<script>
  import {getImgLinkAPI} from '@/api/list.js';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        /*imgs:['../../static/img/img1.png','../../static/img/img2.png','../../static/img/img3.png','../../static/img/img4.png'],
        curImg:0,*/
        isPlay: false,
        cTime: '00:00', // 已播放时间
        dTime: '00:00', // 总播放时间
        play: false,
        value1:null,
        src:null,
      }
    },
    created() {
      console.log(process.env.BASE_API)
      /*let self=this;
      setInterval(function(){
        if(self.curImg>=self.imgs.length-1){
          self.curImg=0;
          return
        }
        self.curImg++
      },4000)*/
      getImgLinkAPI('4c209d2e84ed438eaf59348463d80d97').then(res=>{
        this.src=process.env.BASE_API+res.data.data;
      })
    },
    watch: {},
    mounted() {
      const music = this.$refs.player  // 音频所在对象
      const musicBar = this.$refs.runbar  // 颜色进度条所在对象

      const musicWidth = this.$refs.runfatbar.offsetWidth // 底部进度条总宽

      // 获得音频加载完成可播放时的处理
      music.addEventListener('canplay', () => {
        const musicTime = music.duration // 获得音频时长
        const branch = Math.floor(musicTime / 60) // 计算音频分钟
        const second = Math.ceil(musicTime % 60) // 计算音频秒

        if (branch < 10 && second < 10) { // 四种情况判断音频总时间
          this.dTime = `0${branch}:0${second}`
        } else if (branch < 10) {
          this.dTime = `0${branch}:${second}`
        } else if (second < 10) {
          this.dTime = `${branch}:0${second}`
        } else {
          this.dTime = `${branch}:${second}`
        }
        console.log('canplay')
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
        console.log('timeupdate')
      })


// 监听颜色进度条是否触摸拖动
      musicBar.addEventListener('touchmove', (event) => {
        console.log('活动',event)
        const events = event.targetTouches[0].pageX // 获得触摸拖动的距离
        musicBar.style.width = `${(events / musicWidth) * 100}%` // 计算进度条所在比例宽度
        music.pause() // 触摸拖动时停止播放
        console.log('touchmove')
      })

      // 监听颜色进度条是否触摸拖动结束
      musicBar.addEventListener('touchend', () => {
        const touwidth = (musicBar.offsetWidth / musicWidth) // 计算进度条所在比例
        music.currentTime = music.duration * touwidth // 通过所在比例赋值给音频应在的播放时间
        music.play() // 根据播放时间开始播放
        this.play = true // 更改播放暂停按钮为播放
        console.log('touchend')
      })


       //这里顺便写的，适用于PC端。鼠标事件
       /*musicBar.addEventListener('drag', (e) => {
         const events = e.pageX
         musicBar.style.width = `${(events / musicWidth) * 100}%`
       })
       musicBar.addEventListener('dragend', (e) => {
         const events = e.pageX
         musicBar.style.width = `${(events / musicWidth) * 100}%`
         this.playMusic()
       })*/

    },
    methods: {

      //前进15秒
      forward(){
        console.log('前进15')
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
        music.currentTime = music.duration * touwidth // 通过所在比例赋值给音频应在的播放时间
        music.play() // 根据播放时间开始播放
        this.play = true // 更改播放暂停按钮为播放
      },
      //后退15秒
      back(){
        console.log('后退15秒')
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
        let self=this;
        const music = this.$refs.player // 音频所在对象
        const barWidth = e.pageX / this.$refs.runfatbar.offsetWidth // 计算点击位置相对父元素总宽的比例
        this.$refs.runbar.style.width = `${barWidth * 100}%` // 进度条应所在的比例总宽
        music.currentTime = music.duration * barWidth // 计算点击时应播放所在的时间
        //self.$set(this.$refs.player,'currentTime',music.duration * barWidth)
        //music.play() // 播放音频
        //this.play = true // 更改播放暂停按钮为播放
        console.log('点击进度条事件',this.$refs.player,barWidth,music.duration,music)
      },

      audioState() {
        console.log('暂停播放按钮')
        this.play = !this.play // 更改播放暂停按钮状态
        const music = this.$refs.player // 音频所在对象
        if (this.play) {
          music.play() // 播放音乐
        } else {
          music.pause() // 暂停音乐
        }
      },


    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  /*.Wheel{
    width: 100%;
    height: 2rem;
    position: relative;
    .item{
      width: 100%;
      height: 2rem;


      img{
        width: 100%;
        height: 2rem;
        animation: myfirst1 4s infinite;
        -moz-animation:myfirst1 4s infinite;	!* Firefox *!
        -webkit-animation: myfirst1 4s infinite;	!* Safari 和 Chrome *!
        -o-animation: myfirst1 4s infinite;

      }
    }
    .indexList{
      width: 100%;
      position: absolute;
      bottom: .1rem;
      display: flex;
      justify-content: center;
      li{
        width: .05rem;
        height: .05rem;
        background:rgba(255,255,255,.6);
        border-radius: .02rem;
        margin: 0 .04rem;
        float: left;
      }
      .active{
        animation: myfirst .5s forwards;
        -moz-animation: myfirst .5s forwards;	!* Firefox *!
        -webkit-animation: myfirst .5s forwards;	!* Safari 和 Chrome *!
        -o-animation: myfirst .5s forwards;

      }
    }
    @keyframes myfirst
    {
      to {transform: scaleX(2);background:rgba(255,255,255,1);}
    }

    @-moz-keyframes myfirst !* Firefox *!
    {
      to {transform: scaleX(2);background:rgba(255,255,255,1);}
    }

    @-webkit-keyframes myfirst !* Safari 和 Chrome *!
    {
      to {transform: scaleX(2);background:rgba(255,255,255,1);}
    }

    @-o-keyframes myfirst !* Opera *!
    {
      to {transform: scaleX(2);background:rgba(255,255,255,1);}
    }








    @keyframes myfirst1
    {
      0%{opacity: 0.8}
      10%{opacity: 1}
      100%{opacity: 1}
    }

    @-moz-keyframes myfirst1 !* Firefox *!
    {
      0%{opacity: 0.8}
      10%{opacity: 1}
      100%{opacity: 1}
    }

    @-webkit-keyframes myfirst1 !* Safari 和 Chrome *!
    {
      0%{opacity: 0.8}
      10%{opacity: 1}
      100%{opacity: 1}
    }

    @-o-keyframes myfirst1 !* Opera *!
    {
      0%{opacity: 0.8}
      10%{opacity: 1}
      100%{opacity: 1}
    }
  }*/

  /*音频*/
  .audioCss {
    height: 1rem;
    width: 100%;
    padding-bottom: 0.3rem;
    padding-top: 0.16rem;
    .line {
      margin: 0 auto;
      width: 3.35rem;
      height: 3px;
      background: #9B9B9B;
      position: relative;
      span {
        position: absolute;
        /*width: 30%;*/
        height: 3px;
        background: #1278bd;
        left: 0;
        top: 0;
      }
      .step {
        width: 0.05rem;
        height: 0.18rem;
        position: absolute;
        top: -0.07rem;
        background: #1278bd;
        border-radius: 0.03rem;
      }
    }
    .line:before {
      content: '';
      position: absolute;
      width: 0.08rem;
      height: 0.08rem;
      border-radius: 50%;
      background: #1278bd;
      top: -0.03rem;
      left: -0.08rem;
    }
    .line:after {
      content: '';
      position: absolute;
      width: 0.08rem;
      height: 0.08rem;
      border-radius: 50%;
      background: #9B9B9B;
      top: -0.03rem;
      right: -0.08rem;
    }
    .time {
      padding-top: .1rem;
      display: flex;
      justify-content: space-between;
      color: #424242;
      font-size: .1rem;
    }
    .buttons {
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
      }
    }
  }
  .bar {
    width: 100%;
    height: 3px;
    line-height:3px;

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
        top: -0.07rem;
        right:-.05rem;
        background: #1278bd;
        border-radius: 0.03rem;
      }
    }
  }

</style>
<!--<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <li v-for="i in count" class="list-item">{{ i }}</li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        count: 10,
        loading: false
      }
    },
    computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 2000)
      }
    }
  }
</script>
<style lang="less">
  .infinite-list-wrapper{
    height: 3rem;
  }
  .list{
    width: 100%;
    text-align: center;

    li{
      height: .8rem;
      line-height: .8rem;
      margin-bottom: .05rem;
      background: #ccc;
    }
  }
</style>
-->
