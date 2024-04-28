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
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserResponseDto } from './dtos/user.response.dto';
import { loginUserDto } from './dtos/user.login.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { Public } from '../auth/auth.controller';
import { UserPasswordDto } from './dtos/user.password.dto';
import { adminUserDto } from './dtos/adminUser.dto';

@Controller('Users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Post()  
  @Public()
  @ApiOperation({ summary: 'Create a user', description: 'Create a user with email and password' })
  @ApiResponse({ status: 201, description: 'Created user ok', type: UserResponseDto })
  async create(
    @Body(new ValidationPipe()) createuser: UserDto,
    @Req() request: Request,
  ) {
    try {  
      return this.userService.create(createuser);
    } catch (error) {      
      throw new HttpException(error, HttpStatus.CONFLICT); 
    }
  }

  @Post('createAdmin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update the password of the user', description: 'Update the password of the logged user' })
  @ApiResponse({ status: 200, description: 'Updated user ok', type: UserResponseDto })
  async createAdmin(    
    @Body(new ValidationPipe()) adminUser: adminUserDto, @Req() request: Request
  ) {
    const userId = await this.authService.getUserIdFromToken(request);    
    const user = await this.userService.findOne(userId);
    console.log(user);
    
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.adminUser = adminUser;

    console.log(userId);    
    return this.userService.createAdminUser(userId, user);
  }

  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update the password of the user', description: 'Update the password of the logged user' })
  @ApiResponse({ status: 200, description: 'Updated user ok', type: UserResponseDto })
  async update(    
    @Body(new ValidationPipe()) updateuser: UserPasswordDto, @Req() request: Request
  ) {
    const userId = await this.authService.getUserIdFromToken(request);
    const email = await this.authService.getEmailFromToken(request);
    const updatedUser : UserDto = {
      password: updateuser.password,
      email: email
    };
    console.log(userId);    
    return this.userService.update(userId, updatedUser);
  }

  @Get('list')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List users', description: 'List all users' })
  @ApiResponse({ status: 200, description: 'Returned users ok', type: UserResponseDto })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returned user ok', type: UserResponseDto })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Deleted user ok', type: UserResponseDto })
  async delete(@Param('id') id: string) {
    console.log(id);
    return this.userService.delete(id);
  }
  
}

