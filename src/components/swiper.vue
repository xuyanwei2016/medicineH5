<template>
  <!--轮播图-->
  <div class="swiper">
    <ul class="imgs"  ref='remove'>
      <li v-for="(item,index) in imgs" :key="index" :class="curImg==index?'curImg is-animating':''" :style="ani(index)"><!--   is-animating"-->

        <img :src="imgLink(item.picture)" alt=""  @touchstart='touchStart($event,index)' @touchmove='touchMove($event,index)'  @touchend='touchEnd'>
      </li>
    </ul>
    <ul class="index">
      <li v-for="(it,itx) in imgs" :class="curImg==itx?'active':''"></li>
    </ul>

  </div>
</template>

<script>
  import {getCarouselAPI} from '@/api/home.js';

    export default {
        name: 'HelloWorld',
        data() {
            return {
              imgs:[],
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
          this.getSwiper();
        },
      watch:{
        /*curImg(n,o){
          let self=this;
          self.ani(n);
        },*/
      },
        methods: {
          getSwiper(){
            getCarouselAPI().then(res=>{
              if(res.data.status){
                this.imgs=res.data.data.length>8?res.data.data.slice(0,8):res.data.data;
                this.curImg=0;
                this.time();
              }
            })
          },
          ani(index){
            if(this.curImg==0){
              if(index==0){
                return `transform:translateX(${this.curWidth(7)}px);`;
              }else if(index==this.imgs.length-1){
                return `transform:translateX(-${this.curWidth(345)+((index+1)*this.curWidth(7))+(index)*this.curWidth(316)-this.curWidth(8)}px);`;
              }else{
                return `transform:translateX(${this.curWidth(7)}px);`;
              }

            }else if(this.curImg==this.imgs.length-1){
              if(index==0){
                return `transform:translateX(${this.curWidth(361)}px);`;
              }else{
                return `transform:translateX(-${(this.curImg)*this.curWidth(323)-this.curWidth(8)}px);`;
              }
            }else{
              return `transform:translateX(-${(this.curImg)*this.curWidth(323)-this.curWidth(8)}px);`;
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
            },4000)
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
              console.log(222,this.disX,this.curWidth(345))
              if(this.disX>100){
                clearInterval(this.timer);
                this.curImg++
                if(this.curImg>=this.imgs.length){
                  this.curImg=0;
                }
                this.slideEffect = 'transform:translateX(' + '-'+this.curWidth(345)/2 + 'px);backgroundColor:#F6F6F6';
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
              } else if (this.curWidth(345)>=this.disX > 0) {
                if(num==this.curWidth(345)){return}
                this.slideEffect = 'transform:translateX(' + '-'+this.disX/2 + 'px)';
              }else{
                this.slideEffect = 'transform:translateX(' + '-'+this.curWidth(345)/2 + 'px)';
              }
            }


          },
          curWidth(num){
            var desW = 375,
              winW = document.documentElement.clientWidth, //动态获取设备的屏幕宽度
              ratio = winW / desW;
            return ratio * num;
          },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
          border-radius: .05rem;
          width: 3.16rem;
          height: 1.51rem;
          margin-left:.07rem;
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
</style>
