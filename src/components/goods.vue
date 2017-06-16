<template>
  <div class="home-doors-list clearfix p-flex-float ">
    <div v-for="item in product" :key="item.id" class="doors">
        <div class="doors-img p-align-justy">
          <img v-lazy="item.pic" class="p-imgloay" />
        </div>
        <div class="doors-name textellipsis">
          {{item.names}}
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      product: {
        type: Array
      }
    }
  }
</script>
<style scoped>
  .home-doors-list {
    padding: 0rem .28rem .18rem .1rem;
    border-top: 1px solid #DFDFDF;
    border-bottom: 1px solid #DFDFDF;
  }
  
  .doors {
    position: relative;
    padding-left: .18rem;
    padding-top: .18rem;  
    width:100%;
    overflow: hidden;
  }
  
  .doors-img {
    height: 3rem;
    border: 1px solid #dfdfdf;
    overflow: hidden;
    display: flex;
    align-content: center;
    justify-content: center;
  }
  
  .doors-name,
  .doors-oldprice {
    font-size: .2rem;
    margin-top: .1rem;
  }
  
  .doors-name {
    font-size: 12px;
    height: 35px;
    color: #3C3C3C;
  }
  
  .doors-oldprice {
    color: #cccbcb;
    margin-bottom: .1rem;
  }
  
  .doors-newprice {
    color: #FF3b3b;
    font-size: .22rem;
  }
  
  .doors-vip {
    position: absolute;
    background-color: #20a0ff;
    left: .18rem;
    top: .18rem;
    padding-left: .05rem;
    color: #fff;
    font-size: .18rem;
    line-height: .34rem;
    height: .34rem;
    width: 1rem;
  }
  
  .doors-vip:before {
    content: "";
    position: absolute;
    right: -0.17rem;
    top: 0;
    border: .17rem solid #20a0ff;
    height: .34rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    overflow: hidden;
    border-right-color: transparent;
  }
</style>
