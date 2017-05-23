import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'homeMain',
    component: () => System.import('./views/login.vue')
  },
  {
    path: '/signup', // 管理员注册
    name: 'adminSignup', // 管理员注册
    component: () => System.import('./views/signup.vue')
  },
  {
    path: '/login', // 管理员登录
    name: 'adminLogin',
    component: () => System.import('./views/login.vue')
  },
  {
    path: '/indexs', // 管理后台首页
    name: 'admindashboard',
    component: () => System.import('./views/index.vue'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => System.import('./views/welcome.vue')
      },
      {
        path: '/doors/index',
        name: 'doorsIndex',
        component: () => System.import('./views/doors/index.vue')
      },
      {
        path: '/doors/warn',
        name: 'doorsWarn',
        component: () => System.import('./views/doors/warn.vue')
      },
      {
        path: '/doors/Fail',
        name: 'doorsFail',
        component: () => System.import('./views/doors/fail.vue')
      },
      {
        path: '/doors/detail',
        name: 'doorsDetail',
        component: () => System.import('./views/doors/detail.vue')
      },
      {
        path: '/config/index',
        name: 'configsIndex',
        component: () => System.import('./views/config/index.vue')
      },
      {
        path: '/users/index',
        name: 'usersIndex',
        component: () => System.import('./views/users/index.vue')
      },
      {
        path: '/users/edit',
        name: 'userEdit',
        component: () => System.import('./views/users/edit.vue')
      },
      {
        path: '/users/detail',
        name: 'userDetail',
        component: () => System.import('./views/users/detail.vue')
      }
    ]
  }]
})
router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = document.body.scrollTop = 0
  // let adminArr = ['admindashboard', 'welcome', 'doorsIndex', 'doorsEdit', 'doorsNew', 'configsIndex', 'configsDetail', 'usersIndex', 'userEdit']
  // if (adminArr.includes(to.name)) {
  //   if (store.state.admin.userinfo.log) {
  //     next()
  //   }
  //   else {
  //     next({ name: 'adminLogin', query: { referrer: to.fullPath } })
  //   }
  // }
  next()
})
export default router