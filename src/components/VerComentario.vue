<template>

  <div>
    <!-- Deberia ver: Usuario creador, Fecha de publicación y contenido -->
    <!-- A partir del idTema, hago un get de todos los comentarios con ese id en la base y los muestro  -->
  </div>
  

</template>

<script>

  export default  {
    name: 'src-components-ver-comentario',
    props: ['temaID'],
    mounted () {

    },
    data () {
      return {
        url: 'https://5f92eb01eca67c001640a201.mockapi.io/comentarios'
      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-ver-comentario {

  }
</style>
