<template>
  <div class="container container-wrap" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
    <!-- 头部 -->
    <div class="header">
      <div class="header-input"> 
      <a class="nav">
        <input type="text" class="iconfont icon-search header-search" placeholder="搜索">
			</a>
      </div>
    </div>
    <!-- 轮播banner -->
    <swiper :options="swiperbanner" class="banner-swipe">
      <swiper-slide class="banner-swipe-item" v-for="banner in banners" :key="banner in banners" ><img :src="banner" /></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 热门商品 -->
    <div class="hot-goods">
    <div v-for="item in goods_1" :key="item.id">
        <router-link :to="{name:'product',query:{id:item._id}}">
            <p>{{item.name ? item.name.slice(0,6) :''}}</p>
            <p>{{item.subName ? item.subName.slice(0,6):''}}</p>
            <div>
                <img :src="item.img ? item.img[0] : ''" alt="">
            </div>
        </router-link>
    </div>
    </div>
    <!--头条内容-->
    <div class="home-msg">
      <swiper :options="swipertitle" class="title-swipe">
        <swiper-slide class="title-swipe-item" v-for="title in titles" :key="title.id">{{title}}</swiper-slide>
      </swiper>
      <div class="home-first">HOT</div>
    </div>
    <!--广告-->
    <div class="home-ad p-align-justy">
      <img class="p-imgloay" v-lazy="adpic" />
    </div>

    <!--每日推荐-->
    <div class="home-goods">
      <p class="home-goods-title">每日推荐</p>
      <div class="home-day-goods">
          <div class="daygoodslist_0">
          <router-link :to="{name:'product',query:{id:goods_2_1._id}}">
                <p>{{goods_2_1.subName}}</p>
                <p>{{goods_2_1.name?goods_2_1.name.slice(0,4):''}}</p>
                <div><img :src="goods_2_1.img?goods_2_1.img[0]:''" alt=""></div>
              </router-link>
          </div>
          <div class="daygoodslist">
            <div v-for="item in goods_2">
             <router-link :to="{name:'product',query:{id:item._id}}">
                <div><p>{{item.subName}}</p>
                  <p>{{item.name?item.name.slice(0,4):''}}</p></div>
                  <div><img :src="item.img?item.img[0]:''" alt=""></div>
              </router-link>
            </div>
          </div>
      </div>
      <div class="home-day-goods">
          <div class="daygoodslist_0">
          <router-link :to="{name:'product',query:{id:goods_3_1._id}}">
                <p>{{goods_3_1.subName}}</p>
                <p>{{goods_3_1.name?goods_3_1.name.slice(0,4):''}}</p>
                <div><img :src="goods_3_1.img?goods_3_1.img[0]:''" alt=""></div>
          </router-link>
          </div>
          <div class="daygoodslist">
            <div v-for="item in goods_3">
            <router-link :to="{name:'product',query:{id:item._id}}">
                <div><p>{{item.subName}}</p>
                  <p>{{item.name?item.name.slice(0,4):''}}</p></div>
                  <div><img :src="item.img?item.img[0]:''" alt=""></div>
            </router-link>
            </div>
          </div>
      </div>
   
    </div>
    <!--精选商品-->
    <div class="home-goods">
      <div class="home-goods-title">精选商品</div>
      <cgoods :product="goodslist"></cgoods>
    </div>
    <loadingmore :isshow="loading"></loadingmore>
    <pageload :isshow="pageload"></pageload>
  </div>
</template>

<script>
  import cgoods from '../../components/goods.vue'
  import loadingmore from '../../components/loadingmore.vue'
  const img1 = require('../../assets/img/img1.png')
  const img2 = require('../../assets/img/img2.png')
  const img3 = require('../../assets/img/img3.png')
  export default {
    data () {
      return {
        banners: [img1, img2, img3],
        swiperbanner: {
          autoplay: 3500,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          loop: true,
          observeParents: true
        },
        titles: ['Dior迪奥真我[心悦]香水全新上市', '尊享官网独家定制刻字服务', '母亲节挚爱礼赞', '奢华好礼献心意'],
        swipertitle: {
          direction: 'vertical',
          loop: true,
          autoplay: 5000
        },
        adpic: 'http://i1.piimg.com/585075/930b9ff987165de9.png',
        goodslist: [{
          price: 123,
          pic: 'http://i1.piimg.com/585075/283daea495953d49.png'
        }, {
          pic: 'http://i1.piimg.com/585075/6e099a4009b6133b.png'
        }, {
          price: 123,
          pic: 'http://i1.piimg.com/585075/9f5feb4d75793b99.png'
        }],
        loading: false,
        pageload: false
      }
    },
    components: {
      cgoods,
      loadingmore
    },
    methods: {
      loadMore () {
        this.loading = true
        setTimeout(() => {
          this.goodslist.push({
            pic: this.goodslist[Math.floor(Math.random() * 3)].pic
          })
          this.loading = false
        }, 2000)
      }
    },
    computed: {
      goods_1 () {
        return this.$store.state.page.goods_1
      },
      goods_2_1 () {
        return this.$store.state.page.goods_2_1
      },
      goods_2 () {
        return this.$store.state.page.goods_2
      },
      goods_3_1 () {
        return this.$store.state.page.goods_3_1
      },
      goods_3 () {
        return this.$store.state.page.goods_3
      }
    },
    mounted () {
      this.$store.dispatch('goods').then((res) => {
        console.log(res)
      })
    }
}
</script>

<style scoped>

  
  
  
  .home-msg,
  .title-swipe {
    position: relative;
    padding-left: 1.26rem;
    height: .6rem;
    line-height: .6rem;
    color: #3c3c3c;
    font-size: .22rem;
    margin: 10px 0 10px;
    background-color: #fff;
  }
  
  .title-swipe {
    padding-left: 0;
  }
  
  .title-swipe .title-swipe-item>span {
    margin-right: .16rem;
    border: 1px solid #ff5364;
    border-radius: 50%;
    height: .33rem;
    line-height: .33rem;
    width: .33rem;
    text-align: center;
    color: #ff5364;
  }
  
  .home-first {
   position: absolute;
    left: .38rem;
    top: 0;
    font-size: .26rem;
    color: #ff5364;
    width: 1rem;
    display: flex;
    font-size: .22rem;
  }
  .header-search{
    outline: none;
  }
  
  .home-ad {
    width: 6.4rem;
    /*height: 1.6rem;*/
    height: 2.4rem;
    overflow: hidden;
    vertical-align: bottom;
  }
  
  .home-goods-title {
    line-height: .72rem;
    font-size: .22rem;
    color: #3C3C3C;
    background-color: #fff;
    padding-left:20px;
    margin-top:1em;
  }
  .daygoodslist{
    height:8em !important;
  }
  .daygoodslist>div{
    height:50% !important;
  }
  .home-goods a {
    color:#353535;
  }
</style>
<style>
.swiper-pagination-bullet-active {
    background-color: #ff5364 !important;
  }
    .banner-swipe {
    height: 2.6rem;
  }
  .container{
    height: 10.42rem;
    overflow-y: scroll;
  }
  .banner-swipe-item {
    height: 100%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
  }
  
  .banner-swipe-item img {
    width: 100%;
  }
  
  .swiper-pagination-bullet {
    width: 5px;
    height: 5px;
  }
  </style>
