
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObrasService } from './obras.service';
import { ObrasController } from './obras.controller';
import { Obra } from './entities/obras.entity';
import { Artista } from 'src/artistas/entities/artistas.entity';
import { Category } from 'src/categories/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Obra, Artista, Category])],
  controllers: [ObrasController],
  providers: [ObrasService],
})
export class ObrasModule {}
