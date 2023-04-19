import { Response, Request, NextFunction } from 'express';
import Token from '../clases/token';
import TokenAdmin from '../clases/token-admin';
 

export const verificaToken = ( req: any, res: Response, next: NextFunction  ) => {

    const userToken = req.get('x-token') || '';

    Token.comprobarToken( userToken )
        .then(  (decoded: any) => {
            console.log('Decoded', decoded );
            req.usuario = decoded.usuario;
            next();
        })
        .catch( err => {

            res.json({
                ok: false,
                mensaje: 'Token incorrecto'
            });

        });

}

export const verificaTokenAdmin = ( req: any, res: Response, next: NextFunction  ) => {

    const adminToken = req.get('y-token') || '';

    TokenAdmin.comprobarTokenAdmin( adminToken )
        .then(  (decoded: any) => {
            console.log('Decoded', decoded );
            req.admin = decoded.admin;
            next();
        })
        .catch( err => {

            res.json({
                ok: false,
                mensaje: 'Token incorrecto'
            });

        });

}


