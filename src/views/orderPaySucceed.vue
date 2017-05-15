<template>
  <div class="p-size-s container-wrap">
    <navheader :title="'成功支付'"></navheader>
    <!--订单支付-->
    <div class="pay">
      <p>
        <img src="../assets/img/finished.png" alt="">
      </p>
      <p class="p-select p-select1">支付成功!</p>
      <p class="p-select p-select2">感谢你的选购，我们将尽快为你安排发货</p>
      <div class="btn-wrap">
          <router-link :to="{name:'home'}" class="p-full-btn">
          返回首页
      </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
.order-info {

  padding: .15rem .2rem;
}

.btn-wrap {
  position: absolute;
    width: 100%;
     max-width: 640px;
    bottom: 2rem;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
        padding: 0 .6rem 0;
}

.btn-wrap button {
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

.pay-methods-wrap {
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


.pay {
  padding-top: 2rem;
height: 100%;
  background-color: #fff;
}
.pay p {
  display: flex;
  flex: 0;
  align-content: carlist;
  align-items: center;
  justify-content: center
}
.pay p img{
  width: 1.6rem;
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
.p-size-s{
  height: 100%;
}
.p-select1{
  margin-top: .1rem;
  font-size: .3rem;
}
.p-select2{
  color: #888;
  font-size: .22rem;
}
.p-select{
  background-color: #fff !important;
}
</style>
<script>
import navheader from '../components/navheader.vue'
export default {
  components: {
    navheader
  }
}
</script>
