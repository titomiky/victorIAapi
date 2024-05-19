import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCvPDf {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  userId: string;
  
}

