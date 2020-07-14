<template>
  <!--全部评论-->
  <div class="comment">

    <commentHeader></commentHeader>
    <!--评论列表-->
    <div class="commentsList">
      <comments></comments>
    </div>

    <!--我要评论-->
    <div class="iwant" @click="$router.push({path:'/toEvaluate',query:{id:$route.query.id,type:$route.query.type}})">
      我要评价
    </div>


  </div>
</template>

<script>
  import comments from '../../components/comments.vue';
  import commentHeader from '../../components/commentHeader.vue';

  export default {
    name: 'HelloWorld',
    data() {
      return {}
    },
    components: {comments,commentHeader},
    created() {
    },
    watch: {},
    methods: {},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .comment {
    /*列表*/
    .commentsList {
      padding-top:.44rem;
    }
    /*我要评价*/
    .iwant{
      position: fixed;
      bottom:.1rem;
      width: 3.35rem;
      height: .45rem;
      line-height: .45rem;
      text-align: center;
      font-size: .17rem;
      color: #fff;
      background: url("../../assets/img/detail/iwantBG.png") no-repeat;
      border-radius: .225rem;
      background-size: cover;
      margin:0 .2rem;
      box-shadow: .02rem .0rem .05rem .01rem rgba(35, 122, 188, 0.5);
    }
  }
</style>
