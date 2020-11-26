<template>
  <div class="jumbotron">
    <h3><b>{{ temaActual.titulo }}</b></h3>
    &nbsp;
    <p><u>Fecha de creación:</u> {{ formatearFechaHora(temaActual.createdAt) }}</p>
    <p><u>Creador:</u> <b>{{ temaActual.usuario }}</b></p>
    <div align="center">
      <h3>"{{ temaActual.descripcion }}"</h3>
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
  import mixinsGlobal from '../mixinsGlobal.js'
  import VerComentario from './VerComentario'
  import { required, minLength, maxLength} from '@vuelidate/validators'
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'

  export default  {
    name: 'src-components-ver-tema',
    props: ['temaID'],
    mixins: [filters, mixinsGlobal],
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
        verNewComentario: false  
      }
    },
    methods: {
      /* Pedido de datos almacenados en MockAPI */
      async getTemaFormAxios() {
        this.$store.dispatch('getTemaAxios', this.temaID)
      },
      /* Envio de datos del formulario al backend */
      async sendDatosFormAxios(datos) {
        this.$store.dispatch('postComentarioAxios', datos)
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
