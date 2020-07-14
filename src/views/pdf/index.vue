<template>
    <div class="pdf">
      <div class="DetailTit">
        <div class="back" @click="$router.go(-1)">
          <img src="../../assets/img/list/back.png" alt="">
        </div>

        <div class="send"  @click="collection">
          <img src="../../assets/img/detail/startW.png" alt="" v-if="!isCollection">
          <img src="../../assets/img/detail/start1.png" alt="" v-if="isCollection">
        </div>
      </div>

      <!--pdf文件-->
      <!--<iframe :src="imgLink(pdfId)" width="100%" height="100%">

        This browser does not support PDFs. Please download the PDF to view it: <a :href="imgLink(pdfId)">Download PDF</a>

      </iframe>-->
      <!--<object src="http://test16.zhongdianyun.com/file/file/?fileName=36d1424c37aa4403bce9f9dfff18c422&isOnLine=true" width="100%" height="100%">

        This browser does not support PDFs. Please download the PDF to view it: <a href="http://test16.zhongdianyun.com/file/file/?fileName=36d1424c37aa4403bce9f9dfff18c422&isOnLine=true">Download PDF</a>

      </object>-->
      <div class="content" :style="{height: winH+'px'}">
          <pdf
            v-for="i in numPages"
            :key="i"
            :page="i"
            :src="pdfUrl" style="width: 100%; height: auto;">
          </pdf>
      </div>


    </div>
</template>

<script>
  import {addCollectAPI, delCollectAPI} from '@/api/my.js';
  import pdf from 'vue-pdf'
    export default {
        name: 'HelloWorld',
        data() {
            return {
              id:null,
              pdfId:null,
              isCollection: false,
              pdfUrl:'',
              numPages:0,
              winH:0,

            }
        },
        created() {
          let winW=document.documentElement.clientWidth;
          this.winH=document.documentElement.clientHeight-(winW*100/375);
          this.id=this.$route.query.id;
          this.pdfId=this.$route.query.pdfId;
          this.isCollection=(this.$route.query.isCollection=='true'||this.$route.query.isCollection==1)?true:false;
          this.loadPdfHandler();
        },
        watch: {},
      computed: {
        token() {  //通过方法访问
          return this.$store.state.token;
        },
      },
      components: {
        pdf
      },
        methods: {
          async loadPdfHandler () {

            this.pdfUrl = pdf.createLoadingTask(this.imgLink(this.pdfId));
            this.pdfUrl.then(pdf => {
              this.numPages = pdf.numPages
            })
          },
          collection() {
            if (!this.token) {
              this.$router.push('/loginPassword');
              return
            }
            let API = this.isCollection ? delCollectAPI : addCollectAPI;
            API({
                "goodsList": [
                  {
                    "id": this.id,
                    "type": "2-1"
                  }
                ]
              }
            ).then(res => {
              if (res.data.status) {
                this.isCollection = !this.isCollection;
                this.$valert.show(`${this.isCollection ? '收藏成功' : '已取消收藏'}`);
                this.$router.push({path: this.$route.fullPath, query: {isCollection:this.isCollection}});
              }
            })
          },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.pdf{
  width: 100%;
  height: 100%;
  .DetailTit {
    width: 100%;
    position: fixed;
    z-index: 12;
    top: 0;
    left: 0;
    background: url("../../assets/img/list/top-bg.png") no-repeat;
    background-size: cover;
    height: .44rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .back {
      width: .1rem;
      height: .18rem;
      padding: .05rem .05rem .05rem .12rem;
      img {
        width: .1rem;
        height: .18rem;
      }
    }

    .send {
      display: block;
      padding-right: .18rem;
      img{
        width: .2rem;
        height: .2rem;
      }
    }
  }
  .content{
    width: 100%;
    padding-top: .8rem;
  }
}
</style>
