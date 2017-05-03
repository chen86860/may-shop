<template>
  <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
    <!-- 头部 -->
    <div class="header">
      <div class="header-input"> 
      <router-link class="nav" to="/search">
        <input type="text" class="iconfont icon-search header-shousuo" placeholder="搜索">
			</router-link>
      </div>
        <router-link  :to="{name:'homebuycar'}" class="shopcar"></router-link>
    </div>
    <!-- 轮播banner -->
    <swiper :options="swiperbanner" class="banner-swipe">
      <swiper-slide class="banner-swipe-item" v-for="banner in banners" :key="banner in banners" ><img :src="banner" /></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 热门商品 -->
    <div class="hot-goods">
    <div v-for="item in goods" :key="item.id">
        <router-link :to="{name:'product',query:{id:item.id}}">
            <p>{{item.title}}</p>
            <p>{{item.subTitle}}</p>
            <div>
                <img :src="item.img" alt="">
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
              <a :href="daygoodslist_1_0.to">
                <p>{{daygoodslist_1_0.title}}</p>
                <p>{{daygoodslist_1_0.subTitle}}</p>
                <div><img :src="daygoodslist_1_0.pic" alt=""></div>
              </a>
          </div>
          <div class="daygoodslist">
            <div v-for="item in daygoodslist_1">
                <a :href="item.to">
                <div><p>{{item.title}}</p>
                  <p>{{item.subTitle}}</p></div>
                  
                  <div><img :src="item.pic" alt=""></div>
                </a>
            </div>
          </div>
      </div>
      <div class="home-day-goods">
          <div class="daygoodslist_0">
              <a :href="daygoodslist_2_0.to">
                <p>{{daygoodslist_2_0.title}}</p>
                <p>{{daygoodslist_2_0.subTitle}}</p>
                <div><img :src="daygoodslist_2_0.pic" alt=""></div>
              </a>
          </div>
          <div class="daygoodslist">
            <div v-for="item in daygoodslist_2">
                <a :href="item.to">
                <div><p>{{item.title}}</p>
                  <p>{{item.subTitle}}</p></div>
                  
                  <div><img :src="item.pic" alt=""></div>
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
        daygoodslist_1_0: {
          title: ' 上衣 ',
          subTitle: '领券直降100元 ',
          price: 123,
          pic: 'https://s2.mogucdn.com/p2/170320/16681717_7i2fl9liea42kcdi6d22kk81h7ji0_320x360.jpg'
        },
        daygoodslist_2_0: {
          title: ' 美鞋尝鲜 ',
          subTitle: 'TOP单品 低至1折',
          price: 123,
          pic: 'https://s2.mogucdn.com/mlcdn/c45406/170323_0419ag6713j63fbfh56gc3ajae1ac_320x360'
        },
        daygoodslist_1: [{
          title: '裤子',
          subTitle: ' 5折抢新 ',
          price: 123,
          pic: 'https://s2.mogucdn.com/mlcdn/c45406/170323_8flcl1120jg89fcd08d5klf9b7a9l_180x180.jpg'
        }, {
          title: ' 裙子 ',
          subTitle: ' 流行不撞衫 ',
          price: 123,
          pic: 'https://s2.mogucdn.com/p2/170320/105897215_1f417i68dfjib1786hdcf1afkc60a_180x180.jpg'
        }],
        daygoodslist_2: [{
          title: ' 人气美包 ',
          subTitle: ' 高颜值美包盘点 ',
          price: 123,
          pic: 'https://s2.mogucdn.com/mlcdn/c45406/170322_32la577b09922kgelk8k1c2i2d1j9_180x180.jpg'
        }, {
          title: ' 热辣男友 ',
          subTitle: ' 男友换新装 ',
          price: 123,
          pic: 'https://s2.mogucdn.com/mlcdn/c45406/170322_03e3211e06k36lja4i2fdd93cfeil_180x180.jpg'
        }],
        goods: [{
          to: '',
          title: '团购',
          subTitle: '量贩买就送',
          img: 'https://s2.mogucdn.com/p2/170317/105897215_7fecl8jg88ige3lgbfbhb5i17079i_200x200.jpg'
        },
        {
          to: '',
          title: '优选',
          subTitle: '最高满减50',
          img: 'https://s10.mogucdn.com/p1/160518/upload_ie4dgojuga4dkojzhazdambqgiyde_120x120.png'
        },
        {
          to: '',
          title: '新人福利',
          subTitle: '百款新人好礼',
          img: 'https://s10.mogucdn.com/p1/160401/1ei_ie4dinbwmnsggntbg4zdambqgiyde_120x120.jpg'
        }
        ],
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
      goods () {
        return this.$store.page.good_1 || ''
      }
    },
    activated () {
      this.$store.dispatch('goods').then((res) => {
        console.log(res)
      })
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
</style>
