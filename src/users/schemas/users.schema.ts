import {Schema, Document} from 'mongoose';

export const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, default: 'usuario' }, // puede ser: usuario, artista, admin
    }, {
    timestamps: true,
    });
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    rol: string;
}