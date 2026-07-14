import userService from '../services/userService.js';
import postService from '../services/postService.js';

export const obtenerPerfil = async (req, res) => {
    try {
        const usuarioId = req.user.id; 

        const perfil = await userService.obtenerPerfilCompleto(usuarioId);
        const publicaciones = await postService.obtenerPorUsuarioId(usuarioId);

        return res.status(200).json({ ...perfil, publicaciones });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const editarPerfil = async (req, res) => {
    try {
        const usuarioId = req.user.id;
        const { nombre_completo, biografia, foto_perfil } = req.body;

        const perfilActualizado = await userService.actualizarPerfil(usuarioId, {
            nombre_completo,
            biografia,
            foto_perfil
        });

        return res.status(200).json({ mensaje: 'Perfil actualizado', perfil: perfilActualizado });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};