import { IsNotEmpty, IsString, MinLength, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CompetenceResult } from './session.competenceResult.dto';

export class SessionMessageDto {
  
  @IsString()
  @IsNotEmpty()  
  @ApiProperty({required:true})
  jobOfferId: string;

  @IsString()  
  @ApiProperty({required:true})
  @IsNotEmpty()  
  candidateUserId: string;

  createdDate: Date;
  startedDate: Date;
  finishedDate: Date;

  @ApiProperty({ type: [CompetenceResult], description: 'Lista de preguntas y respuestas' })
  result: [CompetenceResult]

}

