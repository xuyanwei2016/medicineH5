<template>
  <!--评论详情-->
    <div class="commentDetail">
      <commentHeader></commentHeader>
      <!--详情-->
      <div class="every only">
        <div class="head">
          <img v-if="detail.userImg" :src="imgLink(detail.userImg)" alt="">
          <img src="../../assets/img/detail/head.png" alt="" v-else>
        </div>
        <div class="word">
          <div class="start">
            <h1>{{detail.userName}}</h1>
            <div class="fraction">
              <ul>
                <li class="startY"><span v-for="item in detail.score"></span></li>
                <li class="startK" v-for="item in 5"></li>
              </ul>
              <h2><span>{{detail.score}}</span>分</h2>
            </div>
          </div>
          <p>
            {{detail.content}}
          </p>

          <div class="other">
            <h1>{{detail.releaseTime}}</h1>
            <ul>
              <li><img src="../../assets/img/detail/evalhB.png" alt="">{{detail.replyNum}}</li>
              <li  @click.stop="agree(detail)">
                <img src="../../assets/img/detail/fabulousB.png" alt="" v-if="detail.isAgree">
                <img src="../../assets/img/detail/fabulous.png" alt="" v-else>
                {{detail.fabulousNum}}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="list">
        <div class="tit">全部回复({{detail.replyNum}})</div>

        <div class="every listOnly" v-for="(item,index) in detail.replyVoList" :key="index">
          <div class="head">
            <img v-if="item.userImg" :src="imgLink(item.userImg)" alt="">
            <img src="../../assets/img/detail/head.png" alt="" v-else>
          </div>
          <div class="word">
            <div class="start">
              <h1>{{item.userName}}<span class="reply" v-if="item.fatherId!=item.mainId">回复</span>{{item.fatherId!=item.mainId?`${item.fatherName}`:''}}</h1>
              <div class="fraction"><h5></h5>
              </div>
            </div>
            <p style="padding-bottom: .1rem">{{item.content}}</p>
            <div class="other">
              <h1>{{item.releaseTime}}</h1>
              <ul>
                <!--{path:'/toEvaluate',query:{id:$route.query.id,mainId:item.id,type:$route.query.type}}-->
                <li @click="$router.push({path:'/toEvaluate',query:{id:$route.query.id,mainId:item.mainId,type:$route.query.type,fatherId:item.id,fatherName:item.fatherName}})"><img src="../../assets/img/detail/evalhB.png" alt="">{{item.replyNum}}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="noData" v-if="detail.replyVoList.length==0">
          <img src="@/assets/img/list/noData.png" alt="">
          <h1>抱歉，暂无相关内容</h1>
        </div>
      </div>

      <div class="foot">
        <input type="text" placeholder="爱发言的人运气都不会太差..." v-model="value">
        <h1 @click="isClick&&replyFn()">回复</h1>
      </div>

    </div>
</template>

<script>
  import comments from '../../components/comments.vue';
  import commentHeader from '../../components/commentHeader.vue';
  import {commentDetailAPI,saveCommentAPI} from '@/api/detail.js';
  import {agreeAPI} from '@/api/list.js';
    export default {
        name: 'HelloWorld',
        data() {
            return {
              detail:{
                userName:null,
                score:null,
                content:null,
                releaseTime:null,
                fabulousNum:null,
                replyNum:null,
                replyVoList:[],
              },
              value:'',
              isAgree:true,
              isClick:true,
            }
        },
      components: {commentHeader,comments},
        created() {
          this.getDetail();
        },
        watch: {},
      computed:{
        token() {  //通过方法访问
          return this.$store.state.token;
        },
      },
        methods: {
          getDetail(){
            commentDetailAPI(this.$route.query.mainId).then(res=>{
              if(res.data.status){
                this.detail=res.data.data;
              }
            })
          },

          replyFn(){
            let self=this;
            if (!this.token) {
              this.$router.push('/loginPassword');
              return
            }
            if(!this.isClick){return}
            this.isClick=false;
              var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig,str='';
              let val=this.value.replace(/(^\s*)|(\s*$)/g, "");
              str=val.replace(regStr,"");

              if (val == '') {
                this.$valert.show('请输入内容');
                this.isClick=true;
                return
              }else if(val.length<3){
                this.$valert.show('输入的评论内容3-300字以内');
                this.isClick=true;
                return
              }else{
                if(str.length < 3){
                  if(regStr.test(this.value)){
                    this.$valert.show('暂不支持表情输入');
                  }else{
                    this.$valert.show('输入的评论内容3-300字以内');
                  }
                  this.isClick=true;
                  return
                }

              }
              saveCommentAPI({
                accessMedium:2,
                content:str,
                fatherId:this.$route.query.mainId,
                fatherName:this.detail.userName,
                mainId:this.$route.query.mainId,
                resourceClass:this.$route.query.type,
                resourceId: this.$route.query.id,
                resourceName:this.detail.resourceName,
                score:1,
              }).then(res=>{
                if(res.data.code==0){
                  self.$valert.show('回复成功');
                  self.value='';
                  self.getDetail();
                } else if(res.data.code==1){
                  self.$valert.show(res.data.msg);
                  self.$router.push('/loginPassword');
                }else{
                  self.$valert.show(res.data.msg);
                }
                this.isClick=true;
              })

          },
          agree(){
            if(this.detail.isAgree==1){this.$valert.show('已点赞成功');return};
            if(!this.isAgree){return}
            this.isAgree=false;
            agreeAPI({
              commentId:this.detail.id,
              singin:this.token?1:0,
              action:1,
            }).then(res=>{
              if(res.data.status){
                this.$valert.show('点赞成功');
                this.detail.fabulousNum++;
                this.$set(this.detail,'isAgree',1);
                this.isAgree=true;
              }
            })
          },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.commentDetail{
  .only{
    padding: .7rem .14rem 0;
    border-bottom: .1rem solid #F3F3F3;
  }
  .listOnly{
    padding: .2rem 0 0;
    border-bottom: 1px solid #EEEEEE;
    h5{
      font-size: .14rem;
      font-weight: normal;
      color: #888888;
    }
  }
  .every {
    display: flex;
    justify-content: space-between;

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
        .reply{color: #205FC6; font-size: .15rem;padding: 0 .05rem}
        .fraction {
           height: .36rem;
           display: flex;
           justify-content: space-between;
           align-items: center;

           ul {
             width: 100%;

             height: 0.25rem;
             position: relative;
             display: flex;
             justify-content: space-between;
             align-items: center;

             li {
               float: left;
               padding-right: 0.05rem;
               width: 0.1rem;
               height: 0.1rem;
             }
             .startY {
               position: absolute;
               width: 100%;
               span {
                 float: left;
                 padding-right: 0.05rem;
                 display: block;
                 width: 0.1rem;
                 height: 0.1rem;
                 background: url("../../assets/img/detail/start1.png") no-repeat;
                 background-size: contain;
               }
             }
             .startK {
               background: url("../../assets/img/detail/start.png") no-repeat;
               background-size: contain;
               /*margin-left: -0.2rem;*/
             }

           }
           h2 {
             font-size: .08rem;
             -webkit-text-size-adjust: none;
             font-weight: normal;
             color: #F66B23;

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
        padding-bottom: .15rem;
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
            line-height: .15rem;
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

  .list {
    padding: 0 .14rem 0.5rem;
    .tit{
      font-size: .14rem;
      color: #454545;
    }
  }

  .foot{
    position: fixed;
    bottom:0;
    left:0;
    width: 100%;
    height: .42rem;
    background: #fff;
    box-shadow: .04rem .02rem .08rem .05rem rgba(0, 0, 0, 0.05);
    padding-top: .08rem;
    display: flex;
    justify-content: space-between;
    input{
      width:2.75rem;
      height: .33rem;
      line-height: .33rem;
      background: url("../../assets/img/detail/write.png") no-repeat .155rem .105rem #F1F1F3;
      background-size: .12rem .12rem; border: none;
      border-radius: .17rem;
      padding-left: .35rem;
      font-size: .14rem;
      margin-left: .15rem;
    }
    h1{
      font-size: .13rem;
      color: #205FC6;
      font-weight: normal;
      padding-right: .15rem;
      line-height: .33rem;
      display: inline-block;
      height: .33rem;
    }
  }
  /*没有数据*/
  .noData {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: .6rem;
    img {
      width: 1.41rem;
      height: 1.26rem;
      padding-bottom: .2rem;
    }
    h1 {
      font-size: .14rem;
      color: #999999;
      font-weight: normal;
    }
  }
}
</style>
