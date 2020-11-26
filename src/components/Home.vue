<template>
  <div class="jumbotron">
    <!-- ------------------ -->
    <!-- Temas de discusión -->
    <!-- ------------------ -->
    <div id="encabezado">
      <button id="crearTema" class="btn btn-primary" @click="crearTema()">Crear tema <b>+</b></button>
      <h2>Temas de discusión</h2>
    </div>
    <hr />
    <input 
      type="text"
      placeholder="Buscar tema ..."
      id="titulo"
      class="form-control"
      v-model="criterioDeBusqueda"
    >
    <br>
    <div v-if="listaTemas.length">
      <table class="table">
        <thead class="thead-dark">
          <tr :style="{color:'NAVY'}">
            <th scope="col">Titulo</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Categoria</th>
            <th scope="col">Fecha de creación</th>
          </tr>
        </thead>
        <tr v-for="(tema, index) in temasFiltrados" :key="index">
          <td scope="col"> <a><b>{{ tema.titulo }}</b></a> </td>
          <td scope="col"> <p>{{ tema.descripcion }}</p> </td>
          <td scope="col"> <p>{{ pasarAMayuscula(tema.categoria) }}</p> </td>
          <td scope="col"> <p>{{ formatearFechaHora(tema.createdAt) }}</p> </td>                   
          <td scope="col"> <button id="verTema" class="btn btn-dark" @click="verTema(tema.id)">Ir al tema</button> </td>
        </tr>
      </table>
    </div>
    <div v-if ="!listaTemas.length && !pidiendoTemas" class="alert alert-warning"> <h5>No hay temas de discusión creados</h5> </div>
    <div v-if="!temasFiltrados.length && !pidiendoTemas && listaTemas.length" class="alert alert-warning"> <h5>No hay coincidencias</h5> </div>
    <div class="footer-copyright text-center py-3">© 2020 Copyright: Diego Chiaradia
      , Paulina Sigal, Federico Camelino, Nicolas Meller, Marcelo Rocchi
    </div>
  </div>
</template>

<script>
  import filters from '../filters'
  import mixinsGlobal from '../mixinsGlobal.js'

  export default  {
    name: 'src-components-home',
    components: {
    },
    props: [],
    mixins: [filters, mixinsGlobal],
    mounted () {
      this.getTemasFormAxios()
    },
    data () {
      return {
        criterioDeBusqueda: ''
      }
    },
    methods: {
      /* Pedido de datos almacenados en MockAPI */
      async getTemasFormAxios() {
        this.$store.dispatch('getTemasAxios')
      },

      /* Botón Crear tema */
      crearTema() {
        this.$router.push({ path: '/creartema' })
        //console.log("Entro al crear tema")
      },

      /* Routear tema según ID */
      verTema(id) {
        this.$router.push({
          name: 'VerTema',
          params: {
            temaID: id
          }
        })
        console.log(id)
      }
    },
    computed: {
      /* Filtrado de temas según los datos ingresados en la barra de búsqueda */
      temasFiltrados() {
        return this.$store.state.temas.filter((tema) => {
          this.$store.state.pidiendoTema = false
          return tema.titulo.toLowerCase().includes(this.criterioDeBusqueda.toLowerCase())
        });
      }
    }
  }
</script>

<style scoped lang="css">
  #encabezado {
    display: inline;
  }
  .h2 {
    text-align: left;
  }
  #crearTema {
    float: right;
  }
</style>
