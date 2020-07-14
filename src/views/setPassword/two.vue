<template>
  <!--设置密码第二个页面-->
    <div class="setPassTwo">
      <myHeader></myHeader>
      <div class="img">
        <img src="../../assets/img/personal/setpassword.png" alt="">
      </div>

      <ul class="list">
        <li><span>验证码</span>
          <div class="code">
            <input type="text" placeholder="字符、数字或符号的组合，6-20个字符">
            <img src="../../assets/img/personal/open.png" alt="">
          </div>
        </li>

      </ul>

      <div class="button active">
        提交
      </div>
      <div class="tips">
        注册表示您同意<span>《用户注册协议》</span>
      </div>
    </div>
</template>

<script>
  import myHeader from '../../components/myHeader.vue';
    export default {
        name: 'HelloWorld',
        data() {
            return {}
        },
      components:{
        myHeader
      },
        created() {
        },
        watch: {},
        methods: {},
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.setPassTwo{
  .img{
    padding-top: .6rem;
    background: #fff;
    display: flex;
    justify-content: center;
    height:1.3rem;
    img{
      width: 2.55rem;
      height:.83rem;
    }
  }

  .list {

    background: #fff;
    li {
      border-bottom: 1px solid #EEEEEE;
      margin: 0 .18rem 0 .16rem;
      height: .56rem;
      line-height: .56rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: .15rem;
        color: #202021
      }
      .code{
        width: 2.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      input {
        width: 2.2rem;
        height: .56rem;
        line-height: .56rem;
        border: none;
        font-size: .12rem;
      }
      input::-webkit-input-placeholder{
        color: #888;
      }
      input::-o-input-placeholder {
        color: #888;
      }
      input::-moz-input-placeholder {
        color: #888;
      }
      input::-ms-input-placeholder {
        color: #888;
      }
      img{
        width: .18rem;
      }
    }


  }

  .button {
    margin: .4rem auto 0;
    text-align: center;
    width: 3.05rem;
    height: .42rem;
    line-height: .42rem;
    font-size: .15rem;
    color: #5F6775;
    border-radius: .21rem;
    background: #E6E6E6;
    box-shadow: 0.01rem .03rem .06rem 0rem rgba(0,0,0,0.1);
  }
  .active{
    background: url("../../assets/img/detail/button.png") no-repeat;
    background-size: cover;
    color: #fff;
    font-weight: bold;
    box-shadow: 0.01rem .03rem .06rem 0rem rgba(15, 122, 203,0.1);

  }
  .tips{
    width: 100%;
    text-align: center;
    font-size: .13rem;
    color: #666666;
    padding-top: .5rem;
    span{
      color: #0D70BA;
    }
  }
}
</style>
