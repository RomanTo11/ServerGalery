import { IsString, IsOptional } from 'class-validator';

export class CreateArtistaDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  biografia?: string;

  @IsOptional()
  @IsString()
  pais?: string;

  @IsOptional()
  @IsString()
  fechaNacimiento?: string;

  @IsString()
  @IsOptional()
  imagenUrl: string;

  @IsString()
  @IsOptional()
  descripcion: string;
}
