import { IsNotEmpty, IsString, IsDate, IsNumber, IsOptional} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class candidateUserResponseDto {
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
  phoneNumber: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  currentSalary: number;
  
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  desiredSalary: number;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  birthDate: Date;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  cvText: string;

  @IsString()
  @ApiProperty()
  _id: string;
}
