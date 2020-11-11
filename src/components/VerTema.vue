<template>
  <div class="jumbotron">
    <!-- <h3>{{tema.titulo}}</h3>
    <p>{{tema.descripcion}}</p>
    <p>{{pasarAMayuscula(tema.categoria)}}</p>
    <p>{{formatearFechaHora(tema.createdAt)}}</p>
    <p>Creador: {{tema.usuario}}</p> -->


    <!-- Componente VerComentario -->
    <!-- Componente CrearComentario, pasar por prop el id de tema -->

  </div>
  

</template>

<script>
  import filters from '../filters'

  export default  {
    name: 'src-components-ver-tema',
    props: ['tema'],
    mixins: [filters],
    mounted () {
      /* this.getTemaFormAxios() */
    },
    data () {
      return {

        url: 'https://5f92eb01eca67c001640a201.mockapi.io/temas'
      }
    },
    methods: {
      /* Pedido de datos almacenados en MockAPI */
      /* async getTemaFormAxios() {
        try {
          let res = await this.axios(this.url)
          this.tema = this.getTemaPorID(res.data, this.tema.id)
          console.log(res.data)
        } catch(error) {
          console.log('HTTP GET ERROR', error)
        }
      }, */

      /* getTemaPorID(temas, id) {
        const tema = temas.findIndex(id)
        return tema
      } */
    },
    computed: {

    }
  }

</script>

<style scoped lang="css">
  .src-components-ver-tema {

  }
</style>
