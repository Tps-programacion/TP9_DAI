import pool from '../config/db.js';

class AuthService {
    
    // Sirve para validar que no haya cuentas duplicadas antes de registrar
    async buscarPorEmailONickname(email, nombre_usuario) {
        const query = 'SELECT * FROM usuarios WHERE email = $1 OR nombre_usuario = $2';
        const { rows } = await pool.query(query, [email, nombre_usuario]);
        
        // Si encuentra uno, lo devuelve. Si no, devuelve null
        return rows[0] || null;
    }

    // Sirve para hacer el INSERT real en PostgreSQL
    async registrarUsuario(usuarioData) {
        const { nombre_usuario, nombre_completo, email, password, foto_perfil, biografia } = usuarioData;
        
        const query = `
            INSERT INTO usuarios (nombre_usuario, nombre_completo, email, password, foto_perfil, biografia)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, nombre_usuario, email, foto_perfil, biografia;
        `;
        
        const values = [nombre_usuario, nombre_completo, email, password, foto_perfil, biografia];
        const { rows } = await pool.query(query, values);
        
        // Devolvemos el usuario recién creado (sin la contraseña por seguridad)
        return rows[0];
    }

    
    async buscarPorEmail(email) {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const { rows } = await pool.query(query, [email]);
        
        return rows[0] || null;
    }
}

export default new AuthService();