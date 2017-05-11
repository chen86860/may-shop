<template>
  <div class="admin-login">
    <div class="login-wrap">
      <h2>注册</h2>
      <el-form :label-position="labelPosition" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="80px" class="ruleForm">
        <el-form-item label="用户名" prop='username'>
          <el-input v-model="ruleForm2.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.email="ruleForm2.email"></el-input>
        </el-form-item>
        <el-form-item label="邀请码" prop="code">
          <el-input v-model.code="ruleForm2.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
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
    return {
      labelPosition: 'right',
      ruleForm2: {
        pass: '',
        checkPass: '',
        email: '',
        code: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
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
</script>

<style scoped>
.ruleForm{
  margin: 0 auto;
}
h2 {
     font-size: 24px;
    margin: 30px 0 60px 0;
    color: #3e3e3e;
    font-weight: 400;
    font-size: 30px;
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 30px;
    color: #797979;
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
