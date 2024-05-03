import { IsNotEmpty, IsString, MinLength, IsNumber} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompetenceResult {
  
  @ApiProperty({required:true})  
  @IsNotEmpty()  
  @IsString()
  competenceId: string;

  @ApiProperty({required:true})  
  @IsNotEmpty()    
  @IsNumber()  
  result: number;
  
}

