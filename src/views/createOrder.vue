<template>
  <div class="createcorder p-container">
    <navheader :navleft="'common'" :title="'创建订单'"></navheader>
    <!--快递-->
    <div class="corder-way">
      <!--基本信息-->
      <div class="corder-fast p-flex" v-if="fastisshow">
        <div class="corder-info p-flex-1">
          <div><span>收件人</span><span>{{userinfo.username}}</span></div>
          <div class="corder-info-tel"><span>联系电话</span><span> {{userinfo.mobile || 18814182596}}</span></div>
          <div class="corder-address"><span>收货地址</span><span>{{'广东省江门市五邑大学'}}</span></div>
        </div>
        <div class="corder-select">
          <div class="corder-change">修改地址</div>
        </div>
      </div>
    </div>
    <!--订单商品-->
    <div class="corder-list">
      <div class="carlist-item" v-for="goods in order" :key="goods in order">
        <productOrder :productOrder="goods"></productOrder>
      </div>
    </div>
  
    <!--合计-->
    <div class="corder-heji p-border-b p-border-t">
      <div><span>共{{allCount}}件商品合计：</span>￥{{allSum}}</div>
      <div class="p-border-b"><span>运费：</span>￥10</div>
      <div><span>订单总额：</span>￥{{allSum+10}}</div>
      <div><span>应付金额：</span>￥{{allSum+10}}</div>
    </div>
    <!--提交按钮-->
    <div class="corder-btn">
      <router-link to="/orderpay">
        <button class="p-full-btn posss">提交订单</button>
      </router-link>
    </div>
  </div>
</template>
<script>
import navheader from '../components/navheader.vue'
import productOrder from '../components/productOrder.vue'
export default {
  data () {
    return {
      picked: 'fast',
      ordergoods: [1, 2]
    }
  },
  computed: {
    fastisshow () {
      if (this.picked === 'fast') {
        return true
      }
    },
    order () {
      return this.$store.state.page.order
    },
    userinfo () {
      return this.$store.state.page.userinfo
    },
    allSum () {
      var toAmount = 0
      var goods = this.order
      for (var i = 0, len = goods.length; i < len; i++) {
        if (goods[i].checked) {
          toAmount += goods[i].price * goods[i].count
        }
      }
      return toAmount
    },
    allCount () {
      var toAmount = 0
      var goods = this.order
      for (var i = 0, len = goods.length; i < len; i++) {
        toAmount++
      }
      return toAmount
    }
  },
  components: {
    navheader,
    productOrder
  },
  mounted () {
    this.$store.dispatch('createOrder', {
      username: this.$store.state.page.userinfo.id || ''
    }).then((res) => {
      console.log(this.$store.state.page.order)
    }).catch((res) => {
      console.log(res)
    })
  }
}
</script>

<style>
.createcorder {
  font-size: .22rem;
  background: #F5F5F5;
      padding-bottom: 1rem;
}

.corder-fapiao,
.corder-list,
.corder-way,
.corder-heji {
  background-color: #fff;
}

.corder-way-con {
  text-align: center;
  padding: .2rem;
  border-bottom: 1px solid #DFDFDF;
}

label {
  margin-left: .1rem;
}

label[for="one"] {
  margin-right: .7rem;
}

#fast {
  margin-left: .7rem;
}

.corder-fast {
  padding: .2rem .2rem .15rem .2rem;
  border-bottom: 1px solid #DFDFDF;
}

.corder-info span {
  display: inline-block;
  width: 1.28rem;
}

.corder-address {
  line-height: .38rem;
}

.corder-info-tel {
  margin: .12rem 0;
}

.corder-select {
  width: 1.46rem;
  text-align: right;
}

.corder-change {
  color: #ff1877;
}

.carlist-item:last-child {
  margin-bottom: 0;
}

.corder-listtotal {
  padding: .08rem 0 0 .08rem;
}

.corder-fapiao {
  height: 1.4rem;
  padding: 0 .2rem;
  border-top: 1px solid #DFDFDF;
  border-bottom: 1px solid #DFDFDF;
}

.corder-fapiao>div {
  line-height: 1.4rem;
}

.corder-fapiao>div:first-child {
  width: 2rem;
}

.corder-fapiao>ul li {
  font-size: .22rem;
  line-height: .4666666rem;
}

.corder-heji {
  padding: .1rem .2rem;
  line-height: .45rem;
  margin-top: .12rem;
}

.corder-heji>div span {
  width: 2rem;
}

.corder-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0;
}
.corder-info>div{
  display: flex;
}
.corder-info>div>span:first-child{
      width: 1rem;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    text-align-last: justify;
    padding-right: .3rem;
    color: #000000;
}
.corder-info>div>span:last-child{
      flex:1
}
.posss{
  border-radius: 0 !important;
}
</style>
