import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ObrasService } from './obras.service';
import { CreateObraDto } from './dto/create-obras.dto';
import { UpdateObraDto } from './dto/update-obras.dto';
import { Artista } from 'src/artistas/entities/artistas.entity';

@Controller('obras')
export class ObrasController {
  constructor(private readonly obrasService: ObrasService) {}
  
  @Post()
  async create(@Body() dto: CreateObraDto) {
    const obra = await this.obrasService.create(dto);

    console.log(`🟢 Obra "${obra.titulo}" creada correctamente`);
    return {
      message: `Obra "${obra.titulo}" creada correctamente`,
      obra: {
        id: obra.id,
        titulo: obra.titulo,
        precio: parseFloat(obra.precio as any),
        tecnica: obra.tecnica,
        categoria: obra.categoria?.nombre || null,
        artista: obra.artista ? obra.artista.nombre : null,
        descripcion: obra.descripcion,
        imagenUrl: obra.imagenUrl,
        fechaCreacion: obra.fechaCreacion,
      }
    };
  }


  @Get()
  async findAll() {
    const obras = await this.obrasService.findAll();   

    console.log(`🟢 ${obras.length} obras found successfully`);
    // Mapea las obras para incluir solo los campos necesarios
    // y formatea el precio a número
    return {
      message: 'Obras found successfully',
      obras: obras.map(obra => ({
        id: obra.id,
        titulo: obra.titulo,
        precio: parseFloat(obra.precio as any),
        tecnica: obra.tecnica,
        categoria: obra.categoria?.nombre || null,
        artista: obra.artista?.nombre || null
      }))
    };
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    const obra = await this.obrasService.findOne(+id);

    return {
      message: `Obra with id ${id} found successfully`,
      obra: {
        id: obra.id,
        titulo: obra.titulo,
        precio: parseFloat(obra.precio as any),
        tecnica: obra.tecnica,
        categoria: obra.categoria?.nombre || null,
        artista: obra.artista ? obra.artista.nombre : null
      }
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateObraDto) {
    const obra = await this.obrasService.update(+id, dto);

    // Campos base que siempre deben estar
    const respuesta: any = {
      id: obra.id,
      titulo: obra.titulo
    };

    // Agrega dinámicamente los campos modificados si están en dto
    if (dto.precio !== undefined) respuesta.precio = parseFloat(obra.precio as any);
    if (dto.descripcion !== undefined) respuesta.descripcion = obra.descripcion;
    if (dto.tecnica !== undefined) respuesta.tecnica = obra.tecnica;
    if (dto.imagenUrl !== undefined) respuesta.imagenUrl = obra.imagenUrl;
    if (dto.fechaCreacion !== undefined) respuesta.fechaCreacion = obra.fechaCreacion;
    if (dto.categoriaId !== undefined) respuesta.categoriaId = obra.categoria?.id;
    if (dto.artistaId !== undefined) respuesta.artistaId = obra.artista?.id;

    return {
      message: `Obra "${obra.titulo}" actualizada correctamente`,
      obra: respuesta
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.obrasService.remove(+id);
    return {
      message: `Obra con id ${id} eliminada correctamente`,
      result
    };
  }
}
