import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class loginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  @MinLength(4)
  @MaxLength(100)
  email: string;

  @IsString()  
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password: string;
   
}

