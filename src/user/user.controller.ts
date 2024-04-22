import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Put,
  Get,
  Delete,
  Param,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('User')
@ApiTags('User')
export class UserController {
  constructor(private todoService: UserService) {}

  @Post()  
  async create(@Body(new ValidationPipe()) createTodo: UserDto) {
    return this.todoService.create(createTodo);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTodo: UserDto,
  ) {
    return this.todoService.update(id, updateTodo);
  }

  @Get()
  async findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
