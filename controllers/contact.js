import { response } from "express";
import Contact from "../models/Contact.js";


/**
 * The function `consultContact` retrieves active contacts for a specific user and returns them in a
 * JSON response.
 * @param req - The `req` parameter in the `consultContact` function is the request object that
 * contains information about the HTTP request that triggered the function. This object typically
 * includes details such as the request headers, parameters, body, and other relevant information sent
 * by the client to the server. In this case, the
 * @param [res] - The `res` parameter in the `consultContact` function is the response object that will
 * be used to send the response back to the client. It is set to a default value of `response`, which
 * is likely a reference to an HTTP response object from a framework like Express.js. This parameter
 * allows
 */
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


/**
 * The function `consultContactInactive` retrieves inactive contacts for a specific user and sends a
 * response with the retrieved contacts.
 * @param req - The `req` parameter in the `consultContactInactive` function is an object representing
 * the HTTP request. It contains information about the request made by the client, such as request
 * headers, parameters, body, and more. In this function, `req.params` is used to extract the `user_id
 * @param [res] - The `res` parameter in the `consultContactInactive` function is the response object
 * that will be used to send the response back to the client. It is set to a default value of
 * `response`, which is likely a reference to an imported `response` object from an external library or
 * framework.
 */
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


/**
 * The function `createContact` is an asynchronous function that creates a new contact record with the
 * provided data and returns a success message if the operation is successful.
 * @param req - The `req` parameter in the `createContact` function is the request object that contains
 * information about the HTTP request made to the server. It includes data such as request headers,
 * parameters, body, and more. In this case, `req.body` is used to extract the data sent in the
 * @param [res] - The `res` parameter in the `createContact` function is the response object that will
 * be sent back to the client after creating a new contact. It is set to a default value of `response`,
 * which is likely a reference to an HTTP response object provided by a framework or library like
 * Express.js
 */
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


/**
 * The function `updateContact` updates contact information in a database and sends a response with
 * success or error messages.
 * @param req - The `req` parameter in the `updateContact` function is the request object that contains
 * information about the HTTP request made to the server. It includes data such as request headers,
 * parameters, body, and other details sent by the client to the server. In this case, the `req` object
 * @param [res] - The `res` parameter in the `updateContact` function is the response object that is
 * used to send a response back to the client. It is typically provided by the Express framework and
 * contains methods for sending HTTP responses. In this function, the `res` parameter is set to a
 * default value of
 */
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


/**
 * The function consultContactById retrieves a contact by its ID and sends a response with the contact
 * data or an error message.
 * @param req - The `req` parameter is an object representing the HTTP request that comes from the
 * client to the server. It contains information such as the request headers, parameters, body, and
 * other details sent by the client.
 * @param [res] - The `res` parameter in the `consultContactById` function is the response object that
 * is used to send a response back to the client. It is typically provided by the Express framework in
 * Node.js and contains methods for sending HTTP responses. In this function, the `res` parameter is
 * set to
 */
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


/**
 * The function `inactiveContact` updates the active status of a contact in a database and returns a
 * success message based on the status change.
 * @param req - The `req` parameter in the code snippet represents the request object in Express.js. It
 * contains information about the HTTP request such as the request body, parameters, headers, etc. In
 * this specific function, `req` is used to extract the `is_active` value from the request body and the
 * @param [res] - The `res` parameter in the code snippet refers to the response object that is used to
 * send a response back to the client in an Express.js application. It is typically provided by the
 * Express framework and contains methods for sending various types of responses such as JSON, HTML, or
 * plain text.
 * @returns The function `inactiveContact` is returning a JSON response with a status code of 200 in
 * either case. If the `is_active` value is 0, it returns a success message indicating that the contact
 * has been deleted successfully. If the `is_active` value is not 0, it returns a success message
 * indicating that the contact has been restored. In case of any errors during the process
 */
export const inactiveContact = async( req, res = response ) => {

    const { is_active } = req.body;
    const { contact_id } = req.params;

    try {

        await Contact.update( { is_active }, {
            where:{
                contact_id
            }
        } )

        if ( is_active == 0) {
    
            return res.status(200).json({
                ok: true,
                msg: 'El contacto se ha eliminado con éxito. Puedes restaurarlo cuando desees en la sección "Historial".'
            })  

        }
        else {

            return res.status(200).json({
                ok: true,
                msg: 'El contacto se ha restaurado.'
            })

        } 
        
    } catch (error) {
        
        console.log( error );
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar contacto." 
        })

    }
}


/**
 * This function deletes a contact from a database based on the provided contact_id.
 * @param req - The `req` parameter in the `deleteContact` function is the request object that contains
 * information about the HTTP request made to the server. It includes details such as the request
 * method, request headers, request parameters, and request body. In this case, `req.params` is used to
 * extract the
 * @param [res] - The `res` parameter in the `deleteContact` function is the response object that will
 * be used to send the response back to the client. It is set to a default value of `response`, which
 * is likely a reference to an imported `response` object from a framework like Express.js. This
 */
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