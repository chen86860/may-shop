import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'
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
      meta: {
        auth: true
      },
      component: () => System.import('./views/buyCar.vue')
    }, {
      path: '/personal', // 个人中心
      name: 'personal',
      meta: {
        auth: true
      },
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
    component: () => System.import('./views/productDetail.vue')
  },
  {
    // 购物车
    path: '/buycar',
    name: 'buycar',
    meta: {
      auth: true
    },
    component: () => System.import('./views/buyCar.vue')
  },
  {
    path: '/createOrder', // 创建订单
    name: 'createOrder',
    meta: {
      auth: true
    },
    component: () => System.import('./views/createOrder.vue')
  },
  {
    path: '/orderpay', // 订单支付
    name: 'orderpay',
    meta: {
      auth: true
    },
    component: () => System.import('./views/orderPay.vue')
  },
  {
    path: '/ordersucceed', // 订单支付
    name: 'orderpaysucceed',
    meta: {
      auth: true
    },
    component: () => System.import('./views/orderPaySucceed.vue')
  },
  {
    path: '/ordermanage', // 订单管理
    name: 'ordermanage',
    meta: {
      auth: true
    },
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
    meta: {
      auth: true
    },
    component: () => System.import('./views/orders/orderDetail.vue'),
  },
  {
    path: '/goodsRejected', // 退货
    meta: {
      auth: true
    },
    component: () => System.import('./views/goodsRejected.vue'),
  },
  {
    path: '/card', // 购物券
    meta: {
      auth: true
    },
    component: () => System.import('./views/card.vue')
  },
  {
    path: '/addresslist', // 地址列表
    meta: {
      auth: true
    },
    component: () => System.import('./views/addressList.vue')
  },
  {
    path: '/addressEditor', // 地址编辑
    meta: {
      auth: true
    },
    component: () => System.import('./views/addressEditor.vue')
  },
  {
    path: '/admin/signup', // 管理员注册
    component: () => System.import('./views/admin/signup.vue')
  },
  {
    path: '/admin/login', // 管理员登录
    component: () => System.import('./views/admin/login.vue')
  },
  {
    path: '/admin/index', // 管理后台首页
    component: () => System.import('./views/admin/index.vue'),
    children: [
      {
        path: '/goods/index',
        name: 'goodsIndex',
        component: () => System.import('./views/admin/goods/index.vue')
      },
      {
        path: '/goods/edit',
        name: 'goodsEdit',
        component: () => System.import('./views/admin/goods/edit.vue')
      },
      {
        path: '/goods/new',
        name: 'goodsNew',
        component: () => System.import('./views/admin/goods/new.vue')
      }
    ]
  }]
})
router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = document.body.scrollTop = 0
  if (to.matched.some(m => m.meta.auth)) {
    // 对路由进行验证
    if (store.state.page.userinfo.log) { // 已经登陆
      next()
    } else {
      // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转
      next({ name: 'login', query: { referrer: to.fullPath } })
    }
  } else {
    next()
  }
})
export default router