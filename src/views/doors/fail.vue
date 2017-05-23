<template>
  <div class="doorsindex-wrap">
    <h2>
    <span>
    失败记录列表
    </span>
    </h2>
    <div class="table-banner">
      <el-input placeholder="输入查询条件" icon="search" v-model="search" :on-icon-click="handleIconClick">
      </el-input>
      <el-pagination :current-page.sync="currentPage" class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="5" layout="prev, pager, next" :total="total">
    </el-pagination>
    </div>
    <div class="doorslist-wrap">
      <el-table :data="doors" stripe style="width: 100%" resizable="false">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="_id" label="事件ID" width="280">
        </el-table-column>
        <el-table-column prop="username" label="用户名称">
        </el-table-column>
        <el-table-column prop="date" label="开门时间" width="280">
        </el-table-column>
        <el-table-column prop="count" label="备注信息" width="180">
        </el-table-column>
        <el-table-column label="操作" width="200" header-align="center" align="center">
          <template scope="doors">
            <el-button size="small" @click="handleEdit(doors.row,doors.row.id)">查看</el-button>

            <el-button size="small" type="danger" @click="handleDelete(null,doors.row,doors.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'doorsindex',
  data () {
    return {
      msg: '',
      search: '',
      currentPage: 1,
      filters: [{
        text: '正常开门', value: 'ok'
      },
      {
        text: '开门失败', value: 'filer'
      },
      {
        text: '警报信息', value: 'warn'
      }
      ]
    }
  },
  computed: {
    doors () {
      return this.$store.state.admin.doors || ''
    },
    total () {
      return this.$store.state.admin.total || 0
    }
  },
  mounted () {
    this.$store.dispatch('doorsIndex', {
      page: 1,
      type: 'fail',
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
    this.$store.dispatch('doorsCount', {type: 'fail'}).then((res) => {}).catch((err) => { console.error(err) })
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
      this.$store.commit('setDoor', good)
      this.$router.push({name: 'doorsDetail', query: {path: 11}})
    },
    handleDelete (done, doors, index) {
      this.$confirm('确定删除商品【' + doors.name + '】', '删除商品')
        .then(_ => {
          this.$store.dispatch('delGood', {
            id: doors.id
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
      this.$store.dispatch('doorsIndex', {
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
      // this.$store.dispatch('doorsIndex', {
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

.doorsindex-wrap h2 {
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

h2{
  font-size: 16px;
}
h2 span{
    padding: 3px 5px;
    font-size: 16px;
    border-left: 10px solid #f44336
}
</style>
