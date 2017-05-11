<template>
  <div class="login-wrap container-wrap" transition="fadeOutRight">
    <div class="login-header">
      <span @click="close" class="close"></span>
      <p>注册</p>
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
          <input type="password" name="password" v-model="password" placeholder="密码">
          </p>
        </li>
        <li>
          <p>
          <input v-validate="'required|email'" type="email" name="email" v-model="email" :class="{'input': true, 'is-danger': errors.has('email') }" placeholder="邮箱">
            <i v-show="errors.has('email')" class="fa fa-warning">邮箱格式不正确</i>
          </p>
        </li>
        <li>
          <p class="ll"><a href="./forgetPassword">忘记密码？</a></p>
        </li>
        <li>
          <p>
            <input class="login-btn" type="submit" value="注册" @click="reg" @keyup.enter="reg">
          </p>
        </li>
        <li>
          <p class="reg">
            <router-link :to="{name:'login'}">
                登录
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
  name: 'signup',
  data () {
    return {
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    close () {
      this.$router.back()
    },
    nameOK () {
      return ((/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){3,13}$/).test(this.username))
    },
    passwordOK () {
      return ((/^([a-zA-Z0-9]|[_]){5,17}$/).test(this.password))
    },
    emailOK () {
      return (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/).test(this.email)
    },
    reg () {
      if (!this.nameOK()) {
        Toast({
          message: '用户名格式不正确！4~12个字符,可使用字母、数字.字母开头',
          position: 'bottom'
        })
        return false
      }
      if (!this.passwordOK()) {
        Toast({
          message: '密码格式不正确！6~16个字符，区分大小写',
          position: 'bottom'
        })
        return false
      }
      if (!this.emailOK()) {
        Toast({
          message: '邮箱格式不正确',
          position: 'bottom'
        })
        return
      }
      this.$store.dispatch('signup', {
        username: this.username,
        password: this.password,
        email: this.email
      }).then((res) => {
        console.log('succeed', res)
        if (res.code === 0) {
          // console.log(this.$store.state.page.userinfo)
          this.$router.push({name: 'home'})
        } else if (res.code === 202) {
          Toast({
            message: '用户名已存在~~换个吧~',
            position: 'bottom'
          })
        }
      }).catch((res) => {
        Toast({
          message: '网络错误',
          position: 'bottom'
        })
      })
    }
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
  /*background-color: #ff1877;*/
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
  position:relative
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
