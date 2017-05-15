<template>
  <div class="createcorder p-container container-wrap">
    <navheader :navleft="'common'" :title="'创建订单'"></navheader>
    <!--快递-->
    <div class="corder-way">
      <!--基本信息-->
      <div class="corder-fast">
        <div class="none-address" v-if="userinfo.defaultAds.length==0">
            <a @click="toAddAddress">
              <i class="icon-add">+</i>
              添加收货地址
            </a>
        </div>
                <div class="corder-info order-address" v-else @click="selectAds">
                  <div><span>收件人</span><span>{{userinfo.defaultAds[0].name ? userinfo.defaultAds[0].name : ''}}</span></div>
                  <div class="corder-info-tel"><span>联系电话</span><span> {{userinfo.defaultAds[0].mobile || '******'}}</span></div>
                  <div class="corder-address"><span>收货地址</span><span>{{userinfo.defaultAds[0].ads ? userinfo.defaultAds[0].ads + userinfo.defaultAds[0].detailAds : ''}}</span></div>
                </div>
                <div class="border-location"></div>
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
      <a  @click="createOrder">
        <button class="p-full-btn posss">提交订单</button>
      </a>
    </div>
  </div>
</template>
<script>
import navheader from '../components/navheader.vue'
import productOrder from '../components/productOrder.vue'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      picked: 'fast'
    }
  },
  computed: {
    order () {
      return this.$store.state.page.order.tmp
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
    if (this.order.length === 0) {
      this.$router.push({name: 'homeMain'})
    }
    this.$store.dispatch('prevCreateOrder', {
      username: this.$store.state.page.userinfo.id || ''
    }).then((res) => {
      console.log(this.$store.state.page.order)
    }).catch((res) => {
      console.log(res)
    })
  },
  methods: {
    toAddAddress () {
      this.$router.push({name: 'addressEdit', query: {title: '编辑地址', del: false, save: true}})
    },
    selectAds () {
      this.$router.push({name: 'addressList', query: {save: true}})
    },
    createOrder () {
      if (this.userinfo.defaultAds.length === 0) {
        Toast({
          message: '添加个收货地址再提交订单吧~~',
          position: 'bottom'
        })
        return
      }
      this.$store.dispatch('createOrder', {
        userId: this.$store.state.page.userinfo.id,
        address: this.$store.state.page.userinfo.defaultAds
      }).then((res) => {
        if (res.code === 0) {
          this.$store.commit('setTempOrder', {
            orderId: res.msg.orderId,
            price: res.msg.price
          })
          this.$router.push({name: 'orderpay', query: {save: true}})
        }
      })
    }
  }
}
</script>

<style scoped>
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
.corder-way{
  
margin-bottom: 10px;  
}
#fast {
  margin-left: .7rem;
}

.corder-fast {
  padding:0;
  border-bottom:none;
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
    max-width: 640px;
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
.border-location{
  width: 100%;
  height: 6px;
  background-image: url('../assets/img/location-border.png');
  
  background-repeat: repeat-x;
      background-size: 100px;
    background-position: 0 100%;
}
.order-address{
     margin: 0;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDk0NzM3MjE1OTkwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MDMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMzE4LjczMDI0IDgzNi4zMjEyOGMzLjk5MzYgMy45OTM2IDkuMjM2NDggNi4wMDA2NCAxNC40NzkzNiA2LjAwMDY0czEwLjQ4NTc2LTIuMDA3MDQgMTQuNDc5MzYtNi4wMDA2NGwzMDcuMi0zMDcuMmM4LjAwNzY4LTguMDA3NjggOC4wMDc2OC0yMC45NTEwNCAwLTI4Ljk1ODcybC0zMDcuMi0zMDcuMmMtOC4wMDc2OC04LjAwNzY4LTIwLjk1MTA0LTguMDA3NjgtMjguOTU4NzIgMHMtOC4wMDc2OCAyMC45NTEwNCAwIDI4Ljk1ODcybDI5Mi43MjA2NCAyOTIuNzIwNjRMMzE4LjczMDI0IDgwNy4zNjI1NkMzMTAuNzIyNTYgODE1LjM3MDI0IDMxMC43MjI1NiA4MjguMzM0MDggMzE4LjczMDI0IDgzNi4zMjEyOHoiIHAtaWQ9IjI1MDQiIGZpbGw9IiM3MDcwNzAiPjwvcGF0aD48L3N2Zz4=");
    padding: 0;
        border: none;
              background-size: 26px;
    background-repeat: no-repeat;
    background-position: 96% 50%;
}
.corder-info{
      padding: 10px;
}
.none-address{
  text-align: center;
        height: 1.3rem;
    line-height: 1.3rem;
}
.none-address a{
     text-decoration: none;
    color: #fff;
    background-color: #ff1877;
    padding: 3px 12px;
}
.none-address i {
  font-style: initial
}
</style>
