<template>
  <div>
    <div align="center">
      <img src="../assets/LogoRepORT.png" width="1100" height="130">
    </div>
    <div class="jumbotron">
      <h2>
      <b>Registrarse</b>
      </h2>
      <hr />
      <br>
      <form novalidate autocomplete="off" @submit.prevent="enviar()">
        <!-- ------------ -->
        <!-- CAMPO NOMBRE -->
        <!-- ------------ -->
        <div class="form-group">
          <label for="nombre"><h4>Nombre</h4></label>
          <input 
            type="text"
            id="nombre"
            class="form-control"
            v-model="v.f.nombre.$model"
          >
          <!-- CARTELES DE VALIDACIÓN -->
          <div v-if="v.f.nombre.$error && v.f.nombre.$dirty" class="alert alert-danger mt-1">
            <div v-if="v.f.nombre.required.$invalid">Este campo es requerido</div>
            <div v-if="v.f.nombre.minLength.$invalid">Este campo debe tener como máximo {{v.f.nombre.minLength.$params.min}} caracteres</div>
            <div v-if="v.f.nombre.maxLength.$invalid">Este campo debe tener como máximo {{v.f.nombre.maxLength.$params.max}} caracteres</div>
            <div v-if="v.f.nombre.conNumeros.$invalid">No se permiten números en este campo</div>
          </div>
        </div>

        <!-- ------------ -->
        <!-- CAMPO APELLIDO -->
        <!-- ------------ -->
        <div class="form-group">
          <label for="apellido"><h4>Apellido</h4></label>
          <input 
            type="text"
            id="apellido"
            class="form-control"
            v-model="v.f.apellido.$model"
          >
          <!-- CARTELES DE VALIDACIÓN -->
          <div v-if="v.f.apellido.$error && v.f.apellido.$dirty" class="alert alert-danger mt-1">
            <div v-if="v.f.apellido.required.$invalid">Este campo es requerido</div>
            <div v-if="v.f.apellido.minLength.$invalid">Este campo debe tener como máximo {{v.f.apellido.minLength.$params.min}} caracteres</div>
            <div v-if="v.f.apellido.maxLength.$invalid">Este campo debe tener como máximo {{v.f.apellido.maxLength.$params.max}} caracteres</div>
            <div v-if="v.f.apellido.conNumeros.$invalid">No se permiten números en este campo</div>
          </div>
        </div>

        <!-- ------------- -->
        <!-- CAMPO USUARIO -->
        <!-- ------------- -->
        <div class="form-group">
          <label for="usuario"><h4>Usuario</h4></label>
          <input 
            type="text"
            id="usuario"
            class="form-control"
            v-model="v.f.usuario.$model"
          >
          <!-- CARTELES DE VALIDACIÓN -->
          <div v-if="v.f.usuario.$error && v.f.usuario.$dirty" class="alert alert-danger mt-1">
            <div v-if="v.f.usuario.required.$invalid">Este campo es requerido</div>
            <div v-if="v.f.usuario.minLength.$invalid">Este campo debe tener como máximo {{v.f.usuario.minLength.$params.min}} caracteres</div>
            <div v-if="v.f.usuario.maxLength.$invalid">Este campo debe tener como máximo {{v.f.usuario.maxLength.$params.max}} caracteres</div>
            <div v-if="v.f.usuario.conEspacios.$invalid">No se permiten espacios en este campo</div>
          </div>
        </div>

        <!-- -------------- -->
        <!-- CAMPO PASSWORD -->
        <!-- -------------- -->
        <div class="form-group">
          <label for="password"><h4>Contraseña</h4></label>
          <input 
            type="password"
            id="password"
            class="form-control"
            v-model="v.f.password.$model"
          >
          <!-- CARTELES DE VALIDACIÓN -->
          <div v-if="v.f.password.$error && v.f.password.$dirty" class="alert alert-danger mt-1">
            <div v-if="v.f.password.required.$invalid">Este campo es requerido</div>
            <div v-if="v.f.password.minLength.$invalid">Este campo debe tener como mínimo {{v.f.password.minLength.$params.min}} caracteres</div>
            <div v-if="v.f.password.conEspacios.$invalid">No se permiten espacios en este campo</div>
          </div>
        </div>
        
        <div id="botones" class="form-group">
          <div class="text" align="center">   
            <!-- ---------------- -->
            <!-- BOTÓN REGISTRAR  -->
            <!-- ---------------- -->
            <input
              id="Registrar"
              type="submit"
              :disabled="v.$invalid"
              class="btn btn-dark"
              value="Registrar"
            >
            &nbsp;
            &nbsp;
            <!-- ------------ -->
            <!-- BOTÓN LOGIN  -->
            <!-- ------------ -->
            <input
              id="cancelar"
              type="button"
              @click="cancelar()"
              class="btn btn-light"
              value="Volver al Login"
            >
          </div>
        </div>
        <div class="form-group" align="center">
          <div v-if="usuarioValido==false" class="alert alert-danger mt-1" align="center" style="width:700px">El nombre de usuario ya existe</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, minLength, maxLength} from '@vuelidate/validators'
  import { useVuelidate } from '@vuelidate/core'
  import { reactive } from 'vue'
  import filters from '../filters'

  function validarEspacios(value) {
    return !value.includes(' ')
  }
  
  function validarNumeros(value) {
    return isNaN(value) 
  }

  export default  {
    name: 'src-components-registro',
    props: [],
    mixins: [filters],
    setup () {
      const f = reactive({
        nombre: '',
        apellido: '',
        usuario: '',
        password: ''
      })
      const rules = {
        f: {
          nombre: { 
            required,
            minLength: minLength(2),
            maxLength: maxLength(70),
            conNumeros: validarNumeros
          },
          apellido: { 
            required,
            minLength: minLength(2),
            maxLength: maxLength(70),
            conNumeros: validarNumeros
          },
          usuario: {
            required,
            minLength: minLength(5),
            maxLength: maxLength(25),
            conEspacios: validarEspacios
          },
          password: {
            required,
            minLength: minLength(8),
            conEspacios: validarEspacios
          }
        }
      }
      const v = useVuelidate(rules, { f })
      return { f,v }
    },
    mounted () {
      this.getUsuariosFormAxios()
    },    
    data () {
      return {
        usuarios: [],
        usuarioValido: undefined,
        url : 'https://5f92eb01eca67c001640a201.mockapi.io/usuarios'
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
      async getUsuariosFormAxios() {
        try {
          let res = await this.axios(this.url)
          this.usuarios = res.data
          this.$store.dispatch('guardarUsuarios', this.usuarios)
          console.log(this.usuarios)
        }
        catch(error) {
          console.log('HTTP GET ERROR', error)
        }
      },
      /* Envío del formulario */
      async enviar() {
        this.v.$touch()
        if(!this.v.$invalid) {
          let form = this.f
          //console.log(form)
          if (this.validarUsuario(this.f.usuario)) {
            await this.sendDatosFormAxios(form)
            this.$router.push('/')
            this.resetForm()
            this.v.$reset()
          }
          else {
            this.usuarioValido = false
            /* this.v.f.usuario.$model = '' -> Se podria vaciar este campo si user existe */
          }
        }
      },
      validarUsuario(value) {
      const usuarios = this.$store.state.usuarios
      console.log(usuarios)
      const usuario = usuarios.filter(user => (user.usuario == value))
      console.log(usuario)
      if (usuario.length==0) return true
      else return false
      },
      /* Cancelar la creación de un nuevo usuario */
      cancelar() {
        this.resetForm()
        this.v.$reset()
        this.$router.push('/')
      },
      /* Reset de valores iniciales de los campos de datos del formulario */
      resetForm() {
        this.v.f.nombre.$model = ''
        this.v.f.apellido.$model = ''
        this.v.f.usuario.$model = ''
        this.v.f.password.$model = ''
      }
    }
  }


</script>

<style scoped lang="css">
  .src-components-registro {

  }
</style>
