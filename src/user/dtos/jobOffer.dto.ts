import { IsNotEmpty, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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

