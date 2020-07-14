<template>
  <!--我要评价-->
  <div class="toEvaluate">
    <commentHeader @sendFrom="isClick&&sendTo()"></commentHeader>
    <div class="evaluate">
      <div class="start">
        <h1>评分：</h1>
        <div class="fraction block">
          <el-rate
            v-model="rating"
            void-color="#F66B23"
            :colors="['#F66B23', '#F66B23', '#F66B23']"
          ></el-rate>
          <h2><span>{{rating}}</span>分</h2>
        </div>
      </div>
      <div class="text">
        <textarea name="" id="" cols="30" rows="8" placeholder="请输入评价内容..." v-model="value" maxlength="300"></textarea>
        <span>{{value.trim().length}}/300字</span>
      </div>
    </div>
  </div>
</template>

<script>
  import commentHeader from '../../components/commentHeader.vue';
  import {saveCommentAPI, getBookDetailAPI, getArticleDetailAPI} from '@/api/detail.js';
  import router from "../../router";

  export default {
    name: 'HelloWorld',
    data() {
      return {
        value: '',
        start: null,
        rating: 5, // 星级
        detail: null,
        isClick:true,

      }
    },
    components: {commentHeader},
    created() {
      this.getDetail();
    },
    watch: {
      start(n, o) {
      }
    },
    computed: {
      token() {  //通过方法访问
        return this.$store.state.token;
      },

    },
    methods: {
      /*查详情*/
      getDetail() {
        let api = this.$route.query.type == '1' ? getBookDetailAPI : getArticleDetailAPI;
        api(this.$route.query.id).then(res => {
          if (res.data.status) {
            this.detail = res.data.data;
          }
        })
      },


      sendTo() {

        let self = this;
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
          fatherId: this.$route.query.fatherId || 0,
          mainId: this.$route.query.mainId || 0,
          resourceClass: this.$route.query.type,
          resourceId: this.$route.query.id,
          resourceName: this.detail.name,
          score: this.rating,
          fatherName: this.$route.query.fatherName || null,
        }).then(res => {
          if (res.data.code==0) {
            self.$valert.show('评论成功');
            self.$router.go(-1);
          } else if(res.data.code==1){
            self.$valert.show(res.data.msg);
            self.$router.push('/loginPassword');
          } else {
            self.$valert.show(res.data.msg);
          }
          this.isClick=true;
        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .fl {
    float: left;
    margin-left: 17px;
    p {
      text-align: center;
    }
    &:nth-of-type(1) {
      width: 110px;
    }
    &:nth-of-type(2) {
      margin-left: 43px;
    }
  }

  .toEvaluate {
    width: 100%;
    height: 100%;
    background: #f7f7f7;
    .evaluate {
      padding-top: 0.6rem;
      background: #fff;
      width: 100%;
      height: 2.45rem;
      .start {
        display: flex;
        justify-content: flex-start;
        height: .36rem;
        align-items: center;
        padding: 0 .15rem .13rem;
        border-bottom: 1px solid #E7E7E7;
        h1 {
          font-size: .14rem;
          color: #333333;
          font-weight: normal;
          padding-right: .13rem;
        }
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
              padding-right: .05rem;
              width: .16rem;
              height: .16rem;
            }
            .startY {
              background: #ccc;
              position: absolute;
              z-index: -1;
              width: 100%;
              span {
                float: left;
                padding-right: .05rem;
                display: block;
                width: .16rem;
                height: .16rem;
                background: url("../../assets/img/detail/start1.png") no-repeat;
                background-size: contain;
              }
            }
            .startK {
              width: .16rem;
              height: .16rem;
              display: block;
              background: url("../../assets/img/detail/start.png") no-repeat;
              background-size: contain;
              /*margin-left: -0.2rem;*/
            }

          }
          h2 {
            font-size: .12rem;
            -webkit-text-size-adjust: none;
            font-weight: normal;
            color: #F66B23;
            padding-left: 0.06rem;
            span {
              font-size: .14rem;
              font-weight: bold;
              padding-right: 0.02rem;
            }
          }
        }
      }
      .text {
        padding: .05rem .15rem;
        textarea {
          border: none;
          width: 100%;
          height: 1.58rem;
          font-size: .14rem;
          resize: none;
        }
        textarea::-webkit-input-placeholder {
          color: #AAABB3;
        }
        textarea::-o-input-placeholder {
          color: #AAABB3;
        }
        textarea::-moz-input-placeholder {
          color: #AAABB3;
        }
        textarea::-ms-input-placeholder {
          color: #AAABB3;
        }
        span {
          display: inline-block;
          width: 100%;
          color: #AAABB3;
          font-size: .14rem;
          text-align: right;
        }
      }
    }
  }

</style>
