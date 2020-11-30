<template>
  <div>
    <div align="center">
      <img src="../assets/LogoRepORT.png" width="1100" height="130">
    </div>
    <br>
    <form novalidate autocomplete="off" @submit.prevent="validarCredenciales()">
      <!-- ------------- -->
      <!-- CAMPO USUARIO -->
      <!-- ------------- -->
      <div class="form-group" align="center">
        <label for="usuario"><h6><b>Usuario</b></h6></label>
        <input 
          type="text"
          id="usuario"
          class="form-control"
          v-model="v.f.usuario.$model"
          style="width:500px"
        >
        <!-- CARTELES DE VALIDACIÓN -->
        <div v-if="v.f.usuario.$error && v.f.usuario.$dirty" class="alert alert-danger mt-1" align="center" style="width:500px">
          <div v-if="v.f.usuario.required.$invalid">Este campo es requerido</div>
        </div>
      </div>
      &nbsp;

      <!-- ------------------ -->
      <!--  CAMPO CONTRASEÑA  -->
      <!-- ------------------ -->
      <div class="form-group" align="center">
        <label for="password"><h6><b>Contraseña</b></h6></label>
        <input 
          type="password"
          id="password"
          class="form-control"
          v-model="v.f.password.$model"
          style="width:500px"
        >
        <!-- CARTELES DE VALIDACIÓN -->
        <div v-if="v.f.password.$error && v.f.password.$dirty" class="alert alert-danger mt-1" align="center" style="width:500px">
          <div v-if="v.f.password.required.$invalid">Este campo es requerido</div>
        </div>
      </div>

      <div class="form-group" align="center">
        <div v-if="!v.f.usuario.$dirty || !v.f.password.$dirty">
          <div v-if="usuarioValido==false" class="alert alert-danger mt-1" align="center" style="width:500px">Usuario y/o Contraseña inválida</div>
          <div v-if="campoVacio==true" class="alert alert-danger mt-1" align="center" style="width:500px">Se debe completar ambos campos</div>
        </div>
      </div>

        
      <div class="text" align="center">   
        <!-- --------------- -->
        <!-- BOTÓN INGRESAR  -->
        <!-- --------------- -->
        <input
          id="ingresar"
          type="submit"
          :disabled="v.$invalid"
          class="btn btn-dark"
          value="Ingresar"
        >
      </div>
      &nbsp;
      &nbsp;
      &nbsp;
      <div align="center">
        <router-link to="/registro">¿No tienes cuenta? Crea una</router-link>
      </div>
    </form>
  </div>
</template>

<script>
  import { required} from '@vuelidate/validators'
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'

  export default  {
    name: 'src-components-login',
    props: [],
    setup () {
      const f = reactive({
        usuario: '',
        password: ''
      })
      const rules = {
        f: {
          usuario: { 
            required,
          },
          password: { 
            required
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
        userObtenido: [],
        usuarioValido: undefined,
        campoVacio: undefined
      }
    },
    methods: {
      /* Pedido de datos almacenados en MockAPI */
      async getUsuariosFormAxios() {
        this.$store.dispatch('getUsuariosAxios')
      },
      async validarCredenciales() {
        if (this.v.f.usuario.$model == '' || this.v.f.password.$model == '') this.campoVacio = true
        else {
          this.v.$touch()
          if(!this.v.$invalid) {
            console.log(this.$store.state.usuarios)
            this.userObtenido = this.$store.state.usuarios.filter(user => (user.usuario == this.f.usuario))
            console.log(this.userObtenido)
            if (this.userObtenido.length!=0) {
              if (this.userObtenido[0].password === this.f.password) {
                this.$router.push({ path: 'Home' })
                this.usuarioValido = true
                this.definirUsuario(this.userObtenido[0])
              }
              else {
                this.usuarioValido = false
              }
            }
            else {
              this.usuarioValido = false
            }
          }
          this.resetForm()
          this.v.$reset()
        }
      },
      /* Reset de valores iniciales de los campos de datos del formulario */
      resetForm() {
        this.v.f.usuario.$model = ''
        this.v.f.password.$model = ''
      },
      /* Define el nombre de usuario tomándolo de la instancia global de Vuex */
      definirUsuario(user) {
        this.$store.dispatch('idActual', user.id)
        this.$store.dispatch('userActual', user.usuario)
        this.$store.dispatch('nombreActual', user.nombre)
        this.$store.dispatch('apellidoActual', user.apellido)
        this.$store.dispatch('avatarActual', user.avatar)
        this.$store.dispatch('usuarioLogueado', true)
        //console.log(user.avatar)
      },
      registrarUsuario() {
        this.$router.push({ path: 'Registro'})
      }
    }
  }
</script>

<style scoped lang="css">
  .src-components-login {

  }
</style>
