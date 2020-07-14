<template>
  <!--加載更多-->
  <div class="nationDetail">
    <div style="position: fixed;top: 0;left:0;width: 100%">
      <div class="DetailTit">
        <div class="back" @click="$router.go(-1)">
          <img src="../../assets/img/list/back.png" alt="">
        </div>
        <div class="set">
          {{nation}}
        </div>
        <div class="send"></div>
      </div>
      <div class="bg">
        <img :src="imgLink(bg)" alt="">
      </div>





      <div class="Modular">
        <div class="item" v-for="(item,index) in change" :key="index" :class="curModular==index?'active':''"
             @click="curModular=index">{{item.name}}
        </div>
      </div>
    </div>
    <div class="dataList" :style="{overflow:'auto',height:list.length>0?winH+'px':''}"  v-infinite-scroll="load" infinite-scroll-disabled="disabled" infinite-scroll-distance="100">



      <!--特色疗法-->
      <ul v-if="(curModular==0||curModular==2)&&list.length>0" class="therapyList">
        <li v-for="(item,index) in list" :key="index">
          <img :src="imgLink(item.img)" alt="" v-if="item.img" @click="linkDetail('/read',item.id)">
          <div :class="item.img?'info css1':'info'">
            <h1 v-html="item.name" @click="linkDetail('/read',item.id)"></h1>
            <p :id="`description${index}`" @click="linkDetail('/read',item.id)">{{Ellipsis(`description${index}`, 2, item.synopsis||item.description, '.19')}}</p>

            <div class="other">
              <h2  v-if="item.priceOption==1&&curModular==0">￥{{item.realPrice ? item.realPrice : '0.00'}}<!--<span>免费</span>--></h2>
              <span  v-if="item.priceOption!=1&&curModular==0">免费</span>
              <span v-if="curModular==2"></span>

              <h3>{{item.browseNum}}人浏览过</h3>
            </div>
          </div>
        </li>
      </ul>



      <!--医家-->
      <ul class="doctorList" v-if="curModular==1&&list.length>0">
        <li v-for="(item,index) in list" :key="index">
          <div class="doc">
            <img :src="imgLink(item.img)" alt="" @click="linkDetail('/doctorDetail',item.id)">
            <div class="Nation">
              <span></span>
              <div><h1>{{item.nationsType}}</h1></div>
              <span></span>
            </div>
          </div>
          <div class="info">
            <h1 @click="linkDetail('/doctorDetail',item.id)">{{item.name}}</h1>
            <h2>{{item.title}}</h2>
            <p :id="`info${index}`" @click="linkDetail('/doctorDetail',item.id)">{{Ellipsis(`info${index}`, 2, item.description, '.19')}}</p>
          </div>
        </li>
      </ul>


      <!--图书-->
      <ul class="bookList"  v-if="curModular==3&&list.length>0">
        <li v-for="(item,index) in list" :key="index">
          <img :src="imgLink(item.img)" alt="" @click="linkDetail('/bookDetail',item.id)" v-if="item.img">
          <img src="../../assets/img/cover.png" alt="" @click="linkDetail('/bookDetail',item.id)" v-else>
          <div class="info">
            <h1 @click="linkDetail('/bookDetail',item.id)">{{item.name}}</h1>
            <p :id="`bookinfo${index}`" @click="linkDetail('/bookDetail',item.id)">{{Ellipsis(`bookinfo${index}`, 2, item.description, '.19')}}</p>
            <div class="other">
              <h3>{{item.author}}</h3>
              <h2 v-if="item.realPrice&&item.realPrice!='0.00'&&item.realPrice!='0'">￥{{item.realPrice}}</h2>
              <h4 v-else>免费</h4>
            </div>
          </div>
        </li>
      </ul>

      <div class="more" v-if="loading&&list.length>0">加载中...</div>
      <div class="noHave" v-if="list.length==total&&!loading">
        这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
      </div>
    </div>
    <noHave v-if="list.length==0" :mess="{top:winH,loading:loading?0:2}"></noHave>
  </div>
</template>

<script>
  import {getListAPI} from '@/api/list';
  import noHave from '@/components/noHave.vue';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        list:[],
        pageNum:1,
        pageSize:10,
        winH:0,
        disabled: true,
        loading: true,
        total:0,
        curModular: 0,
        change: [{name: '特色疗法', code: '39'}, {name: '医家', code: '2'}, {name: '药材', code: '32'}, {
          name: '图书',
          code: '1'
        }],
        nation:'',
        bg:'',
      }
    },
    created() {
      this.nation=this.$route.query.val;
      this.bg=this.$route.query.bg;
      let winW=document.documentElement.clientWidth;
      this.winH=document.documentElement.clientHeight-(winW*262/375);
      /*this.getList();*/
    },
    components:{noHave},
    watch: {
      curModular(n, o) {
        this.pageNum=1;
        this.list=[];
        this.disabled=true;
        this.loading=true;
        this.getList();
      },
    },
    computed:{
      /* disabled () {
         return true;
       },*/
    },
    methods: {
      load () {
        let slef=this;
        if((this.list.length>=this.total)&&!this.loading)return
        this.loading=true;
        /*setTimeout(()=>{*/
        slef.disabled=true;
        slef.pageNum++;
        slef.getList();
        /*},10000)*/
      },
      getList(){
        let self=this;
        let data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          nationsType: [this.$route.query.id],
          resourceType: this.change[this.curModular].code,
        };
        getListAPI(data).then(res => {
          if (res.data.status) {

            /*res.data.data.pageNum = val.pageNum;*/

            self.loading=false;
            self.list=[...self.list,...res.data.data.resList];
            self.total=res.data.data.totalCount;
            if(self.list.length<self.total){
              self.disabled=false;
            }else{
              self.disabled=true;
            }

          }else{
            this.disabled=true;
          }

        })
      },
      linkDetail(link,id){
        this.$router.push({path:link,query:{id:id}})
      },
    },
    activated(){
      if(!this.$route.meta.isBack){

        this.list=[];
        this.loading=true;
        this.curModular=0;
        this.pageNum=1;
        this.nation=this.$route.query.val;
        this.bg=this.$route.query.bg;
        this.getList();
      }
      this.$route.meta.isBack=false;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .nationDetail{
    padding-top: 2.62rem;
    .DetailTit {
      width: 100%;
      position: fixed;
      z-index: 12;
      top: 0;
      left: 0;
      background-size: cover;
      padding-top: .13rem;
      height: .31rem;
      display: flex;
      justify-content: space-between;
      .back {
        width: .11rem;
        height: .18rem;
        padding-left: .12rem;
        padding-top: .05rem;
        img {
          width: .11rem;
          height: .18rem;
        }
      }
      .set {
        color: #fff;
        font-size: .18rem;
        font-weight: bold;
      }
      .send {
        display: block;
        height: .31rem;
        line-height: .28rem;
        color: #fff;
        font-size: .15rem;
        padding-right: .12rem;

      }
    }
    .bg {
      width: 100%;
      height: 2.11rem;
      background: url("../../assets/img/detail/nationBG.png") no-repeat;

      background-size: cover;
      img {
        width: 100%;
        height: 2.11rem;
      }
    }


    .Modular {
      height: .5rem;
      line-height: .5rem;
      /*width: 100%;*/
      padding: 0 .34rem;
      background: #F6F8FE;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #F1F3F8;
      .item {
        color: #333333;
        font-size: .15rem;
        font-weight: bold;
      }
      .active {
        color: #155E9D;
        border-bottom: .03rem solid #155E9D;
      }
    }





  }

  .dataList{
    /*padding-top: .55rem;*/
    /*特色疗法 药材列表*/
    .therapyList {

      li {
        margin: 0 .15rem;
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
            padding-bottom: .13rem;
            .lineOne
          }
          p {
            color: #808287;
            font-size: .13rem;
            line-height: .19rem;
            margin-bottom: .1rem;
          }
        }
        img {
          width: 1.1rem;
          height: .73rem;
        }

        .other {
          display: block;
          padding-top: .05rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          h2 {
            color: #FC2845;
            font-size: .13rem;
            font-weight: normal;

          }
          h3 {
            font-size: .11rem;
            color: #CBD0D9;
            font-weight: normal;
          }
          span {
            font-size: .12rem;
            color: #0AB4BE;
          }
        }
        .css1 {
          width: 2.22rem;
        }
      }
    }


    /*医家列表*/
    .doctorList {
      padding: 0 .14rem;
      li {
        padding-top: .14rem;
        height: 1.36rem;
        border-bottom: 1px solid #EEEEEE;
        display: flex;
        justify-content: space-between;
        .doc {
          position: relative;
          width: .95rem;
          height: 1.225rem;
          img {
            width: .95rem;
            height: 1.225rem;
          }
          /*.Nation{
            display: block;
            height: .12rem;
            line-height: .12rem;
            position: relative;
            right: 0;
            bottom: 0.1rem;
            color: #fff;
            font-weight: normal;
            z-index: 11;
            overflow: auto;
            width: auto;

            span{
              display: block;
              font-size: .16rem;
              transform:scale(0.5);
              -webkit-transform:scale(0.5);
              -moz-transform:scaleX(0.5);
              -o-transform:scaleX(0.5);
              -ms-transform:scaleX(0.5);
              overflow: hidden;
              background:#19307F;
              height: .12rem;
              padding: 0.1rem 0;
              margin-top: -0.1rem;
            }
          }*/
          /*.Nation:before{
            height: .12rem;
            width: .26rem;
            left: 0;
            top: 0;
            padding: 0;
            margin: 0;
            content: '';
            position: absolute;
            background: url("../../../static/img/biaoqian-2.png") 0.15rem 0 no-repeat ;
            background-size: 100%;
          }
          .Nation:after{
            height: .12rem;
            width: .26rem;
            padding: 0;
            margin: 0;
            right: 0;
            top: 0;
            content: '';
            position: absolute;
            background: url("../../../static/img/biaoqian-2.png") -0.15rem 0 no-repeat;
            background-size:100%;
            z-index: -1;
          }*/
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
            background: url("../../../static/img/biaoqian-2.png") no-repeat;
            background-size: cover;
          }
          .Nation span:last-child {
            display: block;
            width: .05rem;
            height: .12rem;
            content: '';
            background: url("../../../static/img/biaoqian-2.png") right top no-repeat;
            background-size: cover;
            padding-left: 0rem;
          }
        }
        .info {
          width: 2.38rem;
          h1 {
            color: #222222;
            font-size: .16rem;
            height: .28rem;
          }
          h2 {
            font-weight: normal;
            color: #1A6DC2;
            font-size: .14rem;
            height: .31rem;
            .lineOne

          }
          p {
            line-height: .19rem;
            color: #808287;
            font-size: .13rem;
          }

        }
      }
    }

    /*图书列表*/
    .bookList {
      padding: 0 .13rem;
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
            .lineOne
          }
          p {
            font-size: .13rem;
            color: #808287;
            line-height: .19rem;
            margin-bottom: .2rem;
          }
          .other {
            display: flex;
            justify-content: space-between;
            h3 {
              color: #1A6DC2;
              font-size: .13rem;
              font-weight: normal;
              width: 1.9rem;
              .lineOne
            }
            h2 {
              color: #FC2845;
              font-size: .12rem;
              font-weight: normal;
            }
            h4 {
              color: #0AB4BE;
              font-size: .12rem;
              font-weight: normal;
            }
          }
        }

      }

    }

  }
  .lineOne{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
