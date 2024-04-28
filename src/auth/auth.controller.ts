import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from '../user/dtos/user.login.dto';
import { AuthGuard } from './auth.guard';
import { SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')  
  signIn(@Body() userLoginDto: loginUserDto) 
  {    
    return this.authService.signIn(userLoginDto.email, userLoginDto.password);
  }
  
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    
    return req.user;
  }

}