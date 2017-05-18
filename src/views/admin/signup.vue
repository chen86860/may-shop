<template>
  <div class="admin-login">
    <div class="login-wrap">
      <h2>
<span>注册</span>
      <span>
        或
          <router-link :to="{name:'adminLogin'}">登录</router-link>
        </span> 

      </h2>
      <el-form :label-position="labelPosition" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="0" class="ruleForm">
        <el-form-item prop='username'>
          <el-input v-model="ruleForm2.username" auto-complete="off" placeholder="用户名" ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model.email="ruleForm2.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item  prop="code">
          <el-input v-model.code="ruleForm2.code"  placeholder="邀请码"></el-input>
        </el-form-item>
        <el-form-item class="m-sub-btn"> 
          <span class="m-btn-aggrement">
            <el-checkbox v-model="ruleForm2.checked">同意
              <a>《协议》</a>
            </el-checkbox>
          </span>
          <span class="m-btn-signup">
          <el-button  type="primary" @click="submitForm('ruleForm2')">注册</el-button>
          </span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (re.test(value)) {
        callback(new Error('请输入正确的邮箱'))
      }
      callback()
    }
    return {
      labelPosition: 'right',
      ruleForm2: {
        pass: '',
        checkPass: '',
        email: '',
        code: '',
        checked: true
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('adminSignup', {
            username: this.ruleForm2.username,
            password: this.ruleForm2.pass,
            email: this.ruleForm2.email,
            code: this.ruleForm2.code
          }).then((res) => {
            console.log(res)
            this.$message({
              message: '注册成功！',
              type: 'success'
            })
            this.$router.push({ name: 'admindashboard' })
          }).catch((err) => {
            if (err.code === 202) {
              this.$message({
                message: '用户已存在',
                type: 'error'
              })
            } else {
              this.$message({
                message: '网络错误',
                type: 'error'
              })
            }
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
</script>
<style scoped>
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
a:visited{
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

.admin-login {
  width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.login-wrap{
      width: 400px;
    margin: 230px auto;
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    height: 460px;
}
</style>
<style>

.m-sub-btn {
  display: flex;
  align-items: center;
  justify-content: space-between
}
.m-sub-btn .el-form-item__content {
  width: 100%;
    display: flex;
  align-items: center;
      justify-content: space-between;
    width: 100%;
    display: inline-block;
}
.m-btn-signup{
  float: right
}
.m-btn-aggrement a {
  color: #ff1877;
  cursor: pointer}
</style>
