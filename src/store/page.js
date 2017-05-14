import Vue from 'vue'
export const types = {
  mutations: {
    GET: 'increment'
  }
}

export default {
  state: {
    cart_goods: {},
    // goods: {},
    goods_1: [],
    goods_2: [],
    goods_3: [],
    goods_2_1: {},
    goods_3_1: {},
    detail: {},
    userinfo: {
      log: false,
      id: '',
      username: '',
      lever: 1,
      email: '',
      address: [],
      defaultAds: []
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
      state.goods_1.splice(0)
      state.goods_2.splice(0)
      state.goods_3.splice(0)
        // 对商品结果进行分组，以类别group 分成三类
        ; (payload.msg || []).forEach((e) => {
          let group = parseInt(e.group, 10) || 0
          switch (group) {
            case 1:
              state.goods_1.push(e)
              break
            case 2:
              state.goods_2.push(e)
              break
            case 3:
              state.goods_3.push(e)
              break
            default:
              break
          }
        })
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
      state.userinfo.email = payload.msg.email
      state.userinfo.address = payload.msg.address
      if (payload.msg.address.length > 0) {
        state.userinfo.defaultAds.push(payload.msg.address[0])
      }
    },
    saveDefaultAds: (state, payload) => {
      console.log('setDefault', payload)
      if (payload === undefined) return
      state.userinfo.defaultAds.splice(0)
      state.userinfo.defaultAds.push(payload)
    },
    updateAds: (state, payload) => {
      state.userinfo.address.splice(0)
      state.userinfo.address = payload.msg[0].address
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
    prevCreateOrder ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['prevCreateOrder'], payload).then((res) => {
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
    changeChecked ({ commit, state, getters }, payload) {
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
    cartGoodAdd ({ commit, state, getters }, payload) {
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
    cartGoodSub ({ commit, state, getters }, payload) {
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
    },
    addAds ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['addAds'], payload).then((res) => {
          console.log('addAds', res.data.code, res)
          if (res.data.code === 0) {
            commit('updateAds', res.data)
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    }
  }
}
