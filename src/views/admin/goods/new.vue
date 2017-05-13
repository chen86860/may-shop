<template>
  <div class="new-wrap">
    <h2>添加商品</h2>
    <div class="new-good-wrap">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="商品名称" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品次名称" required>
          <el-input v-model="form.subName"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="form.group" placeholder="请选择商品类别">
            <el-option label="推荐热区" value="1"></el-option>
            <el-option label="分类区" value="2"></el-option>
            <el-option label="促销区" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" required>
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" required>
          <el-input v-model="form.count"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" class="img-upload">
          <el-upload action="http://up.imgapi.com" :data="uploadArgs"  :file-list="fileList" list-type="picture-card" :on-success="handlePicSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handleBeforeUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" required>
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" ref="btnSubmit" :disabled="disableSubmit">保存</el-button>
          <el-button @click="onCancle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
    <el-dialog  v-model="dialogVisible"  title="图片预览" class="dialog">
       <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'goodnew',
    data () {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        }
        callback()
      }
      return {
        form: {
          name: '',
          subName: '',
          group: '',
          price: '',
          count: '',
          desc: '',
          img: []
        },
        uploadArgs: {
          Token: 'd21e7c2d2e7d50e3e9eb954311ed910a57529102:sONwxsuuDP2MMh3C3LBpNgMa1OU=:eyJkZWFkbGluZSI6MTQ5NDU4MzEyMiwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNTg1MDc1IiwiYWlkIjoiMTMwMjIyMCIsImZyb20iOiJmaWxlIn0=',
          aid: 1302220
        },
        dialogVisible: false,
        dialogImageUrl: '',
        fileList: [],
        disableSubmit: false,
        rules: {
          name: [
            {validator: validateName, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit () {
        var vm = this
        this.disableSubmit = true;
        [].forEach.call(this.fileList, (e) => {
          vm.form.img.push(e.url)
        })
        this.$refs['form'].validate((valid) => {
          if (valid) {

          } else {
            
          }
        })
        this.$store.dispatch('addGood', this.form).then((res) => {
          this.disableSubmit = false
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({name: 'goodsIndex', query: {path: 11}})
        }).catch(_ => {
          this.disableSubmit = false
          this.$alert('something was wrong... ', ':(')
        })
      },
      onCancle () {
        this.$store.commit('setGood', {})
        this.$router.back()
      },
      handleRemove (file, fileList) {
        for (let i = 0, l = this.fileList.length; i < l; i++) {
          if (this.fileList[i].uid === file.uid) {
            this.fileList.splice(i, i)
            break
          }
        }
        console.log(fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handlePicSuccess (res, file) {
        this.fileList.push({
          url: res.linkurl,
          file: file
        })
      },
      closeModel () {
        this.dialogVisible = !this.dialogVisible
      },
      handleBeforeUpload (file) {
        if (this.fileList.length > 2) {
          this.$alert('最多只能上传三张图片')
          return false
        }
      }
    },
    activated () {
      this.$store.state.admin.good = []
      this.fileList = []
      this.disableSubmit = false
      this.form = {}
    }
  }
</script>
<style>
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
.dialog .el-dialog__headerbtn  {
  font-size: 14px !important
}
.dialog .el-dialog__header{
      padding: 20px 20px 0;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.img-upload .el-form-item__content{
  width: 900px;
}
</style>
