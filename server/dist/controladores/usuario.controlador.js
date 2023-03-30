"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("../modelos/usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../clases/token"));
const favorito_1 = require("../modelos/favorito");
// import { Direccion } from "../interfaces/direccion";
class usuarioControlador {
    get(req, res) {
        const usuario = req.usuario;
        res.json({
            ok: true,
            usuario
        });
    }
    ;
    create(req, res) {
        const user = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            password: bcrypt_1.default.hashSync(req.body.password, 10),
            nacimiento: req.body.nacimiento,
            sexo: req.body.sexo,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            localidad: req.body.localidad,
            pais: req.body.pais,
            cp: req.body.cp,
            favoritos: req.body.favoritos,
            avatar: req.body.avatar
        };
        usuario_1.Usuario.create(user).then(userDB => {
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                apellidos: userDB.apellidos,
                email: userDB.email,
                nacimiento: userDB.nacimiento,
                sexo: userDB.sexo,
                direccion: userDB.direccion,
                ciudad: userDB.ciudad,
                localidad: userDB.localidad,
                pais: userDB.pais,
                cp: userDB.cp,
                favoritos: userDB.favoritos,
                avatar: userDB.avatar
            });
            if (user) {
                return res.status(200).json({
                    status: 'Ok',
                    message: `El usuario ${userDB.email} ha sido creado correctamente.`,
                    token: tokenUser
                });
            }
            else {
                return res.status(500).json({
                    status: 'Fail',
                    message: 'No hay usuario'
                });
            }
        });
    }
    ;
    // create(req: Request, res: Response) {
    //     const direccion = {
    //         calle: req.body.direccion.calle,
    //         numero: req.body.direccion.numero,
    //         adicional: req.body.direccion.adicional,
    //         cp: req.body.direccion.cp,
    //         provincia: req.body.direccion.provincia,
    //         localidad: req.body.direccion.localidad
    //     };
    //     const user = {
    //         nombre   : req.body.nombre,
    //         apellidos   : req.body.apellidos,
    //         email    : req.body.email,
    //         password : bcrypt.hashSync(req.body.password, 10),
    //         direccion   : direccion,
    //         nacimiento   : req.body.nacimiento,
    //         sexo   : req.body.sexo,
    //         avatar   : req.body.avatar
    //     };
    //     Usuario.create( user ).then(userDB => {
    //         // const direccionStr = `${userDB.direccion.calle} ${userDB.direccion.numero}, ${userDB.direccion.adicional ? userDB.direccion.adicional + ', ' : ''}${userDB.direccion.cp}, ${userDB.direccion.provincia}, ${userDB.direccion.localidad}`;
    //         const tokenUser = Token.getJwtToken({
    //             _id: userDB._id,
    //             nombre: userDB.nombre,
    //             apellidos: userDB.apellidos,
    //             email: userDB.email,
    //             direccion: // direccionStr,
    //                 userDB.direccion.calle + ' ' + 
    //                 userDB.direccion.numero + ', ' + 
    //                 userDB.direccion.adicional + ', ' + 
    //                 userDB.direccion.cp + ', ' + 
    //                 userDB.direccion.provincia + ', ' + 
    //                 userDB.direccion.localidad,    
    //             nacimiento: userDB.nacimiento,
    //             sexo: userDB.sexo,
    //             avatar: userDB.avatar
    //         });
    //         if(user) {
    //             return res.status(200).json({
    //                 status: 'Ok',
    //                 message: `El usuario ${userDB.email} ha sido creado correctamente.`,
    //                 token: tokenUser
    //             });
    //         } else {
    //             return res.status(500).json({
    //                 status: 'Fail',
    //                 message: 'No hay usuario'
    //             });
    //         }
    //     })
    // };
    update(req, res) {
        const user = {
            nombre: req.body.nombre || req.usuario.nombre,
            apellidos: req.body.apellidos || req.usuario.apellidos,
            email: req.body.email || req.usuario.email,
            password: req.body.password || req.usuario.password,
            nacimiento: req.body.nacimiento || req.usuario.nacimiento,
            sexo: req.body.sexo || req.usuario.sexo,
            direccion: req.body.direccion || req.usuario.direccion,
            ciudad: req.body.ciudad || req.usuario.ciudad,
            localidad: req.body.localidad || req.usuario.localidad,
            pais: req.body.pais || req.usuario.pais,
            cp: req.body.cp || req.usuario.cp,
            avatar: req.body.avatar || req.usuario.avatar
        };
        usuario_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userDB) => {
            if (err)
                throw err;
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe un usuario con ese ID'
                });
            }
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                apellidos: userDB.apellidos,
                email: userDB.email,
                nacimiento: userDB.nacimiento,
                sexo: userDB.sexo,
                direccion: userDB.direccion,
                ciudad: userDB.ciudad,
                localidad: userDB.localidad,
                pais: userDB.pais,
                cp: userDB.cp,
                favoritos: userDB.favoritos,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        });
    }
    login(req, res) {
        const body = req.body;
        usuario_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
            if (err)
                throw err;
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'El usuario no existe'
                });
            }
            if (userDB.compararPassword(body.password)) {
                const tokenUser = token_1.default.getJwtToken({
                    _id: userDB._id,
                    nombre: userDB.nombre,
                    apellidos: userDB.apellidos,
                    email: userDB.email,
                    nacimiento: userDB.nacimiento,
                    sexo: userDB.sexo,
                    direccion: userDB.direccion,
                    ciudad: userDB.ciudad,
                    localidad: userDB.localidad,
                    pais: userDB.pais,
                    cp: userDB.cp,
                    favoritos: userDB.favoritos,
                    avatar: userDB.avatar
                });
                res.json({
                    ok: true,
                    token: tokenUser
                });
            }
            else {
                return res.json({
                    ok: false,
                    mensaje: 'La contraseña es incorrecta'
                });
            }
        });
    }
    ;
    favoritos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const usuario = yield usuario_1.Usuario.findById(userId);
                if (!usuario) {
                    return res.status(404).send({ mensaje: 'Usuario no encontrado' });
                }
                const favoritos = yield favorito_1.Favorito.find({ usuario: userId }).populate('articulo').exec();
                res.json(favoritos);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ mensaje: 'Error al obtener los favoritos' });
            }
        });
    }
}
exports.default = usuarioControlador;
