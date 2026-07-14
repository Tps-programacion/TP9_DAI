import pool from '../config/db.js';

class UserService {
    async obtenerPerfilCompleto(usuarioId) {
        // Seleccionamos todo MENOS la contraseña
        const query = `
            SELECT id, nombre_usuario, nombre_completo, email, foto_perfil, biografia
            FROM usuarios
            WHERE id = $1;
        `;
        const { rows } = await pool.query(query, [usuarioId]);
        return rows[0];
    }

    async actualizarPerfil(usuarioId, datosNuevos) {
        const { nombre_completo, biografia, foto_perfil } = datosNuevos;
        
        // Usamos COALESCE: si un dato llega vacío o null desde el frontend, 
        // PostgreSQL mantiene el valor que ya tenía guardado en vez de borrarlo.
        const query = `
            UPDATE usuarios
            SET nombre_completo = COALESCE($1, nombre_completo),
                biografia = COALESCE($2, biografia),
                foto_perfil = COALESCE($3, foto_perfil)
            WHERE id = $4
            RETURNING id, nombre_usuario, nombre_completo, email, foto_perfil, biografia;
        `;
        const values = [nombre_completo, biografia, foto_perfil, usuarioId];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}

export default new UserService();