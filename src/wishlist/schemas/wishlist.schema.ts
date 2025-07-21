import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WishlistDocument = Wishlist & Document;

@Schema({ timestamps: true })
export class Wishlist {
  @Prop({ required: false }) // Puede estar vacío si es anónima
  userId?: string;           // ID de usuario si está asociada

  @Prop({ required: false }) // Para usuarios anónimos, puedes usar un token/cookie
  sessionId?: string;

  @Prop({
    type: [
      {
        artworkId: { type: Number, required: true },
        dateAdded: { type: Date, default: Date.now }
      }
    ],
    default: [],
  })
  items: { artworkId: number; dateAdded: Date }[];
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);