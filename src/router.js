import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'homeMain',
    component: () => System.import('./views/home/homeMain.vue'),
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: () => System.import('./views/home/home.vue')
    }, {
      path: '/classify',
      name: 'classify',
      component: () => System.import('./views/home/classify.vue')
    }, {
      // 购物车
      path: '/hbuycar',
      name: 'homebuycar',
      component: () => System.import('./views/buyCar.vue')
    }, {
      path: '/personal', // 个人中心
      name: 'personal',
      component: () => System.import('./views/home/personal.vue')
    }]
  },
  {
    // 登录页面
    path: '/login',
    name: 'login',
    component: () => System.import('./components/login.vue')
  },
  {
    // 注册页面
    path: '/singnup',
    name: 'singnup',
    component: () => System.import('./components/singnup.vue')
  },
  {
    // 商品详情
    path: '/product',
    name: 'product',
    meta: {

    },
    component: () => System.import('./views/productDetail.vue')
  },
  {
    // 购物车
    path: '/buycar',
    name: 'buycar',
    component: () => System.import('./views/buyCar.vue')
  },
  {
    path: '/createOrder', // 创建订单
    name: 'createOrder',
    component: () => System.import('./views/createOrder.vue')
  },
  {
    path: '/orderpay', // 订单支付
    name: 'orderpay',
    component: () => System.import('./views/orderPay.vue')
  },
  {
    path: '/ordermanage', // 订单管理
    name: 'ordermanage',
    component: () => System.import('./views/orders/orderManage.vue'),
    children: [{
      path: 'orderall', // 全部订单
      name: 'orderall',
      component: () => System.import('./views/orders/orderAll.vue'),
    }, {
      path: 'orderwaitgoods', // 待收货
      name: 'orderwaitgoods',
      component: () => System.import('./views/orders/orderWaitgoods.vue'),
    }, {
      path: 'orderwaitpay', // 待支付
      name: 'orderwaitpay',
      component: () => System.import('./views/orders/orderWaitpay.vue'),
    }, {
      path: 'orderwaitping', // 待评价
      name: 'orderwaitping',
      component: () => System.import('./views/orders/orderWaitping.vue'),
    }]
  },
  {
    path: '/orderdetail', // 订单详情
    component: () => System.import('./views/orders/orderDetail.vue'),
  },
  {
    path: '/goodsRejected', // 退货
    component: () => System.import('./views/goodsRejected.vue'),
  },
  {
    path: '/card', // 购物券
    component: () => System.import('./views/card.vue')
  },
  {
    path: '/addresslist', // 地址列表
    component: () => System.import('./views/addressList.vue')
  },
  {
    path: '/addressEditor', // 地址编辑
    component: () => System.import('./views/addressEditor.vue')
  }]
})
router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = document.body.scrollTop = 0
  next()
})
export default router