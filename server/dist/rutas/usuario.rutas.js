"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controlador_1 = __importDefault(require("../controladores/usuario.controlador"));
const autenticacion_1 = require("../middlewares/autenticacion");
const usuarioRutas = (0, express_1.Router)();
usuarioRutas.get('/get', autenticacion_1.verificaToken, usuario_controlador_1.default.prototype.get);
usuarioRutas.post('/create', usuario_controlador_1.default.prototype.create);
usuarioRutas.post('/update', autenticacion_1.verificaToken, usuario_controlador_1.default.prototype.update);
usuarioRutas.post('/login', usuario_controlador_1.default.prototype.login);
// usuarioRutas.get('/:id/favoritos', usuarioControlador.prototype.favoritos);
exports.default = usuarioRutas;
