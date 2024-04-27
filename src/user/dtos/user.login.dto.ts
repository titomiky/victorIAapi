import { IsNotEmpty, IsString, MinLength, IsOptional, IsObject, minLength, IsEmail} from 'class-validator';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { adminUserDto } from '../../adminUser/dtos/adminUser.dto';
import { clientUserDto } from '../../clientUser/dtos/clientUser.dto';
import { candidateUserDto } from '../../candidateUser/dtos/candidateUser.dto';


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

