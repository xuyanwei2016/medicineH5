<template>
  <div class="listHeader">
    <div class="DetailTit">
      <div class="back" @click="$router.go(-1)">
        <img src="../assets/img/list/back.png" alt="">
      </div>
      <div class="set">
        {{$route.meta}}
      </div>
      <div class="send" v-if="routers.includes($route.name)" @click="saveInfo">保存</div>
      <div class="send" @click="isScreen=!isScreen" v-else>筛选</div>

    </div>

    <div class="search" v-if="!routers.includes($route.name)">
      <input type="text" placeholder="请输入要搜索的内容" v-model="value" @keypress="keyFn"  ref="input1">
    </div>

    <!--筛选-->
    <div class="screen" v-if="isScreen">
      <ul>
        <li v-for="(itemNa,indexNa) in nationList" :key="indexNa" :class="curNation.includes(itemNa.id)?'active':''"
            @click="changeNation(itemNa,indexNa)">{{itemNa.name}}
        </li>
      </ul>
      <div class="button">
        <span @click="reset">重置</span>
        <span @click="sumbit">确定</span>
      </div>
    </div>

  </div>
</template>

<script>
  import {getNationAPI} from '@/api/list';
  import {addHotswAPI} from '@/api/home';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        nationList: [{name: '全部', id: 'null'}],
        curNation: ['null'],
        isScreen: false,
        routers: ['edit'],
        value: '',
      }
    },
    created() {
      /*this.getNation();*/
    },
    mounted() {
    },
    watch: {
      isScreen(n, o) {
        if (n) {
          let {length: len} = this.nationList;
          if (len > 1) return;
          getNationAPI().then(res => {
            let obj = res.data.data;
            Object.keys(obj).forEach((item) => {
              let itemObj={
                id:item,
                name:obj[item]
              };
              this.nationList.push(itemObj)
            })
          })
        }
      },
    },
    methods: {
      getNation(){
        this.nationList= [{name: '全部', id: 'null'}];
        /*this.$valert.show(1111)*/
        getNationAPI().then(res => {

          let obj = res.data.data;
          Object.keys(obj).forEach((item) => {
            let itemObj={
              id:item,
              name:obj[item]
            };
            this.nationList.push(itemObj)
          })
          /*Object.keys(obj).forEach(function(key){

     console.log(key,obj[key]);

});*/
          /*let data = Object.keys(obj).forEach((item, index) => {
            return Object.fromEntries([
              ['id', item],
              ['name', Object.values(obj)[index]]
            ])
          })
          this.$valert.show(data);
          this.nationList = data;*/

        })
      },
      keyFn(e) {
        if (e.keyCode === 13) {
          let data={
            pageNum:1,
            content:this.value.trim()?this.value.trim():null,
            nationsType:this.curNation.includes('null')?null:this.curNation,
          };
          this.$refs.input1.blur();
          this.$emit('sonFn',data);
          this.addHotsw(this.value.trim());
        }
      },
      /*添加热词*/
      addHotsw(val){
        addHotswAPI({
          content:val
        }).then(res=>{

        })
      },
      changeNation(item) {
        if (item.id == 'null') {
          this.curNation = ['null'];
        } else {
          if (this.curNation.includes('null')) {
            this.curNation = [];
          }

          if (this.curNation.includes(item.id)) {
            let index = this.curNation.findIndex(function (value, index, arr) {
              return value == item.id;
            })
            this.curNation.splice(index, 1);
            this.curNation.length == 0 ? this.curNation.push('null') : true;
          } else {
            this.curNation.push(item.id);
          }
        }

      },
      sumbit(){
        let data={
          pageNum:1,
          content:this.value.trim(),
          nationsType:this.curNation.includes('null')?null:this.curNation,
        };
        this.$emit('sonFn',data);
        this.isScreen=false;
      },
      /*重置*/
      reset(){
        this.curNation=['null'];
        let data={
          pageNum:1,
          content:this.value.trim(),
          nationsType:null,
        };
        this.$emit('sonFn',data);
        this.isScreen=false;
      },
      saveInfo(){
        this.$emit('saveInfo');
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .listHeader {
    .DetailTit {
      width: 100%;
      position: fixed;
      z-index: 12;
      top: 0;
      left: 0;
      background: url("../assets/img/list/top-bg.png") no-repeat;
      background-size: cover;
      height: .44rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .back {
        width: .11rem;
        height: .18rem;
        padding: .05rem  .05rem .05rem .12rem;
        img {
          width: .1rem;
          height: .18rem;
        }
      }
      .set {
        color: #fff;
        font-size: .18rem;
        font-weight: bold;
      }
      .send {
        display: block;
        height: .31rem;
        line-height: .28rem;
        color: #fff;
        font-size: .15rem;
        padding-right: .12rem;

      }
    }

    .search {
      padding-top: .65rem;
      width: 100%;
      height: .56rem;
      background: #F6F8FE;
      text-align: center;
      border-bottom: 1px solid #F1F3F8;
      input {
        width: 3rem;
        height: .35rem;
        padding-left: .33rem;
        background: #fff;
        border-radius: .17rem;
        background: url("../assets/img/list/nav_search.png") no-repeat .16rem .12rem;
        border: none;
        background-size: .125rem .125rem;
        box-shadow: .02rem .02rem .07rem .01rem rgba(141, 158, 185, 0.3);
        font-size: .14rem;
      }
    }

    /*筛选*/
    .screen {
      width: 100%;
      height: 100%;
      position: fixed;
      background: #fff;
      padding-top: .8rem;
      top: 0;
      left: 0;
      z-index: 10;
      ul {
        padding: 0 0 0 .15rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        li {
          width: .78rem;
          height: .31rem;
          line-height: .31rem;
          text-align: center;
          border: 1px solid #D2D6D9;
          border-radius: .03rem;
          font-size: .13rem;
          color: #3C3F46;
          margin-bottom: .09rem;
          margin-right: .09rem;
        }
        .active {
          border-color: #DE6209;
          color: #DE6209;
        }
      }
      .button {
        width: 2.92rem;
        padding: 0 .4rem;
        position: fixed;
        display: flex;
        justify-content: space-between;
        bottom: .5rem;
        z-index: 12;
        span {
          display: block;
          width: 1.4rem;
          height: .4rem;
          background: #EEEEEE;
          text-align: center;
          line-height: .4rem;
          color: #333333;
          font-size: .15rem;
        }
        span:last-child {
          background: url("../assets/img/list/okBG.png") no-repeat;
          background-size: cover;
          color: #fff;
          font-size: .17rem;
        }
      }
    }
  }
</style>
