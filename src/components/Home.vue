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
    <div v-if="temas.length">
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
    <div v-if ="!temas.length && !pidiendo" class="alert alert-warning"> <h5>No hay temas de discusión creados</h5> </div>
    <div v-if="!temasFiltrados.length && !pidiendo && temas.length" class="alert alert-warning"> <h5>No hay coincidencias</h5> </div>
    <div class="footer-copyright text-center py-3">© 2020 Copyright: Diego Chiaradia
      , Paulina Sigal, Federico Camelino, Nicolas Meller, Marcelo Rocchi
    </div>
  </div>
</template>

<script>
  import filters from '../filters'

  export default  {
    name: 'src-components-home',
    components: {
    },
    props: [],
    mixins: [filters],
    mounted () {
      this.getTemasFormAxios()
    },
    data () {
      return {
        temas: [],
        pidiendo: true,
        criterioDeBusqueda: '',
        url: 'https://5f92eb01eca67c001640a201.mockapi.io/temas'
      }
    },
    methods: {
      crearTema() {
        this.$router.push({ path: '/creartema' })
        console.log("Entro al crear tema")
      },
      verTema(id) {
        this.$router.push({
          name: 'VerTema',
          params: {
            temaID: id
          }
        })
        console.log(id)
      },
      /* Pedido de datos almacenados en MockAPI */
      async getTemasFormAxios() {
        try {
          let res = await this.axios(this.url)
          this.temas = res.data
          console.log(res.data)
        } 
        catch(error) {
          console.log('HTTP GET ERROR', error)
        }
        finally {
          this.pidiendo = false
        }
      },
    },
    computed: {
      temasFiltrados() {
        return this.temas.filter((tema) => {
          this.pidiendo = false
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
