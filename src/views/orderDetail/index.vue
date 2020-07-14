<template>
  <!--订单详情-->
    <div class="orderDetail">
      <myHeader></myHeader>
      <div class="detials">
        <div class="type"><img src="../../assets/img/personal/ok.png" alt="">已完成</div>
        <div class="type noBold"><img src="../../assets/img/personal/Sigh.png" alt="">下单后24小时内可完成支付，否则系统将自动取消订单。</div>
        <div class="info">
          <img src="../../assets/img/detail/nationBG.png" alt="">
          <div>
            <h1>关于用针灸疗法治疗神经系统病症案例的探讨</h1>
            <h2>￥348.00</h2>
          </div>
        </div>
        <div class="total">总金额：<span>￥</span><h2>348.00</h2></div>
        <div class="code">
          <span>订单编号 : DX22154448</span>
          <span>下单时间 : 2018-05-21 10:21:32</span>
        </div>
        <p>支付方式：支付宝</p>
      </div>
      <!--没有支付-->
      <div class="orderButton">
        <span @click="isShow=true,isType=1">取消订单</span>
        <span  @click="isShow=true,isType=2">立即支付</span>
      </div>

      <div class="Popup" v-if="isShow" @click="isShow=false"  @click.stop="">
        <!--取消订单-->
        <div class="cancelOrder" v-if="isType==1">
          <h1>提示</h1>
          <h2>确定要取消订单？</h2>

          <div class="button">
            <span @click="isShow=false">取消</span>
            <span>确定</span>
          </div>

        </div>

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
    </div>
</template>

<script>
  import myHeader from '../../components/myHeader.vue';
    export default {
        name: 'HelloWorld',
        data() {
            return {
              isShow:false,
              isType:0,
            }
        },
      components:{myHeader},
        created() {
        },
        watch: {},
        methods: {},
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.orderDetail{
  background: #f8f8f8;
  height: 100%;
  .detials{
    background: #fff;
    padding-top: .44rem;
    .type{
      /*width: 100%;*/
      height: .45rem;
      line-height: .45rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: .23rem;
      background: #FFF7F1;
      font-size: .15rem;
      color: #FF9E4F;
      font-weight: bold;
      img{
        width: .18rem;
        height: .18rem;
        padding-right: .07rem;
      }
    }
    .noBold{
      font-weight: normal;
      font-size: .12rem;
    }
    .info{
      padding:.14rem .12rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #EBEBEB;
      img{
        width: 1.1rem;
        height: .73rem;
      }
      div{
        width: 2.2rem;
        h1{
          font-size: .15rem;
          color: #202021;
          line-height: .21rem;
          height: .56rem;
        }
        h2{
          font-weight: normal;
          font-size: .13rem;
          color:#FC2845;
        }
      }
    }
    .total{
      height: .4rem;
      line-height: .4rem;
      font-size: .14rem;
      display: flex;
      justify-content: flex-end;
      padding: 0 .12rem;
      border-bottom: .08rem solid #f8f8f8;
      span{
        font-size: .13rem;
        color: #FC2845;
      }
      h2{
        font-size: .16rem;
        color: #FC2845;
      }
    }
    .code{
      color: #666666;
      font-size: .13rem;
      display: flex;
      flex-direction: column;
      padding: .12rem .12rem;
      line-height: .24rem;
      border-bottom: 1px solid #EBEBEB;
    }
    p{
      font-size: .13rem;
      padding: 0 .12rem;
      height: .4rem;
      line-height: .4rem;
    }
  }
  .orderButton{
    border-top: 1px solid #EBEBEB;
    width: 100%;
    height: .5rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    left:0;
    display: flex;
    justify-content: flex-end;
    span{
      display: inline-block;
      width: .8rem;
      height: .3rem;
      line-height: .3rem;
      text-align: center;
      font-size: .13rem;
      border: 1px solid #E4E4E4;
      border-radius: .15rem;
      margin-left: .06rem;
      margin-top: .09rem;
    }
    span:last-child{
      color: #145E9B;
      border-color: #145E9B;
      margin-right: .12rem;
    }
  }
  .Popup {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    z-index: 12;
    display: flex;
    align-items: center;
    justify-content: center;

    /*取消订单*/
    .cancelOrder{
      width: 2.7rem;
      height: 1.62rem;
      background: rgba(255,255,255,.95);
      border-radius: .1rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      h1{font-size: .18rem;padding-top: .22rem}
      h2{font-size: .15rem;font-weight:normal}
      .button{
        width: 100%;
        border-top: 1px solid #D9DADE;
        display: flex;
        justify-content: space-between;
        span{
          display: inline-block;
          width: 49.5%;
          line-height: .44rem;
          text-align: center;
          color: #0650B4;
          font-size: .18rem;
          border-right: 1px solid #D9DADE;
        }
        span:last-child{
          border: none;
        }
      }
    }

    /*立即购买*/
    /*购买*/
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
}
</style>
