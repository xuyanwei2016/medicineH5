<template>
    <div class='loginPas'>
        <!-- <div class='close'><img @click='titleX' src="../../../assets/img/list/gb.png" alt=""></div> -->
        <div class='title'>手机号快捷登录</div>
        <div class='iphone'>
            <img src="../../../assets/register/iphone.png" alt="">
            <input type="text" placeholder="请输入手机号" v-model='iphoneNum' v-on:input='change' @blur='iphoneBlur' oninput="value=value.replace(/[ ]/g,'')">
            <img v-if='this.closeShow' class='iphoneClose' src="../../../assets/register/close.png" alt="" @click='closeIphone'>
        </div>
        <div class='verCode'>
            <img src="../../../assets/register/yzm.png" alt="">
            <input type="text" placeholder="请输入验证码" v-model='codeNum' @blur='codeBlur' oninput="value=value.replace(/[ ]/g,'')">
            <button @click="addBtnFlag && getlogin()" class="verCodeRight" type="primary">{{ btnText }}</button>
        </div>
        <button :class='btnData?"login":"loginNo"' @click='btnData?signInBtn():""'>登录</button>
        <router-link to='../loginPassword'><div class='loginNum'>账号登录</div></router-link>
        <div class='goRegister'>
            <span class='goRSpan01'>还没有账号？</span>
            <router-link to='../register'><span class='goRSpan02'>立即注册 ></span></router-link>
        </div>
        <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="toastText" :position="position" width='auto'></toast>
    </div>
</template>
<script>
import { getLoginCodeAPI,getSignInAPI } from '@/api/login/login.js'
import { setTimeout } from 'timers';
import router from "../../../router";
export default {
    data(){
        return{
            showPositionValue: false, //是否显示提示
            position: 'center', //提示信息的位置
            toastText: '', // 提示文本
            codeNum:'',
            interval:undefined,
            totalCount:-1,
            addBtnFlag:true,
            iphoneNum:'',
            closeShow:false,
        }
    },
    computed:{
        btnText(){
          return this.totalCount >=0? `重新获取(${this.totalCount}s)`: "获取验证码"
        },
        btnData(){
            return this.iphoneNum!==''&&this.codeNum!==''
        }
    },
    mounted(){
        document.body.style.backgroundColor = '#fff'
    },
    created(){

    },
    methods:{
        change(){
            if( this.iphoneNum.length>=1 ){
                this.closeShow = true
            }else{
                this.closeShow = false
            }
        },
        closeIphone(){
            this.iphoneNum = ''
            this.closeShow = false
        },
        codeBlur(){
            let reg = /^[0-9]+$/
            if( !reg.test(this.codeNum) && this.codeNum.length !== 0){
                this.showPositionValue = true;
                this.toastText = '非法字符'
            }
        },
        iphoneBlur(){
            let reg = /^1[3456789]\d{9}$/
            if( !reg.test(this.iphoneNum) ){
                this.showPositionValue = true;
                this.toastText = '请输入正确的手机号'
            }
        },
        getlogin(){
            if( this.iphoneNum.length != '11' ){
                this.showPositionValue = true;
                this.toastText = '请输入正确的手机号'
                return
            }else{
                getLoginCodeAPI(this.iphoneNum).then(res=>{
                    if( res.data.code == 0 ){
                        this.totalCount=60
                        this.showPositionValue = true;
                        this.toastText = '已发送验证码'
                        if( this.addBtnFlag ){
                            this.interval=setInterval(()=>{

                                if(this.totalCount < 0){
                                    clearInterval(this.interval)
                                    this.addBtnFlag = true
                                }else{
                                  this.totalCount--
                                  this.addBtnFlag = false
                                }
                            },1000);
                        }
                        if( res.data.data.count == '6' ){
                            this.showPositionValue = true;
                            this.toastText = '该手机号还可以验证4次，请尽快验证'
                        }
                    }else{
                        this.showPositionValue = true;
                        this.toastText = res.data.msg
                    }
                })
            }
        },
        signInBtn(){
          if(this.$store.state.goBack){
            this.$router.go(-2);
          }else{
            this.$router.push('/');
          }

          return
            let data = {
                account:this.iphoneNum,
                code:this.codeNum
            }
            getSignInAPI(data).then(res=>{
                if( res.data.code == 0 ){
                    this.showPositionValue = true;
                    this.toastText = '登录成功'
                    this.$store.commit('setTokenTwo',res.data.data)
                }else if( res.data.code == 5002 ){
                    this.$router.push({path:'/setPassword',query:{phone:this.iphoneNum}})
                }
                else{
                    this.showPositionValue = true;
                    this.toastText = res.data.msg
                }
            })
        },
        titleX(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped lang='less'>
    .loginPas{
        overflow: hidden;
        background:#fff;
        .close{
            width:0.3rem;
            font-size:0.36rem;
            color:#222;
            text-align:left;
            text-align: left;
            margin-left:0.24rem;
            img{
                width:0.18rem;
                height:0.18rem;
                margin-top:0.17rem;
            }
        }
        .title{
            color:#333;
            font-size:0.22rem;
            font-weight:bold;
            text-align: left;
            text-align: left;
            margin:0.89rem 0 0.22rem 0.24rem;
        }
        .iphone,.verCode{
            width:3.45rem;
            height:0.63rem;
            margin:auto;
            border-bottom:0.01rem solid #E3E3E3;
            img{
                float:left;
                margin:0.21rem 0.15rem 0 0.12rem;
            }
            input{
                border:none;
                font-size:0.15rem;
                float:left;
                margin-top:0.2rem;
                background-color: transparent;
            }
            .verCodeRight{
                width:auto;
                height:0.18rem;
                background:none;
                float:right;
                font-size:0.13rem;
                color:#0D70BA;
                margin:0.22rem 0.1rem;
                border:none;
                border-left:0.01rem solid #E4E4E4;
                padding-left:0.1rem;
            }
        }
        .iphone{
            img{
                width:0.15rem;
                height:0.2rem;
            }
            .iphoneClose{
                float: right;
                width: 0.25rem;
                height: 0.25rem;
                margin: 0.19rem 0.04rem 0 0;
            }
        }
        .verCode{
            img{
                width:0.17rem;
                height:0.2rem;
            }
            input{
                padding-right:0.05rem;
                width:1.5rem;
            }
        }
        .login{
            display:block;
            width:3.01rem;
            height:0.42rem;
            border:none;
            background:url('../../../assets/register/loginBackground.png') no-repeat center;
            background-size:100%;
            border-radius: 0.21rem;
            color:#fff;
            -webkit-box-shadow:0rem 0.03rem 0.09rem #BBD5FD;
            -moz-box-shadow:0rem 0.03rem 0.09rem #BBD5FD;
            box-shadow:0rem 0.03rem 0.09rem #BBD5FD;
            margin:0.4rem auto 0.27rem auto;
            font-size:0.15rem;
            letter-spacing: 0.02rem;
            font-weight:bold;
            line-height:0.42rem;
            text-align: center;
        }
        .loginNo{
            display:block;
            width:3.01rem;
            height:0.42rem;
            border:none;
            border-radius: 0.21rem;
            margin:0.4rem auto 0.27rem auto;
            font-size:0.15rem;
            letter-spacing: 0.02rem;
            font-weight:bold;
            line-height:0.42rem;
            text-align: center;
            color:#5F6775;
            background:#E6E6E6;
        }
        .loginNum{
            color:#0D70BA;
            font-size:0.13rem;
            margin-bottom:2.33rem;
            text-align: center;
        }
        .goRegister{
            font-size:0.13rem;
            text-align: center;
        }
        .goRSpan02{
            color:#0D70BA;
        }
    }
</style>
