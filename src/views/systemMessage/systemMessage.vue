<template>
    <div class='message'>
        <div class='title'>
            <span class='titleLeft' @touchend='prev'><img src="../../assets/img/list/fhjt.png" alt=""></span>
            <span class='titleCenter'>系统消息</span>
        </div>
        <div class='center'>
            <div class='glass'>
                <div class='glassTitle'>
                    通知消息
                    <span class='remind'></span>
                </div>
                <div class='glassTime'>2019-09-09 13:45:33</div>                
            </div>
            <div class='electric'>
                您购买的《民族医药发展史》这本书籍已经成功到达您的书架，请您前往个人中心查看，如有问题即使与我们
            </div>
        </div>
        <div class='center'>
            <div class='glass'>
                <div class='glassTitle'>
                    通知通知通知通知通知通知123大幅度发
                    <span class='remind'></span>
                </div>
                <div class='glassTime'>2019-09-09 13:45:33</div>                
            </div>
            <div class='electric'>
                您购买的《民族医药发展史》这本书籍已经成功到达您的书架，请您前往个人中心查看，如有问题即使与我们
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{

        }
    },
    computed:{

    },
    created(){

    },
    methods:{
        prev(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped lang='less'>
    .message{
        overflow: hidden;
        background:#fff;
        .title{
            width:100%;
            height:0.64rem;
            background:url('../../assets/register/top-bg.png') no-repeat center;
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
        .center{
            height:0.93rem;
            width:3.5rem;
            margin:auto;
            border-bottom:0.01rem solid #eee;
            .glass{
                width:100%;
                height:0.2rem;
                padding:0.13rem 0 0.1rem 0;
                .glassTitle{
                    max-width:2rem;
                    height:100%;
                    float:left;
                    font-size:0.16rem;
                    color:#202021;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1; 
                    -webkit-box-orient: vertical;
                    position:relative;
                    padding-right:0.1rem;
                    .remind{
                        display:inline-block;
                        width:0.08rem;
                        height:0.08rem;
                        background:#F2332F;
                        border-radius: 50%;
                        position:absolute;
                        top:0rem;
                        right:0rem;
                    }
                }
                .glassTime{
                    float:right;
                    color:#BDC2CB;
                    font-size:0.11rem;
                    margin-top:0.08rem;
                }
            }
            .electric{
                width:100%;
                height:0.4rem;
                color:#808287;
                font-size:0.14rem;
                letter-spacing: 0.01rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2; 
                -webkit-box-orient: vertical;
            }
        }
    }
</style>
