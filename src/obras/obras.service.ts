
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from './entities/obras.entity';
import { CreateObraDto } from './dto/create-obras.dto';
import { UpdateObraDto } from './dto/update-obras.dto';
import { Artista } from 'src/artistas/entities/artistas.entity';
import { Category } from 'src/categories/entities/categories.entity';

@Injectable()
export class ObrasService {
  constructor(
    @InjectRepository(Obra)
    private readonly obraRepo: Repository<Obra>,

    @InjectRepository(Artista)
    private readonly artistaRepo: Repository<Artista>,

    @InjectRepository(Category)
    private readonly categoriaRepo: Repository<Category>,
  ) {}

  async create(dto: CreateObraDto): Promise<Obra> {
    const obra = new Obra();
    obra.titulo = dto.titulo;
    obra.descripcion = dto.descripcion;
    obra.tecnica = dto.tecnica;
    obra.precio = dto.precio;
    obra.imagenUrl = dto.imagenUrl;
    obra.fechaCreacion = dto.fechaCreacion;
    obra.dimensiones = dto.dimensiones;

    const artista = await this.artistaRepo.findOne({ where: { id: dto.artistaId } });
    if (!artista) throw new NotFoundException('Artista no encontrado');
    obra.artista = artista;

    if (dto.categoriaId) {
      const categoria = await this.categoriaRepo.findOne({ where: { id: +dto.categoriaId } });
      if (categoria) obra.categoria = categoria;
    }

    return this.obraRepo.save(obra);
  }

  findAll(): Promise<Obra[]> {
    return this.obraRepo.find({ relations: ['artista', 'categoria'] });
  }

  async findOne(id: number): Promise<Obra> {
    const obra = await this.obraRepo.findOne({ where: { id }, relations: ['artista', 'categoria'] });
    if (!obra) throw new NotFoundException('Obra no encontrada');
    return obra;
  }

  async update(id: number, dto: UpdateObraDto): Promise<Obra> {
    const obra = await this.findOne(id);
    Object.assign(obra, dto);

    if (dto.artistaId) {
      const artista = await this.artistaRepo.findOne({ where: { id: dto.artistaId } });
      if (artista) obra.artista = artista;
    }

    if (dto.categoriaId) {
      const categoria = await this.categoriaRepo.findOne({ where: { id: +dto.categoriaId } });
      if (categoria) obra.categoria = categoria;
    }

    return this.obraRepo.save(obra);
  }

  async remove(id: number): Promise<void> {
    const result = await this.obraRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Obra no encontrada');
  }
}
