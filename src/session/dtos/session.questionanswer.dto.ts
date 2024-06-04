import { IsNotEmpty, IsString, MinLength, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionAnswer {
  
  @ApiProperty({required:true})  
  @IsNotEmpty()  
  @IsString()
  role: string;

  @ApiProperty({required:true})  
  @IsNotEmpty()    
  @IsString()  
  content: string;
  
  
}

