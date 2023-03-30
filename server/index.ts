import { Server } from "./clases/server";
import mongoose from "mongoose";
import cors from 'cors';

import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import usuarioRutas from "./rutas/usuario.rutas";
import articuloRutas from "./rutas/articulo.rutas";
import administradorRutas from "./rutas/administrador.rutas";

import moment from 'moment-timezone';

const servidor = new Server();

// Configuración de la zona horaria
moment.tz.setDefault('Europe/Madrid');

// Body parser
servidor.app.use(bodyParser.urlencoded({limit:'5mb', extended: true}));
servidor.app.use(bodyParser.json({limit:'5mb'}));

// FileUpload
servidor.app.use( fileUpload({ useTempFiles: true }) );

servidor.app.use(cors({
    origin: true,
    credentials: true
}));

//Rutas de la app
servidor.app.use('/usuario', usuarioRutas);
servidor.app.use('/administrador', administradorRutas);
servidor.app.use('/articulo', articuloRutas);

//Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/rerolldb', (err) => {
    if (err) {
        throw err;
    } else {
        console.log("Base de Datos ONLINE");
    }
})

// Levanta express
servidor.start(() => {
    console.log('Servidor iniciado en el puerto ' + servidor.port);
});