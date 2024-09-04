import { response } from 'express';
import User from '../models/User.js';


export const createUser = async( req, res = response ) => {

    const { name, email, password } = req.body;

    try {

        const validateEmail = await User.findOne({
            where: {
                email
            }
        });

        if ( validateEmail ) {

            return res.status(409).json({
                ok: false,
                msg: `La dirección de correo electrónico ${ email } ya existe. Por favor inicia sesión o digita otro email.`
            })

        }
        else {

            await User.create({ name, email, password });

            return res.status(200).json({
                ok: true,
                msg: 'El usuario se ha creado correctamente.'
            })
        }
        
    } catch (error) {
        
        console.log( error );
        res.status(400).json({
            ok: false,
            msg: 'Error al crear usuario.'
        })
        
    }

}