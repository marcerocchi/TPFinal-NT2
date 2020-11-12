import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            user: "admin"
        }
    },
    actions: {
        /* userActual({commit}, usuario) {
            commit('definirUser', usuario)
        },
        contarDown({commit}, cant) {
            commit('decrementar',cant)
        } */
    },
    mutations: {
        /* definirUser(state, usuario) {
            state.user = usuario
        },
        decrementar(state,cant) {
            state.contador -= cant
        } */
    }
})