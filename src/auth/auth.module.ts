import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService,  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }]
})
export class AuthModule {}
