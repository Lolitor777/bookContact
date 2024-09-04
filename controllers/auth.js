import { response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs'


export const createUser = async( req, res = response ) => {

    let { name, email, password } = req.body;

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

            const salt = bcrypt.genSaltSync();
            password = bcrypt.hashSync( password, salt );

            const user = await User.create({ name, email, password });

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


export const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({
            where:{
                email
            }
        });

        if ( !user ) {
            
            return res.status(401).json({
                ok: false,
                msg: `El correo electrónico ${ email } no se encuentra registrado.`
            });
        }

        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            
            return res.status(401).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        res.status(200).json({
            ok: true 
        })
        
    } catch (error) {
        
        console.log( error );
        res.status(400).json({
            ok: false,
            msg: 'Error desconocido al iniciar sesión'
        })
        
    }

}


export const logout = async( req, res = response ) => {

    try {

        res.status(200).json({
            ok: true,
            msg: 'Se ha cerrado sesión.' 
        })
        
    } catch (error) {  
        console.log( error );     
    }
}