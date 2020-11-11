<template>
  <div id="app" class="container-fluid mt-3">
    <Home />
  </div>
</template>

<script>
  import Home from './components/Home.vue'
  
  export default {
    name: 'App',
    components: {
      Home
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
