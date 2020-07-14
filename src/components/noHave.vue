<template>
  <!--正在加载 没有数据-->

  <div class="tipsTWO" :style="{height: mess.top+'px'}">
    <div class="loading"  v-if="mess.loading==0">
      <img src="../assets/img/list/loading.gif" alt="">
      <h1>努力加载中...</h1>
    </div>
    <div class="noData" v-if="mess.loading==2">
      <img src="@/assets/img/list/noData.png" alt="">
      <h1>抱歉，暂无相关内容</h1>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'HelloWorld',
    props:['mess'],
    data() {
      return {
        winH:0,
      }
    },
    created() {
      console.log('*********',this.mess.top)
    },
    watch: {},
    methods: {},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .tipsTWO{
    position: relative;
    top: 0;
    bottom:0;
    /*正在加载*/
    .loading{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: .5rem;
        height: .5rem;
        padding-bottom: .3rem;
      }
      h1{
        font-size: .15rem;
        color: #fff;
        padding-left: .14rem;
      }

    }

    /*没有数据*/
    .noData {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        width: 1.41rem;
        height: 1.26rem;
        padding-bottom: .2rem;
      }
      h1 {
        font-size: .14rem;
        color: #999999;
        font-weight: normal;
      }
    }
  }

</style>
