<template>
  <div class="product">
    <!--导航-->
    <navheader :navleft="'common'"
               :title="'商品详情'"
               :navright="'product'"></navheader>
    <!-- 轮播banner -->
    <swiper :options="swiperbanner"
            class="product-swipe">
      <swiper-slide class="product-swipe-item"
                    v-for="ppic in product.img" :key="ppic.id"><img :src="ppic" /></swiper-slide>
      <div class="swiper-pagination"
           slot="pagination"></div>
    </swiper>
    <!--商品介绍-->
    <div class="product-container">
      <div class="product-name">{{this.product.name}}</div>
      <div class="product-price">
        <span class="product-newprice">￥{{this.product.price}}.00</span>
        <span class="product-oldprice">￥{{this.product.price|randomPrice}}.00</span>
      </div>
      <div class="product-note">{{this.product.subName}}</div>
    </div>
    <!--参数-->
    <div class="product-container product-select"
         @click="meau()">
      <span class="product-title">选择参数</span> <span class="product-tan"> >> </span>
    </div>
    <!--商品介绍-->
    <div class="product-container">
      <div class="product-title">图文详情</div>
    </div>
    <!--弹出-->
    <div class="product-mask"
         v-bind:class="[maskactive ? 'product-mask-active':'']">
      <div class="mask-con">
        <div class="product-mask-con p-flex">
          <div class="mask-con-title">数量:</div>
          <div class="make-con-rigth p-flex-1 ali-center">
            <button class="p-count" @click="subNum">-</button>
            <input class="p-input-num"
                   type="text"
                   v-model:value="count"/>
            <button class="p-count" @click="addNum">+</button>
          </div>
        </div>
        <div class="product-mask-data">
          <div v-if="sizes.length>0"
               class="product-mask-con p-flex">
            <div class="mask-con-title">容量:</div>
            <div class="make-con-rigth p-flex-1"
                 @click="changesize">
              <span v-for="(item,index) in sizes"
                    :data-id="index"
                    :class="[index==sizeId?'mask-span-active':'']">{{item}}</span>
            </div>
          </div>
          <button class="p-full-btn">
            确定
          </button>
        </div>
        <div class="mask-close"
             @click="meau()">×</div>
      </div>
    </div>
    <!---购物-->
    <div class="p-bottom-btns  product-btns">
      <div class="p-flex p-btn-width">
        <router-link to="/buycar"
                     class="product-btncar p-flex-1 iconfont icon-gouwuche"
                     tag="div">
  
        </router-link>
        <div class="product-btnjiacar">
          加入购物车
        </div>
        <div class="product-once">
          立即购买
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
      swiperbanner: {
        autoplay: 3500,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        observeParents: true
      },
      maskactive: false,
      colorId: 0,
      sizes: ['300', '500', '1000'],
      sizeId: 0,
      count: 1
    }
  },
  methods: {
    meau () {
      this.maskactive = !this.maskactive
    },
    changecolor (event) {
      if (event.target.tagName === 'SPAN') {
        this.colorId = event.target.getAttribute('data-id')
      }
    },
    changesize (event) {
      if (event.target.tagName === 'SPAN') {
        this.sizeId = event.target.getAttribute('data-id')
      }
    },
    addNum () {
      this.count++
    },
    subNum () {
      if (this.count > 1) {
        this.count--
      }
    }
  },
  components: {
    navheader
  },
  computed: {
    product () {
      return this.$store.state.page.detail || ''
    }
  },
  mounted () {
    let goodId = this.$route.query.id
    // console.log(goodId)
    this.$store.dispatch('detail', {
      id: goodId
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.err(err)
    })
  },
  filters: {
    randomPrice (value) {
      return parseInt((parseInt(value, 10) * (Math.random() + 6) / 10)) || value
    }
  }
}
</script>
<style>
.product {
  background-color: #F5F5F5;
  margin-bottom: .98rem;
}

.product-swipe {
  height: 5.12rem;
}

.product-swipe-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-swipe-item img {
  width: 100%;
}
.p-count{
      border: 1px solid #adadad;
    background-color: #fff;
    padding: .03rem;
    margin: 0;
    box-sizing: border-box;
    display: inline-block;
    /* border-radius: 3px; */
    font-size: .32rem;
    color: #6f6f6f;
}

.product-container {
  padding: .2rem;
  letter-spacing: 1px;
  border-bottom: 1px solid #DFDFDF;
  margin-bottom: .2rem;
  background-color: #fff;
}

.product-name {
  font-size: .22rem;
  color: #3C3C3C;
  line-height: .35rem;
}

.product-price {
  position: relative;
  margin: .22rem 0;
  height: .3rem;
  font-size: .3rem;
}

.product-newprice {
  color: #FF3B3B;
}

.product-oldprice {
  position: absolute;
  right: 0;
  color: #aaa9a9;
  text-decoration: line-through;
  font-size: .24rem;
}

.product-note {
  font-size: .2rem;
  color: #aaa9a9;
}

.product-select {
  position: relative;
  border-top: 1px solid #DFDFDF;
  font-size: .24rem;
}

.product-title {
  color: #3C3C3C;
  font-size: .24rem;
}
.p-input-num{
      margin: 0;
    border-color: #ddd;
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    width: .6rem;
    padding: .1rem 0;
}
.product-select .product-tan {
  position: absolute;
  right: .2rem;
}

.product-btncar {
  text-align: center;
}

.product-btncar.icon-gouwuche:before {
  display: inline-block;
  color: #8E8E8E;
  width: 1rem;
  line-height: .6rem;
  background-color: #F5F5F5;
}

.product-btnjiacar,
.product-once {
  width: 2.38rem;
  text-align: center;
  color: #fff;
  background-color: #ff1877;
}

.product-btnjiacar {
  background-color: #ff8400;
}


/*弹出*/

.product-mask.product-mask-active {
  transform: translateY(0%);
  opacity: 1;
}

.product-mask {
  position: fixed;
  z-index: 4;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  transition: all .2s ease;
  opacity: 0;
  transform: translateY(100%);
  background-color: rgba(140, 140, 140, .55);
}

.mask-con {
       position: absolute;
    left: 50%;
    margin-left: -3.2rem;
    bottom: 0;
    width: 100%;
    font-size: .22rem;
    background: #ffffff;
}

.product-mask-con {
    padding: .3rem .2rem;
    background: #fff;
    margin-bottom: .1rem;
    align-items: center;
    justify-content: center;
}

.mask-con-title {
  padding-right: .2rem;
  padding-top: .14rem;
}

.make-con-rigth span {
  display: inline-block;
  padding: .1rem .34rem;
  font-size: .22rem;
  margin: .05rem;
  text-align: center;
  border: 1px solid #F5F5F5;
}

.make-con-rigth span.mask-span-active {
  border-color: #ff1877;
  color: #ff1877;
  position: relative;
}

.make-con-rigth span.mask-span-active:after {
  position: absolute;
  content: " ";
  font-size: .22rem;
  border: .08rem solid transparent;
  border-bottom-color: #ff1877;
  border-right-color: #ff1877;
  right: 0;
  bottom: 0;
}

.product-mask-data {
  overflow-y: scroll;
  padding:0;
}

.mask-close {
  position: absolute;
  top: -.33rem;
  right: .15rem;
  font-size: .35rem;
  width: .66rem;
  height: .66rem;
  border-radius: 50%;
  background: #fff;
  line-height: .66rem;
  border: 1px solid #F5F5F5;
  text-align: center;
}
.ali-center{
    align-items: center;
}
</style>
