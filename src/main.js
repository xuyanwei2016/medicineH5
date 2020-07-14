// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import Cookies from 'js-cookie';
import '@/css/index.css';
import { Toast } from 'vux';


import VeeValidate,{Validator} from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Validator.localize('zh_CN', zh_CN);
Vue.use(VeeValidate);
Vue.component('toast', Toast)
import '@/css/index.css'
import 'element-ui/lib/theme-chalk/index.css';
import { uploadUrl} from '@/utils/global.js';
import lrz from 'lrz'
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Cookies);
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
Vue.use(VideoPlayer)
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import valert from './components/alertMess/index.js'
Vue.use(valert);

/*id图片路径*/
Vue.prototype.imgLink=function(id){
  return `${uploadUrl}?fileName=${id}&isOnLine=true`;
}


Vue.prototype.Ellipsis = function(id, rows, str,lineH) {
  str = str?str.replace(/<\/?[^>]*>/g, '').replace(/&nbsp;/ig,''):'';
  if (!str || str == '') {
    return ''
  }
  this.$nextTick(function () {
    var winW=document.documentElement.clientWidth;
    var text = document.getElementById(id);
    var lineHeight = lineH*100*winW/375;
    var at = rows * parseInt(lineHeight);
    var tempstr = str;
    text.innerHTML = tempstr;
    var len = tempstr.length;
    var i = 0;
    if (text.offsetHeight <= at) {
    }else {
      var temp = "";
      text.innerHTML = temp;
      while (text.offsetHeight <= at) {
        temp = tempstr.substring(0, i + 1);
        i++;
        text.innerHTML = temp;
      }
      var slen = temp.length;
      tempstr = temp.substring(0, slen - 1);
      len = tempstr.length
      text.innerHTML = tempstr.substring(0, len - 3) + "...";
      text.height = at + "px";
    }
    return str
  })


}

Vue.prototype.userName=function(val){
  let name='';
  if(val.length>1){
    name = val.length==2?val.slice(0,1)+'*':val.slice(0,1)+'**'
  }else{
    name=val;
  }
  return name;
}


router.beforeEach((to, from, next) => {
  if(from.name=='toEvaluate'&&to.name=='loginPassword'){
    store.state.goBack=true;
  }
  if(store.state.goBack&&from.name=='loginPassword'&&to.name=='loginNumber'){
    store.state.goBack=true;
  }else{
    store.state.goBack=false;
  }
  if(from.name=='nationDetail'&&(to.name!='bookDetail'&&to.name!='read'&&to.name!='doctorDetail')){
    from.meta.isBack=false;
  }else if(from.name=='nationDetail'&&(to.name=='bookDetail'||to.name=='read'||to.name=='doctorDetail')){
    from.meta.isBack=true;
  }
  if(from.name=='read'&&to.name=='comment'){
    from.meta.isBack = true;
  }else if(from.name=='read'&&to.name!='comment'){
    from.meta.isBack=false;
  }else if(to.name=='read'&&from.name=='comment'){
    to.meta.isBack = true;
  }else if(to.name=='read'&&from.name!='comment'){
    to.meta.isBack = false;
  }
  if((from.name=='collection'||from.name=='shelf'||from.name=='myComment')&&(to.name=='bookDetail'||to.name=='read'||to.name=='commentDetail')){
    from.meta.isBack=true;
  }else if((from.name=='collection'||from.name=='shelf'||from.name=='myComment')&&(to.name!='bookDetail'&&to.name!='read'&&to.name!='commentDetail')){
    from.meta.isBack=false;
  }


next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
