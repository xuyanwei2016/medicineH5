
<template>


  <div class="tetx">
    <!--<a href="javascript:share.weibo();">weibo</a>
    <a href="javascript:share.qzone();">qzone</a>
    <a @click="qq">tqq</a>
    <a href="javascript:share.renren();">renren</a>
    <a href="javascript:share.douban();">douban</a>
    <a href="javascript:share.facebook();">facebook</a>
    <a href="javascript:share.twitter();">twitter</a>
    <a href="javascript:share.linkedin();">linkedin</a>
    <a @click="weixin">weixin</a>-->

    <!--<el-carousel :interval="4000" arrow="never" type="card">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>-->
    <!--<Carousel  :interval="4000" arrow="never" type="card">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>

    </Carousel>-->
    <!--轮播图-->
    <div class="swiper">
      <ul class="imgs"  ref='remove'>
        <li v-for="(item,index) in imgs" :key="index" :class="curImg==index?'curImg is-animating':''" :style="ani(index)"><!--   is-animating"-->

          <img :src="item" alt=""  @touchstart='touchStart($event,index)' @touchmove='touchMove($event,index)'  @touchend='touchEnd'>
        </li>
      </ul>
      <ul class="index">
        <li v-for="(it,itx) in imgs" :class="curImg==itx?'active':''"></li>
      </ul>

    </div>

  </div>

</template>

<script>
/*  import Carousel from '../components/carousel/src/main.vue';*/
  import $ from 'jquery';
  /*var share = new SimpleShare({
    url: 'http://www.taobao.com/',
    title: '淘宝',
    content: '淘宝是个很不错的购物网站',
    pic: 'http://gtms01.alicdn.com/tps/i1/T1SwHiFnlkXXc.QAHh-202-55.png'
  });*/
  /*document.querySelector('.sharetotqq').addEventListener('click',function() {
    share.tqq();
  });*/
var desW = 375,
  winW = document.documentElement.clientWidth, //动态获取设备的屏幕宽度
  ratio = winW / desW;
let curWidth = ratio * 345;
  export default {
    name: "cameras-and-albums",
    data() {
      return {
        imgs:['../../static/img/img1.png','../../static/img/img2.png','../../static/img/img3.png','../../static/img/img4.png','../../static/img/img5.png','../../static/img/img6.png'],
        curImg:null,
        cueImgs:[],
        slideEffect:null,
        startX:0,
        endX:0,
        disX:0,
        timer:null,
        isShow:'',

      }
    },
    created() {
      this.curImg=5;
      this.time();
    },
    /*components:{Carousel},*/
    watch:{
      curImg(n,o){
        let self=this;
        self.ani(n);
      },
    },
    methods: {
      ani(index){
        if(this.curImg==0){
          if(index==0){
            return `transform:translateX(${7}px)  scale(1);`;
          }else if(index==this.imgs.length-1){
            return `transform:translateX(-${345+((index+1)*7)+(index)*316-8}px);`;
          }else{
            return `transform:translateX(${7}px);`;
          }

        }else if(this.curImg==this.imgs.length-1){
          if(index==0){
            return `transform:translateX(${361}px)  scale(1);`;
          }else{
            return `transform:translateX(-${(this.curImg)*323-8}px);`;
          }
        }else{
          return `transform:translateX(-${(this.curImg)*323-8}px);`;
        }
        /*self.isShow=`transform:translateX(-${index+7}px) scale(0.83);`;*/
      },

      time(){
        let self=this;

        this.timer=setInterval(()=>{
          self.curImg++
          if(self.curImg>=self.imgs.length){
            self.curImg=0;
            return
          }
        },3000)
      },

      touchStart:function(ev,id) {
        if(this.moveId!=id){
          this.slideEffect = 'transform:translateX(' + '-'+0 + 'px)';
        }
        this.moveId=id;
        ev = ev || event;
        /*ev.preventDefault();*/


        if(ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          this.startX = ev.touches[0].clientX; // 记录开始位置
        }
      },
      touchEnd:function(ev){
        ev = ev || event;
        /*ev.preventDefault();*/

        this.endX=ev.changedTouches[0].clientX;
        console.log('结束的',ev)
        let btnWidth = this.$refs.remove.offsetWidth;

        if(ev.changedTouches.length == 1) {
          let endX = ev.changedTouches[0].clientX;
          this.disX = this.startX-endX;
          console.log(222,this.disX,curWidth)
          if(this.disX>100){
            clearInterval(this.timer);
            this.curImg++
            if(this.curImg>=this.imgs.length){
              this.curImg=0;
            }
            this.slideEffect = 'transform:translateX(' + '-'+curWidth/2 + 'px);backgroundColor:#F6F6F6';
            this.time();
          }if(this.disX<-100){
            clearInterval(this.timer);

            if(this.curImg==0){
              this.curImg=this.imgs.length-1;
            }else{
              this.curImg--;
            }

            this.time();
          }

        }

      },
      touchMove:function(ev,id) {
        ev = ev || event;
        /*ev.preventDefault();*/
        let btnWidth = this.$refs.remove.offsetWidth;  //$refs 减少获取dom节点的消耗
        if (ev.touches.length == 1) {
          //滑动时距离浏览器左侧的距离
          this.moveX = ev.touches[0].clientX;
          let moveY= ev.touches[0].clientY;
          let x=Math.abs(this.startX - this.moveX),y=Math.abs(this.startY-moveY);
          if(y>x){return};
          //实时的滑动的距离-起始位置=实时移动的位置
          this.disX = this.startX-this.moveX;

          let num =this.slideEffect.match(/\d+/g)?this.slideEffect.match(/\d+/g)[0]:0;
          if (this.disX <= 0) {
            this.slideEffect = 'transform:translateX(' + 0 + 'px)';
          } else if (curWidth>=this.disX > 0) {
            if(num==curWidth){return}
            this.slideEffect = 'transform:translateX(' + '-'+this.disX/2 + 'px)';
          }else{
            this.slideEffect = 'transform:translateX(' + '-'+curWidth/2 + 'px)';
          }
        }


      },



      /*qq(){
        share.tqq();
      },
      weixin(){
        share.weixin();
      },*/

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .tetx{
    .swiper{
      width: 3.75rem;
      height: 1.65rem;
      overflow: hidden;
      position: relative;
      .imgs{
        height: 1.65rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        li{

          img{
            width: 3.16rem;
            height: 1.51rem;
            padding-left:.07rem;
          }
        }
        li:first-child{
          /*margin-left: -3.08rem;*/
          /*
          transform: translateX(3.08rem) scale(0.83);*/

        }
        .curImg{
          /*padding: 0 .07rem;*/
          transform: translateX(0px) ;

          img{
            width: 3.45rem;
            height: 1.65rem;
          }
        }
        .is-animating{
          transition: transform 0s ease-in;
        }
      }
      .index{
        width: 100%;
        height: .05rem;
        position: absolute;
        bottom: .1rem;
        display: flex;
        justify-content:center;
        align-items: center;
        li{
          width: .05rem;
          height: .05rem;
          margin: 0 .02rem;
          background: #fff;
          opacity: .7;
          border-radius: .025rem;
        }
        .active{
          opacity: 1;
          width: .1rem;
        }
      }

    }
  }

  /*.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__item  el-carousel__item--card is-in-stage{

  }
  .el-carousel__item--card.is-active{
    width: 3.45rem;
    height: 1.65rem;
    left: -.8rem;
  }
  .el-carousel__item--card {
    width: 10%;
    !*-webkit-transition: -webkit-transform .4s ease-in-out;
    transition: -webkit-transform .4s ease-in-out;
    transition: transform .4s ease-in-out;
    transition: transform .4s ease-in-out, -webkit-transform .4s ease-in-out;
    transition: transform .4s ease-in-out,-webkit-transform .4s ease-in-out;*!
  }
  .el-carousel__item{}*/

</style>


