<template>
  <div class="jumbotron">
    <h3>{{ tema.titulo }}</h3>
    <p>{{ tema.descripcion }}</p>
    <!-- <p>{{ pasarAMayuscula(tema.categoria) }}</p> ERROR GRAVE, SE DESCARTA ESTA LINEA-->
    <p>{{ formatearFechaHora(tema.createdAt) }}</p>
    <p>Creador: {{ tema.usuario }}</p>
    
    <!-- Componente VerComentario -->
    <!-- Componente CrearComentario, pasar por prop el id de tema -->
    <!-- Mostrar el componente al hacer click en crear -->
  </div>
</template>

<script>
  import filters from '../filters'

  export default  {
    name: 'src-components-ver-tema',
    props: ['temaID'],
    mixins: [filters],
    mounted () {
      this.getTemaFormAxios()
    },
    data () {
      return {
        temas: [],
        tema: [],
        url: 'https://5f92eb01eca67c001640a201.mockapi.io/temas'
      }
    },
    methods: {
      /* Pedido de datos almacenados en MockAPI */
      async getTemaFormAxios() {
        try {
          let res = await this.axios(this.url)
          this.temas = res.data
          console.log(res.data)
          this.tema = this.temas[this.temaID-1]
          console.log(this.tema)
          
        } catch(error) {
          console.log('HTTP GET ERROR', error)
        }
      }
    },
    computed: {

    }
  }

</script>

<style scoped lang="css">
  .src-components-ver-tema {

  }
</style>
