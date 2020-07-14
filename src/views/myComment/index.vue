<template>
  <!--我的评论-->
  <div class="Collection">
    <div class="changTit">
      <div class="back" @click="$router.go(-1)"><img src="../../assets/img/list/back.png" alt=""></div>

      <div class="type">
        <div class="item" v-for="(item,index) in chang" :key="index" :class="isType==index?'active':''"
             @click="isType=index">{{item.name}}<span v-if="isType==index"></span></div>
      </div>

    </div>
    <div :style="{width:'3.75rem',overflowX:'hidden',overflowY:'auto',height:list.length>0?winH+'px':''}"
         v-infinite-scroll="load"
         infinite-scroll-disabled="disabled">
      <ul class="list" v-if="isType==0&&list.length>0" ref='remove'>
        <li v-for="(item,index) in list" :key="index" :style="moveId==item.id?slideEffect:''">
          <mt-cell-swipe
            :right="[
              {
                content: '删除',
                style: {color: '#fff',marginLeft:'0',fontSize:'.16rem'},
                handler: () => delBtn(item)
              }
            ]">
          <div class="blockCont">
            <img :src="imgLink(item.img)" alt="" v-if="item.img"
                 @click="linkDetail(item)">
            <div :class="item.img?'info css1':'info'">
              <h1 @click="linkDetail(item)">{{item.resourceName}}</h1>
              <div class="author">
                <div class="start"><img src="../../assets/img/detail/start1.png" alt="" v-for="itemS in item.score"></div>
                <h2>{{item.releaseTime}}</h2></div>
              <p :id="'intr'+index" @click="linkDetail(item)">{{Ellipsis('intr' + index, item.img?1:2, item.content, '.2')}}
                <!--{{Ellipsis('intr' + index, 2, item.intro, '.2')}}--></p>
            </div>
            <!--<h2>{{item.createTime}}</h2>-->
          </div>
          </mt-cell-swipe>
          <!--<div class="noneCont" @click.stop="delBtn(item)">删除</div>-->
        </li>
        <li class="moreOnly" v-if="!noMore">
          <div v-if="loading==1&&list.length>0">加载中...</div>
        </li>
        <li v-if="noMore&&list.length>10"><div class="noHave" >
          这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
        </div></li>
      </ul>

      <ul class="booklist" v-if="isType==1&&list.length>0" ref='remove'>
        <li v-for="(itemB,indexB) in list" :key="indexB" :style="moveId==itemB.id?slideEffect:''">
          <mt-cell-swipe
            :right="[
              {
                content: '删除',
                style: {color: '#fff',marginLeft:'0',fontSize:'.16rem'},
                handler: () => delBtn(itemB)
              }
            ]">
          <div class="blockCont">
            <img :src="imgLink(itemB.img)" alt="" v-if="itemB.img" @click="linkDetail(itemB)">
            <img src="../../assets/img/cover.png" alt="" v-else @click="linkDetail(itemB)">
            <div class="info">
              <h1 @click="linkDetail(itemB)">{{itemB.resourceName}}</h1>
              <div class="author">
                <span><img src="../../assets/img/detail/start1.png" alt="" v-for="itemK in itemB.score"></span>
                <h2>{{itemB.releaseTime}}</h2></div>
              <p :id="'intro'+indexB" @click="linkDetail(itemB)">{{Ellipsis('intro' + indexB, 3, itemB.content, '.19')}}
                <!--{{Ellipsis('intro' + indexB, 2, itemB.content, '.19')}}--></p>
              <!--<div class="other">
                <h3>广西师范大学出版社</h3>
                <h2>￥348.00</h2>
              </div>-->
            </div>
          </div>
          </mt-cell-swipe>
          <!--<div class="noneCont" @click.stop="delBtn(itemB)">删除</div>-->
        </li>
        <li class="moreOnly" v-if="!noMore">
          <div v-if="loading==1&&list.length>0">加载中...</div>
        </li>
        <li v-if="noMore&&list.length>10"><div class="noHave" >
          这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
        </div></li>
      </ul>

<!--      <div class="more" v-if="loading==1&&list.length>0">加载中...</div>
      <div class="noHave" v-if="noMore&&list.length>0">
        这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
      </div>-->
    </div>


    <!--<p v-if="loading==1" style="padding-top:1rem">正在加载中</p>-->
    <noHave v-if="(loading==2||loading==0)&&list.length==0" :mess="{top:winH,loading:loading}"></noHave>
  </div>
</template>

<script>
  import {getCommentListAPI} from '@/api/list.js';
  import {deleteCommentAPI} from '@/api/my.js';
  import axios from 'axios';
  import noHave from '../../components/noHave.vue';
  import {requestPath, uploadUrl} from '@/utils/global.js';

  var desW = 375,
    winW = document.documentElement.clientWidth, //动态获取设备的屏幕宽度
    ratio = winW / desW;
  let curWidth = ratio * 120;
  export default {
    name: 'HelloWorld',
    data() {
      return {
        chang: [{name: '特色疗法', code: '2-2'}, {name: '图书', code: '2-1'}],
        isType: 0,
        list: [],
        cancelFn: null,
        pageSize: 10,
        pageNum: 1,
        loading: 0,
        winH: 0,
        total: 0,
        moveId: null,
        startX: 0,//开始触摸的位置
        startY: 0,//开始触摸的位置
        moveX: 0,//滑动时的位置
        endX: 0,//结束触摸的位置
        disX: 0,//移动距离
        slideEffect: '',//滑动时的效果,使用v-bind:style="deleteSlider"
      }
    },

    components: {
      noHave
    },
    created() {
      /*this.isType=this.$route.query.resType==1?1:0;*/

      /*if(this.$route.query.resType==undefined){
        this.getCollect();
      }*/
    },
    watch: {
      isType(n, o) {
        /*this.$router.push({path:'/myComment',query:{resType:this.isType}});*/
        this.pageNum = 1;
        this.loading = 0;
        this.list = [];
        this.total = 0;
        this.getCollect();
      },
      /*$route(n,o){
        this.isType=this.$route.query.resType==1?1:0;
      },*/
    },
    computed: {
      noMore() {
        return this.list.length == this.total;
      },
      disabled() {
        return this.loading == 1 || this.noMore||this.total<=10;
      },
      token() {  //通过方法访问
        return this.$store.state.token;
      },
    },
    methods: {
      load() {
        this.loading = 1;
        this.pageNum += 1;
        this.getCollect();
      },


      getCollect() {
        /*this.loading = true;*/
        let data = {
          goodsType: this.chang[this.isType].code,
          pageNum: this.pageNum,
          pageSize: 10,
        };
        getCommentListAPI(data).then(res => {
          if (res.data.status) {
            this.loading = 2;
            let ary=res.data.data.list?res.data.data.list:[];
            this.list = [...this.list, ...ary];
            this.total = res.data.data.total;
          }
        })

        /*let API = this.$route.name == 'shelf' ? `${requestPath.orderfg}/order/page/buy` : requestPath.resourcefg+'/member-collection/page';*/
        /*let CancelToken = axios.CancelToken;
        this.cancelFn = CancelToken.source();// 这里初始化source对象
        axios.get(`${process.env.BASE_API}${API}`,{
          params: data
        }, {
          cancelToken: this.cancelFn.token // 这里声明的cancelToken其实相当于是一个标记，
                                         // 当我们要取消请求的时候，可以通过这个找到该请求
        })
        .then(res => {
          // 你的逻辑
          if (res.data.status) {
            this.loading=2;
            this.list = res.data.data.list;
          }
        })
        .catch(res => {
          this.$valert.show('取消请求')
          // 如果调用了cancel方法，那么这里的res就是cancel传入的信息
          // 你的逻辑
        })*/
      },
      cancel() {
        this.cancelFn.cancel('这里你可以输出一些信息，可以在catch中拿到')
      },

      touchStart: function (ev, id) {
        if (this.moveId != id) {
          this.slideEffect = 'transform:translateX(' + '-' + 0 + 'px)';
        }
        this.moveId = id;
        ev = ev || event;
        /*ev.preventDefault();*/

        if (ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          this.startX = ev.touches[0].clientX; // 记录开始位置
          this.startY = ev.touches[0].clientY; // 记录开始位置
        }
      },
      touchEnd: function (ev) {
        ev = ev || event;
        /*ev.preventDefault();*/
        this.endX = ev.changedTouches[0].clientX;
        /*if(this.endX>100){
          console.log('移动超过显示距离')
          this.slideEffect = "transform:translateX("+'-'+100+ "px)";
        }else{
          this.slideEffect = 'transform:translateX(0px)';
        }*/
        let btnWidth = this.$refs.remove.offsetWidth;
        /*let btnImg = this.$refs.btnImg.offsetWidth;*/
//                      console.log(ev.changedTouches);
        if (ev.changedTouches.length == 1) {
          let endX = ev.changedTouches[0].clientX;
          this.disX = this.startX - endX;
          if (this.disX > curWidth) {

            this.slideEffect = 'transform:translateX(' + '-' + curWidth / 2 + 'px);backgroundColor:#F6F6F6';
          } else if (this.disX != 0) {
            this.slideEffect = 'transform:translateX(' + '-' + 0 + 'px)';
          }

        }
      },

      touchMove: function (ev, id) {
        ev = ev || event;
        /*ev.preventDefault();*/
        let btnWidth = this.$refs.remove.offsetWidth;  //$refs 减少获取dom节点的消耗
        /*let btnImg = this.$refs.btnImg.offsetWidth;*/
        /*console.log(ev.targetTouches);
        console.log(ev.changedTouches);*/
        if (ev.touches.length == 1) {
          //滑动时距离浏览器左侧的距离
          this.moveX = ev.touches[0].clientX;
          let moveY= ev.touches[0].clientY;
          let x=Math.abs(this.startX - this.moveX),y=Math.abs(this.startY-moveY);
          if(y>x){return}

          //实时的滑动的距离-起始位置=实时移动的位置
          this.disX = this.startX - this.moveX;

          let num = this.slideEffect.match(/\d+/g) ? this.slideEffect.match(/\d+/g)[0] : 0;
          if (this.disX <= 0) {
            this.slideEffect = 'transform:translateX(' + 0 + 'px)';
          } else if (curWidth >= this.disX > 0) {
            if (num == curWidth) {
              return
            }
            this.slideEffect = 'transform:translateX(' + '-' + this.disX / 2 + 'px)';

            // 最大也只能等于删除按钮宽度
            /*if (this.disX >= btnWidth) {
              this.slideEffect = 'transform:translateX(' + (btnWidth - 375) + 'px)';
            }*/
          } else {
            this.slideEffect = 'transform:translateX(' + '-' + curWidth / 2 + 'px)';
          }
        }


      },

      delBtn(item) {
        if (!this.token) {
          this.$router.push('/loginPassword');
          return
        }
        deleteCommentAPI(item.id).then(res => {
          if (res.data.status) {
            this.$valert.show(`已刪除评论`);
            this.pageNum = 1;
            this.loading = 0;
            this.total = 0;
            this.list = [];
            this.getCollect();
          } else {
            this.$valert.show(res.data.msg);
          }
        })
      },

      linkDetail(item) {
        /*/commentDetail?id=096a2a9b4cf84cc99926b777e3f24a2d&mainId=184&type=1*/
        this.$router.push({
          path: '/commentDetail',
          query: {id: item.resourceId, mainId: item.id, type: item.resourceClass}
        });
      },


    },
    activated(){
      if(!this.$route.meta.isBack){
        this.winH = document.documentElement.clientHeight;
        this.list=[];
        this.loading=0;
        this.isType=0;
        this.pageNum=1;
        this.getCollect();
      }
      this.$route.meta.isBack=false;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .Collection {
    width: 3.75rem;
    height: 100%;
    .changTit {
      width: 3.75rem;
      position: fixed;
      z-index: 12;
      top: 0;
      left: 0;
      background: url("../../assets/img/list/top-bg.png") no-repeat;
      background-size: cover;
      height: .44rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .back {
        width: .1rem;
        height: .18rem;
        padding: .05rem .05rem .05rem .12rem;
        img {
          width: .1rem;
          height: .18rem;
        }
      }
      .type {
        height: .4rem;
        line-height: .39rem;
        width: 100%;
        padding: 0 .90rem 0 .70rem;
        display: flex;
        justify-content: space-between;

        .item {
          color: #D2E0F2;
          font-size: .18rem;
          font-weight: bold;
          text-align: center;
          span {
            margin: -3px auto 0;
            display: block;
            width: .25rem;
            height: 3px;
            background: #fff;
            border-radius: 2px;

          }
        }
        .active {
          color: #fff;
          /*border-bottom: .03rem solid #fff;
          border-radius:50%;*/

        }

      }
    }

    .list {
      padding: .45rem 0 0;
      li {
        width: 4.35rem;
        margin-right: 0;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        .blockCont {
          width: 3.51rem;
          margin: .15rem .12rem 0 .12rem;
          border-bottom: 1px solid #EEEEEE;
          display: flex;
          justify-content: space-between;
          .info{
            width: 100%;
          }
          h1 {
            font-size: .16rem;
            color: #222222;
            height: .28rem;
            line-height: .19rem;
            .lineone
          }
          .author {
            width: 100%;
            height: .2rem;
            display: flex;
            justify-content: space-between;
            .start {
              width: 1rem;
              height: .1rem;
              display: flex;  justify-content: flex-start;
              img {
                width: .1rem;
                height: .1rem;
                margin-right: .05rem
              }
            }
            h2 {
              color: #BCC1CB;
              font-size: .11rem;
              font-weight: normal;
            }
          }
          p {
            color: #808287;
            font-size: .13rem;
            line-height: .2rem;
            margin-bottom: .1rem;
          }
          h2 {
            text-align: right;
            color: #BCC1CB;
            font-weight: normal;
            font-size: .11rem;
            padding-bottom: .1rem;
          }
          img {
            width: 1.1rem;
            height: .73rem;
            padding-bottom: .1rem;
          }
          .css1 {
            width: 2.22rem;

          }
        }

      }

    }
    .noneCont {
      float: right;
      width: .6rem;
      height: 100%;
      background-color: #EE5931;
      right: 0;
      top: 0;
      position: absolute;
      color: #FFFFFF;
      font-size: .17rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .booklist {
      padding: .45rem 0 0;
      li {
        width: 4.35rem;
        margin-right: 0;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .blockCont {
          margin: .15rem .12rem 0 .12rem;
          padding-bottom: .1rem;
          border-bottom: 1px solid #EEEEEE;
          width: 3.51rem;
          display: flex;
          justify-content: space-between;
          img {
            width: 0.8rem;
            height: 1.15rem;
          }
          .info {
            width: 2.54rem;
            position: relative;
            h1 {
              font-size: .16rem;
              color: #222222;
              height: .32rem;
              line-height: .19rem;
              .lineone
            }
            .author {
              width: 100%;
              height: .22rem;
              display: flex;
              justify-content: space-between;
              span {
                width: .1rem;
                height: .1rem;
                display: flex;
                justify-content: flex-start;
                img {
                  width: .1rem;
                  height: .1rem;
                  margin-right: .05rem
                }
              }
              h2 {
                color: #BCC1CB;
                font-size: .11rem;
                font-weight: normal;
              }
            }
            p {
              font-size: .13rem;
              color: #808287;
              line-height: .19rem;

            }
            .other {
              width: 100%;
              position: absolute;
              bottom: .05rem;
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
            }
          }
        }

      }

    }
    .lineone {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }
</style>
