import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class 
email {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  @MinLength(4)
  @MaxLength(100)
  email: string;
   
}

