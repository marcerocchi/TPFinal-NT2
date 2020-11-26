import { createStore } from 'vuex'
import axios from 'axios'

const urlTemas = 'https://5f92eb01eca67c001640a201.mockapi.io/temas/'
const urlUsers = 'https://5f92eb01eca67c001640a201.mockapi.io/usuarios/'
const urlComentarios = 'https://5f92eb01eca67c001640a201.mockapi.io/comentarios/'

export default createStore({
    state() {
        return {
            userLogueado: false,
            user: '',
            name: '',
            lastName: '',
            avatar: '',
            usuarios: [],
            temas: [],
            tema: [],
            comentarios: [],
            pidiendoTema: true,
            pidiendoComentario: true
        }
    },
    actions: {
        /* ACCIONES SINCRÓNICAS */
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
        agregarUsuario({commit}, usuario) {
            commit('agregarUsuario', usuario)
        },
        guardarTemas({commit}, temas) {
            commit('guardarTemas', temas)
        },
        guardarTemaActual({commit}, tema) {
            commit ('guardarTema', tema)
        },
        agregarTema({commit}, tema) {
            commit('agregarTema', tema)
        },
        guardarComentarios({commit}, comentarios) {
            commit('guardarComentarios', comentarios)
        },
        agregarComentario({commit}, comentario) {
            commit('agregarComentario', comentario)
        },
        borrarComentario({commit}, id) {
            commit('borrarComentario', id)
        },

        /* ACCIONES ASINCRÓNICAS */
        async getTemasAxios({commit}) {
            try {
                let res = await axios(urlTemas)
                console.log(res.data)
                commit('guardarTemas', res.data)
            } 
            catch(error) {
                console.log('HTTP GET ERROR', error)
            }
            finally {
                this.state.pidiendoTema = false
            }
        },
        async getTemaAxios({commit}, temaID) {
            try {
                let res = await axios(urlTemas)
                console.log(res.data)
                commit('guardarTemaActual', res.data[temaID-1])
                console.log(res.data[temaID-1])
            } 
            catch(error) {
                console.log('HTTP GET ERROR', error)
            }
        },
        async getUsuariosAxios({commit}) {
            try {
                let res = await axios(urlUsers)
                console.log(res.data)
                commit('guardarUsuarios', res.data)
            }
            catch(error) {
                console.log('HTTP GET ERROR', error)
            }
        },
        async getComentariosAxios({commit}, temaID) {
            try {
                let res = await axios(urlComentarios)
                const comments = res.data.filter(valor => valor.idTema == temaID)
                console.log(comments)
                commit('guardarComentarios', comments)
            }
            catch(error) {
                console.log('HTTP GET ERROR', error)
            }
            finally {
                this.state.pidiendoComentario = false
            }

        },
        async postTemaAxios({commit}, tema) {
            try {
                let res = await axios.post(urlTemas, tema, {'content-type': 'application/json'})
                console.log(res.data)
                commit('agregarTema', res.data)
            }
            catch(error) {
                console.log('HTTP POST ERROR', error)
            }
        },
        async postUsuarioAxios({commit}, usuario) {
            try {
                let res = await axios.post(urlUsers, usuario, {'content-type': 'application/json'})
                console.log(res.data)
                commit('agregarUsuario', res.data)
            }
            catch(error) {
                console.log('HTTP POST ERROR', error)
            }
        },
        async postComentarioAxios({commit}, comentario) {
            try {
                let res = await axios.post(urlComentarios, comentario, {'content-type': 'application/json'})
                console.log(res.data)
                commit('agregarComentario', res.data)
            }
            catch(error) {
                console.log('HTTP POST ERROR', error)
            }
        },
        deleteComentarioAxios({commit}, id) {
            axios.delete(urlComentarios+id)
            .then(res => {
                let comentario = res.data
                console.log(comentario)
                commit('borrarComentario', id)
            })
            .catch(error => console.log('HTTP DELETE ERROR', error))
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
        agregarUsuario(state, usuario) {
            state.usuarios.push(usuario)
        },
        guardarTemas(state, temas) {
            state.temas = temas
        },
        guardarTemaActual(state, tema) {
            state.tema = tema
        },
        agregarTema(state, tema) {
            state.temas.push(tema)
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