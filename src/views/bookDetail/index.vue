<template>
  <div class="bookDetail">
    <div class="DetailTit">
      <div class="back" @click="$router.go(-1)">
        <img src="../../assets/img/list/back.png" alt="">
      </div>
      <div class="set">
        <img src="../../assets/img/list/share.png" alt="" @click="isShow=!isShow,isType=2">
      </div>

    </div>


    <div class="bookInfo">
      <div class="InfoImg">
        <img :src="imgLink(detail.bookCover)" alt="" v-if="detail.bookCover">
        <img src="../../assets/img/cover.png" alt="" v-else>
      </div>
      <div class="InfoWord">
        <h1>{{detail.name}}</h1>
        <ul>
          <li class="startY">
            <span v-for="item in count"></span>
          </li>
          <li v-for="item1 in 5" class="startK"></li>
        </ul>
        <h3><img src="../../assets/img/detail/ege.png" alt="">{{detail.browseNum}}阅读</h3>
        <p>{{detail.author}} 著</p>
        <div class="price">
          <div v-if="detail.priceOption==0"><span>免费</span></div>
          <div v-else>￥<h2>{{detail.beforePrice}}</h2>.{{detail.afterPrice}} </div>
          <del v-if="detail.pricing!=null&&detail.priceOption!=0">￥{{detail.pricing ? detail.pricing.toFixed(2) : '0.00'}}</del>
        </div>
        <div class="Collection" @click="collection"><img :src="isCollection?star2:star1" alt="">收藏</div>
      </div>
    </div>

    <!--内容简介-->
    <div class="content">
      <h1>内容简介</h1>
      <p ref="cont" id="summary" v-if="isShowMore">{{Ellipsis('summary', 4, detail.summary, '.25')}}</p>
      <p v-if="!isShowMore" v-html="detail.summary"></p>
      <div class="more" v-if="isShowMore&&isMore" @click="isShowMore=!isShowMore">
        查看全部简介
      </div>
      <div class="more" v-if="!isShowMore" @click="isShowMore=!isShowMore">
        收起全部简介
      </div>
    </div>

    <!--精彩评价-->
    <comments :resource="detail"></comments>


    <div class="foot">
      <ul>
        <li @click="onRead"><img src="../../assets/img/detail/read.png" alt="">在线试读</li>
        <li class="bg" @click="toBuy" v-if="detail.priceOption!=0">立即购买</li>
      </ul>
    </div>


    <div class="Popup setFont" v-if="isShow" @click="isShow=false">
      <div class="buy" @click.stop="" v-if="isType==1">
        <div class="money">
          <h1>支付金额：</h1>
          <h2>￥180.00</h2>
        </div>
        <ul>
          <li><h1><img src="../../assets/img/detail/zfb.png" alt="">支付宝</h1> <span><img
            src="../../assets/img/detail/change1.png" alt=""></span></li>
          <li><h1><img src="../../assets/img/detail/wx.png" alt="">微信</h1> <span><img
            src="../../assets/img/detail/change2.png" alt=""></span></li>
        </ul>
        <div class="botton" @click="$valert.show('暂时未开发')">
          立即支付
        </div>
      </div>

      <div class="share" @click.stop="" v-if="isType==2">
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
        <h1 @click="isType=0">取消</h1>
      </div>

    </div>


  </div>
</template>

<script>
  import comments from '../../components/comments.vue';
  import {addCollectAPI, delCollectAPI} from '@/api/my.js';
  import {getBookDetailAPI, getCountAPI, getCommentListAPI} from '@/api/detail.js';
  import star1 from '../../assets/img/detail/coll.png';
  import star2 from '../../assets/img/detail/start1.png';
  import { baseUrl } from '@/utils/global.js';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        isShow: false,
        id: this.$route.query.id,
        star1: star1,
        star2: star2,
        isCollection: false,
        baseUrl:baseUrl,
        detail: {
          price: 0,
          bookCover: null,
          name: null,
        },
        count: 0,
        isShowMore: true,
        isMore: false,
        commentList: [],
        isType: 0,
      }
    },
    components: {comments},
    created() {
      this.getCount();
      this.getDetail();
    },
    watch: {},
    computed: {
      token() {  //通过方法访问
        return this.$store.state.token;
      },
    },
    methods: {
      getCount() {
        getCountAPI({
          resourceClass: 1,
          resourceId: this.id,
        }).then(res => {
          if (res.data.status) {
            this.count = res.data.data.resourceScore ? res.data.data.resourceScore : 5;
          }
        })
      },
      getDetail() {
        getBookDetailAPI(this.id).then(res => {
          if (res.data.status) {

            this.detail = res.data.data;
            this.isCollection = this.detail.isCollection;
            if (this.detail.price) {
              this.detail.price = this.detail.price.toFixed(2);
              this.detail.beforePrice = this.detail.price.split('.')[0];
              this.detail.afterPrice = this.detail.price.split('.')[1];
            } else {
              this.detail.beforePrice = '0';
              this.detail.afterPrice = '0';
            }
            this.detail.summary = this.detail.summary.replace(/<[^>]+>/g, "");
            this.$nextTick(() => {
              let winW = document.documentElement.clientWidth;
              let winH = winW * 100 / 375;
              /*this.isShowMore = this.$refs.cont.scrollHeight > winH ? true : false;*/
              this.$nextTick(() => {
                console.log(this.$refs.cont.textContent.endsWith('...'), this.detail.summary.endsWith('...'))
                if (this.$refs.cont.textContent.endsWith('...') && !this.detail.summary.endsWith('...')) {
                  this.isShowMore = true;
                  this.isMore = true;
                  /*this.isMore=true;*/
                } else {
                  this.isMore = false;
                }
              })
            })
            /*this.getCommentList();*/

          }
        })
      },
      shareFn(val){
        let link=this.baseUrl+this.$route.fullPath;
        var share = new SimpleShare({
          url: link,
          title:this.detail.name,
        });
        if(val=='QQ'){
          share.qzone();
        }else{
          share.weibo();
        }
      },

      /*fatFn(){
        this.getCommentList();
      },*/
      collection() {
        if (!this.token) {
          this.$router.push('/loginPassword');
          return
        }
        let API = this.isCollection ? delCollectAPI : addCollectAPI;
        API({
            "goodsList": [
              {
                "id": this.id,
                "type": "2-1"
              }
            ]
          }
        ).then(res => {
          if (res.data.status) {
            this.isCollection = !this.isCollection;
            this.$valert.show(`${this.isCollection ? '收藏成功' : '已取消收藏'}`);
          }
        })
      },
      /*在线试读*/
      onRead() {
        if (this.detail.chapterList.length > 0) {
          this.$router.push({path: '/bookRead', query: {id: this.$route.query.id}});
        } else if (this.detail.pdfFile) {
          this.$router.push({path: '/pdf', query: {id: this.$route.query.id,pdfId:this.detail.pdfFile,isCollection:this.isCollection}});
        } else {
          this.$valert.show('资源更新中，敬请期待');
        }
      },
      //立即购买
      toBuy(){
        if(this.token){
          this.isShow=!this.isShow;
          this.isType=1;
        }else{
          this.$router.push('/loginPassword');
        }

      },
    },
    /*beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta
      if(to.name=='nationDetail'){
        to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
      }
      next();
    }*/
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .bookDetail {
    .DetailTit {
      width: 100%;
      position: fixed;
      z-index: 11;
      top: 0;
      left: 0;
      background: url("../../assets/img/detail/detailBG.png") no-repeat;
      background-size: cover;
      padding-top: .13rem;
      height: .31rem;
      display: flex;
      justify-content: space-between;
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
        display: flex;
        img {
          margin-right: .18rem;
          display: block;
        }

        img {
          width: .19rem;
          height: .19rem;
        }
      }
    }

    .bookInfo {
      width: 100%;
      height: 1.785rem;
      padding-top: 0.6rem;
      background: url("../../assets/img/detail/detailBG.png") no-repeat;
      background-size: cover;
      display: flex;
      justify-content: space-between;
      .InfoImg {
        width: 1.035rem;
        height: 1.5rem;
        padding-left: 0.145rem;
        img {
          width: 1.035rem;
          height: 1.5rem;
        }
      }
      .InfoWord {
        width: 2.26rem;
        padding-right: 0.145rem;
        position: relative;
        h1 {
          font-size: 0.18rem;
          color: #fff;
          font-width: bold;
          height: 0.325rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        ul {
          width: 100%;
          display: block;
          height: 0.25rem;
          position: relative;
          li {
            float: left;
            padding-right: 0.05rem;
            width: 0.1rem;
            height: 0.1rem;
          }
          .startY {
            position: absolute;
            width: 100%;
            span {
              float: left;
              padding-right: 0.05rem;
              display: block;
              width: 0.1rem;
              height: 0.1rem;
              background: url("../../assets/img/detail/start1.png") no-repeat;
              background-size: contain;
            }
          }
          .startK {
            background: url("../../assets/img/detail/start.png") no-repeat;
            background-size: contain;
            /*margin-left: -0.2rem;*/
          }
        }
        h3 {
          height: 0.12rem;
          font-size: 0.12rem;
          color: #fff;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 0.13rem;
          font-weight: normal;
          img {
            width: 0.155rem;
            height: 0.095rem;
            margin-right: 0.05rem;
          }

        }
        p {
          color: #fff;
          font-size: 0.12rem;
          height: 0.46rem;
        }
        .price {
          color: #fff;
          display: flex;
          justify-content: flex-start;
          div {
            font-size: .16rem;
            padding-right: 0.15rem;
          }
          span {
            font-size: .16rem;
          }
          h2 {
            display: inline;
            font-size: .21rem;
            font-weight: normal;
          }
          del {
            font-size: .12rem;
            padding-top: 0.05rem;
          }
        }
        .Collection {
          width: 0.58rem;
          height: 0.3rem;
          background: #fff;
          border-radius: 0.15rem 0 0 0.15rem;
          position: absolute;
          bottom: .18rem;
          right: 0;
          color: #8E8F91;
          font-size: 0.13rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            width: 0.155rem;
            height: 0.155rem;
            margin-right: 0.04rem;
            margin-left: 0.08rem;
          }
        }

      }

    }

    /*内容简介*/
    .content {
      padding: 0 .15rem;
      margin-bottom: .4rem;
      h1 {
        font-size: .17rem;
        color: #222222;
        height: .4rem;
        padding-top: .2rem;
      }
      p {
        line-height: .25rem;
        text-indent: 2em;
        font-size: .12rem;
        overflow: hidden;
      }
      .more {
        display: block;
        height: .28rem;
        line-height: .28rem;
        width: 1.1rem;
        text-align: center;
        border-radius: 0.14rem;
        border: 1px solid #C8CAD2;
        color: #C8CAD2;
        font-size: .13rem;
        margin: .2rem auto 0;
      }
    }

    .foot {
      width: 100%;
      height: .505rem;
      background: #fff;
      position: fixed;
      left: 0;
      bottom: 0;
      box-shadow: .04rem .02rem .08rem .05rem rgba(0, 0, 0, 0.05);
      ul {
        display: flex;
        justify-content: space-between;

        li {

          height: .505rem;
          font-size: .14rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          img {
            width: .21rem;
            height: .19rem;
            margin-right: .05rem;
          }
        }
        .bg {
          background: url("../../assets/img/detail/button.png");
          color: #fff;
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
    }
    .buy {
      width: 100%;
      height: 2.3rem;
      background: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: .1rem .1rem 0 0;
      .money {
        height: .46rem;
        padding: .2rem .25rem 0 .25rem;
        display: flex;
        justify-content: space-between;
        h1 {
          font-size: .14rem;
          color: #333333;
          font-weight: normal
        }
        h2 {
          font-size: .15rem;
          color: #E01F36;
          font-weight: normal
        }
      }
      ul {
        padding: 0 .255rem .04rem .255rem;
        li {
          display: flex;
          justify-content: space-between;
          height: .36rem;
          border-bottom: 1px solid #EBEBEB;
          margin-bottom: .14rem;
          h1 {
            height: .21rem;
            line-height: .21rem;
            font-size: .14rem;
            color: #333;
            font-weight: normal;
            img {
              width: .21rem;
              height: .21rem;
              margin-right: .09rem;
              display: inline-block;
            }
          }
          span {
            img {
              width: .2rem;
              height: .2rem;
            }
          }

        }
      }
      .botton {
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

  }
</style>
