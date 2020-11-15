<template>
  <div id="app" class="container-fluid mt-3"> 
    <div v-if="usuarioLogueado">
      <Navbar />
    </div>
    <router-view />
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'

  export default {
    name: 'App',
    components: {
      Navbar
    },
    computed: {
      usuarioLogueado() {
        return this.$store.state.userLogueado
      }
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
