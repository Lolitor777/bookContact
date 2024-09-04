import { Router } from 'express';
import { consultContact, consultContactInactive, createContact, deleteContact, inactiveContact, updateContact } from '../controllers/contact.js';


const router = Router();

router.get( '/consultarContactos', consultContact );
router.get( '/consultarContactosInactivos', consultContactInactive );
router.post( '/crearContacto', createContact );
router.put( '/actualizarContacto', updateContact );
router.put( '/desactivarContacto', inactiveContact );
router.delete( '/eliminarContacto/:contact_id', deleteContact );


export default router;