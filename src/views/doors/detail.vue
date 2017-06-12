<template>
  <div class="new-wrap">
    <h2>
      <i class="el-icon-arrow-left backI" @click="back"></i>
      记录详情</h2>
    <div class="new-good-wrap">
      <div class="doors-info">
        <div>
        <p>
        <span>开门时间：</span>
        <span>{{doorsitem.date}}</span>
        </p>
          <p>
            <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span>
            <span class="doors-status-info" v-if="doorsitem.code =='ok'">正常放行</span>
            <span class="doors-status-info" v-if="doorsitem.code =='warn'">信息警告</span>
            <span class="doors-status-info" v-if="doorsitem.code =='fail'">警报事件</span>
          </p>
          <p>
            <span>事件编号:</span>
            <span>{{doorsitem._id}}</span>
          </p>
        </div>
      </div>
  
      <div class="doors-info">
        <p>
          <span>用户信息:</span>
          <span>{{doorsitem.ipAdd}}</span>
        </p>
        <p>
          <span>用户名:</span>
          <span>{{doorsitem.username}}</span>
        </p>
      </div>
      <el-button type="danger" @click="handleDelete">删除记录</el-button>
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
        this.$confirm('确定删除此订单【' + this.doorsitem.doorsId + '】', '删除订单')
          .then(_ => {
            this.$store.dispatch('deldoors', {
              doorsId: this.doorsitem.doorsId
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
      doorsitem () {
        return this.$store.state.admin.door
      }
    }
  }
</script>
<style scoped>
p,
span {
  font-size: 14px;
  font-family: "\5FAE\8F6F\96C5\9ED1", Helvetica, "Droid Sans", Arial, sans-serif;
}

p {
  margin: 14px 0
}

p>span:first-child {
  color: #5f5f5f;
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
  content: "";
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
</style>
