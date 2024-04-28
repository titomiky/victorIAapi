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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@Controller('clientUsers')
@ApiTags('clientUsers')
export class clientUserController {
  constructor(private clientUserService: clientUserService) {}
  
  @Post()  
  @ApiBearerAuth()
  async create(@Body(new ValidationPipe()) createclientUser: clientUserDto) {
    return this.clientUserService.create(createclientUser);
  }

  @Put(':id')
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateclientUser: clientUserDto,
  ) {
    return this.clientUserService.update(id, updateclientUser);
  }

  @Get('list')
  @ApiBearerAuth()
  async findAll() {
    return this.clientUserService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return this.clientUserService.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    return this.clientUserService.delete(id);
  }
}
