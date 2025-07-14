import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateObraDto {
  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  precio: number;

  @IsString()
  imagenUrl: string;

  @IsString()
  tecnica: string;

  @IsString()
  dimensiones: string;

  @IsDateString()
  fechaCreacion: Date;

  @IsOptional()
  @IsString()
  categoriaId?: Number;

  @IsNumber()
  artistaId: number;
}
