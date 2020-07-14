<template>
  <!--个人中心-->
  <div class="my">
    <div class="topCont"  @click="login">
      <img :src="info&&info.img?imgLink(info.img):defoultHead" alt="">
      <h1>{{token?(info.nickName?info.nickName:info.account):'登录'}}</h1>
    </div>
    <ul class="list">
      <li v-for="(item,index) in list" :key="index" @click="linkHref(item)"><h1><img :src="`./static/img/ico${index+1}.png`" alt="">{{item.name}}</h1><span><img
        src="../../assets/img/personal/iconleft.png" alt=""></span></li>

    </ul>


    <Foot></Foot>
  </div>
</template>

<script>
  import Foot from '../../components/Foot.vue';
  import defoultHead from '../../assets/img/personal/port.png';
  import {getMemberAPI} from '@/api/my.js';
  import Cookies from 'js-cookie';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        list:[
          {name:'我的订单',link:'/order'},
          {name:'我的收藏',link:'/collection?resType=0'},
          {name:'我的书架',link:'/shelf'},
          {name:'我的评论',link:'/myComment?resType=0'},
          {name:'我的设置',link:'/setPassword1'},
        ],
        info:{
          account:'',img:''
        },
        defoultHead:defoultHead,
      }
    },
    components: {
      Foot,
    },
    computed: {
      token() {  //通过方法访问
        return this.$store.state.token&&this.$store.state.token!='null'?true:false;
      },
    },
    created() {
      if(this.token){
        this.getMember();
      }

    },
    watch: {},
    methods: {
      getMember(){
        getMemberAPI(this.$store.state.userId).then(res=>{
          this.info=res.data.data;
        })
      },
      login(){
        if(this.token){
          this.$router.push('/edit');
        }else{
          this.$router.push('/loginPassword');
        }

      },
      linkHref(item){
        if(!this.token){
          this.$router.push('/loginPassword');
          return
        }
        this.$router.push(item.link);
        Cookies.set('phone',this.info.phone);
      },
    },
    /*beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta
      if(to.name=='collection'){
        to.meta.keepAlive = false;
      }
      next();
    }*/
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .my {
    width: 100%;
    .topCont {
      width: 100%;
      height: 2rem;
      background: url("../../assets/img/personal/myBG.png") no-repeat;
      background-size: cover;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        display: block;
        width: .8rem;
        height: .8rem;
        margin-top: .25rem;
        border: 3px solid #6b96b2;
        border-radius: 50%;
        margin-bottom: .14rem;
      }
      h1 {
        color: #fff;
        font-size: .16rem;
      }
    }

    .list {
      li {
        margin: 0 .13rem;
        padding: .16rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #EBEBEB;
        h1 {
          font-size: .15rem;
          color: #222222;
          font-weight: normal;
          height: .22rem;
          line-height: .22rem;
          display: flex;
          img {
            width: .22rem;
            height: .22rem;
            padding-right: .15rem;
            display: inline-block;
          }
        }
        span {
          img {
            width: .08rem;
            height: .14rem;
          }
        }
      }
    }

  }
</style>
