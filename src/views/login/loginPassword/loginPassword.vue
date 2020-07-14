<template>
    <transition v-on:before-enter='beforeEnter' v-on:enter='enter' v-on:after-enter='afterEnter'>
        <div class='loginPas'>
            <!-- <div class='close'><img src="../../../assets/img/list/gb.png" alt=""></div> -->
            <div class='title'>账号登录</div>
            <div class='iphone'>
                <img src="../../../assets/register/iphone.png" alt="">
                <input type="text" placeholder="请输入手机号或用户名" v-model='phoneNum' v-on:input='change' @blur='phoneBlur' oninput="value=value.replace(/[ ]/g,'')">
                <img v-if='this.closeShow' class='iphoneClose' src="../../../assets/register/close.png" alt="" @click='closeIphone'>
            </div>
            <div class='verCode'>
                <img class='verLeft' src="../../../assets/register/password.png" alt="">
                <input type="password" placeholder="请输入密码" ref='passwordRef' v-model='passwordNum' @blur='passwordBlur' oninput="value=value.replace(/[ ]/g,'')">
                <img v-if='eyeShow' class='verCodeBkj' src="../../../assets/register/bkj.png" alt="" @click='eyeBtn'>
                <img v-else class='verCodekj' src="../../../assets/register/kj.png" alt="" @click='eyeBtnNo'>            
            </div>
            <div class='verCode' v-if='countShow'>
                <img class='verLeft' src="../../../assets/register/yzm.png" alt="">
                <input type="text" class='verCodeInput' placeholder="请输入数字验证码" v-model='countNum' oninput="value=value.replace(/[ ]/g,'')">
                <img :src="baseImg" alt="" class='verCodeImg'>
            </div>
            <router-link to='../resetOne'><div class='forget'>忘记密码？</div></router-link>
            <button :class='btnState?"login":"loginNo"' @click='btnState?loginBtn():""'>登录</button>
            <router-link to='../loginNumber'><div class='loginNum'>手机号码快捷登录</div></router-link>
            <div class='goRegister'>
                <span class='goRSpan01'>还没有账号？</span>
                <router-link to='../register'><span class='goRSpan02'>立即注册 ></span></router-link>
            </div>
            <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="toastText" :position="position" width='auto'></toast>
        </div>
    </transition>
</template>
<script>
import {passwordLoginAPI,getCountAPI,getImgCodeAPI} from '@/api/login/login'
import md5 from 'blueimp-md5';
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            eyeShow:false,
            showPositionValue:false,
            toastText:'',
            position: 'center',
            phoneNum:'',
            passwordNum:'',
            countShow:false,
            countNum:'',
            baseImg:{},
            baseUuid:'',
            closeShow:false,

        }
    },
    mounted(){
        document.body.style.backgroundColor = '#fff'
    },
    computed:{
        btnState(){
            if( this.countShow ){
                return this.phoneNum!==''&&this.passwordNum!==''&&this.countNum!==''
            }else{
                return this.phoneNum!==''&&this.passwordNum!==''
            }
        }
    },
    created(){
        
    },
    methods:{
        beforeEnter:function(el){
            
        },
        enter:function(el,done){
            
        },
        afterEnter:function(el){

        },
        change(){
            if( this.phoneNum.length>=1 ){
                this.closeShow = true
            }else{
                this.closeShow = false
            }
        },
        closeIphone(){
            this.phoneNum = ''
            this.closeShow = false
        },
        getCount(){ //获取登录错误次数
            let data = {
                account:this.phoneNum,
                password:md5(this.passwordNum).toUpperCase()
            }
            getCountAPI(data).then(res=>{ //验证码显示
                if( res.data.code == 0 ){
                    if( res.data.data >= 3 ){
                        this.countShow = true
                        this.getImgCode()
                    }
                }
            })
        },
        getImgCode(){
            getImgCodeAPI().then(res=>{
                this.baseImg = res.data.img
                this.baseUuid = res.data.uuid
            })
        },
        phoneBlur(){
            let reg = /^[0-9a-zA-Z-_]{4,20}$/
            if( !reg.test(this.phoneNum) && this.phoneNum.length !== 0 ){
                this.showPositionValue = true
                this.toastText = '输入不合法'
            }
        },
        passwordBlur(){
            let reg = /^[0-9a-zA-Z@#-_]{6,20}$/
            if( this.passwordNum.length < 6 || this.passwordNum.length > 20 ){
                this.showPositionValue = true
                this.toastText = '长度必须在6-20个字符之间'
            }else if( !reg.test(this.passwordNum) ){
                this.showPositionValue = true
                this.toastText = '非法字符'
            }
        },
        loginBtn(){
            let data = {
                account:this.phoneNum,
                password:md5(this.passwordNum).toUpperCase(),
                uuid:this.baseUuid,
                code:this.countNum,
            }
            passwordLoginAPI(data).then(res=>{
                if( res.data.code == 0 ){
                    this.showPositionValue = true 
                    this.toastText = '登录成功';
                    this.$store.commit('setTokenTwo',res.data.data)
                }else if( res.data.code == '3' ){
                    //验证码
                }else{
                    this.showPositionValue = true
                    this.toastText = res.data.msg
                }
            })
            this.getCount()
        },
        eyeBtn(){
            this.eyeShow = false
            this.$refs.passwordRef.setAttribute('type','password')
        },
        eyeBtnNo(){
            this.eyeShow = true
            this.$refs.passwordRef.setAttribute('type','text')
        }
    },
}   
</script>
<style scoped lang='less'>
    .loginPas{
        

        overflow:hidden;
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
        }
        .iphone{
            input{
              width: 2.0rem;
            }
            img{
                width:0.15rem;
                height:0.2rem;
            }
            .iphoneClose{
                float: right;
                width: 0.25rem;
                height: 0.25rem;
                margin: 0.19rem 0.1rem 0 0;
            }
        }
        .verCode{
            .verLeft{
                width:0.17rem;
                height:0.2rem;
            }
            input{
                padding-right:0.05rem;
                width:2rem;
            }
            .verCodeBkj{
                width:0.2rem;
                height:0.08rem;
                margin-top:0.28rem;
                float:right;
            }
            .verCodekj{
                width:0.2rem;
                height:0.14rem;
                margin-top:0.28rem;
                float:right;
            }
            .verCodeInput{
                width:1.5rem;
            }
            .verCodeImg{
                float:right;
                margin:0.14rem 0.12rem 0 0 ;
            }
        }
        .forget{
            color:#BCBCBE;
            font-size:0.13rem;
            text-align: right;
            padding-right:0.18rem;
            margin:0.2rem 0 0.21rem 0;
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
            margin:0 auto 0.21rem auto;
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
            font-size:0.15rem;
            letter-spacing: 0.02rem;
            font-weight:bold;
            line-height:0.42rem;
            text-align: center;
            background:#E6E6E6;
            color:#5F6775;
            margin:0 auto 0.21rem auto;
        }
        .loginNum{
            color:#0D70BA;
            font-size:0.13rem;
            margin-bottom:2rem;
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
