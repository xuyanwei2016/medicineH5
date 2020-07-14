<template>
  <!--消息详情-->
  <div class="messageDetail">
    <myHeader></myHeader>

    <div class="detailCont" v-if="detail.title"><!--detail.title-->
      <h1>{{detail.title}}</h1>
      <div class="author">
        <span></span>
        <span v-if="detail.sendTime">{{setTime(detail.sendTime)}}</span>
      </div>
      <p v-html="detail.content">
      </p>
    </div>
    <noHave :mess="{top:winH,loading:loading}"  v-if="!detail.title"></noHave>
  </div>
</template>

<script>
  import noHave from '../../components/noHave.vue';
  import myHeader from '../../components/myHeader.vue';
  import {getMessageDetailAPI} from '@/api/home.js';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        detail:{title:'',},
        id:this.$route.query.id,
        winH:0,
        loading:0,
      }
    },
    components: {
      myHeader,
      noHave
    },
    created() {
      let winW=document.documentElement.clientWidth;
      this.winH=document.documentElement.clientHeight-(winW*44/375);
      this.getDetail();
    },
    watch: {},
    methods: {
      getDetail(){
        getMessageDetailAPI(this.id).then(res=>{
          if(res.data.status){
            this.detail=res.data.data;
            this.loading=2;
          }
        })
      },
      setTime(val){
        let time=val.split(/[\-:\s]/);
        return time[1]+'-'+time[2]+' '+time[3]+':'+time[4]
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .messageDetail {
    padding: .44rem 0 0;
    .DetailTit {
      width: 100%;
      position: fixed;
      z-index: 11;
      top: 0;
      left: 0;
      background: url("../../assets/img/list/top-bg.png") no-repeat;
      background-size: cover;
      padding-top: .33rem;
      height: .31rem;
      display: flex;
      justify-content: space-between;
      .back {
        width: .15rem;
        height: .15rem;
        padding-left: .12rem;
        padding-top: .05rem;
        img {
          width: .15rem;
          height: .15rem;
        }
      }
      .set {
        color: #fff;
        font-size: .18rem;
        font-weight: bold;
      }
      .send{
        width: .42rem;
        text-align: left;
        display: block;
        height: .31rem;
        line-height: .28rem;
        color: #fff;
        font-size: .15rem;
        /*padding-right: .12rem;*/

      }
    }
    .detailCont {
      width: 3.51rem;
      padding: 0 .12rem;
      h1 {
        font-size: .2rem;
        color: #202021;
        padding-top: .15rem;
        padding-bottom: .15rem;
        text-align: center;
      }
      .author {
        height: auto;
        line-height: .19rem;
        padding-bottom: .2rem;
        display: flex;
        justify-content: space-between;
        color: #BDC2CB;

        span:first-child{
          font-size: .13rem;
          width: 2.3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        span:last-child{
          font-size: .11rem;
          width: 1.2rem;
          text-align: right;
          display: inline-block;
        }
      }
      p{
        line-height: .25rem;
        font-size: .14rem;
      }
    }

  }
</style>
