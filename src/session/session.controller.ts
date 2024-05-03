import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Put,
  Get,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  Req,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody, ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from 'src/auth/auth.service';
import { Public } from '../auth/auth.controller';
import { SessionDto } from './dtos/session.dto';

@ApiTags('sessions')
@Controller('sessions')
export class SessionController {
  constructor(private sessionService: SessionService) {}
  
  @Post()
  @ApiBearerAuth()
  async create(@Body() createSessionDto: SessionDto) {
    return this.sessionService.create(createSessionDto);
  }

  @Get()
  @ApiBearerAuth()
  async findAll() {
    return this.sessionService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return this.sessionService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() sessionDto: SessionDto) {
    return this.sessionService.update(id, sessionDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return this.sessionService.remove(id);
  }

}