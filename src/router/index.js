import { createWebHistory, createRouter } from 'vue-router'

import Home from '../components/Home.vue'
import CrearTema from '../components/CrearTema.vue'
import VerTema from '../components/VerTema.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/creartema', name: 'CrearTema', component: CrearTema },
    { path: '/vertema/:temaID', name: 'VerTema', component: VerTema, props: true },
    { path: '/:catchAll(.*)', name: 'NotFound', component: Home } //Routers desconocidos
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
