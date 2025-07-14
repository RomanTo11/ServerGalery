import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ArtistasService } from './artistas.service';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';

@Controller('artistas')
export class ArtistasController {
  constructor(private readonly artistasService: ArtistasService) {}

  @Post()
  async create(@Body() dto: CreateArtistaDto) {
    const artista = await this.artistasService.create(dto);
    // Mensaje para la consola
    // Mensaje para el cliente
    console.log(`🟢 Artista creado correctamente: ${artista.nombre}`);
    return { message: 'Artista creado correctamente', artista };
  }

  @Get()
  async findAll() {
    const artistas = await this.artistasService.findAll();
    // Mensaje para el cliente
    return { 
      artistas: artistas.map(artista => ({
        id: artista.id,
        nombre: artista.nombre,
        obras: artista.obras ? artista.obras.map(obra => ({
          id: obra.id,
          titulo: obra.titulo,
        })) : [],
      }))
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const artista = await this.artistasService.findOne(+id);
    return {
      artista: {
        id: artista.id,
        nombre: artista.nombre,
        obras: artista.obras ? artista.obras.map(obra => ({
          id: obra.id,
          titulo: obra.titulo,
        })) : [],
      }
    };
  }
  

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateArtistaDto) {
    const artista = await this.artistasService.update(+id, dto);
    // Mensaje para la consola
    console.log(`🟢 Artista con ID ${id} actualizado correctamente`);
    // Mensaje para el cliente
    return { message: 'Artista actualizado correctamente', artista };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
  const idNum = +id;
  await this.artistasService.remove(idNum);
  
  // Mensaje para la consola
  console.log(`🟢 Artista con ID ${idNum} eliminado correctamente`);

  // Mensaje para el cliente
  return { message: 'Artista eliminado correctamente' };

  }
}
