<template>
  <!--系统消息-->
  <div class="messages">
    <myHeader></myHeader>
    <div :style="{width:'3.75rem',overflowX:'hidden',overflowY:'auto',height:messList.length>0?winH+'px':''}"  v-infinite-scroll="load" infinite-scroll-disabled="disabled" v-if="messList.length>0">

      <ul class="list" ref='remove'>
        <li v-for="(item,index) in messList" :key="item.id" :style="moveId==item.id?slideEffect:''">
          <mt-cell-swipe
            :right="[
              {
                content: '删除',
                style: { background: 'red', color: '#fff',marginLeft:'0',fontSize:'.16rem'},
                handler: () => delBtn(item)
              }
            ]">
          <div class="blockCont">
            <div class="tit">
              <!--status (integer, optional): 状态：0未读，1已读，2已删除 ,-->
              <div class="titLeft" @click="$router.push({path:'/messageDetail',query:{id:item.id}})">
                <h1>{{item.title}}</h1>
                <span v-if="item.status==0"></span>
              </div>
              <span  v-if="item.sendTime">{{setTime(item)}}</span>
            </div>
            <p :id="'cont'+index"  @click="$router.push({path:'/messageDetail',query:{id:item.id}})">{{Ellipsis('cont'+index,2,item.content,'.21')}}</p>
          </div>
          <!--<div class="noneCont"  @click.stop="delBtn(item)">删除</div>-->
          </mt-cell-swipe>
        </li>
        <li class="moreOnly" v-if="!noMore">
          <div v-if="loading==1&&messList.length>0">加载中...</div>
        </li>
        <li v-if="noMore&&messList.length>10"><div class="noHave" >
          这是我的底线 <img src="../../assets/img/list/nohave.png" alt="">
        </div></li>
      </ul>



    </div>

    <noHave :mess="{top:winH,loading:loading}" v-if="messList.length==0"></noHave>
  </div>
</template>

<script>
  import noHave from '../../components/noHave.vue';
  import {getMessageAPI} from '@/api/home.js';
  import {deletePMAPI} from '@/api/my.js';
  import myHeader from '../../components/myHeader.vue';
  var desW = 375,
    winW = document.documentElement.clientWidth, //动态获取设备的屏幕宽度
    ratio = winW / desW;
  let curWidth = ratio * 120;
  export default {
    name: 'HelloWorld',
    data() {
      return {
        messList:[],
        loading: 0,
        total:0,
        pageNum:1,
        pageSize:10,
        moveId:null,
        startX:0,//开始触摸的位置
        startY:0,//开始触摸的位置
        moveX:0,//滑动时的位置
        endX:0,//结束触摸的位置
        disX:0,//移动距离
        slideEffect:'',//滑动时的效果,使用v-bind:style="deleteSlider"
      }
    },
    components: {
      myHeader,
      noHave
    },
    computed:{
      noMore () {
        return this.messList.length == this.total;
      },
      disabled () {
        return this.loading==1||this.noMore||this.total<=10;
      },
      token() {  //通过方法访问
        return this.$store.state.token;
      },
    },
    created() {
      let winW=document.documentElement.clientWidth;
      this.winH=document.documentElement.clientHeight;
      this.getMessage();
    },
    watch: {},
    methods: {
      reg(val){
        return val.replace(/<[^>]+>/g, "");
      },
      load () {
        this.loading = 1;
        this.pageNum += 1;
        this.getMessage();
      },
      getMessage(){
        /*this.loading=1;*/
        getMessageAPI({pageNum:this.pageNum,pageSize:this.pageSize}).then(res=>{
          if(res.data.status){
            this.messList=[...this.messList,...res.data.data.list];
            this.total=res.data.data.total;
            this.loading=2;
          }
        })
      },
      setTime(val){

        if(val.systemTime<86400){
          console.log(Math.floor(val.systemTime/60));

          if(val.systemTime<3600){
            return Math.ceil(val.systemTime/60)+'分钟前';
          }else{
            /*let h=Math.floor(val.systemTime/3600);
            let m=Math.floor((val.systemTime%3600)/60);
            let s=(val.systemTime%3600)%60;
            return h+'时'+m+'分'+s+'秒';*/
            let time=val.sendTime.split(/[\-:\s]/);
            return time[3]+':'+time[4]
          }

          return
        }
        let time=val.sendTime.split(/[\-:\s]/);
        return time[1]+'-'+time[2]+' '+time[3]+':'+time[4]
      },

      touchStart:function(ev,id) {
        if(this.moveId!=id){
          this.slideEffect = 'transform:translateX(' + '-'+0 + 'px)';
        }
        this.moveId=id;
        ev = ev || event;
        /*ev.preventDefault();*/


        if(ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          this.startX = ev.touches[0].clientX; // 记录开始位置
          this.startY = ev.touches[0].clientY; // 记录开始位置
        }
      },
      touchEnd:function(ev){
        ev = ev || event;
        /*ev.preventDefault();*/

        this.endX=ev.changedTouches[0].clientX;
        console.log('结束的',ev)
        /*if(this.endX>100){
          console.log('移动超过显示距离')
          this.slideEffect = "transform:translateX("+'-'+100+ "px)";
        }else{
          this.slideEffect = 'transform:translateX(0px)';
        }*/
        let btnWidth = this.$refs.remove.offsetWidth;
        /*let btnImg = this.$refs.btnImg.offsetWidth;*/
//                      console.log(ev.changedTouches);
        if(ev.changedTouches.length == 1) {
          let endX = ev.changedTouches[0].clientX;
          this.disX = this.startX-endX;
          console.log(222,this.disX,curWidth)
          if(this.disX>curWidth){
            this.slideEffect = 'transform:translateX(' + '-'+curWidth/2 + 'px);backgroundColor:#F6F6F6';
          }else if(this.disX!=0){
            this.slideEffect = 'transform:translateX(' + '-'+0 + 'px)';
          }else{
            /* @tap.stop="$router.push({name:'messageDetail',query:{id:item.id}})"*/
           /* this.$router.push({name:'messageDetail',query:{id:item.id}});*/
          }

        }
      },

      touchMove:function(ev,id) {
        ev = ev || event;
        /*ev.preventDefault();*/
        let btnWidth = this.$refs.remove.offsetWidth;  //$refs 减少获取dom节点的消耗
        /*let btnImg = this.$refs.btnImg.offsetWidth;*/
        /*console.log(ev.targetTouches);
        console.log(ev.changedTouches);*/
        if (ev.touches.length == 1) {
          //滑动时距离浏览器左侧的距离
          this.moveX = ev.touches[0].clientX;
          let moveY= ev.touches[0].clientY;
          let x=Math.abs(this.startX - this.moveX),y=Math.abs(this.startY-moveY);
          if(y>x){return};
          //实时的滑动的距离-起始位置=实时移动的位置
          this.disX = this.startX-this.moveX;

          let num =this.slideEffect.match(/\d+/g)?this.slideEffect.match(/\d+/g)[0]:0;
          if (this.disX <= 0) {
            this.slideEffect = 'transform:translateX(' + 0 + 'px)';
          } else if (curWidth>=this.disX > 0) {
            if(num==curWidth){return}
            this.slideEffect = 'transform:translateX(' + '-'+this.disX/2 + 'px)';

            // 最大也只能等于删除按钮宽度
            /*if (this.disX >= btnWidth) {
              this.slideEffect = 'transform:translateX(' + (btnWidth - 375) + 'px)';
            }*/
          }else{
            this.slideEffect = 'transform:translateX(' + '-'+curWidth/2 + 'px)';
          }
        }


      },

      delBtn(item){
        console.log('删除信息')
        if (!this.token) {
          this.$router.push('/loginPassword');
          return
        }
        deletePMAPI(item.pmmId).then(res => {
          if (res.data.status) {
            this.$valert.show(`删除成功`);
            this.pageNum=1;
            this.loading=0;
            this.total=0;
            this.messList = [];
            this.getMessage();
          }else{
            this.$valert.show(res.data.msg);
          }
        })
      },

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .messages {
    .list {
      padding: .45rem 0 0;
      li {
        width: 4.35rem;
        margin-right: 0;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        .blockCont{
          width:3.51rem;
          margin: .15rem .12rem 0 .12rem;
          padding-bottom: .1rem;
          border-bottom: 1px solid #EEEEEE;
          .tit {
            height:.16rem;
            line-height: .16rem;
            display: flex;
            padding-bottom: .13rem;
            justify-content: space-between;
            .titLeft{
              position: relative;
              display: flex;
              justify-content: flex-start;
              h1{
                max-width:2.6rem;
                font-size: .16rem;
                color: #202021;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                height: .2rem;
                line-height: .2rem;

              }
              span{
                width: .08rem;
                height: .08rem;
                border-radius: 50%;
                background: #F2332F;
              }
            }
            span{
              color: #BDC2CB;
              font-size: .11rem;
            }
            p{
              display:block;
              color: #808287;
              font-size: .14rem;
              line-height: .21rem;
              /*overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              flex-direction: column;*/

            }
          }
          p{
            display:block;
            color: #333;
            font-size: .12rem;
            line-height: .21rem;
            /*overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            flex-direction: column;*/

          }
        }
        .noneCont{
          float: right;
          width: .6rem;
          height: 100%;
          background-color:#EE5931;
          right:0;
          top:0;
          position: absolute;
          color: #FFFFFF;
          font-size: .17rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

      }
    }

  }
</style>
