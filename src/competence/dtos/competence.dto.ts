import { IsNotEmpty, IsString, IsEnum, IsOptional, IsObject} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompetenceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()  
  @ApiProperty()  
  description: string;

}