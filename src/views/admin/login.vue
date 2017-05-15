<template>
  <div class="admin-login" @click="cav">
    <div class="login-wrap" @keyup.enter="submitForm" v-loading.body="loading" target="login-wrap" customClass="m-loading">
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
          <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
      </el-form>
        <canvas></canvas>
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
      loading: false,
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
            if (res.code === 0) {
              this.$message({
                message: '登录成功！',
                type: 'success'
              })
              this.$router.push({ name: 'admindashboard' })
            } else if (res.code === 202) {
              this.$message({
                message: 'username or passwords is not match',
                type: 'error'
              })
            }
          }).catch((err) => {
            console.error(err)
            this.$message({
              message: 'username or passwords is not match',
              type: 'error'
            })
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    cav () {
      let c = document.getElementsByTagName('canvas')[0]
      let x = c.getContext('2d')
      let pr = window.devicePixelRatio || 1
      let w = window.innerWidth
      let h = window.innerHeight
      let f = 90
      let q
      let m = Math
      let r = 0
      let u = m.PI * 2
      let v = m.cos
      let z = m.random
      c.width = w * pr
      c.height = h * pr
      x.scale(pr, pr)
      x.globalAlpha = 0.6
      function i () {
        x.clearRect(0, 0, w, h)
        q = [{ x: 0, y: h * 0.7 + f }, { x: 0, y: h * 0.7 - f }]
        while (q[1].x < w + f) d(q[0], q[1])
      }
      function d (i, j) {
        x.beginPath()
        x.moveTo(i.x, i.y)
        x.lineTo(j.x, j.y)
        var k = j.x + (z() * 2 - 0.25) * f
        var n = y(j.y)
        x.lineTo(k, n)
        x.closePath()
        r -= u / -50
        x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
        x.fill()
        q[0] = q[1]
        q[1] = { x: k, y: n }
      }
      function y (p) {
        var t = p + (z() * 2 - 1.1) * f
        return (t > h || t < 0) ? y(p) : t
      }
      document.onclick = i
      document.ontouchstart = i
      i()
    }
  },
  activated () {
    let c = document.getElementsByTagName('canvas')[0]
    let x = c.getContext('2d')
    let pr = window.devicePixelRatio || 1
    let w = window.innerWidth
    let h = window.innerHeight
    let f = 90
    let q
    let m = Math
    let r = 0
    let u = m.PI * 2
    let v = m.cos
    let z = m.random
    c.width = w * pr
    c.height = h * pr
    x.scale(pr, pr)
    x.globalAlpha = 0.6
    function i () {
      x.clearRect(0, 0, w, h)
      q = [{ x: 0, y: h * 0.7 + f }, { x: 0, y: h * 0.7 - f }]
      while (q[1].x < w + f) d(q[0], q[1])
    }
    function d (i, j) {
      x.beginPath()
      x.moveTo(i.x, i.y)
      x.lineTo(j.x, j.y)
      var k = j.x + (z() * 2 - 0.25) * f
      var n = y(j.y)
      x.lineTo(k, n)
      x.closePath()
      r -= u / -50
      x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
      x.fill()
      q[0] = q[1]
      q[1] = { x: k, y: n }
    }
    function y (p) {
      var t = p + (z() * 2 - 1.1) * f
      return (t > h || t < 0) ? y(p) : t
    }
    document.onclick = i
    document.ontouchstart = i
    i()
  }
}
</script>

<style scoped>
.admin-login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center
}
 canvas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      pointer-events: none;
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

.m-loading {
  top: 0;
  position: absolute;
}/* vietnamese */
</style>
<style>
.el-loading-mask {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important
}

.el-loading-spinner {
  top: 0 !important;
  position: inherit !important
}
</style>
