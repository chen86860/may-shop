export const HOST = {
  DEV: 'http://localhost:3000'
}
export default {
  getters: {
    login: (state, getters) => {
      return HOST['DEV'] + '/user/login'
    },
    signup: (state, getters) => {
      return HOST['DEV'] + '/user/signup'
    },
    cart: (state, getters) => {
      return HOST['DEV'] + '/api/cart'
    },
    goods: (state, getters) => {
      return HOST['DEV'] + '/api/goods'
    }
  }
}

