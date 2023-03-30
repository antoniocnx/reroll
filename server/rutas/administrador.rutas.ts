import { Request, Response, Router } from "express";
import administradorControlador from "../controladores/administrador.controlador";
import { verificaToken } from "../middlewares/autenticacion";

const administradorRutas = Router();

administradorRutas.get('/get', verificaToken, administradorControlador.prototype.get);
administradorRutas.post('/create', administradorControlador.prototype.create);
administradorRutas.post('/update', verificaToken, administradorControlador.prototype.update);
administradorRutas.post('/login', administradorControlador.prototype.login);

export default administradorRutas;