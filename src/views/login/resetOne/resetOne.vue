<template>
    <div id='resetOne'>
        <div class='title'>
            <span class='titleLeft' @click='prev'><img src="../../../assets/img/list/fhjt.png" alt=""></span>
            <span class='titleCenter'>重置密码</span>
        </div>
        <div class='iphoneNum'>
            <span>手机号</span>
            <input type="text" placeholder="请输入手机号" v-model='phoneNum' @blur='phoneBlur' oninput="value=value.replace(/[ ]/g,'')">
        </div>
        <button :class='btnState?"btnCode":"btnCodeNo"' @click='btnState?getCode():""'>发送验证码</button>
        <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="toastText" :position="position" width='auto'></toast>
    </div>
</template>
<script>
import {getResetPasswordAPI} from '@/api/login/login'
export default {
    data(){
        return{
            showPositionValue: false, //是否显示提示
            position: 'center', //提示信息的位置
            toastText: '', // 提示文本
            phoneNum:'',
        }
    },
    computed:{
        btnState(){
            return this.phoneNum!==''
        }
    },
    created(){

    },
    mounted(){
        document.body.style.backgroundColor = '#F8F8F8'
    },
    methods:{
        prev(){
            this.$router.go(-1)
        },
        phoneBlur(){
            let reg = /^1[3456789]\d{9}$/
            if( !reg.test(this.phoneNum) ){
                this.showPositionValue = true;
                this.toastText = '请输入正确的手机号'
            }
        },
        getCode(){
            getResetPasswordAPI(this.phoneNum).then(res=>{
                if( res.data.code == 0 ){
                    this.$router.push({path:'../resetTwo',query:{code:this.phoneNum}})
                }else{
                    this.showPositionValue = true;
                    this.toastText = res.data.msg
                }
            })
        }
    }
}
</script>
<style scoped lang='less'>
    #resetOne{
        overflow:hidden;
        .title{
            width:100%;
            height:0.44rem;
            background:url('../../../assets/register/top-bg.png') no-repeat center;
            background-size:100%;
            color:#fff;
            font-size:0.18rem;
            line-height:0.44rem;
            text-align: center;
          .titleLeft{
            width:0.18rem;
            height:100%;
            float:left;
            padding-left:0.12rem;
            padding-right: .05rem;
            font-size:0.35rem;
            display: flex;
            align-items: center;
            img{
              width:0.18rem;
              height:0.18rem;
            }
          }
            .titleCenter{
                margin-left:-0.29rem;
                letter-spacing: 0.02rem;
            }
        }
        .iphoneNum{
            width:100%;
            height:0.64rem;
            background:#fff;
            border-bottom:0.01rem solid #EBEBEB;
            font-size:0.15rem;
            line-height:0.64rem;
            text-align: left;
            padding-left:0.15rem;
            input{
                width:2.5rem;
                border:none;
                margin-left:0.18rem;
                background-color: transparent;
            }
        }
        .btnCode{
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
            margin:0.5rem auto 0.27rem auto;
            font-size:0.15rem;
            letter-spacing: 0.02rem;
            font-weight:bold;
            line-height:0.42rem;
            text-align: center;
        }
        .btnCodeNo{
            display:block;
            width:3.01rem;
            height:0.42rem;
            border:none;
            border-radius: 0.21rem;
            margin:0.5rem auto 0.27rem auto;
            font-size:0.15rem;
            letter-spacing: 0.02rem;
            font-weight:bold;
            line-height:0.42rem;
            text-align: center;
            color:#5F6775;
            background:#E6E6E6;
        }
    }
</style>
