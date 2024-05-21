
import { IsNotEmpty, IsString, MinLength, MaxLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserChangePasswordDto {
    @IsString()  
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)    
    @MaxLength(100)
    password: string; 

    @IsString()  
    @ApiProperty()
    @IsNotEmpty()
    userId: string; 
  
}
  