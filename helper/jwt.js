import jwt from 'jsonwebtoken';

const generateJWT = ( user_id, name ) => {

    return new Promise(( resolve, reject ) => {

        const payload = { user_id, name };
        jwt.sign( payload, `${process.env.PRIVATE_KEY}`, {
            expiresIn: '72h'
        }, ( err, token ) => {

            if ( err ) {
                console.log( err );
                reject('No se pudo generar el token');
            }

            resolve( token )
        });

    });
};

export default generateJWT;