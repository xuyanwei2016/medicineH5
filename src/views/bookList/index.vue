<template>
  <!--图书列表-->
  <div class="booklist">
    <listHeader @sonFn="fatFn"></listHeader>
    <div :style="{overflow:'auto',height:list.length>0?winH+'px':''}"  v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <ul class="list">
        <li v-for="(item,index) in list" :key="index">
          <img :src="imgLink(item.img)" alt="" v-if="item.img"  @click="linkDetail(item.id)">
          <img src="../../assets/img/cover.png" alt="" v-else  @click="linkDetail(item.id)">
          <div class="info">
            <h1 @click="linkDetail(item.id)"  v-html="item.name"></h1>
            <p :id="`description${index}`" @click="linkDetail(item.id)">{{Ellipsis(`description${index}`,2,item.description,'.19')}}</p>
            <div class="other">
              <h3>{{item.author?item.author.trim():''}}</h3>
              <h2 v-if="item.priceOption==1">￥{{item.realPrice?item.realPrice:'0.00'}}</h2>
              <span v-else>免费</span>
            </div>
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
      this.winH=document.documentElement.clientHeight-(winW*142/375);
      this.data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        resourceType: 1,
        orderBy:'uploadTime desc',
      };
      this.$store.dispatch('getList',this.data);
    },
    watch: {
      curLoading(n,o){
        console.log(223344,n)
        this.loading=n;
      },
    },
    computed: {
      list() {
        return this.$store.state.list;
      },
      total() {
        return this.$store.state.total;
      },
      noMore() {
        return this.$store.state.list.length == this.total;
      },
      disabled() {
        return this.$store.state.curLoading == 1 || this.noMore;
      },
      curLoading() {
        return this.$store.state.curLoading;
      }
    },
    methods: {
      linkDetail(id) {
        this.$router.push({path: '/bookDetail', query: {id: id}})
      },
      fatFn(data) {
        this.loading = 0;
        this.data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          resourceType: 1,
          content: data.content,
          nationsType: data.nationsType,
        };
        this.$store.dispatch('getList', this.data);
      },
      load() {
        this.loading = 1;
        this.data.pageNum += 1;
        console.log(11111,this.data.pageNum)
        this.$store.dispatch('getList', this.data)
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .booklist {
    height: 100%;
    .list {
      padding: 0 .13rem;
      li {
        width: 100%;
        padding: .14rem 0;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #EEEEEE;
        img {
          width: 0.8rem;
          height: 1.15rem;
        }
        .info {
          width: 2.54rem;
          h1 {
            font-size: .16rem;
            color: #222222;
            height: .28rem;
            .lineOne
          }
          p {
            font-size: .13rem;
            color: #808287;
            line-height: .19rem;
            margin-bottom: .2rem;
            /*height: .6rem;*/
          }
          .other {
            display: flex;
            justify-content: space-between;
            h3 {
              color: #1A6DC2;
              font-size: .13rem;
              font-weight: normal;
              width:2rem;
              .lineOne
            }
            h2 {
              color: #FC2845;
              font-size: .12rem;
              font-weight: normal;
            }
            span{
              font-size: 0.12rem;
              color: #0AB4BE;
            }
          }
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
