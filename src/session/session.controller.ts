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
import { QuestionAnswer } from './schema/session.questionAnswer.schema';

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
      
      const session = await this.sessionService.findOne(sessionId);
      console.log('sessionId',sessionId);
      if (!session) {
        throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
      }
      
      const systemRole = "system";
      const systemContent = "Eres un reclutador de recursos humanos llamado Victoria que realiza una entrevista para saber qué grado de competencia tiene en Comunicación Efectiva, Trabajo en Equipo, Pensamiento Crítico, Resolución de Problemas, Liderazgo, Adaptabilidad y Flexibilidad, Gestión del Tiempo y Organización, Inteligencia Emocional. Empieza la entrevista haciendo una primera pregunta y no acaba hasta que el usuario le conteste a todas las preguntas necesarias para confirmar el nivel en las competencias. Sólo realiza una pregunta en cada mensaje. Como máximo se analizan dos competencias en cada pregunta. Cuando devuelvas la preguntas, devuelve al final del mensajes en el siguiente formato json cada competencia o competencias que estas analizando en cada pregunta {\"competencias\": [\"competencia1\", \"competencia2\", ...]]}. Trata siempre de tú, no de usted. No menciones el nombre de las capacidades que estás tratando de averiguar con las preguntas. Realiza varias sólo una pregunta a la vez." ;
      const messages : OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: systemRole, content: systemRole}
      ];      

      const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: messages,
        stream: true,
      });

      let responseContent = "";
      for await (const chunk of stream) {
        console.log(chunk);
        responseContent += chunk.choices[0]?.delta?.content || "";
      }

      console.log(responseContent);
      const competencias = this.GetCompetencias(responseContent);
      responseContent += this.EliminarJSONDeCompetencias(responseContent);

      const questionAnswer = new QuestionAnswer();
      questionAnswer.role = systemRole;
      questionAnswer.content = systemContent;

      const updatedSession = await this.sessionService.addQuestionAnswer(sessionId, questionAnswer);
      return updatedSession;

    } catch(error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error sending verification email.');      
    }
  }



async EliminarJSONDeCompetencias(mensaje) {
  // Utiliza una expresión regular para encontrar y eliminar el patrón JSON
  const regex = /\{.*\}/;
  const mensajeSinJSON = mensaje.replace(regex, '').trim();

  return mensajeSinJSON;
}



  async GetCompetencias(mensaje) {
    // Utiliza una expresión regular para encontrar el patrón JSON
    const regex = /\{.*\}/;
    const jsonEncontrado = mensaje.match(regex);
  
    if (jsonEncontrado) {
      // Reemplaza comillas simples por dobles para hacer el JSON válido
      const jsonCorregido = jsonEncontrado[0].replace(/'/g, '"');
  
      // Intenta parsear el fragmento corregido como JSON
      try {
        const json = JSON.parse(jsonCorregido);
        console.log("JSON extraído:", json);
        // Devuelve el array de strings asociado a la clave "competencias", si existe
        if (json.competencias && Array.isArray(json.competencias)) {
          return json.competencias;
        } else {
          console.log("La clave 'competencias' no existe o no es un array.");
          return null; // Devuelve null si la clave no existe o no es un array
        }
      } catch (error) {
        console.error("Error al parsear JSON:", error);
        return null; // Devuelve null en caso de error al parsear
      }
    } else {
      console.log("No se encontró un patrón JSON en el mensaje.");
      return null; // Devuelve null si no se encuentra un patrón JSON
    }
  }
}