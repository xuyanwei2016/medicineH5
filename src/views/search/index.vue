<template>
  <!--搜索页-->
  <div class="searchAll">
    <searchOne @sonFn="fatFn"></searchOne>
    <div class="title" v-if="history.length>0">
      <h1>历史记录</h1>
      <img src="@/assets/img/list/delete.png" alt="" @click="deleteBtn">
    </div>
    <!--历史记录-->
    <div class="record bg1">
      <ul>
        <li v-for="(item,index) in history" :key="index" @click="search(item)" v-if="index<10">{{item.length>10?item.substring(0,10)+'...':item}}</li>
      </ul>
    </div>

    <div class="title">
      <h1>热门搜索</h1>
      <!--<img src="@/assets/img/list/delete.png" alt="">-->
    </div>

    <!--热门搜索-->
    <div class="record bg2">
      <ul>
        <li v-for="(item,index) in hotList" :key="index" @click="search(item.hotSearchWord)">{{item.hotSearchWord}}</li>
      </ul>
    </div>

    <!--自动补全-->
    <ul class="list" v-if="list&&list.length>0&&value!=''">
      <li v-for="(item,index) in list" :key="index" @click="clickFn(item)"><span>{{item}}</span> <img src="../../assets/img/personal/iconleft.png" alt=""/></li>
    </ul>
  </div>
</template>

<script>
  import {getHotAPI} from '@/api/list.js';
  import {getCompletionAPI,addHotswAPI} from '@/api/home.js';
  import searchOne from '../../components/searchOne.vue';
  import Cookies from 'js-cookie';
  import $ from 'jquery';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        list:[],
        hotList:[],
        history:[],
        value:'',
        winH:0,
      }
    },
    components:{
      searchOne
    },
    created() {
      let winW=document.documentElement.clientWidth;
      this.winH=document.documentElement.clientHeight-(winW*165/375);
      this.history=Cookies.get('history')?JSON.parse(Cookies.get('history')):[];
      this.getHot();
    },
    watch: {},
    methods: {
      getHot(){
        getHotAPI().then(res=>{
          this.hotList=res.data.data;
        })
      },
      search(value){
        this.$router.push({path:'/list',query:{val:value}});
        this.clickFn(value);
      },
      /*添加热词*/
      addHotsw(val){
        addHotswAPI({
          content:val
        }).then(res=>{

        })
      },
      fatFn(data){
        this.value=data.val;
        getCompletionAPI({
          content:data.val,
          pageNum:1,
          pageSize:10,
        }).then(res=>{
          this.list=res.data.data;
          if(this.list.length==0&&data.boo){
            this.clickFn(data.val);
          }
        })

      },
      clickFn(value){
        this.$router.push({path:'/list',query:{val:value,hig:this.winH}});
        this.addHotsw(value);
        let curIndex=this.history.findIndex(function(item, index, arr) {
          return item == value;
        });
        if(curIndex>=0){
          this.history.splice(curIndex,1);
        }
        this.history=[value,...this.history];
        Cookies.set('history',JSON.stringify(this.history));


        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        $(window).on('resize', function (e) {
          var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
          if (clientHeight > nowClientHeight) {
            //键盘弹出的事件处理，隐藏底部导航栏
            $("#plugin-contact-ring2").hide();
          }
          else {
            //键盘收起的事件处理，显示底部导航栏
            $("#plugin-contact-ring2").show();
          }
        })




      },

      deleteBtn(){
        this.history=[];
        Cookies.set('history',JSON.stringify(this.history));
      },

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .searchAll {
    width: 100%;
    .search {
      background: url("../../assets/img/list/top-bg.png") no-repeat;
      padding-top: 0.26rem;
      height: 0.38rem;
      display: flex;
      justify-content: space-between;
      .searchLeft {
        margin-left: 0.15rem;
        width: 3rem;
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
        padding-right: 0.08rem;
        text-align: left;
        span {
          font-size: 0.14rem;
          color: #F6F6F6;
          line-height: 0.33rem;
        }

      }

    }

    .title {
      padding: 0.2rem 0.12rem 0.16rem 0.12rem;
      display: flex;
      justify-content: space-between;
      h1 {
        font-size: 0.15rem;
        color: #222;
        font-weight: bold;
      }
      img {
        width: 0.16rem;
        height: 0.16rem;

      }
    }
    .record {
      overflow: hidden;
      padding: 0 0.12rem;
      ul {
        li {
          float: left;
          display: block;
          height: .2rem;
          line-height: .2rem;
          margin-right: 0.12rem;
          padding: 0.06rem 0.12rem;
          border-radius: 0.03rem;
          font-size: 0.14rem;
          color: #555961;
          margin-bottom: 0.13rem;
        }
      }
    }
    .bg1 ul li {
      border: 1px solid #B1CEE4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bg2 ul li{
      background: #E4EDF4;
    }

    .list{
      width: 100%;
      height: 100%;
      margin-top: .44rem;
      position: fixed;
      top: 0;
      left: 0;
      background: #fff;
      padding-top: .2rem;
      li{
        margin: 0  .15rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #EEEEEE;
        line-height: .4rem;
        height: .4rem;
        font-size: .13rem;
        span{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 3.3rem;
        }

        img{
          width: .07rem;
          height: .12rem;
        }
      }



    }

  }
</style>
