import { IsNotEmpty, IsString, IsEnum, IsOptional, IsObject} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { adminUserDto } from '../../adminUser/dtos/adminUser.dto';
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
  password: string;

  @IsString()
  @IsOptional()
  _id?: ObjectId;
  
  @ApiProperty({
    type: adminUserDto,    
  })  
  @Type(() => adminUserDto)
  adminUser: adminUserDto;

}

