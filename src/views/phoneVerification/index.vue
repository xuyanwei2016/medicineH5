<template>
  <!--手机验证-->
  <div class="phoneVerification">
    <myHeader></myHeader>
    <div class="img" v-if="$route.name=='phoneVerification'">
      <img src="../../assets/img/personal/tips.png" alt="">
    </div>

    <div class="tips" v-if="$route.name!='phoneVerification'">更换手机后，下次登录可使用新手机号</div>


    <ul class="list">
      <li><span>{{$route.name == 'phoneVerification' ? '手机号' : '新手机号'}}</span>
        <input type="text" placeholder="输入手机号" v-model="phone" @change="phoneFn"></li>
      <li><span>验证码</span>
        <div class="code">
          <input type="text" placeholder="输入验证码" v-model="code">
          <h1 @click="!isShow&&getCode()">{{isShow ? `重新获取(${time}s)` : '获取验证码'}}</h1>
        </div>
      </li>

    </ul>
    <div class="button active" @click="submit">
      提交
    </div>


  </div>
</template>

<script>
  import myHeader from '../../components/myHeader.vue';
  import {getCodeAPI, verifyPhoneAPI, verifySaveAPI,verifyPhoneNumAPI} from '@/api/my.js';
  import Cookies from 'js-cookie';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        phone: '',
        code: '',
        isShow: false,
        time: 60,
        setInter:null,
        historyPhone:[],
        phoneObj:{},
      }
    },
    components: {myHeader},
    created() {
      this.time = 60;
    },
    watch: {
      $route(n, o) {
        this.phone = '';
        this.code = '';
        this.isShow = false;
        this.phoneObj={};
        this.time = 60;
      },
    },
    methods: {
      /*验证手机号*/
      phoneFn() {
        if (this.phone.trim().length != 11) {
          this.$valert.show('请输入正确的手机号');
          return false;
        } else {
          return true;
        }
      },
      async getCode() {
        let self = this;
        if (!this.phoneFn()) {
          return
        };
        if(this.timeDifference()){
          return
        }
        let boo=await self.verifyPhoneNum();
        if(boo){
          return
        }

        self.isShow = true;
        this.setInter = setInterval(() => {
          if (self.time == 0) {
            clearInterval(self.setInter);
            self.isShow = false;
            self.time = 60;
            return
          } else {
            self.time--
          }
        }, 1000);
       /* let phones=[],telObj={time:Date.parse(new Date())/1000,phone:this.phone.trim()};
        phones.push(telObj);
        console.log('时间',telObj)*/

        getCodeAPI({
          phone: this.phone,
          action: this.$route.name == 'phoneVerification' ? '1' : '3'
        }).then(res => {
          if (res.data.status) {
            this.historyPhone=[this.phoneObj,...this.historyPhone];
            Cookies.set('phones',JSON.stringify(this.historyPhone));
          } else {
            this.$valert.show(res.data.msg);
          }

        })

      },
      /*获取时间差*/
      timeDifference(){
        let  self=this;
        this.historyPhone=Cookies.get('phones')?JSON.parse(Cookies.get('phones')):[];
        //获取之前时间
        //获取当前时间
        this.phoneObj={time:Date.parse(new Date())/1000,phone:this.phone.trim()};
        if(this.historyPhone.length>0){
          let curIndex=this.historyPhone.findIndex(function(item, index, arr) {
            return item.phone == self.phone.trim();
          });
          if(curIndex>=0){
            if(this.phoneObj.time-this.historyPhone[curIndex].time>60){
              this.historyPhone.splice(curIndex,1);
            }else{
              this.$valert.show('60s内不能重复发送');
              return true
            }
          }
        }
      },
      /*验证手机号*/
      async verifyPhoneNum(){
        //0：验证成功；5028：验证新手机号是输入的手机号已被注册；5027：新手机号验证输入的是旧手机号；5007：手机号未注册；5022：手机号不一致
        return await this.verifyPhone();
      },
       verifyPhone(){
        return new Promise((resolve, reject) => {
          verifyPhoneNumAPI({
            phone: this.phone,
            action: this.$route.name == 'phoneVerification' ? '1' : '3'
          }).then(res=>{
            if(res.data.data==5028){
              this.$valert.show('验证新手机号是输入的手机号已被注册');
              resolve(true)
            }else if(res.data.data==5027){
              this.$valert.show('请输入新的手机号');
              resolve(true)
            }else if(res.data.data==5007){
              this.$valert.show('手机号未注册');
              resolve(true)
            }else if(res.data.data==5022){
              this.$valert.show('请输入当前登陆的手机号');
              resolve(true)
            }else if(res.data.data==0){
              resolve(false)
            }
          })
        }).then((resq)=>{
          return resq
        }).catch((err)=>{
          console.log('报错',err)
        })
      },


      submit() {
        let self=this;
        clearInterval(self.setInter);
        if (!this.phoneFn()) {
          return
        };
        if (this.code.trim() == '') {
          this.$valert.show('请输入验证码');
          return false;
        }

        let API = this.$route.name == 'phoneVerification2' ? verifySaveAPI : verifyPhoneAPI;
        API({
          oldPhone: this.$route.query.oldPhone,
          phone: this.phone,
          code: this.code
        }).then(res => {
          if (res.data.status) {
            if (this.$route.name == 'phoneVerification2') {
              this.$store.commit('setToken',res.data.data);
              this.$router.push({path: '/my'});
            } else {
              this.$router.push({path: '/phoneVerification2', query: {oldPhone: this.phone}});
            }

          } else {
            this.$valert.show(res.data.msg);
          }

        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .phoneVerification {
    background: #f8f8f8;
    height: 100%;
    width: 100%;

    .img {
      padding-top: .64rem;
      background: #fff;
      display: flex;
      justify-content: center;
      height: 1.7rem;
      img {
        width: 1.92rem;
        height: 1.26rem;
      }
    }
    .tips {
      /*width: 100%;*/
      padding: .66rem .15rem 0 .15rem;
      height: .3rem;
      line-height: .3rem;
      background: #FFF7F1;
      color: #FF9E4F;
    }
    .list {

      background: #fff;
      li {
        border-bottom: 1px solid #EEEEEE;
        padding: 0 .12rem;
        height: .56rem;
        line-height: .56rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: .15rem;
          color: #202021
        }
        .code {
          width: 2.65rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        input {
          width: 2.65rem;
          height: .56rem;
          line-height: .56rem;
          border: none;
          font-size: .15rem;
        }
        input::-webkit-input-placeholder {
          color: #878787;
        }
        input::-o-input-placeholder {
          color: #878787;
        }
        input::-moz-input-placeholder {
          color: #878787;
        }
        input::-ms-input-placeholder {
          color: #878787;
        }
        h1 {
          font-size: .14rem;
          color: #0D70BA;
          font-weight: normal;
          border-left: 1px solid #E4E4E4;
          height: .18rem;
          line-height: .18rem;
          padding: 0 .03rem 0 .15rem;
          display: block;
        }
      }
      li:last-child input {
        width: 1.3rem;

      }

    }

    .button {
      margin: .5rem auto 0;
      text-align: center;
      width: 3.05rem;
      height: .42rem;
      line-height: .42rem;
      font-size: .15rem;
      color: #5F6775;
      border-radius: .21rem;
      background: #E6E6E6;
      box-shadow: 0.01rem .03rem .06rem 0rem rgba(0, 0, 0, 0.1);
    }
    .active {
      background: url("../../assets/img/detail/button.png") no-repeat;
      background-size: cover;
      color: #fff;
      font-weight: bold;
      box-shadow: 0.01rem .03rem .06rem 0rem rgba(15, 122, 203, 0.1);

    }

  }
</style>
