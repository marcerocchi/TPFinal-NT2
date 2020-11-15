import { createWebHistory, createRouter } from 'vue-router'

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import CrearTema from '../components/CrearTema.vue'
import VerTema from '../components/VerTema.vue'
import Perfil from '../components/Perfil.vue'

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/home', name: 'Home', component: Home },
    { path: '/perfil', name: 'Perfil', component: Perfil },
    { path: '/creartema', name: 'CrearTema', component: CrearTema },
    { path: '/vertema/:temaID', name: 'VerTema', component: VerTema, props: true },
    { path: '/:catchAll(.*)', name: 'NotFound', component: Home } //Routers desconocidos
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
