import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Put,
  Get,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from './dtos/user.response.dto';
import { loginUserDto } from './dtos/user.login.dto';

@Controller('Users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()  
  @ApiResponse({ status: 201, description: 'Created user ok', type: UserResponseDto })
  async create(@Body(new ValidationPipe()) createuser: UserDto) {
    return this.userService.create(createuser);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Updated user ok', type: UserResponseDto })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateuser: UserDto, @Req() request: Request
  ) {
    const [bearer, token] = request.headers['authorization']?.split(' ') || [];
    return this.userService.update(id, updateuser);
  }

  @Get('list')
  @ApiResponse({ status: 200, description: 'Returned users ok', type: UserResponseDto })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returned user ok', type: UserResponseDto })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Deleted user ok', type: UserResponseDto })
  async delete(@Param('id') id: string) {
    console.log(id);
    return this.userService.delete(id);
  }

  @ApiResponse({ status: 200, description: 'Login user ok', type: UserResponseDto })
  @Post('login')
  async login (@Body() userLoginDto: loginUserDto) {
    const loggedIn = await this.userService.login(userLoginDto.email, userLoginDto.password);
    if (loggedIn) {
      console.log(loggedIn);
      return loggedIn;
    } else {
      console.log('not logged in');
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED );
    }
  }
}

