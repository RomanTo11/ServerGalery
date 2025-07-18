import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    console.log('usuario logueado:', body.email);
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: { username: string; email: string; password: string }) {
    console.log(`Nuevo usuario registrado: ${body.username} (${body.email})`);
  return this.authService.register(body);
  }
};
