import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authService from '../services/authService.js';

export const register = async (req, res) => {
    try {
        const { nombre_usuario, nombre_completo, email, password, foto_perfil, biografia } = req.body;
        const usuarioExistente = await authService.buscarPorEmailONickname(email, nombre_usuario);
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El email o nombre de usuario ya está en uso.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

            const nuevoUsuario = await authService.registrarUsuario({
            nombre_usuario,
            nombre_completo,
            email,
            password: hashedPassword,
            foto_perfil,
            biografia
        });

        return res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Buscar si el email existe en la base de datos
        const usuario = await authService.buscarPorEmail(email);
        if (!usuario) {
            // Devolvemos 401 Unauthorized si no existe
            return res.status(401).json({ error: 'Credenciales inválidas' }); 
        }

        // 2. Comparar la contraseña en texto plano con el hash guardado en la BD
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // 3. Crear el JWT con el ID y nombre REAL del usuario (¡Adiós id 999!)
        const token = jwt.sign(
            { id: usuario.id, nombre_usuario: usuario.nombre_usuario }, 
            process.env.JWT_SECRET || 'secret_fallback', 
            { expiresIn: '2h' }
        );

        return res.status(200).json({ mensaje: 'Login exitoso', token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};