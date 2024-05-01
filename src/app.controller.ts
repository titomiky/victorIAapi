import { Controller, Get, Render, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/auth.controller';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private userService: UserService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('validateEmailByToken:validationToken')
  @Public()
  @Render('validateEmailByToken')
  validateEmail(@Param('validationToken') validationToken: string) {
    console.log(validationToken);
    return this.userService.validateEmail(validationToken);    
  }
}
