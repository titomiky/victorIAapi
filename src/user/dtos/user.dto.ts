import { IsNotEmpty, IsString, IsEnum, IsOptional} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()  
  @ApiProperty()
  password: string;

}
