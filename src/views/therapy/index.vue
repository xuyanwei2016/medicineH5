<template>
  <!--特色疗法-->
  <div class="therapy">
    <listHeader @sonFn="fatFn"></listHeader>
    <div :style="{overflow:'auto',height:list.length>0?winH+'px':''}"  v-infinite-scroll="load" infinite-scroll-disabled="disabled">
    <div class="list" v-for="(item,index) in list" :key="index">
      <img :src="imgLink(item.img)" alt="" v-if="item.img"  @click="$router.push({path:'/read',query:{id:item.id}})">
      <div :class="item.img?'css1':'info'">
        <h1 v-html="item.name" @click="$router.push({path:'/read',query:{id:item.id}})"></h1>
        <p v-if="!item.img" :id="`description${index}`">{{Ellipsis(`description${index}`,2,item.description,'.19')}}</p>
        <div class="other">
          <h2 v-if="item.priceOption==1&&$route.name!='materials'">￥{{item.realPrice?item.realPrice:'0.00'}}</h2>
          <span v-if="item.priceOption==0&&$route.name!='materials'">免费</span>
          <h2 v-if="$route.name=='materials'"></h2>
          <h3>{{item.browseNum}}人浏览过</h3>
        </div>
      </div>
    </div>
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
  export default {
    name: 'HelloWorld',
    data() {
      return {
        pageNum:1,
        pageSize:10,
        winH:0,
        loading: 0,
        data:{},
      }
    },
    components: {listHeader,noHave},

    created() {
      let winW=document.documentElement.clientWidth;
      this.winH=document.documentElement.clientHeight-(winW*123/375);
      this.data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        resourceType: this.$route.name=='materials'?32:39,
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
      fatFn(data){
        this.loading=0;
        this.data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          resourceType: this.$route.name=='materials'?32:39,
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
.therapy{
  height: 100%;
  .list{
    margin: 0 .15rem;
    padding: .12rem 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #EEEEEE;
    .info{
      width: 100%;
      h1{
        color: #222222;
        font-size: .15rem;
        line-height: .21rem;
        padding-bottom: .13rem;
        .lineOne
      }
      p{
        color: #808287;
        font-size: .13rem;
        line-height: .19rem;
        margin-bottom: .1rem;
      }
    }
    img{
      width: 1.1rem;
      height: .73rem;
    }

    .other{
      display: block;
      padding-top: .05rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      h2{
        color: #FC2845;
        font-size: .13rem;
        font-weight: normal;

      }
      h3{
        font-size: .11rem;
        color: #CBD0D9;
        font-weight: normal;
      }
      span{
        font-size: .12rem;
        color: #0AB4BE;
      }
    }
    .css1{
      width: 2.22rem;
      h1{
        color: #222222;
        font-size: .15rem;
        margin-bottom: .13rem;
        height: .4rem;
        line-height: .21rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      p{
        color: #808287;
        font-size: .13rem;
        line-height: .19rem;
        margin-bottom: .1rem;
      }
    }


  }
}
.lineOne{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
