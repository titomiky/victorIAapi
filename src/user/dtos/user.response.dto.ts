import { IsNotEmpty, IsString, IsEnum, IsOptional, IsObject} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { adminUserDto } from '../../adminUser/dtos/adminUser.dto';
import { adminUserResponseDto } from '../../adminUser/dtos/adminUser.response.dto';


export class UserResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()  
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  _id: string;
  
  @ApiProperty({
    type: adminUserResponseDto,    
  })  
  @Type(() => adminUserResponseDto)
  adminUser: adminUserResponseDto;

}
