<template>
  <div class="home-bottom-pading container-wrap">
    <transition name='fade' mode='out-in'>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <div class="home-b">
      <div class="home-b-com  p-border-t p-flex">
        <router-link tag="span" to="/home" active-class="home-select">
          <div class="iconfont icon-shouye home-f-size"></div>
          首页
        </router-link>
        <router-link tag="span" to="/classify" active-class="home-select">
          <div class="iconfont icon-fenlei home-f-size"></div>
          分类
        </router-link>
        <router-link tag="span" :to="{name:'homebuycar',query:{type:true}}" active-class="home-select">
          <div class="iconfont icon-gouwuche home-f-size"></div>
          购物车
        </router-link>
        <router-link tag="span" :to="{name:'personal'}" active-class="home-select">
          <div class="iconfont icon-m-per-person home-f-size"></div>
          个人中心
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
    .home-bottom-pading{
      padding-bottom: 1.1rem;
    }
  .home-b {
        position: fixed;
    z-index: 4;
    /* height: 1.3rem; */
    width: 100%;
    left: 0;
    bottom: 0;
    font-size: .2rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-grid-column-align: inherit;
    justify-items: inherit;
    justify-content: center;
    /* border-top: 1px solid #ddd; */
    padding-top: 0.4em;
    /* background-color: #fff; */
    /* max-width: 640px; */
  }
  
  .home-select {
    color: #ff1877;
  }
  
  .home-b-com {
  width: 6.4rem;
    padding: 0 .25rem;
    line-height: .98rem;
    margin: 0 auto;
    background: #fff;
    border-top: 1px solid #eee;
    text-align: center;
    color: #757575;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    padding-top: .2rem;
  }
  
  .home-b-com>span {
    width: 1.05rem;
    line-height: .48rem;
  }
  
  .home-f-size {
    font-size: .32rem;
    line-height: .33rem;
  }
  
  .home-yao {
    position: relative;
    width: .94rem;
    top: -.1rem;
    margin: auto;
    background-size: .9rem;
    animation: yaorotate linear .6s infinite;
    -webkit-animation: yaorotate linear .6s infinite;
  }
  
  @keyframes yaorotate {
    from {
      transform: rotateZ(-10deg);
    }
    to {
      transform: rotateZ(10deg);
    }
  }
  
  @-webkit-keyframes yaorotate {
    from {
      -webkit-transform: rotateZ(-10deg);
    }
    to {
      -webkit-transform: rotateZ(10deg);
    }
  }
  
  .home-yaobai {
    position: relative;
  }
  
  .home-yaobai:before {
    width: 1.1rem;
    height: 1.1rem;
    background: #fff;
    position: absolute;
    border-top: 1px solid #DFDFDF;
    top: -.25rem;
    left: 50%;
    margin-left: -.55rem;
    content: "";
    border-radius: 50% 50% 0 0;
  }
</style>
<script>
</script>
