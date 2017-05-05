<template>
  <div id="app">
  <transition name="move">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html{
  width:100%;
}
.move-enter-active, .move-leave-active {
    transition: opacity .5s
}
.move-enter, .move-leave-active {
     opacity: 0.1
}
</style>
