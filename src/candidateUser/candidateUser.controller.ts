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

import { candidateUserService } from './candidateUser.service';
import { candidateUserDto } from './dtos/candidateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('candidateUsers')
@ApiTags('candidateUsers')
export class candidateUserController {
  constructor(private candidateUserService: candidateUserService) {}

  @Post()  
  async create(@Body(new ValidationPipe()) createcandidateUser: candidateUserDto) {
    return this.candidateUserService.create(createcandidateUser);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatecandidateUser: candidateUserDto,
  ) {
    return this.candidateUserService.update(id, updatecandidateUser);
  }

  @Get('list')
  async findAll() {
    return this.candidateUserService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.candidateUserService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.candidateUserService.delete(id);
  }
}
