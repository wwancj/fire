<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  // background: red;
}
</style>
<script>
// import homeIndex from "./views/Monitor/DataMonitor/index.vue";

export default {
  components: {
    // homeIndex: homeIndex
  },
};
</script>
