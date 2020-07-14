<template>
  <!--我的订单-->
  <div class="order">
    <myHeader></myHeader>

    <ul class="change">
      <li :class="isChange==index?'active':''" v-for="(item,index) in changes" :key="index" @click="changType(index)">{{item}}</li>
    </ul>

    <div :style="{width:'3.75rem',overflowX:'hidden',overflowY:'auto',height:list.length>0?winH+'px':''}"
         v-infinite-scroll="load"
         infinite-scroll-disabled="disabled"  infinite-scroll-distance="100">
    <!--已完成列表-->
    <ul  v-if="list.length>0" class="list">
      <li v-for="(item) in 4">
        <p>2019-12-03  13:40:28</p>
        <div class="code"><h2>订单编号：DX12254872</h2>
          <span  v-if="isChange==0" style="color:#1A6DC2">已支付</span>
          <span  v-if="isChange==1" style="color:#E01F36">未支付</span>
        </div>
        <h1>这里是课程标题生命的长调：蒙医</h1>
        <div class="price">合计：<span>￥</span><h3>348.00</h3></div>
        <div class="button" v-if="isChange==1">
          <span>取消订单</span>
          <span class="pay">立即支付</span>
          <span>删除</span>
        </div>
      </li>
      <li class="moreOnly" v-if="loading&&list.length>0">
        <div>加载中...</div>
      </li>
      <li v-if="list.length==total&&!loading">
        <div class="noHave" >
          这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
        </div></li>
    </ul>
    </div>

    <noHave v-if="list.length==0" :mess="{top:winH,loading:loading?0:2}" style="margin-top: .87rem"></noHave>

    <!--加载更多-->
  </div>
</template>

<script>
  import myHeader from '../../components/myHeader.vue';
  import noHave from '../../components/noHave.vue';
  import {getOrderListAPI} from '@/api/my.js';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        changes:['已完成订单','未完成订单'],
        isChange:0,
        list:[],
        winH:0,
        disabled: true,
        loading: true,
        total:0,
        pageNum:1,
      }
    },
    components: {myHeader,noHave},
    created() {
      let winW=document.documentElement.clientWidth;
      this.winH=document.documentElement.clientHeight-(winW*87/375);
      this.getOrderList();
    },
    watch: {},
    methods: {
      load() {
        let self=this;
        if((this.list.length>=this.total)&&!this.loading)return
        self.loading = true;
        self.disabled=true;
        self.pageNum += 1;
        self.getCollect();
      },
      changType(index){
        this.isChange=index;
        this.pageNum = 1;
        this.list = [];
        this.loading = true;
        this.disabled=true;
        this.getOrderList();
      },
      getOrderList(){
        getOrderListAPI().then(res=>{
          if(res.data.status){
            this.list=res.data.data.list;
            this.total=res.data.data.total;
            this.loading=false;
            if(this.list.length <this.total){
              this.disabled=false;
            }else{
              this.disabled=true;
            }
          }else{
            this.disabled=true;
          }

        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .order {
    .change{
      width:2.65rem;
      height: .42rem;
      border-bottom: 1px solid #E4E4E4;
      line-height: .42rem;
      display: flex;
      justify-content: space-between;
      padding:.44rem .55rem 0 .55rem;
      position: fixed;
      background: #fff;
      li{
        text-align: center;
        font-size: .16rem;
        color: #666666;
        /*height: .19rem;
        line-height: .19rem;*/
      }
      li:first-child:after{
        position: absolute;
        width: 1px;
        height: .19rem;
        background: #E5E5E5;
        content: '';
        margin-left: .55rem;
        margin-top: .1rem;
        /*border-right: 1px solid #E5E5E5;*/
      }
      .active{
        color:#145E9B;
        border-bottom: 1px solid #145E9B;
        font-weight: bold;
      }
    }

    .list{
      padding-top: 1.07rem;
      li{
        p{
          height: .3rem;
          line-height: .3rem;
          background: #f8f8f8;
          text-align: center;
          width: 100%;
          font-size: .11rem;
          color: #BCC1CB;
          border-bottom: 1px solid #EBEBEB;
        }
        .code{
          padding: 0 .12rem;
          height: .38rem;
          line-height: .38rem;
          display: flex;
          justify-content: space-between;
          color: #888888;
          font-size: .12rem;
          h2{font-weight: normal;font-size: .12rem;}
        }
        h1{background: #FAFAFA;padding: .19rem .12rem;font-size: .16rem;color: #222222;line-height: .18rem}
        .price{
          padding: 0 .12rem;
          height: .38rem;
          line-height: .38rem;
          display: flex;
          justify-content: flex-end;
          color: #333333;
          font-size: .14rem;
          border-bottom: 1px solid #EBEBEB;
          span{font-size: .14rem;color: #FC2845}
          h3{font-size: .16rem;color: #FC2845}
        }
        .button{
          display: flex;
          justify-content: flex-end;
          padding: .09rem  .12rem .09rem;
          span{
            text-align: center;
            display: inline-block;
            width: .8rem;
            height: .3rem;
            line-height: .3rem;
            border: 1px solid #E4E4E4;
            border-radius:.15rem;
            font-size: .13rem;
            margin-left: .06rem;
          }
          .pay{
            color: #145E9B;
            border-color:#145E9B;
          }
        }
      }
    }


  }
</style>
