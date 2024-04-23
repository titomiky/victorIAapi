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

import { adminUserService } from './adminUser.service';
import { adminUserDto } from './dtos/adminUser.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('adminUsers')
@ApiTags('adminUsers')
export class adminUserController {
  constructor(private adminUserService: adminUserService) {}

  @Post()  
  async create(@Body(new ValidationPipe()) createadminUser: adminUserDto) {
    return this.adminUserService.create(createadminUser);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateadminUser: adminUserDto,
  ) {
    return this.adminUserService.update(id, updateadminUser);
  }

  @Get('list')
  async findAll() {
    return this.adminUserService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminUserService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.adminUserService.delete(id);
  }
}
