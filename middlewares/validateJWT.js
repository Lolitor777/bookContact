import { response } from "express";
import jwt from 'jsonwebtoken';

const validateToken = ( req, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(200).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        
        const { id, name } = jwt.verify(
            token,
            `${process.env.PRIVATE_KEY}`
        )

    } catch (error) {

        console.log( error );
        return res.status(400).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next()
}

export default validateToken;