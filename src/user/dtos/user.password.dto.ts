
import { IsNotEmpty, IsString, MinLength, MaxLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserPasswordDto {
    @IsString()  
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)    
    @MaxLength(100)
    password: string; 
  
}
  