import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema({ timestamps: true })
export class Offer {
  
  @Prop({ required: true })
  artworkId: number; // ID de la obra en PostgreSQL

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  value: number;

  @Prop({ default: 'pending', enum: ['pending', 'accepted', 'rejected'] })
  status: string;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);