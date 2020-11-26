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
    <div v-if ="!listaComentarios.length && !pidiendo" class="alert alert-warning"> <h5>No hay comentarios</h5> </div>
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
        pidiendo: true,
        url: 'https://5f92eb01eca67c001640a201.mockapi.io/comentarios/'
      }
    },
    methods: {
      /* Pedido de datos almacenados en MockAPI */
      async getComentariosFormAxios() {
        try {
          let res = await this.axios(this.url)
          const comments = res.data.filter(valor => valor.idTema == this.temaID)
          this.$store.dispatch('guardarComentarios', comments)
          console.log(comments)
        }
        catch(error) {
          console.log('HTTP GET ERROR', error)
        }
        finally {
          this.pidiendo = false
        }
      },
      deleteComentarioAxios(id) {
        console.log('delete',id)
        this.axios.delete(this.url+id)
          .then(res => {
            let comentario = res.data
            console.log(comentario)
            /* let offset = this.comentarios.findIndex(comentario => comentario.id == id)
            this.comentarios.splice(offset,1) */
            this.$store.dispatch('borrarComentario', id)
          })
          .catch(error => console.log('HTTP DELETE ERROR', error))
      },

    }
}


</script>

<style scoped lang="css">
  .src-components-ver-comentario {

  }
</style>
