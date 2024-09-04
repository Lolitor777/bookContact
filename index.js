import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import db from './database/db.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';


const app = express();


app.use( cors() );
app.use( express.json() );


app.use('/api/contact', contactRoutes );
app.use('/api/auth', authRoutes );


try {

    db.authenticate()
    console.log('Conexión exitosa con la base de datos');

} catch (error) {
    
    console.log( error );
    console.log('Error al conectar con la base de datos');
    
}


app.listen( PORT, () => {
    console.log(`server online en el puerto ${PORT}`);    
})