import { IsNotEmpty, IsString, MinLength, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionAnswer {
  
  @ApiProperty({required:true})  
  @IsNotEmpty()  
  @IsString()
  question: string;

  @ApiProperty({required:true})  
  @IsNotEmpty()    
  @IsString()  
  answer: string;

  Date: Date;
  
}

