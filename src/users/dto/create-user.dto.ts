import { IsString, IsEmail, IsOptional } from 'class-validator';


export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  rol?: string; // 'artista', 'usuario', 'admin'
}
