<template>
  <div class="addressList">
    <div class="header">
      <div class="nav">
        <span class="nav-left iconfont icon-houtui"
              @click="back"></span>
        <div class="header-title">我的地址</div>
        <span class="nav-right iconfont icon-icon"
              @click="add"></span>
      </div>
    </div>
  
    <div class="address-list p-size">
      <div class="address-list1 p-border p-rel"
           v-for='item in users'
           :key='item in users'
           >
        <p> {{item.name}} </p>
        <p> {{item.phone}} </p>
        <p> {{item.address}} </p>
        <span class="p-abs iconfont icon-icon07"
              @click='edit'></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '新增地址',
      users: [{
        'name': '陈先生',
        'phone': '188**3822',
        'address': '广东省江门市五邑大学'
      }, {
        'name': '陈小姐',
        'phone': '188**3822',
        'address': '广东省江门市五邑大学'
      }]
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    edit () {
      this.$router.push({
        path: '/addressEditor',
        query: {
          title: '编辑地址',
          del: true
        }
      })
    },
    add () {
      this.$router.push({
        path: '/addressEditor',
        query: {
          title: '新增地址',
          del: false
        }
      })
    }
  }
}
</script>
<style>
.address-list {
  margin-top: 10px;
  color: #3c3c3c;
}

.address-list div {
        width: 6rem;
    padding-left: .2rem;
    background-color: #fff;
    width: 100%;
    margin: 0 0 0.2rem 0;
    border-bottom: 1px solid #ddd;
        font-size: 0.2rem;
        padding: 0.2rem;
}

.address-list div p {
  height: .5rem;
  line-height: .5rem;
}
.address-list div p:first-child{
  font-size: 0.3rem;
}

.address-list1 {
  margin:0
}

.address-list1 span {
  right: .2rem;
  top: .58rem;
  width: .38rem;
  height: .38rem;
  color: #ff1877;
}
</style>
