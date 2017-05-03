<template>
  <div>
      <!-- 头部 -->
       <navheader :navleft="'common'"
               :title="'购物车'"></navheader>
    <!--购物车-->
    <div v-if="products.length==0" class="empty-shop">
       <p>购物车为空哟~</p>
       <router-link :to="{name:'home'}">
            去逛逛
       </router-link>
    </div>
    <div v-else>
    <div class="carlist">
      <!--单个购物车-->
      <div class="carlist-item"
           v-for="product in products"
           :key="product in products"
           >
        <div class="p-flex">
          <div class="carlist-select">
            <input type="checkbox"
                   class="p-check carcheck"
                   v-model="product.selected" />
          </div>
          <div class="carlist-img p-align-justy">
            <img :src="product.img" />
          </div>
          <div class="carlist-content p-flex-1">
            <div class="carlist-name textellipsisone">
              {{product.name}}
            </div>
            <div class="carlist-canshu">
              <span>款号:{{product.size}}</span>
            </div>
              <div class="carlist-item-btn">
                <div class="carlist-price">￥{{product.price}}</div>
                
                <div class="btn-plus">
          <button class="p-btnsplice"
                  @click="splice(product)">-</button>
          <input readonly
                 class="p-input car-input"
                 type="text"
                 :value="product.num" />
          <button @click="add(product)"
                  class="p-btnadd">+</button></div>
        </div>
          </div>
          
        </div>
      
      </div>
    </div>
    <div class="p-bottom-btns"
         :class="{'car-home-bottom':$route.query.type}">
      <div class="p-flex p-btn-width">
        <div class="car-all">
          <input type="checkbox"
                 class="p-check"
                 id="carall"
                 v-model="allSelect" />
          <label for="carall">全选</label>
        </div>
        <div class="car-total p-flex-1">
          <span>合计：</span>￥{{allSum}}
        </div>
        <router-link tag="div"
                     to="/createOrder"
                     class="car-btn">结算</router-link>
      </div>
    </div></div>
  </div>
</template>
<script>
import navheader from '../components/navheader.vue'
export default {
  data () {
    return {
      products: [{
        id: 1,
        price: 120,
        selected: true,
        name: '2017春上新韩版宽松显瘦高腰裤BF风大码牛仔裤女小脚哈伦裤',
        img: 'http://s2.mogucdn.com/p2/170205/2654_1eg08037ek8di094f081ahk3fa9c6_640x960.jpg_360x360.v1cAC.70.webp',
        num: 1,
        size: 'S'
      }, {
        id: 2,
        price: 78,
        selected: true,
        name: '2017春秋季外穿破洞打底裤女高腰弹力小脚铅笔裤显瘦长裤潮',
        img: 'http://s2.mogucdn.com/p1/160122/21q5ew_ifrdozlbgbrwgzjtgyzdambqmeyde_640x960.jpg_360x360.v1cAC.70.webp',
        num: 1,
        size: 'M'
      }, {
        id: 3,
        price: 150,
        selected: true,
        name: '斜挎包女包新款斜跨单肩小包迷你包韩版时尚休闲百搭链条包小方包',
        img: 'http://s2.mogucdn.com/p1/160710/76759693_ie4tam3bgvrtmytbhezdambqgqyde_640x960.jpg_360x360.v1cAC.70.webp',
        num: 1,
        size: 'S'
      }]
    }
  },
  computed: {
    // 全选按钮设置
    allSelect: {
      get () {
        var products = this.products
        for (var i = 0, len = products.length; i < len; i++) {
          if (!products[i].selected) {
            return false
          }
        }
        return true
      },
      set (val) {
        var products = this.products
        for (var i = 0, len = products.length; i < len; i++) {
          products[i].selected = val
        }
      }
    },
    // 价格设置
    allSum () {
      var toAmount = 0
      var products = this.products
      for (var i = 0, len = products.length; i < len; i++) {
        if (products[i].selected) {
          toAmount += products[i].price * products[i].num
        }
      }
      return toAmount
    }
  },
  methods: {
    splice (product) {
      if (product.num > 1) {
        product.num--
      }
    },
    add (product) {
      product.num++
    },
    del (index) {
      this.products.forEach((e, i) => {
        if (e.id === index) {
          this.products.splice(i, 1)
        }
      })
    }
  },
  components: {
    navheader
  },
  activated () {
    this.$store.dispatch('cart', {
      username: 'jack8'
    }).then((res) => {
      console.log(res)
    }).catch((res) => {
      console.log(res)
    })
  }
}
</script>
<style>
.car-input {
  background: #Fff;
  width: .6rem;
  margin: 0;
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

.car-home-bottom .p-btn-width{
  background-color: #fff;
}
.empty-shop{
  text-align:center
}
.empty-shop>p,.empty-shop>a{
font-size: 0.24em;
    text-align: center;
    color: inter;
    color: inherit;
}
.empty-shop>a{
    text-align: center;
    background-color: #ff1877;
    padding: 4px 11px;
    color: #fff;
    border-radius: 5px;
}
</style>
