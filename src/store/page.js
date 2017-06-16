import Vue from 'vue'
export const types = {
  mutations: {
    GET: 'increment'
  }
}

export default {
  state: {
    cart_doors: {},
    // doors: {},
    doors_1: [],
    doors_2: [],
    doors_3: [],
    doors_2_1: {},
    doors_3_1: {},
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
    order: {
      tmp: {},
      all: {},
      paid: {},
      wait: {},
      detail: {}
    },
    tmp: {}
  },
  mutations: {
    setCart: (state, payload) => {
      if (payload === undefined) return
      console.log('set cart', payload)
      state.cart_doors = payload
    },
    setOrder: (state, payload) => {
      if (payload === undefined) return
      console.log('setOrder', payload)
      state.order.tmp = payload
    },
    setdoors: (state, payload) => {
      if (payload === undefined) return
      state.doors_1.splice(0)
      state.doors_2.splice(0)
      state.doors_3.splice(0)
        // 对商品结果进行分组，以类别group 分成三类
        ; (payload.msg || []).forEach((e) => {
          let group = parseInt(e.group, 10) || 0
          switch (group) {
            case 1:
              state.doors_1.push(e)
              break
            case 2:
              state.doors_2.push(e)
              break
            case 3:
              state.doors_3.push(e)
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
      console.log('set new address', payload.msg[0].address)
      state.userinfo.address = payload.msg[0].address
    },
    setTmp: (state, payload) => {
      if (payload === undefined) return
      state.tmp.address = payload.address
    },
    setTempOrder: (state, payload) => {
      if (payload === undefined) return
      state.tmp.order = payload
    },
    setOrderAll: (state, payload) => {
      if (payload === undefined) return
      state.order.all = payload
    },
    setOrderPay: (state, payload) => {
      if (payload === undefined) return
      state.order.wait = payload
    },
    setOrderPaid: (state, payload) => {
      if (payload === undefined) return
      state.order.paid = payload
    },
    setOrderDetail: (state, payload) => {
      if (payload === undefined) return
      console.log('order detail__________________', payload)
      state.order.detail = payload[0]
    }
  },
  actions: {
    doors ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['doors'], payload).then((res) => {
          console.log('doors', res.code, res)
          if (res.data.code === 0) {
            commit('setdoors', res.data)
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
          console.log('prevCreateOrder', res.data.code, res)
          if (res.data.code === 0) {
            commit('setOrder', res.data.msg)
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
            resolve(res.data)
          } else {
            reject(res)
          }
        })
      })
    },
    getOrder ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['getOrder'], payload).then((res) => {
          console.log('getOrder', res.data.code, res)
          if (res.data.code === 0) {
            commit('setOrderDetail', res.data.msg)
            resolve(res)
          } else {
            reject(res)
          }
        })
      })
    },
    orderAll ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['orderAll'], payload).then((res) => {
          console.log('orderAll', res.data.code, res)
          if (res.data.code === 0) {
            commit('setOrderAll', res.data.msg)
            resolve(res)
          } else {
            reject(res)
          }
        })
      })
    },
    orderPay ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['orderPay'], payload).then((res) => {
          if (res.data.code === 0) {
            commit('setOrderPay', res.data.msg)
            resolve(res)
          } else {
            reject(res)
          }
        })
      })
    },
    orderPaid ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['orderPaid'], payload).then((res) => {
          if (res.data.code === 0) {
            commit('setOrderPaid', res.data.msg)
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
    cartdoorsub ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['cartdoorsub'], payload).then((res) => {
          console.log('cartdoorsub', res.data.code, res)
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
    },
    updateAds ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['updateAds'], payload).then((res) => {
          console.log('updateAds', res.data.code, res)
          if (res.data.code === 0) {
            commit('updateAds', res.data)
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    delAds ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['delAds'], payload).then((res) => {
          console.log('delAds', res.data.code, res)
          if (res.data.code === 0) {
            commit('updateAds', res.data)
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    paynow ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['payNow'], payload).then((res) => {
          console.log('payNow', res.data.code, res)
          if (res.data.code === 0) {
            // commit('updateAds', res.data)
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    }
  }
}
