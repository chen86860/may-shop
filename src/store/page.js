import Vue from 'vue'
export const types = {
  mutations: {
    GET: 'increment'
  }
}

export default {
  state: {
    cart: {},
    goods: {},
    detail: {},
    userinfo: {
      username: '',
      mobile: '',
      address: [],
      lever: 1
    }
  },
  mutations: {
    setCart: (state, payload) => {
      if (payload === undefined) return
      state.cart = payload
    },
    setGoods: (state, payload) => {
      if (payload === undefined) return
      state.goods = payload.msg
    },
    setDetails: (state, payload) => {
      if (payload === undefined) return
      state.detail = payload.msg[0]
    },
    setUser: (state, payload) => {
      if (payload === undefined) return
      state.userinfo.id = payload.msg.id
      state.userinfo.username = payload.msg.username
      state.userinfo.lever = payload.msg.lever
      state.userinfo.address = payload.msg.address
    }
  },
  actions: {
    goods ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['goods'], payload).then((res) => {
          console.log('goods', res.code, res)
          if (res.data.code === 0) {
            commit('setGoods', res.data)
          }
          resolve(res)
        })
      })
    },
    detail ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['detail'], payload).then((res) => {
          console.log('detail', res.code, res)
          if (res.data.code === 0) {
            commit('setDetails', res.data)
          }
          resolve(res)
        })
      })
    },
    login ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['login'], payload).then((res) => {
          console.log('login', res.data.code, res)
          if (res.data.code === 0) {
            commit('setUser', res.data)
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    signup ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['signup'], payload).then((res) => {
          console.log('signup', res.data.code, res)
          if (res.data.code === 0 || res.data.code === 202) {
            commit('setUser', res.data)
            resolve(res.data)
          } else {
            resolve(res.data)
          }
        })
      })
    },
    cart ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['cart'], payload).then((res) => {
          console.log('cart', res.data.code, res)
          commit('setCart', res.data)
          resolve(res)
        })
      })
    }
  }
}
