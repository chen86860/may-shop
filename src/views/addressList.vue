<template>
  <div class="addressList container-wrap">
    <div class="header">
      <div class="nav">
        <span class="nav-left iconfont icon-houtui" @click="back"></span>
        <div class="header-title">我的地址</div>
      </div>
    </div>
  <div class="none-address-pl" v-if="address.length===0">
      <p>
      还没收货地址，赶紧加一个吧~(●'◡'●)</p>
  </div>
    <div class="address-list p-size">
      <div class="address-list1" v-for='item in address' :key='item in address'>
        <div @click="selectAds(item)" class="address-content">
          <p> {{item.name}} </p>
          <p> {{item.mobile}} </p>
          <p> {{item.ads ? item.ads + item.detailAds : ''}} </p>
        </div>
        <div class="iconfont icon-icon07 icon-edit" @click='edit(item)'></div>
      </div>
    </div>
    <div class="none-address p-full-btn">
      <a @click="toAddAddress">
        添加收货地址
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '新增地址'
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    edit (item) {
      this.$store.commit('setTmp', {
        address: item
      })
      this.$router.push({
        path: '/addressEditor',
        query: {
          title: '编辑地址',
          del: true,
          update: true
        }
      })
    },
    toAddAddress () {
      this.$router.push({
        path: '/addressEditor',
        query: {
          title: '新增地址',
          del: false
        }
      })
    },
    selectAds (item) {
      if (!this.$route.query.save) return
      let defaultAds = {
        name: item.name,
        mobile: item.mobile,
        ads: item.ads,
        detailAds: item.detailAds
      }
      this.$store.commit('saveDefaultAds', defaultAds)
      this.$router.back()
    }
  },
  computed: {
    address () {
      return this.$store.state.page.userinfo.address
    }
  }
}
</script>
<style scoped>
.addressList {
  min-height: 100%;
  position: relative;
}

.address-list {
  margin-top: 10px;
  color: #3c3c3c;
  padding-bottom: 1rem;
}

.address-list1 {
  margin: 0;
      display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #fff;
    padding: .2rem;
    margin-bottom: .11rem;
    font-size: .22rem;
    border-bottom: 1px solid #e4e4e4;
}

.address-list1 span {
  right: .2rem;
  top: .58rem;
  width: .38rem;
  height: .38rem;
  color: #ff1877;
}

.none-address {
  text-align: center;
  font-size: .22rem;
  background-color: #ff1877;
  border-radius: 0;
  position: absolute;
  bottom: 0;
      position: fixed;
}

.none-address a {
  text-decoration: none;
  color: #fff;
}

.none-address i {
  font-style: initial
}
.address-content p {
  margin: .12rem 0;
}
.address-content p:first-child {
  margin: .12rem 0;
  font-size: .3rem;
}
.icon-edit{
     color: #ff1877;
    font-size: .3rem;
    right: 10px;
    position: relative;
}
.none-address-pl p{
      text-align: center;
    color: #9c9c9c;
    font-size: .22rem;
    margin-top: .6rem;
}
</style>
