class AuthService {
    async buscarPorEmailONickname(email, nombre_usuario) {
        // Ignorado: no busca duplicados en base de datos
        return null;
    }

    async registrarUsuario(usuarioData) {
        // Ignorado: no inserta en la tabla usuarios
        return { id: 1, ...usuarioData };
    }

    async buscarPorEmail(email) {
        // Ignorado: retorna una estructura vacía simulando que no existe o forzando datos
        return null; 
    }
}
export default new AuthService();