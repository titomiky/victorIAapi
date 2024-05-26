import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CandidateCvDto {
  @IsNotEmpty()
  @IsString()  
  @ApiProperty()
  candidateId: string;
  
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Pdf file to import',
    required: true,
  })  
  file?: File;

}

