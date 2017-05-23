<template>
  <div class='new-wrap'>
    <h2>
      <i class='el-icon-arrow-left backI' @click='back'></i>
      用户详情</h2>
    <div class='new-good-wrap'>
      <div class='doors-info'>
        <div>
          <p>
            <span>用 &nbsp;户&nbsp; 名</span>
            <span>{{users.username}}</span>
          </p>
          <p>
            <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</span>
            <span class='doors-status-info' v-if="users.code =='ok'">正常</span>
            <span class='doors-status-info' v-else-if="users.code =='warn'">审核中</span>
            <span class='doors-status-info' v-else-if="users.code =='fail'">非法</span>
          </p>
          <p>
            <span>用 &nbsp;户  ID  </span>
            <span>{{users._id}}</span>
          </p>
        
        </div>
      </div>
      <div class='doors-info'>
        <p>
          <span>联系方式</span>
          <span>{{users.mobile}}</span>
        </p>
      </div>
      <p class="title-s">
时段统计表
</p>
      <div id='main' ref="mainChar">
      </div>
<p class="title-s">
详细记录
</p>
 <div class="doorslist-wrap">
      <el-table :data="doors" stripe style="width: 100%" resizable="false">
        <el-table-column prop="_id" label="事件ID" width="280">
        </el-table-column>
        <el-table-column prop="username" label="用户名称">
        </el-table-column>
        <el-table-column prop="date" label="开门时间" width="280">
        </el-table-column>
        <el-table-column prop="count" label="备注信息" width="180">
        </el-table-column>
      </el-table>
    </div>

    </div>
  </div>
</template>
<script>

export default {
  name: 'goodnew',
  data () {
    return {
      activeNames: ['1']
    }
  },
  methods: {
    common () {
      this.$message({
        type: 'info',
        message: '工程师哥哥开发ing...'
      })
    },
    back () {
      this.$router.back()
    },
    handleDelete (done, configs, index) {
      this.$confirm('确定删除此订单【' + this.users.doorsId + '】', '删除订单')
        .then(_ => {
          this.$store.dispatch('deldoors', {
            doorsId: this.users.doorsId
          }).then((res) => {
            this.$store.commit('delIndexdoors', index)
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
            this.$router.back()
          })
        })
        .catch(_ => {
          this.$message({
            type: 'info',
            message: '已取消删除!'
          })
        })
    }
  },
  computed: {
    users () {
      return this.$store.state.admin.user || {}
    },
    doors () {
      return this.$store.state.admin.userDoors || {}
    }
  },
  mounted () {
    this.$store.dispatch('doorsUserIndex', {
      page: 1,
      count: 5,
      username: this.users.username || 'admin'
    }).then((res) => {
      if (res.code === 0) {
        console.log(res)
      }
    }).catch((err) => {
      console.error(err)
    })

    var echarts = require('echarts')
    var ecStat = require('echarts-stat')
    var myChart = echarts.init(document.getElementById('main'))
    var girth = [6.1, 8.3, 8.6, 8.8, 10.5, 9.7, 8.8, 9.0, 9.0, 9.1, 9.2, 11.3, 9.4, 9.4, 9, 9.0, 9.9, 12.9, 13.3, 13.7, 13.8, 18.0, 19.2, 14.5, 16.0, 16.3, 17.3, 17.5, 17.9, 18.0, 18.0, 18.6, 18.6, 18.6, 21, 22, 22]

    var bins = ecStat.histogram(girth)

    var option = {
      title: {
        text: '',
        left: 'center',
        top: 10
      },
      color: ['rgb(25, 183, 207)'],
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        top: 80,
        containLabel: true
      },
      xAxis: [{
        type: 'value',
        scale: true
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: 'height',
        type: 'bar',
        barWidth: '99.3%',
        label: {
          normal: {
            show: true,
            position: 'insideTop',
            formatter: function (params) {
              return params.value[1]
            }
          }
        },
        data: bins.data
      }]
    }

    myChart.setOption(option)
  }
}
</script>
<style scoped>
p,
span {
  font-size: 14px;
  font-family: '\5FAE\8F6F\96C5\9ED1', Helvetica, 'Droid Sans', Arial, sans-serif;
}

p {
  margin: 14px 0
}

p>span:first-child {
  color: #5f5f5f;
  font-weight: 700
}

.new-good-wrap .el-form {
  margin-top: 20px;
}

.new-wrap h2 {
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  bdoors-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}


.new-good-wrap .el-form {
  margin-top: 20px;
}

.new-wrap h2 {
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  bdoors-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.doors-item {
  position: relative;
  /*background: #fff;*/
  font-size: .22rem;
}

.doors-doors-desc {
  /*padding: 0 .2rem;
  background-color: #fff;
  display: flex;*/
  width: 193px;
  margin: 10px;
}

.doors-status {
  width: 74%;
  color: #20a0ff;
  right: .2rem;
  font-size: .22rem;
}

.doors-status>p>span:first-child {
  color: #949494;
}

.doors-status-info {
  color: #2196F3
}

.doors-status-waring {
  color: #f00
}

.doors-total {
  line-height: .6rem;
  padding: 0 .2rem;
  font-size: .22rem;
  flex: 1;

  text-align: right;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  /* flex: 1; */
  width: 20%;
}

.doors-btn {
  background: #20a0ff;
  bdoors: 1px solid #20a0ff;
  padding: .08rem .25rem;
  bdoors-radius: .06rem;
  color: #fff;
  outline: none;
}

.doors-btn:active {
  background: #20a0ff;
  color: #fff;
}

.common-btn {
  background-color: #2196F3;
  bdoors: none;
}

.common-btn:active {
  background-color: #2196F3;
  bdoors: none;
}

.doors-enter {
  position: absolute;
  line-height: 1.5rem;
  width: .6rem;
  right: 0;
  background: #F5F5F5;
  top: .6rem;
  color: #AAA9A9;
}

.doors-name {
  padding: .1rem 0
}

.doors-name-red {
  font-size: .2rem;
  color: #e23131;
  font-weight: 700;
}

.doors-content {
  width: 100%;
  display: block;
}

.doors-content span {
  display: block !important;
  width: 100% !important;
  height: initial !important
}

.configs-wrap {
  display: flex;
}

.doors-info-wrap {
  padding: .2rem;
  margin-bottom: .3rem;
}

.doors-info-wrap span:first-child {
  color: #949494;
  font-size: 16px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #f7f7f7;
  padding: 14px;
}

.bottom>p:first-child {
  margin: 0;
}

.bottom>p:last-child {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin: 10px 0;
}

.button {
  padding: 0;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both
}

.card-body img {
  margin: 10px auto 10px;
  max-width: 147px;
  max-height: 300px;
}

.backI {
  width: 22px;
  cursor: pointer;
}

#main {
  width: 500px;
  height: 300px;
}
.title-s{
  font-weight: 700;
}
</style>
