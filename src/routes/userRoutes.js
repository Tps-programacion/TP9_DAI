import express from 'express';
import { obtenerPerfil, editarPerfil } from '../controllers/userController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ambas rutas son protegidas por el middleware de autenticación de JWT
router.get('/perfil', verificarToken, obtenerPerfil);
router.put('/perfil', verificarToken, editarPerfil);

export default router;