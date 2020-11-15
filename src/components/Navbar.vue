<template>
    <nav>
      <div align="center">
        <router-link to="/home">
            <img src="../assets/LogoRepORT.png" width="1100" height="130">
        </router-link>
      </div>
      <router-link to="/perfil">
        <img src="../assets/LogoPerfil.png " width="100" height="100" align="left">
        <br><br>
        <br>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/creartema">
              <a class="nav-link" href="#">Nuevo Tema</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>

  export default  {
    name: 'src-components-navbar',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-navbar {

  }
</style>
