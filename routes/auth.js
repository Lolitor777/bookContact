import { Router } from 'express';
import { createUser, login, logout, renewToken } from '../controllers/auth.js';
import validateToken from '../middlewares/validateJWT.js';

const router = Router();

router.post( '/crearUsuario', createUser );
router.post( '/login', login );
router.post( '/logout', validateToken, logout ); 
router.post( 'renovarToken', validateToken, renewToken );


export default router;