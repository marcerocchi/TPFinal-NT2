<template>
  <div class="jumbotron">
    <section class="src-components-perfil" align = "center">
      <h2><i>{{mostrarNombre}} {{mostrarApellido}}</i></h2>
      <hr><br>
      <h3><u>Nombre de Usuario</u></h3><br>
      <h3><b>{{mostrarUsuario}}</b></h3><br>
      <h3><u>Foto de Perfil</u></h3><br>
      <img :src="mostrarAvatar" width="200" height="200"><br><br>
    </section>
    <br><br><br><br>
    <div class="footer-copyright text-center py-3">© 2020 Copyright: Diego Chiaradia
      , Paulina Sigal, Federico Camelino, Nicolas Meller, Marcelo Rocchi
    </div>
  </div>

</template>

<script>

  import mixinsGlobal from '../mixinsGlobal.js'

  export default  {
    name: 'src-components-perfil',
    props: [],
    mixins: [mixinsGlobal],
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