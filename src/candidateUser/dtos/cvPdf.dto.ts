import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional} from 'class-validator';
import { Injectable, UploadedFile } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CvPdfDto {

@ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Excel file to import',
    required: true,
})
@IsNotEmpty()
//@Validate(IsValidFile)
file: File;


@IsNotEmpty()
@IsString()
@ApiProperty()
userId: string;
}