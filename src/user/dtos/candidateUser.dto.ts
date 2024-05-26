import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class candidateUserDto {
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  surname: string;

  @IsString()
  @ApiProperty()  
  @IsOptional()
  phoneNumber: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  currentSalary: number;
  
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  desiredSalary: number;

  @IsDateString()
  @ApiProperty()
  @IsOptional()  
  birthDate: Date;

  @IsString()
  @ApiProperty()
  @IsOptional()
  cvText: string;

  @ApiProperty()
  @IsString()
  @IsOptional()  
  cvPdfUrl?: string;

  @IsOptional()  
  createdAt?: Date;
  
  @IsOptional()  
  updatedAt?: Date;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Pdf file to import',
    required: true,
  })
  @IsNotEmpty()
  file: File;
}
