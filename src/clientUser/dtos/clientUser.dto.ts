import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class clientUserDto {
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  surname: string;
  
  @IsString()
  @ApiProperty()
  @IsOptional()
  position: string;

  @IsString()
  @ApiProperty()  
  @IsOptional()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()  
  companyName: string;
  
  @IsString()
  @ApiProperty()  
  @IsOptional()
  companyAddress: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  numberOfEmployees: number;
  
  @IsString()
  @ApiProperty()
  @IsOptional()
  companyNIF?: string;

}
