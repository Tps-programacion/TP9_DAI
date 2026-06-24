export const validarRegistro = (req, res, next) => {
    const { nombre_usuario, nombre_completo, email, password } = req.body;
    if (!nombre_usuario || !nombre_completo || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes.' });
    }
    next();
};

export const validarPublicacion = (req, res, next) => {
    const { url_imagen } = req.body;
    if (!url_imagen) {
        return res.status(400).json({ error: 'La URL de la imagen es obligatoria.' });
    }
    next();
};