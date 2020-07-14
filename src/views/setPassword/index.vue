<template>
  <!--设置密码-->
  <div class="setPassword">
    <myHeader></myHeader>

    <ul class="list">
      <li @click="$router.push('/modifyPass')"><span>修改密码</span><img src="../../assets/img/personal/iconleft.png" alt=""></li>
      <li @click="$router.push('/phoneVerification')"><span>手机验证</span><img src="../../assets/img/personal/iconleft.png" alt=""></li>

    </ul>
    <div class="button active" @click="signOUT">
      退出账号
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
    components: {
      myHeader
    },
    created() {
    },
    watch: {},
    methods: {
      signOUT(){
        this.$store.commit('signOUT');
        this.$router.push('/loginPassword');
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .setPassword {
    background: #f8f8f8;
    height: 100%;
    width: 100%;
    .list {
      padding-top: .44rem;
      background: #fff;
      li {
        border-bottom: 1px solid #EEEEEE;
        padding: 0 .12rem;
        height: .56rem;
        line-height: .56rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: .15rem;
          color: #202021
        }
        img {
          width: .08rem;
          height: .14rem;
        }
      }

    }

    .button {
      position: fixed;
      bottom: .4rem;
      left: .35rem;
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
  }
</style>
