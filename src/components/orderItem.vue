<template>
  <div class="order-item p-border-t">
    <div class="order-crate p-border-b">
      <div class="order-status">
        <p><span>状&nbsp;&nbsp;&nbsp;&nbsp;态:</span><span class="order-status-info">完成</span></p>
        <p><span>总&nbsp;&nbsp;&nbsp;&nbsp;价:</span><span class="order-status-price">¥ {{orderitem.price}}</span></p>
      </div>
      <div class="order-total">
        <div class="order-btns">
          <button class="order-btn" @click="test">去付款</button>
        </div>
      </div>
    </div>
    <div class="order-goods-desc p-border-b " @click="enter">
      <span>
        <img :src="orderitem.img" alt="">
      </span>
      <span class="textellipsisone">
        {{orderitem.name}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['orderitem'],
  methods: {
    test () {
      alert('hild')
      this.$emit('est')
    },
    enter () {
      this.$router.push({
        path: '/orderdetail'
      })
    }
  }
}
</script>
<style scoped>
.order-item {
  position: relative;
  margin-top: .12rem;
  background: #fff;
  font-size: .22rem;
}

.order-goods-desc {
  padding: 0 .2rem;
  display: flex;
}
.order-crate {
    height: 1.2rem;
  padding: 0 .2rem;
    /* line-height: .6rem; */
    color: #888888;
    font-size: .22rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    align-items: center;
}

.order-status {
  width: 200px;
  color: #ff1877;
  right: .2rem;
  font-size: .22rem;
}

.order-status>p>span:first-child{
  width: 1rem;
    color: #545454;
}

.order-goods-desc span:first-child {
  width: 1.3rem;
  height: 1.3rem;
  margin: .1rem .1rem .1rem 0;
  background: #fff;
}
.order-goods-desc span:first-child>img{
  width: 100%;
  height: 100%;
}
.order-status-info{
  color: #2196F3
}
.order-total {
  line-height: .6rem;
  padding: 0 .2rem;
  font-size: .22rem;
  text-align: right;
  flex: 1;
}

.order-btn {
      background: #ff1877;
    border: 1px solid #ff1877;
    padding: .08rem .25rem;
    border-radius: .06rem;
    color: #fff;
}

.order-btn:active {
  background: #ff1877;
  color: #fff;
}

.order-enter {
  position: absolute;
  line-height: 1.5rem;
  width: .6rem;
  right: 0;
  background: #F5F5F5;
  top: .6rem;
  color: #AAA9A9;
}
</style>
