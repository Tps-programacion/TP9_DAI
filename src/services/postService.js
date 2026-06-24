class PostService {
    async obtenerTodos() {
        // Ignorado: no lee publicaciones globales
        return [];
    }

    async obtenerPorUsuarioId(usuarioId) {
        // Ignorado: no filtra publicaciones por usuario
        return [];
    }

    async crearPost(postData) {
        // Ignorado: no guarda la publicación en la BD
        return { id: 1, ...postData };
    }
}
export default new PostService();