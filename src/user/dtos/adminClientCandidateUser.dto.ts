import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional, IsDate, IsObject} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdminUser } from '../schemas/adminUser.schema';
import { ClientUser } from '../schemas/clientUser.schema';
import { CandidateUser } from '../schemas/candidateUser.schema';
import { adminUserDto } from './adminUser.dto';
import { clientUserDto } from './clientUser.dto';
import { candidateUserDto } from './candidateUser.dto';

export class adminClientCandidateUserDto {

@IsString()
@ApiProperty()
email: string;

// @IsNotEmpty()
// @IsString()
// @ApiProperty()
// password: string;

@IsObject()
@ApiProperty()
adminUser?: adminUserDto;

@IsObject()
@ApiProperty()
clientUser?: clientUserDto;

@IsObject()
@ApiProperty()
candidateUser?: candidateUserDto;

@IsObject()
@ApiProperty()
emailValidatedDate: Date;

@IsDate()
@ApiProperty()
createdAt?: Date;

@IsDate()
@ApiProperty()
updatedAt?: Date;

@IsString()
@ApiProperty()
CVpdfId: string; // Referencia al ID del archivo en GridFS como cadena de texto
  
}