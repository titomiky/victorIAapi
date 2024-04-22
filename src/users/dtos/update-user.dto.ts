import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

}
