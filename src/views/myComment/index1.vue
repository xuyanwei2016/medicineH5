<template>
  <!--我的评论-->
  <div class="myComment">
    <div class="changTit">
      <div class="back"><img src="../../assets/img/list/back.png" alt=""></div>

      <div class="type">
        <div class="item" v-for="(item,index) in chang" :key="index" :class="isType==index?'active':''"
             @click="isType=index">{{item.name}}<span v-if="isType==index"></span></div>
      </div>

    </div>

    <ul class="list" v-if="isType==0&&data.length>0">
      <li v-for="(item) in 3">
        <h1>中国民族医药的发展概况及其前景</h1>
        <div class="author">
          <span><img src="../../assets/img/detail/start1.png" alt="" v-for="item in 5"></span>
          <h2>2019-12-03 13:40:28</h2></div>
        <p>通过民族医药发展的历史回顾,针对民族医药学科建设存在的突出问题,提出民族医药学科建设的总体构想:凝练学科...</p>

      </li>
    </ul>

    <ul class="booklist" v-if="isType==1&&data.length>0">
      <li v-for="(item,index) in data" :key="index">
        <img src="../../../static/img/book1.png" alt="" class="head">
        <div class="info">
          <h1 @click="linkDetail(item.id)">生命的长调：蒙医</h1>
          <div class="author"><span><img src="../../assets/img/detail/start1.png" alt="" v-for="item in 3"></span>
            <h2>2019-12-03 13:40:28</h2></div>
          <p>该书不是单纯地将蒙医、蒙药及临床诊疗的理论干巴巴的堆积起来,而是巴的堆积起来,而是用通俗....</p>
          <!--<div class="other">
            <h3>广西师范大学出版社</h3>
            <h2>￥348.00</h2>
          </div>-->
        </div>
      </li>
    </ul>
    <!--<noHave v-else :top="'2rem'"></noHave>-->

  </div>
</template>

<script>
  import {getCommentListAPI} from '@/api/detail.js';
  import noHave from '../../components/noHave.vue';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        chang: [{name:'特色疗法',code:'39'},{name:'图书',code:'1'}],
        isType: 0,
        data:[],
        pageNum:1,
      }
    },
    components:{
      noHave
    },
    created() {
      this.getCommentList();
    },
    watch: {
      isType(n,o){
        this.getCommentList();
      }
    },
    methods: {
      /*获取评论列表*/
      getCommentList(){
        this.loading=0;
        getCommentListAPI({
          resourceClass: this.chang[this.isType].code,
          resourceId: null,
          pageNum:this.pageNum,
          pageSize:10,
        }).then(res=>{
          if(res.data.status){
            this.data=[...this.data,...res.data.data.list];
            this.total=res.data.data.total;
          }
          console.log(2222,this.data);
          this.loading = 2;
        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .myComment {
    .changTit {
      width: 100%;
      position: fixed;
      z-index: 12;
      top: 0;
      left: 0;
      background: url("../../assets/img/list/top-bg.png") no-repeat;
      background-size: cover;
      padding-top: .25rem;
      height: .4rem;
      display: flex;
      justify-content: space-between;
      .back {
        width: .11rem;
        height: .18rem;
        padding-left: .12rem;
        padding-top: .09rem;
        img {
          width: .11rem;
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

    .author{
      width: 100%;
      height: .2rem;
      display: flex;
      justify-content: space-between;
      span{
        width: .1rem;
        height: .1rem;
        display: flex;
        justify-content: flex-start;
        img{width: .1rem;
          height: .1rem;
        margin-right: .05rem}
      }
      h2{
        color: #BCC1CB;
        font-size: .11rem;
        font-weight: normal;
      }
    }

    .list {
      padding: .7rem .12rem 0 .12rem;
      li {
        padding-top: .15rem;
        border-bottom: 1px solid #EEEEEE;
        h1 {
          font-size: .16rem;
          color: #222222;
          height: .28rem;
        }
        p {
          color: #808287;
          font-size: .13rem;
          line-height: .2rem;
          padding-bottom: .1rem;
        }
        /*h2 {
          text-align: right;
          color: #BCC1CB;
          font-weight: normal;
          font-size: .11rem;
          padding-bottom: .1rem;
        }*/
      }

    }
    .booklist {
      padding: .7rem .12rem 0 .12rem;
      li {
        width: 100%;
        padding: .14rem 0;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #EEEEEE;
        .head {
          width: 0.8rem;
          height: 1.15rem;
        }
        .info {
          width: 2.54rem;
          h1 {
            font-size: .16rem;
            color: #222222;
            height: .3rem;
          }
          p {
            font-size: .13rem;
            color: #808287;
            line-height: .2rem;
            height: .6rem;
          }
        }

      }

    }

  }
</style>
