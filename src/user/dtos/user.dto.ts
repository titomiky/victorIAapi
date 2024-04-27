import { IsNotEmpty, IsString, IsEnum, IsOptional, IsObject} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { adminUserDto } from '../../adminUser/dtos/adminUser.dto';
import { clientUserDto } from '../../clientUser/dtos/clientUser.dto';
import { candidateUserDto } from '../../candidateUser/dtos/candidateUser.dto';
import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { User } from '../schemas/user.schema';


export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()  
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  
  @ApiProperty({type: adminUserDto})  
  @Type(() => adminUserDto)
  adminUser: adminUserDto;

  @ApiProperty({type: clientUserDto})  
  @Type(() => clientUserDto)
  clientUser: clientUserDto;

  @ApiProperty({type: candidateUserDto})  
  @Type(() => candidateUserDto)
  candidateUser: candidateUserDto;
}

