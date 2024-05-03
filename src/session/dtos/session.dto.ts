import { IsNotEmpty, IsString, MinLength, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionAnswer } from './session.questionanswer.dto';
import { CompetenceResult } from './session.competenceResult.dto';

export class SessionDto {
  
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
    
  @ApiProperty({ type: [QuestionAnswer], description: 'Lista de preguntas y respuestas' })
  interview: [QuestionAnswer]

  @ApiProperty({ type: [CompetenceResult], description: 'Lista de preguntas y respuestas' })
  result: [CompetenceResult]

}

