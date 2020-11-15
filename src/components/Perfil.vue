<template>
  <div class="jumbotron">
    <section class="src-components-perfil" align = "center">
      <h2><u>Nombre de Usuario</u></h2><br>
      <h3><b>{{$store.state.user}}</b></h3><br>
      <br><br>
      <h2><u>Foto de Perfil</u></h2><br>
      <img :src="$store.state.avatar" width="200" height="200"> <br><br>
      <!-- <button id="subirArchivo" class="btn btn-dark" @click="c">Subir Archivo</button> -->
    </section>
    <br><br><br><br>
    <div class="footer-copyright text-center py-3">© 2020 Copyright: Diego Chiaradia
      , Paulina Sigal, Federico Camelino, Nicolas Meller, Marcelo Rocchi
    </div>
  </div>

</template>

<script>
  export default  {
    name: 'src-components-perfil',
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
  .src-components-perfil {

  }
</style>