import { Document } from 'mongoose';

export interface User extends Document {
  nombre: string;
  email: string;
  roles: string[];
  password: string;
  creadoEn: Date;
}
