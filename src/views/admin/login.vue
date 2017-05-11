<template>
  <div class="admin-login">
    <div class="login-wrap">
      <h2>登录</h2>
      <el-form label-position="right" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="0" class="ruleForm">
        <el-form-item prop='username'>
          <el-input v-model="ruleForm2.username" auto-complete="off" placeholder="用户名/邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div class="btn-login">
          <span>
            <el-checkbox v-model="ruleForm2.checked">保存我的信息</el-checkbox>
          </span>
          <el-button type="primary"  @keyup.enter="submitForm" @click="submitForm">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      }
      callback()
    }
    return {
      labelPosition: 'right',
      ruleForm2: {
        pass: '',
        username: '',
        checked: false
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: validateUser, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs['ruleForm2'].validate((valid) => {
        console.log('enter')
        if (valid) {
          this.$store.dispatch('adminLogin', {
            username: this.ruleForm2.username,
            password: this.ruleForm2.pass
          }).then((res) => {
            console.log(res)
          }).catch((err) => {
            console.error(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
// ;(() => {
//   document.addEventListener('touchmove', function (e) {
//     e.preventDefault()
//   })
//   var c = document.querySelector('canvas')
//   var x = c.getContext('2d')
//   var pr = window.devicePixelRatio || 1
//   var w = window.innerWidth
//   var h = window.innerHeight
//   var f = 90
//   var q
//   var m = Math
//   var r = 0
//   var u = m.PI * 2
//   var v = m.cos
//   var z = m.random
//   c.width = w * pr
//   c.height = h * pr
//   x.scale(pr, pr)
//   x.globalAlpha = 0.6
//   function i () {
//     x.clearRect(0, 0, w, h)
//     q = [{ x: 0, y: h * 0.7 + f }, { x: 0, y: h * 0.7 - f }]
//     while (q[1].x < w + f) d(q[0], q[1])
//   }
//   function d (i, j) {
//     x.beginPath()
//     x.moveTo(i.x, i.y)
//     x.lineTo(j.x, j.y)
//     let k = j.x + (z() * 2 - 0.25) * f
//     let n = y(j.y)
//     x.lineTo(k, n)
//     x.closePath()
//     r -= u / -50
//     x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
//     x.fill()
//     q[0] = q[1]
//     q[1] = { x: k, y: n }
//   }
//   function y (p) {
//     var t = p + (z() * 2 - 1.1) * f
//     return (t > h || t < 0) ? y(p) : t
//   }
//   document.onclick = i
//   document.ontouchstart = i
//   i()
// })()

</script>

<style scoped>
.admin-login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center
}

.login-wrap {
  width: 400px;
  margin: 230px auto;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  height: 300px;
}

.btn-login {
  font-size: 14px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  align-items: center;
}

.ruleForm {
  margin: 0 auto;
}

h2 {
  margin: 16px 0 16px 0;
  color: #3e3e3e;
  font-weight: 400;
  font-size: 18px;
  border-bottom: 1px solid #e4e4e4;
  padding-bottom: 22px;
  color: #545454;
}

.move-enter-active,
.move-leave-active {
  transition: opacity .5s
}

.move-enter,
.move-leave-active {
  opacity: 0.1
}
</style>
