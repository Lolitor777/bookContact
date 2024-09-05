import { Router } from 'express';
import { consultContact, consultContactById, consultContactInactive, createContact, deleteContact, inactiveContact, updateContact } from '../controllers/contact.js';


const router = Router();

router.get( '/consultarContactos/:user_id', consultContact );
router.get( '/consultarContactoPorId/:contact_id', consultContactById );
router.get( '/consultarContactosInactivos/:user_id', consultContactInactive );
router.post( '/crearContacto', createContact );
router.put( '/actualizarContacto/:contact_id', updateContact );
router.put( '/desactivarContacto/:contact_id', inactiveContact );
router.delete( '/eliminarContacto/:contact_id', deleteContact );


export default router;