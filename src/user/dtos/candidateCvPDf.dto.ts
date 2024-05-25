import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CandidateCvPDf {
  @IsNotEmpty()
  @IsString()  
  @ApiProperty()
  candidateId: string;
  
}

