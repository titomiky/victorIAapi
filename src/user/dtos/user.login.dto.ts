import { IsNotEmpty, IsString, MinLength, IsOptional, IsObject, minLength, IsEmail} from 'class-validator';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class loginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()  
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
   
}

