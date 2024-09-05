import { response } from "express";
import Contact from "../models/Contact.js";


export const consultContact = async( req, res = response ) => {

    try {

        const { user_id } = req.params;

        const contacts = await Contact.findAll({
            where: {
                user_id,
                is_active: 1
            }
        })

        res.status(200).json({
            ok: true,
            contacts
        })
        
    } catch (error) {

        console.log( error );
        res.status(400).json({
            ok: false,
            msg: 'Error al consultar los contactos'
        })
        
    }
}


export const consultContactInactive = async( req, res = response ) => {

    try {

        const { user_id } = req.params;

        const contacts = await Contact.findAll({
            where: {
                user_id,
                is_active: 0
            }
        })

        res.status(200).json({
            ok: true,
            contacts
        })
        
    } catch (error) {

        console.log( error );
        res.status(400).json({
            ok: false,
            msg: 'Error al consultar el historial'
        })
        
    }
}


export const createContact = async( req, res = response ) => {

    const { name, last_name, email, phone_number, address, user_id } = req.body;

    try {

        await Contact.create({
            name,
            last_name,
            email,
            phone_number,
            address,
            user_id
        });

        res.status(200).json({
            ok: true,
            msg: 'Contacto añadido con éxito.'
        })
        
    } catch ( error ) {
        
        console.log( error );
        res.status(400).json({
            ok: false,
            msg: 'Error al crear el contacto.'
        })
        
    }
}


export const updateContact = async( req, res = response ) => {
    
    const { name, last_name, email, phone_number, address } = req.body;
    const { contact_id } = req.params

    try {

        await Contact.update({
            name, last_name, email, phone_number, address
        }, {
            where: {
                contact_id
            }
        })
        
        res.status(200).json({
            ok: true,
            msg: 'Se ha actualizado la información del contacto con éxito.'
        })


    } catch (error) {
        
        console.log( error );
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar el contacto." 
        })
        
    }
}


export const consultContactById = async( req, res = response ) => {

    const { contact_id } = req.params;

    try {

        const contact = await Contact.findOne({
            where: {
                contact_id
            }
        });

        res.status(200).json({
            ok: true,
            contact
        })
        
    } catch (error) {
        
        console.log( error );
        res.status(400).json({
            ok: false,
            msg: 'Error al consultar contacto por ID'
        })

    }
}


export const inactiveContact = async( req, res = response ) => {

    const { is_active } = req.body;
    const { contact_id } = req.params;

    try {

        await Contact.update( { is_active }, {
            where:{
                contact_id
            }
        } )

        res.status(200).json({
            ok: true,
            msg: 'El contacto se ha eliminado con éxito. Puedes restaurarlo cuando desees en la sección "Historial".'
        })
        
    } catch (error) {
        
        console.log( error );
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar contacto." 
        })

    }
}


export const deleteContact = async( req, res = response ) => {

    const { contact_id } = req.params;

    try {
        
        await Contact.destroy({
            where:{
                contact_id
            }
        })

        res.status(200).json({
            ok: true,
            msg: 'El contacto se ha eliminado permanentemente.'
        })

    } catch (error) {
        
        console.log( error );
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar el contacto." 
        })

    }
}