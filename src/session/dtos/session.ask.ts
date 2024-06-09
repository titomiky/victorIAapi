import { IsNotEmpty, IsString, MinLength, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionAnswer } from './session.questionanswer.dto';
import { CompetenceResult } from './session.competenceResult.dto';

export class SessionAskDto {
  
  @IsString()
  @IsNotEmpty()  
  @ApiProperty({required:true})
  sessionId: string;

  @IsString()  
  @ApiProperty({required:true})
  @IsNotEmpty()  
  message: string;

}

