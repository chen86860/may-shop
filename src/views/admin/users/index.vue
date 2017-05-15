<template>
  <div class="usersindex-wrap">
    <h2>商品列表</h2>
    <div class="table-banner">
      <el-input placeholder="输入用户名称" icon="search" v-model="search" :on-icon-click="handleIconClick">
      </el-input>
      <el-pagination :current-page.sync="currentPage" class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="5" layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <div class="userslist-wrap">
      <el-table :data="users" stripe style="width: 100%" resizable="false">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="_id" label="用户ID" width="280">
        </el-table-column>
        <el-table-column prop="username" label="用户名称">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="280">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="100">
        </el-table-column>
        <el-table-column prop="lerver" label="等级信息" width="180">
        </el-table-column>
        <el-table-column label="操作" width="200" header-align="center" align="center">
          <template scope="users">
            <el-button size="small" @click="handleEdit(users.row,users.row._id)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(null,users.row,users.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  
  </div>
</template>
<script>
export default {
  name: 'usersindex',
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
    users () {
      return this.$store.state.admin.users || ''
    },
    total () {
      return this.$store.state.admin.usersTotal || 0
    }
  },
  mounted () {
    this.$store.dispatch('usersIndex', {
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
    this.$store.dispatch('usersCount').then((res) => {}).catch((err) => { console.error(err) })
  },
  methods: {
    handleEdit (user, row) {
      this.$store.commit('setTmpUser', user)
      this.$router.push({name: 'userEdit', query: {path: 11}})
    },
    handleDelete (done, users, index) {
      this.$confirm('确定删除用户【' + users.username + '】', '删除用户')
        .then(_ => {
          this.$store.dispatch('delUser', {
            userId: users._id
          }).then((res) => {
            this.$store.commit('delIndexUser', index)
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
      this.$store.dispatch('usersIndex', {
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
      // this.$store.dispatch('usersIndex', {
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

.usersindex-wrap h2 {
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
