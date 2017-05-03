<template>
  <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
    <!-- 头部 -->
    <div class="header">
      <div class="header-input"> 
      <router-link class="nav" to="/search">
        <input type="text" class="iconfont icon-search header-search" placeholder="搜索">
			</router-link>
      </div>
    </div>
    <!-- 轮播banner -->
    <swiper :options="swiperbanner" class="banner-swipe">
      <swiper-slide class="banner-swipe-item" v-for="banner in banners" :key="banner in banners" ><img :src="banner" /></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 热门商品 -->
    <div class="hot-goods">
    <div v-for="item in goods" :key="item.id">
        <router-link :to="{name:'product',query:{id:item._id}}">
            <p>{{item.name | substr}}</p>
            <p>{{item.subName | substr}}</p>
            <div>
                <img :src="item.img[0]" alt="">
            </div>
        </router-link>
    </div>
    </div>
    <!--头条内容-->
    <div class="home-msg">
      <swiper :options="swipertitle" class="title-swipe">
        <swiper-slide class="title-swipe-item" v-for="title in titles" :key="title.id">{{title}}</swiper-slide>
      </swiper>
      <div class="home-first">HOT:</div>
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
              <a :href="daygoodslist_1_0._id">
                <p>{{daygoodslist_1_0.subName}}</p>
                <p>{{daygoodslist_1_0.name}}</p>
                <div><img :src="daygoodslist_1_0.img[0]" alt=""></div>
              </a>
          </div>
          <div class="daygoodslist">
            <div v-for="item in daygoodslist_1">
                <a :href="item._id">
                <div><p>{{item.subNmae}}</p>
                  <p>{{item.name}}</p></div>
                  
                  <div><img :src="item.img[0]" alt=""></div>
                </a>
            </div>
          </div>
      </div>
      <div class="home-day-goods">
          <div class="daygoodslist_0">
              <a :href="daygoodslist_2_0._id">
                <p>{{daygoodslist_2_0.subName}}</p>
                <p>{{daygoodslist_2_0.name}}</p>
                <div><img :src="daygoodslist_2_0.img[0]" alt=""></div>
              </a>
          </div>
          <div class="daygoodslist">
            <div v-for="item in daygoodslist_2">
                <a :href="item.id">
                <div><p>{{item.subName}}</p>
                  <p>{{item.name}}</p></div>
                  
                  <div><img :src="item.img[0]" alt=""></div>
                </a>
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
        titles: ['围观“帝君”领跑扬州+满600减50', '泰国茉莉香米松软甘甜，新品减5', '满150减10+  满79减5'],
        swipertitle: {
          direction: 'vertical',
          loop: true,
          autoplay: 5000
        },
        adpic: 'https://img.alicdn.com/imgextra/i3/99/TB2e.QJdp5N.eBjSZFvXXbvMFXa_!!99-0-yamato.jpg_1152x1920q30s0.jpg',
        goodslist: [{
          price: 123,
          pic: 'https://s10.mogucdn.com/mlcdn/c45406/170322_3af3d77k9035j4jafk34k41888j70_750x376.jpg_640x999.jpg'
        }, {
          pic: 'https://s10.mogucdn.com/mlcdn/c45406/170322_1fkci5flej46kha9l7f9gfg1fd315_750x376.jpg_640x999.jpg'
        }, {
          price: 123,
          pic: 'https://s2.mogucdn.com/mlcdn/c45406/170321_0lc83e72l792d5j4331f3584fd98h_750x360.jpg_800x9999.v1c7E.70.webp'
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
            pic: 'http://s2.mogucdn.com/p2/170325/arkmaster_3el2ebda377a75le6hlef58a0b0ac_690x400.png'
          })
          this.loading = false
        }, 1000)
      }
    },
    computed: {
      results () {
        return this.$store.state.page.goods || []
      },
      goods () {
        return ([].concat(this.$store.state.page.goods)).slice(0, 3)
      },
      daygoodslist_1_0 () {
        return ([].concat(this.$store.state.page.goods))[3]
      },
      daygoodslist_1 () {
        return ([].concat(this.$store.state.page.goods)).slice(4, 6)
      },
      daygoodslist_2 () {
        return ([].concat(this.$store.state.page.goods)).slice(7, 9)
      },
      daygoodslist_2_0 () {
        return ([].concat(this.$store.state.page.goods))[6]
      }
    },
    mounted () {
      this.$store.dispatch('goods').then((res) => {
        console.log(res)
      })
    },
    filters: {
      substr (value) {
        return value.slice(0, 5)
      }
    }
}
</script>

<style>
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
  
  .swiper-pagination-bullet-active {
    background-color: #ff1877;
  }
  
  .home-msg,
  .title-swipe {
    position: relative;
    padding-left: 1.26rem;
    height: .6rem;
    line-height: .6rem;
    color: #3c3c3c;
    font-size: .25rem;
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
    left: .28rem;
    top: 0;
    font-size: .26rem;
    color: #ff5364;
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
    font-size: .24rem;
    color: #3C3C3C;
    background-color: #fff;
    padding-left:20px;
    margin-top:1em;
  }
  .daygoodslist{
    height:8em !important;
  }
  .daygoodslist>div{
    height:4em !important;
  }
</style>
