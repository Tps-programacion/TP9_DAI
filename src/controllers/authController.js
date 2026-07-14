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
        
        
        const usuario = await authService.buscarPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' }); 
        }

        
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

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