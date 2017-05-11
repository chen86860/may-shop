<template>
  <div class="container-wrap">
    <!-- 头部 -->
    <navheader :navleft="'common'" :title="'购物车'"></navheader>
    <!--购物车-->
    <div v-if="goods.length==0" class="empty-shop">
      <p>购物车为空哟~</p>
      <router-link :to="{name:'home'}">
        去逛逛
      </router-link>
    </div>
    <div v-else>
      <div class="carlist">
        <!--单个购物车-->
        <div class="carlist-item" v-for="(product,index) in goods" :key="product in goods">
          <div class="p-flex">
            <div class="carlist-select">
              <input type="checkbox" class="p-check carcheck" v-model="product.checked" @click="checked(product,index)" />
            </div>
            <div class="carlist-img p-align-justy">
              <img :src="product.img" />
            </div>
            <div class="carlist-content p-flex-1">
              <div class="carlist-name textellipsisone">
                {{product.name}}
              </div>
              <div class="carlist-canshu">
                <span>容量:{{product.size|| '100ml'}}</span>
              </div>
              <div class="carlist-item-btn">
                <div class="carlist-price">￥{{product.price}}</div>
  
                <div class="btn-plus">
                  <button class="p-btnsplice p-shop-car-btn" @click="splice(product)">-</button>
                  <input readonly class="p-input car-input p-shop-car-btn" type="text" :value="product.count" />
                  <button @click="add(product)" class="p-btnadd p-shop-car-btn">+</button>
                </div>
              </div>
            </div>
  
          </div>
  
        </div>
      </div>
      <div class="p-bottom-btns back-white" :class="{'car-home-bottom':$route.query.type}">
        <div class="p-flex p-btn-width">
          <div class="car-all">
            <input type="checkbox" class="p-check" id="carall" v-model="allSelect" />
            <label for="carall">全选</label>
          </div>
          <div class="car-total p-flex-1">
            <span>合计：</span>￥{{allSum}}
          </div>
          <router-link tag="div" to="/createOrder" class="car-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navheader from '../components/navheader.vue'
export default {
  data () {
    return {
    }
  },
  computed: {
    // 购物车物品
    goods () {
      return this.$store.state.page.cart_goods
    },
    // 全选按钮设置
    allSelect: {
      get () {
        var goods = this.goods
        for (var i = 0, len = goods.length; i < len; i++) {
          if (!goods[i].checked) {
            return false
          }
        }
        return true
      },
      set (val) {
        var goods = this.goods
        for (var i = 0, len = goods.length; i < len; i++) {
          goods[i].checked = val
        }
      }
    },
    // 价格设置
    allSum () {
      var toAmount = 0
      var goods = this.goods
      for (var i = 0, len = goods.length; i < len; i++) {
        if (goods[i].checked) {
          toAmount += goods[i].price * goods[i].count
        }
      }
      return toAmount
    }
  },
  methods: {
    splice (product) {
      if (product.count > 1) {
        product.count--
        this.$store.dispatch('cartGoodSub', {
          goodId: product.goodId,
          userId: this.$store.state.page.userinfo.id
        })
      }
    },
    add (product) {
      this.$store.dispatch('cartGoodAdd', {
        goodId: product.goodId,
        userId: this.$store.state.page.userinfo.id
      }).then((res) => {
        if (res.code === 0) {
          product.count++
        }
      })
    },
    del (index) {
      this.goods.forEach((e, i) => {
        if (e.id === index) {
          this.goods.splice(i, 1)
        }
      })
    },
    checked (product) {
      this.$store.dispatch('changeChecked', {
        goodId: product.goodId,
        userId: this.$store.state.page.userinfo.id
      }).then((res) => {
        if (res.code === 0) {
          if (product.checked) {
            product.checked = true
          } else {
            product.checked = false
          }
        }
      })
    }
  },
  components: {
    navheader
  },
  activated () {
    this.$store.dispatch('cart', {
      username: this.$store.state.page.userinfo.id || ''
    }).then((res) => {
      console.log(res)
    }).catch((res) => {
      console.log(res)
    })
  },
  mounted () {
    this.$store.dispatch('cart', {
      username: this.$store.state.page.userinfo.id || ''
    }).then((res) => {
      console.log(res)
    }).catch((res) => {
      console.log(res)
    })
  }
}
</script>
<style scoped>
.car-input {
  background: #Fff;
  width: .6rem;
  margin: 0;
}
.carlist{
  background-color: #f6f6f6;
    padding-bottom: .7rem;
}

.carlist-price {
    font-size: .2rem;
    color: #e23131;
    font-weight: 700;
}
.carlist-select {
  margin-right: .12rem;
}

.carcheck {
  margin-top: .5rem;
}

.carlist-dete {
  position: absolute;
  right: .2rem;
  bottom: .4rem;
  width: .53rem;
  height: .53rem;
  color: #fff;
  text-align: center;
  line-height: .53rem;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  background-color: #ff1877;
}

.car-all {
  position: relative;
  padding-left: .2rem;
  font-size: .22rem;
  color: #AAA9A9;
}

.car-total {
  text-align: center;
  font-size: .3rem;
}

.car-total span {
  font-size: .28rem;
}

.car-btn {
  background-color: #ff1877;
  color: #FFFFFF;
  width: 2.3rem;
  text-align: center;
}

.car-home-bottom {
  bottom: .98rem;
}

.car-home-bottom .p-btn-width {
  background-color: #fff;
}

.empty-shop {
  text-align: center
}

.empty-shop>p,
.empty-shop>a {
  font-size: 0.24em;
  text-align: center;
  color: inter;
  color: inherit;
}

.empty-shop>a {
  text-align: center;
  background-color: #ff1877;
  padding: 4px 11px;
  color: #fff;
  border-radius: 5px;
}

.p-shop-car-btn {
  border: none;
}

.back-white {
  background-color: #fff;
}
</style>
