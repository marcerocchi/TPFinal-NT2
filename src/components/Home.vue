<template>
  <div class="jumbotron">
    <h1 id="titulo"><u><b>RepORT</b></u></h1>

    <!-- ------------------ -->
    <!-- Temas de discusión -->
    <!-- ------------------ -->
    <div id="encabezado">
      <h2>Temas de discusión</h2>
      <button id="crearTema" class="btn btn-primary" @click="crearTema()">Crear tema <b>+</b></button>
    </div>
    <hr />
    <div v-if="temas.length">
      <table class="table table-dark"> 
        <tr :style="{color:'cornflowerblue'}">
          <th scope="col">Titulo</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Categoria</th>
          <th scope="col">Fecha de creación</th>
        </tr>
        <tr v-for="(tema, index) in temas" :key="index">
          <td scope="col"> <a><b>{{ tema.titulo }}</b></a> </td>
          <td scope="col"> <p>{{ tema.descripcion }}</p> </td>
          <td scope="col"> <p>{{ pasarAMayuscula(tema.categoria) }}</p> </td>
          <td scope="col"> <p>{{ formatearFechaHora(tema.createdAt) }}</p> </td>                   
          <td scope="col"> <button id="verTema" class="btn btn-success" @click="verTema(tema.id)">Ir al tema</button> </td>
        </tr>
      </table>
    </div>
    <div v-else class="alert alert-warning"> <h5>No hay temas de discusión creados</h5> </div>
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
        url: 'https://5f92eb01eca67c001640a201.mockapi.io/temas'
      }
    },
    methods: {
      crearTema() {
        //this.$router.push('/creartema')
        this.$router.push({ path: '/creartema' })
        console.log("Entro al crear tema")
      },
      verTema(id) {
        //this.$router.push('/vertema')
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
        } catch(error) {
          console.log('HTTP GET ERROR', error)
        }
      },
    },
    computed: {

    }
  }
</script>

<style scoped lang="css">
  #titulo {
   text-align: center;
  }
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
