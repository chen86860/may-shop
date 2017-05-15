export const HOST = {
  DEV: 'http://localhost:3000'
}
export default {
  getters: {
    goods: (state, getters) => {
      return HOST['DEV'] + '/api/goods'
    },
    detail: (state, getters) => {
      return HOST['DEV'] + '/api/detail'
    },
    login: (state, getters) => {
      return HOST['DEV'] + '/user/login'
    },
    signup: (state, getters) => {
      return HOST['DEV'] + '/user/signup'
    },
    session: (state, getters) => {
      return HOST['DEV'] + '/user/session'
    },
    cart: (state, getters) => {
      return HOST['DEV'] + '/user/cart'
    },
    addCart: (state, getters) => {
      return HOST['DEV'] + '/user/addCart'
    },
    changeChecked: (state, getters) => {
      return HOST['DEV'] + '/user/changeChecked'
    },
    cartGoodAdd: (state, getters) => {
      return HOST['DEV'] + '/user/cartGoodAdd'
    },
    cartGoodSub: (state, getters) => {
      return HOST['DEV'] + '/user/cartGoodSub'
    },
    prevCreateOrder: (state, getters) => {
      return HOST['DEV'] + '/user/prevCreateOrder'
    },
    createOrder: (state, getters) => {
      return HOST['DEV'] + '/user/createOrder'
    },
    adminSignup: (state, getters) => {
      return HOST['DEV'] + '/admin/signup'
    },
    adminLogin: (state, getters) => {
      return HOST['DEV'] + '/admin/login'
    },
    goodsIndex: (state, getters) => {
      return HOST['DEV'] + '/admin/goods/index'
    },
    ordersIndex: (state, getters) => {
      return HOST['DEV'] + '/admin/orders/index'
    },
    usersIndex: (state, getters) => {
      return HOST['DEV'] + '/admin/users/index'
    },
    delGood: (state, getters) => {
      return HOST['DEV'] + '/admin/goods/del'
    },
    delOrder: (state, getters) => {
      return HOST['DEV'] + '/admin/orders/del'
    },
    delUser: (state, getters) => {
      return HOST['DEV'] + '/admin/users/del'
    },
    goodsCount: (state, getters) => {
      return HOST['DEV'] + '/admin/goods/count'
    },
    usersCount: (state, getters) => {
      return HOST['DEV'] + '/admin/users/count'
    },
    ordersCount: (state, getters) => {
      return HOST['DEV'] + '/admin/orders/count'
    },
    editGood: (state, getters) => {
      return HOST['DEV'] + '/admin/goods/update'
    },
    editUser: (state, getters) => {
      return HOST['DEV'] + '/admin/users/update'
    },
    addGood: (state, getters) => {
      return HOST['DEV'] + '/admin/goods/add'
    },
    addAds: (state, getters) => {
      return HOST['DEV'] + '/user/ads/add'
    },
    delAds: (state, getters) => {
      return HOST['DEV'] + '/user/ads/del'
    },
    updateAds: (state, getters) => {
      return HOST['DEV'] + '/user/ads/update'
    },
    orderAll: (state, getters) => {
      return HOST['DEV'] + '/user/order/all'
    },
    orderPay: (state, getters) => {
      return HOST['DEV'] + '/user/order/wait'
    },
    orderPaid: (state, getters) => {
      return HOST['DEV'] + '/user/order/paid'
    },
    payNow: (state, getters) => {
      return HOST['DEV'] + '/user/order/pay'
    },
    getOrder: (state, getters) => {
      return HOST['DEV'] + '/user/order/detail'
    }
  }
}

