<template>
  <!--医家详情-->
  <div class="doctorDetail">
    <div class="DetailTit">
      <div class="back" @click="$router.go(-1)">
        <img src="../../assets/img/list/back.png" alt="">
      </div>
      <div class="set">
        <img src="../../assets/img/list/share.png" alt="" @click="isShowSize=!isShowSize,isShow=2">
      </div>

    </div>

    <div class="doctorImg">
      <img :src="imgLink(detail.faceImg)" alt="">
      <h1>{{detail.name}}</h1>
      <h2>{{detail.title}}</h2>

      <p ref="cont" :id="`description`" v-if="isShowMore">{{Ellipsis(`description`, 5, detail.description, '.25')}}</p>
      <p v-if="!isShowMore" v-html="detail.description"></p>
      <div class="more" v-if="isShowMore&&isMore" @click="isShowMore=!isShowMore">
        查看全部简介
      </div>
      <div class="more" v-if="!isShowMore" @click="isShowMore=!isShowMore">
        收起全部简介
      </div>


    </div>

    <!--特色疗法-->
    <div class="doctorTherapy" v-if="articleLsit.length>0">
      <div class="tit">
        <h1>特色疗法</h1>
        <div class="titleRight" @click="linkHref('/therapy')">更多 <img src="../../../static/img/right.png" alt=""></div>

      </div>

      <div class="list" v-for="(item,index) in articleLsit" :key="index" v-if="index<2">
        <img :src="imgLink(item.img)" alt="" @click="linkDetail('/read',item.id)" v-if="item.img">
        <div :class="item.img?'info css1':'info'">
          <h1 @click="linkDetail('/read',item.id)" :id="'tit'+index">
            {{Ellipsis('tit' + index, 2, item.title, '.21')}}</h1>
          <p v-if="!item.img" :id="`description${index}`">
            {{Ellipsis(`description${index}`, 2, item.synopsis, '.19')}}</p>
          <div class="other">
            <h2 v-if="(item.readTextPower!=0&&!token)||(item.readTextPower!=0&&token&&item.isFree==0)">
              ￥{{item.price ? item.price.toFixed(2) : '0.00'}}</h2>
            <span v-else>免费</span>
            <h3>{{item.browseNum}}人浏览过</h3>
          </div>
        </div>
      </div>

    </div>

    <!--推荐著作-->
    <div class="doctorTherapy" v-if="ebookList.length>0">
      <div class="tit">
        <h1>推荐著作</h1>
        <div class="titleRight" @click="linkHref('/bookList')">更多 <img src="../../../static/img/right.png" alt=""></div>

      </div>

      <ul class="Booklist">
        <li v-for="(item,index) in ebookList" :key="index">
          <img :src="imgLink(item.bookCover)" alt="" v-if="item.bookCover" @click="linkDetail('/bookDetail',item.id)">
          <img src="../../assets/img/cover.png" alt="" @click="linkDetail('/bookDetail',item.id)" v-else>
          <div class="info">
            <h1 @click="linkDetail('/bookDetail',item.id)">{{item.name }}</h1>
            <p :id="'cont'+index">{{Ellipsis('cont' + index, 2, item.summary, '.19')}}</p>
            <div class="other">
              <h3>{{item.author}}</h3>
              <h2 v-if="item.priceOption==1">￥{{item.price ? item.price.toFixed(2) : '0.00'}}</h2>
              <span v-if="item.priceOption==0">免费</span>
            </div>
          </div>
        </li>
      </ul>
    </div>


    <div class="setFont" v-if="isShowSize" @click="isShowSize=false">
      <!--<div class="setFontSize" @click.stop="" v-if="isShow==1">
        <h1>字号大小</h1>
        <ul>
          <li :class="curSize==indexSize?'active':''" v-for="(itSize,indexSize) in fontSIZE" :key="indexSize">{{itSize}}</li>
        </ul>
      </div>-->
      <div class="share" @click.stop="">
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


  </div>
</template>

<script>
  import {getDoctorDetailAPI, getEbookListAPI, getArticleListAPI} from '@/api/detail.js';
  import { baseUrl } from '@/utils/global.js';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        id: this.$route.query.id,
        detail: {faceImg: null},
        articleLsit: [],
        ebookList: [],
        isShowSize: false,
        isShowMore: true,
        isMore: false,
        baseUrl:baseUrl,
      }
    },
    created() {
      this.getDetail();
    },
    watch: {},
    computed: {
      token() {  //通过方法访问
        return this.$store.state.token;
      },
    },
    methods: {
      /*点击更多*/
      linkHref(link) {
        this.$router.push(link)
      },
      /*跳转到详情*/
      linkDetail(link, id) {
        this.$router.push({
          path: link, query: {
            id: id ? id : 0
          }
        })
      },

      /*获取详情*/
      getDetail() {
        getDoctorDetailAPI(this.id).then(res => {
          if (res.data.status) {
            this.detail = res.data.data;
            this.detail.description = this.detail.description.replace(/<[^>]+>/g, "");
            this.$nextTick(() => {
              this.$nextTick(() => {

                if (this.$refs.cont.textContent.endsWith('...') && !this.detail.description.endsWith('...')) {
                  this.isShowMore = true;
                  this.isMore = true;
                  /*this.isMore=true;*/
                } else {
                  this.isMore = false;
                }
              })
            })
            this.getArticleList();
            this.getEbookList();
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

      /*获取特疗法列表*/
      getArticleList() {
        getArticleListAPI(this.id).then(res => {
          if (res.data.status) {
            this.articleLsit = res.data.data.list;
          }
        })
      },
      /*获取相关推荐图书*/
      getEbookList() {
        getEbookListAPI(this.id).then(res => {
          if (res.data.status) {
            this.ebookList = res.data.data.list;
          }
        })
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
  .doctorDetail {
    .DetailTit {
      width: 100%;
      position: fixed;
      z-index: 11;
      top: 0;
      left: 0;
      background: url("../../assets/img/detail/doctorbg.png") no-repeat;
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

    .doctorImg {
      width: 3.51rem;
      background: url("../../assets/img/detail/doctorbg.png") no-repeat;
      background-size: contain;
      padding: .5rem .12rem;
      border-bottom: .08rem solid #F5F5F5;
      /*padding: 0 .12rem .25rem;*/
      img {
        width: 1.13rem;
        height: 1.13rem;
        border: .04rem solid #fff;
        border-radius: .03rem;
        box-shadow: .02rem .02rem .08rem rgba(0, 0, 0, 0.2);
        margin: 0 auto;
      }
      h1 {
        font-size: .19rem;
        color: #333333;
        text-align: center;
        height: .3rem;
        padding-top: .15rem;
      }
      h2 {
        font-size: .14rem;
        font-weight: normal;
        color: #1A6DC2;
        text-align: center;
        height: .4rem;
      }
      p {
        line-height: .25rem;
        font-size: .14rem;
        color: #52575F;
        text-indent: 2em;
        margin-bottom: .25rem;

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

    .doctorTherapy {
      padding: 0 .12rem;

      .tit {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: .23rem;
        padding-bottom: .08rem;
        h1 {
          font-size: .17rem;
          height: .17rem;
          line-height: .19rem;
          background: url("../../../static/img/tit-r.png") no-repeat;
          padding-left: .18rem;
          background-size: contain;
        }
        .titleRight {
          display: flex;
          justify-content: flex-end;
          height: 0.1rem;
          line-height: 0.11rem;
          font-size: 0.13rem;
          color: #606773;
          img {
            width: 0.06rem;
            height: 0.1rem;
            padding-left: 0.03rem;
          }

        }
      }

      .list {
        padding: .12rem 0;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #EEEEEE;
        .info {
          width: 100%;
          h1 {
            color: #222222;
            font-size: .15rem;
            line-height: .21rem;
            margin-bottom: .12rem;
            /*.lineOne*/
          }
        }
        img {
          width: 1.1rem;
          height: .73rem;
        }

        .other {
          padding-top: 0rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          h2 {
            color: #FC2845;
            font-size: .13rem;
            font-weight: normal;
            span {
              font-size: .12rem;
              color: #0AB4BE;
            }
          }
          h3 {
            font-size: .11rem;
            color: #CBD0D9;
            font-weight: normal;
          }
          span {
            font-size: 0.12rem;
            color: #0AB4BE;
          }
        }
        .css1 {
          width: 2.22rem;
        }

      }

      .Booklist {
        padding: 0rem;
        li {
          width: 100%;
          padding: .14rem 0;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #EEEEEE;
          img {
            width: 0.8rem;
            height: 1.15rem
          }
          .info {
            width: 2.54rem;
            h1 {
              font-size: .16rem;
              color: #222222;
              height: .28rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            p {
              font-size: .13rem;
              color: #808287;
              line-height: .19rem;
              /*height: .6rem;*/
              margin-bottom: .2rem;
            }
            .other {
              display: flex;
              justify-content: space-between;
              h3 {
                color: #1A6DC2;
                font-size: .13rem;
                font-weight: normal;
              }
              h2 {
                color: #FC2845;
                font-size: .12rem;
                font-weight: normal;
              }
              span {
                font-size: 0.12rem;
                color: #0AB4BE;
              }
            }
          }

        }

      }

    }

  }

  .lineOne {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
