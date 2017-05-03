import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import API from './api'
import Page from './page'

export const store = new Vuex.Store({
  modules: {
    api: API,
    page: Page
  }
})

export default store
