<template>
  <div class="p-size">
    <!-- 头部 -->
    <div class="header">
      <div class="header-input">
        <input type="text" class="iconfont icon-search header-search" placeholder="搜索">
      </div>
    </div>
    <div class="p-flex">
      <!--左侧分类导航-->
      <div class="classify-swipe">
        <div class="classify-swipe-item" @click="changeClass(index)" :class="[activeId==index ? 'classify-swipe-itemactive':'']" v-for="(title,index) in titles" :key="(title,index) in titles">{{title.name}}</div>
      </div>
      <div class="classify-list p-flex-1 p-flex-float ">
        <router-link to="/search" tag="div" class="classify-item textellipsisone" v-for="item in titles" :key="item in titles">
          <div class="classify-item-img p-align-justy">
            <img :src="item.img" />
          </div>
          {{item.name}}
        </router-link>
      </div>
    </div>
  </div>
</template>
<style>
.classify-swipe {
  margin-left: 0;
  width: 1.86rem;
  height: 9.48rem;
  overflow-y: scroll;
}

.classify-swipe-item {
  height: .9rem;
  position: relative;
  line-height: .9rem;
  text-align: center;
  background: #F5F5F5;
  font-size: .20rem;
  border-bottom: 1px solid #fff;
}

.classify-swipe-itemactive {
  background: #fff;
}

.classify-swipe-itemactive:before {
  content: "";
  width: .1rem;
  height: .9rem;
  display: inline-block;
  background: #ff1877;
  position: absolute;
  left: 0;
}

.classify-list {
  height: 9.48rem;
  padding: .28rem .17rem;
  overflow-y: scroll;
  background-color: #fff;
}

.classify-item {
  width: 1.1rem;
  height: 1.8rem;
  margin: .1rem .15rem;
  font-size: .22rem;
  line-height: .6rem;
  text-align: center;
  color: #4c4c4c;
}

.classify-item-img {
  width: 1.1rem;
  height: 1.1rem;
}
</style>
<script>
import navheader from '../../components/navheader.vue'
export default {
  data () {
    return {
      titles: [{
        name: ' 护肤',
        img: 'http://i2.muimg.com/585075/f24839e3f5c301bc.jpg'
      },
      {
        name: '彩妆',
        img: 'http://i2.muimg.com/585075/564420c29c68279e.jpg'
      },
      {
        name: '香水',
        img: 'http://i2.muimg.com/585075/7f17e2ec4c12dfe2.jpg'
      },
      {
        name: '男士',
        img: 'http://i2.muimg.com/585075/b57e2abfbd8c6940.jpg'
      },
      {
        name: '工具',
        img: 'http://i2.muimg.com/585075/1612bcda74faa46f.jpg'
      },
      {
        name: '洗浴护体',
        img: 'http://i2.muimg.com/585075/846e330d49273eaf.jpg'
      },
      {
        name: '美发护肤',
        img: 'http://i2.muimg.com/585075/da71cb0a21c6fa6c.jpg'
      },
      {
        name: '热卖套装',
        img: 'http://i2.muimg.com/585075/271d0988ff4e9e16.jpg'
      },
      {
        name: '独家发售',
        img: 'http://i2.muimg.com/585075/ffd6204fed035c72.jpg'
      }
      ],
      activeId: 0
    }
  },
  methods: {
    changeClass (id) {
      this.activeId = id
    }
  },
  components: {
    navheader
  }
}
</script>
