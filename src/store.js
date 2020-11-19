import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            userLogueado: false,
            user: '',
            avatar: '',
            usuarios: [],
            comentarios: []
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
        },
        guardarUsuarios({commit}, usuarios) {
            commit('guardarUsuarios', usuarios)
        },
        guardarComentarios({commit}, comentarios) {
            commit('guardarComentarios', comentarios)
        },
        agregarComentario({commit}, comentario) {
            commit('agregarComentario', comentario)
        }
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
        },
        guardarUsuarios(state, usuarios) {
            state.usuarios = usuarios
        },
        guardarComentarios(state, comentarios) {
            state.comentarios = comentarios
        },
        agregarComentario(state, comentario) {
            state.comentarios.push(comentario)
        }

    }
})