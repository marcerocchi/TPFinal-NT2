import { createWebHistory, createRouter } from 'vue-router'

import Home from '../components/Home.vue'
import CrearTema from '../components/CrearTema.vue'
import VerTema from '../components/VerTema.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/creartema', name: 'CrearTema', component: CrearTema },
    { path: '/vertema', name: 'VerTema', component: VerTema }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
