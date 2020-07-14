<template>


  <div>
    <div class="bdsharebuttonbox">
      <!--<a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"><img src="../assets/img/list/qq.png" alt="" width="20">QQ</a>
      <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信">微信</a>
      <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">微博</a>-->
      <a href="#" class="bds_more" data-cmd="more"></a>
      <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
      <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
      <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
      <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
      <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
    </div>


    <ul>
      <li @click="weibo">微博</li>
      <li @click="qq">QQ</li>
      <li @click="qqOther">另一个QQ</li>
    </ul>



    <!--<div style="padding-top: 0.5rem">
      <button onclick="call()">通用分享</button>
      <button onclick="call('wechatFriend')">微信好友</button>
      <button onclick="call('wechatTimeline')">朋友圈</button>
      <button onclick="call('qqFriend')">QQ</button>
      <button onclick="call('qZone')">QQ空间</button>
      <button onclick="call('weibo')">微博</button>
    </div>-->
    <vue-native-share :shareMenu="shareMenu" :config="config" />
  </div>

</template>

<script type="text/ecmascript-6">

  import $ from 'jquery';
  import vueNativeShare from 'vue-native-share'
  /*var nativeShare = new NativeShare();
  var shareData = {
    title: '分享标题',
    desc: '',
    // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
    link: 'https://www.baidu.com',
    icon: 'https://www.baidu.com',
    // 不要过于依赖以下两个回调，很多浏览器是不支持的
    success: function() {
      console.log("success")
    },
    fail: function() {
      console.log("fail")
    }
  };*/
  export default {
    name: "cameras-and-albums",
    data() {
      return {
        shareMenu: [0,1,2,3,4,5],
        config: {
          title: '分享标题',
          desc: '描述',
          img: '图片地址',
          img_title: '图片标题',
          link: '当前链接',
          success: () => {
            console.log('success')
          }, //成功回调
          cancel: () => {
            console.log('cancel')
          }, //取消回调
        }
      }
    },
    created() {
      const that=this;
      that.setShare()
      /*nativeShare.setShareData(shareData)*/

    },
    components: {
      vueNativeShare
    },

    methods: {
      weibo(){
        var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+'分享微博title'+'&url='+'http://192.168.2.8:8080/#/'+'&content=utf-8';
        window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
      },
      qq(){

        var sharesinastring='http://connect.qq.com/widget/shareqq/index.html?url='+'http://192.168.2.8:8080/#/'+'&title=这里填写你要分享的文字内容&summary=&desc=&flash=&commonClient=true&site=QQ';
        window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
        /*url=http%3A%2F%2F192.168.2.8%3A8080%2F%23%2F&title=这里填写你要分享的文字内容&summary=&desc=&flash=&commonClient=true&site=QQ*/


      },
      qqOther(){
        var p = {
          url: 'http://192.168.2.8:8080/#/', /*要分享的url*/
          title:  '这里填写你要分享的文字内容',/* 分享的文字内容(可选，默认为所在页面的title)*/
          summary: '',
          desc:'',
          /*pics : pic,/!*分享图片(可选)*!/*/
          flash : '', /*视频地址(可选)*/
          commonClient : true, /*客户端嵌入标志*/
          site: 'QQ'/*分享来源 (可选) ，如：QQ分享*/
        };
        var s = [];
        for (var i in p) {
          s.push(i + '=' + encodeURIComponent(p[i] || ''));
        }
        var target_url = "http://connect.qq.com/widget/shareqq/iframe_index.html?" + s.join('&') ;
        window.open(target_url, 'qq','height=520, width=720');
      },
      setShare(){
        //分享相关代码
        window._bd_share_config={
          "common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},
          "share":{},
          "image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},
          "selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}
        };
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = '../static/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
        document.body.appendChild(s);

      },
      /*call(command) {
        try {
          nativeShare.call(command)
        } catch (err) {
          // 如果不支持，你可以在这里做降级处理
          alert(err.message)
          // console.log("err.message")
        }
      }*/

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
