<template>
  <!--资源列表-->
  <div class="resources"  :style="{height:winH+'px'}">
    <div class="bg">
      <div class="search">
        <div class="searchRight" @click="$router.go(-1)">
          <img src="../../assets/img/list/back.png" alt="">
        </div>

        <div class="searchLeft">
          <input type="text" placeholder="请输入疾病、药方、医书等" v-model="value" @keypress="keyFn">
          <img src="@/assets/img/list/icon_search_shanchu.png" alt=""  @click="value=''" v-if="value.trim()">
        </div>

      </div>
      <!--模块-->
      <div class="Modular">
        <div class="item" v-for="(item,index) in modulars" :key="index" :class="curModular==index?'active':''"
             @click="curModular=index">{{item.name}}<span v-if="curModular==index"></span></div>
      </div>
    </div>

    <div class="condition">
      <div class="left">
        <span v-for="(item,index) in conditions" :class="curCondition==index?'active':''" @click="curCondition=index">{{item.name}}</span>
      </div>
      <div :class="{right:true,active:isScreen}" @click="isScreen=!isScreen">筛选 <img
        :src="`./static/img/${isScreen?'screenB':'screen'}.png`" alt=""></div>

    </div>

    <div class="total">
      为您找到<span>{{total}}</span>条资源
    </div>

    <div class="dataList"  :style="{overflow:'auto',height:list.length>0?winH+'px':''}"   v-infinite-scroll="load" infinite-scroll-disabled="disabled" v-if="list.length>0">
      <!--全部 特色疗法 药材-->
      <ul v-if="(curModular==0||curModular==1||curModular==3)&&list.length>0" class="therapyList">
        <li v-for="(item,index) in list" :key="index">
          <div class="theryCss" v-if="item.resourceType!=2&&item.resourceType!=1">
            <img :src="imgLink(item.img)" alt="" v-if="item.img"   @click="linkDetail(item)">
            <div :class="item.img?'css1':'info'"  >
              <h1 v-html="item.name" @click="linkDetail(item)"></h1>
              <p  v-if="!item.img" :id="`description${index}`">{{Ellipsis(`description${index}`,2,item.description,'.19')}}</p>
              <div class="other"><!--||item.resourceType==32-->
                <span v-if="(item.resourceType==39)&&item.priceOption==0&&curModular!=3">免费</span>
                <h2 v-if="(item.resourceType==39)&&item.priceOption==1&&curModular!=3">￥{{item.realPrice?item.realPrice:'0.00'}}</h2>
                <span v-if="curModular==3||item.resourceType==32"></span>
                <h3>{{item.browseNum}}人浏览过</h3>
              </div>
            </div>
          </div>

          <div class="docOther"  v-if="item.resourceType==2||item.resourceType==1"  @click="linkDetail(item)">
              <div class="doc">
                <img :src="imgLink(item.img)" alt="" v-if="item.img">
                <img src="../../assets/img/cover.png" alt="" v-else>
                <div class="Nation" v-if="item.resourceType!=1">
                  <span></span>
                  <div><h1>{{item.nationsType}}</h1></div>
                  <span></span>
                </div>
              </div>

            <div class="info">
              <h1 v-html="item.name" @click="linkDetail(item)"></h1>
              <h2 v-if="item.resourceType==2">{{item.title}}</h2>
              <p :id="`info${index}`" :style="{marginBottom: item.resourceType==1?'0.22rem':''}">{{Ellipsis(`info${index}`,2,item.description,'.19')}}</p>

              <div class="other" v-if="item.resourceType==1">
                <h3>{{item.author}}</h3>
                <span v-if="item.priceOption==0">免费</span>
                <h2 v-else>￥{{item.realPrice?item.realPrice:'0.00'}}</h2>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!--医家-->
      <div class="doctorList" v-if="curModular==2&&list.length>0">
        <!--<pull-to :bottom-load-method="refresh" :bottom-config="BOTTOM_DEFAULT_CONFIG">-->
        <ul>

          <li v-for="(item,index) in list" :key="index">
            <div class="doc" @click="linkDetail(item)">
              <img :src="imgLink(item.img)" alt="">
              <div class="Nation">
                <span></span>
                <div><h1>{{item.nationsType}}</h1></div>
                <span></span>
              </div>
            </div>
            <div class="info">
              <h1 v-html="item.name" @click="linkDetail(item)"></h1>
              <h2>{{item.title}}</h2>
              <p :id="`info${index}`">{{Ellipsis(`info${index}`,2,item.description,'.19')}}</p>
            </div>
          </li>

        </ul>
        <!--</pull-to>-->
      </div>

      <!--图书-->
      <ul class="bookList" v-if="curModular==4&&list.length>0">
        <li  v-for="(item,index) in list" :key="index">
          <img  :src="imgLink(item.img)" v-if="item.img" alt="" @click="linkDetail(item)">
          <img  src="../../assets/img/cover.png" v-else alt="" @click="linkDetail(item)">
          <div class="info">
            <h1  @click="linkDetail(item)" v-html="item.name"></h1>
            <p :id="`bookinfo${index}`">{{Ellipsis(`bookinfo${index}`,2,item.description,'.19')}}</p>
            <div class="other">
              <h3>{{item.publisher?item.publisher[0].trim():''}}</h3>
              <h2>￥{{item.realPrice?item.realPrice:'0.00'}}</h2>
            </div>
          </div>
        </li>
      </ul>

      <div class="more" v-if="loading==1&&list.length>0">加载中...</div>
      <div class="noHave" v-if="noMore&&list.length>0">
        这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
      </div>
    </div>







    <!--没有数据-->
    <noHave v-if="(loading==2||loading==0)&&list.length==0" :mess="{top:winH,loading:loading}"></noHave>

    <!--筛选-->
    <div class="screen" v-if="isScreen">
      <ul>
        <li v-for="(itemNa,indexNa) in nationList" :key="indexNa" :class="curNation.includes(itemNa.id)?'active':''"
            @click="changeNation(itemNa,indexNa)">{{itemNa.name}}
        </li>
      </ul>
      <div class="button">
        <span @click="reset">重置</span>
        <span @click="sumbit">确定</span>
      </div>
    </div>

  </div>

</template>

<script>
  import noHave from '@/components/noHave.vue';
  import {getNationAPI, getListAPI} from '@/api/list';
  import {addHotswAPI} from '@/api/home';
  import PullTo from 'vue-pull-to'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        modulars: [{name: '全部', code: null}, {name: '特色疗法', code: 39}, {name: '医家', code: 2}, {
          name: '药材',
          code: 32
        }, {name: '图书', code: 1}],
        curModular: 0,
        conditions: [{name:'默认',code:null},{name:'最热',code:'browseNum desc'},{name:'最新',code:'uploadTime desc'}],
        curCondition: 0,
        nationList: [{name: '全部', id: 'null'}],
        curNation: ['null'],
        isScreen: false,

        pageNum: 1,
        pageSize: 10,
        loading: 0,
        list:[],
        total:0,
        winH:0,
        orderBy:null,
        value:'',
      }
    },
    components: {
      PullTo,
      noHave
    },
    computed: {
      noMore () {
        return this.list.length == this.total;
      },
      disabled () {
        return this.loading==1||this.noMore||this.total<=10;
      }
    },
    created() {
      if(this.$route.query.hig){
        this.winH=this.$route.query.hig;
      }else{
        let winW=document.documentElement.clientWidth;
        this.winH=document.documentElement.clientHeight-(winW*165/375);
      }

      this.value=this.$route.query.val?this.$route.query.val:'';
      this.curModular=this.$route.query.resType?this.$route.query.resType:0;
      if(this.$route.query.resType==undefined){
        this.getList();
      }

    },
    watch: {
      $route(n,o){
        this.curModular=this.$route.query.resType||0;
        /*this.total=0;
        this.list=[];
        this.pageNum=1;
        this.loading=1;*/
        this.value=this.$route.query.val?this.$route.query.val:'';
        /*this.getList();*/
      },
      curModular(n, o) {
        this.$router.push({path:this.$route.fullPath,query:{resType:n}});
        /*this.total=0;*/
        this.list=[];
        this.pageNum=1;
        this.loading=1;
        this.getList();
      },
      isScreen(n, o) {
        if (n) {
          let {length: len} = this.nationList;
          if (len > 1) return;
          getNationAPI().then(res => {
            let obj = res.data.data;
            Object.keys(obj).forEach((item) => {
              let itemObj={
                id:item,
                name:obj[item]
              };
              this.nationList.push(itemObj)
            })
          })
        }
      },
      curCondition(n,o){
        this.list=[];
        this.pageNum=1;
        this.loading=0;
        this.orderBy=this.conditions[n].code;
        this.getList();

      },
      value(n,o){
        if(n==''){
          this.list=[];
          this.pageNum=1;
          this.loading=0;
          this.$router.push('/list')
          this.getList();
        }else{
        }
      }
    },
    methods: {
      load () {
        this.loading = 1;
        this.pageNum += 1;
        this.getList();
      },
      keyFn(e) {
        if (e.keyCode === 13) {
          if(this.value.trim()==''){this.$valert.show('请输入内容');return};
          this.$router.push({path:this.$route.fullPath,query:{val:this.value}});
          this.pageNum=1;
          this.loading=0;
          this.list=[];
          this.total=0;
          this.getList();
          this.addHotsw(this.value.trim());
        }
      },
      /*添加热词*/
      addHotsw(val){
        addHotswAPI({
          content:val
        }).then(res=>{

        })
      },
      /*列表*/
      getList() {
        /*资源类型 31理论 32药物 33方剂 34临床 35医案 36文化 37机构 38医论 48其他 1医著 2医家 39特色疗法*/
        let data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          resourceType: this.modulars[this.curModular].code,
          orderBy:this.orderBy,
          content:this.value.trim(),
          nationsType:this.curNation.includes('null')?null:this.curNation,
        };
        getListAPI(data).then(res => {
          if (res.data.status) {
            this.isScreen=false;
            this.loading = 2;
            this.list=[...this.list,...res.data.data.resList];
            this.total=res.data.data.totalCount;
          }

        })
      },

      changeNation(item) {
        if (item.id == 'null') {
          this.curNation = ['null'];
        } else {
          if (this.curNation.includes('null')) {
            this.curNation = [];
          }

          if (this.curNation.includes(item.id)) {
            let index = this.curNation.findIndex(function (value, index, arr) {
              return value == item.id;
            })
            this.curNation.splice(index, 1);
            this.curNation.length == 0 ? this.curNation.push('null') : true;
          } else {
            this.curNation.push(item.id);
          }
        }
      },
      /*确定*/
      sumbit(){
        this.pageNum = 1;
        this.loading = 0;
        this.total = 0;
        this.list=[];
        this.getList();
      },
      /*重置*/
      reset(){
        this.curNation=['null'];
        this.pageNum = 1;
        this.loading = 0;
        this.total = 0;
        this.list=[];
        this.getList();
      },

      /*详情*/
      linkDetail(item){
        let obj={1:'/bookDetail',2:'/doctorDetail',32:'/read',39:'/read'};
        this.$router.push({path:obj[item.resourceType],query:{id:item.id}});
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .resources {
    .bg {
      position: fixed;
      z-index: 11;
      top: 0;
      left: 0;
      width: 100%;
      height: 1rem;
      background: url("../../assets/img/list/top-bg.png") no-repeat;
      .search {
        height: 0.44rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .searchLeft {
          margin-right: 0.23rem;
          width: 3.1rem;
          height: 0.33rem;
          position: relative;
          input {
            background: url("../../assets/img/list/nav_search.png") no-repeat #F1F1F1 0.1rem center;
            background-size: 0.13rem 0.14rem;
            width: 2.4rem;
            height: 0.33rem;
            line-height: 0.33rem;
            border-radius: 0.17rem;
            border: none;
            padding-left: 0.3rem;
            padding-right: 0.3rem;
            font-size: 0.14rem;
            color: #084E80;
          }
          input::-webkit-input-placeholder {
            color: #084E80;
          }
          input::-o-input-placeholder {
            color: #084E80;
          }
          input::-moz-input-placeholder {
            color: #084E80;
          }
          input::-ms-input-placeholder {
            color: #084E80;
          }
          img {
            width: 0.14rem;
            height: 0.14rem;
            /*margin-top: -0.3rem;*/
            position: absolute;
            right: 0.09rem;
            top: 0.09rem;
          }
        }
        .searchRight {
          width: 0.4rem;
          height: 0.33rem;
          padding-left: 0.15rem;
          text-align: left;
          img {
            width: .1rem;
            height: .18rem;
            padding-top: .08rem;
          }

        }

      }

      .Modular {
        height: .5rem;
        line-height: .5rem;
        /*width: 100%;*/
        padding: 0 .34rem;
        display: flex;
        justify-content: space-between;

        .item {
          color: #D2E0F2;
          font-size: .16rem;
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

    .condition {
      position: fixed;
      z-index: 11;
      top: 1rem;
      height: .4rem;
      background: #fff;
      display: flex;
      justify-content: space-between;
      width: 100%;
      border-bottom: 1px solid #E3E3E3;
      .left {
        padding-left: .26rem;
        font-size: .14rem;
        width: 2.12rem;
        color: #777;
        display: flex;
        justify-content: space-between;
        span {
          height: .4rem;
          line-height: .4rem;
          display: inline-block;
        }
        .active {
          color: #095E9B;
        }
      }
      .right {
        font-size: .14rem;
        color: #777;
        padding-right: .26rem;
        padding-left: .33rem;
        margin-top: .08rem;
        height: .24rem;
        line-height: .24rem;
        border-left: 1px solid #E3E3E3;
        img {
          width: .11rem;
          display: inline-block;
          margin-top: -.01rem;
        }
      }
      .active {
        color: #095E9B;
      }
    }

    .total {
      padding-top: 1.41rem;
      width: 100%;
      text-align: center;
      height: .24rem;
      line-height: .24rem;
      background: #F7F7F7;
      font-size: .12rem;
      color: #9A9A9A;
      span {
        color: #DD3549;
      }
    }

    /*列表*/
    .dataList {
      /*特色疗法 药材列表*/
      .therapyList {

        li{
          margin: 0 .15rem;
          padding: .12rem 0;

          border-bottom: 1px solid #EEEEEE;
          .theryCss{
            display: flex;
            justify-content: space-between;
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
              span{
                font-size: .12rem;
                color: #0AB4BE;
              }
            }
            .css1 {
              width: 2.22rem;
              h1 {
                color: #222222;
                font-size: .15rem;
                margin-bottom: .1rem;
                height: .4rem;
                line-height: .21rem;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              p {
                color: #808287;
                font-size: .13rem;
                line-height: .19rem;
                margin-bottom: .1rem;
              }
            }
          }

          .docOther {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .doc{
              position: relative;
              width: .80rem;
              height: 1.15rem;
              img {
                width: .8rem;
                height: 1.15rem;
              }
              .Nation {
                width: auto;
                height: 0.12rem;
                position: relative;
                z-index: 10;
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
              width: 2.5rem;
              h1 {
                color: #222222;
                font-size: .16rem;
                height: .3rem;
                .lineOne
              }
              h2 {
                font-weight: normal;
                color: #1A6DC2;
                font-size: .14rem;
                height: .31rem;

              }
              p {
                line-height: .19rem;
                color: #808287;
                font-size: .13rem;
              }
              .other {
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
                  font-size: .13rem;
                  color: #1A6DC2;
                  font-weight: normal;
                }
                span{
                  font-size: .12rem;
                  color: #0AB4BE;
                }
              }

            }
          }
        }
      }

      /*医家列表*/
      .doctorList {
        /*position: fixed;
        top: 1.51rem;
        left: .14rem;
        right: .14rem;
        bottom: 0;
        height: 100%;*/
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
              z-index: 10;
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
              .lineOne
            }
            h2 {
              font-weight: normal;
              color: #1A6DC2;
              font-size: .14rem;
              height: .31rem;

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
              margin-bottom: .28rem;
              /*height: .6rem;*/
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
            }
          }

        }

      }
    }

    /*筛选*/
    .screen {
      width: 100%;
      height: 100%;
      position: fixed;
      background: #fff;
      padding-top: 1.7rem;
      top: 0;
      left: 0;
      z-index: 10;
      ul {
        padding: 0 0 0 .15rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        li {
          width: .78rem;
          margin-right: .09rem;
          height: .31rem;
          line-height: .31rem;
          text-align: center;
          border: 1px solid #D2D6D9;
          border-radius: .03rem;
          font-size: .13rem;
          color: #3C3F46;
          margin-bottom: .09rem;
        }
        .active {
          border-color: #DE6209;
          color: #DE6209;
        }
      }
      .button {
        width: 2.92rem;
        padding: 0 .4rem;
        position: fixed;
        display: flex;
        justify-content: space-between;
        bottom: .5rem;
        z-index: 12;
        span {
          display: block;
          width: 1.4rem;
          height: .4rem;
          background: #EEEEEE;
          text-align: center;
          line-height: .4rem;
          color: #333333;
          font-size: .15rem;
        }
        span:last-child {
          background: url("../../assets/img/list/okBG.png") no-repeat;
          background-size: cover;
          color: #fff;
          font-size: .17rem;
        }
      }
    }

  }
  .lineOne{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
