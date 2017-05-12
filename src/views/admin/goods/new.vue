<template>
  <div class="new-wrap">
    <h2>添加商品</h2>
    <div class="new-good-wrap">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品次名称">
          <el-input v-model="form.subName"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="form.class" placeholder="请选择商品类别">
            <el-option label="推荐热区" value="1"></el-option>
            <el-option label="分类区" value="2"></el-option>
            <el-option label="促销区" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="form.count"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-button>上传图片</el-button>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
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
        forms: {
          name: '',
          subName: '',
          class: ''
        }
      }
    },
    computed: {
      form () {
        return this.$store.state.admin.good || {}
      }
    },
    methods: {
      onSubmit () {
        console.log('submit')
      },
      onCancle () {
        this.$store.commit('setGood', {})
        this.$router.back()
      }
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
</style>
