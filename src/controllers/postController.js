import postService from '../services/postService.js';

export const obtenerFeedGlobal = async (req, res) => {
    try {
        const publicaciones = await postService.obtenerTodos();
        return res.status(200).json(publicaciones);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const crearNuevaPublicacion = async (req, res) => {
    try {
        const usuarioId = req.user.id; // ID extraído dinámicamente del token
        const { url_imagen, descripcion } = req.body;

        const nuevoPost = await postService.crearPost({
            usuario_id: usuarioId,
            url_imagen,
            descripcion,
            likes: 0
        });

        return res.status(201).json({ mensaje: 'Publicación creada con éxito', post: nuevoPost });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};