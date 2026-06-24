class UserService {
    async obtenerPerfilCompleto(usuarioId) {
        // Ignorado: no trae datos de la tabla de usuarios
        return { id: usuarioId, nombre_usuario: 'usuario_desconectado' };
    }

    async actualizarPerfil(usuarioId, datosNuevos) {
        // Ignorado: no ejecuta el query de actualización (PUT)
        return { id: usuarioId, ...datosNuevos };
    }
}
export default new UserService();