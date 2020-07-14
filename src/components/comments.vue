<template>
  <div class="comments">
    <!--评论列表-->
    <div class="evaluate" :style="{overflow:'auto',height:data.length>0?winH+'px':''}" v-infinite-scroll="load"
         infinite-scroll-disabled="disabled" v-if="$route.name!='bookDetail'">
      <div class="list" style="margin-top: .2rem">
        <div class="every" v-if="data&&data.length>0" v-for="(item,index) in data" :key="index">
          <div class="head">
            <img v-if="item.userImg" :src="imgLink(item.userImg)" alt="">
            <img src="../assets/img/detail/head.png" alt="" v-else>
          </div>
          <div class="word">
            <div class="start">
              <h1>{{item.userName}}</h1>
              <div class="fraction">
                <ul>
                  <li class="startY"><span v-for="item in item.score"></span></li>
                  <li class="startK">
                    <span v-for="item in 5"></span>
                  </li>
                </ul>
                <h2><span>{{item.score}}</span>分</h2>
              </div>
            </div>
            <p>
              {{item.content}}
            </p>

            <div class="other">
              <h1>{{item.releaseTime}}</h1>
              <ul>
                <li
                  @click="$router.push({path:'/commentDetail',query:{id:$route.query.id,mainId:item.id,type:$route.query.type}})">
                  <img src="../assets/img/detail/eval.png" alt="">{{item.replyNum}}
                </li>
                <li @click.stop="agree(item)">
                  <img src="../assets/img/detail/fabulousB.png" alt="" v-if="item.isAgree">
                  <img src="../assets/img/detail/fabulous.png" alt="" v-else>
                  {{item.fabulousNum}}
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div class="more" v-if="loading==1&&data.length>0&&!noMore">加载中...</div>
        <div class="noHave" v-if="noMore&&data.length>0&&$route.path!='/bookDetail'">
          这是我的底线 <img src="../assets/img/list/nohave.png" alt="">
        </div>


      </div>

      <noHave v-if="(loading==2||loading==0)&&data.length==0" :mess="{top:winH,loading:loading}"></noHave>

    </div>

    <!--图书评论列表-->
    <div class="evaluate" v-if="$route.name=='bookDetail'">
      <div class="tit">精彩评价 <span>({{total}})</span></div>
      <div class="send">
        <input v-model="value" type="text" placeholder="内容这么赞，快来评论吧！" @keypress="keyFn"><!---->
        <!--<h1 @click="keyFn">确定</h1>-->
      </div>
      <div class="list">
        <div class="every" v-if="data&&data.length>0" v-for="(item,index) in data" :key="index">
          <div class="head">
            <img v-if="item.userImg" :src="imgLink(item.userImg)" alt="">
            <img src="../assets/img/detail/head.png" alt="" v-else>
          </div>
          <div class="word">
            <div class="start">
              <h1>{{item.userName}}</h1>
              <div class="fraction">
                <ul>
                  <li class="startY"><span v-for="item in item.score"></span></li>
                  <li class="startK" v-for="item in 5"></li>
                </ul>
                <h2><span>{{item.score}}</span>分</h2>
              </div>
            </div>
            <p>
              {{item.content}}
            </p>

            <div class="other">
              <h1>{{item.releaseTime}}</h1>
              <ul>
                <li
                  @click="$router.push({path:'/commentDetail',query:{id:$route.query.id,mainId:item.id,type:object[$route.name]}})">
                  <img src="../assets/img/detail/eval.png" alt="">{{item.replyNum}}
                </li>
                <li @click="agree(item)">
                  <img src="../assets/img/detail/fabulousB.png" alt="" v-if="item.isAgree">
                  <img src="../assets/img/detail/fabulous.png" alt="" v-else>
                  {{item.fabulousNum}}
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div class="more" v-if="loading==1&&data.length>0&&!noMore">加载中...</div>
        <div class="noHave" v-if="noMore&&data.length>0&&$route.path!='/bookDetail'">
          这是我的底线 <img src="../assets/img/list/nohave.png" alt="">
        </div>


      </div>

      <div class="more" @click="data.length>0&&toMore()">{{data && data.length > 0 ? '更多精彩评论' : '快去评论吧...'}}</div>
    </div>
  </div>
</template>

<script>
  import noHave from '../components/noHave.vue';
  import {getCommentListAPI, saveCommentAPI} from '@/api/detail.js';
  import {agreeAPI} from '@/api/list.js';

  export default {
    name: 'HelloWorld',
    props: ['resource'],
    data() {
      return {
        value: '',
        object: {bookDetail: 1,}, /*资源类型 0全部31理论 32药物 33方剂 34临床 35医案 36文化 37机构 38医论 48其他 1医著 */
        data: [],
        total: 0,
        winH: 0,
        loading: 0,
        pageNum: 1,
        resourceClass: null,
        isAgree:true,
      }
    },
    components: {noHave},
    created() {
      let winW = document.documentElement.clientWidth;
      this.winH = document.documentElement.clientHeight - (winW * 44 / 375) - (winW * 60 / 375);
      if (this.$route.name != 'bookDetail') {
        this.getCommentList();
      }
    },
    watch: {
      resource(n, o) {
        this.resourceClass = n.resourceType;
        this.getCommentList();
      },
    },
    computed: {
      noMore() {
        return this.data.length == this.total;
      },
      disabled() {
        return this.loading == 1 || this.noMore;
      },
      token() {  //通过方法访问
        return this.$store.state.token;
      },

    },
    methods: {
      load() {
        this.loading = 1;
        this.pageNum += 1;
        this.getCommentList();
      },

      /*获取评论列表*/
      getCommentList() {
        this.loading = 0;
        getCommentListAPI({
          resourceClass: this.$route.query.type || this.resourceClass,
          resourceId: this.$route.query.id,
          pageNum: this.pageNum,
          pageSize: this.$route.name == 'bookDetail' ? 20 : 10,
        }).then(res => {
          if (res.data.status) {
            if(this.$route.name == 'bookDetail'){
              this.data = res.data.data.list;
            }else{
              this.data = [...this.data,...res.data.data.list];
            }
            this.total = res.data.data.total;
          }
          this.loading = 2;
        })
      },
      toMore() {
        this.$router.push({path: '/comment', query: {id: this.$route.query.id, type: this.object[this.$route.name]}});
      },

      keyFn(e) {
        let self = this;
        /*e.keyCode === 13*/
        if (e.keyCode === 13) {
          if (!this.token) {
            this.$router.push('/loginPassword');
            return
          }
          var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig,str='';
          let val=this.value.replace(/(^\s*)|(\s*$)/g, "");
          str=val.replace(regStr,"");

          if (val == '') {
            this.$valert.show('请输入内容');
            return
          }else if(val.length<3){
            this.$valert.show('输入的评论内容3-300字以内');
            return
          }else{
            if(str.length < 3){
              if(regStr.test(this.value)){
                this.$valert.show('暂不支持表情输入');
              }else{
                this.$valert.show('输入的评论内容3-300字以内');
              }
              return
            }

          }
          saveCommentAPI({
            accessMedium: 2,
            content: str,
            fatherId: 0,
            mainId: 0,
            resourceClass: this.object[this.$route.name],
            resourceId: this.$route.query.id,
            resourceName: this.resource.resourceName,
            score: 5,
          }).then(res => {
            if (res.data.code==0) {
              self.$valert.show('评论成功');
              self.value = '';
              self.getCommentList();
            } else if(res.data.code==1){
              self.$valert.show(res.data.msg);
              self.$router.push('/loginPassword');
            } else {
              self.$valert.show(res.data.msg);
            }

          })
        }
      },
      agree(item) {
        if(item.isAgree==1){this.$valert.show('已点赞成功');return}
        if(!this.isAgree){return}
        this.isAgree=false;
        agreeAPI({
          commentId:item.id,
          singin:this.token?1:0,
          action:1,
        }).then(res => {
          if (res.data.status) {
            this.$valert.show('点赞成功');
            item.fabulousNum++;
            this.$set(item,'isAgree',1);
            this.isAgree=true;

          }
        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  /*精彩评价*/
  .evaluate {
    padding: 0 .14rem;
    margin-bottom: .6rem;
    .tit {
      height: 0.36rem;
      font-size: .17rem;
      color: #222222;
      font-weight: bold;
      span {
        color: #454545;
        font-weight: normal;
        font-size: .14rem;
      }
    }
    .send {
      width: 100%;
      height: 0.34rem;
      margin-bottom: 0.34rem;
      input {
        width: 3.2rem;
        display: block;
        height: 0.34rem;
        background: #E7ECEF;
        border-radius: 0.17rem;
        border: none;
        padding: 0 0.15rem;
      }
      input::-webkit-input-placeholder {
        color: #BBBBBB;
      }
      input::-o-input-placeholder {
        color: #BBBBBB;
      }
      input::-moz-input-placeholder {
        color: #BBBBBB;
      }
      input::-ms-input-placeholder {
        color: #BBBBBB;
      }
    }

    .list {
      .every {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #EEEEEE;
        margin-bottom: 0.2rem;
        .head {
          width: .4rem;
          height: .4rem;
          img {
            width: .4rem;
            height: .4rem;
            border-radius: 50%;
          }
        }
        .word {
          width: 3rem;
          .start {
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: .36rem;
            align-items: center;
            h1 {
              font-size: 0.16rem;
              font-weight: bold;
              color: #222;
            }
            .fraction {
              width: 1.1rem;
              height: .36rem;
              display: flex;
              justify-content: flex-end;
              align-items: center;

              ul {
                width: 0.8rem;
                height: 0.25rem;
                position: relative;
                display: flex;
                align-items: center;
                li {
                  display: flex;
                  justify-content:start;
                  width: 0.8rem;
                  height: 0.1rem;
                }
                .startY {
                  position: absolute;
                  width: 0.8rem;
                  span {
                    padding-right: 0.05rem;
                    display: block;
                    width: 0.1rem;
                    height: 0.1rem;
                    background: url("../assets/img/detail/start1.png") no-repeat;
                    background-size: contain;
                  }
                }
                .startK {
                  position: absolute;
                  width: 0.8rem;
                  span {
                    padding-right: 0.05rem;
                    display: block;
                    width: 0.1rem;
                    height: 0.1rem;
                    background: url("../assets/img/detail/start.png") no-repeat;
                    background-size: contain;
                  }
                }

              }
              h2 {
                width: .25rem;
                font-size: .08rem;
                -webkit-text-size-adjust: none;
                font-weight: normal;
                color: #F66B23;
                text-align: right;
                span {
                  font-size: .13rem;
                  font-weight: bold;
                  padding-right: 0.02rem;
                }
              }
            }
          }
          p {
            line-height: .22rem;
            font-size: .13rem;
            color: #454545;
            margin-bottom: .15rem;
            /*text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;*/
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            flex-direction: column;
            max-height: 1.1rem;
          }

          .other {
            display: flex;
            justify-content: space-between;
            padding-bottom: .16rem;

            h1 {
              font-size: .13rem;
              color: #888888;
              font-weight: normal;

            }
            ul {
              display: flex;
              justify-content: flex-start;
              li {
                color: #888888;
                padding-left: .17rem;
                display: flex;
                justify-content: flex-start;
                img {
                  height: .12rem;
                  display: inline-block;
                  margin-right: .04rem;
                }
              }
            }
          }
        }
      }
    }
    .more {
      width: 100%;
      text-align: center;
      font-size: .13rem;
      color: #C8CAD2;
      padding-bottom: 0rem;
    }

  }

</style>
