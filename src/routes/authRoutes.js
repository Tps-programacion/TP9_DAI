import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validarRegistro } from '../middlewares/validator.js';

const router = express.Router();

router.post('/register', validarRegistro, register);
router.post('/login', login);

export default router;