<template>
    <div class='settingCode'>
        <div class='title'>
            <span class='titleLeft' @touchend='prev'><img src="../../../assets/img/list/fhjt.png" alt=""></span>
            <span class='titleCenter'>手机验证</span>
        </div>
        <div class='settImgDiv'>
            <img class='setImg' src="../../../assets/register/settingCode.png" alt="">
        </div>
        <div class='iphone'>
            <span>手机号</span>
            <input type="text" v-model='iphoneNum' placeholder="请输入手机号" @blur='iphoneBlur'>
        </div>
        <div class='verCode'>
            <span>验证码</span>
            <input type="text" placeholder="请输入验证码" v-model='codeNum' @blur='codeBlur'>
            <button @touchend="addBtnFlag && getlogin()" class="verCodeRight" type="primary">{{ btnText }}</button>
        </div>
        <div class='btnRegister' @touchend='registerBtn'>提交</div>
        <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="toastText" :position="position" width='auto'></toast>
    </div>
</template>
<script>
export default {
    data(){
        return{
            showPositionValue: false, //是否显示提示
            position: 'center', //提示信息的位置
            toastText: '', // 提示文本
            interval:undefined,
            totalCount:0,
            addBtnFlag:true,
            codeNum:'',
            iphoneNum:'',

        }
    },
    computed:{
        btnText(){
            return this.totalCount !==0? `重新获取(${this.totalCount}s)`: "获取验证码"
        }
    },
    mounted(){
        document.body.style.backgroundColor = '#F8F8F8'
    },
    created(){

    },
    methods:{
        codeBlur(){

        },
        iphoneBlur(){

        },
        prev(){
            this.$router.go(-1)
        },
        getlogin(){
            this.totalCount=60
            if( this.addBtnFlag ){
                this.interval=setInterval(()=>{
                    this.totalCount--
                    this.addBtnFlag = false
                    if(this.totalCount === 0){
                        clearInterval(this.interval)
                        this.addBtnFlag = true
                    }
                },1000);
            }
        },
        registerBtn(){

        }
    }
}
</script>
<style lang='less' scoped>
    .settingCode{
        // background:#fff;
        overflow: hidden;
        .title{
            width:100%;
            height:0.64rem;
            background:url('../../../assets/register/top-bg.png') no-repeat center;
            background-size:100%;
            color:#fff;
            font-size:0.18rem;
            line-height:0.64rem;
            text-align: center;
            .titleLeft{
                height:100%;
                display:inline-block;
                float:left;
                margin-left:0.12rem;
                font-size:0.35rem;
                img{
                    width:0.28rem;
                    height:0.25rem;
                    margin-top:0.19rem;
                }
            }
            .titleCenter{
                margin-left:-0.29rem;
                letter-spacing: 0.02rem;
            }
        }
        .settImgDiv{
            background:#fff;
            padding:0.21rem 0 0.45rem 0;
            .setImg{
                width:1.92rem;
                height:1.265rem;
                margin:auto;
            }
        }
        .iphone,.verCode{
            width:100%;
            height:0.53rem;
            margin:auto;
            border-bottom:0.01rem solid #E3E3E3;
            padding:0 0.12rem;
            line-height:0.53rem;
            background:#fff;
            span{
                float:left;
                color:#202021;
                font-size:0.15rem;
                margin-right:0.1rem;
            }
            input{
                height:0.53rem;
                width:2.4rem;
                border:none;
                font-size:0.15rem;
                float:left;
                font-size:0.13rem;
            }
            .verCodeRight{
                width:auto;
                height:0.18rem;
                background:none;
                float:right;
                font-size:0.13rem;
                color:#0D70BA;
                margin:0.17rem 0.22rem;
                border:none;
                border-left:0.01rem solid #E4E4E4;
                padding-left:0.1rem;
            }
        }
        .verCode{
            input{
                width:1.5rem;
            }
        }
        .btnRegister{
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
            margin:1.03rem auto 0.27rem auto;
            font-size:0.15rem;
            letter-spacing: 0.02rem;
            font-weight:bold;
            text-align: center;
            line-height:0.42rem;
        }
    }
</style>
