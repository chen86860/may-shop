<template>
  <div class="p-flex container-wrap">
    <div class="carlist-img p-align-justy">
      <img :src="productOrder.img" />
    </div>
    <div class="carlist-content p-flex-1">
      <div class="carlist-name textellipsisone">
        {{productOrder.name}}
      </div>
      <div class="carlist-canshu">
        <span>颜色：红色</span>
        <span>x{{productOrder.count}}</span>
      </div>
      <div class="carlist-price">￥{{productOrder.price}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['productOrder']
}
</script>
<<style lang="css" scoped>
  .carlist-price{
        font-size: .2rem;
    color: #e23131;
    font-weight: 700;
  }
</style>
