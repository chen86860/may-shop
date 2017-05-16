<template>
  <div class="goodsindex-wrap">
    <h2>商品列表</h2>
    <div class="table-banner">
      <el-input placeholder="输入商品名称" icon="search" v-model="search" :on-icon-click="handleIconClick">
      </el-input>
      <el-pagination :current-page.sync="currentPage" class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="5" layout="prev, pager, next" :total="total">
    </el-pagination>
    </div>
    <div class="goodslist-wrap">
      <el-table :data="goods" stripe style="width: 100%" resizable="false">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="商品ID" width="180">
        </el-table-column>
        <el-table-column prop="name" label="商品名称">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="80">
        </el-table-column>
        <el-table-column prop="group" label="商品分类" width="100" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="count" label="库存量" width="80">
        </el-table-column>
        <el-table-column label="操作" width="200" header-align="center" align="center">
          <template scope="goods">
            <el-button size="small" @click="handleEdit(goods.row,goods.row.id)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(null,goods.row,goods.$index)">删除</el-button>
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
      search: '',
      currentPage: 1,
      filters: [{
        text: '热门商品', value: '1'
      },
      {
        text: '促销商品', value: '2'
      },
      {
        text: '普通商品', value: '3'
      }
      ]
    }
  },
  computed: {
    goods () {
      return this.$store.state.admin.goods || ''
    },
    total () {
      return this.$store.state.admin.total || 0
    }
  },
  mounted () {
    this.$store.dispatch('goodsIndex', {
      page: 1,
      count: 5
    }).then((res) => {
      if (res.code === 0) {
        console.log(res)
      }
    }).catch((err) => {
      console.error(err)
    })
  },
  activated () {
    this.currentPage = 1
    this.$store.dispatch('goodsCount').then((res) => {}).catch((err) => { console.error(err) })
  },
  methods: {
    formatter (row) {
      let group = ''
      switch (parseInt(row.group)) {
        case 1:
          group = '热门商品'
          break
        case 2:
          group = '促销商品'
          break
        case 3:
          group = '普通商品'
          break
      }
      return group
    },
    handleEdit (good, row) {
      this.$store.commit('setGood', good)
      this.$router.push({name: 'goodsEdit', query: {path: 11}})
    },
    handleDelete (done, goods, index) {
      this.$confirm('确定删除商品【' + goods.name + '】', '删除商品')
        .then(_ => {
          this.$store.dispatch('delGood', {
            id: goods.id
          }).then((res) => {
            this.$store.commit('delIndexGood', index)
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
    },
    handleCurrentChange (val) {
      this.$store.dispatch('goodsIndex', {
        page: val,
        count: 5
      }).then((res) => {
        if (res.code === 0) {
          console.log(res)
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    handleSizeChange (val) {
      // this.$store.dispatch('goodsIndex', {
      //   page: val,
      //   count: 4
      // }).then((res) => {
      //   if (res.code === 0) {
      //     console.log(res)
      //   }
      // }).catch((err) => {
      //   console.error(err)
      // })
    },
    filterTag (value, row) {
      return row.group === value
    }
  },
  filters: {
    groupBy (val) {
      return val + '1111'
    }
  }
}
</script>
<style scoped>
.table-banner .el-input {
  width: 200px;
}

.table-banner {
  height: 70px;
  display: flex;
  align-items: center;
      justify-content: space-between;
}

.goodsindex-wrap h2 {
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.pagination {
  height: 30px;
  display: flex;
  margin: 20px 0 20px 0;
  padding-right: 0;
  justify-content: flex-start;
  padding-left: 0;
}
</style>
