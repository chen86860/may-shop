<template>
  <div class="login-wrap container-wrap" transition="fadeOutLeft">
    <div class="login-header">
      <span @click="close" class="close"></span>
      <p>登录</p>
    </div>
    <div class="login-form">
      <ul>
        <li>
          <p>
            <input type="text" placeholder="用户名" v-model="username">
          </p>
        </li>
        <li>
          <p>
            <input type="password" placeholder="密码" v-model="password">
          </p>
        </li>
        <li>
          <p class="ll"><a href="./forgetPassword">忘记密码？</a></p>
        </li>
        <li>
          <p>
            <input class="login-btn" type="button" value="登录" @click="login" @keyup.enter="login">
          </p>
        </li>
        <li>
          <p class="reg">
          <router-link :to="{name:'singnup'}">
              注册
          </router-link>
          </p>
        </li>
      </ul>
    </div>
  
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    close () {
      this.$router.push('/home')
    },
    login () {
      this.$store.dispatch('login', {
        username: this.username || '',
        password: this.password || ''
      }).then((res) => {
        if (res.code === 0) {
          this.$router.push({name: 'home'})
          console.log('succeed', this.$store.state.page.userinfo.username)
        }
      }).catch((res) => {
        Toast({
          message: '用户名或密码不正确~~',
          position: 'bottom'})
      })
    }
  },
  beforeEnter: (to, from, next) => {
    console.log('From', from)
    next()
  }
}

</script>
<style scoped>
.close {
  background-image: url('../assets/img/close.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
  width: .38rem;
  position: relative;
  left: .4rem;
  position: absolute;
  height: .78rem;
  top: 0;
}

.login-wrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.ll {
  text-align: left !important;
}

* {
  font-size: .22rem
}

.login-header {
  line-height: .78rem;
  text-align: center;
  height: .78rem;
  background-color: #fff;
  font-size: .27rem;
  color: #fff;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  border-bottom: 1px solid #eaeaea;
  max-width: 640px;
    position: relative;
}

.login-header p {
  color: #000;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.22rem;
}

.login-form {
  text-align: center;
  width: 100%;
  /* height: 100%; */
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
  top: 1.2rem;
}

.login-form>ul>li {
  width: 4rem;
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: .28rem auto;
  height: .6rem;
}

.login-form>ul>li>p {
  width: 100%;
  height: 100%;
}

.login-form input {
  width: 100%;
  height: 100%;
}

input {
  outline: none;
  border-radius: 4px;
  padding: 0 4px 0;
  border: 1px solid #ddd;
}

.login-btn {
  background-color: #ff1877;
  color: #fff;
  cursor: pointer;
  border: none;
}

.reg {
  overflow: inherit;
  position: relative;
  top: .8rem;
  left: 0;
  line-height: 1rem;
}

a {
  color: #03a9f4;
}
</style>
