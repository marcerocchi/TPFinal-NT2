export default {
    methods: {
        pasarAMayuscula(value) {
            return value.toUpperCase()
        },
        formatearFechaHora(fyh) {
            return new Date(fyh).toLocaleString()
        }
    }
}