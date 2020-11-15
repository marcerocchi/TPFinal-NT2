import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            userLogueado: false,
            user: '',
            avatar: ''
        }
    },
    actions: {
        userActual({commit}, usuario) {
            commit('definirUser', usuario)
        },
        avatarActual({commit}, imagen) {
            commit('definirAvatar', imagen)
        },
        usuarioLogueado({commit}, login) {
            commit('accesoUsuario', login)
        }
        /* contarDown({commit}, cant) {
            commit('decrementar',cant)
        } */
    },
    mutations: {
        definirUser(state, usuario) {
            state.user = usuario
        },
        definirAvatar(state, imagen) {
            state.avatar = imagen
        },
        accesoUsuario(state, login) {
            state.userLogueado = login
            console.log(login)
            console.log(state.userLogueado)
        }
        /* decrementar(state,cant) {
            state.contador -= cant
        } */
    }
})