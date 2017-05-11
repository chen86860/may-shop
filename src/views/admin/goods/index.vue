<template>
  <div>
  商品列表
  </div>  
</template>
<script>
  export default {
    name: 'goodsindex',
    data () {
      return {
        msg: ''
      }
    },
    activated () {
      this.$store.dispatch('goodsIndex', {
        page: 1,
        count: 3
      }).then((res) => {
        if (res.code === 0) {
          console.log('OK')
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  }
</script>
<style>

</style>
