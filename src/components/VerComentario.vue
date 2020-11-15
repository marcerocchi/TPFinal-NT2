<template>

  <div>
    <div v-if="comentarios.length">
      <table class="table">
        <thead class="thead-dark">
          <tr :style="{color:'NAVY'}">
            <th scope="col">Descripcion</th>
            <th scope="col">Usuario</th>
            <th scope="col">Fecha de creación</th>
          </tr>
        </thead>
        <tr v-for="(comentario, index) in comentarios" :key="index">
          <td scope="col"> <p>{{ comentario.descripcion }}</p> </td>
          <td scope="col"> <a>{{ comentario.usuario }}</a> </td>
          <td scope="col"> <p>{{ formatearFechaHora(comentario.createdAt) }}</p> </td>
        </tr>
      </table>
    </div>
    <div v-if ="!comentarios.length && !pidiendo" class="alert alert-warning"> <h5>No hay comentarios</h5> </div>
  </div>
  

</template>

<script>
  import filters from '../filters'

  export default  {
    name: 'src-components-ver-comentario',
    props: ['temaID'],
    mixins: [filters],
    mounted () {
      this.getComentariosFormAxios()
    },
    data () {
      return {
        comentarios: [],
        pidiendo: true,
        url: 'https://5f92eb01eca67c001640a201.mockapi.io/comentarios'
      }
    },
    methods: {
      /* Pedido de datos almacenados en MockAPI */
      async getComentariosFormAxios() {
        try {
          let res = await this.axios(this.url)
          console.log(res.data)
          this.comentarios = res.data.filter(valor => valor.idTema == this.temaID)
          console.log("--------Comentarios-----");
          console.log(this.comentarios)
        } catch(error) {
          console.log('HTTP GET ERROR', error)
        }
        finally {
          this.pidiendo = false
        }
      }
    }
}


</script>

<style scoped lang="css">
  .src-components-ver-comentario {

  }
</style>
