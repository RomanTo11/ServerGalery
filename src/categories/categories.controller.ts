import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-categories.dto';
import { UpdateCategoryDto } from './dto/update-categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    const categories = await this.categoriesService.create(dto);
    //mensaje para la consola
    console.log('Category created:', categories);
    // Retornar la categoría creada
    return categories;
  }

  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return categories.map(category => ({
      id: category.id,
      nombre: category.nombre,
      obras: category.obras ? category.obras.map(obra => ({
        id: obra.id,
    })) : []
  }));
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id).then(cat => ({
      id: cat.id,
      nombre: cat.nombre,
      obras: cat.obras ? cat.obras.map(obra => ({
        id: obra.id,
      })) : []
    }));
  }
   

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const updatedCategory = this.categoriesService.update(+id, dto);
    // mensaje para la consola
    console.log('Updating category with id:', id, 'with data:', dto);
    // Imprimir la categoría actualizada en la consola
    console.log('Category updated:', updatedCategory);
    // Retornar la categoría actualizada
    if (!updatedCategory) {
      throw new Error(`Category with id ${id} not found`);
    }
    return updatedCategory;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // mensaje para la consola
    console.log('✅ Category removed with id:', id);
    await this.categoriesService.remove(+id);
    return { message: `Categoría (${id}) eliminada correctamente` };
  }
}
