<template>

  <div>
    <div v-if="listaComentarios.length">
      <table class="table">
        <thead class="thead-dark">
          <tr :style="{color:'NAVY'}">
            <th scope="col">Descripcion</th>
            <th scope="col">Usuario</th>
            <th scope="col">Fecha de creación</th>
          </tr>
        </thead>
        <tr v-for="(comentario, index) in listaComentarios" :key="index">
          <td scope="col"> <p>{{ comentario.descripcion }}</p> </td>
          <td scope="col"> <a>{{ comentario.usuario }}</a> </td>
          <td scope="col"> <p>{{ formatearFechaHora(comentario.createdAt) }}</p> </td>
          <td scope="col"> <button v-if="comentario.usuario == this.$store.state.user" class="btn btn-danger m-3" @click="deleteComentarioAxios(comentario.id)">Borrar</button> </td>
        </tr>
      </table>
    </div>
    <div v-if ="!listaComentarios.length && !pidiendoComentarios" class="alert alert-warning"> <h5>No hay comentarios</h5> </div>
  </div>
  

</template>

<script>
  import filters from '../filters'
  import mixinsGlobal from '../mixinsGlobal.js'

  export default  {
    name: 'src-components-ver-comentario',
    props: ['temaID'],
    mixins: [filters, mixinsGlobal],
    mounted () {
      this.getComentariosFormAxios()
    },
    data () {
      return {
      }
    },
    methods: {
      /* Pedido de datos almacenados en MockAPI */
      async getComentariosFormAxios() {
        this.$store.dispatch('getComentariosAxios', this.temaID)
      },
      /* Eliminar comentario */
      deleteComentarioAxios(id) {
        this.$store.dispatch('deleteComentarioAxios', id)
      }
    }
  }
</script>

<style scoped lang="css">
  .src-components-ver-comentario {

  }
</style>
