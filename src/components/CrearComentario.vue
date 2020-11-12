<template>
  <div class="jumbotron">
    <form novalidate autocomplete="off" @submit.prevent="enviar()">
      <!-- ------------------- -->
      <!--  CAMPO DESCRIPCIÓN  -->
      <!-- ------------------- -->
      <div class="form-group">
        <label for="Comentario"><u>Descripción</u></label>
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
          <div v-if="v.f.descripcion.minLength.$invalid">Este campo debe tener al menos {{v.f.descripcion.minLength.$params.length}} caracteres</div>
          <div v-if="v.f.descripcion.maxLength.$invalid">Este campo debe tener como máximo {{v.f.descripcion.maxLength.$params.max}} caracteres</div>
        </div>
        
        <div id="botones" class="form-group">
          <!-- --------------- -->
          <!-- BOTÓN ENVIAR  -->
          <!-- --------------- -->
          <input
            id="enviar"
            type="submit"
            :disabled="v.$invalid"
            class="btn btn-success mt-4"
            value="Enviar"
          >
        
          <!-- --------------- -->
          <!-- BOTÓN CANCELAR  -->
          <!-- --------------- -->
          <input
            id="cancelar"
            type="button"
            @click="cancelar()"
            class="btn btn-danger mt-4"
            value="Cancelar"
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { required, minLength, maxLength} from '@vuelidate/validators'
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'

  export default  {
    name: 'src-components-crear-comentario',
    props: ['temaID', 'botonCrear'],
    mounted () {

    },
    setup () {
      const f = reactive({
        IdTema: this.temaID,
        descripcion: '',
        usuario: ''
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
        url : 'https://5f92eb01eca67c001640a201.mockapi.io/comentarios'
      }
    },
    methods: {
      /* Envio de datos del formulario al backend */
      async sendDatosFormAxios(datos) {
        try {
          let res = await this.axios.post(this.url, datos, {'content-type': 'application/json'})
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
          let form = this.f
          //console.log(form)
          await this.sendDatosFormAxios(form)
          this.resetForm()
          this.v.$reset()
        }
      },
      /* Cancelar la creación de un nuevo tema */
      cancelar() {
        this.resetForm()
        this.v.$reset()
        //this.botonCrear = !this.botonCrear
      },
      /* Reset de valores iniciales de los campos de datos del formulario */
      resetForm() {
        this.v.f.descripcion.$model = ''
      },
      /* Define el nombre de usuario tomándolo de la instancia global de Vuex */
      setUsuario() {
        this.f.usuario = this.$store.state.user
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-crear-comentario {

  }
</style>
