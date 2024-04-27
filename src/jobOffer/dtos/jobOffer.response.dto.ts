import { IsNotEmpty, IsString, IsEnum, IsOptional, IsObject, IsArray} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CompetenceDto } from '../../competence/dtos/competence.dto';

export class JobOfferResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()  
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  _id: string;
  
  @ApiProperty({type: [CompetenceDto]})  
  @IsArray()
  @Type(() => CompetenceDto)
  competencies: CompetenceDto;
}
