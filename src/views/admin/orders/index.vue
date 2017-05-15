<template>
  <div class="ordersindex-wrap">
    <h2>订单管理</h2>
    <div class="table-banner">
      <el-input placeholder="输入商品名称" icon="search" v-model="search" :on-icon-click="handleIconClick">
      </el-input>
      <el-pagination :current-page.sync="currentPage" class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="5" layout="prev, pager, next" :total="total">
    </el-pagination>
    </div>
    <div class="orderslist-wrap">
      <el-table :data="orders" stripe style="width: 100%" resizable="false">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="orderId" label="订单ID" width="180">
        </el-table-column>
        <el-table-column prop="username" label="用户名称">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="80">
        </el-table-column>
        <el-table-column prop="goods" label="商品" width="100">
        </el-table-column>
        <el-table-column prop="paid" label="支付状态" width="80">
        </el-table-column>
        <el-table-column prop="initTime" label="下单时间">
        </el-table-column>
        <el-table-column label="操作" width="200" header-align="center" align="center">
          <template scope="orders">
            <el-button size="small" @click="handleEdit(orders.row,orders.row.orderId)">详情</el-button>
            <el-button size="small" type="danger" @click="handleDelete(null,orders.row,orders.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'ordersindex',
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
    orders () {
      return this.$store.state.admin.orders || ''
    },
    total () {
      return this.$store.state.admin.ordersTotal || 0
    }
  },
  mounted () {
    this.$store.dispatch('ordersIndex', {
      page: 1,
      count: 5
    }).then((res) => {
      if (res.code === 0) {
        console.log(res)
      }
    }).catch((err) => {
      console.error(err)
    })
    this.currentPage = 1
    this.$store.dispatch('ordersCount').then((res) => {}).catch((err) => { console.error(err) })
  },
  activated () {
    this.currentPage = 1
    this.$store.dispatch('ordersCount').then((res) => {}).catch((err) => { console.error(err) })
  },
  methods: {
    handleEdit (order, row) {
      this.$store.commit('setTmpOrder', order)
      this.$router.push({name: 'ordersDetail', query: {path: 22}})
    },
    handleDelete (done, orders, index) {
      this.$confirm('确定删除此订单【' + orders.orderId + '】', '删除订单')
        .then(_ => {
          this.$store.dispatch('delOrder', {
            orderId: orders.orderId
          }).then((res) => {
            this.$store.commit('delIndexOrder', index)
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
      this.$store.dispatch('ordersIndex', {
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
      // this.$store.dispatch('ordersIndex', {
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

.ordersindex-wrap h2 {
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
