import { IsNotEmpty, IsString, MinLength, IsEmail, IsOptional, IsObject, minLength} from 'class-validator';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { adminUserDto } from '../../adminUser/dtos/adminUser.dto';
import { clientUserDto } from '../../clientUser/dtos/clientUser.dto';
import { candidateUserDto } from '../../candidateUser/dtos/candidateUser.dto';
import { loginUserDto } from './user.login.dto';


export class UserDto {
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

