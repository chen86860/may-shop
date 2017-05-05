<template>
  <div class="p-size">
    <navheader :navleft="'common'" :title="'订单支付'"></navheader>
    <!--订单支付-->
    <div class="pay">
      <div class="order-info">
        <div class="pay-num">订单编号：12333444444</div>
        <div class="pay-num">订单金额：</div>
      </div>
      <p class="p-select">选择支付方式</p>
      <div class="pay-methods-wrap">
        <div class="pay-method" v-for="pay in payMethods" :key="pay.id" @click="select(pay)">
          <span class="">
                  <img :src="pay.img" alt=""></span>
          <div class="pay-desc">
            <p>{{pay.name}}
            </p>
            <p>{{pay.subName}}</p>
          </div>
          <span><input type="checkbox" :checked="pay.checked"></span>
        </div>
      </div>
      <div class="btn-wrap">
        <router-link :to="{name:'orderpaysucceed'}" class="p-full-btn">
          立即支付
      </router-link>
      </div>
    </div>
  </div>
</template>
<style>
.order-info {

  padding: .15rem .2rem;
}
.btn-wrap{
    position: absolute;
    width: 100%;
    bottom: 2rem;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
        padding: 0 .6rem 0;
}
.btn-wrap button{
      margin: 0 20px 0 !important;
      cursor: pointer
}
.pay-method {
  padding: .15rem .2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid #f6f6f6;
  cursor: pointer
}
.pay-methods-wrap{
  background-color: #fff;
}
.pay-method>span:first-child {
  width: 1rem;
  height: 1rem;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: .17rem;
  box-sizing: border-box
}

.pay-desc {
  flex: 1
}

.pay-desc>p:first-child {
  font-size: .26rem;
  margin-bottom: .06rem;
}

.pay-desc>p:last-child {
  font-size: .22rem;
  color: #bdbdbd;
}

.p-select {
  background-color: #f6f6f6;
  padding: 0.15rem 0.2rem;
  font-size: .22rem;
}

.pay {

  background-color: #fff;
}

.pay-num {
  padding-bottom: .12rem;
}

.pay-goods {
  padding: .1rem 0;
}

.pay>button {
  margin-top: 1rem;
}

.pay-line {
  padding: .05rem 0;
}

input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  display: inline-block;
  position: relative;
  top: 0;
  border-radius: 18px;
  border: 1px solid #ababab;
  top: 5px;
  padding: .1rem;
  outline: none;
}

input[type="checkbox"]:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
}

input[type="checkbox"]:checked {
  background-color: #ff1877;
  border: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1);
  color: #fff;
}

input[type="checkbox"]:checked:after {
  content: '\2714';
  font-size: 14px;
  position: absolute;
  top: 0px;
  left: 3px;
  color: #fff;
}
</style>
<script>
import navheader from '../components/navheader.vue'
const img1 = require('../assets/img/pay1.jpg')
const img2 = require('../assets/img/pay2.jpg')
const img3 = require('../assets/img/pay3.jpg')
export default {
  data () {
    return {
      payMethods: [{
        id: 1,
        name: '微信支付',
        subName: '亿万用户的选择，更快更安全',
        img: img1,
        checked: true
      }, {
        id: 1,
        name: '支付宝',
        subName: '支付宝知托付！',
        img: img2,
        checked: false
      }, {
        id: 1,
        name: '银联支付',
        subName: '银联钱包，优惠省心',
        img: img3,
        checked: false
      }]
    }
  },
  methods: {
    select (pay) {
      for (var i = 0; i < this.payMethods.length; i++) {
        if (this.payMethods[i].checked) {
          this.payMethods[i].checked = false
          break
        }
      }
      pay.checked = true
    }
  },
  components: {
    navheader
  }
}
</script>
