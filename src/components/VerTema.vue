<template>
  <div class="jumbotron">
    <h3>{{ tema.titulo }}</h3>
    <p>{{ tema.descripcion }}</p>
    <!-- <p>{{ pasarAMayuscula(tema.categoria) }}</p> ERROR GRAVE, SE DESCARTA ESTA LINEA-->
    <p>{{ formatearFechaHora(tema.createdAt) }}</p>
    <p>Creador: {{ tema.usuario }}</p>
    
    <!-- Ver lista de Comentarios -->
    <VerComentario :temaID="temaID" />
    
    <button id="crearComentario" class="btn btn-secondary" @click="verNewComentario = !verNewComentario">Comentar</button>
    <div v-if="verNewComentario">
      Crear Comentario
      <CrearComentario :temaID="temaID" :botonCrear="verNewComentario" />
    </div>
  </div>
</template>

<script>
  import filters from '../filters'
  import VerComentario from './VerComentario'
  import CrearComentario from './CrearComentario'

  export default  {
    name: 'src-components-ver-tema',
    props: ['temaID'],
    mixins: [filters],
    components : {
      VerComentario,
      CrearComentario
    },
    mounted () {
      this.getTemaFormAxios()
    },
    data () {
      return {
        temas: [],
        tema: [],
        verNewComentario: false,
        url: 'https://5f92eb01eca67c001640a201.mockapi.io/temas'
      }
    },
    methods: {
      /* Pedido de datos almacenados en MockAPI */
      async getTemaFormAxios() {
        try {
          let res = await this.axios(this.url)
          console.log(res.data)
          this.temas = res.data
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
