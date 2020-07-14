<template>
  <!--图书阅读页-->
  <div class="bookRead" :style="{ background: `rgba(${backColor[isBcolor]}`+(range/100)+')' }">
    <div class="bookReadTit">
      <div class="back" @click="$router.go(-1)">
        <img src="../../assets/img/detail/back.png" alt="">
      </div>
      <div class="set" @click="isShow=true,isSCont=1">
        购买
      </div>

    </div>


    <div id="cont" :style="{overflow:'auto',height:winH+'px'}"  v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <div class="content" v-html="synopsis" :style="{fontSize:fontSIZE[curSize].size,height:'100%'}" @touchmove="touchmove($event)" @touchstart="touchstart($event)" @touchend="touchend($event)"></div>
      <!--<div class="more" v-if="loading&&!noMore">加载中...</div>-->
      <div class="noHave" v-if="noMore">
        这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
      </div>
    </div>


    <div class="foot">
      <ul>
        <li  @click="isShow=true,isSCont=2">
          <img src="../../assets/img/detail/list.png" alt="">目录</li>
        <li><img src="../../assets/img/detail/commentB.png" alt="" @click="toComments">评论</li>
        <li @click="isShow=true,isSCont=3"><img src="../../assets/img/detail/set.png" alt="">设置</li>
      </ul>
    </div>

    <!--弹出框-->
    <div class="Popup" v-if="isShow" @click="isShow=false">
      <!--目录-->
      <div class="Catalog" @click.stop="" :style="{height:clientH+'px'}" v-if="isSCont==2">
        <div class="catalogTit">
          <img :src="imgLink(detail.bookCover)" alt="">
          <div class="name">
            <h1>{{detail.name}}</h1>
            <h2>{{detail.author}} <span>{{(pageNum+1/chapterList.length*100).toFixed(1)}}%已读</span></h2>
          </div>
          <img src="../../assets/img/detail/close.png" alt=""  @click="isShow=false">
        </div>

        <div :class="{list:true,lock:detail.price&&item.pid.indexOf('txt001')<0?true:false}"  v-for="(itm,inx) in chapterList" :key="inx" @click="changDirectory(itm,inx)">
          <h1 v-if="itm.level==0" :class="markId==itm.markid?'active':''">{{itm.chapterName}}</h1>
          <ul v-if="itm.level==1">
            <li :class="markId==itm.markid?'active':''"><span :style="{width:false?'2.9rem':'100%'}">{{itm.chapterName}}</span></li>
          </ul>
        </div>

        <!--<div class="list  lock">
          <h1>第二章序伦</h1>
          <ul>
            <li><span>（一）《根本医典》树喻分类法 </span><img src="../../assets/img/detail/lock.png" alt=""></li>
            <li><span>（二）生理根分暗示法所大所大所大所多出未变体、病变体二树</span><img src="../../assets/img/detail/lock.png" alt=""></li>
            <li><span>（三）诊断之根生望、切、问三树</span><img src="../../assets/img/detail/lock.png" alt=""></li>
          </ul>
        </div>-->

        <!--<div class="list  lock">
          <h1>第三章序伦</h1>
          <ul>
            <li><span>（一）《根本医典》树喻分类法 </span><img src="../../assets/img/detail/lock.png" alt=""></li>
            <li><span>（二）生理根分暗示法所大所大所大所多出未变体、病变体二树</span><img src="../../assets/img/detail/lock.png" alt=""></li>
            <li><span>（三）诊断之根生望、切、问三树</span><img src="../../assets/img/detail/lock.png" alt=""></li>
            <li><span>（三）诊断之根生望、切、问三树</span><img src="../../assets/img/detail/lock.png" alt=""></li>
            <li><span>（三）诊断之根生望、切、问三树</span><img src="../../assets/img/detail/lock.png" alt=""></li>
          </ul>
        </div>-->

      </div>

      <!--购买-->
      <div class="buy" v-if="isSCont==1"  @click.stop="">
        <div class="money">
          <h1>支付金额：</h1>
          <h2>￥180.00</h2>
        </div>
        <ul>
          <li><h1><img src="../../assets/img/detail/zfb.png" alt="">支付宝</h1> <span><img  src="../../assets/img/detail/change1.png" alt=""></span></li>
          <li><h1><img src="../../assets/img/detail/wx.png" alt="">微信</h1> <span><img  src="../../assets/img/detail/change2.png" alt=""></span></li>
        </ul>
        <div class="botton" @click="$valert.show('暂时未开发')">
          立即支付
        </div>
      </div>

      <!--设置-->
      <div class="setCss"  v-if="isSCont==3"  @click.stop="">
        <div class="brightness">
          <img src="../../assets/img/detail/sun.png" alt="">
          <div class="Progress">
            <el-slider v-model="range"></el-slider>
            <!--<span></span>
            <div class="Ball"></div>-->
          </div>
          <img src="../../assets/img/detail/sun.png" alt="">

        </div>

        <div class="setFontSize">
          <h1>字号大小</h1>
          <ul>
            <li :class="curSize==indexSize?'active':''" v-for="(itSize,indexSize) in fontSIZE" :key="indexSize" @click="curSize=indexSize">{{itSize.name}}</li>
          </ul>
        </div>
        <div class="setFontSize">
          <h1>背景顏色</h1>
          <ul>
            <li :class="isBcolor==indexSize?'active':''" v-for="(itSize,indexSize) in backColor" :key="indexSize" @click="isBcolor=indexSize,range=100"><span :style="{background:`rgba(${itSize}1)`}"></span></li>
          </ul>
        </div>

      </div>

    </div>

    <!--第一次进来提示-->
    <div class="first" v-if="isFirst">
      <ul>
        <li><img src="../../assets/img/detail/icon_left.png" alt=""><h1>向左滑动或点击左侧显示上一页</h1></li>
        <li class="middle"><img src="../../assets/img/detail/icon_middle.png" alt=""><h1>点击中间或向上滑动展示功能菜单</h1></li>
        <li><img src="../../assets/img/detail/icon_right.png" alt=""><h1>向右滑动或点击右侧显示上一页</h1></li>
      </ul>
      <div class="button" @click="isFirst=false">
        我知道了
      </div>
    </div>

  </div>
</template>

<script>
  import {getDirectoryDetailAPI} from '@/api/list.js';
  import {getBookDetailAPI} from '@/api/detail.js';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        clientH:0,
        isShow:false,
        isSCont:null,
        fontSIZE:[{name:'小',size:'.12rem'},{name:'中',size:'.16rem'},{name:'大',size:'.18rem'},{name:'超大',size:'.20rem'}],
        curSize:1,
        backColor:['247,247,247,','230,219,188,','200,222,178,','241,202,201,'],
        isBcolor:0,
        isFirst:true,
        detail:{price:0,},
        id: this.$route.query.id,
        chapterList:[],
        range:100,
        directory:[],
        synopsis:'',
        bookId:null,
        markId:null,
        winH:0,
        pageNum:0,
        loading:false,
      }
    },
    created() {
      let winW=document.documentElement.clientWidth;
      this.clientH=document.body.clientHeight-(document.body.clientWidth*100/375);
      this.winH=document.documentElement.clientHeight+(winW*200/375);
      this.getDetail();
    },
    watch: {},
    computed:{
      token() {  //通过方法访问
        return this.$store.state.token;
      },
      noMore() {
        return this.pageNum+1 == this.chapterList.length;
      },
      disabled() {
        return  this.loading||this.noMore||(this.detail.price&&this.chapterList[this.pageNum].pid.indexOf('txt001')<0);
      },
    },
    methods: {
      load() {
        this.loading = true;
        this.pageNum += 1;
        this.markId=this.chapterList[this.pageNum].markid;
        this.bookId=this.chapterList[this.pageNum].bookid;
        this.getDirectoryDetail();
      },
      formatTooltip(val) {
        return val / 100;
      },


      getDetail() {
        getBookDetailAPI(this.id).then(res => {
          if (res.data.status) {
            this.detail = res.data.data;
            this.chapterList = res.data.data.chapterList;
            this.bookId=this.chapterList[0].bookid;
            this.markId=this.chapterList[0].markid;
            /*this.isCollection = this.detail.isCollection;*/
            /*if (this.detail.price) {
              this.detail.price = this.detail.price.toFixed(1);
              this.detail.beforePrice = this.detail.price.split('.')[0];
              this.detail.afterPrice = this.detail.price.split('.')[1];
            } else {
              this.detail.beforePrice = '0';
              this.detail.afterPrice = '0';
            }*/
            /*this.detail.summary = this.detail.summary.replace(/<[^>]+>/g, "");*/
            /*this.$nextTick(() => {
              let winW = document.documentElement.clientWidth;
              let winH = winW * 100 / 375;
              this.isShowMore = this.$refs.cont.scrollHeight > winH ? true : false;
            })*/
            /*this.getCommentList();*/
            this.$emit('sonFn');
            this.getDirectoryDetail();
          }
        })
      },

      /*获取章节详情*/
      getDirectoryDetail(){
        console.log(this.chapterList);
        let data={
          bookId:this.bookId,
          markId:this.markId
        };
        getDirectoryDetailAPI(data).then(res=>{
          if(res.data.status){
            document.getElementById('cont').scrollTop = 0;
            this.synopsis=res.data.data.synopsis;
            this.loading = false;
          }
        })
      },
      /*选择章节*/
      changDirectory(item,inx){
        if((this.detail.price&&item.pid.indexOf('txt001')<0)){
          this.$valert.show('请去购买');
          return
        }
        this.pageNum=inx;
        console.log('章节',item)
        this.markId=item.markid;
        this.bookId=item.bookid;
        this.isShow=false;
        this.getDirectoryDetail();
      },

      /*评论*/
      toComments(){
        if(this.token){
          this.$router.push({path:'/comment',query:{id:this.$route.query.id,type:this.detail.resourceType}});
        }else{
          this.$valert.show('请去登录');
        }
      },

      touchmove(e){
        console.log(e.touches)
      },
      touchstart(e){
        console.log('开始',e.touches)
      },
      touchstart(e){
        console.log('开始',e.touches)
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  body, html {
    width: 100%;
    height: 100%;
  }

  .lineCss {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .bookRead {
    width: 100%;
    min-height: 100%;
    background: #f6f6f8;
    /*padding-bottom:1.2rem;*/
    .bookReadTit {
      width: 100%;
      position: fixed;
      z-index: 11;
      top: 0;
      left: 0;
      background: #fff;
      background-size: cover;
      padding-top: .33rem;
      height: .27rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #EEEEEE;
      padding-bottom: .1rem;
      .back {
        width: .1rem;
        height: .18rem;
        padding-left: .12rem;
        img {
          width: .1rem;
          height: .18rem;
        }
      }
      .set {
        padding-right: .02rem;
        width: .45rem;
        height: .25rem;
        border: 1px solid #3069D6;
        border-radius: .03rem;
        color: #3069D6;
        font-size: .13rem;
        text-align: center;
        line-height: .25rem;
        margin-right: .12rem;
      }
    }
    #cont{
      padding-bottom: .85rem;
    }
    .content {
      padding: 1.3rem .145rem 0 .145rem;
      color: #333;
      font-size: .18rem;
      line-height: .28rem;
      text-indent: 2em;
      h1 {
        height: 1.12rem;
        font-size: .24rem;
      }
      p {
        font-size: .18rem;
        line-height: .28rem;
        text-indent: 2em;
      }
    }

    .foot {
      height: .625rem;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      border-top: 1px solid #EEEEEE;
      ul {
        padding: .15rem .35rem 0 .35rem;
        display: flex;
        justify-content: space-between;
        li {
          color: #3069D6;
          img {
            width: .225rem;
            margin-bottom: .07rem;
          }
        }
        li:first-child img {
          margin-bottom: .1rem;
        }
      }
    }

    /*弹出框*/
    .Popup {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 12;
      background: rgba(0, 0, 0, 0.3);

      .Catalog {
        width: 3.11rem;
        overflow-y: scroll;
        padding: 1rem .18rem 0 .18rem;
        background: #fff;
        .catalogTit {
          width: 3.11rem;
          background: #fff;
          position: absolute;
          top:0;
          left: .18rem;
          padding-top: .18rem;
          height: .78rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #EBEBEB;
          img:first-child {
            width: .4rem;
            height: .545rem;
          }
          img:last-child {
            width: .145rem;
            height: .145rem;
          }
          .name {
            width: 2.28rem;
            h1 {
              font-size: .16rem;
              color: #333;
              font-weight: normal;
              height: .26rem;
              .lineCss
            }
            h2 {
              color: #666666;
              font-size: .13rem;
              font-weight: normal;
              span {
                font-size: .11rem;
                padding-left: .1rem;
              }
            }
          }
        }
        .list {
          font-size: .14rem;
          color: #333333;
          height: auto;
          h1 {
            height: .485rem;
            line-height: .485rem;
            font-size: .14rem;
            width: 100%;
            border-bottom: 1px solid #EBEBEB;
            .lineCss
          }
          ul {
            width: 100%;
            li {
              padding-left: .10rem;
              height: .485rem;
              line-height: .485rem;

              border-bottom: 1px solid #EBEBEB;
              display: flex;
              justify-content: space-between;
              align-items: center;

              span {
                display: inline-block;
                width: 2.8rem;
                .lineCss
              }
              img {

                width: .12rem;
                height: .14rem;
              }
            }

          }
          .active {
            color: #205FC6;
            font-weight: bold;
          }
        }

        .lock {
          color: #999999;

        }
      }

      /*购买*/
      .buy {
        width: 100%;
        height: 2.3rem;
        background: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: .1rem .1rem 0 0;
        .money{
          height: .46rem;
          padding: .2rem .25rem 0 .25rem;
          display: flex;
          justify-content: space-between;
          h1{font-size: .14rem; color: #333333;font-weight: normal}
          h2{font-size: .15rem; color: #E01F36;font-weight: normal}
        }
        ul{
          padding: 0 .255rem .04rem .255rem;
          li{
            display: flex;
            justify-content: space-between;
            height: .36rem;
            border-bottom: 1px solid #EBEBEB;
            margin-bottom: .14rem;
            h1{
              height: .21rem;
              line-height: .21rem;
              font-size: .14rem;
              color: #333;
              font-weight: normal;
              img{
                width: .21rem;
                height: .21rem;
                margin-right: .09rem;
                display: inline-block;
              }
            }
            span{
              img{
                width: .2rem;
                height: .2rem;
              }
            }

          }
        }
        .botton{
          width: 3.3rem;
          height: .4rem;
          line-height: .4rem;
          text-align: center;
          color: #fff;
          font-size: .16rem;
          background: url("../../assets/img/detail/buyBG.png") no-repeat;
          background-size: contain;
          margin: 0 auto;
        }
      }

      /*設置*/
      .setCss{
        position: absolute;
        height: 2.6rem;
        bottom: 0;
        background: #fff;
        width: 100%;

        .brightness{
          height: .24rem;
          padding: .25rem .19rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img:first-child{
            width: .18rem;
            height:.18rem;
            opacity: 0.8;
          }
          img:last-child{
            width: .24rem;
            height:.24rem;
          }
          .Progress{
            width: 2.7rem;
            /*height: .03rem;*/
            /*background: #eee;
            border-radius: .02rem;
            position: relative;*/
            /*span{
              position: absolute;
              width: 50%;
              height: .03rem;
              background:#2a6ad7;
              border-radius: .02rem;

            }
            .Ball{
              position: absolute;
              width: .14rem;
              height: .14rem;
              background:#2a6ad7;
              border-radius: 50%;
              top: -.05rem;
              left: 50%;
            }*/
          }
        }



        .setFontSize{
          h1{
            font-size: 0.17rem;
            color: #212020;
            padding: 0.17rem 0.12rem  0.12rem 0.12rem;
            font-weight: normal;

          }
          ul{
            height: 0.44rem;
            border: 1px solid #E0E1E8;
            margin: 0rem 0.12rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-radius: 0.03rem;
            li{
              font-size: 0.16rem;
              span{
                display: block;
                width: .28rem;
                height: .28rem;
                border-radius: 50%;
              }

            }
            .active{
              color:#145E9B;
              span{
                border: 1px solid #4d82dd;
                width: .27rem;
                height: .27rem;
              }
            }
          }
        }
      }
    }

    /*提示*/
    .first{
      width: 100%;
      height:100%;
      background: rgba(0,0,0,0.7);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 11;
      h1{
        font-size: .12rem;
        line-height: .19rem;
        text-align: center;
        color: #fff;
      }
      ul{
        display: flex;
        justify-content: space-between;
        height: 100%;
        li{
          width: 1.25rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          /*justify-content: center;*/
          align-items: center;
          padding-top: 2.7rem;
          img{
            width:.36rem;
            height: .36rem;
            padding-bottom: .23rem;
          }
          h1{
            width: 1.1rem;
            font-weight: normal;
          }
        }
        .middle{
          background: rgba(0,0,0,0.5);
          padding-top: 2.75rem;
          img{
            width:.4rem;
            height: .27rem;
            padding-bottom: .27rem;
          }

        }
      }

      .button{
        position: absolute;
        bottom: 1.4rem;
        left: 1.31rem;
        color: #fff;
        width: 1.1rem;
        height: .35rem;
        border-radius: .04rem;
        border:1px solid #fff;
        font-size: .16rem;
        line-height: .35rem;
        text-align: center;
      }

    }

  }
</style>
