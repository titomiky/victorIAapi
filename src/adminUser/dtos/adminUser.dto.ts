import { IsNotEmpty, IsString, IsEnum, IsOptional} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class adminUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()  
  @ApiProperty()
  @IsOptional()
  surname: string;

  @IsString()  
  @ApiProperty()
  @IsOptional()
  phoneNumber: string;

}
