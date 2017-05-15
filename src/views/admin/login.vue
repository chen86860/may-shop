<template>
  <div class="admin-login">
    <div class="login-wrap" @keyup.enter="submitForm" v-loading.body="loading" target="login-wrap" customClass="m-loading">
      <h2>
<span>登录</span>
      <span>
        或
          <router-link :to="{name:'adminSignup'}">注册</router-link>
        </span>  
      </h2>
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
          if (this.ruleForm2.checked) {
            localStorage.username = this.ruleForm2.username
          }
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
    }
  },
  mounted () {
    this.ruleForm2.username = localStorage.username
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
      z-index: -1;
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
  display: flex;
  align-items: center;
  justify-content: space-between
}
h2>span:last-child{
  font-size: 14px;
}
h2>span>a{
      font-size: 14px;
    color: #ff1877;
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
