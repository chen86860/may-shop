import Vue from 'vue'

export default {
  state: {
    goods: [],
    userinfo: {
      log: false,
      id: '',
      username: '',
      lever: 1,
      email: '',
      address: []
    },
    good: {},
    total: 0
  },
  mutations: {
    setGoodsIndex: (state, payload) => {
      if (payload === undefined) return
      state.goods = payload.msg
    },
    setDetails: (state, payload) => {
      if (payload === undefined) return
      state.detail = payload.msg[0]
    },
    setGood: (state, payload) => {
      if (payload === undefined) return
      state.good = payload
    },
    setUser: (state, payload) => {
      if (payload === undefined) return
      state.userinfo.log = true
      state.userinfo.id = payload.msg.id
      state.userinfo.username = payload.msg.username
      state.userinfo.lever = payload.msg.lever
      state.userinfo.email = payload.msg.email
      state.userinfo.address = payload.msg.address
    },
    setCount: (state, payload) => {
      if (payload === undefined) return
      state.total = payload.msg
    },
    delIndexGood: (state, payload) => {
      if (payload === undefined) return
      state.goods.splice(payload, 1)
    }
  },
  actions: {
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
    adminSignup ({commit, state, getters}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(getters['adminSignup'], payload).then((res) => {
          console.log('adminSignup', res.data.code)
          if (res.data.code === 0) {
            resolve(res.data)
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
    }
  }
}