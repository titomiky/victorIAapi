import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString, IsEmail, MinLength, MaxLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { candidateUserDto } from './candidateUser.dto';


export class candidateUserByClientDto {
  
  @IsNotEmpty()  
  @ApiProperty()
  user: UserDto;

  @IsNotEmpty()  
  @ApiProperty()
  candidateUser: candidateUserDto;
 
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Pdf file to import',
    required: false,
  })  
  file: File;

}
  