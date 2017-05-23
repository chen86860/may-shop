<template>
  <div class="configsindex-wrap">
    <h2>系统配置</h2>
    <div class="configslist-wrap">
      <ul>
        <li>
          <label for="">
            <p>
              <span>门禁锁定 </span>
              <span>
                <el-switch v-model="value1" on-text="" off-text="">
                </el-switch>
              </span>
            </p>
          </label>
        </li>
        <li>
          <label for="">
            <p>
              <span>门禁验证</span>
              <span>
                <el-radio-group v-model="radio2">
                  <el-radio :label="1" :disabled="value1">正常开门</el-radio>
                  <el-radio :label="2" :disabled="value1">两次验证</el-radio>
                </el-radio-group>
              </span>
            </p>
          </label>
        </li>
        <li class="heart">
          <label for="">
            <p>
              <span>心跳间隔</span>
              <span class="slide-s">
                <el-slider v-model="value7" :step="10" show-stops>
                </el-slider>{{value7}}（分）</span>
            </p>
          </label>
        </li>
        <li>
          <label for="">
            <p>
              <span>警报邮箱</span>
              <span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </span>
            </p>
          </label>
        </li>
      </ul>
    </div>
    <el-button type='primary' @click='handleSave'>保存设置</el-button>
  </div>
</template>
<script>
export default {
  name: 'configsindex',
  data () {
    return {
      msg: '',
      radio2: 1,
      value1: false,
      value7: 20,
      search: '',
      input: 'chen86860@yeah.net',
      currentPage: 1
    }
  },
  computed: {
    configs () {
      return this.$store.state.admin.configs || ''
    }
  },
  mounted () {
    this.$store.dispatch('configsIndex', {
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
    this.$store.dispatch('configsCount').then((res) => { }).catch((err) => { console.error(err) })
  },
  methods: {
    handleEdit (order, row) {
      this.$store.commit('setTmpOrder', order)
      this.$router.push({ name: 'configsDetail', query: { path: 22 } })
    },
    handleSave (order, row) {
      let rule = 'ok'
      if (this.value1) {
        rule = 'lock'
      } else {
        switch (parseInt(this.radio, 10)) {
          case 1:
            rule = 'ok'
            break
          case 2:
            rule = 'warn'
            break
        }
      }
      this.$store.dispatch('updateConfig', {
        rule: rule,
        time: this.value7,
        email: this.input
      }).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: '设置更新成功！',
            type: 'success'
          })
          this.$router.back()
        }
      })
      this.$router.push({ name: 'configsDetail', query: { path: 22 } })
    },
    handleIconClick () {
      this.$message('搜索按钮')
    },
    handleCurrentChange (val) {
      this.$store.dispatch('configsIndex', {
        page: val,
        count: 5
      }).then((res) => {
        if (res.code === 0) {
          console.log(res)
        }
      }).catch((err) => {
        console.error(err)
      })
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

.configsindex-wrap h2 {
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

.configslist-wrap li {
  margin-top: 40px;
  font-size: 16px;
}

.configslist-wrap li>label>p>span:first-child {
  margin-right: 10px;
}

.slide-s {
  width: 400px;
  position: relative;
  top: 14px;
  left: 10px;
}

.heart {
  margin-top: 20px !important
}
</style>
