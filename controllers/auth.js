import { response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import generateJWT from '../helper/jwt.js';


/**
 * The function `createUser` is an asynchronous function that creates a new user in a database, checks
 * for existing email, hashes the password, generates a JWT token, and returns a response with user
 * details or error message.
 * @param req - The `req` parameter in the `createUser` function is typically the request object that
 * contains information sent by the client to the server. It includes data such as the user's name,
 * email, and password that are needed to create a new user in this case. The `req.body` property
 * @param [res] - The `res` parameter in the `createUser` function is the response object that is used
 * to send back the response to the client making the request. It is typically provided by the Express
 * framework and contains methods like `status()` and `json()` to send the HTTP status code and
 * response data back
 * @returns The `createUser` function returns a response with status code and JSON data. If the email
 * provided already exists in the database, it returns a 409 status with a message indicating the email
 * already exists. If the email is unique, it creates a new user, generates a JWT token, and returns a
 * 200 status with user information and the token. If there is an error during the process,
 */
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



/**
 * The function `login` handles user authentication by checking the provided email and password,
 * querying the database for the user, comparing passwords, generating a JWT token, and returning the
 * token if authentication is successful.
 * @param req - The `req` parameter in the `login` function is typically an object representing the
 * HTTP request that the server receives from the client. It contains information such as the request
 * headers, body, parameters, and other details sent by the client to the server. In this case,
 * `req.body` is
 * @param [res] - The `res` parameter in the `login` function is the response object that is used to
 * send back the response to the client making the request. It is typically provided by the Express
 * framework and contains methods like `status()` and `json()` to send the HTTP status code and
 * response data back to
 * @returns The login function returns a JSON response with a status code and message based on the
 * conditions checked during the login process. If the email or password is missing, it returns a 400
 * status with a message indicating the missing fields. If the user is not found based on the provided
 * email, it returns a 401 status with a message stating that the email is not registered. If the
 * password provided does not
 */
export const login = async( req, res = response ) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
          ok: false,
          msg: 'Debes proporcionar un correo electrónico y una contraseña',
        });
      }

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


/**
 * The `logout` function is an asynchronous function that logs out a user and returns a JSON response
 * indicating successful logout.
 * @param req - The `req` parameter typically represents the request object in an Express route
 * handler. It contains information about the incoming HTTP request such as headers, parameters, body,
 * etc. In this context, it is used as a parameter for the `logout` function to handle the incoming
 * request for logging out a user
 * @param [res] - The `res` parameter in the `logout` function is the response object that is used to
 * send a response back to the client. It is typically provided by the Express framework in Node.js and
 * contains methods for sending HTTP responses. In this case, the `res` object is being used to send
 */
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


/**
 * The function `renewToken` checks if a user exists and returns a response with the user data and a
 * message indicating token validation.
 * @param req - The `req` parameter typically represents the request object in an Express.js route
 * handler. It contains information about the incoming HTTP request such as headers, parameters, body,
 * etc. In this context, it seems to be used to extract the `user_id` and `name` from the request
 * object.
 * @param [res] - The `res` parameter in the `renewToken` function is the response object that is used
 * to send back the response to the client. It is typically provided by the Express framework in
 * Node.js and contains methods for sending responses such as `res.status()` and `res.json()`.
 * @returns The `renewToken` function is returning a JSON response with the user object and a message
 * 'Token validado' if the user is found in the database. If the user is not found, it returns a JSON
 * response with an error message 'El usuario no existe'.
 */
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