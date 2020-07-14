<template>
    <div class="myHeader">
      <div class="DetailTit">
        <div class="back" @click="$router.go(-1)">
          <img src="../assets/img/list/back.png" alt="">
        </div>
        <div class="set">
          {{$route.meta}}
        </div>
        <div class="send"></div>
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
        methods: {},
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.myHeader{
  .DetailTit {
    width: 100%;
    position: fixed;
    z-index: 12;
    top: 0;
    left: 0;
    background: url("../assets/img/list/top-bg.png") no-repeat;
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
        width: .11rem;
        height: .18rem;
      }
    }
    .set {
      color: #fff;
      font-size: .18rem;
      font-weight: bold;
      padding-right: .2rem;
    }
    .send{
      display: block;
      height: .31rem;
      line-height: .28rem;
      color: #fff;
      font-size: .15rem;
      padding-right: .12rem;

    }
  }
}
</style>
