<template>
  <!--民族列表-->
    <div class="nationList">
      <div class="DetailTit">
        <!--<div class="back">
          <img src="../assets/img/list/back.png" alt="">
        </div>-->
        <div class="set">
          {{$route.meta}}
        </div>
        <!--<div class="send">筛选</div>-->
      </div>

      <ul class="list">
        <li v-for="(item,index) in list" :key="index"  @click="linkDetail(item)">
          <img :src="imgLink(item.coverImg)" alt="">
          <div class="info"><span></span>{{item.nationalName}}<span></span></div>
        </li>

      </ul>
      <Foot></Foot>
    </div>
</template>

<script>
  import Foot from '../../components/Foot.vue';
  import { uploadUrlT} from '@/utils/global.js';
  import {getNationListAPI,getImgLinkAPI} from '../../api/list.js';
  import imgBg from '../../assets/img/list/notia.png';
    export default {
        name: 'HelloWorld',
        data() {
            return {
              list:[],
              uploadUrlT:uploadUrlT,
              imgBg:imgBg,
            }
        },
      components:{
        Foot,
      },
        created() {
          this.getList();
        },
        watch: {},
        methods: {
          /*详情*/
          linkDetail(val){
            this.$router.push({path:'/nationDetail',query:{id:val.nationsType,val:val.nationalName,bg:val.backgroundImg}})
          },
          /*获取列表*/
          getList(){
            getNationListAPI().then(res=>{
              if(res.data.status){
                this.list=res.data.data.list;
                /*this.list.forEach((item,index)=>{
                  getImgLinkAPI(item.backgroundImg).then(resLink=>{
                    let img=resLink.data.data?this.uploadUrlT+resLink.data.data:this.imgBg;
                    this.$set(item,'link',img);
                  }).catch(req=>{
                    this.$set(item,'link',this.imgBg);
                  })
                })*/

              }

            })
          },
        },
      /*beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
        if(to.name=='nationDetail'){
          to.meta.keepAlive = false;
        }
        next();
      }*/
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nationList{
  padding-top: .6rem;
  .DetailTit {
    width: 100%;
    position: fixed;
    z-index: 12;
    top: 0;
    left: 0;
    background: url("../../assets/img/list/top-bg.png") no-repeat;
    background-size: cover;
    height: .44rem;
    line-height: .44rem;
    display: flex;
    justify-content:center;
    .back {
      width: .11rem;
      height: .18rem;
      padding-left: .12rem;
      padding-top: .05rem;
      img {
        width: .11rem;
        height: .18rem;
      }
    }
    .set {
      color: #fff;
      font-size: .18rem;
      font-weight: bold;
    }
    .send{
      display: block;
      height: .31rem;
      line-height: .28rem;
      color: #fff;
      font-size: .15rem;
      padding-right: .12rem;

    }
  }

  .list{
    padding: 0 .15rem .7rem;
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    li{
      width: 1.67rem;
      height: 1.1rem;
      margin-bottom: .11rem;
      position: relative;
      img{
        width: 1.67rem;
        height: 1.1rem;
      }
      .info{
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        background: rgba(0,0,0,0.5);
        z-index: 11;
        position: absolute;
        line-height:.215rem;
        font-size: .15rem;
        color: #FEFEFE;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          display: inline-block;
        }
        span:first-child{
          background: url("../../assets/img/list/noLeft.png") no-repeat;
          background-size: cover;
          width: .13rem;
          height: .215rem;
          margin-right: .05rem;
        }
        span:last-child{
          background: url("../../assets/img/list/noRight.png") no-repeat;
          background-size: cover;
          width: .13rem;
          height: .215rem;
          margin-left: .05rem;
        }
      }
    }
  }
}
</style>
