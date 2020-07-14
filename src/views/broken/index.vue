<template>
  <!--网络中断-->
    <div class="broken">
      <searchOne></searchOne>
      <img src="../../assets/img/list/broken.png" alt="">
      <h1>数据加载失败~~ 请检查网络</h1>
    </div>
</template>

<script>
  import searchOne from '@/components/searchOne.vue';
    export default {
        name: 'HelloWorld',
        data() {
            return {}
        },
      components:{
        searchOne
      },
        created() {
        },
        watch: {},
        methods: {},
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.broken{
  img{
    width: 1.41rem;
    height:1.26rem;
    padding-top: 1rem;
    margin: 0 auto 0.21rem;
  }
  h1{
    color: #999999;
    font-size: 0.14rem;
    text-align: center;
    font-weight: normal;
  }

}
</style>
