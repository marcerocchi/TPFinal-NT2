<template>
  <div class="jumbotron">
    <section class="src-components-perfil" align = "center">
      <h2><i>{{mostrarNombre}} {{mostrarApellido}}</i></h2>
      <hr><br>
      <h3><u>Nombre de Usuario</u></h3><br>
      <h3><b>{{mostrarUsuario}}</b></h3><br>
      <h3><u>Foto de Perfil</u></h3><br>
      <img :src="mostrarAvatar" width="200" height="200"><br><br>
      <button 
        id="cambiarFoto" 
        class="btn btn-secondary"
        @click="cargarFoto = !cargarFoto"
      >
      Cambiar Foto
      </button>

      <div v-if="cargarFoto">
        <form novalidate autocomplete="off" @submit.prevent="enviar()">
          <!-- ----------- -->
          <!--  CAMPO URL  -->
          <!-- ----------- -->
          <div class="form-group" align="center">
            <label for="URL"></label>
            <input 
              type="text"
              id="URL"
              class="form-control"
              v-model="v.f.url.$model"
              style="width:800px"
              placeholder="Ingrese URL..."
            >
            <!-- CARTELES DE VALIDACIÓN -->
            <div v-if="v.f.url.$error && v.f.url.$dirty" class="alert alert-danger mt-1" align="center" style="width:800px">
              <div v-if="v.f.url.required.$invalid">Este campo es requerido</div>
            </div>
          </div>
          <div id="botones" class="form-group" align="center">
            <div class="text" align="center">   
              <!-- --------------- -->
              <!-- BOTÓN CAMBIAR  -->
              <!-- --------------- -->
              <input
                id="enviar"
                type="submit"
                :disabled="v.$invalid"
                class="btn btn-dark"
                value="Modificar"
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
    </section>
    <br><br><br><br>
    <div class="footer-copyright text-center py-3">© 2020 Copyright: Diego Chiaradia
      , Paulina Sigal, Federico Camelino, Nicolas Meller, Marcelo Rocchi
    </div>
  </div>

</template>

<script>
  import mixinsGlobal from '../mixinsGlobal.js'
  import { required } from '@vuelidate/validators'
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'


  export default  {
    name: 'src-components-perfil',
    props: [],
    mixins: [mixinsGlobal],
    mounted () {

    },
    data () {
      return {
        cargarFoto: false
      }
    },
    setup () {
      const f = reactive({
        url: ''
      })
      const rules = {
        f: {
          url: { 
            required
          }
        }
      }
      const v = useVuelidate(rules, { f })
      return { f,v }
    },
    methods: {
      /* Envío del formulario */
      enviar() {
        this.v.$touch()
        if(!this.v.$invalid) {
          this.$store.dispatch('putUsuarioAxios', this.f.url)
          this.resetForm()
          this.v.$reset()
          this.cargarFoto = false
        }
      },
      /* Cancelar la modificación del avatar */
      cancelar() {
        this.resetForm()
        this.v.$reset()
        this.cargarFoto = !this.cargarFoto
      },
      /* Reset de valores iniciales de los campos de datos del formulario */
      resetForm() {
        this.v.f.url.$model = ''
      },
    },
    computed: {

    }
  }
</script>

<style scoped lang="css">
  .src-components-perfil {

  }
</style>