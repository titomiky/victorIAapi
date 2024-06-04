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
import OpenAI from 'openai';
import { ClientOptions } from 'openai';
import express, {Response} from 'express';
import { ChatCompletionMessageParam } from 'openai/resources';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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


  @Get('/inicio/:sessionId')
  @Public()
  async inicio(@Param('sessionId') sessionId: string,  @Req() req: Request, @Res() res: Response) {
    try {
      //TODO: validate that sessionId exists
      const session = await this.sessionService.findOne(sessionId);
      if (!session) {
        throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
      }

      
      const messages : OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: "system", content: "Eres un reclutador de recursos humanos llamado Victoria que realiza una entrevista para saber qué grado de competencia tiene en Comunicación Efectiva, Trabajo en Equipo, Pensamiento Crítico, Resolución de Problemas, Liderazgo, Adaptabilidad y Flexibilidad, Gestión del Tiempo y Organización, Inteligencia Emocional. Empieza la entrevista haciendo una primera pregunta y no acaba hasta que el usuario le conteste a todas las preguntas necesarias para confirmar el nivel en las competencias. Sólo realiza una pregunta en cada mensaje. Como máximo se analizan dos competencias en cada pregunta. Cuando devuelvas la preguntas, devuelve al final del mensajes en el siguiente formato json cada competencia o competencias que estas analizando en cada pregunta {\"competencias\": [\"competencia1\", \"competencia2\", ...]]}. Trata siempre de tú, no de usted. No menciones el nombre de las capacidades que estás tratando de averiguar con las preguntas. Realiza varias sólo una pregunta a la vez." }
      ];      

      const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: messages,
        stream: true,
      });


    } catch(error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error sending verification email.');      
    }
  }

}