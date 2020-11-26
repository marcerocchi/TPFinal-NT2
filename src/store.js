import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            userLogueado: false,
            user: '',
            name: '',
            lastName: '',
            avatar: '',
            usuarios: [],
            comentarios: []
        }
    },
    actions: {
        userActual({commit}, usuario) {
            commit('definirUser', usuario)
        },
        nombreActual({commit}, nombre) {
            commit('definirNombre', nombre)
        },
        apellidoActual({commit}, apellido) {
            commit('definirApellido', apellido)
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
        },
        borrarComentario({commit}, id) {
            commit('borrarComentario', id)
        }
    },
    mutations: {
        definirUser(state, usuario) {
            state.user = usuario
        },
        definirNombre(state, nombre) {
            state.name = nombre
        },
        definirApellido(state, apellido) {
            state.lastName = apellido
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
        },
        borrarComentario(state, id) {
            let offset = state.comentarios.findIndex(comentario => comentario.id == id)
            state.comentarios.splice(offset,1)
        }

    }
})