import { Router } from 'express';
import { createUser, login } from '../controllers/auth.js';

const router = Router();

router.post( '/crearUsuario', createUser );
router.post( '/login', login ); 


export default router;