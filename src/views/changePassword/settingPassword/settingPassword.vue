<template>
    <div class='setPassword'>
        <div class='title'>
            <span class='titleLeft' @touchend='prev'><img src="../../../assets/img/list/fhjt.png" alt=""></span>
            <span class='titleCenter'>设置</span>
        </div>
        <div class='password'>
            <span>旧密码</span>
            <input type="password" placeholder="输入旧密码" v-model='oldPassword' @blur='oldBlur'>
        </div>
        <div class='password'>
            <span>新密码</span>
            <input type="password" placeholder="建议使用至少两种字符组合" v-model='newPassword' @blur='newBlur'> 
        </div>
        <div class='password'>
            <span>确认密码</span>
            <input type="password" placeholder="请再次输入密码" v-model='newTooPassword' @blur='newTooBlur'>
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
            position: 'bottom', //提示信息的位置
            toastText: '', // 提示文本
            oldPassword:'',
            newPassword:'',
            newTooPassword:'',
        }
    },
    mounted(){
        document.body.style.backgroundColor = '#F8F8F8'
    },
    created(){

    },
    methods:{
        prev(){
            this.$router.go(-1)
        },
        oldBlur(){

        },
        newBlur(){

        },
        newTooBlur(){

        },
        registerBtn(){

        }
    }
}
</script>
<style lang='less' scoped>
    .setPassword{
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
        .password{
            width:100%;
            height:0.53rem;
            border-bottom:0.01rem solid #eee;
            background:#fff;
            line-height:0.53rem;
            padding:0 0.12rem;
            span{
                display:inline-block;
                width:0.8rem;
                color:#202021;
                font-size:0.15rem;
            }
            input{
                width:2.5rem;
                color:#878787;
                border:none;
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
            margin:0.5rem auto 0 auto;
            font-size:0.15rem;
            letter-spacing: 0.02rem;
            font-weight:bold;
            text-align: center;
            line-height:0.42rem;
        }
    }
</style>

