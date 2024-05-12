import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  @MinLength(4)
  @MaxLength(100)
  email: string;

  @IsString()  
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsOptional()
  createdAt?: Date;
  
  @IsOptional()
  updatedAt?: Date;
  
}

