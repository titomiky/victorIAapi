import { IsNotEmpty, IsString, IsEnum, IsOptional, IsObject, IsArray} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CompetenceDto } from 'src/competence/dtos/competence.dto';
import mongoose from 'mongoose';
import { mongo } from 'mongoose';

export class JobOfferDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()  
  @ApiProperty()  
  description: string;
  
  @ApiProperty({ type: [mongo.ObjectId]})
  competenceIds: [mongo.ObjectId];

  @ApiProperty({ type: [mongo.ObjectId]})
  candidateIds?: [mongo.ObjectId];
}

