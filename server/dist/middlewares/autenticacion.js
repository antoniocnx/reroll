"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaTokenAdmin = exports.verificaToken = void 0;
const token_1 = __importDefault(require("../clases/token"));
const token_admin_1 = __importDefault(require("../clases/token-admin"));
const verificaToken = (req, res, next) => {
    const userToken = req.get('x-token') || '';
    token_1.default.comprobarToken(userToken)
        .then((decoded) => {
        console.log('Decoded', decoded);
        req.usuario = decoded.usuario;
        next();
    })
        .catch(err => {
        res.json({
            ok: false,
            mensaje: 'Token incorrecto'
        });
    });
};
exports.verificaToken = verificaToken;
const verificaTokenAdmin = (req, res, next) => {
    const adminToken = req.get('y-token') || '';
    token_admin_1.default.comprobarTokenAdmin(adminToken)
        .then((decoded) => {
        console.log('Decoded', decoded);
        req.admin = decoded.admin;
        next();
    })
        .catch(err => {
        res.json({
            ok: false,
            mensaje: 'Token incorrecto'
        });
    });
};
exports.verificaTokenAdmin = verificaTokenAdmin;
