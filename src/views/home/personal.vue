<template>
  <!--个人中心-->
  <div class="personal">
    <div class="header header-tit">
      <p>个人中心</p>
    </div>  
    <div class="personal-info p-flex">
      <div class="user-pic">
        <img src="../../../src/assets/img/header.jpg" alt=""/>
      </div>
      <ul class="p-size">
        <li>
          <span class="person-member iconfont icon-membershipcard"></span>
          <span> {{userinfo.username}} </span>
        </li>
        <li>
          <span class="person-member iconfont icon-shouji"></span>
          <span> {{userinfo.email}} </span>
        </li>
      </ul>
    </div>
    <div class="personal-content">
      <ul>
        <router-link to="/ordermanage/orderall" tag="li" class="person-li p-flex icon-more">  
          <div class="per-dingdan per-icon"><span class="icons iconfont icon-icon1 p-border"></span></div>
          <div class=""><span class="icon iconf">我的订单</span></div>
        </router-link>
        <router-link to="/card" tag="li" class="person-li p-flex icon-more">        
          <div class="per-kabao per-icon"><span class="icons iconfont icon-qiaquan p-border"></span></div>
          <div class=""><span class="icon iconf">卡卷包</span></div>
        </router-link>
        <router-link to="/addressList" tag="li" class="person-li p-flex icon-more">
          <div class="per-dizhi per-icon"><span class="icons iconfont icon-dvt-home p-border"></span></div>
          <div class=""><span class="icon iconf">收货地址</span></div>
        </router-link>
        <router-link to="" tag="li" class="person-li p-flex icon-more">
          <div class="per-xiaoxi per-icon"><span class="icons iconfont icon-xiaoxi p-border"></span></div>
          <div class=""><span class="icon iconf">我的消息</span></div>
        </router-link>
        <router-link to="" tag="li" class="person-li p-flex icon-more">
          <div class="per-yijian per-icon"><span class="icons iconfont icon-chexiao-copy p-border"></span></div>
          <div class=""><span class="icon iconf">意见反馈</span></div>
        </router-link>
        <router-link to="" tag="li" class="person-li p-flex icon-more">
          <div class="per-xiazai per-icon"><span class="icons iconfont icon-xiazai p-border"></span></div>
          <div class=""><span class="icon iconf">APP下载</span></div>
          <div class=""><span class="icon icon-more"> </span></div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      userinfo () {
        return this.$store.state.page.userinfo
      }
    }
  }
</script>
<style scoped>
  .header-tit {
    line-height: .78rem;
    text-align: center;  
  }
  .personal {
   font-size: .22rem;
    color: #3c3c3c;
    background-color: #fff;
  }
  .personal-info {
    height: 1.7rem;
    padding: 0 0.2rem;
    border-bottom: 1px solid #dfdfdf; 
    background-color:#ff1877;
  }
  .personal-info .user-pic {
    margin: .3rem 0;
    width: 1.4rem;
    line-height: 1.7rem;
  }
  .personal-info ul {
    margin: .3rem 0;
    width: 4.6rem;
    height: 1.1rem;
    color: #3c3c3c;
  }
  .user-pic img {
    width: 1.1rem;
    height: 1.1rem;
    border-radius :50%;
    -webkit-border-radius : 50%;
    overflow: hidden;
  }
  .personal-info li {  
    line-height: .55rem;
    color:#fff;
  }
  .person-member {
   margin-right: .1rem;
    color: #ffffff;
    font-size: .25rem;
  }
  .personal-content .person-li {
     padding: 0 .2rem 0 .25rem;
    height: .8rem;
    border-bottom: 1px solid #dfdfdf;
  }
  .person-li div:nth-of-type(1){
    width: .92rem;
  }
  .person-li div:nth-of-type(2){
    line-height: .88rem;
    width: 4.8rem ;
  }
  .person-li div:nth-of-type(3){
    line-height: .88rem;
    width: 0.28rem;
    color: #7f7f7f;
  }
  .icons {
    width: .44rem;
    height: .44rem;
    margin: .22rem 0;
    text-align: center;
    color: #ff1877;
  }
  
  .icon-icon1:before, .icon-qiaquan:before { 
    display: block;  
    padding: .04rem;
    width: .3rem;
    height: .30rem;
  }
  .icon-more{
    background-image:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDkwNDE0Mjc0ODcxIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI5OTMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjgwIDAgMjE5LjIgNTkuMiA2ODMuMiA1MTIgMjE5LjIgOTY0LjggMjgwIDEwMjQgODA0LjggNTEyWiIgcC1pZD0iMjk5NCIgZmlsbD0iI2JmYmZiZiI+PC9wYXRoPjwvc3ZnPg==');
        background-repeat: no-repeat;
    background-size: 1em;
    background-position: 94% 50%;
  }
</style>
