import { IsNotEmpty, IsString, IsEnum, IsOptional, IsObject} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


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
  
  // @ApiProperty({
  //   type: adminUserResponseDto,    
  // })  
  // @Type(() => adminUserResponseDto)
  // adminUser: adminUserResponseDto;

  // @ApiProperty({
  //   type: clientUserResponseDto,    
  // })  
  // @Type(() => clientUserResponseDto)
  // clientUser: clientUserResponseDto;
}
