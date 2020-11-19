<template>
  <div class="jumbotron">
    <h3><b>{{ tema.titulo }}</b></h3>
    &nbsp;
    <p><u>Fecha de creación:</u> {{ formatearFechaHora(tema.createdAt) }}</p>
    <p><u>Creador:</u> <b>{{ tema.usuario }}</b></p>
    <div align="center">
      <h3>"{{ tema.descripcion }}"</h3>
    </div>
    &nbsp;
    &nbsp;
    <!-- Ver lista de Comentarios -->
    <VerComentario :temaID="temaID" />
    
    <div align="center">
      <button 
      id="crearComentario" 
      class="btn btn-secondary"
      @click="verNewComentario = !verNewComentario"
      >
      Comentar
      </button>
    </div>
    
    <div v-if="verNewComentario">
      <form novalidate autocomplete="off" @submit.prevent="enviar()">
        <!-- ------------------- -->
        <!--  CAMPO DESCRIPCIÓN  -->
        <!-- ------------------- -->
        <div class="form-group">
          <label for="Comentario"></label>
          <textarea 
            name="descripcion"
            id="descripcion"
            class="form-control"
            rows="6"
            v-model="v.f.descripcion.$model"
          ></textarea>
          <!-- CARTELES DE VALIDACIÓN -->
          <div v-if="v.f.descripcion.$error && v.f.descripcion.$dirty" class="alert alert-danger mt-1">
            <div v-if="v.f.descripcion.required.$invalid">Este campo es requerido</div>
            <div v-if="v.f.descripcion.minLength.$invalid">Este campo debe tener al menos {{v.f.descripcion.minLength.$params.min}} caracteres</div>
            <div v-if="v.f.descripcion.maxLength.$invalid">Este campo debe tener como máximo {{v.f.descripcion.maxLength.$params.max}} caracteres</div>
          </div>
        </div>
        <div id="botones" class="form-group">
          <div class="text" align="center">   
            <!-- --------------- -->
            <!-- BOTÓN PUBLICAR  -->
            <!-- --------------- -->
            <input
              id="enviar"
              type="submit"
              :disabled="v.$invalid"
              class="btn btn-dark"
              value="Enviar"
            >
            &nbsp;
            &nbsp;
            <!-- --------------- -->
            <!-- BOTÓN CANCELAR  -->
            <!-- --------------- -->
            <input
              id="cancelar"
              type="button"
              @click="cancelar()"
              class="btn btn-light"
              value="Cancelar"
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import filters from '../filters'
  import VerComentario from './VerComentario'
  import { required, minLength, maxLength} from '@vuelidate/validators'
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'

  export default  {
    name: 'src-components-ver-tema',
    props: ['temaID'],
    mixins: [filters],
    components : {
      VerComentario
    },
    mounted () {
      this.getTemaFormAxios()
    },
    setup () {
      const f = reactive({
        descripcion: '',
        usuario: '',
        idTema: ''
      })
      const rules = {
        f: {
          descripcion: { 
            required,
            minLength: minLength(5),
            maxLength: maxLength(300)
          }
        }
      }
      const v = useVuelidate(rules, { f })
      return { f,v }
    },
    data () {
      return {
        temas: [],
        tema: [],
        verNewComentario: false,
        urlTemas: 'https://5f92eb01eca67c001640a201.mockapi.io/temas/',
        urlComentarios: 'https://5f92eb01eca67c001640a201.mockapi.io/comentarios'
      }
    },
    methods: {
      /* Pedido de datos almacenados en MockAPI */
      async getTemaFormAxios() {
        try {
          let res = await this.axios(this.urlTemas)
          console.log(res.data)
          this.temas = res.data
          this.tema = this.temas[this.temaID-1]
          console.log(this.tema)
        } catch(error) {
          console.log('HTTP GET ERROR', error)
        }
      },
      /* Envio de datos del formulario al backend */
      async sendDatosFormAxios(datos) {
        try {
          let res = await this.axios.post(this.urlComentarios, datos, {'content-type': 'application/json'})
          this.$store.dispatch('agregarComentario', res.data)
          console.log(res.data)
        }
        catch(error) {
          console.log('HTTP POST ERROR', error)
        }
      },
      /* Envío del formulario */
      async enviar() {
        this.v.$touch()
        if(!this.v.$invalid) {
          this.setUsuario()
          this.setIdTema()
          let form = this.f
          //console.log(form)
          await this.sendDatosFormAxios(form)
          this.resetForm()
          this.v.$reset()
          this.verNewComentario = false
        }
      },
      /* Cancelar la creación de un nuevo tema */
      cancelar() {
        this.resetForm()
        this.v.$reset()
        this.verNewComentario = !this.verNewComentario
      },
      /* Reset de valores iniciales de los campos de datos del formulario */
      resetForm() {
        this.v.f.descripcion.$model = ''
      },
      /* Define el nombre de usuario tomándolo de la instancia global de Vuex */
      setUsuario() {
        this.f.usuario = this.$store.state.user
      },
      setIdTema() {
        this.f.idTema = this.temaID
      }
    }
  }

</script>

<style scoped lang="css">

  #borrar {
    float: right;
  }
</style>
