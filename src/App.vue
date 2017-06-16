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

<style>
.container-wrap{
  max-width: 640px;
  margin: 0 auto
}
.move-enter-active, .move-leave-active {
    transition: opacity .5s
}
.move-enter, .move-leave-active {
     opacity: 0.1
}
</style>
