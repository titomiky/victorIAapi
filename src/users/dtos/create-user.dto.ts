import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

}
