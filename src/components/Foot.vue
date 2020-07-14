<template>
  <!--底部-->
  <div class="foot">
    <ul>
      <li :class="$route.path==item.link?'active':''" v-for="(item,index) in list" :key="index" @click="linkHref(item)">
        <img :src="$route.path==item.link?item.activeImg:item.img" alt="">
        <h1>{{item.name}}</h1>
      </li>

    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        list: [
          {name: '首页', img: './static/img/pic3B.png', activeImg: './static/img/pic3.png', link: '/'},
          {name: '民族', img: './static/img/pic2.png', activeImg: './static/img/pic2B.png', link: '/nationList'},
          {name: '我的', img: './static/img/default.png', activeImg: './static/img/defaultB.png', link: '/my'},
        ],
      }
    },
    created() {
      console.log(this.token)
    },
    computed: {
      token() {  //通过方法访问
        return this.$store.state.token;
      },
    },
    watch: {},
    methods: {
      linkHref(item) {
        console.log(item)
        this.$router.push(item.link);
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.49rem;
    border-top: 1px solid #E3E3E3;
    background: url("../../static/img/foot.png");
    background-size: cover;
    z-index: 15;
    margin-bottom: env(safe-area-inset-bottom);
    ul {
      padding: 0.06rem 0.51rem 0 0.51rem;
      display: flex;
      justify-content: space-between;
      li {
        img {
          width: 0.24rem;
          height: 0.24rem;
          margin-bottom: 0.05rem;
        }
        h1 {
          color: #A2A3AC;
          height: 0.12rem;
          line-height: 0.12rem;
          font-size: 0.12rem;
          font-weight: normal;
        }

      }
      .active {
        h1 {
          color: #085387;
        }
      }
    }
  }
</style>
