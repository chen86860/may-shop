<template>
  <div class="dashboard">
    <div class="header"></div>
    <div class="content-wrap">
    <div class="menu">
      <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @select="handleSelect" @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>商品管理</template>
          <el-menu-item-group>
            <el-menu-item index="11">商品列表</el-menu-item>
            <el-menu-item index="12">添加商品</el-menu-item>
            <el-menu-item index="13">商品分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>导航二</el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>导航三</el-menu-item>
      </el-menu>
    </div>
    <div class="content">
           <transition name='fade' mode='out-in'>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
      </div></div>
  </div>
</template>
<script>
export default {
  name: 'dashboard',
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
          this.$router.push({name: 'goodsIndex'})
          break
        case 12:
          this.$router.push({name: 'goodsAdd'})
          break
        case 13:
          this.$router.push({name: 'goodsClass'})
          break
      }
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
.dashboard,.content-wrap{
  height: 100%;
}
.header{
      height: 70px;
    background-color: #ff1877;
    font-size: .27rem;
    color: #fff;
    overflow: hidden;
}
.content-wrap {
  width: 100%;
  height: 100%;
  display: flex;
}

.menu {
  width: 200px;
  background-color: #f6eef0
}
.content{
  width: 100%;
  flex: 1
}
</style>
