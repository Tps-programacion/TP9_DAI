import express from 'express';
import { obtenerFeedGlobal, crearNuevaPublicacion } from '../controllers/postController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { validarPublicacion } from '../middlewares/validator.js';

const router = express.Router();

// Endpoint público para renderizar el feed principal
router.get('/', obtenerFeedGlobal);

// Endpoint protegido para que los usuarios activos creen posteos
router.post('/', verificarToken, validarPublicacion, crearNuevaPublicacion);

export default router;