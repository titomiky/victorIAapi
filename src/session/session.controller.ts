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


  // async getFormattedMessages() {
  //   try {
  //     // Recupera todas las conversaciones
  //     const conversations = await Conversation.find({});
  //     // Suponiendo que quieres formatear los mensajes de la primera conversación
  //     if (conversations.length > 0) {
  //       const sortedMessages = conversations[0].messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //       const formattedMessages = sortedMessages.map(msg => ({
  //         role: msg.role,
  //         content: msg.content
  //       }));
  //       return formattedMessages;
  //     }
  //     return [];
  //   } catch (error) {
  //     console.error("Error al recuperar y formatear mensajes:", error);
  //     return [];
  //   }
  // }

  // @Post()
  // @Public()
  // async ask(@Body() message: string){
  //   const userMessage = message;
  //   console.log(userMessage);
  //   try {
  
  //     const messages = await getFormattedMessages();    
  //     const messagesToSave = [];
  //     messagesToSave.push({ role: "user", content: userMessage });
  //     messages.push(messagesToSave[messagesToSave.length - 1]);
      
  //     const stream = await openai.chat.completions.create({
  //       model: "gpt-4",
  //       messages: messages,
  //       stream: true,
  //     });
  
  //     let responseContent = "";
  //     for await (const chunk of stream) {
  //       responseContent += chunk.choices[0]?.delta?.content || "";
  //     }  
  //     const competencias = GetCompetencias(responseContent);
  //     responseContent = EliminarJSONDeCompetencias(responseContent);
          
  //     messagesToSave.push({ role: "assistant", content: responseContent, competencias: competencias });   
  //     messages.push(messagesToSave[messagesToSave.length - 1]);
  //     const conversation = new Conversation({
  //       messages: messagesToSave
  //     });
  //     await conversation.save(); // Guarda la conversación inicial en la base de datos
  
  //     res.json({ pregunta: responseContent });
  //   } catch (error) {
  //     console.error("Error al comunicarse con OpenAI:", error);
  //     res.status(500).json({ message: "Error al procesar la solicitud" });
  //   }
  // });
  

}