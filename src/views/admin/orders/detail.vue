<template>
  <div class="new-wrap">
    <h2>
      <i class="el-icon-arrow-left backI" @click="back"></i>
      订单详情</h2>
    <div class="new-good-wrap">
      <div class="order-info">
        <div>
          <p>
            <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span>
            <span class="order-status-info" v-if="orderitem.paid">完成</span>
            <span class="order-status-info order-status-waring" v-else>待付款</span>
          </p>
          <p>
            <span>订单编号:</span>
            <span>{{orderitem.orderId.slice(0,18)}}</span>
          </p>
          <p>
            <span>下单时间:</span>
            <span>{{orderitem.initTime.slice(0,19)}}</span>
          </p>
        </div>
      </div>
  
      <div class="order-info">
        <p>
          <span>商品金额:</span>
          <span> ¥{{orderitem.price}}</span>
        </p>
        <p>
          <span>收货地址:</span>
          <span>{{orderitem.address.ads + orderitem.address.detailAds}}</span>
        </p>
        <p>
          <span>收&nbsp;&nbsp;货&nbsp;&nbsp;人:</span>
          <span>{{orderitem.address.name}} {{orderitem.address.mobile.slice(0,3) + "****" + orderitem.address.mobile.slice(7,11)}}</span>
        </p>
        <p v-if="orderitem.paid">
          <span>支付方式:</span>
          <span>{{orderitem.payMethod}}</span>
        </p>
  
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="订单商品" name="1">
          <div class="orders-wrap">
            <div class="order-goods-desc" v-for="good in orderitem.goods">
              <el-card :body-style="{ padding: '0' }" class="card-body">
                <img :src="good.img" class="image">
                <div class="bottom">
                  <p>{{good.name.slice(0,12)}}</p>
                  <p>
                    <span class="time">¥{{ good.price }} x {{ good.count }} </span>
                    <el-button type="text" class="button">查看</el-button>
                  </p>
                </div>
              </el-card>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-button type="danger" @click="handleDelete">删除订单</el-button>
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
      handleDelete (done, orders, index) {
        this.$confirm('确定删除此订单【' + this.orderitem.orderId + '】', '删除订单')
          .then(_ => {
            this.$store.dispatch('delOrder', {
              orderId: this.orderitem.orderId
            }).then((res) => {
              this.$store.commit('delIndexOrder', index)
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
      orderitem () {
        return this.$store.state.admin.order
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
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
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

.order-item {
  position: relative;
  /*background: #fff;*/
  font-size: .22rem;
}

.order-goods-desc {
  /*padding: 0 .2rem;
  background-color: #fff;
  display: flex;*/
  width: 193px;
  margin: 10px;
}

.order-status {
  width: 74%;
  color: #ff1877;
  right: .2rem;
  font-size: .22rem;
}

.order-status>p>span:first-child {
  color: #949494;
}

.order-status-info {
  color: #2196F3
}

.order-status-waring {
  color: #f00
}

.order-total {
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

.order-btn {
  background: #ff1877;
  border: 1px solid #ff1877;
  padding: .08rem .25rem;
  border-radius: .06rem;
  color: #fff;
  outline: none;
}

.order-btn:active {
  background: #ff1877;
  color: #fff;
}

.common-btn {
  background-color: #2196F3;
  border: none;
}

.common-btn:active {
  background-color: #2196F3;
  border: none;
}

.order-enter {
  position: absolute;
  line-height: 1.5rem;
  width: .6rem;
  right: 0;
  background: #F5F5F5;
  top: .6rem;
  color: #AAA9A9;
}

.order-name {
  padding: .1rem 0
}

.order-name-red {
  font-size: .2rem;
  color: #e23131;
  font-weight: 700;
}

.order-content {
  width: 100%;
  display: block;
}

.order-content span {
  display: block !important;
  width: 100% !important;
  height: initial !important
}

.orders-wrap {
  display: flex;
}

.order-info-wrap {
  padding: .2rem;
  margin-bottom: .3rem;
}

.order-info-wrap span:first-child {
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
