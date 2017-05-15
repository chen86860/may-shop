import Vue from 'vue'

export default {
  state: {
    goods: [],
    orders: [],
    users: [],
    userinfo: {
      log: false,
      id: '',
      username: '',
      email: ''
    },
    good: {},
    order: {},
    user: {},
    total: 0,
    ordersTotal: 0,
    usersTotal: 0
  },
  mutations: {
    setGoodsIndex: (state, payload) => {
      if (payload === undefined) return
      state.goods = payload.msg
    },
    setOrdersIndex: (state, payload) => {
      if (payload === undefined) return
      state.orders = payload.msg
    },
    setUsersIndex: (state, payload) => {
      if (payload === undefined) return
      state.users = payload.msg
    },
    setDetails: (state, payload) => {
      if (payload === undefined) return
      state.detail = payload.msg[0]
    },
    setGood: (state, payload) => {
      if (payload === undefined) return
      state.good = payload
    },
    setTmpOrder: (state, payload) => {
      if (payload === undefined) return
      state.order = payload
    },
    setTmpUser: (state, payload) => {
      if (payload === undefined) return
      state.user = payload
    },
    setAdminInfo: (state, payload) => {
      if (payload === undefined) return
      state.userinfo.log = true
      state.userinfo.id = payload.id || ''
      state.userinfo.username = payload.username
      state.userinfo.email = payload.email
    },
    setCount: (state, payload) => {
      if (payload === undefined) return
      state.total = payload.msg
    },
    setOrderCount: (state, payload) => {
      if (payload === undefined) return
      state.ordersTotal = payload.msg
    },
    setUserCount: (state, payload) => {
      if (payload === undefined) return
      state.usersTotal = payload.msg
    },
    delIndexGood: (state, payload) => {
      if (payload === undefined) return
      state.goods.splice(payload, 1)
    },
    delIndexOrder: (state, payload) => {
      if (payload === undefined) return
      state.orders.splice(payload, 1)
    },
    delIndexUser: (state, payload) => {
      if (payload === undefined) return
      state.users.splice(payload, 1)
    }
  },
  actions: {
    // Goods 操作
    goodsIndex ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['goodsIndex'], payload).then((res) => {
          console.log('goodsIndex', res.code, res)
          if (res.data.code === 0) {
            commit('setGoodsIndex', res.data)
          }
          resolve(res)
        })
      })
    },
    addGood ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['addGood'], payload).then((res) => {
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    delGood ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['delGood'], payload).then((res) => {
          console.log('delGood', res.data.code)
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    editGood ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['editGood'], payload).then((res) => {
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    goodsCount ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['goodsCount'], payload).then((res) => {
          if (res.data.code === 0) {
            resolve(res.data)
            commit('setCount', res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    // Order 操作
    ordersIndex ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['ordersIndex'], payload).then((res) => {
          console.log('ordersIndex', res.code, res)
          if (res.data.code === 0) {
            commit('setOrdersIndex', res.data)
          }
          resolve(res)
        })
      })
    },
    delOrder ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['delOrder'], payload).then((res) => {
          console.log('delOrder', res.data.code)
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    ordersCount ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['ordersCount'], payload).then((res) => {
          if (res.data.code === 0) {
            resolve(res.data)
            commit('setOrderCount', res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    // User 操作
    usersIndex ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['usersIndex'], payload).then((res) => {
          console.log('usersIndex', res.code, res)
          if (res.data.code === 0) {
            commit('setUsersIndex', res.data)
          }
          resolve(res)
        })
      })
    },
    editUser ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['editUser'], payload).then((res) => {
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    delUser ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['delUser'], payload).then((res) => {
          console.log('delUser', res.data.code)
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    usersCount ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['usersCount'], payload).then((res) => {
          if (res.data.code === 0) {
            resolve(res.data)
            commit('setUserCount', res.data)
          } else {
            reject(res.data)
          }
        })
      })
    },
    // 管理员相关操作
    adminSignup ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['adminSignup'], payload).then((res) => {
          console.log('adminSignup', res.data.code)
          if (res.data.code === 0) {
            resolve(res.data)
            commit('setAdminInfo', payload)
          } else {
            reject(res.data)
          }
        })
      })
    },
    adminLogin ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['adminLogin'], payload).then((res) => {
          console.log('adminLogin', res.data.code)
          if (res.data.code === 0) {
            commit('setAdminInfo', res.data.msg)
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    }
  }
}
