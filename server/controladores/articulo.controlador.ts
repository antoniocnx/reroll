import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Articulo } from '../modelos/articulo';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../clases/file-system';
import { Favorito } from '../modelos/favorito';
import { Usuario } from '../modelos/usuario';

const fileSystem = new FileSystem();

class articuloControlador {


    // Obtener artículos paginados
    async get(req: any, res: Response) {

        let pagina = Number(req.query.pagina) || 1;
        let skip = pagina - 1;
        skip = skip * 10;

        const articulos = await Articulo.find()
                                .sort({ _id: -1 })
                                .skip( skip )
                                .limit(10)
                                .populate('usuario', '-password')
                                .exec();


        res.json({
            ok: true,
            pagina,
            articulos
        });


    };

    // Crear artículos
    post(req: any, res: Response) {

        const body = req.body;
        body.usuario = req.usuario._id;

        
        const imagenes = fileSystem.imagenesDeTempHaciaArticulo( req.usuario._id );
        body.galeria = imagenes;
        
        // Pruebas
        const esFavorito = body.favorito;
        const userId = body.usuario = req.usuario._id;

        console.log('VALOR DE LA PROPIEDAD FAVORITO ', body.favorito);
        //

        Articulo.create( body ).then( async articuloDB => {

            await articuloDB.populate('usuario', '-password');

            // const usuario = await Usuario.findById(req.usuario._id);
            const usuario = await Usuario.findById(userId);

            if (esFavorito && usuario) {
                usuario.favoritos.push(articuloDB._id);
                await usuario.save();
                console.log('VALOR DEL USUARIO DESPUÉS DE INSERTAR UN FAVORITO ', usuario);
            }

            // if (esFavorito && usuario) {
            //     if (!Array.isArray(usuario.favoritos)) {
            //       usuario.favoritos = [];
            //     }
            //     usuario.favoritos.push(articuloDB._id);
            //     await usuario.save();
            //   }
            
            // if (body.favorito) {
            //     // Si el campo "favorito" es verdadero, almacenar el artículo en la colección "favoritos"
            //     await Favorito.create({ usuario: body.usuario, articulo: articuloDB._id });
            // }

            res.json({
                ok: true,
                articulo: articuloDB
            });

        }).catch( err => {
            res.json(err)
        });

    };



    // Servicio para subir archivos
    async upload(req: any, res: Response) {
        
        if ( !req.files ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se subió ningun archivo'
            });
        }

        const file: FileUpload = req.files.image;

        if ( !file ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se subió ningun archivo - image'
            });
        }

        if ( !file.mimetype.includes('imagen') ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Lo que subió no es una imagen'
            }); 
        }

        await fileSystem.guardarImagenTemporal( file, req.usuario._id );

        res.json({
            ok: true,
            file: file.mimetype
        });

    };


    // Obtener imagen por url
    getImg(req: any, res: Response) {

        const userId = req.params.userid;
        const img    = req.params.img;

        const pathFoto = fileSystem.getFotoUrl( userId, img );

        res.sendFile( pathFoto );

    };

    // WIP
    // Elimnar post
    // async delete(req: any, res: Response) {
    //     const userId = req.usuario._id; // ID del usuario que hace la petición
    //     const articuloId = req.params.articuloId; // ID del articulo que se quiere eliminar
      
    //     try {
    //       const articulo = await Articulo.findOne({ _id: articuloId, usuario: userId });
      
    //       if (!articulo) {
    //         return res.status(401).send({ mensaje: 'No estás autorizado para eliminar este articulo' });
    //       }
      
    //       await Articulo.findByIdAndDelete(articuloId);
      
    //       res.status(200).send({ mensaje: 'Articulo eliminado correctamente' });
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).send({ mensaje: 'Ha ocurrido un error al intentar eliminar el articulo' });
    //     }
    // }

    async delete(req: any, res: Response) {
        const idArticulo = req.params.id;
        const idUsuario = req.usuario._id;
      
        try {
          const articulo = await Articulo.findById(idArticulo);
      
          if (!articulo) {
            return res.status(404).json({
              ok: false,
              mensaje: 'Artículo no encontrado'
            });
          }
      
          if (articulo.usuario.toString() !== idUsuario) {
            return res.status(401).json({
              ok: false,
              mensaje: 'No tienes permiso para borrar este artículo'
            });
          }
      
          // Borrar las imágenes del artículo
        //   const imagenes = articulo.galeria || [];
        //   fileSystem.borrarImagenesDeArticulo(idUsuario, imagenes);
      
          // Borrar el artículo de la base de datos
          await articulo.remove();
      
          // Borrar el artículo de la colección de favoritos
          await Favorito.deleteMany({ articulo: idArticulo });
      
          res.json({
            ok: true,
            mensaje: 'Artículo borrado'
          });
        } catch (error) {
          res.status(500).json({
            ok: false,
            mensaje: 'Error al borrar el artículo',
            error
          });
        }
      }
      
      
}

export default articuloControlador;