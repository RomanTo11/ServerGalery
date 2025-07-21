import { IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  fechaCreacion?: Date; 

  @IsOptional()
  @IsString()
  imagenUrl: string;
}