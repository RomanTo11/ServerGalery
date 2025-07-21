import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateObraDto {
  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsString()
  tecnica: string;

  @IsString()
  dimensiones: string;

  @IsNumber()
  precio: number;

  @IsDateString()
  fechaCreacion: Date;

  @IsOptional()
  @IsString()
 
  imagenUrl: string;

  @IsNumber()
  categoriaId?: Number;

  @IsNumber()
  artistaId: number;
}
