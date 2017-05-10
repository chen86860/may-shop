import Vue from 'vue'

import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// 导入axios库
import axios from 'axios'
import VueAxios from 'vue-axios'
import AwesomeSwiper from 'vue-awesome-swiper'

Vue.use(MintUI)
Vue.use(VueAxios, axios)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.withCredentials = true
// 引入功能与路由
import util from './util.js'
import router from './router.js'

import {
  InfiniteScroll,
  Lazyload
} from 'mint-ui'

import Pageload from './components/pageLoad.vue'
import store from './store/index'
import './assets/css/app.css'

// 引入插件
Vue.use(Lazyload, {
  preLoad: 1.3,
  attempt: 1
}) // 延迟加载 需要进一步处理
Vue.use(AwesomeSwiper) // 轮播
Vue.use(InfiniteScroll) // 无限滚动
Vue.component(Pageload.name, Pageload)
window.util = util

new Vue({
  el: '#app',
  router,
  store,
  template: `<transition name='fade' mode='out-in'><router-view></router-view></transition>`
})
