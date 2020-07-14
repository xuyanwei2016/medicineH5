<template>
  <div id="app"  :style="{ background: $route.name=='bookRead'?colorBG:'',overflow:$route.name=='read'? 'scroll':'',}">
    <keep-alive>   
      <router-view v-if="$route.meta.keepAlive"  @sonFn="fatFn"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"  @sonFn="fatFn"></router-view>
  </div>
</template>

<script>
  import $ from 'jquery';
  export default {
    name: 'App',
    data(){
      return{
        colorBG:'',
      }
    },
    created() {

      /*$('body').on('touchmove',function(e){
        e.preventDefault();
      });*/
    },
    methods:{
      fatFn(){
        this.colorBG='#000';
      },
    }
  }
</script>

<style lang="less">

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333333;
    margin-top: 0px;
    height: 100%;
    /*-:touch;*/
    .setFont {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 111;
      background: rgba(0, 0, 0, 0.3);
      .setFontSize {
        position: absolute;
        height: 1.17rem;
        bottom: 0;
        background: #fff;
        width: 100%;
        h1 {
          font-size: 0.17rem;
          color: #212020;
          padding: 0.2rem 0.12rem 0.12rem 0.12rem;
          font-weight: normal;

        }
        ul {
          height: 0.44rem;
          border: 1px solid #E0E1E8;
          margin: 0rem 0.12rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          li {
            font-size: 0.16rem;
          }
          .active {
            color: #145E9B;
          }
        }
      }

      .share {
        position: absolute;
        height: 1.88rem;
        bottom: 0;
        background: #fff;
        width: 100%;
        ul {
          padding-top: 0.26rem;
          height: 1.02rem;
          border: 1px solid #EEEEEE;
          display: flex;
          justify-content: space-around;
          align-items: center;
          li {
            width: 0.56rem;
            height: 1rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            img {
              margin: 0 auto;
              width: 0.52rem;
              height: 0.52rem;
            }
            span {
              display: inline-block;
              color: #666666;
              font-size: 0.13rem;
              padding-top: 0.11rem;
            }
          }
        }
        h1 {
          color: #212020;
          font-size: 0.17rem;
          font-weight: normal;
          text-align: center;
          padding-top: 0.18rem;
        }
      }

    }
  }
</style>
