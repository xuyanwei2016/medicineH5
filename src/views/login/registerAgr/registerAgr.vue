<template>
    <div class='registerXY'>
        <div class='title'>
            <span class='titleLeft' @click='prev'><img src="../../../assets/img/list/fhjt.png" alt=""></span>
            <span class='titleCenter'>用户注册协议</span>
        </div>
        <div class='text' v-html='this.text'></div>
    </div>
</template>
<script>
import {getAgreementAPI} from '@/api/login/login'
export default {
    data(){
        return{
            text:''
        }
    },
    created(){
        this.getAgreementList()
    },
    methods:{
        prev(){
            this.$router.go(-1)
        },
        getAgreementList(){
            getAgreementAPI().then(res=>{
                this.text = res.data.data.value
            })
        }
    }
}
</script>
<style lang='less' scoped>
    .registerXY{
        .title{
            width:100%;
            height:0.44rem;
            background:url('../../../assets/register/top-bg.png') no-repeat center;
            background-size:100%;
            color:#fff;
            font-size:0.18rem;
            line-height:0.44rem;
            text-align:center;
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
            }
        }
        .text{
            width:3.5rem;
            margin:0.3rem auto;
            font-size:0.14rem;
            letter-spacing:0.01rem;
            line-height:0.2rem;
            text-align: left;
        }
    }
</style>
