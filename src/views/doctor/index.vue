<template>
  <!--醫家列表-->
  <div class="doctor">
    <listHeader @sonFn="fatFn"></listHeader>
    <div :style="{overflow:'auto',height:list.length>0?winH+'px':''}"  v-infinite-scroll="load" infinite-scroll-disabled="disabled">
    <ul class="list">
      <li v-for="(item,index) in list" :key="index">
        <div class="doc"  @click="linkDetail(item.id)">
          <img :src="imgLink(item.img)" alt="" v-if="item.img"  @error="defImg()">
          <img src="../../assets/img/bookDefault.png" alt="" v-else>
          <div class="Nation">
            <span></span>
            <div><h1>{{item.nationsType}}</h1></div>
            <span></span>
          </div>
        </div>
        <div class="info">
          <h1 @click="linkDetail(item.id)" v-html="item.name"></h1>
          <h2>{{item.title}}</h2>
          <p :id="`description${index}`" @click="linkDetail(item.id)">{{Ellipsis(`description${index}`,2,item.description,'.19')}}</p>
        </div>
      </li>
    </ul>
    <div class="more" v-if="loading==1&&list.length>0&&!noMore">加载中...</div>
    <div class="noHave" v-if="noMore&&list.length>0">
      这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
    </div>
  </div>

    <noHave v-if="(loading==2||loading==0)&&list.length==0" :mess="{top:winH,loading:loading}"></noHave>
  </div>
</template>

<script>
  import listHeader from '../../components/listHeader.vue';
  import noHave from '../../components/noHave.vue';
  import defaultImg from '@/assets/img/bookDefault.png';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        pageNum:1,
        pageSize:10,
        winH:0,
        loading: 0,
        data:{},
        defaultImg:defaultImg,
      }
    },
    components: {listHeader,noHave},
    created() {
      let winW=document.documentElement.clientWidth;
      this.winH=document.documentElement.clientHeight-(winW*142/375);
      this.data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        resourceType: 2,
        orderBy:'uploadTime desc',
      };
      this.$store.dispatch('getList',this.data);
    },
    watch: {
      curLoading(n,o){
        this.loading=n;
      },
    },
    computed:{
      list(){
        return this.$store.state.list;
      },
      total(){
        return this.$store.state.total;
      },
      noMore () {
        return this.$store.state.list.length == this.total;
      },
      disabled () {
        return this.$store.state.curLoading==1||this.noMore;
      },
      curLoading () {
        return this.$store.state.curLoading;
      }
    },
    methods: {
      defImg(){
        let img = event.srcElement;   //当前元素
        img.src = this.defaultImg;
        img.onerror = null; //防止闪图
      },
      linkDetail(id){
        this.$router.push({path:'/doctorDetail',query:{id:id}})
      },
      fatFn(data){
        this.loading=0;
        this.data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          resourceType: 2,
          content:data.content,
          nationsType:data.nationsType,
        };
        this.$store.dispatch('getList',this.data);
      },
      load () {
        this.loading = 1;
        this.data.pageNum += 1;
        this.$store.dispatch('getList',this.data)
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .doctor {
    height: 100%;
    .list {
      padding: 0 .14rem;
      li {
        padding-top: .14rem;
        height: 1.36rem;
        border-bottom: 1px solid #EEEEEE;
        display: flex;
        justify-content: space-between;
        .doc {
          position: relative;
          width: .95rem;
          height: 1.225rem;
          img {
            width: .95rem;
            height: 1.225rem;
          }

          .Nation {
            width: auto;
            height: 0.12rem;
            position: relative;
            z-index: 9;
            display: flex;
            justify-content: flex-end;
            right: .1rem;
            bottom: .18rem;

            div {
              display: inline-block;
              overflow: hidden;
              color: #fff;
              height: 0.12rem;
              line-height: 0.12rem;
              font-weight: bold;
              background: #19307F;

              h1 {
                font-weight: normal;
                display: block;
                font-size: .16rem;
                transform: scale(0.5);
                -webkit-transform: scale(0.5);
                -moz-transform: scaleX(0.5);
                -o-transform: scaleX(0.5);
                -ms-transform: scaleX(0.5);
                overflow: hidden;
                background: #19307F;
                height: .12rem;
                line-height: .12rem;
                padding: 0.1rem 0;
                margin-top: -0.1rem;
                margin-left: -0.08rem;
                margin-right: -0.08rem;
              }

            }
          }
          .Nation span:first-child {
            display: block;
            width: .05rem;
            height: .12rem;
            content: '';
            background: url("../../../static/img/biaoqian-2.png") no-repeat;
            background-size: cover;
          }
          .Nation span:last-child {
            display: block;
            width: .05rem;
            height: .12rem;
            content: '';
            background: url("../../../static/img/biaoqian-2.png") right top no-repeat;
            background-size: cover;
            padding-left: 0rem;
          }
        }
        .info {
          width: 2.38rem;
          h1 {
            color: #222222;
            font-size: .16rem;
            height: .28rem;
            .lineOne
          }
          h2 {
            font-weight: normal;
            color: #1A6DC2;
            font-size: .14rem;
            height: .31rem;
            .lineOne
          }
          p {
            line-height: .19rem;
            color: #808287;
            font-size: .13rem;
          }

        }
      }
    }

  }
  .lineOne{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
