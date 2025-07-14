import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artista } from './entities/artistas.entity';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';

@Injectable()
export class ArtistasService {
  constructor(
    @InjectRepository(Artista)
    private readonly artistaRepo: Repository<Artista>,
  ) {}
// Create a new artist
  create(dto: CreateArtistaDto): Promise<Artista> {
    const artista = this.artistaRepo.create(dto);
    return this.artistaRepo.save(artista);
  }
// encuentra todos los artistas
  findAll(): Promise<Artista[]> {
    
    return this.artistaRepo.find({ relations: ['obras'] });
  }
// encuentra un artista por id
  async findOne(id: number): Promise<Artista> {
    const artista = await this.artistaRepo.findOne({
      where: { id },
      relations: ['obras'],
    });
    if (!artista) {
      throw new NotFoundException('Artista no encontrado');
    }
    return artista;
  }
// Actualiza un artista por id
  async update(id: number, dto: UpdateArtistaDto): Promise<Artista> {
  try {
    const result = await this.artistaRepo.update(id, dto);

    // Si ninguna fila fue afectada, no existe el artista
    if (result.affected === 0) {
      throw new NotFoundException('Artista no encontrado');
    }

    const artista = await this.findOne(id);
    return artista;
  } catch (error) {
    // Aquí puedes imprimir el error para debuguear
    console.error('Error al actualizar artista:', error);
    throw error; // Re-lanza el error para que lo maneje NestJS
  }

  }
// Elimina un artista por id
  async remove(id: number): Promise<void> {
    const result = await this.artistaRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Artista no encontrado');
    }
  }
}
