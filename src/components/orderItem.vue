<template>
  <div class="order-item p-border-t container-wrap">
    <div class="order-crate p-border-b" @click="detail(orderitem.orderId)">
      <div class="order-status">
        <p>
          <span>状&nbsp;&nbsp;&nbsp;&nbsp;态:</span>
          <span class="order-status-info" v-if="orderitem.paid">完成</span>
          <span class="order-status-info order-status-waring" v-else>待付款</span>
        </p>
        <p>
          <span>总&nbsp;&nbsp;&nbsp;&nbsp;价:</span>
          <span class="order-status-price">¥ {{orderitem.price}}</span>
        </p>
      </div>
      <div class="order-total">
        <div class="order-btns" v-if="orderitem.paid">
          <button class="order-btn common-btn" @click="common">去评价</button>
        </div>
        <div class="order-btns" v-else>
          <button class="order-btn" @click="pay(orderitem.orderId,orderitem.price)">去付款</button>
        </div>
      </div>
    </div>
  
    <div class="order-goods-desc p-border-b" v-for="good in orderitem.goods" @click="enter(good.goodId)">
      <span>
        <img :src="good.img" alt="">
      </span>
      <div class="order-content">
        <span class="textellipsisone order-name">
          {{good.name}}
        </span>
        <span class="textellipsisone">
          x {{good.count}}
        </span>
        <span class="textellipsisone order-name-red">
          {{good.price}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  props: ['orderitem'],
  methods: {
    common () {
      Toast({
        message: '攻城狮哥哥开发ing...',
        position: 'bottom'
      })
    },
    pay (id, gm) {
      this.$store.commit('setTempOrder', {
        orderId: id,
        price: gm
      })
      this.$router.push({ name: 'orderpay' })
    },
    detail (id) {
      this.$store.commit('setTempOrder', {
        orderId: id
      })
      this.$router.push({ name: 'orderDetail' })
    },
    enter (gid) {
      this.$router.push({
        name: 'product',
        query: {
          id: gid
        }
      })
    }
  }
}
</script>
<style scoped>
.order-item {
  position: relative;
  margin-top: .12rem;
  background: #fff;
  font-size: .22rem;
}

.order-goods-desc {
  padding: 0 .2rem;
  display: flex;
}

.order-crate {
  height: 1.2rem;
  padding: 0 .2rem;
  /* line-height: .6rem; */
  color: #888888;
  font-size: .22rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  align-items: center;
}

.order-status {
  width: 200px;
  color: #ff1877;
  right: .2rem;
  font-size: .22rem;
}

.order-status>p>span:first-child {
  width: 1rem;
  color: #545454;
}

.order-goods-desc span:first-child {
  width: 1.3rem;
  height: 1.3rem;
  margin: .1rem .1rem .1rem 0;
  background: #fff;
}

.order-goods-desc span:first-child>img {
  width: 100%;
  height: 100%;
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
  text-align: right;
  flex: 1;
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
</style>
