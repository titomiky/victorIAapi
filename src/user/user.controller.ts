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
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('User')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()  
  @ApiResponse({ type: UserDto })
  async create(@Body(new ValidationPipe()) createuser: UserDto) {
    return this.userService.create(createuser);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateuser: UserDto,
  ) {
    return this.userService.update(id, updateuser);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
