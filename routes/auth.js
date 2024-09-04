import { Router } from 'express';
import { createUser } from '../controllers/auth.js';

const router = Router();

router.post( '/crearUsuario', createUser );



export default router;