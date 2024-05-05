import { IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { mongo } from 'mongoose';

export class JobOfferDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()  
  @MinLength(2)  
  @MaxLength(500)
  name: string;

  @IsString()  
  @ApiProperty() 
  @MinLength(2)     
  @MaxLength(3000)
  description: string;
  
  @ApiProperty({ type: [mongo.ObjectId]})
  competenceIds: [mongo.ObjectId];

  @ApiProperty({ type: [mongo.ObjectId]})
  candidateIds?: [mongo.ObjectId];
}

