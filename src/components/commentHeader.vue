<template>
    <div class="commentHeader">
      <div class="DetailTit">
        <div class="back" @click="$router.go(-1)">
          <img src="../assets/img/detail/closeW.png" alt="">
        </div>
        <div class="set">
          {{$route.name=='toEvaluate'?'添加评论':$route.meta}}
        </div>
        <div class="send" @click="$route.name=='toEvaluate'&&send()">{{$route.name=='toEvaluate'?'提交':''}}</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {}
        },
        created() {
        },
        watch: {},
        methods: {
          send(){
            this.$emit('sendFrom');
          },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.commentHeader{
  .DetailTit {
    width: 100%;
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    background: url("../assets/img/list/top-bg.png") no-repeat;
    background-size: cover;
    padding-top: .13rem;
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
}
</style>
