import mongoose from "mongoose";
import { Schema, Document, model } from 'mongoose';

const favoritoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  articulo: {
    type: mongoose.Types.ObjectId,
    ref: 'Articulo',
    required: true
  }
});

interface IFavorito extends Document {
    usuario: string;
    articulo: string;
}

export const Favorito = model<IFavorito>('Favorito', favoritoSchema);