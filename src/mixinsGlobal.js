export default {
    computed: {
        /* USUARIO */
        mostrarUsuario() {
            return this.$store.state.user
        },
        mostrarNombre() {
            return this.$store.state.name
        },
        mostrarApellido() {
            return this.$store.state.lastName
        },
        mostrarAvatar() {
            return this.$store.state.avatar
        },
        listaUsuarios() {
            return this.$store.state.usuarios
        },
        
        /* TEMAS */
        listaTemas() {
            return this.$store.state.temas
        },
        temaActual() {
            return this.$store.state.tema
        },
        pidiendoTemas() {
            return this.$store.state.pidiendoTema
        },

        /* COMENTARIOS */
        listaComentarios() {
            return this.$store.state.comentarios
        },
        pidiendoComentarios() {
            return this.$store.state.pidiendoComentario
        },

    }
}