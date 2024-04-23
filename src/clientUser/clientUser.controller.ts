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

import { clientUserService } from './clientUser.service';
import { clientUserDto } from './dtos/clientUser.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('clientUsers')
@ApiTags('clientUsers')
export class clientUserController {
  constructor(private clientUserService: clientUserService) {}

  @Post()  
  async create(@Body(new ValidationPipe()) createclientUser: clientUserDto) {
    return this.clientUserService.create(createclientUser);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateclientUser: clientUserDto,
  ) {
    return this.clientUserService.update(id, updateclientUser);
  }

  @Get('list')
  async findAll() {
    return this.clientUserService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientUserService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.clientUserService.delete(id);
  }
}
