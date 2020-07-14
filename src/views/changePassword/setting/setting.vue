<template>
    <div class='setting'>
        <div class='title'>
            <span class='titleLeft' @touchend='prev'><img src="../../../assets/img/list/fhjt.png" alt=""></span>
            <span class='titleCenter'>设置</span>
        </div>
        <router-link to='../settingPassword'>
            <div class='password'>
                <span>修改密码</span>
                <img src="../../../assets/register/rightjt.png" alt="">
            </div>
        </router-link>
        <router-link to='../settingCode'>
            <div class='phone'>
                <span>手机验证</span>
                <img src="../../../assets/register/rightjt.png" alt="">
            </div>
        </router-link>
        <div class='btnRegister' @touchend='registerBtn'>退出账号</div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        document.body.style.backgroundColor = '#F8F8F8'
    },
    computed:{

    },
    created(){

    },
    methods:{
        prev(){
            this.$router.go(-1)
        },
        registerBtn(){

        }
    }
}
</script>
<style lang='less' scoped>
    .setting{
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
        .password,.phone{
            width:100%;
            height:0.585rem;
            border-bottom:0.01rem solid #eee;
            line-height:0.65rem;
            font-size:0.15rem;
            color:#202021;
            background:#fff;
            padding:0 0.12rem;
            img{
                width:0.25rem;
                height:0.2rem;
                float:right;
                margin:0.23rem 0.18rem 0 0;
            }
        }
        .phone{
            height:0.535rem;
            line-height:0.535rem;
            img{
                margin-top:0.165rem ;
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
            margin:3.8rem auto 0 auto;
            font-size:0.15rem;
            letter-spacing: 0.02rem;
            font-weight:bold;
            text-align: center;
            line-height:0.42rem;
        }
    }
</style>
