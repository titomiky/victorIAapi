import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class candidateUserDto {
  
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
  position: string;

  @IsString()
  @ApiProperty()  
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()  
  companyName: string;
  
  @IsString()
  @ApiProperty()  
  companyAddress: string;

  @IsNumber()
  @ApiProperty()
  numberOfEmployees: number;
  
  @IsString()
  @ApiProperty()
  companyNIF?: string;

}
