<template>
    <div class="pay">
      <!--立即支付-->
      <div class="payment" v-if="isType==2" @click.stop="">
        <div class="money">
          <h1>支付金额：</h1>
          <h2>￥180.00</h2>
        </div>
        <ul>
          <li><h1><img src="../../assets/img/detail/zfb.png" alt="">支付宝</h1> <span><img  src="../../assets/img/detail/change1.png" alt=""></span></li>
          <li><h1><img src="../../assets/img/detail/wx.png" alt="">微信</h1> <span><img  src="../../assets/img/detail/change2.png" alt=""></span></li>
        </ul>
        <div class="botton">
          立即支付
        </div>
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
.pay{
  /*立即购买*/
  .payment {
    width: 100%;
    height: 2.3rem;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: .1rem .1rem 0 0;
    .money{
      height: .46rem;
      padding: .2rem .25rem 0 .25rem;
      display: flex;
      justify-content: space-between;
      h1{font-size: .14rem; color: #333333;font-weight: normal}
      h2{font-size: .15rem; color: #E01F36;font-weight: normal}
    }
    ul{
      padding: 0 .255rem .04rem .255rem;
      li{
        display: flex;
        justify-content: space-between;
        height: .36rem;
        border-bottom: 1px solid #EBEBEB;
        margin-bottom: .14rem;
        h1{
          height: .21rem;
          line-height: .21rem;
          font-size: .14rem;
          color: #333;
          font-weight: normal;
          img{
            width: .21rem;
            height: .21rem;
            margin-right: .09rem;
            display: inline-block;
          }
        }
        span{
          img{
            width: .2rem;
            height: .2rem;
          }
        }

      }
    }
    .botton{
      width: 3.3rem;
      height: .4rem;
      line-height: .4rem;
      text-align: center;
      color: #fff;
      font-size: .16rem;
      background: url("../../assets/img/detail/buyBG.png") no-repeat;
      background-size: contain;
      margin: 0 auto;
    }
  }
}
</style>
