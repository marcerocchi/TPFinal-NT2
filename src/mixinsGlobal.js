export default {
    computed: {
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
        listaComentarios() {
            return this.$store.state.comentarios
        }

    }
}