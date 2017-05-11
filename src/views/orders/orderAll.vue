<template>
  <div class="p-order-con container-wrap" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <orderitem v-for="list in lists" :orderitem="list" :key="list.id" v-on:enter="penter(list)" v-on:test="ptest(list)"></orderitem>
  </div>
</template>
<script>
import orderitem from '../../components/orderItem.vue'
export default {
  data () {
    return {
      loading: false,
      lists: [{
        name: 'test1',
        price: 88
      },
      {
        name: 'test2',
        price: 188
      },
      {
        name: 'test3',
        price: 80
      }]
    }
  },
  components: {
    orderitem
  },
  methods: {
    loadMore () {
      console.log('Hello')
    }
  }
}
</script>
