import { IsNotEmpty, IsString, IsEnum, IsOptional} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class adminUserResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()  
  @ApiProperty()
  surname: string;

  @IsString()  
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @ApiProperty()
  _id: string;
}
