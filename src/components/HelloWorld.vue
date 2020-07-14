<template>
  <div class="hello">

    <!--<ul  ref='remove'>
      <li v-for="(item,index) in data" :key="index" @touchstart='touchStart($event,item.id)'
          @touchmove='touchMove($event,item.id)'
          @touchend='touchEnd'>
        &lt;!&ndash;{{moveId==item.id}}&ndash;&gt;
        <div class="blockCont">
          <h1>{{item.title}}</h1>
          <h1>{{item.con}}</h1>
        </div>
        <div class="noneCont"  :style="moveId==item.id?slideEffect:''">删除{{index}}</div>
      </li>

    </ul>-->

    <ul class="list"  ref='remove'>
      <li v-for="(item,index) in list" :key="index" @touchstart='touchStart($event,item.id)'
          @touchmove='touchMove($event,item.id)'
          @touchend='touchEnd'>
        <div class="blockCont">
        <h1>{{item.title}}</h1>
        <p :id="'intr'+index">{{Ellipsis('intr' + index, 2, item.intro, '.2')}}</p>
        <h2>{{item.createTime}}</h2>
        </div>
        <div class="noneCont"  :style="moveId==item.id?slideEffect:''">删除</div>
      </li>
    </ul>

  </div>
</template>

<script>
  import {getCollectAPI, getShelfListAPI} from '@/api/my';
  var desW = 375,
    winW = document.documentElement.clientWidth, //动态获取设备的屏幕宽度
    ratio = winW / desW;
    let curWidth = ratio * 144;
    console.log(11111,curWidth)

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        data: [
          {title: '标题一', con: '第三方接收到回复会计师的回复就看电视的，教材V型白毛女本项目处女必须承诺', id: 1},
          {title: '标题二', con: '今天继续大V十点多方便是放大部分是个符合规范，教材V型白毛女本项目处女必须承诺', id: 2},
          {title: '标题三', con: 'Kitty热一热同意让他一人同意让他，教材V型白毛女本项目处女必须承诺', id: 3},
          {title: '标题四', con: '个梵蒂冈地方个符合规划就更换技工好几个环节，教材V型白毛女本项目处女必须承诺', id: 4},
          {title: '标题五', con: '说得对发生的，教材V型白毛女本项目处女必须承诺', id: 5}

          ],
        moveId:null,
        startX:0,//开始触摸的位置
        moveX:0,//滑动时的位置
        endX:0,//结束触摸的位置
        disX:0,//移动距离
        slideEffect:'',//滑动时的效果,使用v-bind:style="deleteSlider"
        list:[],
      }
    },
    created(){
      this.getList();
    },
    methods:{
      getList(){
        let data = {
          goodsType:'2-2',
          pageNum: 2,
          pageSize: 10
        };
        getCollectAPI(data).then(res => {
          if (res.data.status) {
            this.list = [...this.list,...res.data.data.list];
          }
        })
      },
      touchStart:function(ev,id) {
        if(this.moveId!=id){
          this.slideEffect = 'transform:translateX(' + '-'+0 + 'px)';
        }
        this.moveId=id;
        ev = ev || event;
        ev.preventDefault();

        if(ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          this.startX = ev.touches[0].clientX; // 记录开始位置
        }
      },
      touchEnd:function(ev){
        ev = ev || event;
        ev.preventDefault();
        this.endX=ev.changedTouches[0].clientX;
        console.log('结束的',ev.changedTouches[0].clientX, this.startX)
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
          console.log(this.disX,curWidth)
          if(this.disX>curWidth){

            this.slideEffect = 'transform:translateX(' + '-'+curWidth/2 + 'px)';
          }else if(this.disX!=0){
            this.slideEffect = 'transform:translateX(' + '-'+0 + 'px)';
          }

        }
      },

      touchMove:function(ev,id) {
        ev = ev || event;
        ev.preventDefault();
        let btnWidth = this.$refs.remove.offsetWidth;  //$refs 减少获取dom节点的消耗
        /*let btnImg = this.$refs.btnImg.offsetWidth;*/
        /*console.log(ev.targetTouches);
        console.log(ev.changedTouches);*/
        if (ev.touches.length == 1) {
          //滑动时距离浏览器左侧的距离
          this.moveX = ev.touches[0].clientX;

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


      }
      },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .list {
    padding: .7rem .12rem 0 .12rem;
    li {
      position: relative;
      padding-top: .15rem;
      border-bottom: 1px solid #EEEEEE;
      .blockCont{
        width: 100%;
        h1 {
          font-size: .16rem;
          color: #222222;
          height: .28rem;
        }
        p {
          color: #808287;
          font-size: .13rem;
          line-height: .2rem;
          margin-bottom: .1rem;
        }
        h2 {
          text-align: right;
          color: #BCC1CB;
          font-weight: normal;
          font-size: .11rem;
          padding-bottom: .1rem;
        }
      }

    }
    .noneCont{
      width: .6rem;
      height: 100%;
      background-color:#EE5931;
      left:3.75rem;
      top:0;
      position: absolute;
      color: #FFFFFF;
      font-size: .17rem;
      line-height: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }

  }
/*  .hello {
    width: 3.75rem;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    li{
      position: relative;
      width:3.75rem;
      height: .5rem;
      !*display: flex;*!
      h1 {
        font-size: 0.12rem
      }


    }


  }*/

</style>
