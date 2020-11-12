<template>
  <div class="jumbotron">
    <h2>
      <b>Crear Tema de discusión</b>
    </h2>
    <hr />
    <br>
    <form novalidate autocomplete="off" @submit.prevent="enviar()">
      <!-- ------------ -->
      <!-- CAMPO TITULO -->
      <!-- ------------ -->
      <div class="form-group">
        <label for="titulo"><h4>Titulo</h4></label>
        <input 
          type="text"
          id="titulo"
          class="form-control"
          v-model="v.f.titulo.$model"
        >
        <!-- CARTELES DE VALIDACIÓN -->
        <div v-if="v.f.titulo.$error && v.f.titulo.$dirty" class="alert alert-danger mt-1">
          <div v-if="v.f.titulo.required.$invalid">Este campo es requerido</div>
          <div v-if="v.f.titulo.maxLength.$invalid">Este campo debe tener como máximo {{v.f.titulo.maxLength.$params.max}} caracteres</div>
        </div>
      </div>

      <!-- ------------------- -->
      <!--  CAMPO DESCRIPCIÓN  -->
      <!-- ------------------- -->
      <div class="form-group">
        <label for="descripcion"><h4>Descripción</h4></label>
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
        </div>
      </div>
      
      <!-- ---------------- -->
      <!-- CAMPO CATEGORIA  -->
      <!-- ---------------- -->
      <div class="form-group">
        <label><h4>Categoria</h4></label>
        <select class="form-control mb-1" v-model="v.f.categoria.$model">
          <option value="administrativa">Administrativa</option>
          <option value="experiencia">Experiencia</option>
          <option value="ingreso">Ingreso</option>
          <option value="materia">Materia</option>
        </select>
        <!-- CARTELES DE VALIDACIÓN -->
        <div v-if="v.f.categoria.$error && v.f.categoria.$dirty" class="alert alert-danger mt-1">
          <div v-if="v.f.categoria.required.$invalid">Este campo es requerido</div>
        </div>
      </div>
      
      <div id="botones" class="form-group">
        <!-- --------------- -->
        <!-- BOTÓN PUBLICAR  -->
        <!-- --------------- -->
        <input
          id="publicar"
          type="submit"
          :disabled="v.$invalid"
          class="btn btn-dark"
          value="Publicar"
        >
        
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
    </form>
  </div>
</template>

<script>
  import { required, maxLength} from '@vuelidate/validators'
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'

  export default  {
    name: 'src-components-crear-tema',
    props: [],
    setup () {
      const f = reactive({
        titulo: '',
        descripcion: '',
        categoria: '',
        usuario: ''
      })
      const rules = {
        f: {
          titulo: { 
            required,
            maxLength: maxLength(50)
          },
          descripcion: { 
            required
          },
          categoria: {
            required
          }
        }
      }
      const v = useVuelidate(rules, { f })
      return { f,v }
    },
    mounted () {
    },    
    data () {
      return {
        url : 'https://5f92eb01eca67c001640a201.mockapi.io/temas'
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
        this.$router.push('/')
      },
      /* Reset de valores iniciales de los campos de datos del formulario */
      resetForm() {
        this.v.f.titulo.$model = ''
        this.v.f.descripcion.$model = ''
        this.v.f.categoria.$model = ''
      },
      /* Define el nombre de usuario tomándolo de la instancia global de Vuex */
      setUsuario() {
        this.f.usuario = this.$store.state.user
      }
    }
  }
</script>

<style scoped lang="css">
  #botones {
    display: inline;
  }
  #cancelar {
    text-align: center;
  }
  #publicar {
    text-align: center;
  }
</style>
