import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VuelidatePlugin } from '@vuelidate/core'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './bootstrap'
import store from './store'

createApp(App)
.use(router)
.use(VuelidatePlugin)
.use(VueAxios,axios)
.use(store)
.mount('#app')

