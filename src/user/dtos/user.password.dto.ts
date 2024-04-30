
import { IsNotEmpty, IsString, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserPasswordDto {
    @IsString()  
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    password: string; 
  
}
  