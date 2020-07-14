<template>
    <div class='resetTwo'>
        <div class='title'>
            <span class='titleLeft' @click='prev'><img src="../../../assets/img/list/fhjt.png" alt=""></span>
            <span class='titleCenter'>重置密码</span>
        </div>
        <div class='checkAccept'>验证码已发送至 {{phone}}，请查收</div>
        <div class='verCode'>
            <span >验证码</span>
            <input type="text" placeholder="请输入验证码" v-model='codeNum' oninput="value=value.replace(/[ ]/g,'')">
            <button @click="addBtnFlag && getlogin()" class="verCodeRight" type="primary">{{ btnText }}</button>
        </div>
        <div class='verCode'>
            <span >新密码</span>
            <input type="password" placeholder="请输入新密码" @blur='passwordBlur' v-model='passwordNum' oninput="value=value.replace(/[ ]/g,'')">
        </div>
        <div class='verCode'>
            <span >新密码</span>
            <input type="password" placeholder="请再次输入" @blur='passwordBlurTo' v-model='passwordNumTo' oninput="value=value.replace(/[ ]/g,'')" >
        </div>
        <button :class='btnState?"btnCode":"btnCodeNo"' @click="btnState?complete():''">完成</button>
        <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="toastText" :position="position" width='auto'></toast>
    </div>
</template>
<script>
import {getResetPasswordAPI,completeAPI} from '@/api/login/login'
import md5 from 'blueimp-md5';
export default {
    data(){
        return{
            showPositionValue: false, //是否显示提示
            position: 'center', //提示信息的位置
            toastText: '', // 提示文本
            interval:undefined,
            totalCount:0,
            addBtnFlag:true,
            phone:null,
            passwordNum:'',
            passwordNumTo:'',
            codeNum:'',
        }
    },
    computed:{
        btnText(){
            return this.totalCount >=0? `重新获取(${this.totalCount}s)`: "获取验证码"
        },
        btnState(){
            return this.codeNum!==''&&this.passwordNum!==''&&this.passwordNumTo!==''
        }
    },
    mounted(){
        document.body.style.backgroundColor = '#F8F8F8'
    },
    created(){
        this.phone = this.$route.query.code.substr(0,3)+'******'+this.$route.query.code.substr(9);
      if(this.$route.query.code){
        this.interval=setInterval(()=>{
          this.addBtnFlag = false
          this.totalCount--
          if(this.totalCount<0){
            clearInterval(this.interval)
            this.addBtnFlag = true
          }
        },1000);
      }
    },
    methods:{
        prev(){
            this.$router.go(-1)
        },
        getlogin(){
            let phoneCode = this.$route.query.code
            getResetPasswordAPI(phoneCode).then(res=>{
                if( res.data.code == 0 ){
                    this.totalCount=60
                    this.showPositionValue = true
                    this.toastText = '已发送验证码'
                    if( this.addBtnFlag ){
                        this.interval=setInterval(()=>{
                            this.totalCount--
                            this.addBtnFlag = false
                          if(this.totalCount<0){
                            clearInterval(this.interval)
                            this.addBtnFlag = true
                          }
                        },1000);
                    }
                }else{
                    this.showPositionValue = true
                    this.toastText = res.data.msg
                }
            })
        },
        passwordBlur(){
            if( this.passwordNum.length < 6 || this.passwordNum.length > 20 ){
                this.showPositionValue = true;
                this.toastText = '长度必须在6-20个字符之间'
            }else if( this.passwordNum !== '' ){
                let reg = /^[0-9a-zA-Z@#-_]+$/
                let regS = /^[0-9]+$/
                let regA = /^[a-zA-Z]+$/
                let regB = /^[@]+$/
                let regC = /^[#]+$/
                let regD = /^[-]+$/
                let regE = /^[_]+$/
                if( !reg.test(this.passwordNum) ){
                    this.showPositionValue = true;
                    this.toastText = '非法字符'
                }else if( regS.test(this.passwordNum) || regA.test(this.passwordNum ) || regB.test(this.passwordNum ) || regC.test(this.passwordNum )|| regD.test(this.passwordNum )|| regE.test(this.passwordNum ) ){
                    this.showPositionValue = true;
                    this.toastText = '不能使用同一字符'
                }
            }
        },
        passwordBlurTo(){
            if( this.passwordNumTo != this.passwordNum ){
                this.showPositionValue = true;
                this.toastText = '两次输入密码必须一致'
            }
        },
        complete(){
            let data = {
                code:this.codeNum,
                newPassword1: md5(this.passwordNum).toUpperCase(),
                newPassword2:md5(this.passwordNumTo).toUpperCase(),
                phone:this.$route.query.code
            }
            completeAPI(data).then(res=>{
                if( res.data.code == 0 ){
                    this.$router.push({path:'/loginPassword'})
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
.resetTwo{
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
    .checkAccept{
        width:100%;
        height:0.3rem;
        background:#FFF7F1;
        color:#FF9E4F;
        text-align: left;
        padding-left:0.12rem;
        font-size:0.12rem;
        line-height:0.3rem;
    }
    .verCode{
        width:100%;
        height:0.5rem;
        border-bottom:0.01rem solid #eee;
        font-size:0.15rem;
        line-height:0.5rem;
        background:#fff;
        span{
            color:#202021;
            margin:0 0.3rem 0 0.13rem;
            float:left;
        }
        input{
            width:1.6rem;
            padding-right:0.05rem;
            border:none;
            float:left;
            margin-top:0.15rem;
            background-color: transparent;
        }
        .verCodeRight{
            width:auto;
            height:0.18rem;
            background:none;
            float:right;
            font-size:0.13rem;
            color:#0D70BA;
            margin:0.15rem 0.1rem;
            border:none;
            border-left:0.01rem solid #E4E4E4;
            padding-left:0.1rem;
        }
    }
}
</style>

