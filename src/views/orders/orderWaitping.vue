<template>
  <div class="p-order-con container-wrap"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="10">
    <orderitem v-for="list in lists"
               :orderitem="list"
               :key="list.id"
               v-on:enter="penter(list)"
               v-on:test="ptest(list)"></orderitem>
  </div>
</template>
<script>
import orderitem from '../../components/orderItem.vue'

export default {
  data () {
    return {
      loading: false,
      lists: [1, 2, 3]
    }
  },
  components: {
    orderitem
  }
}
</script>
