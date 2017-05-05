<template>
  <div class="p-size">
    <!-- 头部 -->
    <div class="header">
      <div class="header-input">
        <input type="text" class="iconfont icon-search header-search" placeholder="搜索">
      </div>
      <router-link to="/shopcar" class="shopcar"></router-link>
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
        img: ''
      },
      {
        name: '彩妆',
        img: ''
      },
      {
        name: '香水',
        img: ''
      },
      {
        name: '彩妆',
        img: ''
      },
      {
        name: '男士',
        img: ''
      },
      {
        name: '工具',
        img: ''
      },
      {
        name: '美发护肤',
        img: ''
      },
      {
        name: '热卖套装',
        img: ''
      },
      {
        name: '独家发售',
        img: ''
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
