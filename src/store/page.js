import Vue from 'vue'
export const types = {
  mutations: {
    GET: 'increment'
  }
}

export default {
  state: {
    cart_goods: {},
    goods: {},
    // Goods
    goods_1: {},
    goods_2_1: {},
    goods_2: {},
    goods_3_1: {},
    goods_3: {},
    detail: {},
    userinfo: {
      log: false,
      id: '',
      username: '',
      lever: 1,
      mobile: '',
      address: []
    },
    order: {}
  },
  mutations: {
    setCart: (state, payload) => {
      if (payload === undefined) return
      console.log('set cart', payload)
      state.cart_goods = payload
    },
    setOrder: (state, payload) => {
      if (payload === undefined) return
      console.log('setOrder', payload)
      state.order = payload
    },
    setGoods: (state, payload) => {
      if (payload === undefined) return
      state.goods_1 = payload.msg.slice(0, 3)
      state.goods_2_1 = payload.msg[3]
      state.goods_2 = payload.msg.slice(4, 6)
      state.goods_3_1 = payload.msg[6]
      state.goods_3 = payload.msg.slice(7, 9)
    },
    setDetails: (state, payload) => {
      if (payload === undefined) return
      state.detail = payload.msg[0]
    },
    setUser: (state, payload) => {
      if (payload === undefined) return
      state.userinfo.log = true
      state.userinfo.id = payload.msg.id
      state.userinfo.username = payload.msg.username
      state.userinfo.lever = payload.msg.lever
      state.userinfo.mobile = payload.msg.mobile
      state.userinfo.address = payload.msg.address
    }
  },
  actions: {
    goods ({ commit, state, getters }, payload) {
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
    detail ({ commit, state, getters }, payload) {
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
          if (res.data.code === 0) {
            commit('setCart', res.data.msg)
            resolve(res)
          } else {
            reject(res)
          }
        })
      })
    },
    createOrder ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['createOrder'], payload).then((res) => {
          console.log('createOrder', res.data.code, res)
          if (res.data.code === 0) {
            commit('setOrder', res.data.msg)
            resolve(res)
          } else {
            reject(res)
          }
        })
      })
    },
    addCart ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['addCart'], payload).then((res) => {
          console.log('cart', res.data.code, res)
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    changeChecked ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['changeChecked'], payload).then((res) => {
          console.log('cart', res.data.code, res)
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    cartGoodAdd ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['cartGoodAdd'], payload).then((res) => {
          console.log('cartGoodAdd', res.data.code, res)
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    cartGoodSub ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['cartGoodSub'], payload).then((res) => {
          console.log('cartGoodSub', res.data.code, res)
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    }
  }
}
