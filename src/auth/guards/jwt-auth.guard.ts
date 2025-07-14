import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
// Este guard utiliza la estrategia JWT definida en el módulo de autenticación.
// Se encarga de proteger las rutas que requieren autenticación JWT.