<template>
  <div class="goodsindex-wrap">
    <h2>商品列表</h2>
    <div class="table-banner">
      <el-input placeholder="输入商品名称" icon="search" v-model="search" :on-icon-click="handleIconClick">
      </el-input>
    </div>
    <div class="goodslist-wrap">
      <el-table :data="goods" stripe style="width: 100%" resizable="false">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="_id" label="商品ID" width="180">
        </el-table-column>
        <el-table-column prop="name" label="商品名称">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="80">
        </el-table-column>
        <el-table-column prop="count" label="库存量" width="80">
        </el-table-column>
        <el-table-column prop="desc" label="商品描述">
        </el-table-column>
        <el-table-column label="操作" width="200" header-align="center" align="center">
          <template scope="goods">
            <el-button size="small" @click="handleEdit(goods.row,goods.row._id)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(null,goods.row,goods.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'goodsindex',
  data () {
    return {
      msg: '',
      search: ''
    }
  },
  computed: {
    goods () {
      return this.$store.state.admin.goods || ''
    }
  },
  activated () {
    this.$store.dispatch('goodsIndex', {
      page: 1,
      count: 3
    }).then((res) => {
      if (res.code === 0) {
        console.log(res)
      }
    }).catch((err) => {
      console.error(err)
    })
  },
  methods: {
    handleEdit (good, row) {
      this.$store.commit('setGood', good)
      this.$router.push({name: 'goodsNew'})
    },
    handleDelete (done, goods, row) {
      this.$confirm('确定删除商品【' + goods.name + '】', '删除商品')
        .then(_ => {
          this.$store.dispatch('delGood', {
            id: goods._id
          }).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
        .catch(_ => {
          this.$message({
            type: 'info',
            message: '已取消删除!'
          })
        })
    },
    handleClose (done) {
      this.$confirm({
        message: '确定删除'
      })
        .then(_ => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          done()
        })
        .catch(_ => {
          this.$message({
            type: 'info',
            message: '已取消删除!'
          })
        })
    },
    handleIconClick () {
      this.$message('搜索按钮')
    }
  }
}
</script>
<style>
.table-banner .el-input {
  width: 200px;
}

.table-banner {
  height: 70px;
  display: flex;
  align-items: center;
}

.goodsindex-wrap h2 {
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}
</style>
