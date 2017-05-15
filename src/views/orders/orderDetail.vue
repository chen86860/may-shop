<template>
  <div class="order-item p-border-t container-wrap">
  
    <div class="header">
      <div class="nav">
        <span class="nav-left iconfont icon-houtui" @click="back"></span>
        <div class="header-title">订单详情</div>
      </div>
    </div>
  
    <div class="order-crate p-border-b">
      <div class="order-status">
        <p>
          <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span>
          <span class="order-status-info" v-if="orderitem.paid">完成</span>
          <span class="order-status-info order-status-waring" v-else>待付款</span>
        </p>
        <p>
          <span>订单编号:</span>
          <span class="order-status-info" >{{orderitem.orderId.slice(0,18)}}</span>
        </p>
        <p>
          <span>下单时间:</span>
          <span class="order-status-info" >{{orderitem.initTime.slice(0,19)}}</span>
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
  
    <div class="order-info-wrap">
      <p>
        <span>商品金额:</span>
        <span class="m-price"> ¥{{orderitem.price}}</span>
      </p>
      <p>
        <span>收货地址:</span>
        <span>{{orderitem.address.ads + orderitem.address.detailAds}}</span>
      </p>
      <p>
        <span>收&nbsp;&nbsp;货&nbsp;&nbsp;人:</span>
        <span>{{orderitem.address.name}}  {{orderitem.address.mobile.slice(0,3) + "****" + orderitem.address.mobile.slice(7,11)}}</span>
      </p>
      <p v-if="orderitem.paid">
        <span>支付方式:</span>
        <span>{{orderitem.payMethod}}</span>
      </p>
  
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
  methods: {
    common () {
      Toast({
        message: '攻城狮哥哥开发ing...',
        position: 'bottom'
      })
    },
    back () {
      this.$router.back()
    },
    pay (id, gm) {
      this.$store.commit('setTempOrder', {
        orderId: id,
        price: gm
      })
      this.$router.push({ name: 'orderpay' })
    },
    enter (gid) {
      this.$router.push({
        name: 'product',
        query: {
          id: gid
        }
      })
    }
  },
  computed: {
    orderitem () {
      return this.$store.state.page.order.detail
    }
  },
  mounted () {
    this.$store.dispatch('getOrder', {
      orderId: this.$store.state.page.tmp.order.orderId,
      userId: this.$store.state.page.userinfo.id
    }).then((res) => {
      console.log(res)
    })
  }
}
</script>
<style scoped>
.order-item {
  position: relative;
  /*background: #fff;*/
  font-size: .22rem;
}

.order-goods-desc {
  padding: 0 .2rem;
  background-color: #fff;
  display: flex;
}

.order-crate {
  height: 1.2rem;
    color: #888888;
    font-size: .22rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
        padding: 0 .2rem 0;
    margin-bottom: .3rem;
    background-color: #fff;
}

.order-status {
     width: 74%;
    color: #ff1877;
    right: .2rem;
    font-size: .22rem;
}

.order-status>p>span:first-child {
  width: 1rem;
  color: #949494;
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
.order-info-wrap{
      padding: .2rem;
      background-color: #fff;
      margin-bottom: .3rem;
}
.order-info-wrap span:first-child{
color: #949494;
width: 1rem;
}
</style>
