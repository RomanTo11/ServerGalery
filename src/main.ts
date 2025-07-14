import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para tu frontend
  app.enableCors({
    origin: [
      'http://localhost:5173', // Vite
      'http://localhost:3002', // React clásico
    ],
    credentials: true,
  });

  const PORT = process.env.PORT ?? 3002;
  await app.listen(PORT);

  console.log(`🚀 Servidor NestJS corriendo en: http://localhost:${PORT}`);
}
bootstrap();