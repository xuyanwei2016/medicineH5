import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta:'首页',
      component: () => import('@/views/home.vue'),
    },{
      path: '/more',
      name: 'more',
      meta: {
        title: "测试",
        keepAlive: true, //此组件需要被缓存
        isBack: false,
      },
      component: () => import('@/views/more.vue'),
    },{
      path: '/share',
      name: 'share',
      meta:'测试',
      component: () => import('@/components/share.vue'),
    },{
      path: '/hello',
      name: 'hello',
      meta:'测试',
      component: () => import('@/components/HelloWorld.vue'),
    },
    {
      path: '/search',
      name: 'search',
      meta:'搜索',
      component: () => import('@/views/search/index.vue'),
    },
    {
      path:'/register',
      name:'register',
      component: () => import('@/views/login/register/register')
    },
    {
      path:'/registerAgr',
      name:'registerAgr',
      component: () => import('@/views/login/registerAgr/registerAgr')
    },
    {
      path:'/loginNumber',
      name:'loginNumber',
      component: () => import('@/views/login/loginNumber/loginNumber')
    },
    {
      path:'/loginPassword',
      name:'loginPassword',
      component: () => import('@/views/login/loginPassword/loginPassword')
    },
    {
      path:'/resetOne',
      name:'resetOne',
      component: () => import('@/views/login/resetOne/resetOne')
    },
    {
      path:'/resetTwo',
      name:'resetTwo',
      component: () => import('@/views/login/resetTwo/resetTwo')
    },
    {
      path:'/setPassword',
      name:'setPassword',
      component: () => import('@/views/login/setPassword/setPassword')
    },
    {
      path:'/systemMessage',
      name:'systemMessage',
      component: () => import('@/views/systemMessage/systemMessage')
    },
    {
      path:'/systemMessageDet',
      name:'systemMessageDet',
      component: () => import('@/views/systemMessageDet/systemMessageDet')
    },
    {
      path:'/setting',
      name:'setting',
      component: () => import('@/views/changePassword/setting/setting')
    },
    {
      path:'/settingPassword',
      name:'settingPassword',
      component: () => import('@/views/changePassword/settingPassword/settingPassword')
    },
    {
      path:'/settingCode',
      name:'settingCode',
      component: () => import('@/views/changePassword/settingCode/settingCode')
    },
    {
      path:'/settingCodeNew',
      name:'settingCodeNew',
      component: () => import('@/views/changePassword/settingCodeNew/settingCodeNew')
    },
    {
      path: '/broken',
      name: 'broken',
      meta:'无网络',
      component: () => import('@/views/broken/index.vue'),
    },
    {
      path: '/read',
      name: 'read',
      meta: {
        title: "文章阅读页",
        keepAlive: true, //此组件需要被缓存
        isBack: false,
      },
      component: () => import('@/views/read/index.vue'),
    },
    {
      path: '/bookDetail',
      name: 'bookDetail',
      meta:'图书详情',
      component: () => import('@/views/bookDetail/index.vue'),
    },
    {
      path: '/bookRead',
      name: 'bookRead',
      meta: {
        title: "图书阅读页",
        keepAlive: true, //此组件需要被缓存
      },
      component: () => import('@/views/bookRead/index.vue'),
    },
    {
      path: '/pdf',
      name: 'pdf',
      meta:'PDF阅读页',
      component: () => import('@/views/pdf/index.vue'),
    },
    {
      path: '/comment',
      name: 'comment',
      meta:'全部评论',
      component: () => import('@/views/comment/index.vue'),
    },
    {
      path: '/commentDetail',
      name: 'commentDetail',
      meta:'评论详情',
      component: () => import('@/views/commentDetail/index.vue'),
    },
    {
      path: '/toEvaluate',
      name: 'toEvaluate',
      meta:'我要评价',
      component: () => import('@/views/toEvaluate/index.vue'),
    },
    {
      path: '/doctor',
      name: 'doctor',
      meta:'医家',
      component: () => import('@/views/doctor/index.vue'),
    },
    {
      path: '/doctorDetail',
      name: 'doctorDetail',
      meta: {
        title: "医家详情",
        /*keepAlive: true, //此组件需要被缓存*/
      },
      component: () => import('@/views/doctorDetail/index.vue'),
    },
    {
      path: '/therapy',
      name: 'therapy',
      meta:'特色疗法',
      component: () => import('@/views/therapy/index.vue'),
    },
    {
      path: '/materials',
      name: 'materials',
      meta:'药材',
      component: () => import('@/views/therapy/index.vue'),
    },
    {
      path: '/bookList',
      name: 'bookList',
      meta:'图书',
      component: () => import('@/views/bookList/index.vue'),
    },
    {
      path: '/nationList',
      name: 'nationList',
      meta:'民族',
      component: () => import('@/views/nationList/index.vue'),
    },
    {
      path: '/nationDetail',
      name: 'nationDetail',
      meta: {
        title: "民族详情",
        keepAlive: true, //此组件需要被缓存
        isBack:false,
      },
      component: () => import('@/views/nationDetail/index.vue'),
    },
    {
      path: '/list',
      name: 'list',
      meta:'资源列表',
      component: () => import('@/views/list/index.vue'),
    },
    {
      path: '/my',
      name: 'my',
      meta:'个人中心',
      component: () => import('@/views/my/index.vue'),
    },
    {
      path: '/edit',
      name: 'edit',
      meta:'编辑资料',
      component: () => import('@/views/edit/index.vue'),
    },
    {
      path: '/order',
      name: 'order',
      meta:'我的订单',
      component: () => import('@/views/order/index.vue'),
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      meta:'订单详情',
      component: () => import('@/views/orderDetail/index.vue'),
    },
    {
      path: '/collection',
      name: 'collection',
      meta: {
        title: "我的收藏",
        keepAlive: true, //此组件需要被缓存
        isBack:false,
      },
      component: () => import('@/views/collection/index.vue'),
    },
    {
      path: '/shelf',
      name: 'shelf',
      meta: {
        title: "我的书架",
        keepAlive: true, //此组件需要被缓存
        isBack:false,
      },
      component: () => import('@/views/collection/index.vue'),
    },
    {
      path: '/myComment',
      name: 'myComment',
      meta: {
        title: "我的评论",
        keepAlive: true, //此组件需要被缓存
        isBack:false,
      },
      component: () => import('@/views/myComment/index.vue'),
    },
    {
      path: '/setPassword1',
      name: 'setPassword1',
      meta:'设置密码',
      component: () => import('@/views/setPassword/index.vue'),
    },
    {
      path: '/modifyPass',
      name: 'modifyPass',
      meta:'修改密码',
      component: () => import('@/views/modifyPass/index.vue'),
    },
    {
      path: '/phoneVerification',
      name: 'phoneVerification',
      meta:'手机验证',
      component: () => import('@/views/phoneVerification/index.vue'),
    },
    {
      path: '/phoneVerification2',
      name: 'phoneVerification2',
      meta:'手机验证',
      component: () => import('@/views/phoneVerification/index.vue'),
    },
    {
      path: '/messages',
      name: 'messages',
      meta:'系统消息',
      component: () => import('@/views/messages/index.vue'),
    },
    {
      path: '/messageDetail',
      name: 'messageDetail',
      meta:'系统消息',
      component: () => import('@/views/messageDetail/index.vue'),
    },
    {
      path: '/setPassword2',
      name: 'setPassword2',
      meta:'设置密码',
      component: () => import('@/views/setPassword/two.vue'),
    }
  ]
})
