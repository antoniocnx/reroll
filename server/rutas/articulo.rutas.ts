import { Request, Response, Router } from "express";
import articuloControlador from "../controladores/articulo.controlador";
import { verificaToken } from '../middlewares/autenticacion';

const articuloRutas = Router();

articuloRutas.get('/get', articuloControlador.prototype.get);
articuloRutas.post('/post', verificaToken, articuloControlador.prototype.post);
articuloRutas.post('/upload', verificaToken, articuloControlador.prototype.upload);
articuloRutas.get('/imagen/:userid/:img', articuloControlador.prototype.getImg);
// WIP
articuloRutas.delete('/delete/:postId', verificaToken, articuloControlador.prototype.delete);

export default articuloRutas;