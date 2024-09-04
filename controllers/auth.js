import { response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import generateJWT from '../helper/jwt.js';


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

            const user = await User.create({ 
                name, 
                email, 
                password 
            });

            const token = await generateJWT( user.user_id, user. name );
            
            return res.status(200).json({
                id: user.user_id,
                ok: true,
                msg: 'El usuario se ha creado correctamente.',
                token
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

        const token = await generateJWT( user.dataValues.user_id, user.dataValues.name );

        res.status(200).json({
            ok: true,
            user,
            token 
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


export const renewToken = async( req, res = response ) => {

    const { user_id, name } = req;

    const user = await User.findByPk( user_id );

    if ( !user ) {

        return res.status(200).json({
            ok: false,
            msg: 'El usuario no existe'
        })

    }

    return res.json({
        user,
        msg: 'Token validado'
    })
}