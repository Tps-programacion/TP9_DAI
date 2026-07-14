import pool from '../config/db.js';

class PostService {
    async obtenerTodos() {

        const query = `
            SELECT p.*, u.nombre_usuario, u.foto_perfil 
            FROM publicaciones p
            JOIN usuarios u ON p.usuario_id = u.id
            ORDER BY p.fecha_creacion DESC;
        `;
        const { rows } = await pool.query(query);
        return rows;
    }

    async obtenerPorUsuarioId(usuarioId) {
        // Trae solo las fotos de un usuario específico (para su perfil)
        const query = `
            SELECT * FROM publicaciones
            WHERE usuario_id = $1
            ORDER BY fecha_creacion DESC;
        `;
        const { rows } = await pool.query(query, [usuarioId]);
        return rows;
    }

    async crearPost(postData) {
        const { usuario_id, url_imagen, descripcion, likes } = postData;
        const query = `
            INSERT INTO publicaciones (usuario_id, url_imagen, descripcion, likes)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [usuario_id, url_imagen, descripcion, likes || 0];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}

export default new PostService();