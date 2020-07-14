<template>
  <!--首页-->
  <div id="home">
    <div class="search">
      <div class="searchLeft">
        <router-link to="/search">
          <input type="text" readonly placeholder="请输入关键词">
        </router-link>

      </div>
      <div class="searchRight" @click="messFn">
        <p :style="{background:token&&token!='null'&&messageTotal!=0?'#F23030':'none'}"><span>{{(token&&token!='null')&&messageTotal!=0?messageTotal:''}}</span></p>
      </div>
    </div>

    <div class="banner">
      <swiper></swiper>
      <!--<div class="Wheel">
        <div class="item" @click="urlFn">
          <img :src="imgLink(imgs[curImg].picture)" alt="" v-if="imgs"  @touchstart='touchStart($event)' @touchmove='touchMove($event)'  @touchend='touchEnd'>
        </div>
        <ul class="indexList" v-if="imgs">
          <li v-for="(item,index) in imgs.length" :class="curImg==index?'active':''" @click="curImg=index"></li>
        </ul>
      </div>-->
    </div>

    <div class="special">
      <ul>
        <li v-for="(speItem,speIndex) in special" :key="speIndex" @click="linkSpecial(speItem)"><img :src="speItem.img" alt=""><span>{{speItem.name}}</span></li>
      </ul>
    </div>

    <!--特色疗法-->
    <div class="one bg">
      <div class="title">
        <div class="titleLeft"><h1>特色疗法</h1></div>
        <div class="titleRight" @click="linkHref(0)">更多</div>
      </div>
      <ul>
        <li v-for="(item,index) in oneList" :key="index" v-if="index<2">
          <img :src="imgLink(item.img)" alt=""  @click="linkDetail('/read',item.id)" v-if="item.img">
          <img src="../assets/img/bookDefault.png" alt=""  @click="linkDetail('/read',item.id)" v-else>
          <h1>{{item.browseNum}}人浏览过</h1>
          <h2 @click="linkDetail('/read',item.id)" :id="item.id">{{item.title}}</h2>
          <p>{{item.synopsis}}</p>
        </li>
        <!--<li>
          <img src="../../static/img/img3.png" alt="">
          <h1>230人浏览过</h1>
          <h2 @click="linkDetail('/read',id)">关于用针灸疗法治疗神经系统病症案例的探讨</h2>
          <p>听到的都是干货，学到的...</p>
        </li>-->
      </ul>

    </div>

    <!--医家-->
    <div class="two bg">
      <div class="title">
        <div class="titleLeft"><h1>医家</h1></div>
        <div class="titleRight" @click="linkHref(1)">更多</div>
      </div>
      <ul class="docCon">
        <li v-for="(item,index) in twoList" :key="index" v-if="index<3">
          <div class="doc">
            <img :src="imgLink(item.faceImg)" alt=""  @click="linkDetail('/doctorDetail',item.id)">
            <div class="Nation">
              <span></span>
              <div><h1>{{item.nations}}</h1></div>
              <span></span>
            </div>
          </div>
          <h2  @click="linkDetail('/doctorDetail',item.id)">{{item.name}}</h2>
          <p>{{item.title}}</p>

        </li>
      </ul>


    </div>

    <!--药材-->
    <div class="three bg">
      <div class="title">
        <div class="titleLeft"><h1>药材</h1></div>
        <div class="titleRight" @click="linkHref(2)">更多</div>
      </div>

      <ul>
        <li v-for="(item,index) in threeList" :key="index">
          <img :src="imgLink(item.img)" alt="" @click="linkDetail('/read',item.id)">
          <h1 @click="linkDetail('/read',item.id)">{{item.title}}</h1>
        </li>

      </ul>

    </div>

    <!--推荐阅读-->
    <div class="four bg">
      <div class="title">
        <div class="titleLeft"><h1>推荐阅读</h1></div>
        <div class="titleRight" @click="linkHref(3)">更多</div>
      </div>
      <ul>
        <li v-for="(itemF,indexF) in fourList" :key="indexF" v-if="indexF<3">
          <img :src="imgLink(itemF.bookCover)" alt=""  @click="linkDetail('/bookDetail',itemF.id)" v-if="itemF.bookCover">
          <img src="../assets/img/cover.png" alt="" v-else>
          <h1 @click="linkDetail('/bookDetail',itemF.id)" :id="itemF.id">{{Ellipsis(itemF.id,2,itemF.name,'.2')}}</h1>
        </li>
      </ul>
    </div>

    <Foot></Foot>

  </div>
</template>

<script>
  import {getCarouselAPI,getTherapyAPI,getDoctorAPI,getMaterialsAPI,getBookListAPI,geUnreadtAPI} from '@/api/home.js';
  import {getImgLinkAPI} from '@/api/list.js';
  import Cookies from 'js-cookie';

  import swiper from '../components/swiper.vue';
  import Foot from '../components/Foot.vue';
  /*var vConsole = new VConsole();*/
  export default {
    name: 'HelloWorld',
    data() {
      return {
        special:[
          {img:'./static/img/icotherapy.png',name:'特色疗法',link:'/therapy'},
          {img:'./static/img/icondoc.png',name:'医家',link:'/doctor'},
          {img:'./static/img/iconmedicinal.png',name:'药材',link:'/materials'},
          {img:'./static/img/iconbook.png',name:'图书',link:'/bookList'},
        ],
        imgs:null,
        curImg:0,
        timer:null,
        oneList:[],
        twoList:[],
        threeList:[],
        fourList:[],
        messageTotal:0,
        startX:0,
        endX:0,

      }
    },
    components:{
      Foot,
      swiper,
    },
    created() {
      if(this.token){
        this.getMessage();
      }
      /*this.getCarousel();*/
      this.getTherapy();
      this.getDoctor();
      this.getMaterials();
      this.getBookList();


    },
    watch: {
      curImg(n,o){
      },
    },
    computed: {
      token() {  //通过方法访问
        return this.$store.state.token;
      },
    },
    methods: {
      /*点击信息*/
      messFn(){
        if(this.token){
          this.$router.push('/messages');
        }else{
          this.$router.push('/loginPassword');
        }
      },
      /*轮播图*/
      /*getCarousel(){
        getCarouselAPI().then(res=>{
          if(res.data.status){
            console.log('获取轮播图',res.data)
            this.imgs=res.data.data.length>8?res.data.data.slice(0,8):res.data.data;

            let self=this;
            this.timer=setInterval(function(){
              if(self.curImg>=self.imgs.length-1){
                self.curImg=0;
                return
              }
              self.curImg++
            },4000);
          }
        })
      },*/
      /*系统消息*/
      getMessage(){
        geUnreadtAPI().then(res=>{
          this.messageTotal=res.data.data;
          console.log('',res.data)
        })
      },/*特色疗法*/
      getTherapy(){
        getTherapyAPI().then(res=>{
          this.oneList=res.data.data.recommendResourceList;
          console.log('特色疗法',res.data)
        })
      },
      /*医家*/
      getDoctor(){
        getDoctorAPI().then(res=>{
          this.twoList=res.data.data.recommendResourceList;
        })
      },
      /*药材*/
      getMaterials(){
        getMaterialsAPI().then(res=>{
          this.threeList=res.data.data.recommendResourceList;
          console.log('药材',res.data.data)
        })
      },
      /*推荐阅读*/
      getBookList(){
        getBookListAPI().then(res=>{
          this.fourList=res.data.data.recommendResourceList;
          console.log('药材',res.data.data)
        })
      },

      /*点击更多*/
      linkHref(index){
        this.$router.push({path:this.special[index].link})
      },

      /*跳转到详情*/
      linkDetail(link,id){
        this.$router.push({path:link,query:{
          id:id?id:0
        }})
      },

      /*轮播图跳转*/
      urlFn(){
        window.open(this.imgs[this.curImg].url)
      },

      /*跳转资源类型*/
      linkSpecial(val){
        this.$router.push(val.link);
      },
      touchStart(ev) {
        ev = ev || event;
        if(ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          this.startX = ev.touches[0].clientX; // 记录开始位置
          console.log('开始',ev.touches[0].clientX)
        }
      },
      touchEnd(ev){
        ev = ev || event;
        console.log('结束',ev.changedTouches[0].clientX)
        this.endX=ev.changedTouches[0].clientX;

      },
      touchMove(ev){
        ev = ev || event;
        console.log('移动',ev.touches[0].clientX)
      },
    },
    destroyed() {
      clearInterval(this.timer);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  #home {
    background: #fff;
    .search {
      margin-top: 0.20rem;
      height: 0.33rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.20rem;
      overflow: hidden;
      .searchLeft {
        margin-left: 0.15rem;
        width: 3rem;
        height: 0.33rem;
        input{
          background: url("../../static/img/nav_search.png") no-repeat  #F1F1F1  0.1rem center; background-size: 0.12rem 0.13rem;
          width: 2.7rem;
          height: 0.33rem;
          line-height: 0.33rem;
          border-radius: 0.17rem;
          border:none;
          padding-left: 0.3rem;
          font-size: 0.14rem;
        }
      }
      .searchRight {
        width: auto;
        height: 0.2rem;
        padding-right: 0.08rem;
        background: url("../../static/img/ico-xiaoxi.png") no-repeat;
        background-size: contain;
        p {
          /*
                  position: absolute;
                  top: 0;
                  left: 0;*/
          padding: 0 0.03rem;
          background: #F23030;
          height: 0.12rem;
          min-width: 0.12rem;

          text-align: center;
          /*display: block;*/
          border-radius: 0.06rem;
          font-size: 0.09rem;
          -webkit-text-size-adjust: none;
          color: #fff;
          margin-left: 0.11rem;
          margin-top: -0.04rem;
          display: flex;
          align-items: center;
          justify-content: center;
          span{
            display: block;
            padding: 0;
            margin: 0;
            height: .1rem;
            line-height: 0.12rem;
          }
        }

      }

    }

    .banner{
      margin: 0 auto;
      width: 3.75rem;
      height: 1.6rem;
      /*img{
        width: 3.51rem;
        height: 1.6rem;
        border-radius: 0.04rem;
      }*/
      .Wheel{
        width: 3.51rem;
        height: 1.6rem;
        position: relative;
        .item{
          width: 3.51rem;
          height: 1.6rem;
          img{
            width: 3.51rem;
            height: 1.6rem;
            animation: myfirst1 infinite;
            -moz-animation:myfirst1 infinite;	/* Firefox */
            -webkit-animation: myfirst1 infinite;	/* Safari 和 Chrome */
            -o-animation: myfirst1 infinite;

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
            border-radius: .015rem;
            animation: myfirst .5s forwards;
            -moz-animation: myfirst .5s forwards;	/* Firefox */
            -webkit-animation: myfirst .5s forwards;	/* Safari 和 Chrome */
            -o-animation: myfirst .5s forwards;

          }
        }
        @keyframes myfirst
        {
          to {transform: scaleX(2);background:rgba(255,255,255,1);}
        }

        @-moz-keyframes myfirst /* Firefox */
        {
          to {transform: scaleX(2);background:rgba(255,255,255,1);}
        }

        @-webkit-keyframes myfirst /* Safari 和 Chrome */
        {
          to {transform: scaleX(2);background:rgba(255,255,255,1);}
        }

        @-o-keyframes myfirst /* Opera */
        {
          to {transform: scaleX(2);background:rgba(255,255,255,1);}
        }








        @keyframes myfirst1
        {
          0%{opacity: 0.8}
          10%{opacity: 1}
          100%{opacity: 1}
        }

        @-moz-keyframes myfirst1 /* Firefox */
        {
          0%{opacity: 0.8}
          10%{opacity: 1}
          100%{opacity: 1}
        }

        @-webkit-keyframes myfirst1 /* Safari 和 Chrome */
        {
          0%{opacity: 0.8}
          10%{opacity: 1}
          100%{opacity: 1}
        }

        @-o-keyframes myfirst1 /* Opera */
        {
          0%{opacity: 0.8}
          10%{opacity: 1}
          100%{opacity: 1}
        }
      }
    }

    .special{
      width: 3.75rem;
      overflow: hidden;
      height: 1.27rem;
      position: relative;
      ul{
        position: absolute;
        left:0;
        right: 0;
        display: flex;
        justify-content: space-between;
        padding: 0.19rem 0.18rem;
        z-index: 11;
        li{
          width: 0.63rem;
          text-align: center;
          overflow: hidden;
          img{
            width: 0.63rem;
            height: 0.63rem;
          }
          span{
            color: #222222;
            font-size: 0.12rem;
          }

        }
      }
    }
    .special::before{
      content: '';
      background: url("../../static/img/left-wen.png") no-repeat  left bottom;
      width: 1.08rem;
      height:1.2rem;
      background-size: contain;
      position: absolute;
      left: -0.25rem;
      bottom:0;
      z-index: 0;
    }
    .special::after{
      content: '';
      background: url("../../static/img/right-wen.png") no-repeat;
      width: 1.08rem;
      height: 1.2rem;
      background-size: contain;
      position: absolute;
      right: -0.18rem;
      top:0;
    }
    .one{
      width:3.75rem;
      height: auto;
      position: relative;

      ul{
        padding: 0 0.12rem;
        display: flex;
        justify-content: space-between;
        li{
          width: 1.69rem;
          height:auto;
          padding-bottom: .3rem;
          position: relative;
          img{
            width: 1.69rem;
            height: 1.1rem;
            object-fit: cover;
            object-position: center;
            background: #f7f9fc;
          }
          h1{
            position: absolute;
            width: 1.64rem;
            display: inline-block;
            background: rgba(0,0,0,0.2);
            color: #fff;
            font-size: 0.11rem;
            height: 0.2rem;
            line-height: 0.2rem;
            text-align: left;
            padding-left: 0.05rem;
            left: 0;
            top:0.9rem;
            -webkit-text-size-adjust: none;
            font-weight: normal;
          }
          h2{
            /*height: .4rem;*/
            font-size: 0.14rem;
            color: #202021;
            line-height: 0.2rem;
            text-align: left;
            margin: 0.1rem 0;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          p{
            font-size: 0.12rem;
            color: #B0B5BE;
            text-align: left;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
    }
    .bg{
      width: 100%;
      background: url("../../static/img/body-bg.png") repeat-y;
      background-size: cover;
    }
    .bg::before{
      width: 3.75rem;
      height: 0.22rem;
      position: absolute;
      content: '';
      background: url("../../static/img/bg1.png") no-repeat;
      background-size: contain;
      top: 0;
      left:0;

    }

    .title{
      padding: 0 0.11rem;
      height: 0.7rem;
      padding-top: 0.15rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .titleLeft{
        height: 0.18rem;
        position: relative;
        h1{
          padding: 0 0.05rem 0 0.24rem;
          width: auto;
          display: inline-block;
          font-size: 0.18rem;
          color: #101622;
          height: 0.2rem;
          line-height: 0.2rem;
          font-weight: bold;
        }
      }
      .titleLeft:before{
        display: block;
        width: 0.19rem;
        height: 0.19rem;
        content: '';
        background: url("../../static/img/tit.png") no-repeat;
        background-size: contain;
        position: absolute;
        top: 0;
        padding-right: 0.2rem;
      }
      /*.titleLeft:after{
        width: 0.15rem;
        height: 0.18rem;
        content: '';
        background: url("../../static/img/tit-r.png") no-repeat;
        background-size: contain;
        position: absolute;
        top: 0;
      }*/
      .titleRight{
        width: auto;
        /*display: flex;
        justify-content: flex-end;*/
        /*width: .6rem;*/
        height: .15rem;
        line-height: .15rem;
        font-size: 0.13rem;
        color: #606773;
        position: relative;
        right: .12rem;
        top:0;
        img{
          width: 0.06rem;
          height: 0.1rem;
          padding-left: 0.03rem;
        }

      }
      .titleRight:before{
        width: .08rem;
        height: .15rem;
        content: '';
        background: url("../../static/img/more-r.png") no-repeat;
        background-size: contain;
        position: absolute;
        top: 0;
        margin-left: -0.11rem;
      }
      .titleRight:after{
        width: .08rem;
        height: .15rem;
        content: '';
        background: url("../../static/img/more-l.png") no-repeat;
        background-size: contain;
        position: absolute;
        top: 0;
        margin-left: .03rem;
      }
    }

    .two{
      height: 2.9rem;
      position: relative;
      .docCon{
        margin: 0 0.16rem;
        display: flex;
        justify-content: space-between;
        li{
          width: 1rem;

          .doc{
            position: relative;
            width: 1rem;
            height: 1.29rem;
            img{
              width: 1rem;
              height: 1.29rem;
              box-shadow: 0.01rem 0.03rem 0.03rem rgba(0,0,0,0.2);
              border-radius: 0.02rem;

            }
            .Nation {
              width: auto;
              height: 0.12rem;
              position: relative;
              z-index: 11;
              display: flex;
              justify-content: flex-end;
              right: .1rem;
              bottom: .18rem;

              div {
                display: inline-block;
                overflow: hidden;
                color: #fff;
                height: 0.12rem;
                line-height: 0.12rem;
                font-weight: bold;
                background: #19307F;

                h1 {
                  font-weight: normal;
                  display: block;
                  font-size: .16rem;
                  transform: scale(0.5);
                  -webkit-transform: scale(0.5);
                  -moz-transform: scaleX(0.5);
                  -o-transform: scaleX(0.5);
                  -ms-transform: scaleX(0.5);
                  overflow: hidden;
                  background: #19307F;
                  height: .12rem;
                  line-height: .12rem;
                  padding: 0.1rem 0;
                  margin-top: -0.1rem;
                  margin-left: -0.08rem;
                  margin-right: -0.08rem;
                }

              }
            }
            .Nation span:first-child {
              display: block;
              width: .05rem;
              height: .12rem;
              content: '';
              background: url("../../static/img/biaoqian-2.png") no-repeat;
              background-size: cover;
            }
            .Nation span:last-child {
              display: block;
              width: .05rem;
              height: .12rem;
              content: '';
              background: url("../../static/img/biaoqian-2.png") right top no-repeat;
              background-size: cover;
              padding-left: 0rem;
            }
          }



          h2{
            font-size: 0.14rem;
            color: #333333;
            font-weight: bold;
            height: 0.32rem;
            line-height: 0.32rem;
            margin-top: 0.1rem;
            display:block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          p{
            font-size: 0.11rem;
            color: #878B93;
            -webkit-text-size-adjust: none;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }

      }
    }

    .three{
      height:auto;
      padding-bottom: 0.1rem;
      position: relative;
      ul{
        display: flex;
        justify-content: space-between;
        flex-wrap:wrap;
        margin: 0 0.12rem;
        li{
          width: 1.06rem;
          margin-bottom: 0.05rem;
          display: block;
          text-align: center;
          img{
            width: 1.06rem;
            height: 0.73rem;
            border-radius: 0.02rem;
          }
          h1{
            /*width: 1.06rem;*/
            display:block;
            height: 0.36rem;
            line-height: 0.36rem;
            font-size: 0.14rem;
            font-weight: bold;
            color: #333333;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;

          }
        }
      }
    }

    .four{
      position: relative;
      height: auto;
      padding-bottom: 0.75rem;
      ul{
        padding: 0 0.13rem;
        display: flex;
        justify-content: space-between;
        li{
          width: 0.98rem;
          img{
            width: 0.98rem;
            height: 1.41rem;
            box-shadow: 0.02rem 0.02rem 0.03rem rgba(0,0,0,0.2);
          }
          h1{
            margin-top: 0.08rem;
            color: #222222;
            font-size: 0.14rem;
            font-weight: bold;
            text-align: left;
            line-height: 0.2rem;
          }

        }
      }
    }


  }

</style>
