<template>
  <div class="new-wrap">
    <h2>更新用户信息</h2>
    <div class="new-good-wrap">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="用户名" required>
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" required>
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="用户等级">
          <el-input type="text" v-model="form.lever"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          {{form.regTime}}
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
          <el-button @click="onCancle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'goodnew',
    data () {
      return {
        disableSubmit: false
      }
    },
    computed: {
      form () {
        return this.$store.state.admin.user || {}
      }
    },
    methods: {
      onSubmit () {
        this.$store.dispatch('editUser', this.form).then((res) => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
        })
        this.$router.push({name: 'userIndex', query: {path: 31}})
      },
      onCancle () {
        this.$store.commit('setTmpUser', {})
        this.$message({
          type: 'info',
          message: '取消更新'
        })
        this.$router.push({name: 'usersIndex', query: {path: 31}})
      }
    }
  }
</script>
<style scoped>
.new-good-wrap {
  width: 400px;
}

.new-good-wrap .el-form {
  margin-top: 20px;
}

.new-wrap h2 {
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.new-good-wrap {
  width: 400px;
}

.new-good-wrap .el-form {
  margin-top: 20px;
}

.new-wrap h2 {
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.dialog .el-dialog__headerbtn {
  font-size: 14px !important
}

.dialog .el-dialog__header {
  padding: 20px 20px 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.img-upload .el-form-item__content {
  width: 900px;
}

.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 100%;
  height: initial !important
}
</style>
