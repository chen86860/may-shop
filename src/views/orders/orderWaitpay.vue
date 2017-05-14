<template>
  <div class="p-order-con container-wrap" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <orderitem v-for="list in orders" :orderitem="list" :key="list.id" v-on:enter="penter(list)" v-on:test="ptest(list)"></orderitem>
  </div>
</template>
<script>
import orderitem from '../../components/orderItem.vue'
export default {
  data () {
    return {
      loading: false
    }
  },
  components: {
    orderitem
  },
  methods: {
    loadMore () {
      console.log('Hello')
    }
  },
  computed: {
    orders () {
      return this.$store.state.page.order.wait
    }
  },
  activated () {
    this.$store.dispatch('orderPay', {
      userId: this.$store.state.page.userinfo.id
    }).then((res) => {})
  }
}
</script>
