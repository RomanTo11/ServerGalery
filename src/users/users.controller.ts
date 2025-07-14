import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return {
      message: `User "${user.nombre}" created successfully`,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        roles: user.roles,
      },
    };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      message: 'Users found successfully',
      users: users.map(user => ({
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        roles: user.roles,
      })),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return {
      message: 'User found successfully',
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        roles: user.roles,
      },
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.usersService.update(id, dto);
    return {
      message: `User "${user.nombre}" updated successfully`,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        roles: user.roles,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return {
      message: `User with id ${id} removed successfully`,
    };
  }
}
