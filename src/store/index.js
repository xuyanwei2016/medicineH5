import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';
import router from '../router';
import {getListAPI} from '@/api/list';

Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    token: Cookies.get('Y-Token')&&Cookies.get('Y-Token')!='null' ? Cookies.get('Y-Token') : '',
    userId: Cookies.get('userId')&&Cookies.get('userId')!='null' ? Cookies.get('userId') : '',
    list: [],
    total: 0,
    curLoading:0,
    goBack:false,
  },
  getters: {},
  mutations: {
    getRouter() {
      console.log('store获取路由', router.app._route)
    },
    setToken(state, data) {
      state.token = data.token;
      state.userId = data.id;
      Cookies.set('Y-Token', data.token);
      Cookies.set('userId', data.id);
      if(state.goBack){
        router.go(-1);
      }else{
        router.push('/');
      }
      state.goBack=false;

    },
    setTokenTwo(state, data) { //添加计时器
      state.token = data.token;
      state.userId = data.id;
      Cookies.set('Y-Token', data.token);
      Cookies.set('userId', data.id);
      setTimeout(function(){
        if(state.goBack){
          router.go(-2);
        }else{
          router.push('/');
        }
      },1000)
    },
    signOUT(state) {
      state.token = null;
      state.userId = null;
      Cookies.set('Y-Token', null);
      Cookies.set('userId', null);
      Cookies.set('phone', '');
      /*router.push('/');*/
    },
    getList(state, data) {
      if (!data.resList||data.resList.length == 0) {
        state.list = [];
      }
      let ary = data.resList ? data.resList : [];
      state.list = [...state.list, ...ary];
      state.total = data.totalCount;
      state.curLoading=data.curLoading;
    },

  },
  actions: {
    getList({state, commit}, val) {
      console.log(2222,val)
      if (val.pageNum == 1) {
        let data = {resList: [], totalCount: 0,curLoading:0};
        commit('getList', data);
      }
      getListAPI(val).then(res => {
        if (res.data.status) {
          /*res.data.data.pageNum = val.pageNum;*/
          let curData=Object.assign({},res.data.data);
          curData.curLoading = 2;
          curData.pageNum = val.pageNum;
          console.log(2333444,curData)
          commit('getList', curData);

        }

      })

    },

  },
});

export default store;
