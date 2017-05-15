<template>
  <div class="dashboard">
    <div class="header">
      <div class="logo">
        <a href="#">
          <img src="../../assets/img/logo-w.png" alt="">
        </a>
      </div>
      <div class="opera">
        <p>
         {{this.userinfo.username}} | <a @click="logout">退出</a>
          
        </p>
      </div>
    </div>
    <div class="content-wrap">
      <div class="menu">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @select="handleSelect" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>商品管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="11">商品列表</el-menu-item>
              <el-menu-item index="12">添加商品</el-menu-item>
              <el-menu-item index="13">商品分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>订单管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="21">订单列表</el-menu-item>
              <el-menu-item index="22">订单分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="icon-user"></i>用户管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="31">用户列表</el-menu-item>
              <el-menu-item index="32">用户编辑</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="content">
        <transition name='fade' mode='out-in'>
          <keep-alive>
            <router-view>
              Hello world!
            </router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dashboard',
  data () {
    return {
      defaultActive: '1'
    }
  },
  computed: {
    userinfo () {
      return this.$store.state.admin.userinfo
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      switch (parseInt(key, 10) || 0) {
        case 11:
          this.$router.push({ name: 'goodsIndex', query: { path: '11' } })
          break
        case 12:
          this.$router.push({ name: 'goodsNew', query: { path: '12' } })
          break
        case 13:
          this.$router.push({ name: 'goodsClass' })
          break
        case 21:
          this.$router.push({ name: 'ordersIndex' })
          break
        case 22:
          // this.$router.push({name: 'ordersDetail'})
          break
        case 31:
          this.$router.push({ name: 'usersIndex' })
          break
        case 32:
          this.$router.push({ name: 'usersEdit' })
          break
      }
      // console.log(key, keyPath)
    },
    logout () {
      this.userinfo.log = false
      this.$router.push({name: 'adminLogin'})
    }
  },
  mounted () {
    this.defaultActive = this.$route.query.path
    this.$router.push({ name: 'welcome' })
  },
  activated () {
    this.defaultActive = this.$route.query.path
  }
}
</script>
<style scoped>
.dashboard {
  min-height: 100%;
  min-width: 1100px;
  position: relative;
  overflow-y: hidden;
  overflow-x: scroll
}

.header {
  height: 70px;
  background-color: #ff1877;
  font-size: .27rem;
  color: #fff;
  overflow: hidden;
}

.content {
  width: 100%;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 30px;
  position: relative;
  min-width: 1100px;
  overflow: scroll;
}

.content-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  display: flex;
  flex: 1;
  flex-shrink: 1;
  position: absolute;
  height: 100%;
}

.menu {
  width: 200px;
  background-color: #f6eef0
}

.content {
  width: 100%;
  flex: 1
}

.icon-user {
  background: url('../../assets/img/user.svg') no-repeat 50%;
  background-size: 14px;
  width: 22px;
  height: 16px;
  display: inline-block;
  position: relative;
  top: 2px;
  right: 3px;
  background-size: 16px;
}
.logo,.logo a{
      width: 200px;
    text-align: center;
    display: inline-block;
    line-height: 70px;
    height: 70px;
}
.logo a {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo img {
  width: 50px;
}
.opera{
      width: 200px;
    height: 70px;
    color: #fff;
    text-align: center;
    line-height: 70px;
}
.opera p {
    color: #fff;
    height: 70px;
}


</style>

<style>
.opera p {
  font-size: 14px;
}
.opera p a{
  cursor: pointer
}
</style>

