import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional} from 'class-validator';
import { Injectable, UploadedFile } from '@nestjs/common';
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

  @IsString()
  @ApiProperty()
  @IsOptional()
  cvText: string;

  @ApiProperty()
  @IsOptional()  
  cvPdf: Buffer;

}
