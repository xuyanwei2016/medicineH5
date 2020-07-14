<template>
    <div class='messageDet'>
        <div class='title'>
            <span class='titleLeft' @touchend='prev'><img src="../../assets/img/list/fhjt.png" alt=""></span>
            <span class='titleCenter'>系统消息</span>
        </div>
        <div class='center'>
            <div class='centerTitle'>系统消息</div>
            <div class='author'>
                <div class='authorGly'>发信人：管理员</div>
                <div class='time'>2019-09-09 12:12:45</div>
            </div>
            <div class='article'>
                第一条为加强对互联网用户账号名称的管理，保护公民、法人和其他组织的合法权益，根据《国务院关于授权国家互联网信息办公室负责互联网信息内容管理工作的通知》和有关法律、行政法规，制定本规定。第二条 在中华人民共和国境内注册、使用和管理互联网用户账号名称，适用本规定。本规定所称互联网用户账号名称，是指机构或个人在博客、微博客、即时通信工具、论坛、贴吧、跟帖评论等互联网信息服务中注册或使用的账号名称。第三条 国家互联网信息办公室负责对全国互联网用户账号名称的注册、使用实施监督管理，各省、自治区、直辖市互联网信息内容主管部门负责对本行政区域内互联网用户账号名称的注册、使用实施监督管理。
                第四条 互联网信息服务提供者应当落实安全管理责任，完善用户服务协议，明示互联网信息服务使用者在账号名称、头像和简介等注册信息中不得出现违法和不良信息，配备与服务规模相适应的专业人员，对互联网用户提交的账号名称、头像和简介等注册信息进行审核，对含有违法和不良信息的，不予注册；保护用户信息及公民个人隐私，自觉接受社会监督，及时处理公众举报的账号名称、头像和简介等注册信息中的违法和不良信息。
                第五条 互联网信息服务提供者应当按照“后台实名、前台自愿”的原则，要求互联网信息服务使用者
                第一条为加强对互联网用户账号名称的管理，保护公民、法人和其他组织的合法权益，根据《国务院关于授权国家互联网信息办公室负责互联网信息内容管理工作的通知》和有关法律、行政法规，制定本规定。第二条 在中华人民共和国境内注册、使用和管理互联网用户账号名称，适用本规定。本规定所称互联网用户账号名称，是指机构或个人在博客、微博客、即时通信工具、论坛、贴吧、跟帖评论等互联网信息服务中注册或使用的账号名称。第三条 国家互联网信息办公室负责对全国互联网用户账号名称的注册、使用实施监督管理，各省、自治区、直辖市互联网信息内容主管部门负责对本行政区域内互联网用户账号名称的注册、使用实施监督管理。
                第四条 互联网信息服务提供者应当落实安全管理责任，完善用户服务协议，明示互联网信息服务使用者在账号名称、头像和简介等注册信息中不得出现违法和不良信息，配备与服务规模相适应的专业人员，对互联网用户提交的账号名称、头像和简介等注册信息进行审核，对含有违法和不良信息的，不予注册；保护用户信息及公民个人隐私，自觉接受社会监督，及时处理公众举报的账号名称、头像和简介等注册信息中的违法和不良信息。
                第五条 互联网信息服务提供者应当按照“后台实名、前台自愿”的原则，要求互联网信息服务使用者
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

    }
}
</script>
<style scoped lang='less'>
    .messageDet{
        overflow-x: hidden;
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
            width:3.5rem;
            height:auto;
            margin:auto;
            .centerTitle{
                font-size:0.2rem;
                color:#202021;
                font-weight:bold;
                margin:0.2rem 0 0.15rem 0;
            }
            .author{
                width:100%;
                height:0.15rem;
                font-size:0.13rem;
                color:#BDC2CB;
                margin-bottom:0.2rem;
                .authorGly{
                    width:2rem;
                    height:100%;
                    overflow:hidden;
                    float:left;
                }
                .time{
                    float:right;
                }
            }
            .article{
                color:#333333;
                font-size:0.14rem;
                letter-spacing: 0.015rem;
                line-height:0.19rem;
                margin-bottom:0.2rem;
            }
        }
    }
</style>
