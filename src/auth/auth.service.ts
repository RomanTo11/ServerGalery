import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {  
    const payload = { sub: user._id, email: user.email, rol: user.rol, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }

  async register(body: { username: string; email: string; password: string }) {
    const existing = await this.usersService.findByEmail(body.email);
    if (existing) {
      throw new UnauthorizedException('Email ya registrado');
    }

    // Hasheamos la contraseña antes de guardarla:
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await this.usersService.create({
      username: body.username,
      email: body.email,
      password: hashedPassword,
      rol: 'usuario', // o 'admin' si lo quieres crear manual
    });

    return { message: 'Usuario  creado', user: newUser };
  }

  
}